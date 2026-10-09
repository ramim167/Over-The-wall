# Field guide: tonight and tomorrow morning

The deck has 12 `[ ]` slots (slides 4, 5 and 18). Each one comes from a real test or the Google Form. Below: how to collect it, how to calculate it, and what result we expect based on published sources, so you can compare your result against an honest benchmark.

## 1. Tonight (9 Oct)

| Time | Task | Who |
|---|---|---|
| Now (15 min) | Build the Google Form from `../WaterSmart_Google_Form_Guide.md` (prices are now Tk 360). Publish and copy the link. | 1 person |
| Now | Share the link in hall, department and class groups. Ask friends to forward. Responses build up overnight. | All |
| Tonight (30 min) | Foam test and water reading in your hall (protocols below). Film both for the video. | 2 people |
| Tomorrow 1:00 PM | Download responses as CSV (Responses → Sheets → File → Download → CSV) and calculate the slots (section 3). | 1 person |
| Tomorrow 2:00 PM | Fill the slots in `deck/build_deck.cjs` (or type into the PPTX), rebuild, check, export the PDF. | 1 person |
| Tomorrow by 4:00 PM | Upload the PPTX, PDF and video; set "Anyone with the link → Editor"; test from another account; submit. | 1 person |

## 2. Protocols

**Water reading (slide 4).** Use whatever you can get today: hardness strips, an iron strip or a TDS meter (electronics shops and Daraz sell TDS meters for about Tk 300–600). Take water from the hall bathroom tap or bucket. Follow the kit's own dip time and colour chart. Record the date, place, kit name, and every reading exactly as read. TDS (ppm) is total dissolved solids, not hardness, so label it as TDS. If a reading is low, report it: one tap is one tap.

**Foam test (slide 5 and video).** Two identical clear glasses or bottles, 100 ml each: hall tap water and bottled water. Add 1 ml of the same shampoo to each, cap, shake 10 times, wait 30 seconds, and measure foam height with a ruler. Repeat 3 times. Foam reduction % = (bottled − hall) ÷ bottled × 100, using the averages. Film one run.

## 3. Slot calculations

| Slot | Slide | How to calculate |
|---|---|---|
| Test date, hardness, iron, TDS | 4 | Straight from your readings, with units |
| n consenting adults | 5, 18 | Rows where Q1 = yes (exclude test or dummy entries) |
| Changed water source: [ ] | 5 | Count of Q13 = হ্যাঁ |
| of them, [ ]% felt hair got worse | 5 | Q14 = "আগের চেয়ে সমস্যা বেশি" ÷ count of Q13 = হ্যাঁ |
| [ ]% named water unprompted | 5 | Among Q10 ≠ "কোনোটিই নয়": Q11 answers mentioning পানি / water / ওয়াসা / নলকূপ / iron ÷ that group |
| [ ]% would buy at Tk 360 | 5 | Q21 "অবশ্যই" + "সম্ভবত" ÷ n |
| Median maximum price | 5 | Median of Q20 numbers (drop blanks; keep zeros) |
| Foam reduction % | 5 | From the foam protocol above |

Paste the CSV into this session and I'll compute all of these and update the deck.

## 4. What to expect: benchmarks from real sources (hypotheses, not results)

| Measure | What sources suggest | What it means for the deck |
|---|---|---|
| Hall tap hardness, Dhaka | Dhaka district wells 1998–99: median 228 mg/L (BGS/DPHE, n=45). Dhaka taps 2025: 33–300 mg/L, median ~116 across 12 locations (ICCEI 2025). Supply water (WASA) can be softer than deep wells. | Above 120: "hard", supports the story. Below 60: report it honestly; the strip's point is that water varies by building. |
| Iron | Dhaka wells median 1.17 mg/L; 65% of national wells above 0.3. Treated supply water is usually lower. | Any reading above 0.3 matches the "orange stain" cue. |
| Foam reduction | Hardness ties up anionic surfactant, so less foam is expected in hard water; size varies with the shampoo. | Any repeatable difference across 3 runs is worth showing; no difference is also a result. |
| Felt hair got worse after a water change | No published benchmark; the five early conversations all described a change. | At least 40% supports the Movers insight; 20–40% keep it but soften the wording; under 20% lead with the national water data instead. |
| Named water unprompted | Usually lower than prompted answers. | Even 15–25% unprompted is a strong insight ("people don't connect it"). |
| Would buy at Tk 360 (top-2) | Concept tests usually overstate real purchase. | 50%+ supports price; under 35% test Tk 330 in the deck's sensitivity (price −5% ≈ Tk 342). |
| Median maximum price | Five early conversations: Tk 330–450 (directional, not for the deck until consent is confirmed). | Tk 360 or more supports the price. |

## 5. The five early conversations (U01–U05)
They stay out of the deck until you confirm, for each: collection date, anonymous research consent, and whether Tk 330 was mentioned before asking their maximum price. Once confirmed, they can go on slide 5 as "5 early conversations (directional)".
