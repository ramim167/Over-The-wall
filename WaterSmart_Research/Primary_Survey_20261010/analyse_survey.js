function analyseSurvey(data, metadata) {
 const norm=v=>String(v??"").normalize("NFKC").replace(/[\u200B-\u200F\uFEFF]/g,"").replace(/\s+/g," ").trim();
 const bnDigits="০১২৩৪৫৬৭৮৯";
 const number=v=>{let s=norm(v).replace(/[০-৯]/g,c=>String(bnDigits.indexOf(c)));if(s==="")return null; if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s))return null;const n=Number(s);return Number.isFinite(n)?n:null;};
 const stat=values=>{let a=values.slice().sort((a,b)=>a-b);let n=a.length;return {n,median:n?(n%2?a[(n-1)/2]:(a[n/2-1]+a[n/2])/2):null,mean:n?a.reduce((s,v)=>s+v,0)/n:null,min:n?a[0]:null,max:n?a[n-1]:null};};
 const metric=(count,base)=>({count,base,pct:base?100*count/base:null});
 const freq=(rows,q)=>{let f={};for(const r of rows){let v=norm(r.values[q]);f[v||"(missing)"]=(f[v||"(missing)"]||0)+1;}return f;};
 const isTop=v=>[norm("অবশ্যই কিনে দেখতাম"),norm("সম্ভবত কিনে দেখতাম")].includes(norm(v));
 const excluded=[], records=[], flags=[];
 const dated=[];
 for(let i=0;i<data.rows.length;i++){
  const values=data.rows[i].map(v=>String(v??""));
  const id=`WS-S${String(i+1).padStart(3,"0")}`;
  const row={record_id:id,csv_row_number:i+2,values};
  const tm=/^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/.exec(values[0]);
  row.timestamp_iso_naive=tm?`${tm[3]}-${tm[2]}-${tm[1]}T${tm[4]}:${tm[5]}:${tm[6]}`:null;
  if(tm)dated.push(row.timestamp_iso_naive);
  row.consent_yes=norm(values[1]).startsWith(norm("হ্যাঁ"));
  row.maximum_price_tk=number(values[20]);
  row.q21_reference_price_tk=metadata.historical_q21_price_tk;
  row.target_price_tk=metadata.requested_target_price_tk;
  row.q21_top2=isTop(values[21]);
  row.flags=[];
  if(!row.timestamp_iso_naive)row.flags.push("timestamp_format_unrecognized");
  if(!row.consent_yes) {excluded.push({record_id:id,reason:"Q1 not consent-yes",timestamp_raw:values[0],other_answered:values.slice(2).filter(v=>norm(v)!=="").length});continue;}
  if(/\btest\b|dummy|পরীক্ষামূলক/i.test(values[26]))row.flags.push("possible_test_response_review");
  for(const q of [7,8,20]){const raw=norm(values[q]),n=number(values[q]);if(raw!==""&&n===null)row.flags.push(`Q${q}_nonnumeric`);else if(n!==null&&(q===7?n<=0:n<0))row.flags.push(`Q${q}_invalid_numeric_range`);}
  for(const q of [17,18]){const n=number(values[q]);if(n===null||n<1||n>5||!Number.isInteger(n))row.flags.push(`Q${q}_scale_invalid`);}
  const singleNone={10:["কোনোটিই নয়"],15:["কোনোটিই নয়","খেয়াল করিনি বা জানি না"],16:["কোনো ব্যবস্থা নিইনি"]};
  for(const [q,labels] of Object.entries(singleNone)){let value=norm(values[Number(q)]);for(const label of labels){const l=norm(label);if(value.includes(l)&&value!==l)row.flags.push(`Q${q}_exclusive_none_with_other`);}}
  if(norm(values[13])===norm("না") && norm(values[14])!==norm("প্রযোজ্য নয়—পানি বদলায়নি"))row.flags.push("Q13_no_Q14_not_notapplicable");
  if(norm(values[13])===norm("হ্যাঁ") && norm(values[14])===norm("প্রযোজ্য নয়—পানি বদলায়নি"))row.flags.push("Q13_yes_Q14_notapplicable");
  if(row.q21_top2 && row.maximum_price_tk!==null && row.maximum_price_tk<metadata.historical_q21_price_tk)row.flags.push("top2_at_historical_price_above_stated_maximum");
  if(row.q21_top2 && row.maximum_price_tk!==null && row.maximum_price_tk<metadata.requested_target_price_tk)row.flags.push("top2_at_historical_price_but_maximum_below_target");
  for(const flag of row.flags)flags.push({record_id:id,flag});
  records.push(row);
 }
 const groupsByKey=(qStart,qEnd)=>{let groups={};for(const r of records){const key=JSON.stringify(r.values.slice(qStart,qEnd).map(norm));(groups[key]??=[]).push(r.record_id);}return Object.values(groups).filter(x=>x.length>1);};
 const exactDuplicates=groupsByKey(1,27), answerProfileDuplicates=groupsByKey(2,26);
 const validWTP=records.filter(r=>r.maximum_price_tk!==null&&r.maximum_price_tk>=0);
 const movers=records.filter(r=>norm(r.values[13])===norm("হ্যাঁ"));
 const moverValid=movers.filter(r=>[norm("আগের চেয়ে সমস্যা বেশি মনে হয়েছে"),norm("আগের চেয়ে সমস্যা কম মনে হয়েছে"),norm("তেমন পার্থক্য হয়নি"),norm("বুঝতে পারিনি")].includes(norm(r.values[14])));
 const worse=moverValid.filter(r=>norm(r.values[14])===norm("আগের চেয়ে সমস্যা বেশি মনে হয়েছে"));
 const causeEligible=records.filter(r=>norm(r.values[10])!=="" && norm(r.values[10])!==norm("কোনোটিই নয়"));
 const answeredCause=causeEligible.filter(r=>norm(r.values[11])!=="");
 const mentionsWater=r=>/পানি|পানিতে|ওয়াসা|ওয়াসা|\bwater\b|\bwasa\b|\biron\b|আয়রন|আয়রন|নলকূপ/i.test(norm(r.values[11]));
 const waterMentions=answeredCause.filter(mentionsWater);
 const problemCheckboxes=["চুল রুক্ষ বা শুষ্ক লাগা","চুলে জট পড়া","শ্যাম্পুতে কম ফেনা হওয়া","চুল ধোয়ার পরও জমাট বা অবশিষ্ট কিছু থাকার অনুভূতি","চুল ভেঙে যাওয়া","স্বাভাবিকের চেয়ে বেশি চুল পড়ছে বলে মনে হওয়া","খুশকি বা মাথার ত্বকে চুলকানি","কোনোটিই নয়"];
 const symptoms={};for(const label of problemCheckboxes){symptoms[label]=metric(records.filter(r=>norm(r.values[10]).includes(norm(label))).length,records.length);}
 const thresholds=[300,320,330,350,360,380,400,450];
 const wtpThresholds={};for(const price of thresholds)wtpThresholds[String(price)]=metric(validWTP.filter(r=>r.maximum_price_tk>=price).length,validWTP.length);
 const crossed={};
 for(const r of validWTP){const key=(r.maximum_price_tk>=metadata.requested_target_price_tk?"max_ge_target":"max_lt_target")+"__"+(r.q21_top2?"historical_top2":"historical_other");crossed[key]=(crossed[key]||0)+1;}
 const flagCounts={};for(const r of flags)flagCounts[r.flag]=(flagCounts[r.flag]||0)+1;
 const qComplete={};for(let q=1;q<=26;q++)qComplete["Q"+q]={answered:records.filter(r=>norm(r.values[q])!=="").length,missing:records.filter(r=>norm(r.values[q])==="").length};
 const summary={
  metadata,
  sample:{raw_submissions:data.rows.length,consent_yes_records:records.length,non_consent_excluded:excluded.length,method:"WhatsApp/friend-of-friend convenience/snowball sample, user reported",respondent_authenticity:"User-attested collection; not independently verified individual identities",synthetic_records:0,observed_timestamp_min:dated.sort()[0],observed_timestamp_max:dated.at(-1),timestamp_timezone:"Not encoded in export; times shown as written",timestamp_format:"dd/MM/yyyy HH:mm:ss consistent with declared October collection",daily_counts:freq(records.map(r=>({...r,values:[r.timestamp_iso_naive?.slice(0,10)]})),0)},
  profile:{age:freq(records,2),gender:freq(records,3),living_arrangement:freq(records,4),raw_location_labels:freq(records,5),water_source:freq(records,12),current_shampoo_users:records.filter(r=>norm(r.values[9])!==norm("শ্যাম্পু ব্যবহার করি না")).length},
  metrics:{
   water_changed:metric(movers.length,records.length),
   worse_after_water_change:metric(worse.length,moverValid.length),
   worse_after_water_change_determinate_base:metric(worse.length,moverValid.filter(r=>norm(r.values[14])!==norm("বুঝতে পারিনি")).length),
   symptoms,cause_answered:metric(answeredCause.length,causeEligible.length),
   open_cause_water_mentions:metric(waterMentions.length,answeredCause.length),
   water_mention_ids:waterMentions.map(r=>r.record_id),
   water_mention_caveat:"Water-related mention, including uncertainty; not a proven cause. 'Unprompted' status depends on original form order/title/presentation.",
   concept_appeal_top2_scale:metric(records.filter(r=>number(r.values[17])>=4).length,records.filter(r=>number(r.values[17])!==null).length),
   concept_distinctiveness_top2_scale:metric(records.filter(r=>number(r.values[18])>=4).length,records.filter(r=>number(r.values[18])!==null).length),
   unpriced_purchase_intent_top2:metric(records.filter(r=>isTop(r.values[19])).length,records.filter(r=>norm(r.values[19])!=="").length),
   historical_q21_purchase_intent_top2:metric(records.filter(r=>r.q21_top2).length,records.filter(r=>norm(r.values[21])!=="").length),
   historical_q21_reference_price_tk:metadata.historical_q21_price_tk,
   maximum_price:stat(validWTP.map(r=>r.maximum_price_tk)),
   maximum_price_missing:records.length-validWTP.length,
   wtp_thresholds:wtpThresholds,
   q22_format_choice_as_exported:freq(records,22),
   q23_feature_preference:freq(records,23),
   q24_option_choice_as_exported:freq(records,24),
   q24_price_interpretation:"Current option texts show A330/B360; old no-strip price not established. Choice counts can be described, historical price-specific interpretation withheld.",
   q25_purchase_concerns:freq(records,25),
   target_price_vs_historical_intent_crosstab:crossed
  },
  quality:{exact_answer_duplicates_excluding_timestamp:exactDuplicates,answer_profile_duplicates_Q2_Q25:answerProfileDuplicates,question_completeness:qComplete,flag_counts:flagCounts,flags_are_review_items_not_automatic_exclusions:true,non_consent_rows:excluded,price_specific_360_intent_records:0,reason:"User says earlier price was 400 and updated to 360 today; all raw timestamps are 3-9 Oct. Current export headers/labels do not establish historical exposure to 360."}
 };

 const cohortDefinitions={
  "All consenting":records,
  "Changed water in last 12 months":records.filter(r=>norm(r.values[13])===norm("হ্যাঁ")),
  "Student hostel/mess":records.filter(r=>norm(r.values[4])===norm("শিক্ষার্থী হিসেবে হোস্টেল বা মেসে থাকি")),
  "All hostel/mess/shared living":records.filter(r=>[norm("শিক্ষার্থী হিসেবে হোস্টেল বা মেসে থাকি"),norm("শিক্ষার্থী নই; মেস বা ভাগাভাগি বাসায় থাকি")].includes(norm(r.values[4])))
 };
 summary.cohorts={};
 for(const [name,rows] of Object.entries(cohortDefinitions)){
  const maximums=rows.map(r=>r.maximum_price_tk).filter(n=>n!==null&&n>=0);
  summary.cohorts[name]={n:rows.length,wtp_n:maximums.length,median:stat(maximums).median,stated_max_ge360:maximums.filter(n=>n>=metadata.requested_target_price_tk).length,historical400_top2:rows.filter(r=>r.q21_top2).length};
 }
 summary.requested_target360_analysis={
  target_price_tk:metadata.requested_target_price_tk,
  method:"Compare valid recorded Q20 maximum acceptable prices against the requested target; preserve Q21's declared historical400 reference.",
  numeric_maximum_price_answers:validWTP.length,
  stated_max_ge360:validWTP.filter(r=>r.maximum_price_tk>=metadata.requested_target_price_tk).length,
  pct:100*validWTP.filter(r=>r.maximum_price_tk>=metadata.requested_target_price_tk).length/validWTP.length,
  measured_q21_at360:false,no_inferred_sales_conversion:true
 };

 return {summary,records,flags,excluded};
}
globalThis.analyseWaterSmartSurvey = analyseSurvey;

