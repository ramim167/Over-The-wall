"""Reproduce descriptive statistics of BGS/DPHE historical wells.

Standard-library only. Censored values stay intervals [0,LOD), never LOD/2.
Counts use known threshold classification; missing/ambiguous are explicit.
No interpolation, household weights, imputed respondents or product claims.
"""
from pathlib import Path
import collections, csv, datetime, hashlib, json, math, statistics

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'analysis'; OUT.mkdir(exist_ok=True)
RAW=ROOT/'raw'/'bgs_national_hydrochemical_raw.csv'
SOURCE='https://www.bgs.ac.uk/groundwater/download/dphe-bgs-national-hydrochemical-survey/'
FORMULA_SOURCE='https://pubs.usgs.gov/sir/2006/5245/pdf/sir20065245.pdf'

def bounds(text):
    value=text.strip()
    if not value or value.lower() in ('na','n/a','nd','-'): return None
    if value.startswith('<'): return (0.0,float(value[1:].strip()),'left_censored')
    if value.startswith('>'): return (float(value[1:].strip()),math.inf,'right_censored')
    number=float(value)
    if number<0: raise ValueError('Unexpected negative: '+value)
    return (number,number,'exact')

def above(interval,threshold):
    if interval is None: return None
    low,high,kind=interval
    if low>threshold: return True
    if kind=='right_censored' and low>=threshold: return True
    if high<=threshold: return False
    return None

def hardness_label(interval):
    if interval is None:return 'missing'
    lo,hi,_=interval
    def label(x):
        return 'soft' if x<=60 else 'moderately_hard' if x<=120 else 'hard' if x<=180 else 'very_hard'
    if label(lo)==label(hi):return label(lo)
    return 'ambiguous_censored'

def quan(values,q):
    if not values:return None
    xs=sorted(values);pos=(len(xs)-1)*q;left=math.floor(pos);right=math.ceil(pos)
    return xs[left]+(xs[right]-xs[left])*(pos-left)

def summary(group):
    result={'n_wells':len(group)}
    for element in ('Fe','Ca','Mg','hardness'):
        iv=[r['_'+element] for r in group if r['_'+element] is not None]
        exact=[r[0] for r in iv if r[2]=='exact']
        result[element+'_n']=len(iv)
        result[element+'_censored_n']=len(iv)-len(exact)
        for name,q in [('p25',.25),('median',.5),('p75',.75)]:
            lower=quan([r[0] for r in iv],q);upper=quan([r[1] for r in iv],q)
            result[element+'_'+name+'_lower']=lower
            result[element+'_'+name+'_upper']=upper
            result[element+'_'+name+'_exact']=lower if lower==upper else None
        result[element+'_min_exact']=min(exact) if exact else None
        result[element+'_max_exact']=max(exact) if exact else None
    for name,key,threshold in [('iron_gt_0_3','Fe',.3),('iron_gt_1','Fe',1),('iron_gt_3','Fe',3),('hardness_gt_120','hardness',120),('hardness_gt_180','hardness',180)]:
        statuses=[above(r['_'+key],threshold) for r in group]
        n=sum(s is not None for s in statuses);yes=sum(s is True for s in statuses)
        result[name+'_n']=yes;result[name+'_denominator']=n;result[name+'_unknown']=len(group)-n
        result[name+'_sample_pct']=100*yes/n if n else None
    combo=[];iron_soft=[]
    for r in group:
        iron=above(r['_Fe'],.3);hard=above(r['_hardness'],120)
        combo.append(True if iron is True or hard is True else False if iron is False and hard is False else None)
        iron1=above(r['_Fe'],1)
        iron_soft.append(iron1 is True and hard is False if iron1 is not None and hard is not None else None)
    for name,statuses in [('iron_gt_0_3_OR_hardness_gt_120',combo),('iron_gt_1_AND_hardness_le_120',iron_soft)]:
        n=sum(s is not None for s in statuses);yes=sum(s is True for s in statuses)
        result[name+'_n']=yes;result[name+'_denominator']=n;result[name+'_sample_pct']=100*yes/n if n else None
    classes=collections.Counter(r['hardness_class'] for r in group)
    result.update({k:classes[k] for k in ['soft','moderately_hard','hard','very_hard','missing','ambiguous_censored']})
    return result

def write_csv(name,rows):
    with (OUT/name).open('w',encoding='utf-8-sig',newline='') as f:
        writer=csv.DictWriter(f,fieldnames=list(rows[0]));writer.writeheader();writer.writerows(rows)

def main():
    content=list(csv.reader(RAW.read_text(encoding='utf-8-sig').splitlines()))
    header_index=next(i for i,row in enumerate(content) if row and row[0]=='SAMPLE_ID')
    headers=content[header_index];units=dict(zip(headers,content[header_index+1]))
    assert all(units[x]=='mg/L' for x in ('Fe','Ca','Mg'))
    rows=[dict(zip(headers,row)) for row in content[header_index+2:] if row and row[0].strip()]
    assert len(rows)==3534
    assert len({r['SAMPLE_ID'] for r in rows})==len(rows)
    dates=[];processed=[]
    for row in rows:
        for k in ('Fe','Ca','Mg'):row['_'+k]=bounds(row[k])
        ca,mg=row['_Ca'],row['_Mg']
        row['_hardness']=None if ca is None or mg is None else (2.497*ca[0]+4.118*mg[0],2.497*ca[1]+4.118*mg[1],'exact' if ca[2]==mg[2]=='exact' else 'derived_interval')
        row['hardness_class']=hardness_label(row['_hardness'])
        day=datetime.datetime.strptime(row['SAMPLE_DATE'],'%d/%m/%Y').date();dates.append(day)
        p={k:row[k] for k in ['SAMPLE_ID','SAMPLE_DATE','LAT_DEG','LONG_DEG','WELL_DEPTH','WELL_TYPE','DIVISION','DISTRICT','THANA','UNION','Fe','Ca','Mg']}
        for k in ('Fe','Ca','Mg','hardness'):
            iv=row['_'+k]
            p[k+'_lower_mg_L']=iv[0] if iv else ''
            p[k+'_upper_mg_L']=iv[1] if iv else ''
            p[k+'_value_status']=iv[2] if iv else 'missing'
            p[k+'_exact_mg_L']=iv[0] if iv and iv[2]=='exact' else ''
        p['hardness_unit']='mg/L as CaCO3';p['hardness_class']=row['hardness_class'];p['source_id']='BGS_NHS_CSV'
        processed.append(p)
    districts=[];thanas=[]
    for district in sorted({r['DISTRICT'] for r in rows}):
        group=[r for r in rows if r['DISTRICT']==district]
        districts.append(dict(district=district,**summary(group)))
        for thana in sorted({r['THANA'] for r in group}):thanas.append(dict(district=district,thana=thana,**summary([r for r in group if r['THANA']==thana])))
    overall=summary(rows)
    result=dict(source_url=SOURCE,source_citation='BGS and DPHE (2001). Arsenic contamination of groundwater in Bangladesh. Kinniburgh, D.G. and Smedley, P.L. (eds). British Geological Survey Report WC/00/19.',analysis_credit='Team The Last BrainCell analysis of BGS/DPHE observations; not team fieldwork',raw_sha256=hashlib.sha256(RAW.read_bytes()).hexdigest(),sample_dates_min=str(min(dates)),sample_dates_max=str(max(dates)),sample_year_counts=dict(collections.Counter(d.year for d in dates)),districts=len(districts),historical_district_thana_pairs=len(thanas),formula='Ca/Mg-equivalent hardness = 2.497*Ca_mg_L + 4.118*Mg_mg_L',formula_source=FORMULA_SOURCE,censoring='Intervals preserved; no substitution. Unknown threshold classes excluded from their own denominator. Quantiles use linear interpolation separately for interval bounds.',interpretation='Descriptive sampled historical wells, unweighted. Not current household exposure, hair damage, consumer demand, drinking-water safety, NaCl salinity, or SAM.',overall=overall)
    assert sum(r['n_wells'] for r in districts)==3534
    assert sum(r['n_wells'] for r in thanas)==3534
    assert sum(overall.get(k,0) for k in ['soft','moderately_hard','hard','very_hard','missing','ambiguous_censored'])==3534
    assert math.isclose(rows[0]['_hardness'][0],258.5098,rel_tol=1e-10)
    write_csv('water_wells_processed.csv',processed)
    write_csv('water_by_district.csv',districts)
    write_csv('water_by_historical_thana.csv',thanas)
    (OUT/'water_summary.json').write_text(json.dumps(result,indent=2,allow_nan=False),encoding='utf-8')
    print(json.dumps(result,indent=2))
    print('District summaries:',[(r['district'],r['n_wells'],r['Fe_median_exact'],r['hardness_median_exact']) for r in districts if r['district'] in ['Dhaka','Gazipur','Tangail','Khulna','Bagerhat','Satkhira','Noakhali','Lakshmipur']])

if __name__=='__main__':main()
