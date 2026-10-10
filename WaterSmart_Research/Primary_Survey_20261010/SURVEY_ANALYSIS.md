# WaterSmart primary survey audit and target-Tk360 analysis

**Review date:** 10 October 2026, Asia/Dhaka. **Team:** The Last BrainCell. **Source:** user-supplied `WaterSmart_responses.csv`; XLSX preserved as a companion source snapshot. This is a new user-disclosed primary survey, separate from the earlier published studies and five opinion summaries.

**বাংলায় সিদ্ধান্ত:** consumer problem ও concept interest নিয়ে নিজেদের survey evidence পাওয়া গেছে। ৫০টি submission-এর মধ্যে ১টি consent “না”; descriptive analysis-এ **৪৯টি consent-yes record** রাখা হয়েছে। Target **Tk360**-এর জন্য recorded maximum-price answers বিশ্লেষণ করেছি। Price acceptance ও actual sales একই বিষয় নয়; এই sample থেকে revenue/paid repeat বা product effectiveness প্রমাণিত হয় না।

## 1. Collection and price-version record

- User reports the form was released on **3 October**, closed on **10 October**, and only disclosed to the assistant after the earlier audit.
- Export timestamps as written run **03/10/2026 19:38:25–09/10/2026 23:12:43**. Day-first parsing is consistent with the user's October collection statement. The timestamp strings contain no timezone; no UTC conversion was inferred.
- User reports **WhatsApp groups and friends of friends** recruitment: a convenience/snowball sample, not a random national sample.
- User states answers/timestamps were not manually changed. Individual respondent authenticity was not independently checked; collection is user-attested.
- Current export Q21 header says **Tk360**. User explicitly says the earlier price was **Tk400**, used “for safety”, and the form was updated to 360 today.
- Accordingly, Q21 is retained as a **historical Tk400 stated-intent item based on user declaration**. Its 33 positive answers are not relabelled as observed Tk360 responses.
- User subsequently asked for analysis at **Tk360** and declined further version questions. This request is implemented by comparing valid Q20 stated maximum prices against 360. No further clarification is required to use the bounded descriptive results below.
- Current Q22/Q24 option labels show 360. The old full pack/price-pair wording and exact edit/closure times were not separately documented. Format/A/B choices are reported descriptively; historical premium willingness from that pair is not certified.

Both original files remain unchanged. Byte-identical snapshots and SHA256 hashes are in `raw/` and `raw_manifest.json`. Current labels are preserved; analysis metadata records the historical exposure issue rather than overwriting raw answers.

## 2. Eligibility and sample profile

| Item | Result |
|---|---:|
| Raw submissions | 50 |
| Q1 consent-yes records retained | **49** |
| Consent “না” excluded | **1** (`WS-S009`; other questions blank) |
| Synthetic/reconstructed respondents | **0** |
| Current shampoo users by Q9 | 48/49 |
| Age 18–24 | 30/49 = 61.2% |
| Student hostel/mess residents | 22/49 = 44.9% |
| Student/nonstudent hostel/mess/shared-living residents | 27/49 = 55.1% |
| Numeric stated maximum-price answers | **47**; 2 missing |

No exact duplicate answer vectors or duplicate Q2–Q25 answer profiles were found in this export. This does not independently authenticate unique individuals. Similar demographics alone were not grounds for deleting a response. The one non-shampoo user remains in the consenting-adult descriptive base; business targeting may use a separately defined shampoo-user subgroup.

The earlier five opinion summaries were not appended. Their overlap with these respondents is unknown, and their separate date/consent/order metadata remain unresolved. Do not report n=54 or n=55.

## 3. Consumer problem and concept interest

| Measure | Count/base | Percentage |
|---|---:|---:|
| Water source changed in last 12 months | 22/49 | **44.9%** |
| More problems reported after change, among changers | 18/22 | **81.8%** |
| Concept appeal rated 4 or 5 | 38/49 | **77.6%** |
| Distinctiveness rated 4 or 5 | 38/49 | **77.6%** |
| Unpriced “definitely/probably try” | 38/49 | **77.6%** |
| Historical Q21 “definitely/probably try” (user reports Tk400) | 33/49 | **67.3%** |

Among the 22 changers, 18 said worse, 1 better and 3 could not judge. The main 81.8% figure retains all 22 changers as its denominator. Their perceptions do not establish water chemistry or causation of hair problems.

Q10 is multiple-response. Reported rough/dry hair: 27/49 (55.1%); perceived increased hair fall: 26/49 (53.1%); dandruff/itch: 17/49 (34.7%). These are self-reported experiences, not diagnoses or evidence that WaterSmart treats them.

46 respondents selected a symptom rather than “none”; 41 answered the optional cause question. **21/41 (51.2%)** mentioned water/iron-related issues, including uncertain attribution. The other 5 eligible blank cause answers are missing, not evidence that they did not blame water. “Unprompted” interpretation additionally depends on the original title/order/presentation, which was not independently recovered. The conservative report label is **water-related mention in open cause answers**.

## 4. Requested Tk360 pricing analysis

Q20 maximum-price answers have **median Tk320**, mean approximately Tk321.91, range 0–500, n=47. Zero is retained; missing responses are not changed to zero.

| Proposed price threshold | Recorded maximum at least this amount | Share of valid Q20 answers |
|---|---:|---:|
| Tk300 | 36/47 | 76.6% |
| Tk330 | 21/47 | 44.7% |
| **Tk360** | **15/47** | **31.9%** |
| Tk400 | 12/47 | 25.5% |

These are **stated maximum-price coverage**, not actual purchase conversion, market share or causal price elasticity. The findings suggest budget pressure at 360 in this sample. They do not establish that exactly 31.9% will buy, or that a cheaper pack is automatically more profitable.

The declared historical Tk400 intent and stated maximum prices conflict for some records: **21** respondents selected a positive Q21 intent while writing a maximum below 400; **18** wrote a maximum below the requested 360 target. These are retained as reviewed response-level inconsistencies. They may reflect hypothetical answering or interpretation differences; they are not proof of fabrication and are not silently deleted.

There is therefore no directly established Q21 cohort tested at 360 in this file. Reporting **“67.3% intend to buy at Tk360”** would replace the known historical reference price and is not supported.

### Target-segment descriptive comparisons

| Subgroup | Valid maximum-price base | Median maximum | Maximum >=360 |
|---|---:|---:|---:|
| All consenting adults with numeric Q20 | 47 | 320 | 15/47 = 31.9% |
| Water-source changers | 22 | 350 | 10/22 = 45.5% |
| Student hostel/mess | 22 | 320 | 7/22 = 31.8% |
| All hostel/mess/shared living | 27 | 320 | 9/27 = 33.3% |

Water-source changers are a potentially more relevant recruitment group, but these small, overlapping convenience subgroups do not establish a national segment size or paid demand. No significance test or population margin of error is claimed.

## 5. What people value, prefer and worry about

### First-trial format choices

| Format | Count/base | Share |
|---|---:|---:|
| 6ml sachet | 18/49 | 36.7% |
| 340ml strip pack | 15/49 | 30.6% |
| 180ml bottle | 11/49 | 22.4% |
| None | 5/49 | 10.2% |

Formats are reported without certifying the original full price card. This supports keeping a low-cash trial route in the proposal; it does not measure units bought per outlet or bottle conversion after sachet trial.

### Most-valued feature (single choice)

| Feature | Count/base | Share |
|---|---:|---:|
| Proposed mineral-cleansing formula | 20/49 | **40.8%** |
| Low-cost sachet trial | 12/49 | 24.5% |
| Hardness strip | 9/49 | 18.4% |
| Regional-information QR | 3/49 | 6.1% |
| None especially valuable | 4/49 | 8.2% |
| Other: local company | 1/49 | 2.0% |

The formula is the leading selected benefit; the strip and QR are supporting elements. This argues for substantiated product performance and affordable trial in the pitch, rather than assuming packaging alone will create repeat.

Q24 counts as currently exported: strip option B=23, no-strip option A=15, no preference=7, neither=4 (base49). The original price pair is not fully documented; these counts cannot certify a 330→360 incremental strip premium or a same-price strip preference.

Leading concerns: whether the formula works **16/49 (32.7%)**, price appropriateness **10/49 (20.4%)**, hair/scalp fit **6/49 (12.2%)**, reason to switch **6/49 (12.2%)**, strip reliability **5/49 (10.2%)**. Qualitative comments also raise iron/salinity scope, strip re-use/chart/expiry, Bangla instructions, access and small-pack affordability. Those comments guide design/testing; they are not measured technical outcomes.

## 6. Quality review and analytical boundaries

- Required-question completeness is 49/49 among retained records. Optional blanks are preserved: gender2, pack-size5, paid-price7, cause8, maximum-price2 and final-comment16.
- `WS-S027` says water did not change but Q14 “no difference”. It is flagged and kept. It is outside the water-changer subgroup, so does not enter the 18/22 metric.
- No exclusive-none-plus-other contradiction or out-of-range numeric/scale value was detected by the documented rules. No explicit test marker was detected; collection/test provenance remains user-attested.
- All records with price-intent tensions remain included. Flags document uncertainty, not a fabricated corrected answer.
- Raw CSV row count, eligibility, WTP base, median, >=360 count and Q21 top-2 were independently recomputed with the native CSV importer and matched the JS analysis.
- Both source snapshots match the original file SHA256. The original CSV and Excel were not edited.
- Native XLSX cell reconciliation was not completed: the spreadsheet inspection runtime returned `missing field sandboxPolicy`. The complete CSV was used for this analysis. The [Spreadsheets skill](<C:/Users/User/.codex/plugins/cache/openai-primary-runtime/spreadsheets/26.521.10419/skills/spreadsheets/SKILL.md>) instructs use of `@oai/artifact-tool` for “authoring, editing, inspecting, rendering, and exporting spreadsheet .xlsx workbooks”; no alternate XLSX editing library or newly authored workbook was used. `INSPECTION_SCOPE.json` records this technical scope limit.

## 7. How this changes the project

**New evidence:** the project now has a disclosed, user-collected primary consumer survey with 49 consent-yes records available for scoped descriptive analysis. Earlier “no survey export supplied” statements describe the earlier disclosure state and are superseded by this addition.

**Supported pitch use:** the water-change experience and concept-interest figures above, with denominators, recruitment method and self-report limitations. The target-360 analysis is the recorded maximum-price comparison, not a relabelled price-intent result.

**Still unresolved:** finished-formula performance/safety, strip/cap qualification, real household water chemistry, packaging/BOM quotations, trade/invoice terms, outlet productivity, actual sales, mature paid repeat, cannibalisation and commercial investment return. Survey responses do not verify the existing Tk95 production cost or Tk41Cr revenue forecast.

No financial input was automatically replaced by a survey percentage. Current v4 remains a conditional proposal model. Consider the median maximum320 and >=360 coverage when comparing quoted pack/price options; lower launch pricing changes company realization and must be reappraised with costs and actual sales, not assumed to repair NPV.

### Safe deck statements

> In a WhatsApp/friend-of-friend survey, 49 consent-yes adult responses were analysed. Of 22 respondents who changed their water source in the past year, 18 reported more hair/washing problems. 38 of 49 rated the concept 4 or 5 out of 5. Among 47 numeric maximum-price answers, the median was Tk320 and 15 stated at least Tk360. These are descriptive self-reports from a convenience sample.

If including Q21, append: “33 of49 selected definitely/probably try at the historical price, which the researcher reports was Tk400; the exported header was later updated to Tk360.” Do not report this as actual buying, repeat or verified360 intent.

## 8. Files and resume checkpoint

- `raw/WaterSmart_responses.csv`, `raw/WaterSmart_responses.xlsx`: preserved source snapshots.
- `raw_manifest.json`: source and snapshot hashes.
- `raw_matrix.json`: all50 rows/current exported column names as parsed.
- `cleaned_survey_records.csv`: 49 retained rows, original values plus explicit historical400/target360 fields and review flags.
- `survey_summary.json`: counts, subgroup bases and pricing/version metadata.
- `quality_review_flags.csv`, `exclusions.json`: review/exclusion ledger.
- `analyse_survey.js`: pure JS analysis function; inputs are the recorded matrix and metadata. Additional cohort definitions are documented in the summary.
- `independent_csv_checks.json`: source-level reconciliation of core metrics.
- `CHECKPOINT.json`: latest status and instructions for continuing without losing the price history.

Resume from this report and checkpoint. Reassess only if a new export or reliable historical form version is supplied. Preserve original rows and price-reference metadata. Keep the prior five notes separate. Do not regenerate older research state with a script that resets primary records to zero or import these responses into the old `pi330` logger field.
