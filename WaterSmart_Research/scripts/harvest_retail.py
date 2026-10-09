"""Extract actual public listing prices from archived HTML; no checkout.
Each row is an observation of a retailer page, not a physical shelf audit.
"""
from pathlib import Path
from html.parser import HTMLParser
import csv,json,re,sys
ROOT=Path(__file__).resolve().parents[1]

class Node:
    def __init__(self,tag='',attrs=None): self.tag=tag;self.attrs=attrs or {};self.children=[]
    def text(self):
        if self.tag in ('script','style','svg'):return ''
        return ' '.join(c if isinstance(c,str) else c.text() for c in self.children).strip()
    def find(self,cls):
        result=[]
        if cls in self.attrs.get('class','').split():result.append(self)
        for c in self.children:
            if isinstance(c,Node):result+=c.find(cls)
        return result
class Tree(HTMLParser):
    def __init__(self):super().__init__();self.root=Node();self.stack=[self.root]
    def handle_starttag(self,tag,attrs):
        n=Node(tag,dict(attrs));self.stack[-1].children.append(n)
        if tag not in ('area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'):self.stack.append(n)
    def handle_endtag(self,tag):
        for i in range(len(self.stack)-1,0,-1):
            if self.stack[i].tag==tag:self.stack=self.stack[:i];break
    def handle_data(self,value):
        if value.strip():self.stack[-1].children.append(value.strip())
def volume(name,size=''):
    if any(x in name.lower() for x in ('combo','free','pack of')):return None
    s=(size or name).lower().replace(' ','')
    multipack=re.search(r'(\d+(?:\.\d+)?)mlx(\d+)',s)
    if multipack:return float(multipack[1])*int(multipack[2])
    match=re.search(r'(\d+(?:\.\d+)?)(ml|ltr|litre|liter)',s)
    if match:return float(match[1])*(1000 if match[2]!='ml' else 1)
    return None
def main():
    rows=[];products={}
    def walk(x):
        if isinstance(x,dict):
            if x.get('@type')=='Product' and 'offers' in x:products[x.get('url',x.get('name'))]=x
            for v in x.values():walk(v)
        elif isinstance(x,list):
            for v in x:walk(v)
    for p in (ROOT/'raw').glob('retail_arogga_marico_json_*.json'):walk(json.loads(p.read_text(encoding='utf-8')))
    for p in products.values():
        if 'shampoo' not in p.get('name','').lower():continue
        offer=p['offers'];ml=volume(p['name'])
        if ml is None:continue
        price=float(offer['price']);assert offer['priceCurrency']=='BDT'
        rows.append(dict(retailer='Arogga',product=p['name'],declared_size=p['name'],volume_ml=ml,observed_sale_price_BDT=price,price_per_100ml_BDT=price/ml*100,source_url=p['url'],source_file='raw/retail_arogga_marico.html',source_id='AROGGA_MARICO',accessed_date='2026-10-09',availability='Retailer structured data says InStock; fulfilment untested',observation_method='Archived retailer Product/Offer JSON-LD',notes='Sale price; MRP not inferred. Aggregate reviews are not respondent records.'))
    for fn,url,sid in [('retail_chaldal_marico.html','https://chaldal.com/marico','CHALDAL_MARICO'),('retail_chaldal_cp2.html','https://chaldal.com/cp-2','CHALDAL_CP')]:
        parser=Tree();parser.feed((ROOT/'raw'/fn).read_text(encoding='utf-8'))
        for node in parser.root.find('productV2Catalog'):
            names=node.find('nameTextWithEllipsis');prices=node.find('productV2discountedPrice') or node.find('price');sizes=node.find('subText')
            if not names or not prices or not sizes:continue
            name=names[0].text()
            if 'shampoo' not in name.lower():continue
            size=sizes[0].text();ml=volume(name,size)
            numbers=re.findall(r'\d+(?:\.\d+)?',prices[0].text().replace(',',''))
            if ml is None or not numbers:continue
            price=float(numbers[0]);assert price>0
            rows.append(dict(retailer='Chaldal',product=name,declared_size=size,volume_ml=ml,observed_sale_price_BDT=price,price_per_100ml_BDT=price/ml*100,source_url=url,source_file='raw/'+fn,source_id=sid,accessed_date='2026-10-09',availability='Catalogue lists delivery; no address/checkout/fulfilment verified',observation_method='Archived catalogue product-card HTML',notes='Displayed current price; older struck price not substituted. Delivery excluded.'))
    unique={}
    for row in rows:unique.setdefault((row['retailer'],row['product'],row['volume_ml']),row)
    rows=list(unique.values())
    # Independent source captures show these promotions; do not use crossed MRPs.
    baby=[r for r in rows if r['retailer']=='Chaldal' and r['product']=='Parachute Just for Baby - Baby Shampoo' and r['volume_ml']==100]
    assert len(baby)==1 and baby[0]['observed_sale_price_BDT']==199
    hs=[r for r in rows if r['product']=='Head & Shoulders Smooth & Silky Anti Dandruff Shampoo']
    assert len(hs)==1 and hs[0]['observed_sale_price_BDT']==2799
    out=ROOT/'analysis/retail_price_observations.csv'
    with out.open('w',encoding='utf-8-sig',newline='') as f:w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
    summary=dict(observation_rows=len(rows),unique_product_size_pairs=len({(r['product'],r['volume_ml']) for r in rows}),retailers=sorted({r['retailer'] for r in rows}),physical_outlets_visited=0,limitation='Convenience sample of accessible online catalogues. Prices and stock claims are not market shares or verified shelf transactions.',rows=rows)
    (ROOT/'analysis/retail_price_summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
    print('Saved',len(rows),'observations')
    for r in rows:print(r['retailer'],r['product'],r['volume_ml'],r['observed_sale_price_BDT'],round(r['price_per_100ml_BDT'],2))
if __name__=='__main__':sys.stdout.reconfigure(encoding='utf-8');main()
