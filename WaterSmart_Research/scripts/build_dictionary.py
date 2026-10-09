"""Generate a column inventory with units, row grain and missing-value rules."""
from pathlib import Path
import csv,json,re
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'analysis'
grains={
 'water_wells_processed.csv':'One historical BGS well sample; raw sample ID unique. Measurement1998–1999.',
 'water_by_district.csv':'One historical district; descriptive unweighted well summary.',
 'water_by_historical_thana.csv':'One historical district/thana pair; not current administrative boundaries.',
 'dhaka_2025_published_location_values.csv':'One selected tap location as reported in a2025 conference paper; collection date unspecified.',
 'published_survey_aggregates.csv':'One original study variable/category aggregate; not a respondent.',
 'retail_price_observations.csv':'One retailer/product/declared-volume listing observed9Oct2026; not a sale.',
 'user_supplied_opinions.csv':'One user-supplied real-adult summary; date/consent/order pending; no finished-product trial.',
 'marico_public_financial_benchmarks.csv':'One reported company-wide financial metric, FY26/balance31March2026; not an SKU cost.',
 'finance_overlay_monthly_Tk_cr.csv':'One conditional scenario × NWC policy × project month, M0–M72; no observed sales.',
 'all_model_inputs_evidence_register.csv':'One frozen-model scalar, label/policy or added evidence gap; not one independent estimate.',
 'evidence_ledger.csv':'One curated claim/status/locator/limitation.',
 'source_index.csv':'One distinct retrieval-attempt ID; latest attempt, with history preserved in download manifest.'
}
special={
 'SAMPLE_ID':'Original BGS sample identifier; text, unique in processed wells.',
 'SAMPLE_DATE':'Original day/month/year sampling date; never access/publication date.',
 'LAT_DEG':'Original latitude in decimal degrees; no household geolocation inference.',
 'LONG_DEG':'Original longitude in decimal degrees.',
 'WELL_DEPTH':'Original well depth, metres; well/aquifer, not household exposure depth.',
 'WELL_TYPE':'Original well-type label.',
 'DIVISION':'Historical administrative division label.',
 'DISTRICT':'Historical district label.',
 'THANA':'Historical thana label; do not silently map to current upazila.',
 'UNION':'Original historical union label.',
 'Fe':'Raw iron reading in mg/L; retain censoring notation/missingness.',
 'Ca':'Raw calcium reading in mg/L; retain censoring notation/missingness.',
 'Mg':'Raw magnesium reading in mg/L; retain censoring notation/missingness.',
 'hardness_unit':'mg/L asCaCO3; hardness is derived from pairedCa/Mg, not field titration.',
 'hardness_class':'USGS descriptive band or missing/ambiguous_censored; not a hair-health verdict.',
 'n_wells':'Total original observations in group, including chemistry-missing rows.',
 'soft':'Count at hardness≤60mg/L asCaCO3.',
 'moderately_hard':'Count at60<hardness≤120mg/L asCaCO3.',
 'hard':'Count at120<hardness≤180mg/L asCaCO3.',
 'very_hard':'Count at hardness>180mg/L asCaCO3.',
 'missing':'Count lacking sufficient paired chemistry.',
 'ambiguous_censored':'Count whose interval straddles a classification boundary.',
 'district':'Historical district label.',
 'thana':'Historical thana label; grouping key is district+thana.',
 'scenario':'Named frozen-model fiscal/cost sensitivity; not an observed outcome.',
 'release':'with/without final NWC-release policy. Here text, not a monetary amount.',
 'm':'Project month integer:0CAPEX,1–12prelaunch,13–72national years. This field is not divided by10.',
 'label':'Human-readable project period; a label, not a measurement.',
 'rev':'Net revenue, Tk crore, conditional monthly model.',
 'ebitda':'Incremental EBITDA before fund, Tk crore.',
 'wppf':'Illustrative participation-fund cash/accrual allocation, Tk crore; actual dates/base pending.',
 'tax':'Illustrative positive-EBIT monthly tax cash, Tk crore; no loss relief.',
 'dnwc':'Month-to-month change in working capital, Tk crore; negative means release.',
 'nwc':'Exit operating NWC balance, Tk crore,12%annualizedmonthlyNR planning policy.',
 'pilot':'Precommercial cash allowance, Tk crore; no sales credited.',
 'release_cash':'Final NWC cash release, Tk crore; full release implies wind-down.',
 'cash':'Total project monthly cash flow, Tk crore including CAPEX/pilot/tax/fund/NWC.',
 'cumulative':'Cumulative project cash from M0, Tk crore; minimum gives peak funding.',
 'reported_count':'Published category count; blank for mean-only aggregate, never invented.',
 'denominator':'Original study/answered denominator; not automatic national population.',
 'reported_mean':'Original reported mean on the stated scale; not a percentage.',
 'reported_sd':'Original reported standard deviation; not standard error.',
 'source_pdf_page':'1-based PDF page/table locator; HTML locators are labelled.',
 'scale':'Original response units/scale and prompting context.',
 'variable':'Original-study construct or extracted aggregate variable.',
 'category':'Original response category/choice factor, kept separate per variable.',
 'primary_analysis_eligible':'False while required research metadata are pending; no automatic import into logger.',
 'authenticity':'User-confirmed real means the user attests to authenticity; not independent verification.',
 'collection_date':'Actual opinion collection date; blank pending, never substituted by access date.',
 'research_consent':'Anonymous research-use consent; blank pending; no names/contacts collected.',
 'price_order':'Whether price330was presented before open maximum price; blank pending.',
 'actual_water_test':'False for all supplied opinion notes; none has objective water testing.',
 'actual_product_trial':'False for all supplied opinions; WaterSmart not tested.',
 'metadata_status':'Explicit completeness state, not consent inferred from provision of a summary.',
 'volume_ml':'Declared comparable listing volume,ml;12×5.25=63; not measured density/mass.',
 'observed_sale_price_BDT':'Displayed online offer inBDT; delivery/checkout/landed quote unverified.',
 'price_per_100ml_BDT':'Observed offer÷declaredvolume×100, BDT/100ml.',
 'value_BDT':'Reported company metric inBDT; divide10,000,000forTkcrore.',
 'input_id':'Nested original parameter path, or explicit missing/design gap.',
 'old_value':'Frozen planning value in original model units. Rates are fractions; internal cash values Tk million unless SKU Tk/unit or explicit quantity.',
 'usable_as_verified_fact':'Evidence eligibility, not an assertion that the original forecast value is observed.',
 'retrieval_status':'downloaded/reused/failed/invalid_PDF_response_HTML. A failed ID may also have web-capture evidence.',
 'local_file':'Relative retained raw response; absence forfailed downloads is explicit.',
 'sha256':'SHA-256 of retained raw bytes; empty if nofile; not independent source authenticity.',
 'bytes':'Retained response byte size, not respondent/sample count.',
 'attempts':'Number of download attempts forID; never number of independent sources.',
 'last_accessed_utc':'UTC retrieval timestamp; distinct from sample/publication date.',
 'measurement_or_publication_date':'Explicit date type; uncertain collection date remains uncertain.'
}
def meaning(col):
 if col in special:return special[col]
 if col.endswith('_value_status'):return 'exact/censored/missing; preserve status with numeric values.'
 if col.endswith('_exact_mg_L'):return 'Exact chemical concentration only if interval bounds agree;mg/L (hardness asCaCO3). Blank means not exact/missing.'
 if col.endswith('_lower_mg_L'):return 'Lower concentration interval bound;mg/L,0forleft-censoredpositive result,blankmissing.'
 if col.endswith('_upper_mg_L'):return 'Upper concentration bound;mg/L,exclusive for<LOD;blankmissing.'
 if re.match(r'(Fe|Ca|Mg|hardness)_(p25|median|p75|minimum|maximum|min|max)_',col):return 'Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values.'
 if col.endswith('_sample_pct'):return '100×thresholdcount/determinate denominator; historical sampled wells,notpopulation prevalence.'
 if col.endswith('_denominator'):return 'Nonmissing/determinate observations for this exact threshold;do notreplacewithn_wells.'
 if col.endswith('_unknown'):return 'Missing/ambiguous records for exact threshold;unknownisnotnegative.'
 if col.endswith('_censored_n'):return 'Count withleft-censoredconcentration/derivedinterval.'
 if col.endswith('_n'):return 'Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople.'
 if 'mg_L' in col:return 'Reported chemistry concentration,mg/L;hardness asCaCO3;blanknotreported.'
 if col.endswith('_selfreported'):return 'Supplied opinion value,notindependentlymeasured/retailverified;BDTforprice,mlforvolume.'
 if col=='maximum_price_BDT_selfreported':return 'Supplied conditional maximumprice,BDT;unknownanchoring andnoactualpurchase.'
 if col=='current_price_per_100ml_BDT':return 'Derivedfromsuppliedrecalledpackprice/volume;BDT/100ml,notcurrentretailobservation.'
 if col in ['source_id','source_ids','source_url','url','source_file','locator']:return 'Original-sourceidentifier/URL/localfile orclaimlocator;retainattribution;semicolonjoinsmultipleIDs.'
 if col in ['status','evidence_type','type']:return 'Evidence/statusclassification; distinguishobserved,reported,proposed,conditionalandunresolved.'
 if col in ['notes','limits','analysis_note','interpretation','needed_evidence']:return 'Limitations/qualitynotes orspecificunmetverificationrequest;notanobservedresult.'
 if col in ['accessed_date','accessed_local_date']:return 'Localaccessdate9Oct2026;notdateofmeasurement/publication.'
 if col in ['owner','priority']:return 'Proposedverificationowner/priority;noappointment/commitmentimplied.'
 return 'Text/provenance descriptor exactly as archived/transcribed; do not infer additional measurements.'
parts=['# Data dictionary\n','9 October 2026 · Team The Last BrainCell. CSVs are UTF-8 with BOM for Excel-friendly opening; JSON is UTF-8.\n','## Universal rules\n','Blank means missing/not supplied, not zero. Censored chemistry retains intervals. Count and unit fields are dataset-specific. Original sources retain collection credit; analysis is credited to the team. All user notes are anonymous and metadata-pending; retain internally until research consent is documented. Historical wells are not current households. Financial rows are conditional model outputs, not empirical purchases.\n']
inventory=[]
for name,grain in grains.items():
 with (OUT/name).open(encoding='utf-8-sig',newline='') as f:r=csv.DictReader(f);cols=r.fieldnames;count=sum(1 for _ in r)
 parts.extend([f'## `{name}`\n',f'**Grain:** {grain} **Rows:** {count}. [Download](analysis/{name}).\n','| Field | Meaning, unit and missing rule |\n|---|---|'])
 parts.extend(f'| `{col}` | {meaning(col)} |' for col in cols)
 parts.append('')
 inventory.append(dict(filename=name,rows=count,grain=grain,columns=[dict(name=col,meaning=meaning(col)) for col in cols]))
parts.extend(['## JSON and raw artifacts\n','`water_summary.json`: dataset dates/hash, total coverage, censoring method and sample statistics. `published_surveys_metadata.json`: original authors, population/method/limitations; no microdata. `science_primary_records.json`: seven original NLM records/abstracts. `user_opinions_metadata.json`: five notes,zero method-complete records. `retail_price_summary.json`: descriptive catalogue coverage. `marico_benchmark_calculations.json`: derived company ratios with limits. `finance_evidence_overlays.json`: assumptions, five scenarios,bothreleasepolicies,fullmonthly outputs and847assertions; internal model cash isTk million while metric fields ending`_cr` areTkcrore. `all_model_inputs_evidence_register.json`/`evidence_ledger.json`/`source_index.json` correspond to theCSVrecords.\n','`raw/` contains untouched public responses, extracted `.txt` derivatives, web captures and supplied private notes. PDF page locators are1-based. Extracted Bangla from the EPR gazette is garbled; the retained page images and visual-check record accompany key clauses. An invalid PDF response is explicitly marked. `baseline/` preserves originals; `baseline_manifest.json` and final artifact manifest allow integrity checks.\n'])
(ROOT/'DATA_DICTIONARY.md').write_text('\n'.join(parts),encoding='utf-8')
(OUT/'data_dictionary.json').write_text(json.dumps(inventory,ensure_ascii=False,indent=2),encoding='utf-8')
print('Dictionary:',len(inventory),'CSVs;',sum(x['rows'] for x in inventory),'rows across unlike datasets (not a participant total)')
