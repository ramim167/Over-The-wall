"""Compare every unchanged slide and inspect exported PDF text/page counts."""
import hashlib
import json
import pathlib
import re
import fitz
from PIL import Image, ImageChops

work = pathlib.Path(__file__).parent
root = pathlib.Path(r"C:\Users\User\OneDrive\Desktop\Over the wall")
reports = []
for prefix, filename in [
    ("main", "WaterSmart_Round2_Deck_Survey360.pdf"),
    ("no-fieldwork", "WaterSmart_Round2_Deck_NoFieldwork_Survey360.pdf"),
]:
    baseline = work / "preview" / (prefix + "-baseline")
    final = work / "preview" / (prefix + "-final")
    source_pngs = {int(re.search(r"(\d+)\.png$", item.name, re.I).group(1)): item for item in baseline.glob("*.PNG")}
    target_pngs = {int(re.search(r"(\d+)\.png$", item.name, re.I).group(1)): item for item in final.glob("*.PNG")}
    # glob is case-insensitive on the user's Windows filesystem.
    assert len(source_pngs) == len(target_pngs) == 18
    slide_rows = []
    for number in range(1, 19):
        before = Image.open(source_pngs[number]).convert("RGB")
        after = Image.open(target_pngs[number]).convert("RGB")
        difference = ImageChops.difference(before, after)
        changed_box = difference.getbbox()
        unchanged = changed_box is None
        if number not in (5, 18):
            assert unchanged, f"Unexpected visible change: {prefix} slide {number}: {changed_box}"
        else:
            assert not unchanged, f"Missing consumer update: {prefix} slide {number}"
        slide_rows.append({"slide": number, "identical_pixels": unchanged, "changed_bounding_box": changed_box})
    pdf_path = root / "Round2_Submission" / filename
    document = fitz.open(pdf_path)
    assert len(document) == 18
    text = "\n".join(page.get_text() for page in document)
    assert not re.search(r"(?:Tk|৳)\s*400\b", text)
    slide5_text = document[4].get_text()
    for expected in ("49", "81.8%", "77.6%", "320", "360", "31.9%"):
        assert expected in slide5_text, expected
    assert not re.search(r"\boffline\b", slide5_text, re.I)
    reports.append({"variant": prefix, "pdf": str(pdf_path), "pages": len(document), "unchanged_slides_identical_pixels": 16, "slide_results": slide_rows, "survey_pdf_text_checks_passed": True, "pdf_sha256": hashlib.sha256(pdf_path.read_bytes()).hexdigest()})
(work / "rendered-fidelity-verification.json").write_text(json.dumps(reports, indent=2), encoding="utf-8")
print(json.dumps([{key: row[key] for key in ("variant", "pdf", "pages", "unchanged_slides_identical_pixels", "survey_pdf_text_checks_passed")} for row in reports], indent=2))
