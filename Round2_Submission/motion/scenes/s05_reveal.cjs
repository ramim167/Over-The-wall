// Scene 5 · 0:55–1:23 · Hero reveal: bottle rises through water, GLDA mineral lock (illustrative),
// PaniCheck cap moment with meter landing on Hard, sachet QR to Pani Map, price row.
const { C, text, prog, ease, lerp, clamp, bg, tag, meter, img, ASSET_SIZE } = require('../engine.cjs');

const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const AMB = '#F5A31A';
const HARD = '#A2647F';
const PI = Math.PI;
const hx = (c) => [1, 3, 5].map((k) => parseInt(c.slice(k, k + 2), 16));
const mix = (a, b, p) => { const A = hx(a), B = hx(b); return '#' + A.map((v, i) => Math.round(lerp(v, B[i], clamp(p))).toString(16).padStart(2, '0')).join(''); };
const f = (n) => Number(n).toFixed(1);
const bh = (w) => w * ASSET_SIZE['bottle340.png'][1] / ASSET_SIZE['bottle340.png'][0];

const DEFS = `<defs>
  <linearGradient id="s05fg" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1080"><stop offset="0" stop-color="#fff"/><stop offset="${700 / 1080}" stop-color="#fff"/><stop offset="${885 / 1080}" stop-color="#000"/></linearGradient>
  <mask id="s05fade" maskUnits="userSpaceOnUse" x="-200" y="-200" width="2400" height="1500"><rect x="-200" y="-200" width="2400" height="1500" fill="url(#s05fg)"/></mask>
  <radialGradient id="s05halo" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${C.aqua}" stop-opacity="0.55"/><stop offset="0.55" stop-color="${C.aqua}" stop-opacity="0.18"/><stop offset="1" stop-color="${C.aqua}" stop-opacity="0"/></radialGradient>
  <linearGradient id="s05sw" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <radialGradient id="s05foam" cx="0.38" cy="0.32" r="0.7"><stop offset="0" stop-color="#FFFFFF"/><stop offset="0.6" stop-color="#EAF7FB" stop-opacity="0.92"/><stop offset="1" stop-color="#BFE6F1" stop-opacity="0.75"/></radialGradient>
  <radialGradient id="s05bloom" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${HARD}" stop-opacity="0.85"/><stop offset="1" stop-color="${HARD}" stop-opacity="0"/></radialGradient>
  <radialGradient id="s05amb" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${AMB}" stop-opacity="0.35"/><stop offset="1" stop-color="${AMB}" stop-opacity="0"/></radialGradient>
  <linearGradient id="s05foil" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F4F7FB"/><stop offset="0.5" stop-color="#B9C3D3"/><stop offset="1" stop-color="#E6EBF2"/></linearGradient>
  <linearGradient id="s05bk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1B2468"/><stop offset="0.45" stop-color="#34449A"/><stop offset="1" stop-color="#151D58"/></linearGradient>
  <linearGradient id="s05beam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.aqua}" stop-opacity="0"/><stop offset="1" stop-color="${C.aqua}" stop-opacity="0.55"/></linearGradient>
  <clipPath id="s05cc"><rect x="-800" y="349" width="3000" height="1400"/></clipPath>
  <clipPath id="s05sc"><rect x="0" y="0" width="1920" height="348"/></clipPath>
</defs>`;

// Bottle with optional light sweep (sweep masked by the bottle image itself).
function bottle(cx, cy, w, rot, sc, op, sweep = -1, id = 'a') {
  const h = bh(w);
  let s = `<g transform="translate(${f(cx)} ${f(cy)}) rotate(${f(rot)}) scale(${sc.toFixed(4)})" opacity="${op.toFixed(3)}">`;
  s += `<ellipse cx="0" cy="${f(h / 2 - 10)}" rx="${f(w * 0.42)}" ry="${f(w * 0.05)}" fill="#000" opacity="0.35"/>`;
  s += img('bottle340.png', -w / 2, -h / 2, w);
  if (sweep >= 0 && sweep <= 1) {
    s += `<mask id="s05bm${id}"><rect x="${-w}" y="${-h}" width="${2 * w}" height="${2 * h}" fill="#000"/>${img('bottle340.png', -w / 2, -h / 2, w)}</mask>`;
    const sx = lerp(-w * 1.1, w * 0.9, sweep);
    s += `<g mask="url(#s05bm${id})"><rect x="${f(sx)}" y="${f(-h * 0.7)}" width="${f(w * 0.28)}" height="${f(h * 1.4)}" fill="url(#s05sw)" transform="rotate(14)" opacity="0.9"/></g>`;
  }
  return s + '</g>';
}

// ---------------- Beat 1: rise + title lockup (0–6 s) ----------------
function beat1(t) {
  const out = prog(t, 5.3, 0.8, ease.in);
  const a = 1 - out;
  if (a <= 0) return '';
  let s = '';
  const rise = prog(t, 0.1, 2.8, ease.out);
  // Caustic light ripples
  for (let k = 0; k < 7; k++) {
    let d = '';
    const y0 = 110 + k * 105;
    for (let x = -40; x <= 1960; x += 80) {
      const y = y0 + 20 * Math.sin(x * 0.006 + t * 1.3 + k * 1.7) + 11 * Math.sin(x * 0.014 - t * 0.9 + k);
      d += (x === -40 ? 'M' : 'L') + x + ',' + f(y);
    }
    s += `<path d="${d}" fill="none" stroke="${C.aqua}" stroke-width="${2 + (k % 3)}" opacity="${f((0.1 + 0.06 * Math.sin(t * 1.5 + k)) * a * clamp(t / 1.2) * 10) / 10}"/>`;
  }
  // Bottle position
  const w = 330, h = bh(w);
  const cx = 1390 + 16 * Math.sin(t * 0.8);
  const top = lerp(1040, 150, rise) - 260 * out;
  const cy = top + h / 2;
  const rot = 2.2 * Math.sin(t * 1.1) + (1 - rise) * 7;
  const sc = 1 + 0.022 * Math.sin(t * 0.9) + 0.05 * (1 - rise);
  // Halo + rings
  s += `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="400" ry="470" fill="url(#s05halo)" opacity="${(rise * a).toFixed(3)}"/>`;
  for (let j = 0; j < 3; j++) {
    const ph = (t * 0.45 + j / 3) % 1;
    s += `<ellipse cx="${f(cx)}" cy="${f(cy + 40)}" rx="${f(180 + 300 * ph)}" ry="${f((180 + 300 * ph) * 0.32)}" fill="none" stroke="${C.aqua}" stroke-width="3" opacity="${((1 - ph) * 0.45 * rise * a).toFixed(3)}"/>`;
  }
  // Rising bubbles
  for (let i = 0; i < 48; i++) {
    const sp = 110 + 170 * rnd(i);
    const x0 = (i < 16 ? 1180 + 420 * rnd(i + 50) : 760 + 1120 * rnd(i + 50));
    const y = 900 - ((t * sp + rnd(i + 100) * 1000) % 1000);
    const x = x0 + 16 * Math.sin(t * 2 + i);
    const r = 3 + 10 * rnd(i + 200);
    const op = clamp((890 - y) / 100) * clamp((y - 60) / 120) * a * clamp(t / 0.8);
    if (op <= 0.01) continue;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${C.aqua}" fill-opacity="0.12" stroke="#E3F5FA" stroke-width="1.6" opacity="${(op * 0.7).toFixed(3)}"/>`;
    if (r > 7) s += `<circle cx="${f(x - r * 0.35)}" cy="${f(y - r * 0.35)}" r="${f(r * 0.22)}" fill="#fff" opacity="${(op * 0.8).toFixed(3)}"/>`;
  }
  // Bottle (masked at the bottom so it rises out of the depth and never enters the subtitle band)
  const sweep = prog(t, 2.9, 1.2, ease.inOut);
  s += `<g mask="url(#s05fade)">${bottle(cx, cy, w, rot, sc, clamp(rise * 1.6) * a, t > 2.9 && t < 4.1 ? sweep : -1, 'r')}</g>`;
  // From darkness
  const dark = 1 - prog(t, 0, 1.5, ease.out);
  if (dark > 0) s += `<rect width="1920" height="1080" fill="${C.navy3}" opacity="${(0.92 * dark).toFixed(3)}"/>`;
  // Title lockup
  const p1 = prog(t, 1.5, 0.8, ease.out), p2 = prog(t, 1.8, 1.0, ease.out), p3 = prog(t, 2.5, 0.8, ease.out), p4 = prog(t, 3.3, 0.6, ease.out);
  s += `<g opacity="${a.toFixed(3)}" transform="translate(${f(-100 * out)} 0)">`;
  s += text(130 - 40 * (1 - p1), 300, 'Parachute Naturale', { size: 42, weight: 600, fill: C.pale, opacity: p1, ls: 2 });
  s += text(126, 448 + 40 * (1 - p2), 'WaterSmart', { size: 150, weight: 700, opacity: p2, ls: f((1 - p2) * 24) });
  s += `<rect x="130" y="478" width="${f(820 * prog(t, 2.2, 1.0, ease.out))}" height="4" rx="2" fill="${C.aqua}" opacity="${(0.8 * p2).toFixed(3)}"/>`;
  s += text(130, 548 + 20 * (1 - p3), 'The shampoo that checks your water first', { size: 42, weight: 600, fill: C.aqua, opacity: p3 });
  s += text(130, 652 + 16 * (1 - p4), '3-in-1', { size: 40, weight: 700, opacity: p4 });
  const chips = [['Chelating formula', 'ring'], ['PaniCheck cap', 'cap'], ['Pani Map', 'pin']];
  let x = 130;
  chips.forEach(([lab, ic], j) => {
    const cw = 70 + lab.length * 15 + 26, y = 682, ch = 64;
    const pc = prog(t, 3.6 + j * 0.3, 0.6, ease.outBack);
    if (t > 3.6 + j * 0.3) {
      const ccx = x + cw / 2, ccy = y + ch / 2;
      s += `<g transform="translate(${f(ccx)} ${f(ccy)}) scale(${pc.toFixed(3)}) translate(${f(-ccx)} ${f(-ccy)})" opacity="${clamp(pc * 2).toFixed(3)}">`;
      s += `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="32" fill="${C.navy2}" stroke="${C.aqua}" stroke-opacity="0.7" stroke-width="2"/>`;
      const ix = x + 38, iy = y + 32;
      if (ic === 'ring') s += `<circle cx="${ix}" cy="${iy}" r="14" fill="none" stroke="${C.aqua}" stroke-width="4"/><circle cx="${ix}" cy="${iy}" r="6" fill="${C.rustLt}"/>`;
      if (ic === 'cap') s += `<rect x="${ix - 15}" y="${iy - 6}" width="30" height="20" rx="6" fill="${C.aqua}"/><rect x="${ix + 2}" y="${iy - 22}" width="7" height="18" rx="2" fill="#fff"/><rect x="${ix + 2}" y="${iy - 22}" width="7" height="6" fill="${HARD}"/>`;
      if (ic === 'pin') s += `<path d="M${ix},${iy + 17} C${ix - 6},${iy + 6} ${ix - 14},${iy} ${ix - 14},${iy - 6} A14,14 0 1 1 ${ix + 14},${iy - 6} C${ix + 14},${iy} ${ix + 6},${iy + 6} ${ix},${iy + 17} Z" fill="${C.aqua}"/><circle cx="${ix}" cy="${iy - 6}" r="5" fill="${C.navy2}"/>`;
      s += text(x + 66, y + 42, lab, { size: 28, weight: 600 });
      s += '</g>';
    }
    x += cw + 18;
  });
  s += '</g>';
  return s;
}

// ---------------- Beat 2: illustrative GLDA mineral lock (6–13 s) ----------------
const P = [[-100, 700], [500, 110], [1320, 1090], [2020, 330]];
function bez(u) {
  const a = 1 - u;
  const b = [a * a * a, 3 * a * a * u, 3 * a * u * u, u * u * u];
  return [0, 1].map((k) => b[0] * P[0][k] + b[1] * P[1][k] + b[2] * P[2][k] + b[3] * P[3][k]);
}
const TYPES = ['Ca', 'Fe', 'Mg', 'Fe', 'Ca', 'Mg', 'Fe', 'Ca', 'Fe', 'Mg', 'Ca', 'Fe', 'Mg', 'Fe'];
const MCOL = { Ca: ['#B3BACA', '#E1E5EE'], Mg: ['#7F889C', '#B5BCCB'], Fe: [C.rust, C.rustLt] };
const LABEL = { 2: 'Mg²⁺', 4: 'Ca²⁺', 6: 'Fe' };
function beat2(t) {
  const a = prog(t, 5.9, 0.6, ease.out) * (1 - prog(t, 12.4, 0.6, ease.in));
  if (a <= 0) return '';
  let s = `<g opacity="${a.toFixed(3)}">`;
  const L = 2900;
  const d = `M${P[0]} C${P[1]} ${P[2]} ${P[3]}`;
  const draw = prog(t, 6.0, 1.1, ease.inOut);
  const dash = `stroke-dasharray="${L} ${L}" stroke-dashoffset="${f(L * (1 - draw))}"`;
  const care = prog(t, 10.9, 1.4, ease.inOut);
  // Hair strand: three fibres + sheen
  [[-15, 16, '#2A1F35'], [0, 24, '#33283F'], [15, 15, '#271D31']].forEach(([dy, sw, col]) => {
    s += `<path d="${d}" transform="translate(0 ${dy})" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" ${dash}/>`;
  });
  s += `<path d="${d}" transform="translate(0 -6)" fill="none" stroke="${mix('#7C6C9C', '#CFEFF7', care)}" stroke-width="4" stroke-linecap="round" opacity="${f(lerp(0.45, 0.85, care) * 100) / 100}" ${dash}/>`;
  if (care > 0 && care < 1) {
    s += `<path d="${d}" transform="translate(0 -6)" fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" stroke-dasharray="280 ${L + 400}" stroke-dashoffset="${f(280 - care * (L + 280))}" opacity="0.85"/>`;
  }
  // Foam bubbles along the bottom: choked/flat, then swell full and white
  for (let k = 0; k < 8; k++) {
    const bx = 230 + k * 210 + 40 * rnd(k + 300), r0 = 34 + 22 * rnd(k + 310);
    const pin = prog(t, 6.4 + k * 0.06, 0.6, ease.out);
    const sw = prog(t, 10.5 + k * 0.08, 0.9, ease.outBack);
    const ry0 = r0 * 0.42;
    s += `<ellipse cx="${f(bx)}" cy="${f(870 - ry0)}" rx="${f(r0 * 1.05)}" ry="${f(ry0)}" fill="#8E95AA" fill-opacity="0.35" stroke="#A9B1C2" stroke-width="2" opacity="${(pin * (1 - clamp(sw * 1.5))).toFixed(3)}"/>`;
    const sp = 1 - prog(t, 10.0, 0.5);
    if (sp > 0) {
      s += `<circle cx="${f(bx - r0 * 0.4)}" cy="${f(870 - ry0 * 1.7)}" r="5" fill="${C.rust}" opacity="${(pin * sp).toFixed(3)}"/><circle cx="${f(bx + r0 * 0.35)}" cy="${f(870 - ry0 * 1.8)}" r="4.5" fill="#9AA2B4" opacity="${(pin * sp).toFixed(3)}"/>`;
    }
    if (sw > 0) {
      const r = r0 * lerp(0.6, 1.22, sw);
      s += `<circle cx="${f(bx)}" cy="${f(870 - r)}" r="${f(r)}" fill="url(#s05foam)" stroke="#FFFFFF" stroke-width="2" opacity="${clamp(sw * 1.4).toFixed(3)}"/>`;
      s += `<ellipse cx="${f(bx - r * 0.35)}" cy="${f(870 - r * 1.4)}" rx="${f(r * 0.22)}" ry="${f(r * 0.13)}" fill="#fff" transform="rotate(-30 ${f(bx - r * 0.35)} ${f(870 - r * 1.4)})" opacity="${clamp(sw).toFixed(3)}"/>`;
      // Micro foam
      for (let m = 0; m < 3; m++) {
        const mr = 6 + 8 * rnd(k * 7 + m);
        s += `<circle cx="${f(bx + (m - 1) * r * 0.9 + 10)}" cy="${f(870 - mr - (m === 1 ? 2 * r : 0))}" r="${f(mr * sw)}" fill="url(#s05foam)" opacity="${clamp(sw).toFixed(3)}"/>`;
      }
    }
  }
  // Mineral particles + GLDA rings
  for (let i = 0; i < TYPES.length; i++) {
    const u = 0.07 + i * 0.063;
    const [px0, py0] = bez(u);
    const off = (i % 2 === 0 ? -1 : 1) * (26 + 8 * rnd(i + 20));
    const r = 13 + 5 * rnd(i + 40);
    const [mc, ml] = MCOL[TYPES[i]];
    const pa = prog(t, 6.6 + i * 0.07, 0.7, ease.out);
    if (pa <= 0) continue;
    const th = rnd(i + 60) * 2 * PI;
    let px = px0 + Math.cos(th) * 420 * (1 - pa) + 3 * Math.sin(t * 6 + i);
    let py = py0 + off + Math.sin(th) * 420 * (1 - pa) + 3 * Math.cos(t * 5 + i);
    const fs = 7.9 + i * 0.08;
    const fly = prog(t, fs, 0.55, ease.inOut);
    const snap = prog(t, fs + 0.55, 0.3, ease.outBack);
    const carry = prog(t, 9.7 + i * 0.07, 1.1, ease.in);
    const cdx = 1100 + 400 * rnd(i + 80), cdy = -800 - 300 * rnd(i + 90);
    px += cdx * carry; py += cdy * carry;
    if (carry >= 1) continue;
    // trail
    if (carry > 0.05) {
      for (let g = 1; g <= 3; g++) {
        const cb = Math.max(0, carry - g * 0.06);
        const gx = px - cdx * (carry - cb), gy = py - cdy * (carry - cb);
        s += `<circle cx="${f(gx)}" cy="${f(gy)}" r="${f(26 - g * 4)}" fill="none" stroke="${C.aqua}" stroke-width="3" opacity="${(0.35 - g * 0.09).toFixed(3)}"/>`;
      }
    }
    s += `<circle cx="${f(px)}" cy="${f(py)}" r="${f(r)}" fill="${mc}" opacity="${pa.toFixed(3)}"/><circle cx="${f(px - r * 0.3)}" cy="${f(py - r * 0.3)}" r="${f(r * 0.35)}" fill="${ml}" opacity="${(pa * 0.9).toFixed(3)}"/>`;
    if (LABEL[i]) {
      const lo = pa * (1 - clamp(carry * 4));
      if (lo > 0) s += text(px, py - 40, LABEL[i], { size: 28, weight: 700, fill: TYPES[i] === 'Fe' ? C.rustLt : '#D5DAE5', anchor: 'middle', opacity: lo });
    }
    if (fly > 0) {
      const ox = Math.cos(-PI / 2 + (rnd(i + 70) - 0.5) * 2.6) * 1100, oy = Math.sin(-PI / 2 + (rnd(i + 70) - 0.5) * 2.6) * 1100;
      const rx = px + ox * (1 - fly), ry = py + oy * (1 - fly);
      const rr = snap > 0 ? lerp(42, 26, snap) : 34;
      s += `<circle cx="${f(rx)}" cy="${f(ry)}" r="${f(rr + 5)}" fill="none" stroke="${C.aqua}" stroke-width="10" opacity="0.18"/>`;
      s += `<circle cx="${f(rx)}" cy="${f(ry)}" r="${f(rr)}" fill="none" stroke="#7FE3F5" stroke-width="4"/>`;
      if (snap > 0 && snap < 1) s += `<circle cx="${f(rx)}" cy="${f(ry)}" r="${f(26 + 40 * snap)}" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="${(1 - snap).toFixed(3)}"/>`;
      if (i % 4 === 1 && snap > 0.5) s += text(rx, ry + 52, 'GLDA', { size: 18, weight: 700, fill: '#7FE3F5', anchor: 'middle', opacity: clamp((snap - 0.5) * 2) * (1 - clamp(carry * 3)) });
    }
  }
  // Headline
  const h1 = prog(t, 8.1, 0.7, ease.out), h2 = prog(t, 10.9, 0.7, ease.out);
  s += `<text xml:space="preserve" x="960" y="${f(170 + 12 * (1 - h1))}" font-family="Segoe UI" font-size="48" font-weight="600" fill="#FFFFFF" text-anchor="middle"><tspan fill="${C.aqua}" opacity="${h1.toFixed(3)}">GLDA</tspan><tspan opacity="${h1.toFixed(3)}"> locks minerals</tspan><tspan fill="${C.pale}" opacity="${h2.toFixed(3)}"> · Coconut Milk Protein cares</tspan></text>`;
  return s + '</g>';
}

// ---------------- Beat 3: cap moment + meter (13–21 s) ----------------
function stripSvg(x, top, rot, bloom) {
  const w = 44, len = 240;
  const pads = ['#A2647F', '#8E5670', '#B67A93'];
  let s = `<g transform="rotate(${f(rot)} ${f(x)} ${f(top + len / 2)})">`;
  s += `<rect x="${f(x - w / 2)}" y="${f(top)}" width="${w}" height="${len}" rx="6" fill="#F7F9FC" stroke="#C9D3E3" stroke-width="2"/>`;
  pads.forEach((pc, k) => {
    const py = top + len - 40 - k * 38;
    s += `<rect x="${f(x - 14)}" y="${f(py)}" width="28" height="28" rx="4" fill="${mix('#E3E8F0', pc, bloom)}" stroke="#C9D3E3" stroke-width="1.5"/>`;
  });
  return s + '</g>';
}
function beat3(t) {
  const enter = prog(t, 12.9, 1.0, ease.out);
  const ex = prog(t, 20.4, 0.6, ease.in);
  const a = enter * (1 - ex);
  if (a <= 0) return '';
  let s = `<g opacity="${a.toFixed(3)}" transform="translate(0 ${f(-40 * ex)})">`;
  // Bottle close-up: cap fills the upper-left frame
  const W0 = 1500, sc0 = W0 / 960, ix = -320, iy = -73;
  const ccx = 430, ccy = 513;
  const k = clamp((t - 14.1) / 0.4);
  const click = (k > 0 && k < 1) ? 0.05 * Math.sin(k * PI * 2.5) * (1 - k) : 0;
  const push = lerp(1.14, 1, enter) + click;
  const dy = 420 * (1 - enter);
  s += `<ellipse cx="${ccx}" cy="${ccy}" rx="520" ry="520" fill="url(#s05halo)" opacity="0.7"/>`;
  s += `<g mask="url(#s05fade)"><g transform="translate(0 ${f(dy)}) translate(${ccx} ${ccy}) scale(${push.toFixed(4)}) translate(${-ccx} ${-ccy})">`;
  s += `<g clip-path="url(#s05cc)">${img('bottle340.png', ix, iy, W0)}</g>`;
  // Light sweep over the cap
  const sw = prog(t, 13.4, 1.0, ease.inOut);
  if (sw > 0 && sw < 1) s += `<rect x="${f(lerp(80, 760, sw))}" y="330" width="90" height="372" fill="url(#s05sw)" opacity="0.55" transform="skewX(-14)"/>`;
  // Foil seal on cap top, peels away
  const fp = prog(t, 14.55, 0.6, ease.in);
  const fo = 1 - prog(t, 14.95, 0.25);
  if (fo > 0) {
    const fsy = Math.cos(fp * PI * 0.9);
    s += `<g transform="translate(${f(-90 * fp)} ${f(-190 * fp)}) rotate(${f(-50 * fp)} 300 352) translate(0 352) scale(1 ${fsy.toFixed(3)}) translate(0 -352)" opacity="${fo.toFixed(3)}">`;
    s += `<rect x="300" y="342" width="260" height="20" rx="6" fill="url(#s05foil)" stroke="#8D98AB" stroke-width="1.5"/><rect x="540" y="332" width="34" height="18" rx="5" fill="url(#s05foil)" stroke="#8D98AB" stroke-width="1.5"/>`;
    s += '</g>';
  }
  s += '</g></g>';
  // Click burst
  if (k > 0 && k < 1) {
    for (let j = 0; j < 10; j++) {
      const an = -PI + (j / 9) * PI;
      const r1 = 300 + 60 * k, r2 = 330 + 110 * k;
      s += `<line x1="${f(ccx + Math.cos(an) * r1)}" y1="${f(ccy + Math.sin(an) * r1 * 0.75)}" x2="${f(ccx + Math.cos(an) * r2)}" y2="${f(ccy + Math.sin(an) * r2 * 0.75)}" stroke="${C.aqua}" stroke-width="5" stroke-linecap="round" opacity="${(1 - k).toFixed(3)}"/>`;
    }
  }
  // Bucket of water on the right
  const bk = prog(t, 15.4, 0.8, ease.out);
  const bx = 1300, rimY = 505;
  const bkt = (body) => `<g transform="translate(0 ${f(60 * (1 - bk))})" opacity="${bk.toFixed(3)}">${body}</g>`;
  if (bk > 0) {
    s += `<ellipse cx="${bx}" cy="${rimY + 40}" rx="${f(420)}" ry="200" fill="url(#s05halo)" opacity="${(0.6 * bk).toFixed(3)}"/>`;
    s += bkt(`<ellipse cx="${bx}" cy="${rimY}" rx="250" ry="46" fill="#0A1030"/><ellipse cx="${bx}" cy="${rimY + 14}" rx="232" ry="36" fill="${C.aqua}" opacity="0.55"/><ellipse cx="${bx - 60}" cy="${rimY + 8}" rx="90" ry="10" fill="#fff" opacity="0.18"/>`);
  }
  // Strip: slides out of the cap, travels to the bucket, dips, colour blooms
  const so = prog(t, 15.05, 0.7, ease.out);
  const mv = prog(t, 15.9, 0.9, ease.inOut);
  const dp = prog(t, 16.8, 0.3, ease.in) - prog(t, 17.45, 0.4, ease.out);
  const bloom = prog(t, 17.9, 0.6, ease.out);
  if (so > 0) {
    const len = 240;
    let sx = lerp(ccx, bx, mv);
    let top = mv > 0 ? lerp(90, 200, mv) - 50 * Math.sin(PI * mv) : 348 + len * (1 - so) - len;
    top += 150 * dp;
    const rot = 22 * Math.sin(PI * mv);
    if (bloom > 0) {
      const bo = bloom * (1 - prog(t, 19.2, 1.0));
      s += `<circle cx="${sx}" cy="${f(top + len - 80)}" r="${f(40 + 170 * bloom)}" fill="url(#s05bloom)" opacity="${bo.toFixed(3)}"/>`;
      s += `<circle cx="${sx}" cy="${f(top + len - 80)}" r="${f(30 + 200 * bloom)}" fill="none" stroke="${HARD}" stroke-width="4" opacity="${(1 - bloom).toFixed(3)}"/>`;
    }
    const st = stripSvg(sx, top, rot, bloom);
    s += mv > 0 ? st : `<g clip-path="url(#s05sc)">${st}</g>`;
  }
  if (bk > 0) {
    // Water surface tint over the dipped strip, ripples, front of bucket
    s += bkt(`<ellipse cx="${bx}" cy="${rimY + 14}" rx="232" ry="36" fill="${C.aqua}" opacity="${(0.35 * clamp(dp * 3)).toFixed(3)}"/>`);
    let rp = '';
    for (let j = 0; j < 3; j++) {
      const q = prog(t, 16.98 + j * 0.25, 1.1, ease.out);
      if (q > 0 && q < 1) rp += `<ellipse cx="${bx}" cy="${rimY + 14}" rx="${f(28 + 196 * q)}" ry="${f((28 + 196 * q) * 0.16)}" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="${(0.85 * (1 - q)).toFixed(3)}"/>`;
    }
    const sp = prog(t, 16.98, 0.6, ease.out);
    if (sp > 0 && sp < 1) for (let j = 0; j < 7; j++) {
      const an = -PI + (j + 0.5) / 7 * PI;
      rp += `<circle cx="${f(bx + Math.cos(an) * 90 * sp)}" cy="${f(rimY + 10 + Math.sin(an) * 70 * sp + 90 * sp * sp)}" r="5" fill="#CFF3FA" opacity="${(1 - sp).toFixed(3)}"/>`;
    }
    s += rp;
    s += bkt(`<path d="M${bx - 250},${rimY} A250,46 0 0 0 ${bx + 250},${rimY} L${bx + 205},${rimY + 150} Q${bx},${rimY + 185} ${bx - 205},${rimY + 150} Z" fill="url(#s05bk)" stroke="${C.pale}" stroke-opacity="0.35" stroke-width="2"/><ellipse cx="${bx}" cy="${rimY}" rx="250" ry="46" fill="none" stroke="#C9D3F5" stroke-width="5" opacity="0.8"/>`);
  }
  // Meter reveal, lands on Hard
  const mp = prog(t, 18.4, 1.2, ease.out);
  if (mp > 0) {
    const land = t > 19.5 ? 2 : -1;
    s += meter(760, 720, 1060, mp, land, t);
    const q = prog(t, 19.5, 0.9, ease.out);
    if (q > 0 && q < 1) s += `<rect x="${f(760 + 2 * 212 - 30 * q)}" y="${f(714 - 22 * q)}" width="${f(212 + 60 * q)}" height="${f(46 + 44 * q)}" rx="${f(23 + 22 * q)}" fill="none" stroke="${HARD}" stroke-width="4" opacity="${(1 - q).toFixed(3)}"/>`;
  }
  // Steps line
  const t1 = prog(t, 16.8, 0.6, ease.out), t2 = prog(t, 18.0, 0.6, ease.out), t3 = prog(t, 19.4, 0.6, ease.out);
  s += `<text xml:space="preserve" x="1250" y="138" font-family="Segoe UI" font-size="38" font-weight="600" fill="#FFFFFF" text-anchor="middle"><tspan opacity="${t1.toFixed(3)}">Dip 1 second</tspan><tspan fill="${C.pale}" opacity="${t2.toFixed(3)}"> · Match the colour</tspan><tspan fill="${C.aqua}" opacity="${t3.toFixed(3)}"> · Know your water's hardness</tspan></text>`;
  return s + '</g>';
}

// ---------------- Beats 4–5: sachet QR → Pani Map, prices (21–28 s) ----------------
function qr(x, y, size) {
  const n = 9, m = size / (n + 2);
  let s = `<rect x="${f(x)}" y="${f(y)}" width="${size}" height="${size}" rx="8" fill="#FFFFFF"/>`;
  const fin = (cx, cy) => `<rect x="${f(x + m * (cx + 1))}" y="${f(y + m * (cy + 1))}" width="${f(m * 3)}" height="${f(m * 3)}" fill="${C.navy}"/><rect x="${f(x + m * (cx + 1.75))}" y="${f(y + m * (cy + 1.75))}" width="${f(m * 1.5)}" height="${f(m * 1.5)}" fill="#fff"/><rect x="${f(x + m * (cx + 2.1))}" y="${f(y + m * (cy + 2.1))}" width="${f(m * 0.8)}" height="${f(m * 0.8)}" fill="${C.navy}"/>`;
  s += fin(0, 0) + fin(6, 0) + fin(0, 6);
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    if ((r < 4 && c < 4) || (r < 4 && c > 4) || (r > 4 && c < 4)) continue;
    if (rnd(r * 13 + c * 7 + 500) > 0.5) s += `<rect x="${f(x + m * (c + 1))}" y="${f(y + m * (r + 1))}" width="${f(m)}" height="${f(m)}" fill="${C.navy}"/>`;
  }
  return s;
}
function beat4(t) {
  if (t < 20.7) return '';
  let s = '';
  // Sachet slides in from the left
  const en = prog(t, 20.8, 0.9, ease.outBack);
  const sw = 320, sh = sw * 840 / 600;
  const sx = lerp(-480, 290, en), sy = 200 + 6 * Math.sin(t * 1.3);
  const qx = sx + 206, qy = sy + 238, qs = 96;
  s += `<ellipse cx="${f(sx + sw / 2)}" cy="${f(sy + sh / 2)}" rx="300" ry="330" fill="url(#s05halo)" opacity="${(0.5 * clamp(en)).toFixed(3)}"/>`;
  s += `<g transform="rotate(-4 ${f(sx + sw / 2)} ${f(sy + sh / 2)})">`;
  s += img('sachet.png', sx, sy, sw);
  const qp = prog(t, 21.5, 0.5, ease.outBack);
  if (qp > 0) {
    const qc = qx + qs / 2, qcy = qy + qs / 2;
    s += `<g transform="translate(${f(qc)} ${f(qcy)}) scale(${qp.toFixed(3)}) translate(${f(-qc)} ${f(-qcy)})">${qr(qx, qy, qs)}</g>`;
    // Scan brackets + beam
    const sc = prog(t, 21.9, 1.2, ease.inOut);
    const bo = clamp((t - 21.8) / 0.2) * (1 - prog(t, 23.4, 0.4));
    if (bo > 0) {
      const g = 10, Lb = 22;
      const corners = [[qx - g, qy - g, 1, 1], [qx + qs + g, qy - g, -1, 1], [qx - g, qy + qs + g, 1, -1], [qx + qs + g, qy + qs + g, -1, -1]];
      corners.forEach(([cx, cy, dx, dy]) => { s += `<path d="M${f(cx)},${f(cy + dy * Lb)} L${f(cx)},${f(cy)} L${f(cx + dx * Lb)},${f(cy)}" fill="none" stroke="${C.aqua}" stroke-width="5" stroke-linecap="round" opacity="${bo.toFixed(3)}"/>`; });
      if (sc > 0 && sc < 1) {
        const by = qy - 4 + (qs + 8) * (0.5 - 0.5 * Math.cos(sc * 2 * PI));
        s += `<rect x="${f(qx - 14)}" y="${f(by - 40)}" width="${qs + 28}" height="40" fill="url(#s05beam)" opacity="${bo.toFixed(3)}"/><rect x="${f(qx - 16)}" y="${f(by - 2)}" width="${qs + 32}" height="4" rx="2" fill="#7FE3F5" opacity="${bo.toFixed(3)}"/>`;
      }
    }
  }
  s += '</g>';
  // Connector from QR to phone
  const ph = prog(t, 22.9, 0.9, ease.out);
  const pw = 270, phh = pw * 1620 / 840;
  const px = lerp(2000, 1340, ph), py = 160;
  const cn = prog(t, 23.0, 0.8, ease.inOut), cf = 1 - prog(t, 24.2, 0.4);
  if (cn > 0 && cf > 0) {
    const x1 = qx + qs + 20, y1 = qy + qs / 2, x2 = 1330, y2 = 380;
    const xe = lerp(x1, x2, cn), ye = lerp(y1, y2, cn);
    s += `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(xe)}" y2="${f(ye)}" stroke="${C.aqua}" stroke-width="3" stroke-dasharray="10 10" stroke-dashoffset="${f(-t * 60)}" opacity="${(0.8 * cf).toFixed(3)}"/>`;
    s += `<circle cx="${f(xe)}" cy="${f(ye)}" r="9" fill="#7FE3F5" opacity="${cf.toFixed(3)}"/><circle cx="${f(xe)}" cy="${f(ye)}" r="18" fill="none" stroke="#7FE3F5" stroke-width="2" opacity="${(0.5 * cf).toFixed(3)}"/>`;
  }
  // Phone with glow
  if (ph > 0) {
    const pcx = px + pw / 2, pcy = py + phh / 2;
    s += `<ellipse cx="${f(pcx)}" cy="${f(pcy)}" rx="330" ry="400" fill="url(#s05halo)" opacity="${ph.toFixed(3)}"/>`;
    for (let j = 0; j < 2; j++) {
      const q = ((t - 23.6) * 0.6 + j / 2) % 1;
      if (t > 23.6) s += `<rect x="${f(px - 20 * q - 6)}" y="${f(py - 20 * q - 6)}" width="${f(pw + 40 * q + 12)}" height="${f(phh + 40 * q + 12)}" rx="${f(50 + 20 * q)}" fill="none" stroke="${C.aqua}" stroke-width="3" opacity="${(0.5 * (1 - q) * ph).toFixed(3)}"/>`;
    }
    s += `<g transform="rotate(${f(3 * (1 - ph) + 1.5)} ${f(pcx)} ${f(pcy)})">${img('phone.png', px, py + 4 * Math.sin(t * 1.1), pw)}</g>`;
    const lp = prog(t, 23.6, 0.6, ease.out);
    s += text(pcx, py + phh + 50, 'Pani Map', { size: 32, weight: 700, fill: C.aqua, anchor: 'middle', opacity: lp });
  }
  // Bottle joins centre stage
  const bp = prog(t, 24.5, 0.7, ease.outBack);
  if (bp > 0) {
    const bw = 240, bhh = bh(bw), bcx = 960, bcy = 170 + bhh / 2;
    s += `<ellipse cx="${bcx}" cy="${f(bcy)}" rx="320" ry="380" fill="url(#s05halo)" opacity="${clamp(bp).toFixed(3)}"/>`;
    const swp = prog(t, 25.3, 1.1, ease.inOut);
    s += bottle(bcx, bcy + 5 * Math.sin(t * 1.2), bw, 1.5 * Math.sin(t * 0.9), lerp(0.6, 1, bp), clamp(bp * 2), swp > 0 && swp < 1 ? swp : -1, 'e');
  }
  // Price row
  const items = [['Sachet', 'Tk 3', 280], ['180 ml', 'Tk 180', 320], ['340 ml + PaniCheck', 'Tk 360', 520]];
  let x = (1920 - (280 + 320 + 520 + 60)) / 2;
  const y = 790, hh = 80;
  items.forEach(([lab, price, w], j) => {
    const pp = prog(t, 25.1 + j * 0.3, 0.55, ease.outBack);
    if (t > 25.1 + j * 0.3) {
      const cx = x + w / 2, cy = y + hh / 2;
      const ring = prog(t, 25.1 + j * 0.3, 0.8, ease.out);
      if (ring < 1) s += `<rect x="${f(x - 30 * ring)}" y="${f(y - 18 * ring)}" width="${f(w + 60 * ring)}" height="${f(hh + 36 * ring)}" rx="${f(40 + 18 * ring)}" fill="none" stroke="${AMB}" stroke-width="3" opacity="${(0.8 * (1 - ring)).toFixed(3)}"/>`;
      s += `<g transform="translate(${f(cx)} ${f(cy)}) scale(${pp.toFixed(3)}) translate(${f(-cx)} ${f(-cy)})" opacity="${clamp(pp * 2).toFixed(3)}">`;
      s += `<rect x="${f(x)}" y="${y}" width="${w}" height="${hh}" rx="40" fill="${C.navy2}" stroke="${AMB}" stroke-opacity="0.75" stroke-width="2.5"/>`;
      s += text(x + 32, y + 52, lab, { size: 30, weight: 600, fill: C.pale });
      s += text(x + w - 32, y + 56, price, { size: 44, weight: 700, fill: AMB, anchor: 'end' });
      s += '</g>';
    }
    x += w + 30;
  });
  return s;
}

module.exports = {
  id: 's05',
  duration: 28,
  render(t) {
    let s = bg(t, { glow: 0.6 }) + DEFS;
    s += beat1(t);
    s += beat2(t);
    s += beat3(t);
    s += beat4(t);
    s += tag(t >= 5.9 && t < 12.9 ? 'Illustrative animation' : 'Concept mock-up');
    return s;
  },
};
