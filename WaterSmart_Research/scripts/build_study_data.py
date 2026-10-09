"""Transcribe published aggregate tables with source/page provenance.
Never reconstruct or fabricate respondent microdata from aggregates.
"""
from pathlib import Path
import csv,json,statistics,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'analysis'
rows=[]
def add(study,variable,category,n,denominator,mean='',sd='',page='',scale='',status='published_aggregate'):
    rows.append(dict(source_id=study,variable=variable,category=category,reported_count=n,denominator=denominator,reported_mean=mean,reported_sd=sd,source_pdf_page=page,scale=scale,evidence_type=status))
for name,mean,sd in [('Functionality/Advantages',4.2103,.8645),('Brand Image',4.1513,.9042),('Quality',4.1359,.8601),('Price',4.1282,.9668),('Advertisement/References',3.8949,1.1162),('Aroma',3.7077,1.0324),('Availability',3.6359,1.0807),('Packaging',3.4026,.9617),('Fashion and Status',3.2333,.9828)]:
    add('CONSUMER_2022','shampoo_choice_factor',name,'',390,mean,sd,11,'1–5 Likert')
brands=[('Sunsilk',74),('Dove',46),('Head & Shoulders',55),('Clinic Plus',92),('Pantene Pro V',58),('Clear',27),("L’Oreal Paris",23),('Other',15)]
for category,n in brands:add('CONSUMER_2022','reported_use_or_preference_brand',category,n,390,page=10)
assert sum(n for _,n in brands)==390
for category,n in [('Below20',13),('21–30',145),('31–40',122),('41–50',73),('51–60',31),('61+',6)]:add('CONSUMER_2022','reported_age_band',category,n,390,page=9)
for category,n in [('BelowTk20000',194),('Tk20000–30000',18),('Tk30000–40000',68),('Tk40000–50000',74),('AboveTk50000',36)]:add('CONSUMER_2022','reported_monthly_income',category,n,390,page=10)
counts=[('Never',33),('Rarely',52),('Sometimes',124),('Frequently',147),('Very frequently',35)]
for category,n in counts:add('CONSUMER_SALINITY_2025','perceived_salinity_caused_hair_loss_frequency',category,n,391,page='HTML Table2',scale='1–5 frequency; causal wording was prompted')
assert sum(n for _,n in counts)==391
for category,n in [('Mobile phone user',276),('Internet user',155)]:add('CONSUMER_SALINITY_2025','digital_access',category,n,391,page='HTML Table1')
with (OUT/'published_survey_aggregates.csv').open('w',encoding='utf-8-sig',newline='') as f:w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
studies=[dict(id='CONSUMER_2022',authors='Ummay Salma Khanam; Md. Bazlur Rahman',year=2022,title='Preference of Global Shampoo Brands: A Study on Women Consumers',url='https://doi.org/10.4236/jss.2022.1012016',population='390 women global-shampoo users in Dhaka and Chittagong',method='Convenience sample, anonymous online questionnaire; 500 invited,390 returned',license='CC BY4.0 stated in PDF',measurement_date='Not specifically stated in retrieved methods; publication11Nov2022',limitations=['Historical nonprobability sample, women only, urban/global-brand restriction','Methods age18–60 conflicts with six reported respondents61+; under20 band does not state individual age','No WaterSmart concept, price330, moving-water test, paid repeat or mineral measurements','Raw respondent microdata not supplied; no national sampling weights'],appropriate_use='Directional factor-ranking context; original authors credited; not national brand market share'),dict(id='CONSUMER_SALINITY_2025',authors='See archived Frontiers original article author list',year=2025,title='Perceptions of coastal dwellers about the effects of extreme temperature and saline water on human health: evidence from Bangladesh',url='https://doi.org/10.3389/fpubh.2025.1451933',population='391 consenting adults in Ramgati, Lakshmipur;286 men105 women',method='Cross-sectional convenience questionnaire;400 invited391completed',license='Open access; retain original article authors and publisher attribution',measurement_date='Not recovered from retrieved methods; publication2025 is not automatically survey date',limitations=['One locality, predominantly men, convenience sample','Perceived causal attribution, not objective measured salinity or clinical diagnosis','Question names water as cause; cannot support unprompted Movers attribution','Raw data available from authors on request, not acquired in this run','Sample-size paragraph says3%margin while givingd=.05; flag reporting inconsistency'],appropriate_use='Evidence that water-related hair concerns are reported in this sampled coastal community; not a WaterSmart efficacy claim')]
(OUT/'published_surveys_metadata.json').write_text(json.dumps(studies,ensure_ascii=False,indent=2),encoding='utf-8')
articles=[]
for entry in ET.parse(ROOT/'raw/hair_water_pubmed_records.xml').getroot().findall('PubmedArticle'):
    title=entry.find('.//ArticleTitle');pmid=entry.findtext('.//PMID');article=entry.find('.//Article')
    authors=[]
    for author in article.findall('.//Author'):
        authors.append(' '.join(filter(None,[author.findtext('ForeName'),author.findtext('LastName')])) or author.findtext('CollectiveName'))
    articles.append(dict(pmid=pmid,title=''.join(title.itertext()),authors=authors,source_url='https://pubmed.ncbi.nlm.nih.gov/'+pmid+'/',doi=[e.text for e in entry.findall('.//ArticleId') if e.attrib.get('IdType')=='doi'],abstract_sections=[dict(label=a.attrib.get('Label',''),text=''.join(a.itertext())) for a in article.findall('.//AbstractText')],source_id='SCIENCE_PUBMED_XML',evidence_type='author_reported_result; not independently replicated'))
(OUT/'science_primary_records.json').write_text(json.dumps(articles,ensure_ascii=False,indent=2),encoding='utf-8')
print('Saved',len(rows),'aggregate rows;',len(articles),'NLM study records; no new respondents')

# Five summaries are user-confirmed real, with research consent/date/order pending.
opinions=[('U01','Male',28,'Dhaka','Clear Men Anti-Dandruff',320,520,'move Sylhet→Dhaka','roughness; low lather; reported hair fall','with',380),('U02','Female',34,'Chattogram',"L’Oreal Paris Total Repair5",650,1050,'visits elsewhere in city','stiff/dry feel; low lather','without',350),('U03','Female',23,'Dhaka','OGX Argan Oil of Morocco',385,1250,'apartment move Mirpur→Dhanmondi','loss of shine; reported double dose','with',450),('U04','Male',40,'Narayanganj','Head & Shoulders Cool Menthol',180,290,'seasonal source change believed','itchy scalp; low lather','without',330),('U05','Female',29,'Khulna','Tresemme Keratin Smooth',580,850,'regional travel','feels softer elsewhere; less shampoo reported','with',380)]
user_rows=[]
for ident,gender,age,city,brand,ml,price,change,complaint,pref,wtp in opinions:
    user_rows.append(dict(record_id=ident,age=age,gender=gender,city=city,current_product_selfreported=brand,current_ml_selfreported=ml,current_price_BDT_selfreported=price,current_price_per_100ml_BDT=price/ml*100,context_selfreported=change,experience_selfreported=complaint,strip_preference=pref,maximum_price_BDT_selfreported=wtp,actual_water_test=False,actual_product_trial=False,source_id='USER_MESSAGE_20261009',authenticity='user_confirmed_real',collection_date='',research_consent='',price_order='',primary_analysis_eligible=False,metadata_status='pending_date_consent_price_order',notes='Paraphrased summaries; conditional concept price, not paid demand; no causal inference'))
with (OUT/'user_supplied_opinions.csv').open('w',encoding='utf-8-sig',newline='') as f:w=csv.DictWriter(f,fieldnames=list(user_rows[0]));w.writeheader();w.writerows(user_rows)
summary=dict(user_confirmed_summary_records=5,eligible_primary_records=0,metadata_status='pending_date_consent_price_order',with_strip_notes=3,without_strip_notes=2,maximum_prices_as_supplied=[x[-1] for x in opinions],median_as_supplied=statistics.median(x[-1] for x in opinions),note='Descriptive summary of supplied notes only; not a representative survey estimate or price conversion rate. All five proposed maximum prices≥330; do not change true supplied values to avoid a100%statistic. No synthetic records created.')
(OUT/'user_opinions_metadata.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
