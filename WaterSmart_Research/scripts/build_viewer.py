"""Embed actual archived analysis in an offline read-only evidence viewer."""
from pathlib import Path
import csv,json
ROOT=Path(__file__).resolve().parents[1];A=ROOT/'analysis'
def csv_rows(name):
    with (A/name).open(encoding='utf-8-sig',newline='') as f:return list(csv.DictReader(f))
def read(name):return json.loads((A/name).read_text(encoding='utf-8'))
# Opinion respondent details are deliberately not embedded while consent is pending.
data=dict(water=read('water_summary.json'),districts=csv_rows('water_by_district.csv'),thanas=csv_rows('water_by_historical_thana.csv'),retail=csv_rows('retail_price_observations.csv'),aggregates=csv_rows('published_survey_aggregates.csv'),finance=read('finance_evidence_overlays.json'),ledger=read('evidence_ledger.json'),sources=read('source_index.json'))
template=(ROOT/'scripts/viewer_template.html').read_text(encoding='utf-8')
assert template.count('__DATA__')==1
payload=json.dumps(data,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c').replace('>','\\u003e').replace('&','\\u0026')
(ROOT/'WaterSmart_Research_Viewer.html').write_text(template.replace('__DATA__',payload),encoding='utf-8')
print('Viewer built:',len(data['districts']),'districts;',len(data['thanas']),'historical pairs;',len(data['ledger']),'claims; no opinion personal details embedded')
