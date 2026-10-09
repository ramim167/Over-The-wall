"""Build a full source index, scalar model-input inventory and dated benchmarks.
The model remains frozen: no unknown input is promoted to an empirical fact.
"""
from pathlib import Path
import csv,hashlib,json,collections
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'analysis'
def save(name,rows):
    keys=list(dict.fromkeys(k for r in rows for k in r))
    with (OUT/name).open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=keys);w.writeheader();w.writerows(rows)

manifest=[json.loads(line) for line in (ROOT/'download_manifest.jsonl').read_text(encoding='utf-8').splitlines() if line.strip()]
latest={};history=collections.defaultdict(list)
for row in manifest:latest[row['id']]=row;history[row['id']].append(row)
sources=[]
for ident,row in latest.items():
    p=ROOT/'raw'/row['filename'];status=row['status'];magic=p.read_bytes()[:20] if p.exists() else b''
    if status!='failed' and p.suffix.lower()=='.pdf' and not magic.startswith(b'%PDF'):status='invalid_PDF_response_HTML'
    sources.append(dict(source_id=ident,description=row['description'],url=row['url'],local_file='raw/'+row['filename'] if p.exists() else '',retrieval_status=status,bytes=p.stat().st_size if p.exists() else '',sha256=hashlib.sha256(p.read_bytes()).hexdigest() if p.exists() else '',last_accessed_utc=row['accessed_utc'],attempts=len(history[ident]),notes=row.get('error','') or ('Do not cite this file as a PDF; public URL returned HTML.' if status=='invalid_PDF_response_HTML' else 'Publication and measurement dates checked separately in report.')))
save('source_index.csv',sources)
(OUT/'source_index.json').write_text(json.dumps(sources,indent=2),encoding='utf-8')

baseline=json.loads((ROOT/'baseline/WaterSmart_v3_Model_Output.json').read_text(encoding='utf-8-sig'))
inputs=[]
def flatten(obj,prefix):
    if isinstance(obj,dict):
        for key,value in obj.items():flatten(value,prefix+'.'+key)
    elif isinstance(obj,list):
        for i,value in enumerate(obj):flatten(value,prefix+'['+str(i)+']')
    else:
        status='UNVERIFIED_FORECAST_INPUT';source='';needed='Direct operational observation, approved driver or supplier quote';owner='Marico Finance / relevant function';priority='high'
        if isinstance(obj,str):status='MODEL_LABEL';needed='Channel name only; not a quantitative uncertainty';owner='Sales';priority='low'
        elif prefix.endswith('.release'):status='MODEL_TERMINAL_POLICY_CHOICE';needed='Full release describes a wind-down; do not claim it while continuing operations';owner='Finance';priority='critical'
        elif prefix.endswith('.vat'):status='PUBLIC_STANDARD_RATE_PROJECT_TREATMENT_PENDING';source='VAT_ACT';needed='Confirm invoice, taxable base and exemptions; v3 omits SD';owner='Marico Tax';priority='critical'
        elif prefix.endswith('.tax'):status='SUPERSEDED_BY_NEW_PUBLIC_BENCHMARK';source='MARICO_BD_FY26';needed='FY26 policy20%; v3 uses25%; future marginal cash tax/route remains to confirm';owner='Marico Tax';priority='critical'
        elif '.sku.' in prefix and (prefix.endswith('.mrp') or prefix.endswith('.ml')):status='PROPOSED_DESIGN_DECISION';source='Frozen team proposal';needed='WTP, pack specification and supply quote; choice is not validated demand';owner='Brand / Procurement'
        elif prefix.endswith('.commercialMonths') or prefix.endswith('.life'):status='MODEL_HORIZON_POLICY_CHOICE';needed='Approved appraisal life and accounting depreciation policy';owner='Finance'
        elif prefix.endswith('.hurdle'):status='UNCONFIRMED_COMPANY_INVESTMENT_POLICY';needed='Marico hurdle/WACC confirmation; public report does not disclose a15%new-SKUhurdle';owner='Finance';priority='critical'
        elif prefix.startswith('inputs.ch'):needed='SKU active outlet list; primary/secondary/tertiary sales per period; deduplicated WS reach';owner='Sales';priority='critical'
        elif '.cogs' in prefix.lower() or '.formulaCost' in prefix or '.otherCogs' in prefix:needed='Complete BOM, supplier assay/density/landed quotes, conversion/yield and QC allocations';owner='Procurement / Manufacturing';priority='critical'
        elif prefix.endswith('.nwc'):needed='SKU inventory days, receivable terms, payable terms and launch cash timing; company balance benchmark is not SKU proof';owner='Finance / Supply Chain'
        elif prefix.endswith('.eprPct'):needed='Measured full plastic BOM by category and approved recycler/PRO/admin quotation;1%NRis not legaltargetbase';owner='ESG / Finance';priority='critical'
        elif prefix.endswith('.capex') or prefix.endswith('.pilot') or prefix.endswith('.preMonths'):needed='Line/pack engineering quotation, R&D/certification scope and project timeline';owner='Manufacturing / Insights / Finance';priority='critical'
        inputs.append(dict(input_id=prefix,old_value=obj,status=status,source_id=source,needed_evidence=needed,owner=owner,priority=priority,usable_as_verified_fact=False))
flatten(baseline['inputs'],'inputs');flatten(baseline['controls'],'controls')
inputs.extend([
 dict(input_id='missing.domestic_SD',old_value='omitted',status='PUBLIC_RATE_VERIFIED_MODEL_OMISSION',source_id='VAT_SCHEDULES;VAT_ACT;NBR_VAT_FAQ',needed_evidence='15%local-supply shampoo SD in official schedule; confirm actual invoice basis and any specific exemption',owner='Tax / Finance',priority='critical',usable_as_verified_fact='Rate yes; project cash model conditional'),
 dict(input_id='missing.WPPF',old_value='omitted',status='PUBLIC_COMPANY_POLICY_VERIFIED_ALLOCATION_PENDING',source_id='MARICO_BD_FY26',needed_evidence='Company reports5%profit-before-fundpolicy; confirm incremental allocation, tax deductibility and payment timing',owner='Finance',priority='critical',usable_as_verified_fact='Policy yes; project cash timing no'),
 dict(input_id='demand.WaterSmart_repeat',old_value='pilot gate25%',status='PROPOSED_GATE_NOT_OBSERVED',source_id='Frozen team proposal',needed_evidence='Mature consenting buyer cohorts; paid transactions and attrition; imported reviews and intent are not paidrepeat',owner='Insights / Sales',priority='critical',usable_as_verified_fact=False),
 dict(input_id='pack.strip_life',old_value='18months target',status='UNVALIDATED_SPECIFICATION',source_id='STRIP_MN_91224',needed_evidence='Supplier MN product has12month shelf life at4–30C; source an18month qualified alternative or revisepacklife/storage',owner='Procurement / QA',priority='critical',usable_as_verified_fact=False),
 dict(input_id='pack.weights_dose',old_value='32g/22g/0.6g/9g;7ml',status='UNMEASURED_BOM_AND_USAGE',source_id='Frozen team proposal',needed_evidence='Weigh actual complete clean/dry pack components; measure dose; separate plastic vs total foil/paper mass',owner='Packaging / ESG',priority='high',usable_as_verified_fact=False),
 dict(input_id='market.SAM',old_value='unfilled',status='NOT_IDENTIFIABLE_FROM_CURRENT_EVIDENCE',source_id='BGS_NHS_CSV;BWDB_GROUNDWATER',needed_evidence='Current household/source exposure × eligible consumers × shampoo usage × relevant preference; no multiplication of well share by census without weights/linkage',owner='Insights / Finance',priority='critical',usable_as_verified_fact=False),
 dict(input_id='product.performance',old_value='mineral30%,foam80%,preference60% proposedgates',status='UNMADE_PRODUCT_UNTESTED',source_id='SCIENCE_PUBMED_XML;GLDA_MC;APG_INDORAMA',needed_evidence='Formula-specific deposit/lather/mildness/preservation/stability tests with protocol/comparator; literature cannot fill outcomes',owner='R&D / Regulatory',priority='critical',usable_as_verified_fact=False)
])
save('all_model_inputs_evidence_register.csv',inputs)
(OUT/'all_model_inputs_evidence_register.json').write_text(json.dumps(inputs,ensure_ascii=False,indent=2),encoding='utf-8')

figures={'Revenue':20711685779,'Cost_of_sales':10476751351,'Gross_profit':10234934428,'Marketing_selling_distribution':1079602461,'General_administration':1537123565,'WPPF':400048101,'Profit_before_tax':7600961447,'Income_tax_expense':1109173768,'Net_profit':6491787679,'Inventories':3531302998,'Trade_receivables':137481736,'Trade_payables':1144599505,'Customer_advances':152490101,'Royalty':197525631,'Technical_assistance_fees':103051709}
pages={'Revenue':'218;236','Cost_of_sales':'218;236','Gross_profit':'218','Marketing_selling_distribution':'218;237','General_administration':'218;237','WPPF':'218;235;238','Profit_before_tax':'218;239','Income_tax_expense':'218;238;241','Net_profit':'218;219','Inventories':'217;231','Trade_receivables':'230;244;245','Trade_payables':'234','Customer_advances':'235','Royalty':'237;240','Technical_assistance_fees':'237;240'}
financial=[dict(metric=k,value_BDT=v,period='FY2025-26 / balance31March2026',source_id='MARICO_BD_FY26',source_pdf_page=pages[k],type='Reported company total, not WaterSmart/SKU allocation') for k,v in figures.items()]
save('marico_public_financial_benchmarks.csv',financial)
metrics={'company_gross_margin':figures['Gross_profit']/figures['Revenue'],'company_MSD_pct_NR':figures['Marketing_selling_distribution']/figures['Revenue'],'reported_effective_tax':figures['Income_tax_expense']/figures['Profit_before_tax'],'simple_core_NWC_BDT':figures['Inventories']+figures['Trade_receivables']-figures['Trade_payables']-figures['Customer_advances']}
metrics['simple_core_NWC_pct_annual_NR']=metrics['simple_core_NWC_BDT']/figures['Revenue']
metrics['limitations']='Core NWC is a single company year-end balance including mixed categories; excludes other operating items; not a validated SKUworkingcapitalpolicy. ETR includes exemptions; not a marginal20%cash tax substitute.'
(OUT/'marico_benchmark_calculations.json').write_text(json.dumps(metrics,indent=2),encoding='utf-8')

dhaka=[('Tongi',126),('Jasim Uddin',45),('Abdullahpur',60),('Kuril',33),('Kochu Khet',90),('Rampura',150),('Mirpur',144),('Motijheel',51),('Kamlapur',None),('Amin Bazar',300),('Gabtoli',195),('Dhanmondi',105),('Mohammadpur',150)]
chloride=[74,46,64,42,110,40,100,44,52,234,216,54,120]
local=[dict(location=loc,reported_hardness_mg_L_CaCO3='' if hard is None else hard,reported_chloride_mg_L=chloride[i],source_id='DHAKA_WATER_2025',measurement_date='not stated in retrieved methods',publication='ICCEI2025,12–14Dec2025',source_pdf_page='4:Table2 and section3.2',analysis_note='Kamlapur hardness not numerically stated in prose, retained missing; no chart-value guess. Author labels sometimes conflict with USGS bands; use actualvalues. Single-location tap sample does not profile allhouseholds.') for i,(loc,hard) in enumerate(dhaka)]
save('dhaka_2025_published_location_values.csv',local)
print(json.dumps({'unique_source_attempts':len(sources),'retrieval_status_counts':dict(collections.Counter(r['retrieval_status'] for r in sources)),'registered_model_scalar_inputs_and_gaps':len(inputs),'marico_derived_benchmarks':metrics},indent=2))
