# Round 2 submission pack: Parachute Naturale WaterSmart

Team The Last BrainCell · OTW Season 5 · deadline **10 Oct 2026, 6:00 PM BST**

## Files

| File | What it is |
|---|---|
| `WaterSmart_Round2_Deck.pptx` / `.pdf` | 18-slide proposal: cover, 15 content slides, 2 appendix slides (limit 20), with `[ ]` slots for your field results |
| `WaterSmart_Round2_Deck_NoFieldwork.pptx` / `.pdf` | Same deck with no slots: field panels replaced by sourced evidence and the pre-pilot test plan. Submittable as is |
| `Video_Script.md` | 3-minute script with shot list |
| `QA_Prep.md` | 14 likely judge questions with answers |
| `Field_Guide_and_Hypotheses.md` | Tonight's fieldwork, slot calculations and expected ranges |
| `finance/finance_v4.cjs` → `finance_v4_output.json` | The one source for every financial number in the deck and video |
| `deck/build_deck.cjs` | Rebuilds the deck from the model output; `deck/build_map.cjs` and `deck/build_assets.cjs` make the map and mock-ups |

## Business case (v4)
v4 reuses the team's v3 monthly model unchanged. It applies the fiscal correction (SD 15%, tax 20%, WPPF 5%) and reproduces the corrected −3.82 / −6.32 Cr exactly. On top, it makes four proposal decisions, each benchmarked:

- 340 ml priced at Tk 360 (Hijab Fresh 340 ml sells for Tk 390, Sunsilk 340 ml for Tk 350)
- A&P stepping down to 10% of net revenue (Marico FY26 MSD was 5.2% of revenue)
- S&D at 8% of net revenue
- Tk 4.5 Cr digital-first launch budget

Result: NPV +Tk 3.1 Cr (+0.5 Cr without working-capital recovery), IRR 25%, peak funding Tk 9.8 Cr. These are planning assumptions, listed in Appendix A, not supplier quotes or Marico confirmations.

## Before you submit: fill the slots
The deck has `[ ]` slots that only your real fieldwork can fill. See `Field_Guide_and_Hypotheses.md` §3.

- [ ] Slide 4: test date, hardness, iron, TDS
- [ ] Slide 5: n; changed water source count and % worse; % unprompted water; % top-2 at Tk 360; median maximum price; foam %
- [ ] Slide 18: survey n
- [ ] If a test wasn't done, delete that line rather than leaving `[ ]`
- [ ] Search the PPTX for `[ ]` and confirm none remain
- [ ] Add member names to the cover if required

Then:
- [ ] Rebuild: `cd deck && NODE_PATH="$(pwd)/node_modules" node build_deck.cjs` (add `NOFIELD=1` for the no-fieldwork version), or edit the PPTX directly
- [ ] Export the PDF; upload PPTX + PDF + video to one Drive folder
- [ ] Sharing: "Anyone with the link → Editor"; open the link from another account
- [ ] Submit well before 6:00 PM. It cannot be edited afterwards.
