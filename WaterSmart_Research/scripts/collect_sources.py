"""Download specified public evidence with timestamp, status, SHA-256 and text.

Usage: python scripts/collect_sources.py sources_to_download.json
JSON rows: {id,url,filename,description}. Existing successful files are reused.
No browser credentials, cookies, private links or authentication are used.
"""
from pathlib import Path
import concurrent.futures, datetime, hashlib, json, re, sys, urllib.request

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / 'raw'
RAW.mkdir(exist_ok=True)
MANIFEST = ROOT / 'download_manifest.jsonl'

def fetch(row):
    out = RAW / row['filename']
    if not out.resolve().is_relative_to(RAW.resolve()):
        raise ValueError('Unsafe filename')
    rec = dict(row, accessed_utc=datetime.datetime.now(datetime.timezone.utc).isoformat())
    try:
        if out.exists() and out.stat().st_size > 0:
            data = out.read_bytes()
            rec.update(status='reused', bytes=len(data), sha256=hashlib.sha256(data).hexdigest())
        else:
            req = urllib.request.Request(row['url'], headers={'User-Agent':'Mozilla/5.0 (public-source research; no authentication)'})
            with urllib.request.urlopen(req, timeout=35) as response:
                data = response.read()
                rec.update(http_status=response.status, final_url=response.geturl(), content_type=response.headers.get('Content-Type',''))
            if not data: raise ValueError('Empty response')
            out.write_bytes(data)
            rec.update(status='downloaded', bytes=len(data), sha256=hashlib.sha256(data).hexdigest())
        if data[:4] == b'%PDF':
            try:
                import fitz
                doc = fitz.open(stream=data,filetype='pdf')
                pages = [page.get_text() for page in doc]
                out.with_suffix('.txt').write_text('\n\n'.join(f'--- PDF page {i+1} ---\n{s}' for i,s in enumerate(pages)),encoding='utf-8')
                rec['pages'] = len(pages)
            except Exception as error: rec['text_error'] = str(error)
        elif out.suffix.lower() in ('.html','.htm'):
            try:
                from html.parser import HTMLParser
                class Text(HTMLParser):
                    def __init__(self): super().__init__(); self.parts=[]; self.ignore=0
                    def handle_starttag(self,tag,attrs):
                        if tag in ('script','style'): self.ignore+=1
                    def handle_endtag(self,tag):
                        if tag in ('script','style'): self.ignore=max(0,self.ignore-1)
                    def handle_data(self,value):
                        if not self.ignore and value.strip(): self.parts.append(value.strip())
                parser=Text(); parser.feed(data.decode('utf-8',errors='replace'))
                out.with_suffix('.txt').write_text('\n'.join(parser.parts),encoding='utf-8')
            except Exception as error: rec['text_error'] = str(error)
    except Exception as error:
        rec.update(status='failed', error=str(error))
    return rec

def main():
    path = Path(sys.argv[1])
    rows=json.loads(path.read_text(encoding='utf-8-sig'))
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        results=list(pool.map(fetch,rows))
    with MANIFEST.open('a',encoding='utf-8') as f:
        for result in results:
            f.write(json.dumps(result,ensure_ascii=False)+'\n')
            print(json.dumps({k:result[k] for k in ('id','status','bytes','pages','error') if k in result},ensure_ascii=False))
    return results

if __name__=='__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    main()
