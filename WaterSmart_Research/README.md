# WaterSmart evidence research

Started: 9 October 2026, Asia/Dhaka. Team: The Last BrainCell. Scope: Naturale WaterSmart v3, OTW S5 Round 2, Marico Bangladesh.

## Read first

**Public secondary research completed on 9 October 2026; empirical/product/cost validation remains pending.** Start with the [full report](WaterSmart_Research_Report.md), [interactive viewer](WaterSmart_Research_Viewer.html) and [expert/human questions](EXPERT_AND_HUMAN_VERIFICATION.md). The old positive v3 NPV is withdrawn because domestic shampoo SD15% was omitted; current conditional fiscal overlays are in `analysis/finance_evidence_overlays.json`.

This archive separates observed secondary data, reported study results, independently reproduced calculations, proposed decisions, and unresolved evidence. A forecast cannot become a fact before implementation. No borrowed survey will be attributed to this team. No synthetic row will be counted as a real respondent. No supplier or respondent has been contacted by this research process.

Use `CHECKPOINT.md` and `state.json` to resume. Raw public downloads and search captures are in `raw/`; provenance is in `download_manifest.jsonl` and the evidence register. `scripts/` contains reproducible collection and analysis code. Original project files are snapshotted in `baseline/` before any integration changes.

Published studies remain credited to their original authors. Local transformations may be credited as “Team The Last BrainCell analysis of [source]”. Licensing/reuse limitations must accompany redistributed data.

## Evidence rules

- A public source verifies only the claim and population actually studied.
- Published sample shares are not national consumer prevalence unless the design supports it.
- Well measurements are not current household tap measurements or a shampoo purchase market.
- Listed prices are not negotiated landed quotations; a listing is not proof of stock.
- A chemistry mechanism is not proof of WaterSmart formula efficacy.
- Proposal prices, timelines and gates are decisions; outlet productivity, costs and sales are unverified model inputs until measured or quoted.
- Small convenience samples cannot justify synthetic expansion into claimed survey responses.
- A draft rule is not final law. A failed search is logged as unresolved, not absence.
- Actual human data supplied later must retain date, provenance, consent/eligibility and real denominators. No names or contacts are needed.

## Checkpoint sequence

1. Context, file snapshots, input inventory and questions.
2. Water/science: acquire data, validate units/missingness, reproduce summaries.
3. Consumer/market/competitors: survey literature and dated price observations.
4. Marico/supply/technical/regulatory: establish public capability and qualification gaps.
5. Finance: source-map every driver, analyse sensitivity without inventing inputs.
6. Synthesis, project integration, QA, unresolved requests and resume handoff.

Collection cutoff is the user date, 9 October 2026. Source publication dates and measurement dates must remain distinct from access dates.

## Delivery and verification

The report, dictionary, methods/exclusions, viewer and full model-driver/claim registers are complete. Raw files, original sources and failed attempts are retained. There are 3,534 historical well rows, 35 published aggregate rows from two distinct studies, 24 online price observations, seven NLM study records, five user-confirmed real opinion summaries with method metadata pending, and 730 conditional scenario-month cash rows. These are different units of analysis; never sum them into a respondent total.

`analysis/qa_results.json`, `analysis/qa_dom_results.json` and the financial overlay record the actual validation scope. The viewer was checked with jsdom, not a real-browser screenshot; no lab or physical-field test is claimed. Model and logger logic were preserved. Updated primary-data metadata belongs in `raw/user_opinion_metadata_updates.json` and must retain the user's source/date; then regenerate affected outputs/report counts. See the checkpoint before any rerun.

Deliverables are local. No publication, outside messages or spreadsheet workbook was requested/performed. CSVs/JSON are the analysis artifacts; no XLSX is implied. `artifact_manifest.json` records final files/hashes, with baseline/prior-review manifests retaining pre-edit originals.
