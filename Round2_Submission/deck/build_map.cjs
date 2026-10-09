// District map of the BGS/DPHE 1998-99 well survey: share of sampled wells with
// iron > 0.3 mg/L OR hardness > 120 mg/L as CaCO3 (Team analysis of BGS/DPHE data).
const fs=require('fs'),sharp=require('sharp');
const g=JSON.parse(fs.readFileSync('assets/bgd_adm2.geojson','utf8'));
const lines=fs.readFileSync('../../WaterSmart_Research/analysis/water_by_district.csv','utf8').replace(/^\ufeff/,'').trim().split(/\r?\n/);
const head=lines[0].split(',');const col=n=>head.indexOf(n);
const alias={Jaipurhat:'Joypurhat',Jhalakati:'Jhalokati',Netrokona:'Netrakona'};
const data={};
for(const l of lines.slice(1)){const c=l.split(',');const name=alias[c[0]]||c[0];
  data[name]={n:+c[col('n_wells')],flag:+c[col('iron_gt_0_3_OR_hardness_gt_120_sample_pct')],fe:+c[col('Fe_median_exact')],hard:+c[col('hardness_median_exact')]};}
const bins=[[90,'8E3B12'],[75,'C8612A'],[50,'E9A06B'],[0,'F6DCC4']];
const color=p=>p==null?'D9DEE5':bins.find(b=>p>=b[0])[1];
// Equirectangular projection scaled by cos(mid-lat).
let minX=1e9,minY=1e9,maxX=-1e9,maxY=-1e9;const k=Math.cos(23.7*Math.PI/180);
const P=([lon,lat])=>[lon*k,-lat];
g.features.forEach(f=>{const polys=f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates;
  polys.forEach(p=>p[0].forEach(pt=>{const [x,y]=P(pt);minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);}));});
const W=1400,pad=20,s=(W-2*pad)/(maxX-minX),H=Math.round((maxY-minY)*s+2*pad);
const tx=pt=>{const [x,y]=P(pt);return [((x-minX)*s+pad).toFixed(1),((y-minY)*s+pad).toFixed(1)];};
let paths='',missing=[];
for(const f of g.features){const name=f.properties.shapeName,d=data[name];if(!d)missing.push(name);
  const polys=f.geometry.type==='Polygon'?[f.geometry.coordinates]:f.geometry.coordinates;
  const dpath=polys.map(p=>p.map(r=>'M'+r.map(tx).map(q=>q.join(',')).join('L')+'Z').join('')).join('');
  paths+=`<path d="${dpath}" fill="#${color(d&&d.flag)}" stroke="#FFFFFF" stroke-width="2.2" stroke-linejoin="round"/>`;}
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${paths}</svg>`;
fs.writeFileSync('assets/map.svg',svg);
sharp(Buffer.from(svg)).png().toFile('assets/map.png').then(()=>{
  const vals=Object.values(data);const c=t=>vals.filter(v=>v.flag>=t).length;
  console.log('map',W,'x',H,'missing',missing.join('|'));
  console.log('districts',vals.length,'>=50%',c(50),'>=75%',c(75),'>=90%',c(90));
  ['Dhaka','Chittagong','Rajshahi','Khulna','Sylhet','Barisal','Rangpur','Mymensingh','Comilla','Narayanganj','Gazipur'].forEach(n=>console.log(n,data[n].flag.toFixed(1)+'%','n='+data[n].n,'Fe',data[n].fe,'hard',data[n].hard.toFixed(0)));
});
