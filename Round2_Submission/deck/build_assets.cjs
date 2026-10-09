// Product illustrations for the deck (concept mock-ups, not final pack artwork).
const fs = require('fs');
const sharp = require('sharp');
const out = (f) => 'assets/' + f;
const F = 'Calibri';

const defs = `<defs>
<linearGradient id="body" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#D3DEE8"/><stop offset=".16" stop-color="#FFFFFF"/><stop offset=".6" stop-color="#F6F9FC"/><stop offset=".88" stop-color="#E1EAF1"/><stop offset="1" stop-color="#C7D4DF"/></linearGradient>
<linearGradient id="cap" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#0A6F8E"/><stop offset=".3" stop-color="#1BB6D8"/><stop offset=".65" stop-color="#14A2C4"/><stop offset="1" stop-color="#0A6683"/></linearGradient>
<linearGradient id="drop" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#5FD0EA"/><stop offset="1" stop-color="#0B86AD"/></linearGradient>
<linearGradient id="sachet" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#1E2A78"/><stop offset="1" stop-color="#0E7FA8"/></linearGradient>
<filter id="blur"><feGaussianBlur stdDeviation="9"/></filter></defs>`;

// Bottle front view; `strip` shows the PaniCheck strip pulled from the cap.
function bottle({ strip = true, size = '340 ml', variant = 'IRON &amp; HARD WATER', badge = true }) {
  const stripSvg = strip
    ? `<g transform="rotate(18 420 120)"><rect x="392" y="-38" width="30" height="170" rx="4" fill="#FFFFFF" stroke="#C9D3DD" stroke-width="2"/>
       <rect x="392" y="-38" width="30" height="34" rx="4" fill="#F5A31A"/><rect x="398" y="22" width="18" height="18" rx="2" fill="#B0407D"/><rect x="398" y="52" width="18" height="18" rx="2" fill="#7E8F4E"/></g>`
    : '';
  const capText = strip
    ? `<text x="320" y="166" text-anchor="middle" font-family="${F}" font-weight="bold" font-size="22" fill="#FFFFFF" letter-spacing="1">PaniCheck</text>`
    : '';
  const badgeSvg = badge
    ? `<rect x="165" y="1010" width="310" height="54" rx="27" fill="#F5A31A"/><text x="320" y="1046" text-anchor="middle" font-family="${F}" font-weight="bold" font-size="26" fill="#141C52">Water test in the cap</text>`
    : '';
  return `<g>
  <ellipse cx="320" cy="1236" rx="215" ry="22" fill="#0B1A3A" opacity=".18" filter="url(#blur)"/>
  ${stripSvg}
  <rect x="200" y="150" width="240" height="118" rx="18" fill="url(#cap)"/>
  <path d="M200,176 Q200,116 258,112 L382,112 Q440,116 440,176 Z" fill="url(#cap)"/>
  <rect x="200" y="196" width="240" height="5" fill="#0A5873" opacity=".55"/>
  <rect x="296" y="204" width="48" height="12" rx="6" fill="#0A5873" opacity=".8"/>
  ${capText}
  <rect x="222" y="262" width="196" height="46" fill="#E4ECF2"/>
  <path d="M215,300 C215,342 130,352 130,422 L130,1150 Q130,1215 195,1215 L445,1215 Q510,1215 510,1150 L510,422 C510,352 425,342 425,300 Z" fill="url(#body)" stroke="#C3D0DB" stroke-width="2"/>
  <rect x="152" y="430" width="20" height="690" rx="10" fill="#FFFFFF" opacity=".75"/>
  <ellipse cx="320" cy="458" rx="112" ry="36" fill="#1C3F94"/><ellipse cx="320" cy="458" rx="104" ry="29" fill="none" stroke="#FFFFFF" stroke-width="2" opacity=".7"/>
  <text x="320" y="471" text-anchor="middle" font-family="Georgia" font-style="italic" font-weight="bold" font-size="36" fill="#FFFFFF">Parachute</text>
  <text x="320" y="548" text-anchor="middle" font-family="${F}" font-weight="bold" font-size="60" fill="#3E9B3A">naturale</text>
  <text x="320" y="628" text-anchor="middle" font-family="${F}" font-weight="bold" font-size="66" fill="#141C52">WaterSmart</text>
  <rect x="150" y="652" width="340" height="44" rx="22" fill="#12A5C4"/>
  <text x="320" y="682" text-anchor="middle" font-family="${F}" font-weight="bold" font-size="24" fill="#FFFFFF" letter-spacing="2">${variant}</text>
  <circle cx="368" cy="842" r="58" fill="#6B4423"/><circle cx="368" cy="842" r="46" fill="#FFFDF5"/><circle cx="368" cy="842" r="46" fill="none" stroke="#E9DFC8" stroke-width="5"/>
  <path d="M282,738 C282,738 228,806 228,846 A54,54 0 0 0 336,846 C336,806 282,738 282,738 Z" fill="url(#drop)"/>
  <path d="M258,830 Q256,806 274,786" stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round" opacity=".8"/>
  <text x="320" y="944" text-anchor="middle" font-family="${F}" font-size="27" fill="#3E4A5C">with Coconut Milk Protein</text>
  <text x="320" y="980" text-anchor="middle" font-family="${F}" font-size="21" fill="#5B6472">Helps remove iron &amp; hard-water build-up</text>
  ${badgeSvg}
  <text x="320" y="1160" text-anchor="middle" font-family="${F}" font-weight="bold" font-size="32" fill="#141C52">${size}</text></g>`;
}

const svgBottle = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="1330" viewBox="0 -60 640 1330">${defs}${bottle({})}</svg>`;
const svg180 = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="1330" viewBox="0 -60 640 1330">${defs}${bottle({ strip: false, size: '180 ml', badge: false })}</svg>`;

// Sachet: pillow pack with crimped ends.
function zig(y, dir) {
  let d = `M40,${y}`;
  for (let x = 40; x < 360; x += 20) d += ` L${x + 10},${y + dir * 12} L${x + 20},${y}`;
  return d;
}
const svgSachet = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="560" viewBox="0 0 400 560">${defs}
 <ellipse cx="200" cy="530" rx="150" ry="14" fill="#0B1A3A" opacity=".16" filter="url(#blur)"/>
 <rect x="40" y="60" width="320" height="440" fill="url(#sachet)"/>
 <path d="${zig(60, -1)} L360,74 L40,74 Z" fill="#0E1650"/>
 <path d="${zig(500, 1)} L360,486 L40,486 Z" fill="#0E1650"/>
 <ellipse cx="200" cy="138" rx="86" ry="27" fill="#FFFFFF"/><text x="200" y="148" text-anchor="middle" font-family="Georgia" font-style="italic" font-weight="bold" font-size="28" fill="#1C3F94">Parachute</text>
 <text x="200" y="215" text-anchor="middle" font-family="${F}" font-weight="bold" font-size="44" fill="#9BE07A">naturale</text>
 <text x="200" y="275" text-anchor="middle" font-family="${F}" font-weight="bold" font-size="48" fill="#FFFFFF">WaterSmart</text>
 <path d="M200,310 C200,310 162,358 162,386 A38,38 0 0 0 238,386 C238,358 200,310 200,310 Z" fill="url(#drop)" stroke="#FFFFFF" stroke-width="3"/>
 <text x="200" y="458" text-anchor="middle" font-family="${F}" font-weight="bold" font-size="30" fill="#F5A31A">6 ml · Tk 3</text></svg>`;

// Strip colour chart (illustrative colours; the final chart comes from the strip supplier).
const swatches = [['3FA96B', '0', 'Soft'], ['8C9A4E', '60', 'Moderate'], ['A2647F', '120', 'Hard'], ['B0407D', '250', 'Very hard'], ['7A2466', '425', '']];
let chartSvg = '';
swatches.forEach((s, i) => {
  const x = 40 + i * 150;
  chartSvg += `<rect x="${x}" y="70" width="120" height="120" rx="16" fill="#${s[0]}"/><text x="${x + 60}" y="232" text-anchor="middle" font-family="${F}" font-weight="bold" font-size="34" fill="#141C52">${s[1]}</text><text x="${x + 60}" y="272" text-anchor="middle" font-family="${F}" font-size="26" fill="#5B6472">${s[2]}</text>`;
});
const svgChart = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="300" viewBox="0 0 800 300"><rect width="800" height="300" rx="24" fill="#FFFFFF"/>
 <text x="40" y="44" font-family="${F}" font-weight="bold" font-size="28" fill="#141C52">Total hardness, mg/L as CaCO&#8323;</text>${chartSvg}</svg>`;

// Phone showing a Pani Map lookup (prototype screen built on the team's district analysis).
const map = fs.readFileSync(out('map.png')).toString('base64');
const svgPhone = `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="1080" viewBox="0 0 560 1080">${defs}
 <ellipse cx="280" cy="1050" rx="210" ry="18" fill="#0B1A3A" opacity=".2" filter="url(#blur)"/>
 <rect x="20" y="10" width="520" height="1030" rx="70" fill="#111827"/><rect x="42" y="32" width="476" height="986" rx="52" fill="#FFFFFF"/>
 <rect x="215" y="46" width="130" height="26" rx="13" fill="#111827"/>
 <rect x="42" y="90" width="476" height="96" fill="#12A5C4"/>
 <text x="72" y="150" font-family="${F}" font-weight="bold" font-size="40" fill="#FFFFFF">Pani Map</text><text x="490" y="148" text-anchor="end" font-family="${F}" font-size="24" fill="#E3F5FA">by Naturale</text>
 <rect x="70" y="210" width="420" height="56" rx="28" fill="#F3F6FA" stroke="#D5DCE6" stroke-width="2"/><text x="100" y="246" font-family="${F}" font-size="26" fill="#5B6472">Search: Mirpur, Dhaka</text>
 <image href="data:image/png;base64,${map}" x="150" y="282" width="260" height="364"/>
 <circle cx="290" cy="486" r="13" fill="#141C52" stroke="#FFFFFF" stroke-width="4"/>
 <rect x="62" y="664" width="436" height="236" rx="24" fill="#F3F6FA"/>
 <text x="88" y="708" font-family="${F}" font-weight="bold" font-size="30" fill="#141C52">Dhaka district</text>
 <text x="88" y="748" font-family="${F}" font-size="24" fill="#5B6472">BGS/DPHE wells, 1998–99 (n = 45)</text>
 <text x="88" y="806" font-family="${F}" font-weight="bold" font-size="46" fill="#B4511F">76%</text><text x="200" y="792" font-family="${F}" font-size="23" fill="#1F2937">of sampled wells: iron</text><text x="200" y="820" font-family="${F}" font-size="23" fill="#1F2937">or hardness above screen</text>
 <text x="88" y="868" font-family="${F}" font-size="22" fill="#5B6472">Area history, not your tap. Test your own.</text>
 <rect x="62" y="924" width="436" height="70" rx="35" fill="#F5A31A"/><text x="280" y="970" text-anchor="middle" font-family="${F}" font-weight="bold" font-size="30" fill="#141C52">Test my water now</text></svg>`;

const jobs = [
  ['bottle340.png', svgBottle, 640],
  ['bottle180.png', svg180, 640],
  ['sachet.png', svgSachet, 400],
  ['chart.png', svgChart, 800],
  ['phone.png', svgPhone, 560],
];
Promise.all(jobs.map(([f, svg, w]) => sharp(Buffer.from(svg), { density: 144 }).resize({ width: Math.round(w * 1.5) }).png().toFile(out(f))))
  .then(() => console.log('assets ok'));
