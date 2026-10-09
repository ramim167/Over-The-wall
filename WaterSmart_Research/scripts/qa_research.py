"""Independent integrity, provenance, chemistry and aggregate-denominator QA."""
from pathlib import Path
import collections,csv,datetime,hashlib,json,math,re,statistics
from decimal import Decimal
ROOT=Path(__file__).resolve().parents[1];A=ROOT/'analysis';checks=0
def check(condition,message):
    global checks
    checks+=1
    if not condition:raise AssertionError(message)
def read(name):return json.loads((A/name).read_text(encoding='utf-8'))
def rows(name):
    with (A/name).open(encoding='utf-8-sig',newline='') as f:return list(csv.DictReader(f))
source=read('source_index.json'); check(len(source)==61,'source IDs')
for s in source:
    if s['local_file']:
        p=ROOT/s['local_file'];check(p.exists(),s['source_id']+' file')
        check(hashlib.sha256(p.read_bytes()).hexdigest()==s['sha256'],s['source_id']+' SHA')
        if p.suffix=='.pdf' and s['retrieval_status']!='invalid_PDF_response_HTML':check(p.read_bytes().startswith(b'%PDF'),s['source_id']+' actual PDF')
check(collections.Counter(s['retrieval_status'] for s in source)=={'reused':10,'downloaded':39,'failed':11,'invalid_PDF_response_HTML':1},'status counts')
raw=ROOT/'raw/bgs_national_hydrochemical_raw.csv';summary=read('water_summary.json')
check(hashlib.sha256(raw.read_bytes()).hexdigest()==summary['raw_sha256'],'BGSrawSHA')
with raw.open(encoding='utf-8-sig',newline='') as f:lines=list(csv.reader(f))
head=next(i for i,x in enumerate(lines) if x and x[0]=='SAMPLE_ID');keys=lines[head]
original={x[0]:dict(zip(keys,x)) for x in lines[head+2:] if x and x[0]}
processed=rows('water_wells_processed.csv')
check(len(processed)==len(original)==3534,'well rows unique')
check({x['SAMPLE_ID'] for x in processed}==set(original),'sample IDs retained')
metals={'Fe':[],'Ca':[],'Mg':[]};hard=[];classes=collections.Counter();iron1hardlow=0;fe03=0
def exact(x):return None if not x.strip() or x.startswith(('<','>')) else Decimal(x)
for x in processed:
    r=original[x['SAMPLE_ID']]
    check(all(x[k]==r[k] for k in ('Fe','Ca','Mg','SAMPLE_DATE','DISTRICT','THANA')),'raw fields retained '+x['SAMPLE_ID'])
    for element in metals:
        t=r[element].strip()
        if t:
            metals[element].append(float(t.lstrip('<')))
            if t.startswith('<'):
                check(float(x[element+'_lower_mg_L'])==0,'leftcensorlower')
                check(float(x[element+'_upper_mg_L'])==float(t[1:]),'leftcensorupper')
                check(x[element+'_exact_mg_L']=='','censor not imputed')
    ca,mg,fe=exact(r['Ca']),exact(r['Mg']),exact(r['Fe'])
    if ca is not None and mg is not None:
        h=Decimal('2.497')*ca+Decimal('4.118')*mg
        check(math.isclose(float(h),float(x['hardness_exact_mg_L']),rel_tol=1e-12),'paired hardness '+x['SAMPLE_ID'])
        hard.append(float(h))
        band='soft' if h<=60 else 'moderately_hard' if h<=120 else 'hard' if h<=180 else 'very_hard'
        check(x['hardness_class']==band,'hardness band '+x['SAMPLE_ID']);classes[band]+=1
        if fe is not None and fe>1 and h<=120:iron1hardlow+=1
    else:classes[x['hardness_class']]+=1
    if fe is not None and fe>Decimal('.3'):fe03+=1
check(iron1hardlow==649,'Fehardnesscross-tab independent')
check(fe03==2293,'Fe.3threshold independent')
o=summary['overall'];check(statistics.median(metals['Fe'])==o['Fe_median_exact'],'Femedian independent')
# All 3,530 valid hardness records have determinable bands; the single censored case remains soft.
check(classes=={'soft':742,'moderately_hard':736,'hard':440,'very_hard':1612,'missing':4},'bandcounts')
for name,n in [('water_by_district.csv',61),('water_by_historical_thana.csv',433)]:
    groups=rows(name);check(len(groups)==n,'group coverage '+name);check(sum(int(x['n_wells']) for x in groups)==3534,'group sum')
    for g in groups:
        check(sum(int(g[k]) for k in ['soft','moderately_hard','hard','very_hard','missing','ambiguous_censored'])==int(g['n_wells']),'group classification sum')
        check(int(g['Fe_n'])<=int(g['n_wells']),'Fedenominator')
agg=rows('published_survey_aggregates.csv');check(len(agg)==35,'aggregate rows')
for source_id,var,total in [('CONSUMER_2022','reported_use_or_preference_brand',390),('CONSUMER_2022','reported_age_band',390),('CONSUMER_2022','reported_monthly_income',390),('CONSUMER_SALINITY_2025','perceived_salinity_caused_hair_loss_frequency',391)]:
    select=[x for x in agg if x['source_id']==source_id and x['variable']==var]
    check(sum(int(x['reported_count']) for x in select)==total,var+' sum')
check(all(not x['reported_count'] for x in agg if x['variable']=='shampoo_choice_factor'),'no reconstructed respondents')
retail=rows('retail_price_observations.csv');check(len(retail)==24,'retail rows')
check(len({(x['retailer'],x['product'],x['declared_size']) for x in retail})==24,'retaildedupe')
for x in retail:check(math.isclose(float(x['observed_sale_price_BDT'])/float(x['volume_ml'])*100,float(x['price_per_100ml_BDT']),rel_tol=1e-12),'retail normalization')
baby=[x for x in retail if x['retailer']=='Chaldal' and 'Baby' in x['product'] and float(x['volume_ml'])==100];check(len(baby)==1 and float(baby[0]['observed_sale_price_BDT'])==199,'saleprice not struckMRP')
dhaka=rows('dhaka_2025_published_location_values.csv');check(len(dhaka)==13,'Dhaka locations');check(sum(not x['reported_hardness_mg_L_CaCO3'] for x in dhaka)==1,'Kamlapurmissing')
opinions=rows('user_supplied_opinions.csv');check(len(opinions)==5,'five remainfive');check(all(x['authenticity']=='user_confirmed_real' and x['primary_analysis_eligible']=='False' and not x['research_consent'] for x in opinions),'metadata guards')
studies=read('published_surveys_metadata.json');check(studies[1]['authors'].startswith('Muhammad Zakaria;'),'originalauthors credited')
check(studies[1]['publication_date']=='2025-08-01','actual publication date')
finance=read('finance_evidence_overlays.json');check(finance['validation_assertions']==847,'fiscalassertionsrecorded')
fiscal=next(s for s in finance['scenarios'] if s['id']=='sd15_tax20_fund5');check(math.isclose(fiscal['metrics']['npv_without_recovery_cr'],-6.3242279059397,abs_tol=.000001),'fiscalNPV')
check(len(rows('finance_overlay_monthly_Tk_cr.csv'))==730,'cashrows')
baseline=(ROOT/'baseline/Naturale_WaterSmart_Idea.html').read_text(encoding='utf-8-sig');current=(ROOT.parent/'Naturale_WaterSmart_Idea.html').read_text(encoding='utf-8-sig')
pattern=r'/\* WATER SMART MODEL V3 START[\s\S]*?/\* WATER SMART MODEL V3 END \*/'
check(re.search(pattern,baseline).group()==re.search(pattern,current).group(),'legacy puremodel preserved')
base_logger=(ROOT/'baseline/WaterSmart_Field_Data_Plan.html').read_text(encoding='utf-8-sig');logger=(ROOT.parent/'WaterSmart_Field_Data_Plan.html').read_text(encoding='utf-8-sig')
check(base_logger[base_logger.index('<script>'):]==logger[logger.index('<script>'):],'logger/storage/mergecode preserved')
for name in ['WaterSmart_Research_Report.md','EXPERT_AND_HUMAN_VERIFICATION.md','METHODS_AND_EXCLUSIONS.md','DATA_DICTIONARY.md','WaterSmart_Research_Viewer.html']:
    check((ROOT/name).exists(),'deliverable '+name)
result={'date':'2026-10-09','status':'passed','assertions':checks,'scope':'Sourcehashes/PDFmagic,rawchemistry/pairedhardness/bands/denominators,aggregate/retailtranscription,metadataeligibility,conditionalfiscalresults,legacylogicpreservation. No lab/field/visual-browser validation implied.'}
(A/'qa_results.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
print('PASS',checks,'independent integrity/data assertions')
