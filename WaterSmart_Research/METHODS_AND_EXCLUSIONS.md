# Methods, search record and excluded leads

9 October 2026 · WaterSmart v3 · Team The Last BrainCell.

## Research design

Targeted desk research and reproducible secondary analysis, after reading the complete current master context. Domains: water chemistry/recency, hair science, existing Bangladesh consumer studies, market/competitors/prices, Marico platform/financial disclosures, ingredients/strip sourcing, cosmetics/BSTI/tax/EPR requirements and every existing model driver. This is not a registered systematic review, clinical experiment, representative consumer survey or comprehensive legal opinion.

Searches used public original/publisher/official sources. Query families included Bangladesh shampoo consumer preference, salinity hair concerns, hardness/iron and hair-fibre studies, Bangladesh groundwater microdata, newer BWDB/tap measurements, domestic shampoo supplementary duty, official cosmetic rules/BDS/EPR, Marico Bangladesh FY26 manufacturing/tax/fund, individually sealed OEM hardness strips and current product/pack listings. Query/result text, including negative/failed leads, is preserved in 25 `raw/web_*.json` captures. No private competition text was entered in public searches.

Primary websites, full official/publisher files and NLM original-study records were preferred. No paywall purchase, outside communication, physical shop visit, product trial, browser account mutation or form collection occurred. Collection URLs, UTC dates, bytes/status and SHA-256 are preserved in `download_manifest.jsonl`; source-index failures remain visible. An HTTP200 response is checked for actual PDF magic before accepting it as a PDF.

## Water transformation

`scripts/analyse_water.py` reads the original BGS CSV including its units row. Unique sample IDs, raw chemistry, coordinates, well type/depth, historical administrative labels and dates are preserved. Iron/calcium/magnesium are mg/L; well depth is the source's metres. Raw `<x` means an interval [0,x), not zero or x/2. Missing results remain blank.

Ca/Mg-equivalent hardness is calculated **per paired well**, 2.497×Ca + 4.118×Mg, then summarised. It is not calculated from the district's separate medians. Interval lower/upper bounds propagate. Quantiles use linear interpolation separately for lower and upper bounds; an exact field is filled only when bounds agree. Threshold categories with ambiguous intervals are not forced into either class. Counts use their own nonmissing/determinate denominator. Min/max “exact” fields exclude censored observations and are not absolute minima/maxima bounds.

Hardness bands are soft ≤60, moderately hard >60–120, hard >120–180 and very hard >180 mg/L as CaCO3. The descriptive Fe thresholds 0.3/1/3 mg/L are chemistry cuts, not tested hair-damage limits. Unweighted counts/percentages describe the sampled wells. No national household weights, current source/tap linkage, spatial interpolation, seasonal imputation, confidence from group n, salinity derived from sodium or census-market extrapolation is used.

Grouping yields 61 districts and 433 **historical district/thana pairs**, not a reconciled current administrative map. Uncovered areas show no coverage. A newer monitoring PDF is not pooled into the old microdata. The Dhaka paper is transcribed only where numerical prose/table values are explicit; Kamlapur hardness remains missing. Source quality flags are retained even when a finding is useful.

## Surveys, opinions and literature

Published aggregates are transcribed by table/denominator, never reconstructed into respondents. Their n=390 and n=391 remain separate samples with original population/sampling and publication dates; collection dates remain unspecified/unrecovered. Likert means are not percentages. No correlation, individual-data bootstrap or demographic cross-tab is invented from marginal tables.

NLM XML stores seven original-study bibliographic/abstract records. Supporting and contrary results are retained. Matched hair segments are not independent people; shared-author study independence is unknown. No pooled meta-analysis or clinical causal claim is made. Abstract records do not establish exhaustive full-protocol review or product replication.

Five user-supplied adult opinion summaries are user-confirmed real. Original supplied summaries and paraphrased structured notes are retained separately. Consent/date/price-order metadata are pending, so method-complete primary n remains zero. The notes' literal maximum-price values are preserved; a 5/5 arithmetic pattern is not population conversion. No synthetic consumer/water/supplier rows have been created. Financial sensitivities are explicitly scenario calculations, not simulated real demand observations.

## Retail and market

`scripts/harvest_retail.py` parses archived Arogga Product/Offer JSON-LD and Chaldal product HTML. Prefer Chaldal's displayed discounted price when present; use MRP only if it is the actual displayed offer. Deduplicate retailer/product/declared size, omit mixed bundles/free-product volumes, and calculate price per100ml only for explicit comparable volume. Twelve5.25ml sachets total63ml. Current listing availability is a retailer statement, not fulfilled checkout/physical shelf stock. No country attribution of global review counts is inferred.

Observed sample:24 product/pack prices, a convenience catalogue sample of two retailers on9Oct2026. User-recalled prices are stored separately and not treated as retail observations. Mordor/VMR estimates retain publisher/year/definition uncertainty; no averaging, undocumented FX or SAM is created. More expensive imported listings do not establish price acceptance for a new local concept.

## Finance and project integration

Baseline files/hashes preserve the original v3. `scripts/finance_overlays.cjs` extracts the frozen pure JS model and makes explicit SD/tax/fund adjustments, keeping other drivers fixed. NR uses VAT-exclusive MRP less the old trade share as an assumed invoice inclusive of SD. Fund5% of positive monthly incremental EBIT-before-fund and tax20% afterward are illustrative. Actual taxable invoice, exemption, fund base/deductibility and cash payment timing remain pending. Internal field `sd` in the original model means **selling/distribution**, not supplementary duty.

Both full final NWC release (wind-down) and no-release views are retained. The14.104% uniform price break-even keeps volumes unchanged; it is a numerical threshold, not WTP/elasticity evidence. No cost/volume driver has been silently reclassified as verified. 847 assertions check cash/NPV/peak and annual/monthly reconciliation independently of displayed totals.

The research report/viewer and official fiscal finding take precedence over old investment conclusions. The legacy interactive model and old JSON are explicitly labelled historical/fiscally incomplete. Changes to the field logger are explanatory links only: storage keys, saved user records and eligibility logic are preserved; published samples are not imported as primary entries.

## Excluded or qualified leads

| Lead/problem | Disposition |
|---|---|
| Guessed SCIRP paper ID120934 | Wrong article about a mathematical/historical subject; never used as the shampoo citation. Correct DOI10.4236/jss.2022.1012016 retained. |
| Exploratory bdlaws act1092 | Unrelated agriculture act; excluded. Correct VAT/SD act1106 used. |
| Nouryon legacy `.pdf` URL returned HTML | Retained as invalid PDF; no false PDF citation. Actual13-page product guide obtained as replacement. |
| Hach direct TLS failure | Manufacturer specification seen via web capture; full raw download unavailable. Price-on-request retained; alleged catalogue prices unverified. |
| Simplex direct403; Ubuy direct403 | Public web capture retained, with retail/variant/shipping limits; not represented as full direct downloads. |
| BSTI directory/preview/catalogue failure or404 | Designation primary-search/earlier-audit supported; numerical standard limits unresolved. |
| BBS HIES/Census direct timeouts | Search leads saved; not used to construct a bath-water exposure SAM or2026 willingness to pay. |
| BWDB filename/archive dated later | Publication isDec2022; measurement mostly2019–2021.901monitoring wells are not newly measured2025/26households. |
| Dhaka2025paper inconsistencies | Retain measured numeric locations and warning; do not repeat misclassification or health-limit claims. |
| CutPrice Pantene1450vs850, unknown size | Source conflict logged; no Tk/100ml or definitive MRP used. |
| Ubuy Malibu multiple sizes | Tk2182 associated with selected9fl oz, not100ml; shipping/customs excluded. |
| Retailer lists Naturale EDTA | Lead only pending actual pack/manufacturer; no claim of complete verified current formula. |
| Mollah/Kim/Choudhury2015 student survey, mirrors only | Original full source not acquired; no n211 individual dataset or demand estimate made. |
| BRAC-listed2015n200 shampoo abstract | Original method/full data unavailable; not quantified WaterSmart evidence. |
| Generic2024water-quality Mendeley dataset | Place/date/sampling not sufficiently documented for this application; excluded. |
|2025uploaded GBM river-ion dataset, measured2019–20 | Surface river scope differs from bathing-household exposure; not blended into well/consumer data. |
|2019salinity-health publisher retrieval403 | Does not establish WaterSmart efficacy/hair cause; no unsupported clinical conclusion. |
| Beauty trend, journalism, company/group analyst estimates | At most background/lead; current core science/capability uses original studies/company files. |
| Final cosmetics rules not found | Status unresolved, not a claim that none exists. |
| EPR public gazette initially inaccessible | Original36-page PDF subsequently acquired; core pp1–9 visually checked. Earlier original-SRO gap is closed. |

## Re-run order and change control

From the workspace root, run `python WaterSmart_Research/scripts/analyse_water.py`, `python WaterSmart_Research/scripts/harvest_retail.py`, `python WaterSmart_Research/scripts/build_study_data.py`, `python WaterSmart_Research/scripts/build_registers.py`, then `node WaterSmart_Research/scripts/finance_overlays.cjs`. Build the dictionary/viewer and run QA afterward. These calculations read the frozen baseline; do not run old v2-to-v3 rebuild scripts over edited files.

`scripts/collect_sources.py` can refresh a documented public source list, but ordinary resumption should use saved valid sources and hashes instead of repeating downloads. New raw evidence needs a dated source record, separate publication/measurement dates and a fresh hash. Retain old evidence and annotate revisions. Read `CHECKPOINT.md` and `state.json` for the exact next dependency; never mark a lab/pilot result completed because the literature package is complete.
