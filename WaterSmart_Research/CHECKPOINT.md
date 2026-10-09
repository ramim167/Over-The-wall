# WaterSmart research checkpoint

**Status:** public secondary research, synthesis, project integration and appropriate data/DOM QA complete. **Product, cost and demand validation remains pending.**  
**Stage:** 6/6 of the public-research package. **Research cut-off:** 9 October 2026, Asia/Dhaka.  
**Completed UTC timestamp:** 2026-10-09T13:34:27.192072+00:00.

## Resume from the current state

Read `../OTW_S5_Master_Research.md` (Section17), `README.md`, `state.json`, `WaterSmart_Research_Report.md` and `EXPERT_AND_HUMAN_VERIFICATION.md`. Check source/artifact hashes and the download manifest before reusing evidence. Do not repeat completed downloads or run old v2-to-v3 builders over edited files. The earlier stage5 checkpoint is preserved in `CHECKPOINT_history_stage5.md`. No tool/session remains running.

## User steering and primary-data status

The user confirmed no prior team interviews, water/foam tests, retailer visits, pack weights, supplier quotes or private Marico confirmations. Five later adult opinion summaries are **user-confirmed real**; the user said collection date, anonymous research-use consent and price-order would be supplied. Those details have not arrived. Current notes=5; method-complete primary records=0. No synthetic respondents. No outside messages, account write or publication.

## Completed evidence

- **Water:** original BGS CSV/reports acquired; 3,534 wells sampled4Mar1998–15Dec1999, 3,530 valid chemistry, 61 districts/433 historical district-thana pairs. Fe median1.1mg/L; derived Ca/Mg-equivalent hardness median153.87205mg/L asCaCO3. Censored values retain intervals. 649 wells hadFe>1 withhardness≤120. These are unweighted historical wells, not current households, medical thresholds, NaCl orSAM. RawSHA256: `53ae9ece52fa812f78c3eda3097daba12ae4131f1a1205faf2f543404b597af8`.
- **Later context:** BWDB report publishedDec2022, 901 monitoring wells mostly2019–2021, no acquired row-level microdata. Dhaka2025 selected-tap paper:13 locations,12 explicit hardness numbers/one missing; source-quality issues retained. No pooling/interpolation.
- **Consumer/science:** two attributed convenience samples390/391,35 published aggregate rows; original Frontiers authors/publication1Aug2025 recovered. Seven NLM study records including contrary findings. Five notes remain five; no reconstructed individual survey data or simulated conversion.
- **Prices/market:** 24 deduplicated online prices with sale-price checks; zero physical retailer visits/transactions. MalibuTk2,182:selected9fl oz, shipping/customs excluded. PanteneTk1,450vs850 conflicts; size unclear. Publisher market estimates remain estimates; SAM not identified.
- **Marico:** FY26 actual shampoo batch/filling improvements and two new machines; tax20%/fund5% disclosed. Strong platform fit; no reserved capacity, cap trial, finished formula or cost quotation.
- **Supply/regulation:** sealed/custom strip offerings found; MN91224one-year life at4–30°C does not meet proposed18months. No landed OEM quote. Original36-page EPRgazette acquired and corepp1–9 visually checked. Current official shampoo localSD15% checked at BanglaPDFp64/Englishp109. BSTI numerical limits/finalDGDAtransition remain unresolved.
- **Registers:** 61 retrieval IDs (49 usable raw responses,11 failed,one HTML atPDF URL),25 web captures,56 claim entries,104 scalar inputs/labels/policies/gaps. Baselines/prior reviews preserved.

## Material fiscal correction

Original v3NPV3.15/0.26Cr omittedSD and is withdrawn as current investmentcase. SD15/tax20/fund5 conditional overlay, with old operating inputs frozen: NPV **-3.816315/-6.324228Cr**, peak funding **12.198447Cr atM37**, Y3NR **39.951474Cr**, incrementalEBITDA **2.950066Cr**, GM **44.887160%**.

Actual invoice/trade base, exemptions, tax/fund base/deductibility/payment dates and all operating drivers remain pending. Formula−25% is unquoted; uniform price+14.103845% is mathematical zero no-releaseNPV at unchanged volume, not WTP. No strip-only cost ceiling repairs the fiscal base. Full NWC release is a wind-down. Five cases/both policies retain all72months plusM0 (730CSV rows).

## Deliverables and integration

Full report, offline viewer/PaniMap, data dictionary, methods/exclusions, expert/human/RFQ questions, datasets, raw evidence/provenance and reproducible scripts are saved. MasterSection11.6/17 now use the conditional overlay. IdeaHTML has current results and a collapsed historical calculator. Its original pureJS model is unchanged. The logger has explanatory links only; its entire script/storage/merge code is unchanged. Published samples were not imported. Earlier factchecks/audits/JSONs have supersession notices with original numerical results preserved.

QA passed: **847 finance**, **11808 integrity/data**, **263 DOM/interaction assertions**. Scope is recorded in `analysis/qa_results.json`, `analysis/qa_dom_results.json` and the financeJSON. jsdom is not a browser screenshot, physical measurement or lab validation. No XLSX was requested/authored; artifacts are CSV/JSON/MD/HTML. Spreadsheet evidence/denominator guidance was applied; no unavailable workbook runtime is claimed.

## Next steps depend on actual new evidence

1. **User metadata:** append actual per-U01–U05 date/anonymous-consent/price-order to `raw/user_opinion_metadata_updates.json`: array with `record_id`, `collection_date`, `research_consent`, `price_order`. Preserve original answers/source. The study builder merges this separate input, so do not edit generatedCSV alone. Regenerate metadata/report counts/state/QA expectations. Five complete notes still are not paid conversion or product trials; anchoring/comprehension limits remain.
2. **Expert/private evidence:** obtain dated Tax invoice/SRO/application, complete BOM/landedRFQ, formula and actual test reports, pack/line qualification, operative regulatory requirements/EPR entity route, approved hurdle/cash scope. Exact questions/owners are in `EXPERT_AND_HUMAN_VERIFICATION.md`. Do not contact outsiders without user authorization.
3. **Current exposure/demand:** contemporary relevant household water linked to consenting adults; then qualified pilot sell-out, mature paid repeat/cannibalization. General published studies cannot supply these concept-specific outcomes.
4. **Reappraisal:** version new quoted/approved inputs, add omitted costs/actual payment dates, rerun correctedNPV/funding and terminal policies. Use the same version across deck/video/master/HTML. Never invent a cheaper quote or extra respondents to hit a score.

## Reproduction

From workspace root run analysis scripts in this order: `analyse_water.py`, `harvest_retail.py`, `build_study_data.py`, `build_registers.py`, `finance_overlays.cjs`, `build_dictionary.py`, `build_viewer.py`. Integration scripts are marker-guarded; `polish_research.py` reconciles integrated prose; `annotate_prior_reviews.py` preserves history. Review new user edits before any integration rerun. Then run `qa_research.py` and `qa_dom.cjs`; DOM uses the existing temporary jsdom location or `WATERSMART_JSDOM`. Future input changes require updating explicit old-count expectations, not changing data to satisfy stale tests. Run `finalize_research.py` last to refresh state/artifact hashes.

## Marico clarification draft

The user plans to email Marico. `Marico_Clarification_Email_Draft.md` is prepared for the user to send; no message has been sent by the assistant. User-directed revision: each of eight topics first asks whether the detail is required for Round2, then asks “If yes” for the minimum scope/guidance. This generic requirements email identifies team/category only; the idea name, mechanism, target segment, cap/strip innovation and prices are omitted. Earlier detailed draft preserved in baseline. No Marico response or private evidence has arrived. Preserve any later reply with date/role/source and distinguish requirements/guidance/benchmarks from quotes or validated results.

## Recipient lookup / user-directed Gmail sign-in

User asked for the correct OTW email recipient and authorized login to their specified Gmail account. Read `Marico_Contact_Lookup.md` and the public-source capture. No dedicated OTW email verified from inspected public pages. Gmail connector disconnected; in-app browser connection failed. A secure TinyFish Google sign-in handoff was provided. Latest default profile has no recorded Google sign-in. Await user authentication/Save profile, then verify the active account and inspect recent official OTW mail From/Reply-To/help instructions only. No private mail read and no message sent. Do not store passwords, OTPs or handoff tokens.
