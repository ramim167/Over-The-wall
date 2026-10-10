"""Focused local search; records project matches, not unrelated file contents."""
from pathlib import Path
from datetime import datetime, timezone
import hashlib
import json
import re
import subprocess
import sys
import zipfile

sys.stdout.reconfigure(encoding='utf-8')
AUDIT = Path(__file__).resolve().parent
WORKSPACE = AUDIT.parent.parent
ROOTS = [Path(p) for p in [
    r'C:\Users\User\Downloads', r'C:\Users\User\Documents',
    r'C:\Users\User\Desktop', r'C:\Users\User\OneDrive\Documents',
    r'C:\Users\User\OneDrive\Desktop', r'C:\Users\User\.codex\attachments'
]]
EXTENSIONS = {'.csv','.tsv','.xlsx','.xls','.docx','.pdf','.eml','.msg','.md','.txt','.json','.zip','.mp4','.mov','.html'}
EXCLUDE = re.compile(r'[/\\](?:node_modules|\.git|\.venv|venv|numpy|scipy|pandas|site-packages|\.codex_video_tools|\.codex_browser)[/\\]', re.I)
PROJECT = re.compile(r'watersmart|water[ _-]smart|marico|naturale|over[ _-]the[ _-]wall|otw[ _-]?s5|otw.*season.?5|lonajol', re.I)
EVIDENCE_NAME = re.compile(r'form.?responses?|respondents?|survey|quotation|supplier|\bchemist\b|consent|water.?test|foam|round.?2', re.I)
cutoff = datetime(2026,10,2,tzinfo=timezone.utc).timestamp()
all_files = set()
errors = []
for root in ROOTS:
    if not root.exists():
        continue
    proc = subprocess.run(['rg','--files','--hidden','--no-ignore',str(root)],capture_output=True,text=True,encoding='utf-8',errors='replace')
    if proc.returncode not in (0,1):
        errors.append({'root':str(root),'error':proc.stderr[:500]})
    for value in proc.stdout.splitlines():
        p=Path(value)
        if p.suffix.lower() in EXTENSIONS and not EXCLUDE.search(value) and not p.is_relative_to(WORKSPACE):
            all_files.add(p)

matches=[]
content_scans=0
for p in sorted(all_files):
    try:
        stat=p.stat()
        reasons=[]
        if PROJECT.search(str(p)): reasons.append('project filename/path')
        if EVIDENCE_NAME.search(p.name): reasons.append('possible evidence filename')
        # Generic recent downloads and attached prompts can have uninformative names.
        recent=stat.st_mtime>=cutoff
        attached='attachments' in p.parts
        text=''
        shallow_human_location = any(p.is_relative_to(r) and len(p.relative_to(r).parts)<=3 for r in ROOTS[:5] if r.exists())
        scan_generic_json = p.suffix.lower()=='.json' and recent and shallow_human_location
        if stat.st_size<=2_000_000 and ((p.suffix.lower() in {'.csv','.tsv','.txt','.md','.eml'} and (recent or attached or reasons)) or scan_generic_json):
            text=p.read_text(encoding='utf-8',errors='replace')
            content_scans+=1
        elif recent and p.suffix.lower()=='.pdf' and stat.st_size<=20_000_000:
            import pymupdf
            with pymupdf.open(p) as doc:
                text='\n'.join(doc[i].get_text() for i in range(min(3,len(doc))))
            content_scans+=1
        elif recent and p.suffix.lower()=='.docx' and stat.st_size<=20_000_000:
            with zipfile.ZipFile(p) as z:
                text=z.read('word/document.xml').decode('utf-8',errors='replace')
            content_scans+=1
        if text and PROJECT.search(text): reasons.append('project terms in content')
        if reasons:
            matches.append({'path':str(p),'bytes':stat.st_size,'modified_local':datetime.fromtimestamp(stat.st_mtime).isoformat(timespec='seconds'),'reasons':reasons,'sha256':hashlib.sha256(p.read_bytes()).hexdigest() if stat.st_size<30_000_000 else None})
    except Exception as exc:
        errors.append({'path':str(p),'error':str(exc)})

spreadsheet_files=[p for p in all_files if p.suffix.lower() in {'.csv','.tsv','.xlsx','.xls'}]
mail_files=[p for p in all_files if p.suffix.lower() in {'.eml','.msg'}]
report={
    'searched_at_utc':datetime.now(timezone.utc).isoformat(),
    'scope':'Local file discovery in the listed common locations; workspace reviewed separately. Not a whole-disk or connected-cloud search.',
    'roots':[str(p) for p in ROOTS if p.exists()],
    'indexed_relevant_extension_files_outside_workspace':len(all_files),
    'small_text_or_recent_document_content_checks':content_scans,
    'spreadsheet_export_file_count_outside_workspace':len(spreadsheet_files),
    'mail_export_file_count_outside_workspace':len(mail_files),
    'recent_spreadsheet_export_filenames':[str(p) for p in sorted(spreadsheet_files) if p.stat().st_mtime>=cutoff],
    'project_or_possible_evidence_candidates':matches,
    'errors':errors,
    'cloud_access':'Google Drive and Gmail both returned USER_NOT_LOGGED_IN; no cloud or private mail contents read.',
    'interpretation':'No located file may be counted as collected primary evidence until content and provenance are checked.'
}
(AUDIT/'local_file_search.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'indexed':len(all_files),'content_checks':content_scans,'spreadsheet_exports':len(spreadsheet_files),'mail_exports':len(mail_files),'candidate_count':len(matches),'errors':errors,'saved_to':str(AUDIT/'local_file_search.json')},ensure_ascii=False))
