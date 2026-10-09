"""Normalize wording of the integration notices without changing data/model/storage code."""
from pathlib import Path
import json,re
ROOT=Path(__file__).resolve().parents[1];WORK=ROOT.parent
replacements={
 'Research correction ·9Oct2026.':'Research correction · 9 October 2026.',
 'Original v3 omitted local shampoo SD15%; its positiveNPV':'Original v3 omitted local shampoo SD 15%; its positive NPV',
 'The conditional SD15/tax20/fund5 illustration':'The conditional SD15 / tax20 / fund5 illustration',
 'NPV−3.82/−6.32Cr, funding12.20CrM37':'NPV −3.82 / −6.32 Cr, funding 12.20 Cr at M37',
 'with oldoperatinginputs heldfixed. Product,quote,invoice anddemandgates remainpending.':'with the old operating inputs held fixed. Product, quotation, invoice and demand gates remain pending.',
 '18-month life is unvalidated. Identified MN91224 has one-year life at4–30°C; a different qualified grade or revised packexpiry is needed':'18-month life is unvalidated. Identified MN91224 has one-year life at 4–30°C; a different qualified grade or revised pack expiry is needed',
 'Target strip+sleeveTk3–4 is unquoted; no strip-only costceiling repairs the conditional fiscal case. Oldv3return ceilings are withdrawn':'Target strip + sleeve Tk 3–4 is unquoted; no strip-only cost ceiling repairs the conditional fiscal case. Old v3 return ceilings are withdrawn',
 'Hach confirms individually wrappedhardness strips0–425mg/L and separateiron strips; price-on-requestisnot a quote. Bartovation offerscustomfoilpacks. MN91224specifiesone-yearlife at4–30°C. No Bangladeshlanded OEMquoteorcaptrialreceived.':'Hach confirms individually wrapped hardness strips 0–425mg/L and separate iron strips; price on request is not a quote. Bartovation offers custom foil packs. MN91224 specifies one-year life at 4–30°C. No Bangladesh landed OEM quote or cap trial received.',
 'ProposedTk330/340ml is17.19%more perml thanTk265/320ml. Arogga sale239/320ml is a separate comparison; affordability andWTP remainunvalidated.':'Proposed Tk 330/340ml is 17.19% more per ml than Tk 265/320ml. Arogga sale Tk 239/320ml is a separate comparison; affordability and WTP remain unvalidated.',
 'FY26 reports45%batch and25%sachetfilling improvements plus2newmachines(pp90–91). Formula,cap/insertion andcommittedcapacity stillrequire qualification.':'FY26 reports 45% batch and 25% sachet-filling improvements plus two new machines (pp90–91). Formula, cap/insertion and committed capacity still require qualification.',
 'ConditionalSD15/tax20/fund5Y3GM44.887%, belowproposed48%gate; quotedcosts andcorrectedNPV mustpass':'Conditional SD15/tax20/fund5 Y3 GM 44.887%, below the proposed 48% gate; quoted costs and corrected NPV must pass',
 'theoriginalEPRgazette is archived;targets arecategory-specificandmunicipalcollectionisexcluded. We budget1%NR provisionally;itdoesnotprovecompliance':'the original EPR gazette is archived; targets are category-specific and municipal collection is excluded. We budget 1% NR provisionally; it does not prove compliance',
 'Current conditional appraisal:</b> localSD15% verified inofficialschedule;latestcompanytax20%/fund5%disclosed. Invoice/tradebase,exemptions,fundallocation/deductibility,cashdates andallcost/volumedriversremainpending. Y3NR39.951Cr,incrementalEBITDA2.950Cr,GM44.887%.':'Current conditional appraisal:</b> local SD 15% verified in the official schedule; latest company tax 20% / fund 5% disclosed. Invoice/trade base, exemptions, fund allocation/deductibility, cash dates and all cost/volume drivers remain pending. Y3 NR 39.951 Cr, incremental EBITDA 2.950 Cr, GM 44.887%.',
 'Inspectmonthlydataandscenarios':'Inspect monthly data and scenarios',
 'NPVwithNWC releaseCr':'NPV with NWC release, Cr',
 'WithoutCr':'Without, Cr',
 'FundingCr/month':'Funding Cr / month',
 'Thefundiscalcaseisnegativeevenatzero stripcost. Formula−25%anduniformprice+14.104%arestresses,notquotesorWTP. FullNWC recoveryassumeswind-down.':'The fiscal case is negative even at zero strip cost. Formula −25% and uniform price +14.104% are sensitivities, not quotes or WTP. Full NWC recovery assumes a wind-down.',
 'OfficialSDschedule':'Official SD schedule',
 'MaricoFY26pp226–227':'Marico FY26 pp226–227',
 'Historical v3 interactive calculator ·SDomitted ·not currentinvestmentcase':'Historical v3 interactive calculator · SD omitted · not the current investment case',
 'Every calculator result below uses the oldfiscallyincompletev3formula. It is retainedforaudit/history;do not useitsNPV,stripceilingsorvideofiguresasinvestmentresults.':'Every calculator result below uses the old, fiscally incomplete v3 formula. It is retained for audit/history; do not use its NPV, strip ceilings or video figures as investment results.',
 'The finished formula is not yet tested. Ingredient choice alone doesnotprove daily-usemildness; qualifiedmildness,preservation,sensoryandstabilitystudies aremandatory gates.':'The finished formula is not yet tested. Ingredient choice alone does not prove daily-use mildness; qualified mildness, preservation, sensory and stability studies are mandatory gates.',
 'FinancialQ&amp;AnumbersgeneratedbelowbelongtothehistoricalSD-omittingcalculator. Currentconditionalfiscalresults areinSection10/researchviewer; oldfiguresarewithdrawn.':'Financial Q&amp;A numbers generated below belong to the historical SD-omitting calculator. Current conditional fiscal results are in Section 10/research viewer; old figures are withdrawn.',
 'Historical model: what if sales are20%lower?':'Historical model: what if sales are 20% lower?',
 'historical result withtheunconfirmed15%hurdle; currentfiscalcaseisnegative.':'historical result with the unconfirmed 15% hurdle; the current fiscal case is negative.',
 'unverified transfer/new-user assumption; Phase1 excludes LonaJol. Noobservedswitchingorpaidrepeatdata.':'unverified transfer/new-user assumption; Phase 1 excludes LonaJol. No observed switching or paid-repeat data.',
 'n=25 remainsplanned. Twoattributedpublishedsamples390/391 providecontext;5user-confirmedrealnotes havemetadata pending. No teamwatertestsorfinished-producttrials havebeencompleted/provided. Reportactualanswereddenominators; aqualifiedpilot isfuturevalidation.':'n=25 remains planned. Two attributed published samples, 390/391, provide context; five user-confirmed real notes have metadata pending. No team water tests or finished-product trials have been completed/provided. Report actual answered denominators; a qualified pilot is future validation.',
 'Theoldreturn-basedceilingiswithdrawn; underconditionalfiscalbase nostrip-onlycostfixpasses.':'The old return-based ceiling is withdrawn; under the conditional fiscal base, no strip-only cost fix passes.',
 'Use research-correctedconditionalnumberswithpendinginputs:NPV−3.82/−6.32Cr,funding12.20CrM37,Y3NR39.95Cr/EBITDA2.95Cr. Oldcalculator figuresbelowarehistorical.':'Use research-corrected conditional numbers with pending inputs: NPV −3.82/−6.32 Cr, funding 12.20 Cr at M37, Y3 NR 39.95 Cr / EBITDA 2.95 Cr. Calculator figures below are historical.',
 'These80/93scores predate the fiscal correction; they are not current readinessratings. No field/lab/quote gate has been markedpassed.':'These 80/93 scores predate the fiscal correction; they are not current readiness ratings. No field/lab/quote gate has been marked passed.',
 'OpenrealhistoricalPaniMaplookup;testcurrenthouseholdwaterseparately;noautomaticvariant/salt/safetyverdict':'Open the real historical Pani Map lookup; test current household water separately; no automatic variant/salt/safety verdict',
 'Keepmissingprimaryslotsblank;useattributedsecondarydataandcorrectedfiscaloverlay;obtainquotes/producttests':'Keep missing primary slots blank; use attributed secondary data and the corrected fiscal overlay; obtain quotes/product tests',
 'Actualdata status ·9Oct2026:':'Actual data status · 9 October 2026:',
 'no teamwater/foamtests,retailervisits,packweights orquotescompleted/provided. Fiveuser-confirmedrealopinionshaveconsent/date/orderpending. Publishedsamples390/391and3534historicalwellsremainsecondaryevidence,notloggerentries.':'no team water/foam tests, retailer visits, pack weights or quotes completed/provided. Five user-confirmed real opinions have consent/date/order pending. Published samples 390/391 and 3,534 historical wells remain secondary evidence, outside logger entries.',
 'Researchviewer/PaniMap':'Research viewer / Pani Map',
 'Verification/RFQquestions':'Verification / RFQ questions',
 'Fiscalcorrection:</b> oldv3omittedSD15%;conditionalfiscalNPV−3.82/−6.32Cr,funding12.20CrM37; useoverlaymethod,notlegacycalculatorfigures.':'Fiscal correction:</b> old v3 omitted SD 15%; conditional fiscal NPV −3.82/−6.32 Cr, funding 12.20 Cr at M37. Use the overlay method; legacy calculator figures are historical.',
 'Label publishedobservations "Secondaryevidence"withsource/date; label forecastinputs "Assumption"and sensitivityoutputs "Conditionalcalculation".':'Label published observations "Secondary evidence" with source/date; label forecast inputs "Assumption" and sensitivity outputs "Conditional calculation".',
 'SD15/tax20/fund5 illustration NPV−3.82/−6.32Cr, IRR2.36%/−12.96%. Full release is a wind-down, not operating terminal value.':'SD15/tax20/fund5 illustration NPV −3.82/−6.32 Cr, IRR 2.36%/−12.96%. Full release is a wind-down, not operating terminal value.',
 'Conditional fiscal case peak12.20Cr atM37; monthly schedule includes prelaunch. Old11.11/M25 is historical.':'Conditional fiscal case peak 12.20 Cr at M37; monthly schedule includes prelaunch. Old 11.11/M25 is historical.',
 'Target3–4Tk is unquoted. Fiscal case is negative even atzero stripcost; cost-only stripredesign does not repairtheproject. Requote/reappraise the wholeproposition.':'Target Tk 3–4 is unquoted. The fiscal case is negative even at zero strip cost; cost-only strip redesign does not repair the project. Requote/reappraise the whole proposition.',
 'Old20%transfer/45%lostcontribution are assumptions; no observed switching. Corrected Y3incrementalEBITDA2.95Cr beforefund, conditional on all frozen drivers.':'Old 20% transfer / 45% lost contribution are assumptions; no observed switching. Corrected Y3 incremental EBITDA 2.95 Cr before fund, conditional on all frozen drivers.',
 'Corrected conditional fiscal case: Y3NR39.95Cr, incrementalEBITDA2.95Cr;NPV−3.82/−6.32Cr;funding12.20CrM37. State pendinginvoice/quotes and reworkgate':'Corrected conditional fiscal case: Y3 NR 39.95 Cr, incremental EBITDA 2.95 Cr; NPV −3.82/−6.32 Cr; funding 12.20 Cr at M37. State pending invoice/quotes and rework gate',
 'Deck/video use the same conditional fiscal overlay: NPV−3.82/−6.32Cr, peak12.20CrM37, assumptionsandwind-downrelease stated; oldv3investmentconclusionwithdrawn.':'Deck/video use the same conditional fiscal overlay: NPV −3.82/−6.32 Cr, peak 12.20 Cr at M37; assumptions and wind-down release stated; old v3 investment conclusion withdrawn.',
 'SDomitted; not currentinvestmentcase. See fiscaloverlay/report':'SD omitted; not the current investment case. See fiscal overlay/report',
 'Household-linked current exposure and consumer/usage evidence forSAM; do not multiplyunweightedwellsharesbycensus.':'Household-linked current exposure and consumer/usage evidence for SAM; do not multiply unweighted well shares by census.',
 'Historical v3 atthisstage producedNPV3.15/0.26Cr andfunding11.11CrM25. Section17subsequentlyidentifiedSDomission andwithdrawstheseasinvestmentresults.':'Historical v3 at this stage produced NPV 3.15/0.26 Cr and funding 11.11 Cr at M25. Section 17 subsequently identified the SD omission and withdraws these as investment results.',
 'Historical omission-basedstripceiling4.78 is withdrawn bySection17; no strip-onlycostceilingrepairs the correctedconditionalcase.':'Historical omission-based strip ceiling 4.78 is withdrawn by Section 17; no strip-only cost ceiling repairs the corrected conditional case.',
 'Earlier master records8Octclarification15contentslides/≤20total; actualemail/screenshotnot supplied in thisresearchrun. Preserveit before relyingon exception':'Earlier master records 8 Oct clarification: 15 content slides / ≤20 total; actual email/screenshot not supplied in this research run. Preserve it before relying on the exception',
}
for p in [WORK/'OTW_S5_Master_Research.md',WORK/'Naturale_WaterSmart_Idea.html',WORK/'WaterSmart_Field_Data_Plan.html']:
    s=p.read_text(encoding='utf-8');model=re.search(r'/\* WATER SMART MODEL V3 START[\s\S]*?/\* WATER SMART MODEL V3 END \*/',s);pure=model.group() if model else None
    code=s[s.index('<script>'):] if p.name=='WaterSmart_Field_Data_Plan.html' else None
    for old,new in replacements.items():s=s.replace(old,new)
    assert not pure or pure==re.search(r'/\* WATER SMART MODEL V3 START[\s\S]*?/\* WATER SMART MODEL V3 END \*/',s).group()
    assert not code or code==s[s.index('<script>'):]
    p.write_text(s,encoding='utf-8')

p=WORK/'OTW_S5_Master_Research.md';s=p.read_text(encoding='utf-8')
fin=json.loads((ROOT/'analysis/finance_evidence_overlays.json').read_text())
rows='\n'.join(f"| {x['title']} | {x['metrics']['npv_with_recovery_cr']:.3f} | {x['metrics']['npv_without_recovery_cr']:.3f} | {x['metrics']['peak_funding_cr']:.3f} | M{x['metrics']['peak_month']} |" for x in fin['scenarios'])
section='''### 11.6 Research-corrected financial appraisal — conditional, not an approved forecast

**Withdraw old investment conclusions.** Original v3 omitted local-supply shampoo SD 15%; its NPV 3.15/0.26 Cr and Tk 4.78 strip ceiling are historical, fiscally incomplete calculations. The legacy HTML calculator and `WaterSmart_v3_Model_Output.json` are preserved with that warning. Current conditional calculations are in the [research viewer](WaterSmart_Research/WaterSmart_Research_Viewer.html) and [report](WaterSmart_Research/WaterSmart_Research_Report.md).

**Public rate/policy:** local shampoo HS 3305.10.00 SD 15%, standard VAT 15%; FY26 company tax provision 20% and participation fund 5% before fund. **Project application pending:** actual invoice/trade base, exemptions, future marginal tax, fund allocation/deductibility and cash payment dates. [Official act/schedules](https://bdlaws.minlaw.gov.bd/act-1106.html), [NBR waterfall](https://nbr.gov.bd/faq/vat-faq/ban), [FY26 pp226–227](https://marico.com/investorspdf/Annual_Report_2025-26.pdf).

**Conditional method:** `NR = MRP / (1+VAT) × (1−old trade share) / (1+SD)`, assuming the VAT-exclusive, trade-net invoice includes SD. Fund 5% of positive monthly incremental EBIT before fund; tax 20% after fund. Accrual-as-cash and no loss relief are illustrative. All operating inputs remain frozen and unverified. [Full driver register](WaterSmart_Research/analysis/all_model_inputs_evidence_register.csv).

| Case | NPV with final NWC release, Cr | Without release, Cr | Peak funding, Cr | Project month |
|---|---:|---:|---:|---:|
__ROWS__

**SD15/tax20/fund5 illustration:** Y3 NR 39.951 Cr, incremental EBITDA before fund 2.950 Cr, blended GM 44.887%; IRR 2.356% with release / −12.959% without, below the unconfirmed 15% hurdle. No strip-cost reduction alone repairs NPV. Bulk-formula −25% is an unquoted sensitivity. Uniform 14.103845% MRP uplift gives mathematical zero no-release NPV at unchanged volume; it is not WTP, elasticity or a price recommendation.

**Timing:** M0 CAPEX 3 Cr; 12 prelaunch months, with a 0.5 Cr unquoted allowance over the last six; national Y1 M13–24, first sales M16, five national years end M72. No pilot or LonaJol revenue credited. NWC is 12% of annualized monthly NR. Full final release describes a wind-down; no continuing terminal value. Internal field `sd` means selling/distribution, not supplementary duty.

**Cost assumptions retained for scrutiny:** MRP/pack Tk 3/6ml, 180/180ml, 330/340ml; COGS Tk 1.20/55/95; 340ml non-strip 92 + strip 3; bulk Tk 135/kg, density 1kg/L; trade 25% sachet/22% bottle; Y1 A&P 6 Cr; S&D 10% NR + 1 Cr/year; EPR 1% NR; cannibalization 20% × 45% displaced contribution. These are not supplier/Marico confirmations. Complete BOM, landed costs, incremental overheads and precommercial scope remain pending.

**Reproducibility:** [five cases/full monthly JSON](WaterSmart_Research/analysis/finance_evidence_overlays.json), [730 scenario-month CSV rows](WaterSmart_Research/analysis/finance_overlay_monthly_Tk_cr.csv); 847 assertions independently reconcile NPV, cash, peak, unit NR and annual/monthly sums. Quoted economics and qualified product/demand evidence precede a national investment recommendation.

**TAM/SAM:** publisher estimates retain date/uncertainty. Unweighted historical well shares cannot produce household SAM; company-wide footprint does not establish WaterSmart active coverage. Volume/channel ramps remain hypotheses.

'''.replace('__ROWS__',rows)
start=s.index('### 11.6 Research-corrected');end=s.index('### Six-month commercial pilot',start)
s=s[:start]+section+s[end:]
start=s.index('## 17. Detailed evidence research revision')
s=s[:start]+'''## 17. Detailed evidence research revision — 9 October 2026

**Current source hierarchy:** the attributed research report, ledger and fiscal overlay supersede earlier investment/coverage conclusions. Historical scores and old model outputs are not post-research readiness assessments.

| Deliverable | Location / status |
|---|---|
| Full synthesis | [Research report](WaterSmart_Research/WaterSmart_Research_Report.md) |
| Historical Pani Map, surveys, prices, finance, ledger | [Read-only viewer](WaterSmart_Research/WaterSmart_Research_Viewer.html) |
| Original evidence | [Source index](WaterSmart_Research/analysis/source_index.csv): 61 attempt IDs, 49 usable raw responses, 11 failed, one HTML response at a PDF URL; 25 web captures |
| Historical water | 3,534 well rows, 61 districts, 433 historical district/thana pairs; measured 1998–1999, valid Fe 3,530; hardness derived per paired Ca/Mg |
| Later water context | BWDB published Dec2022: 901 monitoring wells mostly2019–2021; Dhaka2025 paper: 13 selected taps, 12 explicit hardness numbers/one missing. Neither pooled into old microdata |
| Published consumer context | Two distinct samples, n390/n391; 35 aggregate rows. Original authors credited; no reconstructed respondent data |
| Primary data status | No team water/product tests, retailer visits, pack weights or quotes supplied/completed; five user-confirmed real adult notes have consent/date/order pending, zero method-complete primary records |
| Model evidence | [104 scalar entries/gaps](WaterSmart_Research/analysis/all_model_inputs_evidence_register.csv), including labels/policy choices; not 104 independent uncertainties |
| Required verification | [Human/expert/RFQ questions](WaterSmart_Research/EXPERT_AND_HUMAN_VERIFICATION.md). No outside messages sent |
| Resume | [Checkpoint](WaterSmart_Research/CHECKPOINT.md), [machine state](WaterSmart_Research/state.json) |

**Key corrections:** hardness strips cannot identify iron, salt or safety. 649 historical wells had Fe>1mg/L with hardness≤120. Local absence/novelty is unproven. Malibu Tk2,182 belongs to selected9fl oz, shipping/customs excluded; Pantene Tk1,450vs850 conflicts. Sealed/custom strip offerings exist, but the identified MN grade's one-year life at4–30°C does not meet the18-month target. Marico's FY26 batch/filling improvements establish platform fit, not spare capacity, cap qualification or quoted cost. Original EPR SRO293 was obtained: category-specific tonnage obligations; 1%NR is not compliance. BDS numerical limits and final DGDA transition remain unresolved.

**Financial correction:** SD15% was omitted. Frozen operating inputs with SD15/tax20/fund5 illustration give NPV−3.816/−6.324Cr, funding12.198CrM37 and Y3GM44.887%. Actual invoice/tax/fund application is pending. Formula−25% and price+14.104% are sensitivities, not quoted savings or proven WTP.

Published sources retain original collection credit; team credit is for analysis. No synthetic respondents. Completing secondary research does not prove the product, current household exposure, costs, paid repeat or future profit. Human metadata and physical/corporate gates remain open.
'''
s=s.replace('4. **Proven abroad, under-served here.** Dove Hard Water Defense (Gulf); US search trend. In Bangladesh, imported hard-water shampoos appear on cross-border and e-commerce listings at premium prices; our desk search found **no affordable local option** `[VALIDATE: shelf audit]`.', '4. **Existing category abroad; local value remains a question.** Dove and Malibu disclose chelators. Bangladesh import listings show options, not proven demand. Affordable local alternatives, actual stock and novelty require pack/shelf checks.')
s=re.sub(r'3\. \*\*Bangladesh water:\*\*[^\n]+', '3. **Bangladesh water:** independently analysed historical BGS/DPHE observations: 3,534 wells, valid chemistry3,530, Fe median1.1mg/L and derived hardness median153.87205mg/L asCaCO3. Later BWDB monitoring and selected Dhaka taps add context, not household prevalence. Ramgati salinity perceptions are a separate published convenience sample. See Section17/report for dates and denominators.',s,count=1)
s=s.replace('| Hardness screening / regional information | None on pack |', '| Hardness screening / regional information | Not shown on retrieved product page; current pack check pending |')
p.write_text(s,encoding='utf-8')
p=WORK/'Naturale_WaterSmart_Idea.html';s=p.read_text(encoding='utf-8')
s=re.sub(r'<div class="card"><div class="eyebrow">Bangladesh\'s water</div>[\s\S]*?</div>', '<div class="card"><div class="eyebrow">Bangladesh water</div><h3>Historical and local variation</h3><p>BGS/DPHE:3,534 wells sampled1998–1999;3,530 valid chemistry records. Team analysis finds Fe median1.1mg/L and Ca/Mg-derived hardness median153.87mg/L asCaCO3. BWDB2019–2021 monitoring and13 selected Dhaka taps add context; neither yields national household exposure or SAM. <a href="WaterSmart_Research/WaterSmart_Research_Viewer.html">Explore the dated records</a>.</p></div>',s,count=1)
s=re.sub(r'<div class="callout ok"><b>Proven abroad, under-served here:[\s\S]*?</div>', '<div class="callout info"><b>Existing category abroad; local value remains a question.</b> Dove Hard Water Defense and Malibu C disclose DisodiumEDTA; chelation is not a new mechanism. Imported listings show options, not verified Bangladesh demand or stock. Affordable local alternatives and a performance/value advantage still require pack, shelf and consumer checks.</div>',s,count=1)
s=re.sub(r'<p><b>Pani Map result card[\s\S]*?</p>', '<p><b>Populated historical Pani Map:</b> <a href="WaterSmart_Research/WaterSmart_Research_Viewer.html">61 districts /433 historical district-thana pairs</a>, with sampled-well n, Fe and derived-hardness medians/IQR, missingness/censoring and1998–1999 date. No current household diagnosis, salinity inference or automatic variant advice. No team test is fabricated.</p>',s,count=1)
s=s.replace('<td>None on pack</td>', '<td>Not shown on retrieved product page; current pack check pending</td>')
p.write_text(s,encoding='utf-8')
print('Integration notices polished; original model/logger logic preserved.')
