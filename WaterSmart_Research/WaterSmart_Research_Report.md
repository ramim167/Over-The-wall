# WaterSmart: evidence audit and research report

> **Primary-data update,10 Oct 2026:** a user-disclosed WhatsApp/friend-of-friend survey is now analysed separately:50 submitted records,49 consent-yes,47 numeric maximum prices,medianTk320 and15 stated maxima>=Tk360. Read [the new primary report](Primary_Survey_20261010/SURVEY_ANALYSIS.md). Historical Q21 exposure wasTk400 per user declaration; current export labels say360 after revision. This adds consumer self-reports; it does not validate production costs,water chemistry,formula efficacy or paid demand. The public-research findings below retain their9Oct cut-off.

**Project:** OTW Season 5, Round 2 · Team The Last BrainCell · proposed Parachute Naturale WaterSmart v3.  
**Research cut-off:** 9 October 2026, Asia/Dhaka. **Use:** internal competition research; preserve the supplied case/masterclass confidentiality.  
**Analysis credit:** Team The Last BrainCell analysis of attributed public sources. External researchers retain credit for their studies and data collection.

## What the research establishes

বাংলায় মূল finding: বাংলাদেশে পানির mineral variation বাস্তব, এই concern নিয়ে published consumer evidence আছে, এবং Marico-র shampoo manufacturing platform-ও বাস্তব। কিন্তু WaterSmart-এর formula, strip-cap, paid repeat ও production cost এখনও পরীক্ষিত নয়। সবচেয়ে জরুরি correction: পুরোনো financial model-এ domestic shampoo supplementary duty বাদ ছিল। সেটি যোগ করলে একই volume/cost ধরে investment case negative হয়। তাই এখন proposal-এর সঠিক অবস্থান **qualified prototype/pilot-এর জন্য বিবেচনা**, unconditional national rollout নয়।

This package completes the public secondary research and reproducible analysis available in this run. It does **not** certify an unmade product or future sales. Unknowns are recorded instead of replaced by invented measurements. Design choices, proposed gates and forecast scenarios are explicitly distinguished from observations.

| Question | Evidence-based answer | Decision implication |
|---|---|---|
| Is there a Bangladesh mineral-water opportunity? | Historical well microdata show substantial variation; a later monitoring report and a small Dhaka tap study add context. | A plausible problem to investigate; no national household exposure rate or SAM established. |
| Do people report water-related hair concerns? | Two published Bangladesh surveys provide related context; neither tested WaterSmart. Five user-supplied adult summaries are user-confirmed real but consent/date/question-order metadata are pending. | Consumer concern is supported in particular samples; Movers targeting and willingness to pay remain concept-specific questions. |
| Can minerals affect hair? | Laboratory evidence is mixed, with deposition and some weakening findings alongside negative/condition-dependent findings. | Deposit-removal and sensory claims require product-specific testing; avoid hair-loss causation claims. |
| Does WaterSmart fit Marico? | Hair Cleansing/Naturale fit is strong. FY26 documents actual shampoo batch/filling improvements. | Modify/Buy is a credible route to evaluate; no reserved capacity or cap assembly qualification confirmed. |
| Is the proposed cap feasible at Tk 3–4? | Individually sealed and custom-branded hardness strips exist. No Bangladesh landed OEM quotation was obtained. One identified grade has only a one-year shelf life. | Feasibility of a supplied strip is supported; cost, fit and humid-market life remain critical gates. |
| Is the old positive NPV usable? | No. The old model omitted the publicly documented 15% local-supply shampoo supplementary duty. | Withdraw old v3 investment conclusions. Use the conditional fiscal overlay and obtain invoice/tax confirmation. |
| Can existing surveys become our own fieldwork? | No. Published aggregate data can be analysed with attribution; they cannot be relabelled as our interviews. | Keep sources and denominators separate. No synthetic respondents were created. |

## 1. Scope, materials and evidence rules

The master context was read first. The review covers the final idea, monthly model, field logger, earlier fact-check/audit, official case/template and supplied masterclass materials. It keeps Phase 1 **Iron & Hard Water** separate from conditional Phase 2 **LonaJol**. No Phase 2 revenue is credited to the base forecast.

The user confirmed that no team water tests, foam tests, retailer visits, pack weighing, supplier quotations or private Marico confirmations had been completed/provided. Five subsequent opinion summaries have a separate status. Planned n=25 interviews, n≈100 product studies, 8–10 water samples and five retailer audits are **plans, not collected samples**.

The archive contains 61 distinct download-attempt IDs: 49 have usable downloaded/reused raw responses, 11 failed and one purported PDF returned HTML. These are not 61 independent studies. Twenty-five web-search/open captures retain additional leads and specifications where direct retrieval failed. A source index, timestamps, SHA-256 hashes and failed attempts are preserved. See [source index](analysis/source_index.csv), [download manifest](download_manifest.jsonl) and [methods/exclusions](METHODS_AND_EXCLUSIONS.md).

| Evidence class | How it may be used |
|---|---|
| Official dataset, independently reproduced calculation | State the result with its sampling frame, date, units and missing denominator. |
| Official/company reported fact | Attribute it; distinguish company-wide disclosure from SKU-specific capability or policy. |
| Published survey aggregate | Retain original authors, exact population/question and table; do not invent microdata. |
| Supplier specification/listing | Evidence of a stated offering or observed price; not independent performance, stock or a landed quotation. |
| Publisher market estimate | Context with publisher/year; not audited observed category sales. |
| User-supplied opinion summary | Internal exploratory note; metadata pending, no product trial or objective water measurement. |
| Design decision/proposed gate | A proposal requiring approval/testing; it is not an observed statistic. |
| Forecast/sensitivity | A conditional calculation; it cannot become proven future truth through simulation. |
| Unknown/private input | Leave unresolved and name the evidence/owner required. |

## 2. Water: real microdata, dates and household relevance

### 2.1 BGS/DPHE national hydrochemical data

Downloaded the original public CSV and report volumes 2/4. Actual observations span **4 March 1998–15 December 1999**: 2,039 records in 1998 and 1,495 in 1999. The CSV was released in 2000; the report was published in 2001. These are different dates. There are **3,534 wells, 61 districts and 433 historical district/thana pairs**, with chemistry absent for four records. [BGS dataset](https://www.bgs.ac.uk/groundwater/download/dphe-bgs-national-hydrochemical-survey/), [report collection](https://www.bgs.ac.uk/groundwater/quality/groundwater-and-health/arsenic-contamination-of-groundwater/bangladesh-reports/).

**Reuse citation:** BGS and DPHE (2001). *Arsenic contamination of groundwater in Bangladesh*. Kinniburgh, D.G. and Smedley, P.L. (eds). British Geological Survey Technical Report WC/00/19. Our credit is for analysis, not original sampling.

Calculated Ca/Mg-equivalent hardness for each paired observation, using **2.497 × Ca + 4.118 × Mg**, with Ca/Mg in mg/L and the result in mg/L as CaCO3. This is a derived chemical estimate, not a new field titration. [USGS formula](https://pubs.usgs.gov/sir/2006/5245/pdf/sir20065245.pdf). Raw censored values such as `<LOD` retain interval bounds; no zero/half-LOD substitution was made. Fourteen Fe records and one paired Ca/Mg-derived hardness record are censored. Central quantiles are identical across their bounds.

| Result | Reproduced value | Correct denominator/meaning |
|---|---:|---|
| Iron median; interquartile range | 1.10; 0.14525–4.5675 mg/L | 3,530 nonmissing sampled wells |
| Derived hardness median; IQR | 153.87205; 71.418375–323.890075 mg/L as CaCO3 | 3,530 paired nonmissing observations |
| Iron >0.3 mg/L | 2,293/3,530 = 64.96% | Descriptive well threshold, not a hair-damage prevalence |
| Iron >1 mg/L | 1,806/3,530 = 51.16% | Descriptive well threshold |
| Iron >3 mg/L | 1,194/3,530 = 33.82% | Descriptive well threshold |
| Hardness >120 mg/L | 2,052/3,530 = 58.13% | Hard/very-hard classification in sampled wells |
| Hardness >180 mg/L | 1,612/3,530 = 45.67% | Very-hard classification in sampled wells |
| Fe >0.3 OR hardness >120 | 2,926/3,530 = 82.89% | Historical chemistry screen; **not current households or market size** |
| Fe >1 AND hardness ≤120 | 649/3,530 = 18.39% | Hardness alone cannot exclude elevated iron |

The last result is particularly relevant to PaniCheck: **649 of the 1,806 wells with Fe >1 mg/L had hardness ≤120**. This is a chemical cross-tabulation, not a measured false-negative rate for a commercial strip. A low hardness reading cannot establish low iron. [Reproduced outputs](analysis/water_summary.json).

USGS descriptive hardness bands produce 742 soft, 736 moderately hard, 440 hard and 1,612 very hard observations; four remain missing. These categories describe water chemistry, not shampoo efficacy or a medical threshold. [USGS hardness classification](https://www.usgs.gov/water-science-school/science/hardness-water).

| Historical district | Wells | Fe median mg/L | Hardness median mg/L as CaCO3 |
|---|---:|---:|---:|
| Dhaka | 45 | 1.170 | 228.08 |
| Gazipur | 44 | 0.140 | 102.88 |
| Tangail | 91 | 3.600 | 143.90 |
| Bagerhat | 62 | 5.595 | 484.99 |
| Khulna | 76 | 0.405 | 333.66 |
| Lakshmipur | 34 | 1.575 | 297.00 |
| Noakhali | 49 | 0.816 | 247.63 |
| Satkhira | 61 | 4.120 | 452.08 |

These are medians of sampled wells within historical boundaries. They do not establish a present building's tap quality, city-wide prevalence or salinity. Sample count alone must not create a “high-confidence current household” label. [All districts](analysis/water_by_district.csv), [all historical thana pairs](analysis/water_by_historical_thana.csv).

### 2.2 More recent evidence and its limits

**BWDB:** the official *Groundwater Quality Assessment of Multi-layered Aquifer System of Bangladesh down to the Depth of 335m*, first published **December 2022**, covers **901 monitoring wells**, mainly dry 2019–20 and wet 2020/2021 work. It includes field parameters and laboratory chemistry. A later website/archive date does not change the measurement year. Maps/figures are available; row-level microdata were not supplied in the retrieved report. Deep aquifer monitoring is not a national bathing-household sample. [Official BWDB report](https://www.bwdb.gov.bd/archive/pdf/16594.pdf).

**Dhaka:** Emon et al., *Spatial Variation of Supply Water Quality Parameters Across Dhaka City*, ICCEI 2025, Paper 436, reports **13 selected tap locations**, with stated hardness range **33–300 mg/L**. Only 12 hardness numbers are explicit in prose; Kamlapur is retained as missing rather than guessed from a chart. Collection date and replication are not clearly documented. Some author classifications conflict with their own boundaries—for example, Dhanmondi 105 mg/L is called hard. Use the reported numeric values cautiously; do not repeat the paper's inconsistent health/standard interpretations. [Original proceedings paper](https://icceiruet.org/wp-content/uploads/2025/12/436_Camera-Ready-Final-Paper_ICCEI-2025.pdf), [transcribed values](analysis/dhaka_2025_published_location_values.csv).

**Naser et al. (2018):** a separate 654-well central-Bangladesh study reported Fe median 0.91 mg/L (IQR 0.36–2.01). Its stain cue had 41% positive predictive value for Fe >3 mg/L. Stains are a useful question, not a substitute for measurement or a hair-damage threshold. [Original study record](https://pubmed.ncbi.nlm.nih.gov/29436334/).

**Implication:** avoid “Dhaka water is hard”, “Khulna households are saline” or “82.9% of Bangladesh needs this shampoo”. Historical regional data justify location research, not household diagnosis. Neither the BGS sodium column nor TDS alone identifies NaCl. Household source, treatment, tank/storage, season and source changes need contemporaneous measurements.

### 2.3 Pani Map and PaniCheck correction

The [research viewer](WaterSmart_Research_Viewer.html) now supports real district/thana lookup using historical records. It shows date, n, Fe and derived-hardness medians/IQR, missing/censored coverage and the source. It makes **no automatic product recommendation or household water-safety verdict**. A current home test is separate. No invented team sample is displayed.

PaniCheck should be presented as a hardness screen with the purchased supplier's chart/read time. It does not screen iron, salt, bacteria or general water safety. Test iron separately when the proposition includes iron. EC/TDS may inform a salinity investigation but cannot identify the ionic composition. This explanation directly addresses the misunderstanding in the supplied “test salinity/filter performance” opinions.

## 3. Hair science: supporting evidence and counterevidence

| Original study | Actual study/result | What it cannot establish |
|---|---|---|
| Srinivasan et al. 2013, [PMID 24574692](https://pubmed.ncbi.nlm.nih.gov/24574692/) | n=15 paired hair samples; 30-day exposure at 212.5 ppm hard water versus 10 ppm distilled water. Tensile/elasticity differences were not significant. | No proof that every mineral exposure is harmless; no WaterSmart trial. |
| Luqman et al. 2016, [PMID 27654734](https://pubmed.ncbi.nlm.nih.gov/27654734/) | n=76 matched hair halves; lower tensile strength after hard-water treatment, 238.49 vs 255.36, p=.001. | Not follicular hair-loss causation or shampoo efficacy. |
| Luqman et al. 2018, [PMID 30034190](https://pubmed.ncbi.nlm.nih.gov/30034190/) | n=70, three matched segments per donor; 255.49 control, 254.84 deionized, 234.16 hard-water tensile values, p=.001. | Not three independent participant groups; related-author studies cannot be assumed independent for pooling. |
| SEM study 2015, [PMID 26711619](https://pubmed.ncbi.nlm.nih.gov/26711619/) | n=15 female donors; greater calcium/magnesium deposition following hard-water treatment. | Does not test removal by the proposed formula or iron/saline-water performance. |
| Evans et al. 2011, [PMID 21923661](https://pubmed.ncbi.nlm.nih.gov/21923661/) | Mineral uptake alters fibre properties; some condition-dependent improvements accompanied stiffening. | “All minerals always damage all hair” is too broad. |
| Calcium/surfactant study 2016, [PMID 27789967](https://pubmed.ncbi.nlm.nih.gov/27789967/) | Ingredient/cleanser calcium-binding work, with a small adult skin experiment. | A soap mechanism cannot be applied automatically to every modern shampoo or to WaterSmart. |

The records/abstracts are archived in [NLM XML](raw/hair_water_pubmed_records.xml) and [structured study records](analysis/science_primary_records.json). This is a targeted literature review, not a registered systematic review or meta-analysis. Author-reported findings were not independently reproduced in a laboratory.

**Defensible proposed claim ladder:** first test mineral deposition/removal and defined-water cleansing/lather; then mildness and user-perceived hair feel; only later a separately substantiated breakage claim. “Stops hair fall”, “hard water caused your hair fall”, “salt-proof” and superiority over current Naturale/Dove are unsupported. Foam height is not cleansing efficiency or a hair benefit.

## 4. Existing Bangladesh surveys: usable data with attribution

### 4.1 Shampoo choice, 2022

**Khanam, Ummay Salma and Rahman, Md. Bazlur (2022), *Preference of Global Shampoo Brands: A Study on Women Consumers*.** Online convenience sample of 390 women in Dhaka/Chittagong, 500 invited. Published 11 November 2022; collection dates are unspecified. [Original PDF](https://www.scirp.org/pdf/jss_2022111015123549.pdf), [DOI](https://doi.org/10.4236/jss.2022.1012016).

| Choice factor | Published mean on 1–5 scale | SD |
|---|---:|---:|
| Functionality/advantages | 4.2103 | 0.8645 |
| Brand image | 4.1513 | 0.9042 |
| Quality | 4.1359 | 0.8601 |
| Price | 4.1282 | 0.9668 |
| Packaging | 3.4026 | 0.9617 |

The data favour testing performance/value before expecting packaging to sell the proposition. They do not prove that a strip adds conversion. Methods say ages 18–60, while the table includes six aged 61+; the under-20 band does not disclose exact ages. The urban/women/global-brand frame limits transfer to male hostel workers or rural/coastal shoppers. Brand counts are preferences/use in this sample, **not national market shares**. Only aggregate tables were acquired.

### 4.2 Coastal water-related perceptions, 2025

**Zakaria, Muhammad; Karim, Rezaul; Islam, Didar; Ahmad, Md. Sarwar; Ahammad, Mostak; Cheng, Feng; and Xu, Junfang (2025).** *Perceptions of coastal dwellers about the effects of extreme temperature and saline water on human health: evidence from Bangladesh*. Published 1 August 2025. [Original article](https://www.frontiersin.org/journals/public-health/articles/10.3389/fpubh.2025.1451933/full).

The consenting adult convenience sample is **391 in Ramgati, Lakshmipur**, 286 men/105 women. For the prompted item about salinity causing hair loss, frequencies were never 33, rarely 52, sometimes 124, frequently 147 and very frequently 35. **182/391 (46.55%)** selected frequently/very frequently. This is perceived causal attribution; no clinical hair-loss diagnosis or WaterSmart test. Mobile use was 276/391 and internet use 155/391, supporting offline instructions alongside QR within this context. The reported margin-of-error paragraph is internally inconsistent. Collection date was not recovered.

Across these two studies, [35 aggregate rows](analysis/published_survey_aggregates.csv) were transcribed with source/table/denominator. **Do not combine them into “our n=781 survey”, reconstruct individual answers or simulate correlations from marginal tables.** Neither asks WaterSmart's Tk 330 WTP, Movers advantage, strip trade-off or paid repeat. Adapted future questions must say “informed by [study]; administered by our team on [date]” and retain a distinct instrument/version.

### 4.3 Five supplied opinions

The user confirmed that all five summaries came from real adults. Anonymous research-use consent, collection date and whether Tk 330 was disclosed before maximum-price answers remain pending. [Raw private notes](raw/user_opinions_20261009.md), [structured notes](analysis/user_supplied_opinions.csv), [metadata](analysis/user_opinions_metadata.json).

Internal descriptive summary only: three prefer the strip and two prefer no strip; supplied maximum prices are Tk 330, 350, 380, 380 and 450, median Tk 380. All five values are at least Tk 330; do not alter true values to avoid a 100% arithmetic result. **Do not present that arithmetic as 100% purchase conversion.** There was no objective water measurement or use of a finished WaterSmart product; comments are conditional, recruited through the user and may have price anchoring.

Method-complete, consent-confirmed primary records currently equal **0**. These notes are not automatically imported into the field logger or used to calibrate a larger synthetic population. Metadata completion would make five documented opinions, not a representative survey.

## 5. Market, competing solutions and observed prices

### 5.1 Market size remains an estimate

[Mordor's public summary](https://www.mordorintelligence.com/industry-reports/bangladesh-shampoo-market) estimates USD 164.49m for 2025, USD 176.46m for 2026 and forecasts USD 250.62m for 2031. [VMR](https://www.verifiedmarketresearch.com/product/bangladesh-shampoo-market/) gives USD 110m for 2024 and USD 180m for 2032, with a stated 2026–32 CAGR. Definitions/base years differ and proprietary inputs are unavailable. Do not average them or call either audited category sales. [Euromonitor's public Hair Care summary](https://www.euromonitor.com/hair-care-in-bangladesh/report) provides directional affordability/pack context; detailed market tables were not acquired.

**SAM is not identified.** It requires current relevant household/source exposure linked to eligible shampoo consumers, usage, preference and ability to buy. Well percentages cannot be multiplied by census population without household linkage/weights. Company-wide retail reach also does not establish WaterSmart distribution. Any existing TAM-based Y3 share remains a dated context check with an unverified FX assumption, not proof of an obtainable share.

### 5.2 Retail observations

Saved **24 deduplicated online product/pack observations** across Arogga and Chaldal, accessed 9 October 2026. Sale price is distinguished from struck MRP; delivery excluded. No checkout or physical-store transaction verified. [All observations and product URLs](analysis/retail_price_observations.csv).

| Observed/proposed product | Pack | Tk | Tk/100ml | Status |
|---|---:|---:|---:|---|
| Naturale Nourishing Care, Arogga | 12 × 5.25ml = 63ml | 24 | 38.10 | Online sale listing; Tk 2/sachet |
| Naturale Nourishing Care, Arogga | 320ml | 239 | 74.69 | Sale price; compare MRP separately |
| Naturale range, Chaldal | 320ml | 265 | 82.81 | Online listing |
| Naturale Hijab Fresh, Chaldal | 340ml | 390 | 114.71 | Online listing |
| Sunsilk Black Shine, Chaldal | 340ml | 350 | 102.94 | Online listing |
| Clear Men Cool Sport, Chaldal | 330ml | 500 | 151.52 | Online listing |
| WaterSmart proposed | 6ml | 3 | 50.00 | Design decision |
| WaterSmart proposed | 180ml | 180 | 100.00 | Design decision |
| WaterSmart proposed | 340ml | 330 | 97.06 | Design decision |

Against Tk 2/5.25ml, the proposed sachet is **31.25% more per ml**. Against Tk 265/320ml, the proposed 340ml is **17.19% more per ml**; the 180ml proposal is **14.29% more per ml** than Tk 140/160ml. “Mass affordable” needs this qualification and consumer evidence; it is not equivalent to existing Naturale price parity.

### 5.3 Competitor claims and price conflicts

[Dove Hard Water Defense](https://www.dove.com/arabia/en/p/hair-therapy-hard-water-defense-shampoo.html/06281006548497) and [Malibu C](https://malibuc.com/products/hard-water-wellness-shampoo) disclose Disodium EDTA. Chelation is not a new category mechanism. A local retailer also lists EDTA for Naturale Egg Shine; verify the actual current pack/manufacturer before treating this as a formula fact. Differentiation therefore needs demonstrated local-water performance, appropriate value and a usable information/pack system.

The [Ubuy Malibu listing](https://www.ubuy.com.bd/en/product/RVU9L7S-malibu-c-hard-water-wellness-shampoo) showed Tk 2,182 for the selected **9 fl oz** presentation, with other size selectors and shipping/customs excluded. Do not label that price 100ml, final landed cost, local stock or Bangladesh reviewer demand. [CutPrice Pantene](https://cutpricebd.com/en/product/pantene-pro-v-hard-water-shield-5-shampoo-pro-v-shampoo/414) conflicts internally: Tk 1,450 main display versus Tk 850 FAQ/category, with pack size unclear. Hold the unit-price comparison pending variant/checkout confirmation.

No exhaustive physical shelf or distributor inventory audit was done. “First in Bangladesh”, “no local alternative exists”, patent novelty and proven local demand are **not established**. Existing shampoo/conditioner, filtered final rinse and doing nothing belong in a fair consumer comparison; an imported listing is not the only relevant alternative. Review counts/ratings are not respondent microdata. No 50-review empirical dataset was invented.

## 6. Marico fit, capability and company benchmarks

The supplied case's Hair Cleansing category, Naturale equity and an existing shampoo platform support strategic fit. The latest Bangladesh FY26 report documents **45% shampoo batch-capacity improvement, 25% sachet-filling improvement and two commissioned sachet machines** (PDF pp.90–91). The company About page states approximately 1.1m retail footprint, three manufacturing units and 99.9% local manufacture. FY26 NR is Tk 2,071.17cr; derived company GM is 49.42%. These are portfolio/platform facts, not WaterSmart spare capacity, outlet coverage or margin. [FY26 report](https://marico.com/investorspdf/Annual_Report_2025-26.pdf), [company About](https://marico.com/bangladesh/about-us).

**Capability conclusion:** strong platform fit; **conditional product/pack feasibility**. New chelator/surfactant compatibility, storage stability, bottle neck/cap clearance, foil insertion, line speed/rejects and committed capacity need engineering/R&D qualification. A 45% improvement does not prove idle capacity or the team's Tk 3cr CAPEX.

Company financial data are separately stored in [benchmarks](analysis/marico_public_financial_benchmarks.csv). The derived limited year-end NWC proxy—inventory + receivables − trade payables − customer advances—is 11.45% of annual company NR. It excludes other operating items, mixes categories and is a single-date balance. It cannot validate the model's 12% SKU NWC. Company effective tax is not future project marginal tax; marketing/selling cost percentages cannot be copied into a new launch without scope reconciliation.

## 7. Ingredients, strips, packaging and cost evidence

| Identified primary offering | What the source supports | Unresolved for WaterSmart |
|---|---|---|
| [Hach 2793828](https://www.hach.com/p-total-water-hardness-test-strips-0-425-mgl-1000-tests-individually-wrapped-1000-tests/2793828) | 1,000 individually wrapped hardness tests, 0–425 mg/L; price requires contact | No verified $479/$160 quotation; dimensions, BD landed cost, humid life and interference |
| [Bartovation custom strip](https://bartovation.com/product/water-quality/custom-branded-water-hardness-test-strips/) | Custom single-foil packs/branding; 0/50/125/250/500 ppm chart; stated MOQ 100 packs | Quote, approved chart sensitivity, dimensions, shelf life and assembly yield |
| [MN AQUADUR 91224](https://www.mn-net.com/us/aquadur-4-21-for-water-hardness-individually-sealed-1000-strips-91224?c=7674) | 1,000 sealed strips; **one-year** life, **4–30°C** storage | Does not meet proposed 18-month pack target as specified; price-on-request is not free |
| [LaMotte 2936FP-100](https://lamotte.com/product/insta-test-drinking-water-test-strip-4-2936fp-100/) | 100 packets, two multi-parameter strips/packet; hardness 0–400 | Different format/chart; cap fit, per-strip cost and product instructions |
| [Simplex single foil](https://www.simplexhealth.co.uk/product/total-hardness-test-strips-single-strip-in-foil/) | GBP 1.99 retail including UK VAT / 1.66 excluding | Not bulk OEM or Bangladesh landed cost; no assumed FX conversion |

Supplier offerings establish a sourcing route, not a viable Tk 3–4 landed strip. Ask for item-specific CoA, Fe/Cu interference, accuracy/agreement against a reference titration, humidity/barrier data, expiry from manufacture, tolerances, MOQ, lead time, payment/currency/incoterm and import classification. The strip must remain isolated from shampoo and wet-cap use. Different supplier charts/read times must not be combined.

[MakingCosmetics GLDA fact sheet](https://www.makingcosmetics.com/on/demandware.static/-/Sites-makingcosmetics-master/default/dwc853a61d/fact-sheets/fact-sheet-tetrasodium-glutamate-diacetate2.pdf) specifies 46–48% active material and typical use 0.1–0.5%. Confirm whether each dosing basis is supplied product or active. [Nouryon's product guide](https://www.nouryon.com/globalassets/inriver/resources/brochure-homecare-dissolvine-product-guide-global-en.pdf) supports metal/pH-dependent chelation; its grade is not automatically the same as the other supplier's. [Indorama GLUCOSURF brochure](https://indovinya.indoramaventures.com/wp-content/uploads/2024/09/Indorama-Ventures-GLUCOSURF-ENG.pdf) supports ingredient-level electrolyte-tolerance screening, not LonaJol performance.

No complete formula, density, Bangladesh chemical quote, conversion/yield quote, mould quote, pack weight or PRO quotation was obtained. Bulk Tk 135/kg, density 1 kg/L, COGS Tk 1.20/55/95, strip Tk 3 and CAPEX Tk 3cr remain **unverified cost drivers**. Shampoo does not soften the household water source. A chemist's review of plausibility would still not replace formula-specific deposit/lather, mildness, preservation and real-time pack/strip tests.

## 8. Regulation and sustainability

### 8.1 Indirect tax: material omission found

The current official VAT/SD schedule's local-supply table lists **HS 3305.10.00 shampoos at 15% supplementary duty** (Bangla PDF p.64; corroborating English PDF p.109). Standard VAT is 15%. This is distinct from an import-rate table. [Act 1106 and attachments](https://bdlaws.minlaw.gov.bd/act-1106.html), [saved visually checked page](analysis/vat_sd_shampoo_supply_page.png).

The official [NBR gross-to-net example](https://nbr.gov.bd/faq/vat-faq/ban) removes VAT first and divides the VAT-exclusive invoice by 1+SD. The overlay assumes VAT-exclusive MRP less the old trade share is the invoice inclusive of SD. Actual commercial invoice/trade basis, manufacturing route and qualifying exemptions require Marico Tax confirmation. A raw-material SRO does not prove finished-shampoo SD exemption. No qualifying finished-product exemption was identified in the retrieved sources; this is not proof none exists.

### 8.2 Cosmetics and BSTI

The [Drugs and Cosmetics Act 2023](https://bdlaws.minlaw.gov.bd/act-print-1447.html) applies to cosmetic licensing/registration. The June 2026 HSD notice and 72-page draft rules were archived; blank SRO/date fields show the retrieved attachment is a **draft**. Final rules/transition status could not be confirmed from retrieved public material. Do not treat draft processes/fees as operative.

The earlier audit identified mandatory shampoo certification under **BDS 1269:2022**. Current primary catalogue search still exposes that designation; directory access and standard preview failed/404 in this run. Therefore numerical pH, microbiology, labelling and other limits **have not been independently read**. A proposed R&D pH range is not an approved compliance specification. Obtain the standard and regulatory sign-off; do not invent limits or claim either compliance or noncompliance without it.

### 8.3 EPR: original gazette retrieved

The original **SRO 293-Ain/2026**, notified 12 August and published/effective **13 August 2026**, was downloaded; core clauses were visually checked because extracted Bangla text is garbled. Rigid bottles and flexible/multilayer packaging fall in separate categories. Initial collection/recycling is **15%/7.5% for the first two years**, rising to **30%/15%**, by category. Municipal collection is excluded from claimed attainment. Listing/registration is phased; entity annual reporting is in August. [Official gazette](https://www.dpp.gov.bd/upload_file/gazettes/62642_41454.pdf), PDF pp.1,4–9.

The model's **1% NR reserve is not compliance proof**. Needed: Marico listing/registration date, complete plastic BOM and actual local-market tonnage by category, foil/cap/strip-component classification, approved PRO/recycler arrangements, documentary traceability and a quoted cost. Current sachet/SUP restrictions also need confirmation: EPR coverage does not automatically authorize a pack.

Weights such as 32g/22g/0.6g and an assumed 7ml dose are unmeasured. Environmental comparisons need actual complete packs, plastic versus total composite mass, comparable uses and end-of-life assumptions. “Recyclable bottle” does not establish actual collection/recycling or a net environmental benefit from adding a cap/foil/strip.

## 9. Financial evidence reconciliation

### 9.1 Preserve the original, withdraw its investment conclusion

The baseline snapshots and hashes preserve the original v3 monthly model. Its arithmetic was coherent, but the financial specification omitted domestic SD and the participation-fund allocation. Therefore **Tk 3.15cr / 0.26cr NPV is a historical calculation, not the current investment case**. The previous Tk 4.78 no-recovery strip-cost ceiling is likewise withdrawn as a current decision gate.

The FY26 report discloses a **20% tax provision policy** (PDF p.227) and a **5% profit-before-fund participation fund** (p.226). Future marginal tax route, tax relief, fund allocation/deductibility and cash payment dates remain unconfirmed. The overlay illustrates these disclosures; it does not assert approved monthly project taxation.

### 9.2 Conditional overlay method

Frozen inputs: MRPs Tk 3/180/330, volumes/outlet ramps, trade 25% sachet/22% bottle, cost allocations, A&P, cannibalization, CAPEX, pilot allowance, timing, 12% annualized-NR NWC and 15% hurdle. These remain planning inputs, not newly validated facts.

`NR per unit = MRP ÷ (1 + VAT) × (1 − old trade share) ÷ (1 + SD)`

At 15% VAT/15% SD, unit NR is approximately **Tk 1.7013 / 106.1626 / 194.6314**. Keeping COGS fixed reduces the margin. The illustrative fund is 5% of positive monthly incremental EBIT before fund; tax is 20% of positive EBIT after fund. Monthly accrual is treated as cash; no loss relief is credited. EBIT includes original straight-line depreciation. This shortcut needs payment/allocation confirmation.

The horizon remains M0 CAPEX, 12 prelaunch months plus 60 national months; first base sales M16. Final full NWC release is a **wind-down**, not a perpetual operating terminal value. Both release and no-release views are essential. No pilot or LonaJol sales are invented.

| Conditional case | NPV with NWC release, Tk cr | Without release, Tk cr | Peak funding, Tk cr | Peak month |
|---|---:|---:|---:|---:|
| Historical v3: omitted SD, tax25%, no fund | 3.148 | 0.264 | 11.112 | 25 |
| SD15%, otherwise frozen | −3.867 | −6.375 | 12.204 | 37 |
| SD15% + tax20%, no fund | −3.613 | −6.121 | 12.176 | 37 |
| SD15% + tax20% + fund5% illustration | **−3.816** | **−6.324** | **12.198** | **37** |
| Same fiscal case, bulk-formula cost −25% only | 1.548 | −0.960 | 11.038 | 25 |

For SD15/tax20/fund5, Y3 NR is **Tk 39.951cr**, incremental EBITDA before fund **Tk 2.950cr**, blended GM **44.887%**, versus the proposed 48% commercial gate. Annual-equivalent IRR is approximately **2.356% with release / −12.959% without**. It is below the unconfirmed 15% hurdle. Payback near the end after a wind-down release is not a satisfactory return argument.

The model is negative even at zero strip cost under this fiscal case; **there is no nonnegative strip-cost ceiling that alone repairs the project**. A −25% bulk-formula stress uses an unquoted Tk 101.25/kg and still has negative no-release NPV. Uniform price uplift of **14.103845%** gives mathematical zero no-release NPV while keeping volume and other drivers fixed. It is **not a recommended price or elasticity/WTP result**; real price changes alter demand and trade economics and sachet prices cannot simply be fractionalised.

### 9.3 Reproducibility and investment decision

[Overlay JSON](analysis/finance_evidence_overlays.json) stores five cases, both NWC policies and full monthly results. [Monthly CSV](analysis/finance_overlay_monthly_Tk_cr.csv) contains 730 scenario/month rows including M0. [Script](scripts/finance_overlays.cjs) applies the fiscal changes to the frozen pure model; **847 assertions** independently check NPV, cumulative peak, unit NR and annual/monthly reconciliations.

This is evidence that the old appraisal needs rework, **not a prediction of actual WaterSmart losses**. Quoted complete costs, tax/invoice confirmation, credible sell-out drivers, corrected marketing/channel design and required return need to be established before a national investment recommendation. Do not solve a negative model by silently inventing a cheaper formula, inflated volume, reduced cannibalization or unqualified working-capital release.

## 10. Pilot: what would actually be tested

এখানে pilot মানে **WaterSmart-এর qualified Phase 1 shampoo সীমিত এলাকায় বিক্রি করে বাস্তব product experience, sell-out ও paid repeat মাপা**—মতামতের survey বা পানির sample নেওয়া একা commercial pilot নয়। :codex-annotation{index="1"}

Separate stages prevent selling an unqualified prototype:

1. **Evidence/design stage:** attributed desk research, neutral interviews, current water measurements, complete supplier/pack/line quotes and tax review.
2. **R&D qualification:** formula-specific deposit/lather performance, preservation/mildness, stability, strip/chart/foil qualification and applicable regulatory release. A safe finished product must exist before consumer product use.
3. **Proposed commercial pilot:** six months, Dhaka hall/mess catchment and one measured iron/hard-water catchment; ~1,500 outlets is a planning scope, not an actual commitment. Naturale Brand owns P&L, Sales owns outlet sell-out, Insights owns mature buyer cohorts, R&D/Regulatory own release and safety gates.
4. **Scale decision:** actual blended GM, credible RoS and paid repeat, full corrected cash appraisal and all mandatory gates. Existing RoS ≥70% of plan, mature repeat ≥25%, GM ≥48% and defect <2% are **proposed decision thresholds**, requiring sample precision and owner agreement. A safety/regulatory failure overrides commercial performance.

Repeated purchase must be paid and verified, with eligible mature SKU denominators and loss-to-follow-up shown. Distributor reorder/free incentives are not consumer repeat. The proposed 340ml 180-day cohort may mature after the six-month commercial window; extend follow-up rather than report premature retention. LonaJol has separate saline/mixed-ion R&D/IHUT gates and no base revenue until qualified.

The Tk 0.5cr precommercial allowance is not a quotation or proof that product development, claims, certification, inventory, tracking and all tests fit. Obtain scope/timing and revise the model before commitment.

## 11. What can be used in the pitch now

| Use now, with attribution | Hold for verification |
|---|---|
| Historical BGS sample count, dated Fe/hardness analysis, no household extrapolation | Current home water, “everyone in Dhaka”, national prevalence or SAM |
| Two related published surveys with original n/method/date limitations | “We surveyed 781”; strip purchase conversion or Movers advantage |
| Mixed hair-science summary including negative findings | Product benefit, medical/hair-fall, saline superiority or comparative efficacy |
| FY26 shampoo platform improvements and Naturale fit | Spare/committed capacity, costed cap engineering or automatic formula feasibility |
| Dated online pack prices and verified chelator competition | Exhaustive local absence, imported checkout cost/stock or patent novelty |
| Original EPR gazette/current local SD rate; unresolved current rules stated | Licences/standard compliance, EPR attainment or raw-material exemption as finished-product relief |
| Corrected conditional fiscal downside and a testable rework/pilot plan | Old positive NPV, confirmed profit, approved national-rollout budget |

The safest contest narrative is: **a documented water-variation concern, a Marico-relevant proposed solution, clear product/pack questions and an honest economic gate**. Completing literature research can strengthen the proposal; it cannot eliminate product/price validation. Do not award a readiness rating on the assumption that future field/lab/quote gates have already passed.

## 12. Deliverables, open questions and resumption

- [Interactive research/Pani Map viewer](WaterSmart_Research_Viewer.html): offline data explorer and fiscal scenarios.
- [Evidence ledger](analysis/evidence_ledger.csv): 56 claims with status, source, locator, date and limitations.
- [Model-input register](analysis/all_model_inputs_evidence_register.csv): 104 scalar entries/gaps, including labels and policy choices; not 104 independent empirical estimates.
- [Data dictionary](DATA_DICTIONARY.md): fields, units, grain, missingness and reuse restrictions.
- [Methods, excluded leads and research log](METHODS_AND_EXCLUSIONS.md).
- [Expert/human verification and RFQ questions](EXPERT_AND_HUMAN_VERIFICATION.md): exact evidence needed, priority and owner.
- [Checkpoint](CHECKPOINT.md) and [machine state](state.json): completed work and dependency-specific continuation.

Outstanding human metadata are the collection date, anonymous research-use consent and price question order for the five notes. Outstanding expert/private/physical evidence concerns formula performance, current relevant households, landed/BOM costs, pack and factory qualification, invoice/fund/tax treatment, final regulatory requirements, channel sell-out and mature paid repeat. These are **not assumed true** and not filled using simulated survey records. Public research is complete for the documented scope; investment/product validation remains open.
