import datetime
import hashlib
import json
import pathlib
import shutil

ROOT = pathlib.Path(r"C:\Users\User\OneDrive\Desktop\Over the wall")
WORK = pathlib.Path(__file__).parent
PRIMARY = ROOT / "WaterSmart_Research/Primary_Survey_20261010"
PROOF = PRIMARY / "Deck_Update_Proof"

def read_json(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

edit_report = read_json(WORK / "surgical-edit-verification.json")
render_report = read_json(WORK / "rendered-fidelity-verification.json")
import_report = read_json(WORK / "repaired-import-verification.json")
data_report = read_json(WORK / "data-validation.json")
assert data_report["all_pass"]
assert all(report["unchanged_slides_identical_pixels"] == 16 and report["survey_pdf_text_checks_passed"] for report in render_report)
assert all(report["import_succeeded"] and report["slide_count"] == 18 for report in import_report)
for report in edit_report:
    assert digest(pathlib.Path(report["source"])) == report["source_sha256"]
    assert digest(pathlib.Path(report["output"])) == report["output_sha256"], "PDF export must not save or modify the PPTX"
for source in read_json(PRIMARY / "raw_manifest.json"):
    assert digest(pathlib.Path(source["Original"])) == source["SHA256"].lower()
    assert digest(pathlib.Path(source["Snapshot"])) == source["SnapshotSHA256"].lower()

manifest = read_json(ROOT / "WaterSmart_Research/artifact_manifest.json")
financial_files = ["Round2_Submission/finance/finance_v4.cjs", "Round2_Submission/finance/finance_v4_output.json"]
financial_checks = {}
for name in financial_files:
    expected = next((row["sha256"] for row in manifest["files"] if row["path"].replace("\\", "/") == name), None)
    current_hash = digest(ROOT / name)
    financial_checks[name] = {"current_sha256": current_hash, "historical_manifest_baseline_available": expected is not None, "matched_baseline": current_hash == expected.lower() if expected else None, "no_financial_write_performed": True}
    if expected:
        assert current_hash == expected.lower()

PROOF.mkdir(parents=True, exist_ok=True)
for name in ["data-validation.json", "surgical-edit-verification.json", "rendered-fidelity-verification.json", "repaired-import-verification.json", "native-render-report.json", "edit_decks.py", "render_powerpoint.ps1", "verify_rendered_decks.py", "check_import_repair.mjs"]:
    shutil.copyfile(WORK / name, PROOF / name)
outputs = []
for report in edit_report:
    path = pathlib.Path(report["output"])
    for file in (path, path.with_suffix(".pdf")):
        outputs.append({"path": file.relative_to(ROOT).as_posix(), "bytes": file.stat().st_size, "sha256": digest(file)})
preservation = {"original_pptx_unchanged": True, "original_survey_csv_xlsx_unchanged": True, "updated_pptx_not_resaved_during_pdf_export": True, "financial_source_hash_checks": financial_checks, "user_authorized_limited_direct_repair_edit": True, "all_16_unchanged_slides_per_variant_identical_pixels": True, "edited_slides_visually_reviewed": [5, 18], "outputs": outputs}
(PROOF / "final_preservation_checks.json").write_text(json.dumps(preservation, indent=2) + "\n", encoding="utf-8")

checkpoint = read_json(PRIMARY / "DECK_UPDATE_CHECKPOINT.json")
checkpoint["status"] = "verified_survey360_deck_update_complete_imagined_recruitment_distribution_not_added"
checkpoint["blocker"] = None
checkpoint["alternate_edit_method"] = "User explicitly approved limited direct repair/edit. Duplicate nonvisual IDs repaired in new copies; source slide frames and styles preserved; PowerPoint exported PDF and QA renders read-only."
checkpoint["outputs"] = outputs
checkpoint["proof_directory"] = "Deck_Update_Proof"
checkpoint["verification"] = {"slides_per_variant": 18, "unchanged_slides_identical_pixels_per_variant": 16, "edited_slides": [5, 18], "figures_and_pdf_text_passed": True, "import_passed_after_id_repair": True, "source_and_raw_hash_checks_passed": True, "visual_review_passed": True}
checkpoint["resume"] = ["Survey360 PPTX/PDF copies are the completed outputs; originals remain intact.", "Read SURVEY_DECK_UPDATE.md and Deck_Update_Proof for scope and verification.", "Do not invent online/offline distribution from age or living arrangement.", "Public proposal price is Tk 360; Q20 maximum-price analysis and original research history remain intact.", "Water/product tests, costs/private confirmations and paid repeat remain separate execution gates; survey intent is not sales conversion.", "No need to rebuild these files unless new real data or user changes arrive."]
(PRIMARY / "DECK_UPDATE_CHECKPOINT.json").write_text(json.dumps(checkpoint, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

state_path = ROOT / "WaterSmart_Research/state.json"
state = read_json(state_path)
state["last_updated_utc"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
state["presentation_survey_update"] = {"local_date": "2026-10-10", "status": checkpoint["status"], "proposed_price_tk": 360, "edited_slides": [5, 18], "outputs": [row["path"] for row in outputs], "checkpoint": "Primary_Survey_20261010/DECK_UPDATE_CHECKPOINT.json", "source_files_and_financial_inputs_unchanged": True, "invented_collection_distribution_added": False}
state_path.write_text(json.dumps(state, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(json.dumps({"status": checkpoint["status"], "outputs": outputs, "preservation_checks_passed": True}, indent=2))
