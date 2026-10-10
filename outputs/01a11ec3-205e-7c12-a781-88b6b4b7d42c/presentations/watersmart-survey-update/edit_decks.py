"""Surgical edits authorized by the user after the artifact-tool import failure.

No slide rebuild: retain package parts and inherited paragraph/run formatting.
Repair only duplicate nonvisual shape IDs; edit consumer evidence on slides 5/18.
"""
import hashlib
import html
import json
import pathlib
import re
import copy
import xml.etree.ElementTree as ET
import zipfile

ROOT = pathlib.Path(r"C:\Users\User\OneDrive\Desktop\Over the wall")
WORK = pathlib.Path(__file__).parent
SUBMISSION = ROOT / "Round2_Submission"
PAYLOAD = json.loads((SUBMISSION / "deck/survey_deck_data.json").read_text(encoding="utf-8"))
NS = {"p": "http://schemas.openxmlformats.org/presentationml/2006/main", "a": "http://schemas.openxmlformats.org/drawingml/2006/main"}
PARA = re.compile(r"<a:p(?=[\s>]).*?</a:p>", re.S)
TEXT = re.compile(r"(<a:t(?:\s[^>]*)?>)(.*?)(</a:t>)", re.S)
SHAPE = re.compile(r"<p:sp(?=[\s>]).*?</p:sp>", re.S)

def text_values(xml):
    return [html.unescape(match.group(2)) for match in TEXT.finditer(xml)]

def replace_texts(xml, new_values):
    index = 0
    def replace(match):
        nonlocal index
        if index >= len(new_values):
            raise ValueError("Unexpected extra text run in a bounded edit")
        value = new_values[index]
        index += 1
        return match.group(1) + html.escape(value, quote=False) + match.group(3)
    result = TEXT.sub(replace, xml)
    if index != len(new_values):
        raise ValueError("Bounded edit did not resolve all inherited runs")
    return result

def replace_single_paragraph(xml, value):
    values = text_values(xml)
    if len(values) != 1:
        raise ValueError(f"Expected one inherited text run, found {len(values)}")
    return replace_texts(xml, [value])

def panel_shape(shape, nofield):
    paragraphs = list(PARA.finditer(shape))
    expected = 4 if nofield else 7
    if len(paragraphs) != expected:
        raise ValueError(f"Panel has {len(paragraphs)} paragraphs, expected {expected}")
    new_lines = [PAYLOAD["heading"], *PAYLOAD["panel_lines"]]
    if nofield:
        new_paragraphs = [replace_single_paragraph(paragraphs[0].group(), new_lines[0])]
        new_paragraphs += [replace_single_paragraph(paragraphs[1].group(), line) for line in new_lines[1:]]
    else:
        new_paragraphs = [replace_single_paragraph(match.group(), line) for match, line in zip(paragraphs, new_lines)]
    return shape[:paragraphs[0].start()] + "".join(new_paragraphs) + shape[paragraphs[-1].end():]

def edit_slide5(xml, nofield):
    panel_count = footer_count = 0
    def edit(shape_match):
        nonlocal panel_count, footer_count
        shape = shape_match.group()
        values = text_values(shape)
        if values and values[0].startswith("BIG BRANDS SEE THE NEED" if nofield else "OUR FIELD RESEARCH"):
            panel_count += 1
            return panel_shape(shape, nofield)
        if values and values[0].startswith("Sources: Khanam & Rahman (2022)"):
            footer_count += 1
            replacement = "Sources: Khanam & Rahman (2022); Zakaria et al. (2025); UGC Annual Report 2023 via Prothom Alo (4 Oct 2025); BBS Census 2022. " + PAYLOAD["source_footer_addition"]
            return replace_single_paragraph(shape, replacement)
        return shape
    result = SHAPE.sub(edit, xml)
    if (panel_count, footer_count) != (1, 1):
        raise ValueError(f"Slide 5 resolved panel/footer {panel_count}/{footer_count}")
    return result

def edit_slide18(xml):
    count = 0
    def edit(match):
        nonlocal count
        paragraph = match.group()
        values = text_values(paragraph)
        if values and values[0].strip() == "Consumers:":
            if len(values) != 2:
                raise ValueError("Consumer paragraph must retain its inherited heading and body runs")
            count += 1
            return replace_texts(paragraph, [values[0], PAYLOAD["appendix_consumer_text"]])
        return paragraph
    result = PARA.sub(edit, xml)
    if count != 1:
        raise ValueError(f"Slide 18 consumer paragraph resolved {count} times")
    return result

def repair_duplicate_ids(xml):
    pattern = re.compile(r'<p:cNvPr\b[^>]*\bid="(\d+)"[^>]*>')
    original_ids = [int(match.group(1)) for match in pattern.finditer(xml)]
    next_id = max(original_ids, default=0) + 1
    seen = set()
    repairs = []
    def repair(match):
        nonlocal next_id
        value = int(match.group(1))
        if value not in seen:
            seen.add(value)
            return match.group()
        # Do not guess which duplicate an animation/connector intended to address.
        references = re.findall(rf'<(?:p:spTgt|a:stCxn|a:endCxn)\b[^>]*(?:spid|id)="{value}"', xml)
        if references:
            raise ValueError(f"Duplicate ID {value} has ambiguous object references")
        old = match.group()
        replacement = re.sub(r'\bid="\d+"', f'id="{next_id}"', old, count=1)
        repairs.append({"old": value, "new": next_id})
        seen.add(next_id)
        next_id += 1
        return replacement
    return pattern.sub(repair, xml), repairs

def display_inventory(xml):
    root = ET.fromstring(xml)
    result = []
    for shape in list(root.findall(".//p:sp", NS)) + list(root.findall(".//p:pic", NS)) + list(root.findall(".//p:graphicFrame", NS)):
        # Ignore only nonvisual IDs; keep geometry, formatting, content and assets.
        for node in shape.findall(".//p:cNvPr", NS):
            node.attrib.pop("id", None)
        result.append(ET.tostring(shape, encoding="unicode"))
    return result

WORK.mkdir(parents=True, exist_ok=True)
reports = []
for nofield, source_name, target_name in [
    (False, "WaterSmart_Round2_Deck.pptx", "WaterSmart_Round2_Deck_Survey360.pptx"),
    (True, "WaterSmart_Round2_Deck_NoFieldwork.pptx", "WaterSmart_Round2_Deck_NoFieldwork_Survey360.pptx"),
]:
    source = SUBMISSION / source_name
    target = SUBMISSION / target_name
    qa_source = WORK / ("no-fieldwork-id-repaired.pptx" if nofield else "main-id-repaired.pptx")
    source_bytes = source.read_bytes()
    report = {"source": str(source), "output": str(target), "source_sha256": hashlib.sha256(source_bytes).hexdigest(), "changed_parts": [], "id_repairs": {}, "untouched_slide_content_and_style": [], "authorisation": "User explicitly approved limited repair/direct edit after the skill restriction was explained."}
    with zipfile.ZipFile(source) as incoming, zipfile.ZipFile(target, "w") as outgoing, zipfile.ZipFile(qa_source, "w") as repaired_only:
        for entry in incoming.infolist():
            original = incoming.read(entry.filename)
            final = original
            baseline = original
            if re.fullmatch(r"ppt/slides/slide\d+\.xml", entry.filename):
                baseline_xml, repairs = repair_duplicate_ids(original.decode("utf-8"))
                baseline = baseline_xml.encode("utf-8")
                final_xml = baseline_xml
                if entry.filename == "ppt/slides/slide5.xml":
                    final_xml = edit_slide5(final_xml, nofield)
                elif entry.filename == "ppt/slides/slide18.xml":
                    final_xml = edit_slide18(final_xml)
                else:
                    assert display_inventory(original) == display_inventory(baseline), entry.filename
                    report["untouched_slide_content_and_style"].append(entry.filename)
                final = final_xml.encode("utf-8")
                if repairs:
                    report["id_repairs"][entry.filename] = repairs
            elif entry.filename == "ppt/notesSlides/notesSlide5.xml":
                xml = original.decode("utf-8")
                def edit_note(match):
                    values = text_values(match.group())
                    if len(values) == 1 and values[0].startswith("Published surveys are credited"):
                        return replace_single_paragraph(match.group(), PAYLOAD["speaker_note"])
                    return match.group()
                final = PARA.sub(edit_note, xml).encode("utf-8")
            if final != original:
                report["changed_parts"].append(entry.filename)
            outgoing.writestr(copy.copy(entry), final)
            repaired_only.writestr(copy.copy(entry), baseline)
    assert len(report["untouched_slide_content_and_style"]) == 16
    assert source.read_bytes() == source_bytes, "Original PPTX changed"
    with zipfile.ZipFile(target) as archive:
        slide_parts = [name for name in archive.namelist() if re.fullmatch(r"ppt/slides/slide\d+\.xml", name)]
        assert len(slide_parts) == 18
        all_text = []
        for name in slide_parts:
            xml = archive.read(name).decode("utf-8")
            ids = [item.attrib["id"] for item in ET.fromstring(xml).findall(".//p:cNvPr", NS)]
            assert len(ids) == len(set(ids)), name
            all_text += text_values(xml)
        assert not any(re.search(r"(?:Tk|৳)\s*400\b", value) for value in all_text)
        for value in [PAYLOAD["heading"], *PAYLOAD["panel_lines"], PAYLOAD["appendix_consumer_text"]]:
            assert value in all_text, value
    report["slide_count"] = 18
    report["all_non_slide_asset_parts_unchanged"] = all(part.startswith("ppt/slides/") or part == "ppt/notesSlides/notesSlide5.xml" for part in report["changed_parts"])
    report["output_sha256"] = hashlib.sha256(target.read_bytes()).hexdigest()
    report["qa_baseline"] = str(qa_source)
    reports.append(report)
(WORK / "surgical-edit-verification.json").write_text(json.dumps(reports, indent=2), encoding="utf-8")
print(json.dumps([{key: report[key] for key in ("output", "slide_count", "all_non_slide_asset_parts_unchanged", "untouched_slide_content_and_style")} for report in reports], indent=2))
