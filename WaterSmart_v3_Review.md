# WaterSmart v3 response and updated-files review

> Historical review before v3 implementation. The current model now includes the 12-month prelaunch period and a consistent monthly NWC policy. Use `OTW_S5_Master_Research.md` Section 11.6 and `WaterSmart_v3_Model_Output.json` for current forecasts; the pilot-only overlay numbers below are historical.

Reviewed: 9 October 2026, Asia/Dhaka.

**Verdict:** The updated v2 files address many earlier problems, and most of the proposed v3 annual arithmetic is correct. The pasted response needs corrections before implementation. Its most material omission is that the Tk 24.39 strip limit protects a bottle's gross margin, but does not protect the project's investment return.

This is a review, not a completed v3 implementation or a validation of the product. The calculations below use the supplied assumptions; they are not collected sales data or supplier quotations.

## 1. What is actually updated

| File | Current state | Review result |
| --- | --- | --- |
| `OTW_S5_Master_Research.md` | Version 2; Section 11.6 has NPV 4.67/1.35 | Updated; v3 pilot cost and full pilot plan are absent |
| `Naturale_WaterSmart_Idea.html` | v2; actual model has `capex:30` and no pilot parameter | v2 financial calculations reproduced successfully |
| `WaterSmart_Field_Data_Plan.html` | v2; 14-question interview plan and existing logger | Method improved; proposed `cur`, `spend`, `cmp`, `why`, water `seg`, launch-focus tab and pack-weight form are absent |
| `WaterSmart_Google_Form_Guide.md` | Separate 26-question consumer/concept survey | Neutral baseline-before-concept order is useful; the new Movers hypothesis needs occupation/move details |
| Pasted v3 response | Proposed changes, not applied changes | Annual numbers verified; monthly funding model incomplete |

No `model3.js` or `Red_King_RootShield_v3.html` is present in the current workspace. This does not prove those files never existed elsewhere. The master file's Section 16.1 row 21 nevertheless cannot presently substantiate its statement that the RootShield file exists here.

Fieldwork exports and completed survey responses were not supplied in this workspace. The logger can hold data in browser local storage; its empty defaults and placeholders do not prove no data has been collected.

## 2. Changes that are sound

- The science is now described as mixed and ex vivo, with breakage separated from hair loss.
- PaniCheck is described as a hardness screen, with its iron/salinity limitations stated.
- Imported listings are distinguished from stock and a local launch; chemistry alone is no longer the proposed moat.
- Draft rules, BSTI and EPR are treated more carefully.
- Standalone and incremental EBITDA, cannibalisation and NWC release are separate.
- The Y1 outlet ramp and EPR allowance have been added, and volume-only downside is separate from the combined downside.
- Primary consumer focus, a costed commercial pilot, supplier RFQs and a proposed technical brief would improve v3.
- A chemist's review of the approach is correctly distinguished from formula validation.

The refreshed Marico scale figures are supported by the company's About Us page: approximate 1.1 million distribution footprint, FY26 revenue Tk 2,071 crore, three manufacturing units and the displayed reach figures. Its prose and banners use different reach descriptions, so quote the chosen measure separately rather than reconciling them into a new statistic. [Marico Bangladesh](https://marico.com/bangladesh/about-us)

## 3. Annual financial numbers: verified

I executed the current HTML's actual calculation functions separately from its DOM renderer, then overlaid only a Tk 0.5 crore Y0 cash cost. The original product files were not used as a source of fabricated field results.

| Metric | Current v2 | Proposed v3: only +0.5 crore Y0 cost |
| --- | ---: | ---: |
| NPV with terminal NWC release | 4.6684 cr | 4.1684 cr |
| NPV without release | 1.3517 cr | 0.8517 cr |
| IRR with release | 31.1213% | 28.6817% |
| IRR without release | 20.6545% | 18.3784% |
| Simple payback | 3.7865 years | 3.8742 years |
| Annual peak funding | 8.1272 cr | 8.6272 cr |

The proposed v3 scenario NPVs also reproduce:

| Scenario | With NWC release | Without release |
| --- | ---: | ---: |
| Volume −20% only | 1.1194 cr | −1.5339 cr |
| Combined worst | −4.4951 cr | −7.0158 cr |
| Base | 4.1684 cr | 0.8517 cr |
| Best | 9.3012 cr | 5.4107 cr |

These results assume the pilot cost is an additional net cash cost, booked entirely at Y0, without separately modelling pilot revenue, tax relief or working capital. The proposed expense table totals 50 lakh, but it does not show the pilot sales, contribution and working-capital movements that would establish the word **net**. R&D, certification and pilot costs must have explicit boundaries to avoid omissions or double counting.

Full NWC recovery requires an explicit wind-down/release assumption. A continuing business normally needs working capital. Keep both appraisal views and explain the terminal assumption.

## 4. The strip price limit is the most important correction

The response's calculation is correct:

`340ml net realisation = Tk 223.8261`

`48% bottle GM allows COGS = 223.8261 × 52% = Tk 116.3896`

`With other COGS fixed at Tk 92, strip + sleeve ceiling = Tk 24.3896`

However, **this is a 48% bottle-GM ceiling, not the project's break-even strip cost**. The pilot's stated commercial GM gate is blended, which is another measure again.

I changed only the 340ml strip+sleeve cost in the v3 overlay, retaining the other assumptions:

| Strip + sleeve per bottle | Bottle GM | Y3 blended GM | NPV with release | NPV without release |
| --- | ---: | ---: | ---: | ---: |
| Tk 3 | 57.56% | 52.08% | 4.1684 cr | 0.8517 cr |
| Tk 5 | 56.66% | 51.73% | 3.8473 cr | 0.5306 cr |
| **Tk 24.3896** | **48.00%** | **48.36%** | **0.7342 cr** | **−2.5825 cr** |
| Tk 58.438, illustrative catalogue conversion | 32.79% | 42.44% | −4.7755 cr | −8.0922 cr |

The zero-NPV strip+sleeve ceiling is approximately **Tk 8.30 without NWC release**, or Tk 28.96 with release, under this simplified model. Neither is an approved procurement limit. Monthly cash reconciliation, other costs or different demand will change them.

**Correct recommendation:** keep the Tk 3–5 sourcing target, obtain a landed quote, and recalculate the whole project. A quote below Tk 24 alone cannot justify a 95+ readiness score.

The claimed USD 479/1,000 gives Tk 58.438 at the assumed Tk 122/USD. That conversion and the resulting 32.79% GM/4.67 crore Y3 strip expense are arithmetically consistent. I could verify Hach's product specifications but could not independently retrieve the quoted USABlueBook prices. Hach's current 1,000-test page asks customers to contact it for price. Treat the catalogue cost as illustrative pending a dated price capture and freight/duty-inclusive supplier quote. [Hach 1,000 individually wrapped tests](https://www.hach.com/p-total-water-hardness-test-strips-0-425-mgl-1000-tests-individually-wrapped-1000-tests/2793828)

QR fulfilment is not automatically cheaper: postage, delivery, redemption rate and administration must enter the model. If strips move to launch packs or activations, update the pack promise and survey description too.

## 5. Monthly funding: partial verification, reconciliation required

The proposed Y1 monthly rollout can be reproduced from the stated rules. It gives:

- Y1 revenue: 8.9658 crore.
- Y1 incremental EBITDA: −4.0513 crore.
- M12 NWC: **2.0493 crore**, using 12% of annualised exit run-rate.
- Y1 operating cash flow: **−6.1006 crore**.
- Cumulative funding at M12, including Y0: **−9.6006 crore**.

The annual model uses Y1 NWC **1.0759 crore** and Y1 cash flow **−5.1272 crore**. This is a different NWC assumption, not simply finer timing of the same annual cash flows.

The proposed Y2 quarterly table totals about **−0.50 crore cash**, while the annual model produces **+0.0797 crore**. Rounded entries account for small discrepancies, but not these material cash differences.

Therefore:

1. Define one working-capital policy, preferably with inventory, receivable and payable drivers.
2. Produce the full monthly forecast, then aggregate its cash flows to annual totals for appraisal if desired. Match NWC changes and terminal release.
3. Recalculate NPV, IRR, payback and funding from that consistent schedule.
4. Explain cash-tax timing and the Y2 outlet/revenue ramp.
5. Run the downside into later years: the proposed worst-case cash is still falling at M24, so its reported funding is a lower bound on need, not a verified lifetime peak.

**Tk 10.27 crore at M20 is not independently confirmed:** the response supplies Y1 monthly and Y2 quarterly values, but no month-level Y2 schedule or `model3.js`. A static “10.27” note must also be labelled base-only if sliders continue changing the other KPIs.

Define the clock carefully: the plan places 4–6 months R&D plus six months pilot before national Y1. “Month 20” and “payback from Y0” need a clear origin relative to the first cash investment.

## 6. Research and logger corrections

### Current v2 logger

| Location | Problem | Required correction |
| --- | --- | --- |
| `WaterSmart_Field_Data_Plan.html:254` | Any hair change is counted as “after moving or changing water,” without a recorded move/change condition | Rename the finding to match the question, or collect the event/timing explicitly |
| `WaterSmart_Field_Data_Plan.html:258` | Blank/missing lather/feel can count as dissatisfied | Check valid values explicitly, especially for imported older records |
| `WaterSmart_Field_Data_Plan.html:358` | Review counters merge with `Math.max` | Independent sets of 20 and 30 reviews become 30; use review-level IDs/URLs and deduplicate, or keep separate reviewer totals |
| Iron result categories | “Low ≤0.3” and “Medium 0.3–1” overlap at 0.3 | Specify disjoint intervals; do not pretend a coarse strip resolves more precision than it provides |

I reproduced the first two logic errors with synthetic fixtures outside the actual logger. No dummy research responses were added. Current form fields are required for fresh entry, which reduces the missing-value problem, but JSON imports do not establish the same completeness.

### Proposed v3 `segScore`

The pasted code's P denominator counts hardness-tested samples, while the numerator also counts iron-positive samples without a hardness result. One hardness-positive sample plus one iron-positive, hardness-untested sample yields **2/1 = 200%**. Use a consistent eligible denominator, or show hardness and iron rates separately with their own tested n.

The P/D/I/W average is an internal prioritisation heuristic. Water-source samples and respondent counts are different units; small convenience samples cannot establish a statistically superior segment or prove causation. Show counts and missing tests openly, and treat the selected segment as a working launch hypothesis.

The A/B/C comparison is currently biased: an unnamed imported option has a broad price range without comparable pack sizes, while WaterSmart has a named trusted brand, a Tk 3 trial option and proposed features. Use verified comparable pack sizes/prices, balanced descriptions, an explicit proposed-product label, and balanced presentation order. Attribute preferences to the concept card shown, not to proven superiority or actual future switching.

Keep the Google survey's baseline-before-water-before-concept order. To test “Movers,” add occupation and move/source-change timing. Obtain open willingness-to-pay before showing the proposed price. Retail availability and supplier cost remain separate research streams.

## 7. Product, evidence and technical brief

- **Use “hardness screening + regional information,” not “Diagnosis.”** The diagnosis wording still appears in the updated benchmark/differentiation and in the pasted response.
- **Sampling date correction:** 1998–2001 is the BGS project period; the national survey samples were collected in **1998 and 1999**, and the report is dated **2001**. Label those separately in Pani Map and the sources. [BGS national maps and sampling phases](https://www.bgs.ac.uk/groundwater/quality/groundwater-and-health/arsenic-contamination-of-groundwater/bangladesh-maps/)
- **Confidence labels are not validated.** The proposed “≥5 samples OR ≤10 years old = Medium” permits 25-year-old results to appear Medium for today's water. Separate historical source coverage from recency and household relevance. Do not automatically suggest a current household variant from old regional chemistry.
- **Conductivity/TDS remains an estimate of dissolved-ion content.** It does not independently identify NaCl or prove a saline-water composition. Specify calibration, temperature and any salinity conversion separately.
- **Technical plausibility is supported at ingredient level:** MakingCosmetics gives a typical GLDA-product use range of 0.1–0.5%, but that product is **46–48% active**. The range is not proof of deposit removal by WaterSmart. State active versus supplied-product basis for each ingredient. [GLDA supplier specification](https://www.makingcosmetics.com/on/demandware.static/-/Sites-makingcosmetics-master/default/dwc853a61d/fact-sheets/fact-sheet-tetrasodium-glutamate-diacetate2.pdf)
- Indorama describes its APG line as tolerant of high electrolyte concentrations. Nouryon lists improved shampoo cleaning/foaming among GLDA applications. These support screening an approach; neither validates the proposed LonaJol formula, concentration or claim. [Indorama GLUCOSURF](https://indovinya.indoramaventures.com/wp-content/uploads/2024/09/Indorama-Ventures-GLUCOSURF-ENG.pdf), [Nouryon product sheet](https://www.nouryon.com/globalassets/inriver/resources/pds-dissolvine-gl-premium-max-en.pdf)
- The mechanism paragraph is too categorical about all anionic surfactants forming a film or losing foam. Describe system-dependent effects and test the chosen formula. Do not equate soap behaviour with every shampoo surfactant.
- Define test units, repeats, randomisation, comparator, endpoints and analysis. “Not worse than Dove” needs a predefined comparison margin; a non-significant difference alone does not establish non-inferiority.
- “No sensitisation” must mean no observed response in that study, not a universal guarantee. Preservation testing is not explicit in the proposed plan. Three accelerated months alone do not establish an 18-month strip shelf life.
- Similar 340ml capacity does not establish neck/cap compatibility, line clearance or available production capacity. The Modify route remains a proposal.

The Cove precedent is verified for **water-softener dishwasher models**, with a supplied strip and sleeve instructions. It supports the feasibility of supplying a protected strip, not shampoo-cap economics, novelty or compatibility. Follow the purchased strip's instructions rather than assuming Cove's one-second/15-second timing applies to another product. [Cove strip instructions](https://www.subzero-wolf.com/assistance/answers/cove/dishwasher/cove-dishwasher-water-hardness-test-strip)

## 8. Pilot design

Keep the two-cell, six-month structure as a planning assumption, with named commercial/R&D owners. Correct these details:

- Safety, regulatory release, batch quality and strip reliability are mandatory gates. “Two of three commercial gates passed” can justify an extension only after these gates pass.
- Separate RoS, consumer repeat and outlet reorder. Distributor loading is not consumer sell-out; free incentives are not paid repeat purchases.
- Specify recruited cohort, denominator, consent, recontact loss and receipt/transaction verification. QR/WhatsApp registrants are a selected subset of buyers.
- Measure repeat by SKU and consumption cycle. At the stated 7ml dose, 340ml lasts about 49 washes: a single user washing twice weekly may not need another bottle within 60 days. A single 60-day repeat threshold across sachets and bottles is misleading.
- Define the actual pilot sales plan and trial quantities; “70% of plan” needs a denominator by channel.
- If LonaJol moves to Y2, make its volumes, costs and marketing spend conditional on its own full product gates. Relabelling Y1 rural volume may be a scenario assumption, but it does not validate unchanged demand/mix after a strategy change.
- A LonaJol foam threshold plus IHUT preference does not replace mildness, stability, preservation and regulatory work.

## 9. Sustainability arithmetic

Using the response's assumed weights, the Y3 packaging mass of **90.0108 tonnes** is correct. Refill's equal-volume plastic reduction of **68.125%** is also correct.

Two corrections:

1. With a common 7ml dose, a 6ml sachet represents 0.857 wash, so its plastic is **0.70g per equivalent wash**, not 0.60g. A pack-specific one-sachet dose may be used, but disclose the different dose and avoid claiming a common-dose comparison.
2. Per 300ml refill, equal-volume bottle plastic avoided is `32 × 300/340 − 9 = 19.24g`, not 23g. The latter compares different capacities.

Include strip/foil/labels and other relevant plastic in measured packaging mass. Collection and recycling are separate obligations; estimating collection at an assumed Tk 60/kg does not establish the complete compliance cost. “The 1% NR budget is conservative” remains unverified without scope and vendor/PRO estimates. Describe multilayer sachets as difficult to collect/recycle in the relevant system rather than declaring universal non-recyclability.

## 10. Recommended order of work

1. Obtain a dated landed strip+sleeve quote; target Tk 3–5 and rerun project returns, not only bottle GM.
2. Keep the neutral survey, add Movers/workaround/spend fields, and repair logger counting/merge logic before relying on summaries.
3. Reconcile the full monthly cash schedule with the annual appraisal; verify funding for all scenarios.
4. Add the technical brief and pilot plan with clear assumptions, mandatory gates and SKU-specific repeat metrics.
5. Correct comparison wording, historical dates, screening terminology and plastic arithmetic across the master, HTML, deck and video.
6. Then apply one consistent v3 set of numbers and a change log everywhere.

The proposed 93/95 scores are internal judgement, not Marico's published rubric. A strip quote, demo and favourable survey counts alone do not establish 95+ readiness; coherent cash flows, formula validation plans and a credible competitive advantage still matter.

## Verification artifacts and limits

`WaterSmart_v3_Financial_Check.json` contains the recalculated annual scenarios, Y1 monthly reconstruction, strip-cost sensitivity and packaging arithmetic. Browser UI rendering and live Google Form responses were not tested in this review. Supplier prices, completed fieldwork, the missing monthly source model and final commercial/regulatory approvals remain unverified.
