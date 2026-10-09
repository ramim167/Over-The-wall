// Read-only review of the submitted v4 model. Writes only into this audit folder.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../..');
const modelPath = path.join(root, 'Round2_Submission/finance/finance_v4.cjs');
const outputPath = path.join(root, 'Round2_Submission/finance/finance_v4_output.json');
const baselinePath = path.join(root, 'WaterSmart_Research/baseline/Naturale_WaterSmart_Idea.html');
const hash = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const inputs = [modelPath, outputPath, baselinePath];
const before = inputs.map(hash);
const interceptedWrites = [];
const readOnlyFs = {readFileSync: fs.readFileSync.bind(fs), writeFileSync: (p, s) => interceptedWrites.push({path:p, data:s})};
const context = {
  __dirname: path.dirname(modelPath),
  require: name => name === 'node:fs' ? readOnlyFs : require(name),
  console: {log: () => {}}
};
vm.createContext(context);
vm.runInContext(fs.readFileSync(modelPath, 'utf8') + '\n globalThis.__audit = {out,base,build,FISCAL,V4_INPUT,summary};', context, {timeout:10000});
const {out, base, build, FISCAL, V4_INPUT, summary} = context.__audit;
const stored = JSON.parse(fs.readFileSync(outputPath, 'utf8'));
const captured = JSON.parse(interceptedWrites.at(-1).data);
const mismatches = [];
let numericComparisons = 0;
function compare(a,b,key='') {
  if (key === 'generated') return;
  if (typeof a === 'number' && typeof b === 'number') {
    numericComparisons++;
    if (Math.abs(a-b) > 1e-9*Math.max(1,Math.abs(a),Math.abs(b))) mismatches.push({key,stored:a,recomputed:b});
  } else if (a && typeof a === 'object' && b && typeof b === 'object') {
    for(const k of new Set([...Object.keys(a),...Object.keys(b)])) compare(a[k],b[k],key ? `${key}.${k}` : k);
  } else if(a !== b) mismatches.push({key,stored:a,recomputed:b});
}
compare(stored,captured);
function npv(cf,annualRate) {
  const monthlyRate = Math.expm1(Math.log1p(annualRate)/12);
  return cf.reduce((total,cash,month) => total+cash/((1+monthlyRate)**month),0);
}
function annualIRR(cf) {
  let low=-0.9, high=1;
  while(npv(cf,high)>0 && high<1000) high*=2;
  if(npv(cf,low)*npv(cf,high)>0) return null;
  for(let i=0;i<160;i++) {const mid=(low+high)/2; if(npv(cf,mid)>0) low=mid; else high=mid;}
  return (low+high)/2;
}
function reconcile(release) {
  const run=base.run({...V4_INPUT,release});
  const errors=[];
  const assertClose=(name,a,b) => {if(Math.abs(a-b)>1e-8*Math.max(1,Math.abs(a),Math.abs(b)))errors.push({name,a,b});};
  let cumulative=0,peak=Infinity,peakMonth=0,payback=null,previousNWC=0;
  for(const row of run.M) {
    const beforeCash=cumulative;
    cumulative+=row.cash;
    assertClose(`M${row.m} cumulative`,cumulative,row.cumulative);
    assertClose(`M${row.m} cash vs cf`,row.cash,run.cf[row.m]);
    if(row.m>0) assertClose(`M${row.m} cash accounting`,row.cash,row.ebitda-(row.wppf||0)-row.tax-row.dnwc-row.pilot+row.release);
    if(row.year>=0) {
      assertClose(`M${row.m} NWC delta`,row.dnwc,row.nwc-previousNWC);
      assertClose(`M${row.m} EBITDA bridge`,row.ebitda,row.gp-row.ap-row.sd-row.epr-row.can);
      previousNWC=row.nwc;
    }
    if(cumulative<peak) {peak=cumulative;peakMonth=row.m;}
    if(payback===null && beforeCash<0 && cumulative>=0) payback=(row.m-1-beforeCash/row.cash)/12;
  }
  const annualChecks=['gross','rev','cogs','gp','ap','sd','epr','ebitdaSA','can','ebitda','tax','dnwc','fcf','litres'];
  for(let year=0;year<5;year++) {
    const rows=run.M.filter(r=>r.year===year);
    for(const key of annualChecks) assertClose(`Y${year+1} ${key}`,rows.reduce((s,r)=>s+r[key],0),run.Y[year][key]);
    const pl=stored.deck.pl[year];
    assertClose(`Y${year+1} net-profit cash bridge`,pl.net_profit+pl.da-pl.dnwc,pl.fcf);
  }
  const independentNPV=npv(run.cf,base.B.hurdle);
  const independentIRR=annualIRR(run.cf);
  assertClose('NPV',independentNPV,run.npv);
  assertClose('IRR',independentIRR,run.irr);
  assertClose('Peak cash',peak,run.peak);
  assertClose('Peak month',peakMonth,run.peakMonth);
  assertClose('Payback',payback,run.pb);
  const years=run.M.filter(r=>r.year>=0);
  assertClose('Final cash reconciles annual cash',run.cf.reduce((s,v)=>s+v,0),-base.B.capex-run.p.pilot+years.reduce((s,r)=>s+r.fcf+r.release,0));
  return {release,npv_cr:independentNPV/10,irr_annual:independentIRR,peak_funding_cr:-peak/10,peak_month:peakMonth,peak_label:run.M[peakMonth].label,payback_years_from_M0:payback,month_count:run.M.length,errors,run};
}
const withRecovery=reconcile(true), withoutRecovery=reconcile(false);
const bridge=[];
const changes=[B=>{B.sku.b340.mrp=360;},B=>{B.apPct=[0,.15,.12,.10,.10];},B=>{B.sdPct=.08;}];
for(let step=0;step<5;step++) {
  const model=build(FISCAL,B=>changes.slice(0,Math.min(step,3)).forEach(change=>change(B)));
  const result=summary(model,step===4?V4_INPUT:{});
  bridge.push({step,change:['Fiscal-corrected v3','Then 340ml MRP 330 to 360','Then Y2-Y5 A&P reductions','Then S&D 10% to 8%','Then Y1 A&P 6 Cr to 4.5 Cr'][step],npv_with_recovery_cr:result.npv_with_release_cr,npv_without_recovery_cr:result.npv_without_release_cr});
}
function findCOGSBreakEven() {
  let low=0,high=.08;
  for(let i=0;i<80;i++) {const mid=(low+high)/2; if(base.run({...V4_INPUT,cogs:mid,release:false}).npv>0) low=mid; else high=mid;}
  return (low+high)/2;
}
const y3=stored.base.years[2];
const derived={
  y3_washes_at_assumed_7ml:y3.litres_m*1e9/7,
  y3_user_equivalents_at_assumed_104_washes_per_year:y3.litres_m*1e9/7/104,
  y3_ap_plus_sd_pct_of_net_revenue:(y3.ap_cr+y3.sd_cr)/y3.net_revenue_cr*100,
  strip_cost_break_even_without_recovery_tk:base.costCeiling(V4_INPUT,false),
  uniform_cogs_increase_break_even_without_recovery_pct:findCOGSBreakEven()*100,
  first_three_years_340ml_units:stored.base.years.slice(0,3).reduce((s,y)=>s+y.units_340,0)
};
const csvColumns=['m','label','year','rev','cogs','gp','ap','sd','epr','can','ebitda','wppf','tax','dnwc','nwc','pilot','fcf','release','cash','cumulative'];
function csv(run) {
  return csvColumns.map(k=>k==='m'||k==='label'||k==='year'?k:`${k}_cr`).join(',')+'\n'+run.M.map(r=>csvColumns.map(k=>k==='label'?JSON.stringify(r[k]):k==='m'||k==='year'?r[k]:(r[k]||0)/10).join(',')).join('\n')+'\n';
}
fs.writeFileSync(path.join(__dirname,'v4_monthly_with_recovery_audit.csv'),csv(withRecovery.run));
fs.writeFileSync(path.join(__dirname,'v4_monthly_without_recovery_audit.csv'),csv(withoutRecovery.run));
delete withRecovery.run;delete withoutRecovery.run;
const report={
  status:'Arithmetic reconciliation only; inputs remain conditional proposal assumptions.',
  stored_output_numeric_comparisons:numericComparisons,stored_output_mismatches:mismatches,
  intercepted_model_writes:interceptedWrites.length,withRecovery,withoutRecovery,
  sequential_input_bridge_order_dependent:bridge,derived,
  worst_case_with_recovery_cr:stored.scenarios.worst.npv_with_release_cr,
  worst_case_without_recovery_cr:stored.scenarios.worst.npv_without_release_cr,
  source_files_unchanged:inputs.map((p,i)=>({path:path.relative(root,p),before_sha256:before[i],after_sha256:hash(p),unchanged:before[i]===hash(p)}))
};
fs.writeFileSync(path.join(__dirname,'finance_v4_independent_audit.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
if(mismatches.length || withRecovery.errors.length || withoutRecovery.errors.length || report.source_files_unchanged.some(x=>!x.unchanged)) process.exitCode=1;
