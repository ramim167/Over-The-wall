// Scene 2 · 0:06–0:23 · "The Mover": four cinematic vignettes slide in sequence
// (a) arrival at a hall gate, (b) mess-room unpacking, (c) bucket + rust stain ring, (d) weak lather + more shampoo.
const { C, text, prog, ease, lerp, clamp, bg } = require('../engine.cjs');

const PX = 700, PY = 170, PW = 1140, PH = 660;
const SIL = '#070B26';
const rnd = (i) => { const v = Math.sin(i * 12.9898 + 4.1) * 43758.5453; return v - Math.floor(v); };
const hx = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a, b, p) => { const A = hx(a), B = hx(b); return '#' + A.map((v, i) => Math.round(lerp(v, B[i], clamp(p))).toString(16).padStart(2, '0')).join(''); };
const f = (n) => Math.round(n * 10) / 10;

// ---------- panel framing ----------
function panelState(t, enter, exit) {
  let x = PX, s = 1, op = 1, dim = 0;
  if (enter > 0) {
    const p = prog(t, enter + 0.05, 0.75, ease.out);
    if (p <= 0) return null;
    x = lerp(1980, PX, p); s = lerp(0.94, 1, p);
  } else {
    const p = prog(t, 0, 0.9, ease.out);
    x = lerp(PX + 140, PX, p);
  }
  if (exit != null) {
    const q = prog(t, exit, 0.8, ease.inOut);
    if (q >= 1) return null;
    x -= 240 * q; s *= lerp(1, 0.9, q); op *= 1 - q; dim = 0.6 * q;
  }
  // slow camera drift shared by all panels
  x += -14 * Math.sin(t * 0.33);
  const y = PY + 6 * Math.sin(t * 0.27);
  return { x, y, s, op, dim };
}
function panel(st, content) {
  const cx = st.x + PW / 2, cy = st.y + PH / 2;
  return `<g opacity="${f(st.op * 100) / 100}" transform="translate(${f(cx)} ${f(cy)}) scale(${st.s.toFixed(4)}) translate(${-PW / 2} ${-PH / 2})">
    <rect x="14" y="26" width="${PW}" height="${PH}" rx="30" fill="#02041A" opacity="0.32"/>
    <rect x="6" y="14" width="${PW}" height="${PH}" rx="30" fill="#02041A" opacity="0.3"/>
    <g clip-path="url(#s02clip)">${content}${st.dim > 0 ? `<rect width="${PW}" height="${PH}" fill="${C.navy3}" opacity="${st.dim.toFixed(3)}"/>` : ''}</g>
    <rect width="${PW}" height="${PH}" rx="30" fill="none" stroke="${C.aqua}" stroke-opacity="0.35" stroke-width="2"/>
  </g>`;
}

// ---------- (a) arrival at a hall gate, Dhaka evening ----------
function woman(x, y, t) {
  const ph = t * 5.2, bob = -3 * Math.abs(Math.sin(ph)), sw = Math.sin(ph);
  let s = `<g transform="translate(${f(x)} ${f(y + bob)})">`;
  s += `<ellipse cx="-40" cy="${f(2 - bob)}" rx="115" ry="8" fill="#000" opacity="0.3"/>`;
  // suitcase rolling behind
  s += `<g transform="rotate(-9 -118 0)"><rect x="-154" y="-80" width="70" height="76" rx="9" fill="${C.teal}"/>
    <rect x="-154" y="-80" width="70" height="76" rx="9" fill="none" stroke="${C.aqua}" stroke-width="2" opacity="0.7"/>
    <rect x="-140" y="-80" width="8" height="76" fill="${C.aqua}" opacity="0.55"/><rect x="-106" y="-80" width="8" height="76" fill="${C.aqua}" opacity="0.55"/>
    <circle cx="-142" cy="-1" r="6" fill="#03051A"/><circle cx="-96" cy="-1" r="6" fill="#03051A"/></g>`;
  s += `<path d="M-74,-108 L-104,-78" stroke="#8A95C6" stroke-width="4" stroke-linecap="round"/>`;
  // feet
  s += `<ellipse cx="${f(-10 + 13 * sw)}" cy="-3" rx="13" ry="5" fill="${SIL}"/><ellipse cx="${f(12 - 13 * sw)}" cy="-3" rx="13" ry="5" fill="${SIL}"/>`;
  // long dress with a slight hem sway
  const hem = 6 * sw;
  const body = `M-34,-192 C-40,-150 ${f(-50 + hem)},-60 ${f(-58 + hem)},-4 L${f(56 + hem)},-4 C${f(48 + hem)},-60 40,-150 34,-192 Z`;
  // hijab: dome over head, draping to shoulders
  const hij = 'M-27,-234 C-27,-275 33,-277 33,-236 C36,-216 42,-200 46,-186 L-44,-186 C-36,-200 -29,-214 -27,-234 Z';
  s += `<path d="${body}" fill="${SIL}" stroke="${C.aqua}" stroke-opacity="0.28" stroke-width="2"/>`;
  s += `<path d="M-24,-178 L-74,-108" stroke="${SIL}" stroke-width="15" stroke-linecap="round"/>`;
  s += `<path d="M24,-178 L${f(36 + 6 * sw)},-112" stroke="${SIL}" stroke-width="14" stroke-linecap="round"/>`;
  s += `<path d="${hij}" fill="#0B1036" stroke="${C.aqua}" stroke-opacity="0.32" stroke-width="2"/>`;
  return s + '</g>';
}
function panelA(t) {
  let s = `<defs><linearGradient id="s02skyA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121848"/><stop offset="0.5" stop-color="#36398A"/><stop offset="0.74" stop-color="#8E5C86"/><stop offset="0.86" stop-color="#D98E78"/><stop offset="1" stop-color="#E9A06B"/></linearGradient>
    <radialGradient id="s02lamp" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFE3B0" stop-opacity="0.55"/><stop offset="1" stop-color="#FFE3B0" stop-opacity="0"/></radialGradient></defs>`;
  s += `<rect x="-50" y="-50" width="${PW + 100}" height="${PH + 100}" fill="url(#s02skyA)"/>`;
  for (let i = 0; i < 24; i++) {
    const x = rnd(i) * PW, y = 20 + rnd(i + 50) * 230;
    s += `<circle cx="${f(x - 4 * t)}" cy="${f(y)}" r="${f(1 + rnd(i + 9) * 1.6)}" fill="#fff" opacity="${(0.25 + 0.5 * (0.5 + 0.5 * Math.sin(t * 2 + i * 1.7))).toFixed(2)}"/>`;
  }
  const mx = 930 - 5 * t;
  s += `<circle cx="${f(mx)}" cy="118" r="95" fill="#F4EEDD" opacity="0.05"/><circle cx="${f(mx)}" cy="118" r="58" fill="#F4EEDD" opacity="0.08"/><circle cx="${f(mx)}" cy="118" r="30" fill="#F4EEDD" opacity="0.95"/>`;
  // far skyline
  let far = '';
  for (let i = 0; i < 16; i++) {
    const w = 58 + rnd(i + 3) * 60, h = 100 + rnd(i + 7) * 170, x = -90 + i * 88;
    far += `<rect x="${f(x)}" y="${f(520 - h)}" width="${f(w)}" height="${f(h)}" fill="#2C2D74"/>`;
    for (let k = 0; k < 3; k++) if (rnd(i * 7 + k) > 0.35) far += `<rect x="${f(x + 12 + (k % 2) * 24)}" y="${f(540 - h + k * 34)}" width="8" height="11" fill="#F2C890" opacity="${(0.35 + 0.3 * rnd(i + k)).toFixed(2)}"/>`;
  }
  s += `<g transform="translate(${f(-7 * t)} 0)">${far}</g>`;
  let mid = '';
  for (let i = 0; i < 11; i++) {
    const w = 90 + rnd(i + 30) * 70, h = 60 + rnd(i + 40) * 110, x = -60 + i * 125;
    mid += `<rect x="${f(x)}" y="${f(530 - h)}" width="${f(w)}" height="${f(h + 20)}" fill="#1D1F5C"/>`;
  }
  s += `<g transform="translate(${f(-14 * t)} 0)">${mid}</g>`;
  // ground and road
  s += `<rect x="-50" y="540" width="${PW + 100}" height="140" fill="#161B50"/><rect x="-50" y="598" width="${PW + 100}" height="4" fill="#28347A"/><rect x="-50" y="602" width="${PW + 100}" height="80" fill="#1B215C"/>`;
  // gate layer
  let g = '';
  const tree = (cx, cy) => `<circle cx="${cx}" cy="${cy}" r="62" fill="#121650"/><circle cx="${cx + 52}" cy="${cy + 18}" r="48" fill="#121650"/><circle cx="${cx - 48}" cy="${cy + 22}" r="44" fill="#121650"/>`;
  g += tree(380, 440) + tree(1060, 430) + tree(180, 460);
  g += `<rect x="250" y="476" width="300" height="70" fill="#272E6E"/><rect x="850" y="476" width="380" height="70" fill="#272E6E"/>`;
  g += `<rect x="246" y="468" width="308" height="10" fill="#36408A"/><rect x="846" y="468" width="388" height="10" fill="#36408A"/>`;
  let rails = '';
  for (let x = 256; x < 548; x += 18) rails += `M${x},432 L${x},468 `;
  for (let x = 856; x < 1230; x += 18) rails += `M${x},432 L${x},468 `;
  g += `<path d="${rails} M250,436 L550,436 M850,436 L1230,436" stroke="#3A4590" stroke-width="3"/>`;
  g += `<ellipse cx="700" cy="566" rx="190" ry="22" fill="#FFD9A0" opacity="0.14"/>`;
  // gate leaves: left closed, right swung open
  let bars = '';
  for (let x = 606; x < 700; x += 13) bars += `M${x},372 L${x},560 `;
  for (let k = 0; k < 5; k++) { const x = 800 - k * 9; bars += `M${x},${372 + k * 3} L${x},${560 - k * 2} `; }
  g += `<path d="${bars} M600,380 L700,380 M600,470 L700,470 M800,380 L764,392 M800,470 L764,468" stroke="#4A56A3" stroke-width="3.5"/>`;
  g += `<rect x="540" y="300" width="62" height="262" fill="#323A85"/><rect x="798" y="300" width="62" height="262" fill="#323A85"/>`;
  g += `<rect x="540" y="300" width="10" height="262" fill="#3E4898"/><rect x="798" y="300" width="10" height="262" fill="#3E4898"/>`;
  g += `<rect x="530" y="288" width="82" height="16" rx="3" fill="#46519E"/><rect x="788" y="288" width="82" height="16" rx="3" fill="#46519E"/>`;
  g += `<path d="M602,336 Q700,262 798,336 L798,358 Q700,286 602,358 Z" fill="#3A448F"/>`;
  g += `<rect x="636" y="266" width="128" height="34" rx="5" fill="#2A3378" stroke="${C.aqua}" stroke-opacity="0.55" stroke-width="2"/>`;
  g += `<rect x="652" y="279" width="96" height="3" rx="1.5" fill="${C.aquaLt}" opacity="0.35"/><rect x="672" y="287" width="56" height="3" rx="1.5" fill="${C.aquaLt}" opacity="0.25"/>`;
  const lampOp = 0.85 + 0.15 * Math.sin(t * 3.1);
  g += `<circle cx="571" cy="270" r="62" fill="url(#s02lamp)" opacity="${lampOp.toFixed(2)}"/><circle cx="829" cy="270" r="62" fill="url(#s02lamp)" opacity="${lampOp.toFixed(2)}"/>`;
  g += `<circle cx="571" cy="274" r="11" fill="#FFE7B8"/><circle cx="829" cy="274" r="11" fill="#FFE7B8"/>`;
  s += `<g transform="translate(${f(-24 * t)} 0)">${g}</g>`;
  // woman walking toward the gate (foreground)
  const wx = lerp(170, 470, clamp(t / 4.6));
  s += woman(wx, 612, t);
  // foreground parallax: dark kerb edge
  s += `<rect x="-50" y="642" width="${PW + 100}" height="40" fill="#0D1240" opacity="0.8"/>`;
  return s;
}

// ---------- (b) mess room unpacking ----------
function panelB(lt) {
  let s = `<defs><linearGradient id="s02wallB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A3778"/><stop offset="1" stop-color="#1A2259"/></linearGradient>
    <radialGradient id="s02warmB" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFD39A" stop-opacity="0.16"/><stop offset="1" stop-color="#FFD39A" stop-opacity="0"/></radialGradient></defs>`;
  s += `<rect x="-50" y="-50" width="${PW + 100}" height="${PH + 100}" fill="url(#s02wallB)"/>`;
  // back wall layer
  let w = `<ellipse cx="560" cy="250" rx="560" ry="330" fill="url(#s02warmB)"/>`;
  w += `<rect x="110" y="110" width="250" height="220" rx="6" fill="#0B1140" stroke="#3B4790" stroke-width="8"/>`;
  for (let i = 0; i < 12; i++) w += `<rect x="${f(130 + rnd(i + 70) * 200)}" y="${f(200 + rnd(i + 80) * 110)}" width="7" height="9" fill="#F2C890" opacity="${(0.3 + 0.5 * rnd(i + 90)).toFixed(2)}"/>`;
  w += `<path d="M235,110 L235,330 M110,220 L360,220" stroke="#3B4790" stroke-width="6"/>`;
  const cur = 6 * Math.sin(lt * 1.3);
  w += `<path d="M100,96 L176,96 C${f(166 + cur)},200 ${f(184 + cur)},280 ${f(162 + cur)},350 L100,350 Z" fill="${C.teal}" opacity="0.75"/>`;
  w += `<rect x="90" y="88" width="300" height="8" rx="4" fill="#4A56A3"/>`;
  w += `<rect x="420" y="250" width="150" height="8" rx="3" fill="#3B4790"/><rect x="432" y="214" width="26" height="36" rx="3" fill="#4C5AAA"/><rect x="464" y="222" width="20" height="28" rx="3" fill="${C.aqua}" opacity="0.6"/><rect x="490" y="226" width="40" height="24" rx="3" fill="#3E4B97"/>`;
  s += `<g transform="translate(${f(-6 * lt)} 0)">${w}</g>`;
  // floor
  s += `<rect x="-50" y="530" width="${PW + 100}" height="150" fill="#121848"/><rect x="-50" y="524" width="${PW + 100}" height="8" fill="#313E86"/>`;
  s += `<path d="M-50,566 L${PW + 50},566 M-50,612 L${PW + 50},612" stroke="#1C2460" stroke-width="3"/>`;
  // ceiling fan
  s += `<path d="M560,-10 L560,46" stroke="#4A56A3" stroke-width="6"/><g transform="translate(560 54) scale(1 0.28)">`;
  for (let k = 0; k < 3; k++) s += `<ellipse cx="0" cy="0" rx="118" ry="26" fill="#11173F" transform="rotate(${f(lt * 420 + k * 120)}) translate(70 0)"/>`;
  s += `</g><ellipse cx="560" cy="54" rx="22" ry="9" fill="#4A56A3"/>`;
  // bunk bed + bag + stack (mid layer)
  let b = '';
  const fr = '#3D4884';
  b += `<rect x="700" y="140" width="16" height="470" rx="4" fill="${fr}"/><rect x="1066" y="140" width="16" height="470" rx="4" fill="${fr}"/>`;
  b += `<rect x="714" y="250" width="354" height="42" rx="10" fill="#2E4C8A"/><rect x="714" y="250" width="354" height="12" rx="6" fill="#3E63A6"/><ellipse cx="1020" cy="244" rx="40" ry="14" fill="#AEB6D9" opacity="0.85"/>`;
  b += `<rect x="700" y="292" width="382" height="16" rx="4" fill="${fr}"/>`;
  b += `<rect x="714" y="470" width="354" height="48" rx="10" fill="#28457F"/><rect x="714" y="470" width="354" height="14" rx="7" fill="#355B9C"/>`;
  b += `<rect x="700" y="516" width="382" height="16" rx="4" fill="${fr}"/>`;
  b += `<path d="M1030,300 L1030,520 M1058,300 L1058,520 M1030,350 L1058,350 M1030,400 L1058,400 M1030,450 L1058,450" stroke="#56629F" stroke-width="5"/>`;
  // duffel bag (open)
  b += `<path d="M752,474 C748,430 760,416 790,414 L878,414 C906,416 914,432 910,474 Z" fill="${C.teal}"/>`;
  b += `<ellipse cx="831" cy="418" rx="64" ry="11" fill="#04203A"/><path d="M780,410 C790,370 870,370 882,410" fill="none" stroke="#0A5E7A" stroke-width="7"/>`;
  b += `<path d="M770,446 L894,446" stroke="${C.aqua}" stroke-width="3" opacity="0.6" stroke-dasharray="6 5"/>`;
  // clothes stack grows as he unpacks
  const cycle = 1.05, start = 0.45;
  const cyc = (lt - start) / cycle;
  const done = clamp(Math.floor(cyc), 0, 3);
  const cols = ['#E3F5FA', '#12A5C4', '#AEB6D9'];
  for (let k = 0; k < done; k++) {
    const land = prog(lt, start + (k + 1) * cycle - 0.05, 0.35, ease.outBack);
    b += `<rect x="930" y="${f(456 - k * 15 - 6 * (1 - land))}" width="84" height="14" rx="5" fill="${cols[k]}" opacity="0.92"/>`;
  }
  // man (front of bed)
  const ph = cyc - Math.floor(cyc);
  const bag = [832, 430], lift = [868, 368], rest = [800, 410];
  let hand = rest, carry = false, tossP = -1;
  if (cyc >= 0 && Math.floor(cyc) < 3) {
    if (ph < 0.35) hand = [lerp(rest[0], bag[0], ease.inOut(ph / 0.35)), lerp(rest[1], bag[1], ease.inOut(ph / 0.35))];
    else if (ph < 0.68) { const q = ease.inOut((ph - 0.35) / 0.33); hand = [lerp(bag[0], lift[0], q), lerp(bag[1], lift[1], q)]; carry = true; }
    else { const q = ease.inOut((ph - 0.68) / 0.32); hand = [lerp(lift[0], rest[0], q), lerp(lift[1], rest[1], q)]; tossP = q; }
  }
  const k = clamp(Math.floor(cyc), 0, 2);
  if (carry) b += `<rect x="${f(hand[0] - 34)}" y="${f(hand[1] - 18)}" width="68" height="16" rx="5" fill="${cols[k]}"/>`;
  if (tossP >= 0) {
    const tx = lerp(lift[0], 972, tossP), ty = lerp(lift[1], 456 - k * 15, tossP) - 60 * Math.sin(Math.PI * tossP);
    b += `<rect x="${f(tx - 40)}" y="${f(ty - 8)}" width="80" height="14" rx="5" fill="${cols[k]}" transform="rotate(${f(-14 * (1 - tossP))} ${f(tx)} ${f(ty)})"/>`;
  }
  // man silhouette, feet at (700, 612)
  const mx = 700, my = 612, sh = [mx + 24, my - 214];
  const breathe = 1.5 * Math.sin(lt * 2.2);
  let m = `<ellipse cx="${mx}" cy="${my + 2}" rx="70" ry="8" fill="#000" opacity="0.3"/>`;
  m += `<path d="M${mx - 24},${my} L${mx - 18},${my - 122} L${mx + 18},${my - 122} L${mx + 26},${my} L${mx + 10},${my} L${mx + 1},${my - 78} L${mx - 8},${my} Z" fill="${SIL}"/>`;
  m += `<path d="M${mx - 30},${my - 118} L${mx - 30},${f(my - 214 + breathe)} C${mx - 22},${my - 236} ${mx + 30},${my - 236} ${mx + 40},${f(my - 214 + breathe)} L${mx + 30},${my - 118} Z" fill="${SIL}" stroke="${C.aqua}" stroke-opacity="0.25" stroke-width="2"/>`;
  m += `<rect x="${mx - 1}" y="${my - 246}" width="16" height="22" fill="${SIL}"/>`;
  m += `<circle cx="${mx + 8}" cy="${my - 262}" r="24" fill="${SIL}" stroke="${C.aqua}" stroke-opacity="0.28" stroke-width="2"/>`;
  m += `<path d="M${mx - 16},${my - 268} C${mx - 14},${my - 294} ${mx + 26},${my - 296} ${mx + 32},${my - 270} C${mx + 18},${my - 280} ${mx},${my - 280} ${mx - 16},${my - 268} Z" fill="#03051A"/>`;
  m += `<path d="M${mx - 22},${my - 206} L${mx - 30},${my - 128}" stroke="${SIL}" stroke-width="14" stroke-linecap="round"/>`;
  const el = [(sh[0] + hand[0]) / 2 - 6, (sh[1] + hand[1]) / 2 + 26];
  m += `<path d="M${sh[0]},${sh[1]} Q${f(el[0])},${f(el[1])} ${f(hand[0])},${f(hand[1])}" fill="none" stroke="${SIL}" stroke-width="14" stroke-linecap="round"/>`;
  m += `<circle cx="${f(hand[0])}" cy="${f(hand[1])}" r="10" fill="${SIL}"/>`;
  s += `<g transform="translate(${f(-14 * lt)} 0)">${b}${m}</g>`;
  return s;
}

// ---------- (c) bucket under an old tap, rust stain ring ----------
function panelC(lt) {
  let s = `<defs><linearGradient id="s02bkt" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1B4E7E"/><stop offset="0.45" stop-color="#3C88C2"/><stop offset="1" stop-color="#173F69"/></linearGradient>
    <clipPath id="s02rim"><ellipse cx="575" cy="380" rx="156" ry="28"/></clipPath></defs>`;
  s += `<rect x="-50" y="-50" width="${PW + 100}" height="${PH + 100}" fill="#1E2A66"/>`;
  // tiled wall (slow layer)
  let tl = '';
  for (let x = -40; x < PW + 60; x += 84) tl += `M${x},-20 L${x},560 `;
  for (let y = 20; y < 560; y += 84) tl += `M-50,${y} L${PW + 60},${y} `;
  s += `<g transform="translate(${f(-6 * lt)} 0)"><path d="${tl}" stroke="#2B3A82" stroke-width="3" opacity="0.8"/>
    <path d="M462,170 C455,230 468,270 460,330" stroke="${C.rust}" stroke-width="14" opacity="0.2" fill="none" stroke-linecap="round"/>
    <rect x="860" y="70" width="18" height="200" rx="9" fill="#3B4790"/><path d="M820,90 L920,90 L910,330 C880,345 850,345 830,330 Z" fill="${C.teal}" opacity="0.55"/></g>`;
  s += `<rect x="-50" y="560" width="${PW + 100}" height="140" fill="#141B4A"/><rect x="-50" y="556" width="${PW + 100}" height="6" fill="#2B3A82"/>`;
  // main layer: tap + bucket (moves together so stream stays aligned)
  const push = lerp(1, 1.06, prog(lt, 0, 4.6, ease.inOut));
  let m = '';
  m += `<path d="M470,-30 L470,140 Q470,166 496,166 L556,166" stroke="#5E6AA2" stroke-width="24" fill="none"/>`;
  m += `<path d="M463,-30 L463,140 Q463,158 480,160" stroke="#A9B4E0" stroke-width="4" fill="none" opacity="0.6"/>`;
  m += `<circle cx="468" cy="70" r="7" fill="${C.rust}" opacity="0.8"/><circle cx="476" cy="118" r="5" fill="${C.rustLt}" opacity="0.6"/>`;
  m += `<rect x="548" y="148" width="44" height="38" rx="9" fill="#8A95C6"/><rect x="565" y="184" width="20" height="24" rx="4" fill="#8A95C6"/><rect x="565" y="200" width="20" height="8" rx="3" fill="${C.rust}" opacity="0.7"/>`;
  const turn = prog(lt, 0.1, 0.6, ease.out) * 90;
  m += `<g transform="translate(570 136) rotate(${f(turn)})"><rect x="-24" y="-5" width="48" height="10" rx="5" fill="#B7C0E6"/><rect x="-5" y="-24" width="10" height="48" rx="5" fill="#B7C0E6"/><circle r="7" fill="#6E7AB3"/></g>`;
  m += `<rect x="562" y="134" width="16" height="16" fill="#8A95C6"/>`;
  // floor shadow
  m += `<ellipse cx="575" cy="606" rx="190" ry="20" fill="#000" opacity="0.3"/>`;
  // bucket interior (behind water)
  m += `<ellipse cx="575" cy="380" rx="156" ry="28" fill="#0D2A4E"/>`;
  const L = 0.05 + 0.9 * prog(lt, 0.4, 3.6, ease.inOut);
  const yw = lerp(412, 384, L);
  const stainP = prog(lt, 1.8, 1.6, ease.inOut);
  const wc = mix('#86D6E8', '#C98A5A', prog(lt, 1.6, 2.6) * 0.8);
  let wat = `<ellipse cx="575" cy="${f(yw)}" rx="${f(lerp(140, 156, L))}" ry="${f(lerp(25, 29, L))}" fill="${wc}" opacity="0.88"/>`;
  wat += `<ellipse cx="545" cy="${f(yw - 4)}" rx="${f(lerp(60, 90, L))}" ry="6" fill="#FFFFFF" opacity="${(0.18 + 0.1 * Math.sin(lt * 7)).toFixed(2)}"/>`;
  const streamOn = lt > 0.35;
  if (streamOn) {
    for (let k = 0; k < 3; k++) {
      const r = ((lt * 1.3 + k / 3) % 1);
      wat += `<ellipse cx="575" cy="${f(yw)}" rx="${f(14 + 90 * r)}" ry="${f((14 + 90 * r) * 0.2)}" fill="none" stroke="#FFFFFF" stroke-width="2.5" opacity="${(0.7 * (1 - r)).toFixed(2)}"/>`;
    }
  }
  if (stainP > 0) wat += `<path d="M421,386 A154,30 0 0 1 729,386" fill="none" stroke="${C.rustLt}" stroke-width="9" stroke-dasharray="40 9 64 14 30 8" opacity="${(0.55 * stainP).toFixed(2)}"/>`;
  m += `<g clip-path="url(#s02rim)">${wat}</g>`;
  // stream from spout to water surface, with shimmer
  if (streamOn) {
    const fall = prog(lt, 0.35, 0.3, ease.in);
    const yb = lerp(208, yw, fall);
    const wob = 2.5 * Math.sin(lt * 23);
    m += `<path d="M568,208 Q${f(571 + wob)},${f((208 + yb) / 2)} 570,${f(yb)} L580,${f(yb)} Q${f(580 + wob)},${f((208 + yb) / 2)} 582,208 Z" fill="#BFEAF6" opacity="0.88"/>`;
    m += `<path d="M573,208 L573,${f(yb)}" stroke="#FFFFFF" stroke-width="2.5" stroke-dasharray="16 22" stroke-dashoffset="${f(-lt * 520)}" opacity="0.9"/>`;
    m += `<path d="M578,208 L578,${f(yb)}" stroke="${C.aqua}" stroke-width="2" stroke-dasharray="10 30" stroke-dashoffset="${f(-lt * 610)}" opacity="0.8"/>`;
    for (let k = 0; k < 6; k++) {
      const p = (lt * 2.2 + k / 6) % 1, dir = k % 2 ? 1 : -1;
      m += `<circle cx="${f(575 + dir * (8 + 30 * p) * (1 + (k % 3) * 0.3))}" cy="${f(yw - 6 - 34 * Math.sin(Math.PI * p))}" r="${f(3.2 * (1 - p) + 1)}" fill="#E3F5FA" opacity="${(0.85 * (1 - p)).toFixed(2)}"/>`;
    }
  }
  // bucket body (front) covers the lower half of the opening
  m += `<path d="M419,380 A156,28 0 0 0 731,380 L695,598 A120,18 0 0 1 455,598 Z" fill="url(#s02bkt)"/>`;
  m += `<path d="M436,440 A142,24 0 0 0 714,440" fill="none" stroke="#5DA3D8" stroke-width="5" opacity="0.5"/>`;
  m += `<path d="M445,500 A132,22 0 0 0 705,500" fill="none" stroke="#1A4672" stroke-width="5" opacity="0.6"/>`;
  m += `<ellipse cx="575" cy="380" rx="158" ry="30" fill="none" stroke="#4E9DD6" stroke-width="10"/>`;
  m += `<path d="M426,394 Q575,500 724,394" fill="none" stroke="#9FB0D8" stroke-width="4"/>`;
  // rust drips running down the outside
  const drips = [[466, 0.55, 70], [528, 0.2, 95], [612, 0.4, 60], [688, 0.1, 85]];
  drips.forEach(([x, dl, len], i) => {
    const p = prog(lt, 2.4 + dl, 1.3, ease.out);
    if (p <= 0) return;
    const y0 = 380 + 30 * Math.sqrt(1 - Math.pow((x - 575) / 158, 2));
    m += `<path d="M${x},${f(y0)} L${x},${f(y0 + len * p)}" stroke="${C.rust}" stroke-width="${7 - (i % 2) * 2}" stroke-linecap="round" opacity="0.9"/><circle cx="${x}" cy="${f(y0 + len * p + 3)}" r="${5 - (i % 2)}" fill="${C.rust}"/>`;
  });
  // the stain ring draws itself around the rim
  if (stainP > 0) {
    const a = 158, bb = 30, circ = Math.PI * (3 * (a + bb) - Math.sqrt((3 * a + bb) * (a + 3 * bb)));
    m += `<ellipse cx="575" cy="380" rx="${a}" ry="${bb}" fill="none" stroke="${C.rustLt}" stroke-width="26" opacity="${(0.22 * stainP).toFixed(2)}" stroke-dasharray="${f(circ * stainP)} ${f(circ)}" transform="rotate(180 575 380)"/>`;
    m += `<ellipse cx="575" cy="380" rx="${a}" ry="${bb}" fill="none" stroke="${C.rust}" stroke-width="13" stroke-linecap="round" stroke-dasharray="${f(circ * stainP)} ${f(circ)}" transform="rotate(180 575 380)"/>`;
    m += `<ellipse cx="575" cy="381" rx="${a}" ry="${bb}" fill="none" stroke="#E07A3A" stroke-width="4" stroke-dasharray="22 16 40 12" opacity="${(0.8 * stainP).toFixed(2)}" transform="rotate(180 575 380)"/>`;
    // dramatic ping once complete
    for (let k = 0; k < 2; k++) {
      const q = prog(lt, 3.4 + k * 0.45, 0.9, ease.out);
      if (q > 0 && q < 1) m += `<ellipse cx="575" cy="380" rx="${f(a + 90 * q)}" ry="${f(bb + 22 * q)}" fill="none" stroke="${C.rustLt}" stroke-width="${f(6 * (1 - q) + 1)}" opacity="${(0.8 * (1 - q)).toFixed(2)}"/>`;
    }
  }
  s += `<g transform="translate(${f(-14 * lt)} 0) translate(575 400) scale(${push.toFixed(4)}) translate(-575 -400)">${m}</g>`;
  return s;
}

// ---------- (d) weak lather, more shampoo ----------
function panelD(lt) {
  let s = `<defs><linearGradient id="s02wallD" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#26347A"/><stop offset="1" stop-color="#141C50"/></linearGradient></defs>`;
  s += `<rect x="-50" y="-50" width="${PW + 100}" height="${PH + 100}" fill="url(#s02wallD)"/>`;
  // background: mirror with a slow light sweep, steam wisps
  let bgl = `<rect x="140" y="50" width="640" height="600" rx="40" fill="#2E3D84" opacity="0.45" stroke="#43529F" stroke-width="4"/>`;
  const sweep = -300 + ((lt * 160) % 1400);
  bgl += `<path d="M${f(sweep)},50 L${f(sweep + 120)},50 L${f(sweep - 80)},650 L${f(sweep - 200)},650 Z" fill="#FFFFFF" opacity="0.05"/>`;
  for (let k = 0; k < 3; k++) {
    const y0 = 600 - ((lt * 40 + k * 120) % 360);
    bgl += `<path d="M${880 + k * 70},${f(y0)} c-30,-40 30,-60 0,-100 c-30,-40 30,-60 0,-100" fill="none" stroke="#C9D3F5" stroke-width="6" stroke-linecap="round" opacity="${(0.08 * Math.sin(Math.PI * ((lt * 40 + k * 120) % 360) / 360)).toFixed(3)}"/>`;
  }
  s += `<g transform="translate(${f(-6 * lt)} 0)">${bgl}</g>`;
  const push = lerp(1, 1.06, prog(lt, 0, 6.5, ease.inOut));
  let m = '';
  // head profile (facing right)
  const head = 'M200,700 C210,620 280,590 318,566 C306,524 288,486 288,444 C280,330 340,250 420,244 C500,239 546,298 550,350 L553,380 C555,396 564,410 574,426 L588,452 C591,460 582,464 568,466 C571,473 573,479 566,485 C571,491 569,499 561,503 C563,516 557,529 544,536 C524,546 500,549 486,553 C482,575 487,592 502,606 C562,624 640,650 680,700 Z';
  m += `<path d="${head}" fill="#0A0F30" stroke="${C.aqua}" stroke-opacity="0.38" stroke-width="3"/>`;
  // dull, rough hair mass
  m += `<path d="M286,452 C266,330 330,226 432,224 C522,222 568,290 558,352 C530,318 484,300 430,304 C362,310 322,360 318,452 Z" fill="#04071E"/>`;
  let strands = '';
  for (let k = 0; k < 9; k++) {
    const x0 = 320 + k * 26, j = 4 * Math.sin(lt * 1.5 + k);
    strands += `M${x0},${f(250 + Math.abs(k - 4) * 9)} q${f(-14 + j)},40 ${f(-30 + j)},${f(90 - Math.abs(k - 4) * 6)} `;
  }
  m += `<path d="${strands}" fill="none" stroke="#3A4380" stroke-width="2.5" opacity="0.7"/>`;
  for (let k = 0; k < 7; k++) m += `<path d="M${330 + k * 30},${f(236 + Math.abs(k - 3) * 6)} l${f(-6 + (k % 3) * 6)},-10" stroke="#3A4380" stroke-width="2" opacity="0.6"/>`;
  // frown hint: furrowed brow strokes inside the silhouette edge
  const fr = prog(lt, 1.5, 0.6, ease.out);
  m += `<path d="M524,374 L548,386 M530,362 L546,368" stroke="#4A5596" stroke-width="3.5" stroke-linecap="round" opacity="${(0.9 * fr).toFixed(2)}"/>`;
  // weak foam bubbles that shrink and pop
  const shrink = prog(lt, 1.0, 4.5, ease.inOut);
  let foam = '';
  for (let i = 0; i < 18; i++) {
    const th = Math.PI * (1.08 + 0.84 * (i / 17)) + 0.08 * rnd(i);
    const rr = 130 + 24 * rnd(i + 20);
    const cx = 428 + rr * Math.cos(th), cy = 372 + rr * 0.95 * Math.sin(th) + 8;
    const r0 = 10 + 20 * rnd(i + 5);
    const app = prog(lt, 0.25 + i * 0.035, 0.5, ease.outBack);
    if (app <= 0) continue;
    const popT = 1.4 + rnd(i + 33) * 4.2;
    const drift = 5 * Math.sin(lt * 1.8 + i);
    if (lt < popT || i % 4 === 1) {
      const r = r0 * app * (1 - 0.6 * shrink);
      foam += `<circle cx="${f(cx + drift)}" cy="${f(cy)}" r="${f(r)}" fill="#E3F5FA" fill-opacity="0.18" stroke="#E3F5FA" stroke-opacity="0.75" stroke-width="2"/>`;
      foam += `<circle cx="${f(cx + drift - r * 0.35)}" cy="${f(cy - r * 0.35)}" r="${f(r * 0.2)}" fill="#FFFFFF" opacity="0.7"/>`;
    } else {
      const q = clamp((lt - popT) / 0.3);
      if (q < 1) {
        const r = r0 * (1 - 0.6 * shrink);
        foam += `<circle cx="${f(cx + drift)}" cy="${f(cy)}" r="${f(r * (1 + 0.8 * q))}" fill="none" stroke="#E3F5FA" stroke-width="${f(2 * (1 - q) + 0.5)}" opacity="${(0.8 * (1 - q)).toFixed(2)}"/>`;
        for (let d = 0; d < 4; d++) { const a = d * Math.PI / 2 + i; foam += `<circle cx="${f(cx + drift + Math.cos(a) * r * (1.2 + q))}" cy="${f(cy + Math.sin(a) * r * (1.2 + q))}" r="2" fill="#E3F5FA" opacity="${(1 - q).toFixed(2)}"/>`; }
      }
    }
  }
  m += foam;
  // hand rubbing the crown, arm from behind the head
  const rub = 10 * Math.sin(lt * 4.2), hxp = 372 + rub, hyp = 238 + 3 * Math.cos(lt * 4.2);
  const arm = `M300,720 L${f(236 + rub * 0.3)},330 L${f(hxp - 18)},${f(hyp + 8)}`;
  m += `<path d="${arm}" fill="none" stroke="${C.aqua}" stroke-opacity="0.35" stroke-width="38" stroke-linecap="round" stroke-linejoin="round"/>`;
  m += `<path d="${arm}" fill="none" stroke="#121A4C" stroke-width="33" stroke-linecap="round" stroke-linejoin="round"/>`;
  m += `<ellipse cx="${f(hxp)}" cy="${f(hyp)}" rx="40" ry="22" fill="#121A4C" transform="rotate(-14 ${f(hxp)} ${f(hyp)})" stroke="${C.aqua}" stroke-opacity="0.3" stroke-width="2"/>`;
  m += `<path d="M${f(hxp + 18)},${f(hyp - 12)} q34,-4 54,18 M${f(hxp + 20)},${f(hyp - 2)} q34,0 50,24 M${f(hxp + 16)},${f(hyp + 8)} q28,4 40,26" fill="none" stroke="#121A4C" stroke-width="14" stroke-linecap="round"/>`;
  // shampoo bottle tipping, the pour stream grows
  const tilt = lerp(18, 34, prog(lt, 1.2, 4.5, ease.inOut));
  const bx = 930, by = 220, rad = tilt * Math.PI / 180;
  const nz = [bx - 80 * Math.sin(rad), by + 80 * Math.cos(rad)];
  const enterB = prog(lt, 0.3, 0.7, ease.out);
  let bt = `<g transform="translate(${bx} ${f(by - 60 * (1 - enterB))}) rotate(${f(tilt)})" opacity="${enterB.toFixed(2)}">`;
  bt += `<rect x="-44" y="-140" width="88" height="186" rx="26" fill="#DCE3F7"/><rect x="-44" y="-140" width="24" height="186" rx="12" fill="#FFFFFF" opacity="0.35"/>`;
  bt += `<rect x="-36" y="-92" width="72" height="70" rx="8" fill="${C.aqua}" opacity="0.4"/>`;
  bt += `<rect x="-20" y="42" width="40" height="26" rx="6" fill="${C.teal}"/><rect x="-6" y="66" width="12" height="14" rx="3" fill="${C.teal}"/></g>`;
  // cupped palm
  const palm = 'M812,548 C840,600 930,612 1000,560 C1012,556 1024,566 1016,580 C980,640 880,654 826,620 C800,602 796,566 812,548 Z';
  const wrist = 'M960,600 L1180,690 L1180,760 L900,640 Z';
  const pourOn = prog(lt, 1.6, 0.45, ease.in);
  const thick = lerp(3, 15, prog(lt, 2.4, 4.0, ease.inOut));
  const pool = prog(lt, 1.9, 4.6, ease.out);
  let pp = `<path d="${wrist}" fill="#0D1340"/><path d="${palm}" fill="#0D1340" stroke="${C.aqua}" stroke-opacity="0.35" stroke-width="2.5"/>`;
  if (pourOn > 0) {
    const yEnd = lerp(nz[1], 566, pourOn);
    const cxp = (nz[0] + 905) / 2 - 20;
    pp += `<path d="M${f(nz[0] - thick / 2)},${f(nz[1])} Q${f(cxp)},${f((nz[1] + yEnd) / 2)} ${f(905 - thick / 2)},${f(yEnd)} L${f(905 + thick / 2)},${f(yEnd)} Q${f(cxp + thick)},${f((nz[1] + yEnd) / 2)} ${f(nz[0] + thick / 2)},${f(nz[1])} Z" fill="#EEF2FD" opacity="0.92"/>`;
    pp += `<path d="M${f(nz[0])},${f(nz[1])} Q${f(cxp + thick / 2)},${f((nz[1] + yEnd) / 2)} 905,${f(yEnd)}" fill="none" stroke="${C.aqua}" stroke-width="2" stroke-dasharray="12 26" stroke-dashoffset="${f(-lt * 300)}" opacity="0.7"/>`;
  }
  if (pool > 0) pp += `<ellipse cx="905" cy="572" rx="${f(12 + 64 * pool)}" ry="${f(5 + 14 * pool)}" fill="#EEF2FD" opacity="0.92"/><ellipse cx="${f(890)}" cy="568" rx="${f(6 + 20 * pool)}" ry="4" fill="#FFFFFF" opacity="0.8"/>`;
  m += `<g transform="translate(${f(-10 * lt)} 0)">${bt}${pp}</g>`;
  s += `<g transform="translate(570 360) scale(${push.toFixed(4)}) translate(-570 -360)">${m}</g>`;
  return s;
}

// ---------- left column: movement motif, words, labels ----------
function routes(t) {
  const op = prog(t, 0.1, 0.8, ease.out) * (1 - prog(t, 3.0, 0.6, ease.inOut));
  if (op <= 0) return '';
  const pin = [470, 330];
  const origins = [[110, 740], [250, 800], [90, 560], [390, 780], [180, 650]];
  let s = `<g opacity="${op.toFixed(3)}">`;
  origins.forEach(([ox, oy], i) => {
    const c = [ox + 40 + i * 20, pin[1] + 40 - i * 10];
    const draw = prog(t, 0.2 + i * 0.12, 0.9, ease.out);
    s += `<path d="M${ox},${oy} Q${c[0]},${c[1]} ${pin[0]},${pin[1] + 36}" fill="none" stroke="${C.aqua}" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 13" opacity="${(0.55 * draw).toFixed(2)}"/>`;
    s += `<circle cx="${ox}" cy="${oy}" r="${f(7 * draw)}" fill="${C.pale}" opacity="0.6"/>`;
    for (let k = 0; k < 4; k++) {
      const p = (t * 0.42 + k / 4 + i * 0.13) % 1;
      const u = 1 - p, x = u * u * ox + 2 * u * p * c[0] + p * p * pin[0], y = u * u * oy + 2 * u * p * c[1] + p * p * (pin[1] + 36);
      s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(4 + 2 * Math.sin(Math.PI * p))}" fill="${C.aqua}" opacity="${(draw * Math.sin(Math.PI * p)).toFixed(2)}"/>`;
    }
  });
  const pp = prog(t, 0.5, 0.6, ease.outBack);
  const pr = (t * 0.8) % 1;
  s += `<ellipse cx="${pin[0]}" cy="${pin[1] + 38}" rx="${f(18 + 70 * pr)}" ry="${f(6 + 22 * pr)}" fill="none" stroke="${C.aqua}" stroke-width="2.5" opacity="${(0.7 * (1 - pr)).toFixed(2)}"/>`;
  s += `<g transform="translate(${pin[0]} ${pin[1]}) scale(${pp.toFixed(3)})"><path d="M0,38 C-10,20 -30,4 -30,-14 A30,30 0 0 1 30,-14 C30,4 10,20 0,38 Z" fill="${C.aqua}"/><circle cx="0" cy="-14" r="11" fill="${C.navy3}"/></g>`;
  return s + '</g>';
}
function words(t) {
  const out = prog(t, 9.8, 0.6, ease.inOut);
  if (out >= 1) return '';
  const items = [['New city', 3.7, C.white, 330], ['New hall', 4.6, C.white, 430], ['New water', 5.5, C.amber, 530]];
  let s = `<g opacity="${(1 - out).toFixed(3)}" transform="translate(0 ${f(-24 * out)})">`;
  const bar = prog(t, 3.5, 0.6, ease.out);
  if (bar > 0) s += `<rect x="80" y="232" width="${f(90 * bar)}" height="6" rx="3" fill="${C.aqua}"/>`;
  items.forEach(([w, ti, col, y], i) => {
    const op = prog(t, ti, 0.22, ease.out);
    if (op <= 0) return;
    const p = prog(t, ti, 0.55, ease.outBack);
    let sc = lerp(1.35, 1, p);
    if (i === 2) sc *= 1 + 0.12 * Math.sin(Math.PI * prog(t, ti + 0.35, 0.5, ease.inOut));
    s += `<g transform="translate(80 ${y}) scale(${sc.toFixed(4)})">${text(0, 0, w, { size: 72, weight: 600, fill: col, opacity: op })}</g>`;
  });
  // soft amber glow line under "New water"
  const gl = prog(t, 6.0, 0.7, ease.out);
  if (gl > 0) s += `<rect x="82" y="556" width="${f(340 * gl)}" height="5" rx="2.5" fill="${C.amber}" opacity="0.8"/>`;
  return s + '</g>';
}
function labels(t) {
  const items = [['Less lather', 11.4, 'down'], ['Rough, dull feel', 12.7, 'zig'], ['More shampoo every wash', 14.1, 'plus']];
  const out = prog(t, 16.4, 0.5, ease.inOut);
  let s = `<g opacity="${(1 - out).toFixed(3)}">`;
  items.forEach(([w, ti, ic], i) => {
    const p = prog(t, ti, 0.55, ease.out);
    if (p <= 0) return;
    const y = 360 + i * 100, x = 80 - 30 * (1 - p);
    const ip = prog(t, ti, 0.6, ease.outBack);
    let g = `<g transform="translate(${f(x + 24)} ${y - 14}) scale(${ip.toFixed(3)})"><circle r="24" fill="${C.rust}"/>`;
    if (ic === 'down') g += `<path d="M0,-11 L0,10 M-8,3 L0,11 L8,3" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    if (ic === 'zig') g += `<path d="M-12,2 L-6,-6 L0,4 L6,-6 L12,2" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    if (ic === 'plus') g += `<path d="M0,-10 L0,10 M-10,0 L10,0" stroke="#fff" stroke-width="3.5" stroke-linecap="round"/>`;
    g += '</g>';
    s += g + text(x + 70, y, w, { size: 38, weight: 600, fill: C.white, opacity: p });
  });
  return s + '</g>';
}
function pills(t) {
  const act = t < 3.5 ? 0 : t < 6.5 ? 1 : t < 10.5 ? 2 : 3;
  let s = '', x = PX;
  for (let i = 0; i < 4; i++) {
    const on = i === act;
    const enter = [0, 3.5, 6.5, 10.5][i];
    const p = on ? prog(t, enter, 0.5, ease.out) : 0;
    const w = 16 + 52 * (on ? (i === 0 ? 1 : p) : 0);
    s += `<rect x="${f(x)}" y="858" width="${f(w)}" height="8" rx="4" fill="${on ? C.aqua : '#FFFFFF'}" opacity="${on ? 0.95 : 0.25}"/>`;
    x += w + 12;
  }
  return s;
}

module.exports = {
  id: 's02',
  duration: 17,
  render(t) {
    let s = bg(t, { glow: 0.45 });
    s += `<defs><clipPath id="s02clip"><rect width="${PW}" height="${PH}" rx="30"/></clipPath></defs>`;
    const A = panelState(t, 0, 3.5), B = panelState(t, 3.5, 6.5), Cc = panelState(t, 6.5, 10.5), D = panelState(t, 10.5, null);
    if (A) s += panel(A, panelA(t));
    if (B) s += panel(B, panelB(t - 3.5));
    if (Cc) s += panel(Cc, panelC(t - 6.5));
    if (D) s += panel(D, panelD(t - 10.5));
    s += routes(t) + words(t) + labels(t) + pills(t);
    return s;
  },
};
