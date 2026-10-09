"""Integrate evidence corrections into existing project prose, preserving model/storage logic.
Reads current files, makes scoped asserted edits, and preserves prior originals in baseline.
"""
from pathlib import Path
import json,re,hashlib
ROOT=Path(__file__).resolve().parents[1];WORK=ROOT.parent
fin=json.loads((ROOT/'analysis/finance_evidence_overlays.json').read_text())
flag='RESEARCH_INTEGRATION_20261009'
report='WaterSmart_Research/WaterSmart_Research_Report.md'
viewer='WaterSmart_Research/WaterSmart_Research_Viewer.html'

def sub(text,old,new):
    assert old in text,old[:100]
    return text.replace(old,new,1)

def master():
    p=WORK/'OTW_S5_Master_Research.md';s=p.read_text(encoding='utf-8-sig')
    if flag in s:return
    s=sub(s,'## 0. How to use this file',f'''<!-- {flag} -->
> **Research revision, 9 Oct 2026:** Public secondary research is saved in [{report}]({report}). The earlier v3 investment conclusion is withdrawn: it omitted domestic shampoo SD15%. With original operating inputs held fixed, SD15/tax20/fund5 illustration gives NPV **−3.82 / −6.32 Cr**, peak funding **12.20 Cr at M37**. Actual invoice/tax/fund application remains pending. No product trial or team field test has been completed/provided. Five user-confirmed real opinion summaries have consent/date/price-order pending. See **Section 17**, the [viewer]({viewer}) and the full evidence register.

## 0. How to use this file''')
    s=sub(s,'(coherent monthly cash, costed pilot, neutral research and preserved logger data; see **Section 16.4**)', '(secondary research and fiscal omission corrected; see **Section 17**; legacy v3 calculation remains archived)')
    s=sub(s,'5. **Marico can make it.** Naturale brand + coconut milk protein + existing shampoo lines (Modify) + sachet GT reach. Export only after each market\'s registration.', '5. **Marico has a relevant platform.** Naturale, existing shampoo lines and GT/sachet infrastructure fit. FY26 documents batch/filling improvements; WaterSmart formula, cap/insertion and reserved capacity still need qualification. Export requires each market\'s registration.')
    s=re.sub(r'\*\*Pani Map result card — fill only from a supplied source:\*\*[^\n]+', f'**Pani Map is now populated from attributed historical data:** [read-only lookup]({viewer}) covers 61 districts and 433 historical district/thana pairs from 3,534 wells sampled 1998–1999. It shows Fe and paired Ca/Mg-derived hardness, n, missing/censored coverage and IQR. No current household diagnosis, salinity inference or automatic variant suggestion. A current home test remains separate; no team test is fabricated.',s,count=1)
    s=sub(s,'then "test your water", then a variant suggestion', 'then "test your own current source"; no automatic variant or household diagnosis')
    s=sub(s,'18-month life at relevant humid-market storage is a target, not established by three accelerated months', '18-month life remains a target. MN91224 specifies only one year at 4–30°C; that grade does not meet this target as specified. Accelerated screening alone does not establish life')
    s=sub(s,'Target strip+sleeve Tk 3–4 [ASSUMPTION]; judge bottle GM and project NPV separately. Tk 24.39 is not a project break-even limit', 'Target strip+sleeve Tk 3–4 is unquoted. Under the conditional SD15/tax20/fund5 case, no nonnegative strip-cost ceiling alone repairs project NPV; prior Tk 4.78 return gate is withdrawn')
    s=re.sub(r'Hach confirms individually wrapped[^\n]+', 'Hach confirms individually wrapped 0–425mg/L hardness strips; separate iron strips also exist. Catalogue dollar prices remain unverified and price-on-request is not a quotation. Bartovation offers custom foil packs; MN91224 has one-year life at4–30°C. No Bangladesh landed OEM quote has been received. [Hach](https://www.hach.com/p-total-water-hardness-test-strips-0-425-mgl-1000-tests-individually-wrapped-1000-tests/2793828), [Bartovation](https://bartovation.com/product/water-quality/custom-branded-water-hardness-test-strips/), [MN91224](https://www.mn-net.com/us/aquadur-4-21-for-water-hardness-individually-sealed-1000-strips-91224?c=7674)',s,count=1)
    s=sub(s,'Blended GM ~52% at baseline; obtain landed strip quote and test project NPV too', 'Conditional SD15/tax20/fund5 Y3 blended GM44.887%, below proposed48% gate; quoted economics and corrected project NPV must pass')
    start=s.index('### 11.6 Financial model v3');end=s.index('### Six-month commercial pilot',start)
    rows='\n'.join(f"| {x['title']} | {x['metrics']['npv_with_recovery_cr']:.3f} | {x['metrics']['npv_without_recovery_cr']:.3f} | {x['metrics']['peak_funding_cr']:.3f} | {x['metrics']['peak_month']} |" for x in fin['scenarios'])
    finance=f'''### 11.6 Research-corrected financial appraisal — conditional, not an approved forecast

**Withdraw old investment conclusions.** Original v3 arithmetic omitted local-supply shampoo SD15%; its NPV3.15/0.26Cr and strip ceiling4.78 are historical/fiscally incomplete. The legacy HTML model and `WaterSmart_v3_Model_Output.json` are preserved with this warning, not authoritative current investment results.

**Verified public rate/policy:** local shampoo HS3305.10.00 SD15%, standardVAT15%; FY26 company report tax provision20% and participation fund5% before fund. **Project application pending:** actual invoice/trade base, exemptions, future marginal tax, fund allocation/deductibility and cash payment dates. [Official act/schedules](https://bdlaws.minlaw.gov.bd/act-1106.html), [NBR waterfall](https://nbr.gov.bd/faq/vat-faq/ban), [FY26 pp226–227](https://marico.com/investorspdf/Annual_Report_2025-26.pdf).

**Conditional method:** `NR=MRP/(1+VAT)×(1−old trade share)/(1+SD)`, assuming the VAT-exclusive/trade-net invoice includesSD. Fund5% of positive monthly incrementalEBITbeforefund, tax20% afterfund; accrual-as-cash/no-loss-relief is illustrative. All operating volume/cost inputs remain frozen and unverified. See [full report]({report}) and [all104 scalar entries/gaps](WaterSmart_Research/analysis/all_model_inputs_evidence_register.csv).

| Case | NPV with final NWC release Cr | Without release Cr | Peak funding Cr | Project month |
|---|---:|---:|---:|---:|
{rows}

**SD15/tax20/fund5 illustration:** Y3NR39.951Cr, incrementalEBITDAbeforefund2.950Cr, blendedGM44.887%; IRR2.356%withrelease/−12.959%without, below unconfirmed15%hurdle. No strip-cost reduction alone makes NPV positive. Bulk-formula−25% is an unquoted sensitivity, not a procurement saving. Uniform14.103845%MRP uplift gives mathematical zero no-releaseNPV at unchanged volume, not provenWTP/elasticity or a price recommendation.

**Timing:** M0CAPEX3Cr;12prelaunchmonths with0.5Crunquoted allowance spread over last6months; nationalY1M13–24, firstsalesM16, five national years endM72. No pilot orLonaJol revenue credited. NWC12%annualizedmonthlyNR, full finalrelease describes a wind-down; no continuingterminalvalue. All originaltrade,COGS,AP,SD-distribution,cannibalization,hurdle/timing inputs need verification. Internal field`sd` means selling/distribution, not supplementaryduty.

**Cost assumptions retained for scrutiny:** MRP/pack3/6ml,180/180ml,330/340ml;COGS1.20/55/95Tk;340non-strip92+strip3;bulk135Tk/kg,density1kg/L;trade25%sachet/22%bottle;APY1 6Cr;S&D10%NR+1Cr/year;EPR1%NR;cannibalization20%×45%displacedcontribution. These are not supplier/Marico confirmations. Complete BOM/landedquotes, incremental overheads and precommercial scope remain pending.

**Reproducibility:** [fivecases/fullmonthlyJSON](WaterSmart_Research/analysis/finance_evidence_overlays.json), [730scenario-monthCSVrows](WaterSmart_Research/analysis/finance_overlay_monthly_Tk_cr.csv), [viewer]({viewer});847assertions independently reconcileNPV,cash,peak,unitNR and annualmonths. Do not make a national investment recommendation before quoted economics and qualified demand/product evidence.

**TAM/SAM:** publishermarketestimates retain years/uncertainty; historical well shares cannot generatehouseholdSAM. Companyportfoliofootprint is not WaterSmart activecoverage. Existingvolume/channelramps are planning hypotheses.

'''
    s=s[:start]+finance+s[end:]
    replacements={
    '- **Volume 20% lower?** NPV 0.43 / -1.88 crore with/without recovery. Combined downside -4.62 / -6.81; hold/rework the pilot.':'- **Sales lower?** Corrected conditional base is already negative; old omission-based downside figures are withdrawn. Rework quoted costs, tax and channel drivers before scale.',
    '- **Working-capital dependence?** Default NPV 3.15 / 0.26; IRR 24.4% / 16.0%. Full recovery assumes a wind-down; no continuing terminal value. No-recovery headroom is thin.':'- **Working-capital dependence?** SD15/tax20/fund5 illustration NPV−3.82/−6.32Cr, IRR2.36%/−12.96%. Full release is a wind-down, not operating terminal value.',
    '- **Funding and payback?** Tk 11.11 crore at M25, not just the 9.60 period-end need. 4.89 years from first CAPEX; 12-month prelaunch period is included.':'- **Funding?** Conditional fiscal case peak12.20Cr atM37; monthly schedule includes prelaunch. Old11.11/M25 is historical.',
    '- **Strip cost?** Tk 24.39 protects 48% bottle GM, not project returns. No-recovery NPV ceiling ~Tk 4.78 at default assumptions; target Tk 3–4 with landed quote. Redesigning strip availability requires a revised pack promise and fulfilment model.':'- **Strip cost?** Target3–4Tk is unquoted. Fiscal case is negative even atzero stripcost; cost-only stripredesign does not repairtheproject. Requote/reappraise the wholeproposition.',
    '- **Cannibalisation?** Y3 standalone EBITDA 10.98, incremental 6.85 after the assumed lost Naturale contribution.':'- **Cannibalisation?** Old20%transfer/45%lostcontribution are assumptions; no observed switching. Corrected Y3incrementalEBITDA2.95Cr beforefund, conditional on all frozen drivers.',
    '| 2:05–2:35 | Base assumptions: Y3 NR 45.94 Cr, incremental EBITDA 6.85 Cr; project NPV 3.15 / 0.26 Cr with/without recovery; funding 11.11 Cr. Horizon includes 12 prelaunch months |':'| 2:05–2:35 | Corrected conditional fiscal case: Y3NR39.95Cr, incrementalEBITDA2.95Cr;NPV−3.82/−6.32Cr;funding12.20CrM37. State pendinginvoice/quotes and reworkgate |',
    '- [ ] Deck, video and model use the same v3 settings: base NPV 3.15 / 0.26 Cr, peak 11.11 Cr M25; prelaunch time and NWC-recovery assumption stated.':'- [ ] Deck/video use the same conditional fiscal overlay: NPV−3.82/−6.32Cr, peak12.20CrM37, assumptionsandwind-downrelease stated; oldv3investmentconclusionwithdrawn.',
    '| `WaterSmart_v3_Model_Output.json` | Current default monthly model snapshot; inputs, all monthly rows, scenarios and strip sensitivity |':'| `WaterSmart_v3_Model_Output.json` | Historical v3 snapshot: SDomitted; not currentinvestmentcase. See fiscaloverlay/report |',
    '- SAM calculation from DPHE/BGS area shares × census × shampoo penetration.':'- Household-linked current exposure and consumer/usage evidence forSAM; do not multiplyunweightedwellsharesbycensus.',
    '- Current base NPV 3.15 / 0.26 Cr, annual equivalent IRR 24.4% / 16.0%, payback 4.89 years; monthly funding 11.11 Cr at M25. Old 4.17/0.85 pilot-only and 10.27/M20 estimates are superseded.':'- Historical v3 atthisstage producedNPV3.15/0.26Cr andfunding11.11CrM25. Section17subsequentlyidentifiedSDomission andwithdrawstheseasinvestmentresults.',
    '- Bottle-GM strip ceiling 24.39 differs from current no-recovery NPV ceiling 4.78; target Tk 3–4 pending landed quote.':'- Historical omission-basedstripceiling4.78 is withdrawn bySection17; no strip-onlycostceilingrepairs the correctedconditionalcase.',
    '| 20 | Emails / deck length | Couldn\'t verify emails | — | — | **FC limitation, not an error in v1** | We read the 8 Oct email (15 content slides; ≤20 total). Keep a screenshot |':'| 20 | Emails / deck length | Couldn\'t verify emails | — | — | **Current recheck unresolved** | Earlier master records8Octclarification15contentslides/≤20total; actualemail/screenshotnot supplied in thisresearchrun. Preserveit before relyingon exception |'
    }
    for old,new in replacements.items():s=sub(s,old,new)
    s+='''

## 17. Detailed evidence research revision — 9 October 2026

**Current source hierarchy:** the attributed research report, ledger and fiscal overlay supersede earlier investment/coverage conclusions. Original case/masterclass context is unchanged; historical ratings and old model outputs are not post-research readiness assessments.

| Deliverable | Location / status |
|---|---|
| Full research synthesis | [Report](WaterSmart_Research/WaterSmart_Research_Report.md) |
| Populated historical PaniMap, surveys, prices, fiscal overlays, ledger | [Read-only viewer](WaterSmart_Research/WaterSmart_Research_Viewer.html) |
| Original evidence and preserved downloads | [Source index](WaterSmart_Research/analysis/source_index.csv);61attemptIDs,49usable rawresponses,11failed,1HTMLnotPDF;25webcaptures |
| Water data |3534historicalwellrows,61districts,433historicalpairs; measured1998–99; Fevalid3530;hardness derivedperpairedCa/Mg |
| More recent water context |BWDBpublishedDec2022,901monitoringwellsmostly2019–21;Dhaka2025paper13selectedtaps,12explicitnumeric hardnessvalues/1missing;notpooled |
| Consumer context |2distinctpublishedsamples390/391,35aggregate rows; originalauthorscredited;no reconstructedmicrodata |
| Team/user data |0teamwatertests/producttrials/retailvisits/quotes;5user-confirmedrealadultnotes,consent/date/orderpending;0method-completeprimaryrecords |
| Model evidence |[104scalarentries/gaps](WaterSmart_Research/analysis/all_model_inputs_evidence_register.csv);includeslabels/policychoices,not104independentuncertainties |
| Required verification |[Exacthuman/expert/RFQquestions](WaterSmart_Research/EXPERT_AND_HUMAN_VERIFICATION.md);nooutsidemessages sent |
| Resume |[Checkpoint](WaterSmart_Research/CHECKPOINT.md),[state](WaterSmart_Research/state.json) |

**Key corrections:** hardnesstrips do notidentifyiron/salt/safety;649historicalwells hadFe>1whilehardness≤120. Localabsence/noveltynotproven. Malibu2182listing selected9fl oz/shippingcustomsexcluded;Pantene1450vs850conflictunresolved. Sealed/customstripofferings exist,butMNgrade12monthlife at4–30°Cdoesnotmeet18monthtarget. MaricoFY26confirmsrealbatch/fillingimprovements,butnotsparecapacity/capqualification/cost. EPRoriginalgazetteSRO293obtained:category-specifictonnageobligations;1%NRreserveisnotcompliance. BDSnumericalstandardlimits/finalDGDAtransitionremainunresolved.

**Financial correction:** localshampooSD15%wasomitted. Sameoperatinginputs withSD15/tax20/fund5illustration givesNPV−3.816/−6.324Cr,peak12.198CrM37,Y3GM44.887%;notapprovedinvoice/cash-taxpolicy. Formula−25%andprice+14.104%aresensitivities,notquotedcostorprovenWTP. Do notreplaceunknowncosts/saleswithmade-upfacts.

Published sources keep originalcollectioncredit;ouranalysiscreditedtotheteam. No syntheticrespondents. Publicsecondaryresearchcompletion doesnotmeanproduct,householdexposure,cost,paidrepeat orfutureprofitisproven. Metadata/physical/corporategates remainopen.
'''
    p.write_text(s,encoding='utf-8')

def idea():
    p=WORK/'Naturale_WaterSmart_Idea.html';s=p.read_text(encoding='utf-8-sig')
    if flag in s:return
    pure=re.search(r'/\* WATER SMART MODEL V3 START[\s\S]*?/\* WATER SMART MODEL V3 END \*/',s).group()
    notice=f'''<!-- {flag} --><div class="callout risk" id="researchRevision" role="note"><b>Research correction ·9Oct2026.</b> Original v3 omitted local shampoo SD15%; its positiveNPV is withdrawn as an investment conclusion. The conditional SD15/tax20/fund5 illustration gives <b>NPV−3.82/−6.32Cr, funding12.20CrM37</b> with oldoperatinginputs heldfixed. Product,quote,invoice anddemandgates remainpending. <a href="{viewer}">Open research/PaniMap viewer</a> · <a href="{report}">Full attributed report</a>.</div>'''
    s=sub(s,'<main class="wrap">','<main class="wrap">\n'+notice)
    s=sub(s,'v3 · coherent monthly cash + pilot gates · 9 Oct 2026', 'v3 · research revision / fiscal rework ·9Oct2026')
    s=sub(s,'our desk search found <b>no affordable local option</b> (to be confirmed by our shelf audit)', 'affordable local alternatives and shelf availability remain unverified by a physical audit')
    s=sub(s,'<h2>14. Scorecard (our rubric)</h2>', '<h2>14. Historical planning scorecard (our rubric)</h2><p class="callout warn">These80/93scores predate the fiscal correction; they are not current readinessratings. No field/lab/quote gate has been markedpassed.</p>')
    s=sub(s,'18-month life at relevant humid-market storage is a target, not established by three accelerated months', '18-month life is unvalidated. Identified MN91224 has one-year life at4–30°C; a different qualified grade or revised packexpiry is needed')
    s=sub(s,'Target strip+sleeve Tk 3–4 [ASSUMPTION]; judge bottle GM and project NPV separately. Tk 24.39 is not a project break-even limit', 'Target strip+sleeveTk3–4 is unquoted; no strip-only costceiling repairs the conditional fiscal case. Oldv3return ceilings are withdrawn')
    s=re.sub(r'<p>Hach confirms individually wrapped[\s\S]*?</p>', '<p>Hach confirms individually wrappedhardness strips0–425mg/L and separateiron strips; price-on-requestisnot a quote. Bartovation offerscustomfoilpacks. MN91224specifiesone-yearlife at4–30°C. No Bangladeshlanded OEMquoteorcaptrialreceived. <a href="https://bartovation.com/product/water-quality/custom-branded-water-hardness-test-strips/">Bartovation</a> · <a href="https://www.mn-net.com/us/aquadur-4-21-for-water-hardness-individually-sealed-1000-strips-91224?c=7674">MN91224</a></p>',s,count=1)
    s=sub(s,'WaterSmart 340ml at Tk 330 sits inside Naturale\'s own premium corridor.', 'ProposedTk330/340ml is17.19%more perml thanTk265/320ml. Arogga sale239/320ml is a separate comparison; affordability andWTP remainunvalidated.')
    s=sub(s,'WaterSmart modifies the formula and the cap.', 'FY26 reports45%batch and25%sachetfilling improvements plus2newmachines(pp90–91). Formula,cap/insertion andcommittedcapacity stillrequire qualification.')
    s=sub(s,'Blended gross margin ~52% at baseline assumptions; supplier quote and positive project NPV must both pass', 'ConditionalSD15/tax20/fund5Y3GM44.887%, belowproposed48%gate; quotedcosts andcorrectedNPV mustpass')
    s=sub(s,'we budget 1% of net revenue for EPR', 'theoriginalEPRgazette is archived;targets arecategory-specificandmunicipalcollectionisexcluded. We budget1%NR provisionally;itdoesnotprovecompliance')
    marker='<section id="money">';start=s.index(marker);heading_end=s.index('</h2>',start)+5
    fiscal_rows=''.join(f"<tr><td>{x['title']}</td><td class='num'>{x['metrics']['npv_with_recovery_cr']:.3f}</td><td class='num'>{x['metrics']['npv_without_recovery_cr']:.3f}</td><td class='num'>{x['metrics']['peak_funding_cr']:.3f} /M{x['metrics']['peak_month']}</td></tr>" for x in fin['scenarios'])
    current=f'''<div class="callout risk"><b>Current conditional appraisal:</b> localSD15% verified inofficialschedule;latestcompanytax20%/fund5%disclosed. Invoice/tradebase,exemptions,fundallocation/deductibility,cashdates andallcost/volumedriversremainpending. Y3NR39.951Cr,incrementalEBITDA2.950Cr,GM44.887%. <a href="{viewer}">Inspectmonthlydataandscenarios</a>.</div><div class="scroll"><table><thead><tr><th>Case</th><th>NPVwithNWC releaseCr</th><th>WithoutCr</th><th>FundingCr/month</th></tr></thead><tbody>{fiscal_rows}</tbody></table></div><p>Thefundiscalcaseisnegativeevenatzero stripcost. Formula−25%anduniformprice+14.104%arestresses,notquotesorWTP. FullNWC recoveryassumeswind-down. <a href="https://bdlaws.minlaw.gov.bd/act-1106.html">OfficialSDschedule</a> · <a href="https://marico.com/investorspdf/Annual_Report_2025-26.pdf">MaricoFY26pp226–227</a>.</p><details id="legacyModel"><summary>Historical v3 interactive calculator ·SDomitted ·not currentinvestmentcase</summary><p class="callout risk">Every calculator result below uses the oldfiscallyincompletev3formula. It is retainedforaudit/history;do not useitsNPV,stripceilingsorvideofiguresasinvestmentresults.</p>'''
    s=s[:heading_end]+current+s[heading_end:]
    close=s.index('<h3>Six-month commercial pilot',heading_end)
    s=s[:close]+'</details>'+s[close:]
    s=sub(s,'The rest comes from competitors and new coastal sachet users.', 'The remainder is an unverified transfer/new-user assumption; Phase1 excludes LonaJol. Noobservedswitchingorpaidrepeatdata.')
    s=sub(s,'That\'s why the formula uses a gentle chelator level plus coconut milk protein. Mildness and sensory tests are a launch gate in the FACTORY check.', 'The finished formula is not yet tested. Ingredient choice alone doesnotprove daily-usemildness; qualifiedmildness,preservation,sensoryandstabilitystudies aremandatory gates.')
    s=sub(s,'Planned n=25 in-depth interviews: directional qualitative evidence, triangulated with our own water measurements, published studies (mixed), national water-quality surveys and a global market signal (Dove, search trends). The pilot is the quantitative gate.', 'n=25 remainsplanned. Twoattributedpublishedsamples390/391 providecontext;5user-confirmedrealnotes havemetadata pending. No teamwatertestsorfinished-producttrials havebeencompleted/provided. Reportactualanswereddenominators; aqualifiedpilot isfuturevalidation.')
    s=sub(s,'<p id="videoFinance" class="callout info"></p>', '<p class="callout risk">Use research-correctedconditionalnumberswithpendinginputs:NPV−3.82/−6.32Cr,funding12.20CrM37,Y3NR39.95Cr/EBITDA2.95Cr. Oldcalculator figuresbelowarehistorical.</p><details><summary>Historical calculator video figures (withdrawn)</summary><p id="videoFinance" class="callout info"></p></details>')
    # Keep dynamic-ID elements intact; label their old-model financial answers explicitly.
    s=sub(s,'<details><summary>"What if sales are 20% lower?"', '<p class="callout risk">FinancialQ&amp;AnumbersgeneratedbelowbelongtothehistoricalSD-omittingcalculator. Currentconditionalfiscalresults areinSection10/researchviewer; oldfiguresarewithdrawn.</p><details><summary>"Historical model: what if sales are20%lower?"')
    s=sub(s,'selected result with the 15% hurdle.', 'historical result withtheunconfirmed15%hurdle; currentfiscalcaseisnegative.')
    s=sub(s,'Use the return-based cost ceiling above.', 'Theoldreturn-basedceilingiswithdrawn; underconditionalfiscalbase nostrip-onlycostfixpasses.')
    s=sub(s,'Pani Map prototype (select area → dated profile with uncertainty → "test your water" → variant)', 'OpenrealhistoricalPaniMaplookup;testcurrenthouseholdwaterseparately;noautomaticvariant/salt/safetyverdict')
    s=sub(s,'Fill every ▢; update model inputs from the audit', 'Keepmissingprimaryslotsblank;useattributedsecondarydataandcorrectedfiscaloverlay;obtainquotes/producttests')
    s=sub(s,'<!-- WATER SMART MODEL', '<!-- WATER SMART MODEL') if '<!-- WATER SMART MODEL' in s else s
    assert pure==re.search(r'/\* WATER SMART MODEL V3 START[\s\S]*?/\* WATER SMART MODEL V3 END \*/',s).group()
    p.write_text(s,encoding='utf-8')

def logger():
    p=WORK/'WaterSmart_Field_Data_Plan.html';s=p.read_text(encoding='utf-8-sig')
    if flag in s:return
    before=s[s.index('<script>'):]
    note=f'''<!-- {flag} --><div class="callout bad" id="secondaryResearchNotice"><b>Actualdata status ·9Oct2026:</b> no teamwater/foamtests,retailervisits,packweights orquotescompleted/provided. Fiveuser-confirmedrealopinionshaveconsent/date/orderpending. Publishedsamples390/391and3534historicalwellsremainsecondaryevidence,notloggerentries. <a href="{viewer}">Researchviewer/PaniMap</a> · <a href="{report}">Report</a> · <a href="WaterSmart_Research/EXPERT_AND_HUMAN_VERIFICATION.md">Verification/RFQquestions</a>.<br><b>Fiscalcorrection:</b> oldv3omittedSD15%;conditionalfiscalNPV−3.82/−6.32Cr,funding12.20CrM37; useoverlaymethod,notlegacycalculatorfigures.</div>'''
    s=sub(s,'<h2>Progress</h2>','<h2>Progress</h2>\n'+note)
    s=sub(s,'Label every non-field number "Assumption" in the deck.', 'Label publishedobservations "Secondaryevidence"withsource/date; label forecastinputs "Assumption"and sensitivityoutputs "Conditionalcalculation".')
    assert before==s[s.index('<script>'):], 'Logger code/storage changed'
    p.write_text(s,encoding='utf-8')

master();idea();logger()
p=WORK/'WaterSmart_v3_Model_Output.json';j=json.loads(p.read_text(encoding='utf-8-sig'))
j['research_revision_status']={'date':'2026-10-09','status':'Historical v3 snapshot; domestic shampoo SD omitted; investment conclusion withdrawn','current_conditional_analysis':'WaterSmart_Research/analysis/finance_evidence_overlays.json','report':report,'warning':'Original numerical outputs preserved, not approved current appraisal; tax/fund/invoice and operating inputs remain pending.'}
p.write_text(json.dumps({'research_revision_status':j['research_revision_status'],**j},ensure_ascii=False,indent=2),encoding='utf-8')
print('Researchintegrated:master,idea,loggerandhistoricalsnapshotstatus. Modelandloggerlogicpreserved.')
