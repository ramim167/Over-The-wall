// Evidence corrections on the frozen v3 planning model. These are conditional
// calculations, not approved budgets, sales observations or future proven results.
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'baseline/Naturale_WaterSmart_Idea.html'),'utf8');
const source=html.match(/\/\* WATER SMART MODEL V3 START[\s\S]*?\/\* WATER SMART MODEL V3 END \*\//)[0];
function model(duty,tax,fund){
  let code=source;
  code=code.replace('var nr={},cg={};','B.duty='+duty+';B.tax='+tax+';B.fund='+fund+';var nr={},cg={};');
  code=code.replace('B.sku[k].mrp*pm/(1+B.vat)*(1-','B.sku[k].mrp*pm/(1+B.vat)/(1+B.duty)*(1-');
  code=code.replace('var tax=Math.max(0,eb-B.capex/B.life/12)*B.tax,nwc=', 'var wppf=Math.max(0,eb-B.capex/B.life/12)*B.fund;var tax=Math.max(0,eb-B.capex/B.life/12-wppf)*B.tax,nwc=');
  code=code.replace('var fcf=eb-tax-dnwc,','var fcf=eb-wppf-tax-dnwc,');
  code=code.replace('ebitda:eb,tax:tax,','ebitda:eb,wppf:wppf,tax:tax,');
  const ctx={};vm.createContext(ctx);vm.runInContext(code,ctx);return ctx.WaterSmartModel;
}
const scenarios=[
 {id:'historical_v3',title:'Frozen v3: SD omitted; historical illustration',duty:0,tax:.25,fund:0,input:{}},
 {id:'sd15_only',title:'SD15%, otherwise frozen v3',duty:.15,tax:.25,fund:0,input:{}},
 {id:'sd15_tax20',title:'SD15% + latest disclosed company tax20%',duty:.15,tax:.20,fund:0,input:{}},
 {id:'sd15_tax20_fund5',title:'SD15% + tax20% + positive incremental EBIT fund5%',duty:.15,tax:.20,fund:.05,input:{}},
 {id:'sd15_tax20_fund5_formula_minus25',title:'Same fiscal overlay; bulk-formula cost stress -25%',duty:.15,tax:.20,fund:.05,input:{formula:-.25}}
];
let checks=0;const eq=(a,b)=>{checks++;if(Math.abs(a-b)>1e-7*Math.max(1,Math.abs(a),Math.abs(b)))throw Error('Mismatch '+a+' '+b);};
function independentNpv(r){return r.cf.reduce((s,c,i)=>s+c/Math.pow(1.15,i/12),0);}
const output=[];
for(const scenario of scenarios){
 const m=model(scenario.duty,scenario.tax,scenario.fund),both=m.both(scenario.input);
 const row={...scenario,metrics:{npv_with_recovery_cr:both[0].npv/10,npv_without_recovery_cr:both[1].npv/10,irr_with_recovery:both[0].irr,irr_without_recovery:both[1].irr,peak_funding_cr:-both[0].peak/10,peak_month:both[0].peakMonth,payback_years:both[0].pb,Y3_nr_cr:both[0].Y[2].rev/10,Y3_incremental_ebitda_cr:both[0].Y[2].ebitda/10,Y3_gross_margin:both[0].Y[2].gp/both[0].Y[2].rev},unit_nr:both[0].nr,strip_zero_npv_without_recovery:m.costCeiling(scenario.input,false),strip_zero_npv_with_recovery:m.costCeiling(scenario.input,true),with_recovery:both[0],without_recovery:both[1]};
 for(const result of both){
  eq(result.npv,independentNpv(result));eq(-result.peak,Math.max(...result.M.map(r=>-r.cumulative)));
  result.Y.forEach((y,i)=>{let rows=result.M.filter(r=>r.year===i);eq(y.rev,rows.reduce((s,r)=>s+r.rev,0));eq(y.fcf,rows.reduce((s,r)=>s+r.fcf,0));});
  result.M.slice(1).forEach((r,i)=>eq(r.cumulative,result.M[i].cumulative+r.cash));
 }
 eq(row.unit_nr.b340,330/(1.15*(1+scenario.duty))*.78);
 output.push(row);
 console.log(scenario.id,JSON.stringify(row.metrics));
}
eq(output[0].metrics.npv_with_recovery_cr,3.1483343098848375);
eq(output[0].metrics.npv_without_recovery_cr,.2642349024743618);
const fiscal=model(.15,.20,.05);
function breakEven(change){let lo=0,hi=.5;if(fiscal.run({...change,price:hi,release:false}).npv<0)return null;for(let i=0;i<60;i++){let mid=(lo+hi)/2;if(fiscal.run({...change,price:mid,release:false}).npv>=0)hi=mid;else lo=mid;}return (lo+hi)/2;}
const report={version:'Research overlay 2026-10-09',baseline_source_sha256:crypto.createHash('sha256').update(source).digest('hex'),status:'conditional appraisal; historical v3 is not fiscally complete',sources:{sd:'https://bdlaws.minlaw.gov.bd/act-1106.html',tax_fund:'https://marico.com/investorspdf/Annual_Report_2025-26.pdf',gross_to_net:'https://nbr.gov.bd/faq/vat-faq/ban'},method:'Company invoice assumed to equal VAT-exclusive MRP less old trade share, and to include SD. NR is invoice/(1+SD). MRP/volume unchanged. Fund overlay is 5% of positive monthly incremental EBIT before fund, tax20% after fund; no loss relief. Monthly accrual-as-cash timing is illustrative. Actual invoice basis, exemption, fund allocation/deductibility, tax/payment dates and factory route require Marico verification. Other costs, volumes, hurdle and NWC remain frozen v3 unverified inputs.',uniform_price_increase_zero_npv_without_recovery:breakEven({}),scenarios:output,validation_assertions:checks};
fs.writeFileSync(path.join(root,'analysis/finance_evidence_overlays.json'),JSON.stringify(report,null,2));
const fields=['scenario','release','m','label','rev','ebitda','wppf','tax','dnwc','nwc','pilot','release_cash','cash','cumulative'];
const csv=[fields.join(',')];for(const row of output)for(const [release,r] of [['with',row.with_recovery],['without',row.without_recovery]])for(const month of r.M){const v={...month,scenario:row.id,release,release_cash:month.release};csv.push(fields.map(k=>JSON.stringify(typeof v[k]==='number'&&!['m'].includes(k)?v[k]/10:v[k]??'')).join(','));}
fs.writeFileSync(path.join(root,'analysis/finance_overlay_monthly_Tk_cr.csv'),'\ufeff'+csv.join('\n'));
console.log('PASS',checks,'checks; uniform price break-even increase',report.uniform_price_increase_zero_npv_without_recovery);
