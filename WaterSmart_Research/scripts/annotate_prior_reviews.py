"""Add a dated supersession notice while preserving the original audit contents."""
from pathlib import Path
import hashlib,json
ROOT=Path(__file__).resolve().parents[1];WORK=ROOT.parent
names=['OTW_S5_Fact_Check.md','audit_on_fact_check.md','audit_on_fact_check_review.md','WaterSmart_v3_Review.md','WaterSmart_v3_Financial_Check.json']
manifest=[]
for name in names:
    p=WORK/name;backup=ROOT/'baseline'/name
    if not backup.exists():backup.write_bytes(p.read_bytes())
    manifest.append(dict(filename=name,prior_file='baseline/'+name,sha256=hashlib.sha256(backup.read_bytes()).hexdigest()))
    if p.suffix=='.md':
        s=p.read_text(encoding='utf-8-sig')
        if 'RESEARCH_SUPERSESSION_20261009' not in s:
            split=s.find('\n')
            note='''

<!-- RESEARCH_SUPERSESSION_20261009 -->
> **Later research revision, 9 Oct 2026:** Preserve this earlier audit as historical context. The original v3 financial model omitted domestic shampoo SD15%; old positive NPV/strip-return ceilings are withdrawn as current investment conclusions. See the [attributed research report](WaterSmart_Research/WaterSmart_Research_Report.md), [conditional fiscal overlay](WaterSmart_Research/analysis/finance_evidence_overlays.json) and [current master Section17](OTW_S5_Master_Research.md). The original EPR gazette has now been obtained; five supplied opinions are user-confirmed real with date/consent/price-order pending. No WaterSmart product trial or team water test is claimed.
'''
            p.write_text(s[:split]+note+s[split:],encoding='utf-8')
    else:
        data=json.loads(p.read_text(encoding='utf-8-sig'))
        data['research_revision_status']={'date':'2026-10-09','status':'Historical prior overlay; not current appraisal; domestic SD omitted','current_conditional_analysis':'WaterSmart_Research/analysis/finance_evidence_overlays.json'}
        p.write_text(json.dumps({'research_revision_status':data['research_revision_status'],**data},ensure_ascii=False,indent=2),encoding='utf-8')
(ROOT/'prior_reviews_manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print('Five prior audits/snapshots preserved and annotated with later evidence.')
