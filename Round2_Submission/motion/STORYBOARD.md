# WaterSmart pitch film: animation guide and storyboard

2:55 total · 1920×1080 · 25 fps · motion graphics rendered from code (`engine.cjs`). This follows `prompt.md`: same scenes, timings, on-screen text and fact sheet. All numbers come from the FINAL15 deck; nothing is added or inflated.

## Global motion language
- **Stage:** deep navy (`bg(t)`) with slow drifting aqua light. Amber (#F5A31A) is used **only for key numbers**. Rust (#B4511F) is used only for iron, stains and problem moments.
- **Type:** Segoe UI semibold, left-aligned headlines 56–72 px, labels 28–32 px. Bangla in Nirmala UI. One idea per beat; every title holds ≥1.5 s.
- **Easing:** entrances `ease.out` or `ease.outBack` (400–700 ms); moves `ease.inOut`; nothing linear except counters' final ticks.
- **Counters:** every key number counts up (`count(p, value, decimals)`) and then settles with a small scale pop (1.08 → 1.0).
- **Hero motif, the colour meter:** `meter()` 5-step strip scale (Soft 0 · Moderate 60 · Hard 120 · Very hard 250 · 425). It reappears as the reveal device in scenes 5, 6 and 11.
- **Depth:** parallax layers (background drifts slower than foreground), soft shadows, light sweeps across the bottle.
- **Safe areas:** content in y 80–880. Source line at y 915 (`source()`). **y ≥ 950 is reserved for burned-in subtitles.**
- **Tags:** "Concept mock-up" on every product shot; "Illustrative animation" on the mineral/foam sequence (`tag()`).
- **Edges:** the engine fades each scene in and out of navy over 0.3 s, so scenes cut cleanly.

## Scenes

| # | Time | Dur | Beats (motion) | On-screen text | SFX cue |
|---|---|---|---|---|---|
| 1 | 0:00 | 6 s | A rust-tinted droplet falls in slow motion onto hair and splashes; the Bangla question rises in | দোষ কি চুলের, নাকি পানির? / Is it your hair, or your water? | drip, hum |
| 2 | 0:06 | 17 s | Vector montage, 4 panels sliding in: (a) suitcase figure at a hall gate; (b) mess room unpacking; (c) bucket filling under a tap, an **orange stain ring** draws around the rim; (d) weak foam bubbles shrink, a hand pours more shampoo (pour stream grows) | New city · New hall · **New water** (words punch in one by one, "New water" in amber) | tap pour |
| 3 | 0:23 | 19 s | District map draws in district by district (mask wipe top to bottom), camera push into Dhaka with a pulsing pin; three stat cards count up; a water ripple sweeps the city | **58 of 61** districts · **65%** iron · **58%** hard · **6 of 12** Dhaka taps (2025) | whoosh per card |
| 4 | 0:42 | 13 s | Phone survey UI slides up, dissolves into a 22-figure grid; 18 figures light up amber one by one; then a mirror moment: a figure holding two bottles, a question mark | **18 of 22** who changed water: hair problems got worse · Team survey, n=49 | blips |
| 5 | 0:55 | 28 s | **Hero.** (1) The bottle rises through water with light caustics and an orbit sway; title lockup. (2) Illustrative animation: grey/rust mineral particles cling to a hair strand and choke the foam; aqua GLDA rings lock on and carry them away; the foam swells white. (3) Cap close-up: click, foil peel, strip slides out, dips, the colour blooms, the meter lands on **Hard** (chime). (4) A sachet QR is scanned and the phone (Pani Map) slides in. (5) Price row pops: Tk 3 · Tk 180 · Tk 360 | WaterSmart · The shampoo that checks your water first · 3-in-1 · Soft/Moderate/Hard/Very hard · prices | swell, click, peel, tink, chime, blip |
| 6 | 1:23 | 16 s | Three vertical phone frames (split screen) where students dip strips; each lands on a meter colour with a burst; a share card flies to a friend; then the campus Pani Lab booth with a queue | No shampoo we found offers a water test in the pack · #PaniCheckChallenge · Test → Share your colour → Challenge a friend · Pani Lab: **30 universities** | chimes, whoosh |
| 7 | 1:39 | 21 s | Four navy cards slide in staggered, each with an aqua icon and a looping micro-animation; the last card's **45.5%** counts up | They feel it, now they can see it · Naturale, a brand they trust · Fair price: Tk 3 sachet · Tk 106 per 100 ml vs Tk 142–180 · **45.5%** of water-movers named Tk 360+ (10 of 22) | soft pops |
| 8 | 2:00 | 18 s | The bottle slides onto a Naturale shelf (brand house); stylised factory line with bottles gliding on a conveyor; the triangle Innovation · Diversification · Scaling up assembles; a coastal dusk silhouette with LonaJol "Phase 2" | **#2** most penetrated shampoo brand · Mouchak +45% batch capacity (FY26) · Buy only strip + GLDA · LonaJol next | conveyor hum |
| 9 | 2:18 | 16 s | Data stage: outlet dots bloom across the map (37,330 → 104,400 counter); bar chart Y1→Y3 grows with counters; NPV/IRR tiles pop | Outlets **37,330 → 104,400** · Net revenue **Tk 8.1 → 28.5 → 41.4 Cr** · EBITDA-positive Year 2 · **+Tk 5.9 Cr** Y3 · **NPV +Tk 3.1 Cr · IRR 25%** vs 15% hurdle | ticks |
| 10 | 2:34 | 9 s | A timeline glides (M1–6 → M7–12 → M13–16); four gate icons tick green; amber **Tk 3.5 Cr** lands centre with a pop | The ask: **Tk 3.5 Cr** before go/no-go · 6-month pilot · ~1,500 outlets | ticks, thud |
| 11 | 2:43 | 12 s | The droplet runs off clean hair; bottle hero with an aqua rim light; the meter glows once; logo lockup and end card with names | দোষ কি চুলের, নাকি পানির? **আগে পানি চেক করুন।** · Team The Last BrainCell · Nafis Mohtasim Ramim · Khandaker Shadman Sakib Siddiquee | chime, resolve |

## Audio
Narration: ElevenLabs "Amit – Indian Commercial Voice" (eleven_v4), English, male, per `prompt.md` §3; silence-trimmed and fitted to each scene (tempo ≤ 1.085). A synthesized ambient pad sits under it, ducked under speech. Burned-in English subtitles appear in the reserved bottom band.

## Build
`node engine.cjs scenes/<file>.cjs` renders one scene to `segments/<id>.mp4`; `--check 1,5,9` writes stills to `frames_check/`. `assemble.cjs` joins the segments, narration, music and subtitles into `../WaterSmart_Pitch_Video_Motion.mp4`.
