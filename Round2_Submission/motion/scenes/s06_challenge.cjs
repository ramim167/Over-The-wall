// Scene 6 · #PaniCheckChallenge: headline, three phone "videos" landing on meter colours, a share card that
// flies between phones, the steps strip, then a campus Pani Lab booth.
const { C, text, count, prog, ease, lerp, clamp, bg, tag, img, METER } = require('../engine.cjs');

const PW = 300, PH = 550, PY = 232;
const PHONES = [
  { cx: 560, rot: -4, land: 0, dip: 4.3, enter: 3.45 },
  { cx: 960, rot: 0, land: 2, dip: 5.1, enter: 3.6 },
  { cx: 1360, rot: 4, land: 3, dip: 9.2, enter: 3.75 },
];
const SKIN = '#C98E64', SKIN_D = '#A06A45', SIL = '#2C3784';
const ACCEPT = 8.35; // share card lands on phone 3
const EXIT = 11.5; // phones leave, booth arrives

const f1 = (v) => v.toFixed(1);

// Strip pad bottom (screen coords) over the dip timeline tau (0 = hand starts down).
function padY(tau) {
  if (tau <= 0) return -80;
  if (tau < 0.5) return lerp(-80, 420, ease.inOut(tau / 0.5));
  if (tau < 0.72) return 420;
  if (tau < 1.05) return lerp(420, 250, ease.out((tau - 0.72) / 0.33));
  return 250 + 5 * Math.sin((tau - 1.05) * 3);
}

function handStrip(pb, col, colP) {
  const top = pb - 165;
  let s = `<rect x="141" y="${f1(top)}" width="18" height="165" rx="4" fill="#F4F7FF"/>`;
  s += `<rect x="141" y="${f1(pb - 34)}" width="18" height="34" rx="4" fill="#DCE4F2"/>`;
  s += `<rect x="141" y="${f1(pb - 34)}" width="18" height="34" rx="4" fill="${col}" opacity="${colP}"/>`;
  s += `<path d="M150,${f1(top + 4)} L250,${f1(top - 190)}" stroke="${SKIN}" stroke-width="50" stroke-linecap="round"/>`;
  s += `<rect x="118" y="${f1(top - 30)}" width="64" height="56" rx="22" fill="${SKIN}"/>`;
  for (let k = 0; k < 3; k++) s += `<path d="M124,${f1(top - 14 + k * 13)} L150,${f1(top - 14 + k * 13)}" stroke="${SKIN_D}" stroke-width="3" stroke-linecap="round"/>`;
  s += `<ellipse cx="176" cy="${f1(top - 8)}" rx="12" ry="19" fill="${SKIN_D}" opacity="0.55"/>`;
  return s;
}

function phone(i, t) {
  const p = PHONES[i];
  const en = prog(t, p.enter, 0.75, ease.outBack);
  const ex = prog(t, EXIT + i * 0.08, 0.55, ease.in);
  if (t < p.enter || ex >= 1) return '';
  const bob = 7 * Math.sin(t * 1.6 + i * 1.3);
  const x0 = p.cx - PW / 2, y0 = PY + (1 - en) * 320 + ex * 520 + bob;
  const op = clamp((t - p.enter) / 0.3) * (1 - ex);
  const [col, lab] = METER[p.land];
  const tau = t - p.dip, L = p.dip + 1.0;
  let s = `<g transform="translate(${f1(x0)} ${f1(y0)}) rotate(${p.rot} ${PW / 2} ${PH / 2})" opacity="${op.toFixed(3)}">`;
  // Landed glow ring around the handset.
  const g = prog(t, L, 0.4, ease.out) * (0.55 + 0.25 * Math.sin(t * 5));
  if (t > L) s += `<rect x="-10" y="-10" width="${PW + 20}" height="${PH + 20}" rx="50" fill="none" stroke="${col}" stroke-width="5" opacity="${g.toFixed(3)}"/>`;
  s += `<rect x="-4" y="120" width="6" height="60" rx="3" fill="#3A4790"/><rect x="${PW - 2}" y="150" width="6" height="90" rx="3" fill="#3A4790"/>`;
  s += `<rect x="0" y="0" width="${PW}" height="${PH}" rx="44" fill="#070B24" stroke="#3A4790" stroke-width="5"/>`;
  s += `<g clip-path="url(#s06clip)">`;
  s += `<rect x="12" y="12" width="${PW - 24}" height="${PH - 24}" fill="url(#s06scr)"/>`;
  // Story progress bars + rec dot.
  for (let k = 0; k < 3; k++) {
    const fp = clamp(((t - p.enter) / 7.5) * 3 - k);
    s += `<rect x="${30 + k * 82}" y="30" width="76" height="5" rx="2.5" fill="#FFFFFF" opacity="0.25"/><rect x="${30 + k * 82}" y="30" width="${f1(76 * fp)}" height="5" rx="2.5" fill="#FFFFFF"/>`;
  }
  s += `<circle cx="38" cy="58" r="7" fill="#FF4D5E" opacity="${(0.55 + 0.45 * Math.sin(t * 5 + i)).toFixed(2)}"/>`;
  // Side icons (heart pops on landing, share arrow).
  const hp = prog(t, L, 0.5, ease.outBack), hs = 1 + 0.5 * Math.sin(Math.PI * clamp((t - L) / 0.5));
  s += `<g transform="translate(256 400) scale(${hs.toFixed(3)})"><path d="M0,9 C-15,-2 -12,-15 -4,-13 C-2,-12 0,-10 0,-8 C0,-10 2,-12 4,-13 C12,-15 15,-2 0,9 Z" fill="${hp > 0.01 ? '#FF4D5E' : 'none'}" stroke="#FFFFFF" stroke-width="2.5" opacity="0.9"/></g>`;
  s += `<path transform="translate(256 446)" d="M-11,0 L11,-9 L5,11 L1,3 Z" fill="#FFFFFF" opacity="0.75"/>`;
  // Glass of water with idle ripples.
  s += `<path d="M72,262 L228,262 L214,458 Q212,470 200,470 L100,470 Q88,470 86,458 Z" fill="#FFFFFF" fill-opacity="0.05"/>`;
  const pb = padY(tau);
  const colP = clamp((tau - 0.75) / 0.35);
  s += handStrip(pb, col, colP);
  const pts = [];
  for (let k = 0; k <= 12; k++) {
    const x = 77 + k * (146 / 12);
    pts.push(`${f1(x)},${f1(332 + 4 * Math.sin(x * 0.07 + t * 4 + i))}`);
  }
  s += `<path d="M${pts.join(' L')} L214,458 Q212,470 200,470 L100,470 Q88,470 86,458 Z" fill="${C.aqua}" opacity="0.55"/>`;
  for (let r = 0; r < 3; r++) {
    const rp = clamp((tau - 0.42 - r * 0.22) / 0.9);
    if (rp > 0 && rp < 1) s += `<ellipse cx="150" cy="334" rx="${f1(12 + 66 * rp)}" ry="${f1((12 + 66 * rp) * 0.2)}" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="${(0.8 * (1 - rp)).toFixed(2)}"/>`;
  }
  const idle = (t * 0.7 + i * 0.37) % 1;
  s += `<ellipse cx="150" cy="334" rx="${f1(8 + 50 * idle)}" ry="${f1((8 + 50 * idle) * 0.2)}" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="${(0.35 * (1 - idle)).toFixed(2)}"/>`;
  s += `<path d="M72,262 L228,262 L214,458 Q212,470 200,470 L100,470 Q88,470 86,458 Z" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-opacity="0.55"/>`;
  s += `<path d="M92,282 L102,440" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" opacity="0.18"/>`;
  // Burst + confetti when the pad lands on its colour.
  const b = clamp((t - L) / 1.1);
  if (b > 0 && b < 1) {
    const cx = 150, cy = pb - 17, eb = ease.out(b);
    s += `<circle cx="${cx}" cy="${f1(cy)}" r="${f1(14 + 100 * eb)}" fill="none" stroke="${col}" stroke-width="${f1(8 * (1 - b))}" opacity="${(1 - b).toFixed(2)}"/>`;
    for (let k = 0; k < 18; k++) {
      const a = (k / 18) * Math.PI * 2 + i, sp = 80 + (k % 4) * 32;
      const x = cx + Math.cos(a) * sp * eb, y = cy + Math.sin(a) * sp * eb + 150 * b * b;
      const cc = [col, '#FFFFFF', C.aqua][k % 3];
      s += `<rect x="-5" y="-3" width="10" height="6" fill="${cc}" opacity="${(1 - b * b).toFixed(2)}" transform="translate(${f1(x)} ${f1(y)}) rotate(${Math.round(k * 40 + b * 400)})"/>`;
    }
  }
  // Result pill.
  const lp = prog(t, L + 0.1, 0.5, ease.outBack);
  if (lp > 0) s += `<g transform="translate(150 506) scale(${lp.toFixed(3)})"><rect x="-95" y="-23" width="190" height="46" rx="23" fill="${col}"/>${text(0, 10, lab, { size: 27, weight: 700, anchor: 'middle' })}</g>`;
  // Phone 3: "Challenge accepted" toast once the share card arrives.
  if (i === 2) {
    const tp = prog(t, ACCEPT, 0.5, ease.outBack);
    if (tp > 0) {
      s += `<g transform="translate(150 106) scale(${tp.toFixed(3)})"><rect x="-130" y="-25" width="260" height="50" rx="25" fill="#FFFFFF"/>
        <circle cx="-104" cy="0" r="14" fill="${C.aqua}"/><path d="M-111,0 L-106,6 L-97,-6" stroke="#FFFFFF" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        ${text(-84, 7, 'Challenge accepted', { size: 20, weight: 700, fill: C.navy })}</g>`;
    }
  }
  s += `</g>`;
  s += `<rect x="${PW / 2 - 40}" y="20" width="80" height="16" rx="8" fill="#070B24"/>`;
  s += `</g>`;
  return s;
}

// Share card flying from phone 2 to phone 3 on an arc.
function shareCard(t) {
  const ap = prog(t, 6.5, 0.45, ease.outBack);
  if (t < 6.5 || t > ACCEPT + 0.2) return '';
  const f = prog(t, 6.95, ACCEPT - 6.95, ease.inOut);
  const x = lerp(960, 1360, f), y = lerp(480, 340, f) - 170 * Math.sin(Math.PI * f);
  let sc = t < 6.95 ? 0.5 * ap : 0.5 + 0.5 * Math.sin(Math.PI * f) - 0.25 * f;
  const fade = 1 - clamp((t - ACCEPT + 0.05) / 0.2);
  sc *= lerp(1, 0.4, clamp((t - ACCEPT + 0.15) / 0.3));
  let s = '';
  // Dotted trail.
  if (f > 0) {
    const pts = [];
    for (let k = 0; k <= 24; k++) {
      const q = (k / 24) * f;
      pts.push(`${f1(lerp(960, 1360, q))},${f1(lerp(480, 340, q) - 170 * Math.sin(Math.PI * q))}`);
    }
    s += `<path d="M${pts.join(' L')}" fill="none" stroke="${C.aqua}" stroke-width="4" stroke-dasharray="2 14" stroke-linecap="round" opacity="${(0.8 * fade).toFixed(2)}"/>`;
  }
  const rot = (f - 0.5) * 14;
  s += `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${sc.toFixed(3)})" opacity="${fade.toFixed(2)}">
    <rect x="-372" y="-50" width="744" height="100" rx="50" fill="#000000" opacity="0.25" transform="translate(6 10)"/>
    <rect x="-372" y="-50" width="744" height="100" rx="50" fill="#FFFFFF"/>
    <circle cx="-318" cy="0" r="30" fill="${METER[2][0]}"/><path d="M-318,-15 C-318,-15 -330,0 -330,6 A12,12 0 0 0 -306,6 C-306,0 -318,-15 -318,-15 Z" fill="#FFFFFF"/>
    ${text(-272, 10, 'My hall water: HARD · #PaniCheckChallenge', { size: 28, weight: 700, fill: C.navy })}</g>`;
  return s;
}

function steps(t) {
  const items = ['Test', 'Share your colour', 'Challenge a friend'];
  const ws = items.map((s) => s.length * 16.5 + 60);
  const gap = 74, total = ws.reduce((a, b) => a + b, 0) + gap * 2;
  const ex = prog(t, EXIT - 0.1, 0.5, ease.in);
  let x = 960 - total / 2, s = `<g opacity="${(1 - ex).toFixed(3)}">`;
  const starts = [4.4, 6.5, ACCEPT], ends = [6.5, ACCEPT, 99];
  items.forEach((lab, k) => {
    const pp = prog(t, 4.5 + k * 0.18, 0.55, ease.outBack);
    const act = Math.max(prog(t, starts[k], 0.3) - prog(t, ends[k], 0.3), prog(t, 10.4, 0.4));
    const cx = x + ws[k] / 2, cy = 840, sc = pp * (1 + 0.06 * act);
    if (pp > 0) {
      s += `<g transform="translate(${f1(cx)} ${cy}) scale(${sc.toFixed(3)})">
        <rect x="${f1(-ws[k] / 2)}" y="-28" width="${f1(ws[k])}" height="56" rx="28" fill="#FFFFFF" fill-opacity="0.08" stroke="#FFFFFF" stroke-opacity="0.3" stroke-width="2"/>
        <rect x="${f1(-ws[k] / 2)}" y="-28" width="${f1(ws[k])}" height="56" rx="28" fill="${C.aqua}" opacity="${act.toFixed(3)}"/>
        ${text(0, 10, lab, { size: 29, weight: 600, anchor: 'middle', fill: act > 0.5 ? C.white : C.pale })}</g>`;
    }
    if (k < 2) {
      const ap = prog(t, 4.6 + k * 0.18, 0.4, ease.out);
      s += text(x + ws[k] + gap / 2, 851, '→', { size: 34, weight: 600, anchor: 'middle', fill: C.aqua, opacity: ap });
    }
    x += ws[k] + gap;
  });
  return s + '</g>';
}

function hashtag(t) {
  const hp = prog(t, 3.55, 0.7, ease.outBack);
  const ex = prog(t, EXIT - 0.1, 0.5, ease.in);
  if (hp <= 0 || ex >= 1) return '';
  const sx = 200 + ((t - 3.6) % 2.6) / 2.6 * 1600;
  return `<defs><linearGradient id="s06sh" gradientUnits="userSpaceOnUse" x1="${f1(sx - 260)}" y1="0" x2="${f1(sx + 260)}" y2="0">
      <stop offset="0" stop-color="#FFFFFF"/><stop offset="0.45" stop-color="#FFFFFF"/><stop offset="0.5" stop-color="#8FEAFF"/><stop offset="0.55" stop-color="#FFFFFF"/><stop offset="1" stop-color="#FFFFFF"/></linearGradient></defs>
    <g transform="translate(960 ${f1(178 - 60 * ex)}) scale(${hp.toFixed(3)})" opacity="${(1 - ex).toFixed(3)}">
    <text x="0" y="0" font-family="Segoe UI" font-size="100" font-weight="800" fill="url(#s06sh)" text-anchor="middle" letter-spacing="${f1(12 * (1 - hp))}"><tspan fill="${C.aqua}">#</tspan>PaniCheckChallenge</text></g>`;
}

function intro(t) {
  const ex = prog(t, 3.0, 0.55, ease.in);
  if (ex >= 1) return '';
  let s = `<g opacity="${(1 - ex).toFixed(3)}" transform="translate(0 ${f1(-70 * ex)})">`;
  const lines = [['No', 'shampoo', 'we', 'found', 'offers'], ['a', 'water', 'test', 'in', 'the', 'pack']];
  let w = 0;
  lines.forEach((words, li) => {
    const lp = prog(t, 0.2 + li * 0.35, 0.7, ease.out);
    const tsp = words.map((wd) => {
      const o = prog(t, 0.2 + w++ * 0.08, 0.4);
      const hl = wd === 'water' || wd === 'test';
      return `<tspan fill="${hl ? C.aqua : C.white}" fill-opacity="${o.toFixed(3)}">${wd}</tspan>`;
    }).join(' ');
    s += `<text x="960" y="${f1(255 + li * 100 + 26 * (1 - lp))}" font-family="Segoe UI" font-size="84" font-weight="700" text-anchor="middle">${tsp}</text>`;
  });
  // Bottle with a strip sliding out and a "live demo" play badge.
  const bp = prog(t, 0.8, 0.8, ease.outBack);
  if (bp > 0) {
    s += `<ellipse cx="960" cy="640" rx="${f1(260 * bp)}" ry="${f1(170 * bp)}" fill="url(#s06glow)"/>`;
    const sp = prog(t, 1.4, 0.7, ease.out);
    const padC = METER[Math.floor((t * 1.6) % 4)][0];
    s += `<g transform="translate(${f1(985 + 95 * sp)} ${f1(560 - 40 * sp)}) rotate(${f1(14 * sp)})" opacity="${sp.toFixed(2)}"><rect x="-13" y="0" width="26" height="210" rx="6" fill="#F4F7FF"/><rect x="-13" y="168" width="26" height="42" rx="6" fill="${padC}"/></g>`;
    s += `<g transform="translate(960 790) scale(${bp.toFixed(3)}) translate(-960 -790)">${img('bottle340.png', 890, 500, 140)}</g>`;
    const pl = prog(t, 2.0, 0.55, ease.outBack);
    if (pl > 0) {
      const pulse = 1 + 0.06 * Math.sin(t * 7);
      s += `<g transform="translate(800 640) scale(${(pl * pulse).toFixed(3)})"><circle r="52" fill="${C.aqua}"/><circle r="66" fill="none" stroke="${C.aqua}" stroke-width="3" opacity="0.5"/><path d="M-16,-24 L26,0 L-16,24 Z" fill="#FFFFFF"/></g>`;
    }
  }
  return s + '</g>';
}

function person(x, g, h, fill, back = true) {
  const sh = g - 228 * h;
  let s = `<g stroke="#141C52" stroke-width="3">`;
  if (back) s += `<rect x="${f1(x - 64)}" y="${f1(sh + 14)}" width="24" height="${f1(76 * h)}" rx="9" fill="#232E78"/>`;
  s += `<rect x="${f1(x - 34)}" y="${f1(g - 128 * h)}" width="27" height="${f1(128 * h)}" rx="10" fill="${fill}"/><rect x="${f1(x + 7)}" y="${f1(g - 128 * h)}" width="27" height="${f1(128 * h)}" rx="10" fill="${fill}"/>`;
  s += `<path d="M${f1(x - 46)},${f1(g - 115 * h)} L${f1(x - 46)},${f1(sh + 28)} Q${f1(x - 46)},${f1(sh)} ${f1(x - 18)},${f1(sh)} L${f1(x + 18)},${f1(sh)} Q${f1(x + 46)},${f1(sh)} ${f1(x + 46)},${f1(sh + 28)} L${f1(x + 46)},${f1(g - 115 * h)} Z" fill="${fill}"/>`;
  s += `<circle cx="${f1(x)}" cy="${f1(sh - 38)}" r="29" fill="${fill}"/></g>`;
  return s;
}

function booth(t) {
  const a = prog(t, 11.9, 0.6, ease.out);
  if (a <= 0) return '';
  const G = 745;
  let s = '';
  // Campus skyline.
  const sk = prog(t, 11.9, 1.0, ease.out);
  [[250, 520, 170], [440, 450, 120], [1490, 480, 150], [1660, 430, 120]].forEach(([x, y, w], k) => {
    const yy = y + 60 * (1 - sk);
    s += `<rect x="${x}" y="${f1(yy)}" width="${w}" height="${f1(G - yy)}" fill="#1B2668" opacity="${(0.85 * sk).toFixed(2)}"/>`;
    for (let r = 0; r < 5; r++) for (let c = 0; c < Math.floor(w / 40); c++) {
      if (yy + 30 + r * 50 < G - 30) s += `<rect x="${x + 16 + c * 40}" y="${f1(yy + 30 + r * 50)}" width="16" height="24" rx="2" fill="${C.pale}" opacity="${(0.14 * sk * (((r + c + k) % 3) ? 1 : 2.2)).toFixed(2)}"/>`;
    }
  });
  s += `<ellipse cx="960" cy="${G + 4}" rx="${f1(620 * a)}" ry="16" fill="#000000" opacity="0.28"/>`;
  // 30 campus pins on an arc.
  for (let j = 0; j < 30; j++) {
    const pp = prog(t, 13.0 + j * 0.04, 0.4, ease.outBack);
    if (pp <= 0) continue;
    const x = 520 + j * (880 / 29), y = 175 - 50 * Math.sin((Math.PI * j) / 29) + 3 * Math.sin(t * 3 + j);
    s += `<g transform="translate(${f1(x)} ${f1(y)}) scale(${pp.toFixed(3)})"><path d="M0,14 C-8,4 -12,-1 -12,-6 A12,12 0 0 1 12,-6 C12,-1 8,4 0,14 Z" fill="${C.aqua}"/><circle cx="0" cy="-6" r="4.5" fill="#FFFFFF"/></g>`;
  }
  // Booth body.
  const bp = prog(t, 11.95, 0.8, ease.outBack);
  s += `<g transform="translate(0 ${f1(220 * (1 - bp))})" opacity="${clamp(bp * 1.5).toFixed(3)}">`;
  s += `<rect x="866" y="330" width="9" height="${G - 330}" fill="#9AA6D8"/><rect x="1425" y="330" width="9" height="${G - 330}" fill="#9AA6D8"/>`;
  s += `<rect x="880" y="336" width="540" height="270" fill="#1A2466"/>`;
  s += text(1150, 420, 'Pani Lab', { size: 56, weight: 800, anchor: 'middle' });
  METER.forEach(([c], k) => {
    const mp = prog(t, 12.7 + k * 0.1, 0.4, ease.out);
    s += `<rect x="${960 + k * 80}" y="448" width="${f1(70 * mp)}" height="20" rx="10" fill="${c}"/>`;
  });
  // Staff behind the table.
  s += `<circle cx="1150" cy="520" r="27" fill="${SIL}"/><path d="M1105,600 L1105,572 Q1105,550 1127,550 L1173,550 Q1195,550 1195,572 L1195,600 Z" fill="${SIL}"/>`;
  // Table with sachets and a glass.
  s += `<rect x="890" y="590" width="520" height="16" rx="6" fill="#FFFFFF" opacity="0.92"/><rect x="900" y="606" width="500" height="${G - 606}" fill="${C.aqua}"/><rect x="900" y="${G - 22}" width="500" height="22" fill="${C.teal}"/>`;
  s += `<path transform="translate(1150 668)" d="M0,-34 C0,-34 -24,-4 -24,10 A24,24 0 0 0 24,10 C24,-4 0,-34 0,-34 Z" fill="#FFFFFF" opacity="0.9"/>`;
  [960, 1015].forEach((x) => { s += img('sachet.png', x, 528, 44); });
  s += `<path d="M1300,548 L1340,548 L1336,590 L1304,590 Z" fill="${C.aqua}" fill-opacity="0.5" stroke="#FFFFFF" stroke-opacity="0.7" stroke-width="3"/>`;
  s += `</g>`;
  // Navy canopy drops in.
  const cp = prog(t, 12.15, 0.8, ease.outBack);
  s += `<g transform="translate(0 ${f1(-300 * (1 - cp))})" opacity="${clamp(cp * 2).toFixed(3)}">`;
  s += `<path d="M850,332 L1450,332 L1372,214 L928,214 Z" fill="${C.navy}" stroke="${C.aqua}" stroke-width="4" stroke-linejoin="round"/>`;
  for (let k = 1; k < 6; k++) s += `<path d="M${928 + k * 74},214 L${850 + k * 100},332" stroke="${C.aqua}" stroke-width="2" opacity="0.45"/>`;
  for (let k = 0; k < 10; k++) s += `<path d="M${850 + k * 60},332 A30,30 0 0 0 ${910 + k * 60},332 Z" fill="${k % 2 ? C.aqua : C.navy}" stroke="${C.aqua}" stroke-width="2"/>`;
  s += `</g>`;
  // Queue of students; the front one holds up a sachet.
  const xs = [400, 505, 605, 705, 805], hs = [0.97, 1.03, 0.94, 1.0, 1.02];
  xs.forEach((x, k) => {
    const qp = prog(t, 12.25 + (4 - k) * 0.1, 0.75, ease.out);
    if (qp <= 0) return;
    const xx = x - 320 * (1 - qp), yb = 4 * Math.sin(t * 2.4 + k);
    s += `<g opacity="${qp.toFixed(3)}" transform="translate(0 ${f1(yb)})">${person(xx, G, hs[k], k % 2 ? '#34408F' : SIL)}`;
    if (k === 4) {
      const hp = prog(t, 12.9, 0.6, ease.outBack);
      const sh = G - 228 * hs[k];
      const hx = xx + 60, hy = lerp(sh + 40, sh - 90, hp);
      s += `<path d="M${f1(xx + 32)},${f1(sh + 14)} L${f1(hx)},${f1(hy)}" stroke="#34408F" stroke-width="24" stroke-linecap="round"/>`;
      if (hp > 0) {
        const pulse = 0.22 + 0.1 * Math.sin(t * 5);
        s += `<circle cx="${f1(hx)}" cy="${f1(hy - 60)}" r="${f1(80 * hp)}" fill="${C.aqua}" opacity="${pulse.toFixed(2)}"/>`;
        s += `<g transform="translate(${f1(hx)} ${f1(hy - 60)}) rotate(${f1(-10 + 4 * Math.sin(t * 2))}) scale(${hp.toFixed(3)})">${img('sachet.png', -40, -56, 80)}</g>`;
        s += `<circle cx="${f1(hx)}" cy="${f1(hy)}" r="17" fill="${SKIN}"/>`;
      }
    }
    s += `</g>`;
  });
  // Label.
  const lp = prog(t, 12.8, 0.6, ease.out);
  const n = count(prog(t, 13.0, 1.2, ease.out), 30);
  s += `<text x="960" y="${f1(848 + 20 * (1 - lp))}" font-family="Segoe UI" font-size="60" font-weight="700" fill="#FFFFFF" text-anchor="middle" opacity="${lp.toFixed(3)}">Campus Pani Lab: <tspan fill="${C.amber}" font-weight="800">${n}</tspan> universities</text>`;
  return s;
}

module.exports = {
  id: 's06',
  duration: 16,
  render(t) {
    let s = bg(t, { glow: 0.55 });
    s += `<defs><clipPath id="s06clip"><rect x="12" y="12" width="${PW - 24}" height="${PH - 24}" rx="32"/></clipPath>
      <linearGradient id="s06scr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22357E"/><stop offset="1" stop-color="#0D1846"/></linearGradient>
      <radialGradient id="s06glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${C.aqua}" stop-opacity="0.35"/><stop offset="1" stop-color="${C.aqua}" stop-opacity="0"/></radialGradient></defs>`;
    s += intro(t);
    s += hashtag(t);
    for (let i = 0; i < 3; i++) s += phone(i, t);
    s += shareCard(t);
    s += steps(t);
    s += booth(t);
    s += tag('Concept mock-up');
    return s;
  },
};
