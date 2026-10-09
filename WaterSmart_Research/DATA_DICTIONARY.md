# Data dictionary

9 October 2026 · Team The Last BrainCell. CSVs are UTF-8 with BOM for Excel-friendly opening; JSON is UTF-8.

## Universal rules

Blank means missing/not supplied, not zero. Censored chemistry retains intervals. Count and unit fields are dataset-specific. Original sources retain collection credit; analysis is credited to the team. All user notes are anonymous and metadata-pending; retain internally until research consent is documented. Historical wells are not current households. Financial rows are conditional model outputs, not empirical purchases.

## `water_wells_processed.csv`

**Grain:** One historical BGS well sample; raw sample ID unique. Measurement1998–1999. **Rows:** 3534. [Download](analysis/water_wells_processed.csv).

| Field | Meaning, unit and missing rule |
|---|---|
| `SAMPLE_ID` | Original BGS sample identifier; text, unique in processed wells. |
| `SAMPLE_DATE` | Original day/month/year sampling date; never access/publication date. |
| `LAT_DEG` | Original latitude in decimal degrees; no household geolocation inference. |
| `LONG_DEG` | Original longitude in decimal degrees. |
| `WELL_DEPTH` | Original well depth, metres; well/aquifer, not household exposure depth. |
| `WELL_TYPE` | Original well-type label. |
| `DIVISION` | Historical administrative division label. |
| `DISTRICT` | Historical district label. |
| `THANA` | Historical thana label; do not silently map to current upazila. |
| `UNION` | Original historical union label. |
| `Fe` | Raw iron reading in mg/L; retain censoring notation/missingness. |
| `Ca` | Raw calcium reading in mg/L; retain censoring notation/missingness. |
| `Mg` | Raw magnesium reading in mg/L; retain censoring notation/missingness. |
| `Fe_lower_mg_L` | Lower concentration interval bound;mg/L,0forleft-censoredpositive result,blankmissing. |
| `Fe_upper_mg_L` | Upper concentration bound;mg/L,exclusive for<LOD;blankmissing. |
| `Fe_value_status` | exact/censored/missing; preserve status with numeric values. |
| `Fe_exact_mg_L` | Exact chemical concentration only if interval bounds agree;mg/L (hardness asCaCO3). Blank means not exact/missing. |
| `Ca_lower_mg_L` | Lower concentration interval bound;mg/L,0forleft-censoredpositive result,blankmissing. |
| `Ca_upper_mg_L` | Upper concentration bound;mg/L,exclusive for<LOD;blankmissing. |
| `Ca_value_status` | exact/censored/missing; preserve status with numeric values. |
| `Ca_exact_mg_L` | Exact chemical concentration only if interval bounds agree;mg/L (hardness asCaCO3). Blank means not exact/missing. |
| `Mg_lower_mg_L` | Lower concentration interval bound;mg/L,0forleft-censoredpositive result,blankmissing. |
| `Mg_upper_mg_L` | Upper concentration bound;mg/L,exclusive for<LOD;blankmissing. |
| `Mg_value_status` | exact/censored/missing; preserve status with numeric values. |
| `Mg_exact_mg_L` | Exact chemical concentration only if interval bounds agree;mg/L (hardness asCaCO3). Blank means not exact/missing. |
| `hardness_lower_mg_L` | Lower concentration interval bound;mg/L,0forleft-censoredpositive result,blankmissing. |
| `hardness_upper_mg_L` | Upper concentration bound;mg/L,exclusive for<LOD;blankmissing. |
| `hardness_value_status` | exact/censored/missing; preserve status with numeric values. |
| `hardness_exact_mg_L` | Exact chemical concentration only if interval bounds agree;mg/L (hardness asCaCO3). Blank means not exact/missing. |
| `hardness_unit` | mg/L asCaCO3; hardness is derived from pairedCa/Mg, not field titration. |
| `hardness_class` | USGS descriptive band or missing/ambiguous_censored; not a hair-health verdict. |
| `source_id` | Original-sourceidentifier/URL/localfile orclaimlocator;retainattribution;semicolonjoinsmultipleIDs. |

## `water_by_district.csv`

**Grain:** One historical district; descriptive unweighted well summary. **Rows:** 61. [Download](analysis/water_by_district.csv).

| Field | Meaning, unit and missing rule |
|---|---|
| `district` | Historical district label. |
| `n_wells` | Total original observations in group, including chemistry-missing rows. |
| `Fe_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `Fe_censored_n` | Count withleft-censoredconcentration/derivedinterval. |
| `Fe_p25_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Fe_p25_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Fe_p25_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Fe_median_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Fe_median_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Fe_median_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Fe_p75_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Fe_p75_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Fe_p75_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Fe_min_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Fe_max_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `Ca_censored_n` | Count withleft-censoredconcentration/derivedinterval. |
| `Ca_p25_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_p25_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_p25_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_median_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_median_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_median_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_p75_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_p75_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_p75_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_min_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_max_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `Mg_censored_n` | Count withleft-censoredconcentration/derivedinterval. |
| `Mg_p25_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_p25_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_p25_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_median_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_median_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_median_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_p75_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_p75_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_p75_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_min_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_max_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `hardness_censored_n` | Count withleft-censoredconcentration/derivedinterval. |
| `hardness_p25_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_p25_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_p25_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_median_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_median_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_median_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_p75_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_p75_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_p75_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_min_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_max_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `iron_gt_0_3_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `iron_gt_0_3_denominator` | Nonmissing/determinate observations for this exact threshold;do notreplacewithn_wells. |
| `iron_gt_0_3_unknown` | Missing/ambiguous records for exact threshold;unknownisnotnegative. |
| `iron_gt_0_3_sample_pct` | 100×thresholdcount/determinate denominator; historical sampled wells,notpopulation prevalence. |
| `iron_gt_1_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `iron_gt_1_denominator` | Nonmissing/determinate observations for this exact threshold;do notreplacewithn_wells. |
| `iron_gt_1_unknown` | Missing/ambiguous records for exact threshold;unknownisnotnegative. |
| `iron_gt_1_sample_pct` | 100×thresholdcount/determinate denominator; historical sampled wells,notpopulation prevalence. |
| `iron_gt_3_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `iron_gt_3_denominator` | Nonmissing/determinate observations for this exact threshold;do notreplacewithn_wells. |
| `iron_gt_3_unknown` | Missing/ambiguous records for exact threshold;unknownisnotnegative. |
| `iron_gt_3_sample_pct` | 100×thresholdcount/determinate denominator; historical sampled wells,notpopulation prevalence. |
| `hardness_gt_120_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `hardness_gt_120_denominator` | Nonmissing/determinate observations for this exact threshold;do notreplacewithn_wells. |
| `hardness_gt_120_unknown` | Missing/ambiguous records for exact threshold;unknownisnotnegative. |
| `hardness_gt_120_sample_pct` | 100×thresholdcount/determinate denominator; historical sampled wells,notpopulation prevalence. |
| `hardness_gt_180_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `hardness_gt_180_denominator` | Nonmissing/determinate observations for this exact threshold;do notreplacewithn_wells. |
| `hardness_gt_180_unknown` | Missing/ambiguous records for exact threshold;unknownisnotnegative. |
| `hardness_gt_180_sample_pct` | 100×thresholdcount/determinate denominator; historical sampled wells,notpopulation prevalence. |
| `iron_gt_0_3_OR_hardness_gt_120_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `iron_gt_0_3_OR_hardness_gt_120_denominator` | Nonmissing/determinate observations for this exact threshold;do notreplacewithn_wells. |
| `iron_gt_0_3_OR_hardness_gt_120_sample_pct` | 100×thresholdcount/determinate denominator; historical sampled wells,notpopulation prevalence. |
| `iron_gt_1_AND_hardness_le_120_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `iron_gt_1_AND_hardness_le_120_denominator` | Nonmissing/determinate observations for this exact threshold;do notreplacewithn_wells. |
| `iron_gt_1_AND_hardness_le_120_sample_pct` | 100×thresholdcount/determinate denominator; historical sampled wells,notpopulation prevalence. |
| `soft` | Count at hardness≤60mg/L asCaCO3. |
| `moderately_hard` | Count at60<hardness≤120mg/L asCaCO3. |
| `hard` | Count at120<hardness≤180mg/L asCaCO3. |
| `very_hard` | Count at hardness>180mg/L asCaCO3. |
| `missing` | Count lacking sufficient paired chemistry. |
| `ambiguous_censored` | Count whose interval straddles a classification boundary. |

## `water_by_historical_thana.csv`

**Grain:** One historical district/thana pair; not current administrative boundaries. **Rows:** 433. [Download](analysis/water_by_historical_thana.csv).

| Field | Meaning, unit and missing rule |
|---|---|
| `district` | Historical district label. |
| `thana` | Historical thana label; grouping key is district+thana. |
| `n_wells` | Total original observations in group, including chemistry-missing rows. |
| `Fe_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `Fe_censored_n` | Count withleft-censoredconcentration/derivedinterval. |
| `Fe_p25_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Fe_p25_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Fe_p25_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Fe_median_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Fe_median_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Fe_median_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Fe_p75_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Fe_p75_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Fe_p75_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Fe_min_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Fe_max_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `Ca_censored_n` | Count withleft-censoredconcentration/derivedinterval. |
| `Ca_p25_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_p25_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_p25_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_median_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_median_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_median_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_p75_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_p75_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_p75_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_min_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Ca_max_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `Mg_censored_n` | Count withleft-censoredconcentration/derivedinterval. |
| `Mg_p25_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_p25_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_p25_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_median_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_median_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_median_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_p75_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_p75_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_p75_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_min_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `Mg_max_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `hardness_censored_n` | Count withleft-censoredconcentration/derivedinterval. |
| `hardness_p25_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_p25_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_p25_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_median_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_median_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_median_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_p75_lower` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_p75_upper` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_p75_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_min_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `hardness_max_exact` | Group quantile/range statistic;mg/L,hardness asCaCO3. Lower/upper interval quantiles;exactonlywhenboundsagree. min/max_exact excludescensored values. |
| `iron_gt_0_3_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `iron_gt_0_3_denominator` | Nonmissing/determinate observations for this exact threshold;do notreplacewithn_wells. |
| `iron_gt_0_3_unknown` | Missing/ambiguous records for exact threshold;unknownisnotnegative. |
| `iron_gt_0_3_sample_pct` | 100×thresholdcount/determinate denominator; historical sampled wells,notpopulation prevalence. |
| `iron_gt_1_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `iron_gt_1_denominator` | Nonmissing/determinate observations for this exact threshold;do notreplacewithn_wells. |
| `iron_gt_1_unknown` | Missing/ambiguous records for exact threshold;unknownisnotnegative. |
| `iron_gt_1_sample_pct` | 100×thresholdcount/determinate denominator; historical sampled wells,notpopulation prevalence. |
| `iron_gt_3_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `iron_gt_3_denominator` | Nonmissing/determinate observations for this exact threshold;do notreplacewithn_wells. |
| `iron_gt_3_unknown` | Missing/ambiguous records for exact threshold;unknownisnotnegative. |
| `iron_gt_3_sample_pct` | 100×thresholdcount/determinate denominator; historical sampled wells,notpopulation prevalence. |
| `hardness_gt_120_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `hardness_gt_120_denominator` | Nonmissing/determinate observations for this exact threshold;do notreplacewithn_wells. |
| `hardness_gt_120_unknown` | Missing/ambiguous records for exact threshold;unknownisnotnegative. |
| `hardness_gt_120_sample_pct` | 100×thresholdcount/determinate denominator; historical sampled wells,notpopulation prevalence. |
| `hardness_gt_180_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `hardness_gt_180_denominator` | Nonmissing/determinate observations for this exact threshold;do notreplacewithn_wells. |
| `hardness_gt_180_unknown` | Missing/ambiguous records for exact threshold;unknownisnotnegative. |
| `hardness_gt_180_sample_pct` | 100×thresholdcount/determinate denominator; historical sampled wells,notpopulation prevalence. |
| `iron_gt_0_3_OR_hardness_gt_120_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `iron_gt_0_3_OR_hardness_gt_120_denominator` | Nonmissing/determinate observations for this exact threshold;do notreplacewithn_wells. |
| `iron_gt_0_3_OR_hardness_gt_120_sample_pct` | 100×thresholdcount/determinate denominator; historical sampled wells,notpopulation prevalence. |
| `iron_gt_1_AND_hardness_le_120_n` | Valid/threshold observation count,asdefinedbyfieldprefix;notnationalpeople. |
| `iron_gt_1_AND_hardness_le_120_denominator` | Nonmissing/determinate observations for this exact threshold;do notreplacewithn_wells. |
| `iron_gt_1_AND_hardness_le_120_sample_pct` | 100×thresholdcount/determinate denominator; historical sampled wells,notpopulation prevalence. |
| `soft` | Count at hardness≤60mg/L asCaCO3. |
| `moderately_hard` | Count at60<hardness≤120mg/L asCaCO3. |
| `hard` | Count at120<hardness≤180mg/L asCaCO3. |
| `very_hard` | Count at hardness>180mg/L asCaCO3. |
| `missing` | Count lacking sufficient paired chemistry. |
| `ambiguous_censored` | Count whose interval straddles a classification boundary. |

## `dhaka_2025_published_location_values.csv`

**Grain:** One selected tap location as reported in a2025 conference paper; collection date unspecified. **Rows:** 13. [Download](analysis/dhaka_2025_published_location_values.csv).

| Field | Meaning, unit and missing rule |
|---|---|
| `location` | Text/provenance descriptor exactly as archived/transcribed; do not infer additional measurements. |
| `reported_hardness_mg_L_CaCO3` | Reported chemistry concentration,mg/L;hardness asCaCO3;blanknotreported. |
| `reported_chloride_mg_L` | Reported chemistry concentration,mg/L;hardness asCaCO3;blanknotreported. |
| `source_id` | Original-sourceidentifier/URL/localfile orclaimlocator;retainattribution;semicolonjoinsmultipleIDs. |
| `measurement_date` | Text/provenance descriptor exactly as archived/transcribed; do not infer additional measurements. |
| `publication` | Text/provenance descriptor exactly as archived/transcribed; do not infer additional measurements. |
| `source_pdf_page` | 1-based PDF page/table locator; HTML locators are labelled. |
| `analysis_note` | Limitations/qualitynotes orspecificunmetverificationrequest;notanobservedresult. |

## `published_survey_aggregates.csv`

**Grain:** One original study variable/category aggregate; not a respondent. **Rows:** 35. [Download](analysis/published_survey_aggregates.csv).

| Field | Meaning, unit and missing rule |
|---|---|
| `source_id` | Original-sourceidentifier/URL/localfile orclaimlocator;retainattribution;semicolonjoinsmultipleIDs. |
| `variable` | Original-study construct or extracted aggregate variable. |
| `category` | Original response category/choice factor, kept separate per variable. |
| `reported_count` | Published category count; blank for mean-only aggregate, never invented. |
| `denominator` | Original study/answered denominator; not automatic national population. |
| `reported_mean` | Original reported mean on the stated scale; not a percentage. |
| `reported_sd` | Original reported standard deviation; not standard error. |
| `source_pdf_page` | 1-based PDF page/table locator; HTML locators are labelled. |
| `scale` | Original response units/scale and prompting context. |
| `evidence_type` | Evidence/statusclassification; distinguishobserved,reported,proposed,conditionalandunresolved. |

## `retail_price_observations.csv`

**Grain:** One retailer/product/declared-volume listing observed9Oct2026; not a sale. **Rows:** 24. [Download](analysis/retail_price_observations.csv).

| Field | Meaning, unit and missing rule |
|---|---|
| `retailer` | Text/provenance descriptor exactly as archived/transcribed; do not infer additional measurements. |
| `product` | Text/provenance descriptor exactly as archived/transcribed; do not infer additional measurements. |
| `declared_size` | Text/provenance descriptor exactly as archived/transcribed; do not infer additional measurements. |
| `volume_ml` | Declared comparable listing volume,ml;12×5.25=63; not measured density/mass. |
| `observed_sale_price_BDT` | Displayed online offer inBDT; delivery/checkout/landed quote unverified. |
| `price_per_100ml_BDT` | Observed offer÷declaredvolume×100, BDT/100ml. |
| `source_url` | Original-sourceidentifier/URL/localfile orclaimlocator;retainattribution;semicolonjoinsmultipleIDs. |
| `source_file` | Original-sourceidentifier/URL/localfile orclaimlocator;retainattribution;semicolonjoinsmultipleIDs. |
| `source_id` | Original-sourceidentifier/URL/localfile orclaimlocator;retainattribution;semicolonjoinsmultipleIDs. |
| `accessed_date` | Localaccessdate9Oct2026;notdateofmeasurement/publication. |
| `availability` | Text/provenance descriptor exactly as archived/transcribed; do not infer additional measurements. |
| `observation_method` | Text/provenance descriptor exactly as archived/transcribed; do not infer additional measurements. |
| `notes` | Limitations/qualitynotes orspecificunmetverificationrequest;notanobservedresult. |

## `user_supplied_opinions.csv`

**Grain:** One user-supplied real-adult summary; date/consent/order pending; no finished-product trial. **Rows:** 5. [Download](analysis/user_supplied_opinions.csv).

| Field | Meaning, unit and missing rule |
|---|---|
| `record_id` | Text/provenance descriptor exactly as archived/transcribed; do not infer additional measurements. |
| `age` | Text/provenance descriptor exactly as archived/transcribed; do not infer additional measurements. |
| `gender` | Text/provenance descriptor exactly as archived/transcribed; do not infer additional measurements. |
| `city` | Text/provenance descriptor exactly as archived/transcribed; do not infer additional measurements. |
| `current_product_selfreported` | Supplied opinion value,notindependentlymeasured/retailverified;BDTforprice,mlforvolume. |
| `current_ml_selfreported` | Supplied opinion value,notindependentlymeasured/retailverified;BDTforprice,mlforvolume. |
| `current_price_BDT_selfreported` | Supplied opinion value,notindependentlymeasured/retailverified;BDTforprice,mlforvolume. |
| `current_price_per_100ml_BDT` | Derivedfromsuppliedrecalledpackprice/volume;BDT/100ml,notcurrentretailobservation. |
| `context_selfreported` | Supplied opinion value,notindependentlymeasured/retailverified;BDTforprice,mlforvolume. |
| `experience_selfreported` | Supplied opinion value,notindependentlymeasured/retailverified;BDTforprice,mlforvolume. |
| `strip_preference` | Text/provenance descriptor exactly as archived/transcribed; do not infer additional measurements. |
| `maximum_price_BDT_selfreported` | Supplied opinion value,notindependentlymeasured/retailverified;BDTforprice,mlforvolume. |
| `actual_water_test` | False for all supplied opinion notes; none has objective water testing. |
| `actual_product_trial` | False for all supplied opinions; WaterSmart not tested. |
| `source_id` | Original-sourceidentifier/URL/localfile orclaimlocator;retainattribution;semicolonjoinsmultipleIDs. |
| `authenticity` | User-confirmed real means the user attests to authenticity; not independent verification. |
| `collection_date` | Actual opinion collection date; blank pending, never substituted by access date. |
| `research_consent` | Anonymous research-use consent; blank pending; no names/contacts collected. |
| `price_order` | Whether price330was presented before open maximum price; blank pending. |
| `primary_analysis_eligible` | False while required research metadata are pending; no automatic import into logger. |
| `metadata_status` | Explicit completeness state, not consent inferred from provision of a summary. |
| `notes` | Limitations/qualitynotes orspecificunmetverificationrequest;notanobservedresult. |

## `marico_public_financial_benchmarks.csv`

**Grain:** One reported company-wide financial metric, FY26/balance31March2026; not an SKU cost. **Rows:** 15. [Download](analysis/marico_public_financial_benchmarks.csv).

| Field | Meaning, unit and missing rule |
|---|---|
| `metric` | Text/provenance descriptor exactly as archived/transcribed; do not infer additional measurements. |
| `value_BDT` | Reported company metric inBDT; divide10,000,000forTkcrore. |
| `period` | Text/provenance descriptor exactly as archived/transcribed; do not infer additional measurements. |
| `source_id` | Original-sourceidentifier/URL/localfile orclaimlocator;retainattribution;semicolonjoinsmultipleIDs. |
| `source_pdf_page` | 1-based PDF page/table locator; HTML locators are labelled. |
| `type` | Evidence/statusclassification; distinguishobserved,reported,proposed,conditionalandunresolved. |

## `finance_overlay_monthly_Tk_cr.csv`

**Grain:** One conditional scenario × NWC policy × project month, M0–M72; no observed sales. **Rows:** 730. [Download](analysis/finance_overlay_monthly_Tk_cr.csv).

| Field | Meaning, unit and missing rule |
|---|---|
| `scenario` | Named frozen-model fiscal/cost sensitivity; not an observed outcome. |
| `release` | with/without final NWC-release policy. Here text, not a monetary amount. |
| `m` | Project month integer:0CAPEX,1–12prelaunch,13–72national years. This field is not divided by10. |
| `label` | Human-readable project period; a label, not a measurement. |
| `rev` | Net revenue, Tk crore, conditional monthly model. |
| `ebitda` | Incremental EBITDA before fund, Tk crore. |
| `wppf` | Illustrative participation-fund cash/accrual allocation, Tk crore; actual dates/base pending. |
| `tax` | Illustrative positive-EBIT monthly tax cash, Tk crore; no loss relief. |
| `dnwc` | Month-to-month change in working capital, Tk crore; negative means release. |
| `nwc` | Exit operating NWC balance, Tk crore,12%annualizedmonthlyNR planning policy. |
| `pilot` | Precommercial cash allowance, Tk crore; no sales credited. |
| `release_cash` | Final NWC cash release, Tk crore; full release implies wind-down. |
| `cash` | Total project monthly cash flow, Tk crore including CAPEX/pilot/tax/fund/NWC. |
| `cumulative` | Cumulative project cash from M0, Tk crore; minimum gives peak funding. |

## `all_model_inputs_evidence_register.csv`

**Grain:** One frozen-model scalar, label/policy or added evidence gap; not one independent estimate. **Rows:** 104. [Download](analysis/all_model_inputs_evidence_register.csv).

| Field | Meaning, unit and missing rule |
|---|---|
| `input_id` | Nested original parameter path, or explicit missing/design gap. |
| `old_value` | Frozen planning value in original model units. Rates are fractions; internal cash values Tk million unless SKU Tk/unit or explicit quantity. |
| `status` | Evidence/statusclassification; distinguishobserved,reported,proposed,conditionalandunresolved. |
| `source_id` | Original-sourceidentifier/URL/localfile orclaimlocator;retainattribution;semicolonjoinsmultipleIDs. |
| `needed_evidence` | Limitations/qualitynotes orspecificunmetverificationrequest;notanobservedresult. |
| `owner` | Proposedverificationowner/priority;noappointment/commitmentimplied. |
| `priority` | Proposedverificationowner/priority;noappointment/commitmentimplied. |
| `usable_as_verified_fact` | Evidence eligibility, not an assertion that the original forecast value is observed. |

## `evidence_ledger.csv`

**Grain:** One curated claim/status/locator/limitation. **Rows:** 56. [Download](analysis/evidence_ledger.csv).

| Field | Meaning, unit and missing rule |
|---|---|
| `claim_id` | Text/provenance descriptor exactly as archived/transcribed; do not infer additional measurements. |
| `domain` | Text/provenance descriptor exactly as archived/transcribed; do not infer additional measurements. |
| `finding` | Text/provenance descriptor exactly as archived/transcribed; do not infer additional measurements. |
| `status` | Evidence/statusclassification; distinguishobserved,reported,proposed,conditionalandunresolved. |
| `source_ids` | Original-sourceidentifier/URL/localfile orclaimlocator;retainattribution;semicolonjoinsmultipleIDs. |
| `locator` | Original-sourceidentifier/URL/localfile orclaimlocator;retainattribution;semicolonjoinsmultipleIDs. |
| `measurement_or_publication_date` | Explicit date type; uncertain collection date remains uncertain. |
| `limits` | Limitations/qualitynotes orspecificunmetverificationrequest;notanobservedresult. |
| `accessed_local_date` | Localaccessdate9Oct2026;notdateofmeasurement/publication. |

## `source_index.csv`

**Grain:** One distinct retrieval-attempt ID; latest attempt, with history preserved in download manifest. **Rows:** 61. [Download](analysis/source_index.csv).

| Field | Meaning, unit and missing rule |
|---|---|
| `source_id` | Original-sourceidentifier/URL/localfile orclaimlocator;retainattribution;semicolonjoinsmultipleIDs. |
| `description` | Text/provenance descriptor exactly as archived/transcribed; do not infer additional measurements. |
| `url` | Original-sourceidentifier/URL/localfile orclaimlocator;retainattribution;semicolonjoinsmultipleIDs. |
| `local_file` | Relative retained raw response; absence forfailed downloads is explicit. |
| `retrieval_status` | downloaded/reused/failed/invalid_PDF_response_HTML. A failed ID may also have web-capture evidence. |
| `bytes` | Retained response byte size, not respondent/sample count. |
| `sha256` | SHA-256 of retained raw bytes; empty if nofile; not independent source authenticity. |
| `last_accessed_utc` | UTC retrieval timestamp; distinct from sample/publication date. |
| `attempts` | Number of download attempts forID; never number of independent sources. |
| `notes` | Limitations/qualitynotes orspecificunmetverificationrequest;notanobservedresult. |

## JSON and raw artifacts

`water_summary.json`: dataset dates/hash, total coverage, censoring method and sample statistics. `published_surveys_metadata.json`: original authors, population/method/limitations; no microdata. `science_primary_records.json`: seven original NLM records/abstracts. `user_opinions_metadata.json`: five notes,zero method-complete records. `retail_price_summary.json`: descriptive catalogue coverage. `marico_benchmark_calculations.json`: derived company ratios with limits. `finance_evidence_overlays.json`: assumptions, five scenarios,bothreleasepolicies,fullmonthly outputs and847assertions; internal model cash isTk million while metric fields ending`_cr` areTkcrore. `all_model_inputs_evidence_register.json`/`evidence_ledger.json`/`source_index.json` correspond to theCSVrecords.

`raw/` contains untouched public responses, extracted `.txt` derivatives, web captures and supplied private notes. PDF page locators are1-based. Extracted Bangla from the EPR gazette is garbled; the retained page images and visual-check record accompany key clauses. An invalid PDF response is explicitly marked. `baseline/` preserves originals; `baseline_manifest.json` and final artifact manifest allow integrity checks.
