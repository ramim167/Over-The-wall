import json
import pathlib
import re
import zipfile
from PIL import Image, ImageChops

work = pathlib.Path(__file__).parent
submission = pathlib.Path(r"C:\Users\User\OneDrive\Desktop\Over the wall\Round2_Submission")
rows = []
for prefix, baseline_name, final_name in [
    ("main", "main-id-repaired.pptx", "WaterSmart_Round2_Deck_Survey360.pptx"),
    ("no-fieldwork", "no-fieldwork-id-repaired.pptx", "WaterSmart_Round2_Deck_NoFieldwork_Survey360.pptx"),
]:
    before_paths = {int(re.search(r"(\d+)\.png$", item.name, re.I).group(1)): item for item in (work / "preview" / (prefix + "-baseline")).glob("*.PNG")}
    after_paths = {int(re.search(r"(\d+)\.png$", item.name, re.I).group(1)): item for item in (work / "preview" / (prefix + "-final")).glob("*.PNG")}
    with zipfile.ZipFile(work / baseline_name) as baseline, zipfile.ZipFile(submission / final_name) as final:
        for number in range(1, 19):
            difference = ImageChops.difference(Image.open(before_paths[number]).convert("RGB"), Image.open(after_paths[number]).convert("RGB"))
            box = difference.getbbox()
            if box:
                changed = sum(any(value) for value in difference.getdata())
                row = {"variant": prefix, "slide": number, "box": box, "changed_pixels": changed, "pct": changed / (1600 * 900) * 100, "slide_xml_identical": baseline.read(f"ppt/slides/slide{number}.xml") == final.read(f"ppt/slides/slide{number}.xml")}
                rows.append(row)
print(json.dumps(rows, indent=2))
(work / "render-difference-diagnostics.json").write_text(json.dumps(rows, indent=2), encoding="utf-8")
