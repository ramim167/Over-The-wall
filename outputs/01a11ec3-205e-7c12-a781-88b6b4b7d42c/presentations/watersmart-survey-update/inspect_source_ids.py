"""Read-only source-package audit; never writes or modifies a PPTX."""
import collections
import json
import pathlib
import re
import xml.etree.ElementTree as ET
import zipfile

root = pathlib.Path(r"C:\Users\User\OneDrive\Desktop\Over the wall")
work = pathlib.Path(__file__).parent
ns = {"p": "http://schemas.openxmlformats.org/presentationml/2006/main", "a": "http://schemas.openxmlformats.org/drawingml/2006/main"}
reports = []
for filename in ("WaterSmart_Round2_Deck.pptx", "WaterSmart_Round2_Deck_NoFieldwork.pptx"):
    source = root / "Round2_Submission" / filename
    report = {"source": str(source), "slide_count": 0, "duplicate_shape_ids_per_slide": [], "comments_parts": [], "slides": []}
    with zipfile.ZipFile(source) as archive:
        names = archive.namelist()
        report["comments_parts"] = [name for name in names if "comment" in name.lower()]
        slides = sorted((name for name in names if re.fullmatch(r"ppt/slides/slide\d+\.xml", name)), key=lambda name: int(re.search(r"slide(\d+)", name).group(1)))
        report["slide_count"] = len(slides)
        for name in slides:
            xml = ET.fromstring(archive.read(name))
            ids = [item.attrib["id"] for item in xml.findall(".//p:cNvPr", ns)]
            counts = collections.Counter(ids)
            duplicates = {item: count for item, count in counts.items() if count > 1}
            if duplicates:
                report["duplicate_shape_ids_per_slide"].append({"slide": name, "ids": duplicates})
            elements = []
            for shape in list(xml.findall(".//p:sp", ns)) + list(xml.findall(".//p:graphicFrame", ns)) + list(xml.findall(".//p:pic", ns)):
                prop = shape.find(".//p:cNvPr", ns)
                if prop is not None:
                    elements.append({"id": prop.attrib.get("id"), "name": prop.attrib.get("name"), "text": " | ".join(node.text or "" for node in shape.findall(".//a:t", ns)), "structural_placeholder": shape.find(".//p:ph", ns) is not None})
            report["slides"].append({"part": name, "elements": elements})
    reports.append(report)
(work / "source-package-audit.json").write_text(json.dumps(reports, indent=2, ensure_ascii=False), encoding="utf-8")
print(json.dumps([{key: item[key] for key in ("source", "slide_count", "duplicate_shape_ids_per_slide", "comments_parts")} for item in reports], indent=2))
