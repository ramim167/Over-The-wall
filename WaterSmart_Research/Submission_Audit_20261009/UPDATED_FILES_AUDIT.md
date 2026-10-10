# WaterSmart updated-file audit — 9–10 October 2026

**রায়: সব missing item যোগ হয়নি। Financial redesign এবং submission materials যোগ হয়েছে; actual costing, method-complete primary data ও private/expert confirmation এখনো পাওয়া যায়নি।** কিছু নতুন slide/script-এ বাস্তবে সম্পন্ন হয়নি এমন কাজ সম্পন্ন হিসেবে লেখা এবং কয়েকটি সংখ্যাগত ভুল আছে। Contest proposal-এর জন্য future lab/pilot gates রাখা যায়; সেগুলোকে completed evidence বলা যাবে না।

Scope: earlier master/research package; both Round2 PPTX/PDF variants; README, Q&A, video script, field guide, Google Form guide; v4 finance source/output; existing raw/analysis evidence; focused local-file search. Existing submission files were reviewed without rewriting them. This report addresses the previous six-item missing-work checklist.

## 1. What was added, and what remains missing

| Previous missing item | Current result | Evidence and remaining requirement |
|---|---|---|
| U01–U05 collection date, anonymous-use consent, price-order | **Still missing** | `analysis/user_opinions_metadata.json`: 5 user-confirmed real summaries, 0 method-complete eligible records. The new field guide explicitly says metadata are pending. No new metadata-update file located. Do not convert the five summaries into a representative survey. |
| Actual landed BOM/supplier quotations | **Still missing** | COGS Tk 1.20/55/95, strip+sleeve Tk 3, CAPEX Tk 3 Cr and pilot Tk 0.5 Cr remain planning inputs. Manufacturer specifications are available; a specification/product page is not an OEM quotation. Need quantity, tax/freight, packing/insertion/tooling, terms, date and validity. |
| Marico/expert confirmation of invoice, fund, channel and working-capital treatment | **Still missing** | Public SD 15%, company tax 20% and participation-fund 5% are incorporated. Actual invoice/trade base, applicable exemptions, project fund/tax base/payment dates, distributor terms and line costs remain unconfirmed. No dated private reply located. |
| Financial redesign | **Added, conditional** | v4 changes 340ml Tk 330→360; Y2–Y5 A&P 18/15/14/14→15/12/10/10%; S&D 10→8% NR plus unchanged fixed cost; Y1 A&P Tk 6→4.5 Cr. Arithmetic reconciles. The earlier proposed comparison of strip-cap, no-strip and activation testing is still absent; strip-cost sensitivity alone does not compare these designs. |
| Product and demand validation | **Protocols/gates added; results missing** | Formula/hair-tress, stability, home-use and paid-pilot plans are present. No completed WaterSmart formula test, strip/pack/line qualification, current team water/foam reading, pack weighing or paid repeat dataset located. Future LonaJol gate is retained; it does not certify saline-water performance now. |
| Final presentation/video materials | **Deck/PDF/script/mockups/Q&A added; video incomplete** | Both deck variants have 18 slides. Actual finished WaterSmart video not located. Normal version retains field-result slots; NoFieldwork version substitutes secondary evidence/test plans. Both need the content corrections below. Final slide-count/template permission remains unverified against the original case. |

The Google Form guide and field protocols prepare collection; they contain no respondent export. Published studies remain attributed secondary evidence from their original collectors.

## 2. Local search result and limits

Searched Downloads, Documents, Desktop, OneDrive Documents/Desktop and `.codex/attachments`, with workspace reviewed separately. The machine-readable inventory is `local_file_search.json`. Outside the workspace, project matches were older idea/field-plan/master copies, the official case PDF, the earlier pasted v3 update instructions and a RootShield rebuild prompt. These are planning/context files. No new project response CSV/Sheet export, quotation, chemist/Marico email export or respondent-metadata document was located in this scope.

Google Drive and Gmail searches both returned **USER_NOT_LOGGED_IN**. No private cloud/mail contents were read. This is a scoped “not found” result, not proof that no file exists anywhere on the PC or online. Browser-local storage was not inspected. Known logger HTML files load data from browser storage; their source code is not an export of saved responses.

## 3. Finance: arithmetic passed; inputs still conditional

The audit executed `finance_v4.cjs` with its file writes intercepted. **454 numeric values** in the stored output matched recomputation. Both 73-row cash schedules (M0–M72), monthly/annual cash bridges, independently calculated discounted cash flow, IRR, funding peak and payback reconciled with no discrepancies. The original finance source, JSON and baseline HTML retained identical hashes.

| Metric | With final NWC recovery | Without final NWC recovery |
|---|---:|---:|
| NPV at 15% | Tk **3.094903 Cr** | Tk **0.498289 Cr** |
| Annual equivalent IRR | **25.0553%** | **16.9638%** |
| Peak funding | Tk **9.794014 Cr** | Tk **9.794014 Cr** |
| Peak month | **M25 = national Y2 M1** | Same |
| Payback from M0 | **4.840958 years** | Same |
| Combined worst-case NPV | Tk **−4.378533 Cr** | Tk **−6.351960 Cr** |

Y3 NR Tk 41.364498 Cr, incremental EBITDA Tk 5.936757 Cr and blended GM 46.7698% also reconcile. These are forecast outputs conditional on the sales, cost and fiscal inputs.

The input bridge is important: fiscal-corrected v3 no-recovery NPV was −6.324228 Cr. Applying the four v4 decisions sequentially produces −4.706664, −2.239756, −0.707025 and finally +0.498289 Cr. This improvement comes from a proposed price/cost redesign, not newly collected operating data. The bridge order affects the individual contribution of interacting changes.

**Very narrow no-recovery buffer:** holding all other model inputs fixed, a uniform COGS increase of approximately **1.2252%** reduces no-recovery NPV to zero. The corresponding strip-only cost ceiling is approximately **Tk 6.313**, conditional on the unquoted Tk 92 non-strip cost and unchanged demand. Neither number is an actual supplier offer.

Public benchmarks do not establish that the same unit sales will be achieved after lower launch/continuing spend or at Tk 360. The model holds volumes fixed after repricing. The FY26 company marketing/selling/distribution ratio (~5.2%) covers the existing portfolio, while v4 Y3 A&P plus S&D is **22.42% of NR**. The finance metadata’s “still ~2x company ratio” is not a like-for-like combined comparison.

Files: `finance_v4_independent_audit.json`, `v4_monthly_with_recovery_audit.csv`, `v4_monthly_without_recovery_audit.csv`, `audit_finance_v4.cjs`. This validates arithmetic, not product feasibility or forecast accuracy.

## 4. Corrections needed before submission

### A. Completed-work and performance wording

1. **Video 0:30–1:20:** the voice-over says “here’s what we saw in our own hall” and “So we built” even when the visual fallback is a mechanism illustration. No actual team foam test or qualified WaterSmart formula was located. Create a separate no-fieldwork voice-over: “We propose…”; explain the test as planned. A mockup cannot establish performance. Keep actual observations only if a dated real record/footage is supplied.
2. **Slides 6/7 and video:** chelation as a chemical approach has supporting evidence; the unmade WaterSmart formula’s lather, deposit removal and conditioning performance are proposed claims. Slide 9 correctly gates claims under R&D; apply that status throughout. Existing Naturale dermatological testing does not qualify this new formulation. Replace “dermatologically tested, like all Naturale” with a planned qualification requirement. Avoid an untested “any water” promise while saline performance is separately gated.
3. **Slide 10 / Q&A 12:** WaterSmart GT availability is currently a distribution plan, not an existing listed product. Mark its ✓ as planned. Official Dove Arabia material confirms the product/EDTA; it does not prove “only in the Gulf”, absence from all Bangladeshi GT or the absence of chelators in every mass shampoo. The competitor table’s “–” for Naturale core/mass-brand chelators needs exact current pack-INCI checks; until then use “not verified”.
4. **Slide 13 / video 1:55–2:15:** Marico has a relevant existing factory/brand/channel platform. The new formula, cap cavity, pouch insertion, throughput, rejection rate and production allocation have not been qualified. Change feasibility/capability checkmarks to conditional SKU qualification; frame “runs on Mouchak lines” as the intended route. “Buy only the strip and chelator” is a Make/Buy concept, not a verified complete procurement/BOM claim.

### B. Incorrect or unsupported numbers

5. **Slide 8 SAM:** ~21M adds 4.82M students to ~16.5M lifetime internal migrants, with overlap acknowledged. “Up to” and the overlap note do not make this a serviceable-market estimate. It combines different reference years and a lifetime migration share applied to a later population, and lacks current mover, age, exposure, shampoo-use and purchase eligibility. Use a target-segment hypothesis; keep SAM unquantified until those links and the original UGC/BBS tables are checked.
6. **Slide 8 usage:** v4 Y3 volume is 860,059.2 litres. At the slide’s assumed 7ml/wash, this equals **122.8656M washes**, not 131M. At 104 washes/year, it equals **1.1814M user-equivalents**, not 1.3M measured/unique users. Mixed formats/actual dose remain assumptions. Do not divide by the unvalidated 21M SAM to claim penetration. Y3 gross sales divided by a 2026 category estimate is a dated reference comparison, not a future market-share forecast; Tk 122/USD is an FX input needing its date/basis.
7. **Slide 5 consumer-factor ranking:** packaging mean **3.4026** is eighth of nine; fashion/status is lower at **3.2333**. “Packaging comes last” is incorrect. Functionality is highest in that sample; the next ranks also include quality. Preserve the original study attribution and sample limitations.
8. **Slide 15 / Q&A 9:** M25 is **national Year 2, month 1**, following 12 prelaunch months and 12 national-launch months. It is not “the end of the launch year”; that is M24.
9. **Q&A 4:** its first sentence discusses no-recovery NPV, but the stated combined worst case **−4.4 Cr** uses recovery. State both policies, or use **−6.35 Cr without recovery** consistently. The deck’s scenario numbers can retain −4.38 if explicitly headed “with recovery”.
10. **Q&A 7:** full M72 NWC recovery requires a recoverable working-capital run-down/wind-down assumption. A fixed forecast horizon alone does not establish release while sales continue. Disclose the terminal policy and show both cases.
11. **Slide 11 KPI:** the first three years’ 340ml units total **1,542,630**. These correspond to strips distributed under one-per-pack, not observed “water tests done”. Measure actual strip use separately.
12. **Slide 13 plastic:** the **68% less plastic per wash** figure relies on assumed 32g bottle/9g refill, pack volumes, 7ml dose and omitted accessories. No measured pack BOM was located. Label it an illustrative estimate with full inputs/scope, or remove it as an achieved sustainability claim. The **1% NR EPR reserve** is a budget assumption, not proof of compliance or a quoted compliance cost.

### C. Screening, regulatory and execution limits

13. **Hardness-strip scope:** prominently state that this measures total hardness, **not iron, salinity or drinking-water safety**. An Iron & Hard Water proposition needs separate iron evidence; historical data already include 649 wells with Fe >1mg/L but hardness ≤120. A low-hardness colour cannot exclude an iron issue, and a hardness strip cannot validate LonaJol’s salinity use case.
14. **Strip instructions/specification:** “dip for one second” on slides 6/10 and in the video must match the chosen manufacturer/product instructions. Keep the supplier’s chart and read time. The illustrated colour chart is already labelled illustrative; preserve that. The 0–425 range, Tk 3 sleeve cost and 18-month shelf-life target are not a single qualified sourced specification. The retrieved MN grade has a 12-month/4–30°C specification, so 18 months needs a qualified alternative and pack stability evidence.
15. **Slide 13 regulation/QC:** the archive contains a June 2026 cosmetics-rules draft; final operative status as of submission has not been established. “Still in draft” overstates the available confirmation. Numerical BSTI release requirements were not acquired; pH 5–5.5 is a proposed R&D specification pending the actual standard and formula review. Confirm entity-specific EPR and certification/approval requirements before commercial release.
16. **Slide 4 geographic wording:** the historical district flag percentages and 58/61 majority statement are consistent with the stored well data. “5 largest division districts” lacks a defined size criterion. Use “five illustrated division districts”. Historical district-well percentages are not current city-tap or household prevalence. The newer Dhaka comparison is 6 of 12 explicit hardness values; it is selected-location context, not a city estimate.
17. **Slide 12 channel volume:** the old model assumes wholesale sales are to buyers outside already-counted GT. Restore that condition and validate it in a sales panel. The 104,400 channel-account total includes wholesalers/e-commerce accounts and is not a deduplicated count of consumer-facing stores. Removing the qualification risks wholesale/retail sales double counting.

### D. Version and submission consistency

18. **Tk 330 versus Tk 360:** root idea/master/logger retain the previous fiscal case and Tk 330 measurement fields; the new form/deck use Tk 360. The logger still calculates `pi330` and WTP ≥330. Do not import Tk 360 intent into that field or apply the old threshold. Declare the active proposal version; version the logger/schema and migrate existing data explicitly if it will be used. Two of the five supplied maximum prices (350 and 330) are below the new 360 proposal, so those notes do not validate universal acceptance.
19. **GM gate 48%→45%:** slide 16/Q&A use 45%; the root master uses 48%. This is an additional decision beyond the listed four finance changes. The new model Y3 GM is 46.77%, so the difference changes a GO/NO-GO outcome. Document the rationale/owner and synchronize the active version; neither threshold is externally validated.
20. **Field-guide analysis:** Q11 is optional, so a blank answer is missing, not a “did not blame water” response. Calculate unprompted water mention among eligible participants who actually answered the cause question, and separately report missingness. Q14 and other rates need valid answered bases; normalize exact Bengali option labels and flag contradictory checkbox answers. Proposed 40%, 15–25%, 50% and other interpretation thresholds are hypotheses, not published validated benchmarks. A 5% reduction from 360 is **342**, not 330, and the model’s uniform price sensitivity also reprices other SKUs.
21. **Slide count/“submittable as is”:** both PDFs have **18 slides**. The supplied official case PDF page 12 states a maximum of **15 slides** and a **3-minute** video. The local master records a later 20-total-slide clarification, but its source email was not retrieved in this audit. Verify that clarification, template flexibility and any primary-data minimum. The NoFieldwork deck cannot be certified “submittable as is” before this and the content corrections are addressed. No completed lab/commercial pilot is automatically required merely to describe future execution gates.
22. **Build portability:** `deck/build_deck.cjs:12–13` requires an Administrator `.claude/.../apply_theme.js` path that does not exist on this PC. `deck/node_modules` is also absent. README rebuild instructions use Bash syntax in a PowerShell environment. Existing PDFs/PPTX are readable, but the provided script cannot currently rebuild here as documented. Make the helper/dependencies portable and document PowerShell commands before relying on a last-minute rebuild.
23. **Minor finance/plot metadata:** one v4 change entry still says Y1 A&P Tk 6 Cr “unchanged”, despite the real Tk 4.5 Cr change. Fix the description. Appendix sensitivity values are rounded to two decimals before being displayed to one; strip Tk 6 NPV **0.0471 Cr** becomes **0.1** on the chart, and delay **−0.0215** can look like zero. Preserve unrounded inputs and show two decimals near zero.

## 5. Practical order of work

1. Correct completed-work wording, inaccurate arithmetic/rankings and recovery-policy labels; declare one active Tk 360/gate version.
2. Verify the actual organizer slide/template clarification; use the NoFieldwork evidence status honestly if no real results arrive. Produce and time-check the finished video.
3. Fill each real opinion’s missing metadata; import any actual consenting response export with answered denominators and full provenance. If none is available, retain the explicit limitation.
4. Keep invoice/BOM/line/formula validation as named pending execution gates; obtain dated real replies/quotes when possible. Benchmark figures can remain labelled planning inputs in a contest proposal.
5. Compare alternative strip/pack/testing designs with conditional economics; promote future quotes/test results only when actually received.

The existing Marico platform supports the strategic fit of the concept. It does not remove SKU qualification, channel-volume, BOM, demand or regulatory gates. The current pack is a developed proposal with conditional forecasts, not a commercially validated product.

## 6. Review record / resume

Sources supporting this review remain in the original research archive, including `published_survey_aggregates.csv`, `water_summary.json`, `water_by_district.csv`, manufacturer captures, Marico FY26 report and finance overlays. Newly checked public claims are captured in `web_new_claims_checks.txt`; absence of a search result was not treated as proof of product or regulatory absence. The [official Dove Arabia product page](https://www.dove.com/arabia/en/p/hair-therapy-hard-water-defense-shampoo.html/06281006548497) supports its listed ingredient/product claims only. The [Marico FY26 annual report](https://marico.com/investorspdf/Annual_Report_2025-26.pdf) supports the existing company platform, not approval of WaterSmart.

`audited_files_manifest.json` identifies the reviewed submission version. Audit report and extracted/rendered slide artifacts are in this folder. No email was sent, no cloud file changed, no respondents simulated and no new empirical evidence invented.

Resume by reading this audit and its manifest. If any proposal/data file changes, compare that file against the recorded hash, check its new evidence/provenance, update only affected findings and rerun the appropriate financial reconciliation when inputs change. Do not rerun old integration scripts blindly over the user's new proposal. The old research archive's v3 fiscal case remains a preserved reference; v4 is a separately audited conditional redesign.
