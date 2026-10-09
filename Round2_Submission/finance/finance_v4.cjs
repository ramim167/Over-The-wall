// WaterSmart v4 business case. Reuses the team's v3 monthly model unchanged and
// applies (a) the fiscal correction (SD 15%, tax 20%, WPPF 5%) and (b) v4 proposal
// decisions benchmarked to observed prices and Marico's FY26 reported ratios.
// Values from the model are Tk million; outputs below are Tk crore (1 Cr = 10 M).
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..');
const html=fs.readFileSync(path.join(root,'WaterSmart_Research/baseline/Naturale_WaterSmart_Idea.html'),'utf8');
const source=html.match(/\/\* WATER SMART MODEL V3 START[\s\S]*?\/\* WATER SMART MODEL V3 END \*\//)[0];

function build(fiscal,overrides){
  let code=source;
  code=code.replace('var nr={},cg={};','B.duty='+fiscal.duty+';B.tax='+fiscal.tax+';B.fund='+fiscal.fund+';var nr={},cg={};');
  code=code.replace('B.sku[k].mrp*pm/(1+B.vat)*(1-','B.sku[k].mrp*pm/(1+B.vat)/(1+B.duty)*(1-');
  code=code.replace('var tax=Math.max(0,eb-B.capex/B.life/12)*B.tax,nwc=','var wppf=Math.max(0,eb-B.capex/B.life/12)*B.fund;var tax=Math.max(0,eb-B.capex/B.life/12-wppf)*B.tax,nwc=');
  code=code.replace('var fcf=eb-tax-dnwc,','var fcf=eb-wppf-tax-dnwc,');
  code=code.replace('ebitda:eb,tax:tax,','ebitda:eb,wppf:wppf,tax:tax,');
  const ctx={};vm.createContext(ctx);vm.runInContext(code,ctx);
  const m=ctx.WaterSmartModel;
  if(overrides)overrides(m.B);
  return m;
}
const FISCAL={duty:.15,tax:.20,fund:.05};
const v4=B=>{B.sku.b340.mrp=360;B.apPct=[0,.15,.12,.10,.10];B.sdPct=.08;};
const V4_INPUT={ap:45}; // Y1 launch A&P Tk 4.5 Cr: digital-first + campus activation (was Tk 6 Cr)

const cr=x=>x/10;
function summary(m,input){
  const [w,wo]=m.both(input||{});
  const years=w.Y.map((y,i)=>({year:i+1,units_sachet:y.u.sachet,units_180:y.u.b180,units_340:y.u.b340,
    gross_sales_cr:cr(y.gross),net_revenue_cr:cr(y.rev),cogs_cr:cr(y.cogs),gross_profit_cr:cr(y.gp),gm:y.gp/y.rev,
    ap_cr:cr(y.ap),sd_cr:cr(y.sd),epr_cr:cr(y.epr),ebitda_standalone_cr:cr(y.ebitdaSA),cannibalisation_cr:cr(y.can),
    ebitda_incremental_cr:cr(y.ebitda),ebitda_margin:y.ebitda/y.rev,tax_cr:cr(y.tax),dnwc_cr:cr(y.dnwc),fcf_cr:cr(y.fcf),litres_m:y.litres/1e6}));
  return {unit_nr:w.nr,unit_cogs:w.cg,npv_with_release_cr:cr(w.npv),npv_without_release_cr:cr(wo.npv),irr_with_release:w.irr,irr_without_release:wo.irr,
    peak_funding_cr:-cr(w.peak),peak_month:w.peakMonth,payback_years_from_M0:w.pb,payback_years_without_release:wo.pb,years};
}
const base=build(FISCAL,v4);
const out={
  generated:new Date().toISOString(),
  basis:'Team v3 monthly model (unchanged code) + fiscal correction SD15/tax20/WPPF5 + v4 proposal decisions',
  v4_changes:[
    {driver:'MRP 340ml + PaniCheck',v3:330,v4:360,evidence:'Chaldal 9 Oct 2026: Naturale Hijab Fresh 340ml Tk 390; Sunsilk 340ml Tk 350; Naturale core 320ml Tk 265. Five early conversations: stated max Tk 330-450 (median 380), directional only'},
    {driver:'A&P % NR, Y2-Y5',v3:'18/15/14/14%',v4:'15/12/10/10%',evidence:'Marico BD FY26 marketing+selling+distribution = 5.2% of revenue (annual report p218/237); v4 still ~2x company ratio. Y1 launch A&P Tk 6 Cr unchanged'},
    {driver:'Y1 launch A&P',v3:'Tk 6 Cr',v4:'Tk 4.5 Cr',evidence:'Digital-first launch to adult movers (students/young workers) with campus activation; mirrors Marico case example Parachute Advansed Secrets (influencer-led, socially curated)'},
    {driver:'Selling & distribution',v3:'10% NR + Tk 1 Cr/yr',v4:'8% NR + Tk 1 Cr/yr',evidence:'Incremental SKU on existing Naturale distributor routes; company MSD 5.2% of revenue'}
  ],
  unchanged:'Volumes/outlets/drop sizes, 180ml Tk 180, sachet Tk 3, COGS, trade margins 22/25%, VAT 15%, SD 15%, tax 20%, WPPF 5%, cannibalisation 20% x 45%, EPR 1% NR, NWC 12% NR, CAPEX Tk 3 Cr, pilot Tk 0.5 Cr, 12 prelaunch months, hurdle 15%',
  base:summary(base,V4_INPUT),
  reference_v3_with_fiscal_correction:summary(build(FISCAL)),
  scenarios:{}
};
// Finance-masterclass scenario grid.
const grid={worst:{vol:-.2,price:-.05,cogs:.08,delay:3},base:{},best:{vol:.15,price:.02,cogs:-.03}};
for(const [k,input0] of Object.entries(grid)){const input={...V4_INPUT,...input0};const s=summary(base,input);out.scenarios[k]={input,npv_with_release_cr:s.npv_with_release_cr,npv_without_release_cr:s.npv_without_release_cr,irr_without_release:s.irr_without_release,peak_funding_cr:s.peak_funding_cr,peak_month:s.peak_month,y3_nr_cr:s.years[2].net_revenue_cr,y3_ebitda_cr:s.years[2].ebitda_incremental_cr};}
// Single-driver sensitivities on the no-release NPV.
const sens={'volume -20%':{vol:-.2},'volume +15%':{vol:.15},'price -5%':{price:-.05},'COGS +8%':{cogs:.08},'launch delay 3m':{delay:3},'cannibalisation 30%':{cann:.30},'strip Tk 6 (vs 3)':{strip:6}};
out.sensitivity_npv_without_release_cr={};
for(const [k,input] of Object.entries(sens))out.sensitivity_npv_without_release_cr[k]=summary(base,{...V4_INPUT,...input}).npv_without_release_cr;
fs.writeFileSync(path.join(__dirname,'finance_v4_output.json'),JSON.stringify(out,null,2));
const b=out.base;
console.log('v4 base: NPV with/without release',b.npv_with_release_cr.toFixed(2),'/',b.npv_without_release_cr.toFixed(2),'Cr; IRR',(b.irr_with_release*100).toFixed(1)+'% /',(b.irr_without_release*100).toFixed(1)+'%; peak',b.peak_funding_cr.toFixed(2),'Cr @M'+b.peak_month,'; payback',b.payback_years_from_M0&&b.payback_years_from_M0.toFixed(2),'/',b.payback_years_without_release&&b.payback_years_without_release.toFixed(2));
b.years.forEach(y=>console.log('Y'+y.year,'NR',y.net_revenue_cr.toFixed(2),'GM',(y.gm*100).toFixed(1)+'%','EBITDA',y.ebitda_incremental_cr.toFixed(2),'('+(y.ebitda_margin*100).toFixed(1)+'%)','FCF',y.fcf_cr.toFixed(2)));
const r=out.reference_v3_with_fiscal_correction;console.log('check v3+fiscal NPV',r.npv_with_release_cr.toFixed(3),r.npv_without_release_cr.toFixed(3),'(expect -3.816/-6.324)');
console.log(JSON.stringify(out.scenarios,null,1));console.log(out.sensitivity_npv_without_release_cr);

// Deck tables: annual P&L to net profit and cash, from the monthly base-case rows.
{
  const run=base.run({...V4_INPUT,release:true});
  const life=base.B.life,capex=base.B.capex;
  const pl=run.Y.map((y,i)=>{
    const rows=run.M.filter(r=>r.year===i);
    const wppf=rows.reduce((s,r)=>s+(r.wppf||0),0),da=capex/life;
    const ebit=y.ebitda-da;
    return {year:i+1,gross:cr(y.gross),nr:cr(y.rev),cogs:cr(y.cogs),gp:cr(y.gp),gm:y.gp/y.rev,ap:cr(y.ap),sd:cr(y.sd),epr:cr(y.epr),
      ebitda_sa:cr(y.ebitdaSA),cann:cr(y.can),ebitda:cr(y.ebitda),ebitda_margin:y.ebitda/y.rev,da:cr(da),ebit:cr(ebit),wppf:cr(wppf),tax:cr(y.tax),
      net_profit:cr(ebit-wppf-y.tax),dnwc:cr(y.dnwc),fcf:cr(y.fcf),cum_cash_end:cr(rows[rows.length-1].cumulative),
      units:{sachet:y.u.sachet,b180:y.u.b180,b340:y.u.b340},nr_by_sku:{sachet:cr(y.u.sachet*run.nr.sachet/1e6),b180:cr(y.u.b180*run.nr.b180/1e6),b340:cr(y.u.b340*run.nr.b340/1e6)}};
  });
  const B=base.B,mrp=B.sku.b340.mrp,exVat=mrp/(1+B.vat),afterTrade=exVat*(1-B.tradeBottle),nr=afterTrade/(1+B.duty);
  const waterfall340={mrp,vat:mrp-exVat,trade:exVat-afterTrade,sd:afterTrade-nr,nr,cogs:run.cg.b340,gp:nr-run.cg.b340};
  const prelaunch={capex_cr:capex/10,pilot_cr:run.p.pilot/10,cash_before_scale_decision_cr:-cr(run.M[12].cumulative)};
  out.deck={pl,waterfall340,prelaunch,channels:B.ch.map(c=>({channel:c[0],outlets:c[1],units_per_outlet_month:c[2]}))};
  fs.writeFileSync(path.join(__dirname,'finance_v4_output.json'),JSON.stringify(out,null,2));
  pl.forEach(p=>console.log('Y'+p.year,'EBITDA',p.ebitda.toFixed(2),'D&A',p.da.toFixed(2),'EBIT',p.ebit.toFixed(2),'WPPF',p.wppf.toFixed(2),'tax',p.tax.toFixed(2),'NP',p.net_profit.toFixed(2),'FCF',p.fcf.toFixed(2),'cum cash',p.cum_cash_end.toFixed(2),'NR by SKU',JSON.stringify(Object.fromEntries(Object.entries(p.nr_by_sku).map(([k,v])=>[k,+v.toFixed(2)])))));
  console.log('waterfall 340',JSON.stringify(Object.fromEntries(Object.entries(waterfall340).map(([k,v])=>[k,+v.toFixed(2)]))),'prelaunch',JSON.stringify(prelaunch));
}
