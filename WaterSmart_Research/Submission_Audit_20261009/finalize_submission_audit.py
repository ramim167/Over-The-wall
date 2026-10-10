"""Save a resume checkpoint and hashes for the reviewed proposal; no source edits."""
from pathlib import Path
from datetime import datetime, timezone
import hashlib
import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
audit = Path(__file__).resolve().parent
workspace = audit.parent.parent
proposal = workspace/'Round2_Submission'
files = [p for p in proposal.rglob('*') if p.is_file() and 'node_modules' not in p.parts and not p.name.startswith('~$')]
files.extend(workspace/p for p in [
    'WaterSmart_Google_Form_Guide.md', 'OTW_S5_Master_Research.md',
    'Naturale_WaterSmart_Idea.html', 'WaterSmart_Field_Data_Plan.html',
    'Final Case - Over The Wall Season 5 (1).pdf',
    'WaterSmart_Research/analysis/user_opinions_metadata.json',
    'WaterSmart_Research/analysis/published_survey_aggregates.csv',
    'WaterSmart_Research/analysis/water_summary.json',
    'WaterSmart_Research/state.json', 'WaterSmart_Research/CHECKPOINT.md'
])
manifest=[]
for p in sorted(set(files)):
    if p.exists():
        manifest.append({'path':str(p.relative_to(workspace)).replace('\\','/'),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
(audit/'audited_files_manifest.json').write_text(json.dumps({'review_dates_local':'2026-10-09 to 2026-10-10','generated_at_utc':datetime.now(timezone.utc).isoformat(),'excluded':'Office temporary owner/lock files (~$)', 'files':manifest},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
finance=json.loads((audit/'finance_v4_independent_audit.json').read_text(encoding='utf-8'))
local=json.loads((audit/'local_file_search.json').read_text(encoding='utf-8'))
checkpoint={
    'task':'Audit newly added WaterSmart files against prior missing-work checklist and find supporting evidence in common PC locations.',
    'status':'requested_file_audit_complete_validation_gaps_remain',
    'report':'UPDATED_FILES_AUDIT.md',
    'original_submission_files_changed':False,
    'reviewed_submission_version':'Round2 v4 / MRP340 Tk360 / GM gate45%, both 18-slide variants',
    'completed':['Master/research context review','New submission and survey guide review','Both PDF/PPTX text extraction','Selected PDF slide rendering and visual inspection','Finance output and independent cash/NPV/IRR reconciliation','Scoped PC file search','Attempted scoped Google Drive/Gmail searches','Source/content/consistency findings and resume manifest'],
    'finance_numeric_values_reconciled':finance['stored_output_numeric_comparisons'],
    'finance_mismatches':finance['stored_output_mismatches'],
    'local_file_search_scope':local['roots'],
    'cloud_access':'Drive/Gmail disconnected; no private mail/cloud data read.',
    'still_missing':['Five opinion collection dates/anonymous-use consents/price-order','Collected consenting-response export','Landed supplier/BOM/insertion/tooling quotations','Dated private Marico/chemist/tax/line confirmations','Actual water/foam/pack-weight/product qualification records','Finished WaterSmart video','Verified organizer permission for 18 slides and template flexibility'],
    'future_execution_gates':['Formula safety/performance/pack/strip stability','Qualified paid pilot sell-out/mature repeat/cannibalisation','Separate LonaJol salinity qualification'],
    'resume':['Read UPDATED_FILES_AUDIT.md and audited_files_manifest.json','Compare changed files to hashes','Check provenance of any newly supplied evidence','Update affected findings only','Reconcile finance if inputs change','Do not blindly rerun older v3 integration over v4 user files'],
    'external_messages_sent':False,'synthetic_respondents_created':0
}
(audit/'CHECKPOINT.json').write_text(json.dumps(checkpoint,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'audited_source_files':len(manifest),'audit_complete':True,'numeric_values_reconciled':finance['stored_output_numeric_comparisons'],'local_candidates':len(local['project_or_possible_evidence_candidates']),'scanned_file_types':local['indexed_relevant_extension_files_outside_workspace'],'report_bytes':(audit/'UPDATED_FILES_AUDIT.md').stat().st_size},ensure_ascii=False))
