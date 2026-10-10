// Scene 8 · 18 s · Why Marico wins: shelf slot (#2 Naturale), Mouchak factory line, strategy triangle, LonaJol coast.
const { C, W, H, text, count, prog, ease, lerp, clamp, bg, tag, source, img, ASSET_SIZE } = require('../engine.cjs');

const ID = 's08';
// Visibility window for a beat: eased fade in at a, fade out ending at b.
const win = (t, a, b, fin = 0.5, fout = 0.45) => Math.min(a <= 0 ? 1 : prog(t, a, fin, ease.out), 1 - prog(t, b - fout, fout, ease.in));
// Count-up settle pop: 1 -> 1.08 -> 1 just after the counter lands.
const popScale = (t, end) => 1 + 0.08 * Math.sin(Math.PI * prog(t, end, 0.4, ease.out));
const scaled = (x, y, s, body) => `<g transform="translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})">${body}</g>`;
const f = (v) => v.toFixed(1);

// Generic pale bottle silhouette standing on `base`.
function bottle(cx, base, w, h, o = {}) {
  const { op = 1, fill = `url(#${ID}pb)`, level = 0 } = o;
  const bw = w / 2, nw = w * 0.18, r = w * 0.16;
  const bodyTop = base - h * 0.62, neckY = base - h * 0.8, capY = base - h * 0.88, top = base - h;
  const d = `M${f(cx - bw + r)},${base} L${f(cx + bw - r)},${base} Q${f(cx + bw)},${base} ${f(cx + bw)},${f(base - r)} L${f(cx + bw)},${f(bodyTop)} Q${f(cx + bw)},${f(neckY)} ${f(cx + nw)},${f(neckY)} L${f(cx + nw)},${f(capY)} L${f(cx - nw)},${f(capY)} L${f(cx - nw)},${f(neckY)} Q${f(cx - bw)},${f(neckY)} ${f(cx - bw)},${f(bodyTop)} L${f(cx - bw)},${f(base - r)} Q${f(cx - bw)},${base} ${f(cx - bw + r)},${base} Z`;
  let s = `<g opacity="${op}"><path d="${d}" fill="${fill}"/>`;
  if (level > 0) {
    const lh = (h * 0.6) * level;
    s += `<rect x="${f(cx - bw + 3)}" y="${f(base - 3 - lh)}" width="${f(w - 6)}" height="${f(lh)}" rx="${f(r * 0.7)}" fill="${C.aqua}" opacity="0.85"/>`;
  }
  s += `<rect x="${f(cx - nw - 4)}" y="${f(top)}" width="${f(nw * 2 + 8)}" height="${f(capY - top + 1)}" rx="4" fill="#E9EEF8" opacity="0.9"/>`;
  s += `<rect x="${f(cx - bw + 8)}" y="${f(bodyTop + h * 0.12)}" width="${f(w - 16)}" height="${f(h * 0.2)}" rx="6" fill="#FFFFFF" opacity="0.22"/>`;
  s += `<rect x="${f(cx - bw + w * 0.12)}" y="${f(bodyTop + 6)}" width="${f(w * 0.07)}" height="${f(h * 0.5)}" rx="${f(w * 0.035)}" fill="#FFFFFF" opacity="0.35"/></g>`;
  return s;
}

function gear(cx, cy, r, n, a) {
  const pts = [];
  for (let i = 0; i < n * 4; i++) {
    const ang = a + (i / (n * 4)) * Math.PI * 2;
    const rr = i % 4 < 2 ? r : r * 0.8;
    pts.push(`${f(cx + rr * Math.cos(ang))},${f(cy + rr * Math.sin(ang))}`);
  }
  let s = `<path d="M${pts.join('L')}Z" fill="${C.navy2}" stroke="${C.aqua}" stroke-width="3" stroke-linejoin="round"/>`;
  for (let k = 0; k < 3; k++) {
    const ang = a + k * (Math.PI * 2 / 3);
    s += `<line x1="${cx}" y1="${cy}" x2="${f(cx + r * 0.62 * Math.cos(ang))}" y2="${f(cy + r * 0.62 * Math.sin(ang))}" stroke="${C.aqua}" stroke-width="3" opacity="0.5"/>`;
  }
  return s + `<circle cx="${cx}" cy="${cy}" r="${f(r * 0.24)}" fill="${C.navy3}" stroke="${C.aqua}" stroke-width="3"/>`;
}

// ---------- Beat A (0–5 s): premium shelf, WaterSmart slots in, #2 ----------
function beatA(t) {
  const shelfIn = prog(t, 0, 0.9, ease.out);
  let s = `<g transform="translate(0 ${f(30 * (1 - shelfIn))})" opacity="${shelfIn}">`;
  // Back panel + light strip
  s += `<rect x="900" y="170" width="940" height="630" rx="26" fill="url(#${ID}panel)" stroke="${C.aqua}" stroke-opacity="0.18" stroke-width="2"/>`;
  s += `<rect x="930" y="202" width="880" height="330" fill="url(#${ID}cone)"/>`;
  s += `<rect x="930" y="194" width="880" height="8" rx="4" fill="${C.aquaLt}" opacity="${0.85 + 0.1 * Math.sin(t * 3)}"/>`;
  // Plank
  s += `<rect x="890" y="800" width="960" height="26" fill="#000" opacity="0.25"/>`;
  s += `<rect x="886" y="760" width="968" height="40" rx="6" fill="url(#${ID}wood)"/>`;
  s += `<rect x="886" y="760" width="968" height="4" rx="2" fill="#E2B486" opacity="0.6"/>`;
  s += '</g>';
  // Generic Naturale-range silhouettes
  [[1050, 128, 300, 0.3], [1250, 138, 340, 0.45], [1690, 122, 285, 0.6]].forEach(([cx, w, h, st]) => {
    const p = prog(t, st, 0.7, ease.out);
    s += `<g transform="translate(0 ${f(40 * (1 - p))})">${bottle(cx, 760, w, h, { op: 0.55 * p })}</g>`;
  });
  // WaterSmart bottle slides in from the right and slots at x 1470
  const bw = 190, bh = bw * ASSET_SIZE['bottle340.png'][1] / ASSET_SIZE['bottle340.png'][0];
  const slide = prog(t, 1.1, 1.2, ease.outBack);
  const cx = lerp(2150, 1470, slide);
  const glow = prog(t, 2.1, 0.7, ease.out);
  const pulse = glow * (0.75 + 0.25 * Math.sin(t * 2.6));
  s += `<ellipse cx="1470" cy="560" rx="${f(150 + 30 * glow)}" ry="260" fill="url(#${ID}glow)" opacity="${f(pulse)}"/>`;
  s += `<ellipse cx="1470" cy="764" rx="${f(120 * glow)}" ry="12" fill="${C.aqua}" opacity="${f(0.55 * glow)}"/>`;
  s += `<ellipse cx="${f(cx)}" cy="764" rx="86" ry="9" fill="#000" opacity="0.35"/>`;
  s += img('bottle340.png', f(cx - bw / 2), f(764 - bh), bw);
  // Left copy
  const eIn = prog(t, 0.4, 0.7, ease.out);
  const nP = prog(t, 1.6, 0.7, ease.out);
  const n = Math.max(1, Math.round(2 * nP));
  if (nP > 0) s += scaled(120, 420, popScale(t, 2.3), text(120, 470 - 20 * (1 - nP), '#' + n, { size: 250, weight: 700, fill: C.amber, opacity: nP }));
  const l1 = prog(t, 2.4, 0.7, ease.out), l2 = prog(t, 2.7, 0.7, ease.out);
  s += text(126, 560 + 16 * (1 - l1), 'most penetrated shampoo brand:', { size: 42, weight: 600, opacity: l1 });
  s += text(126, 630 + 16 * (1 - l2), 'Parachute Naturale', { size: 56, weight: 700, fill: C.aqua, opacity: l2 });
  s += `<rect x="126" y="672" width="${f(120 * l2)}" height="5" rx="2.5" fill="${C.aqua}" opacity="${l2}"/>`;
  s += `<g opacity="${eIn}">${tag('Concept mock-up')}</g>`;
  return s;
}

// ---------- Beat B (5–10 s): stylised Mouchak factory line ----------
function beatB(t) {
  const lt = t - 5;
  let s = '';
  // Gears + pipe (behind)
  s += `<rect x="1040" y="384" width="420" height="14" rx="7" fill="${C.navy2}" stroke="${C.aqua}" stroke-opacity="0.35" stroke-width="2"/>`;
  s += gear(1540, 400, 86, 12, lt * 0.9);
  s += gear(1688, 312, 56, 8, -lt * 0.9 * 86 / 56 + 0.2);
  s += gear(1130, 300, 40, 7, -lt * 1.6);
  // Belt frame, legs, floor
  s += `<line x1="80" y1="834" x2="1840" y2="834" stroke="${C.pale}" stroke-opacity="0.18" stroke-width="2"/>`;
  [220, 760, 1300, 1760].forEach((x) => { s += `<rect x="${x - 9}" y="700" width="18" height="134" rx="4" fill="${C.navy2}"/>`; });
  s += `<rect x="100" y="690" width="1720" height="18" rx="6" fill="${C.navy2}" stroke="${C.aqua}" stroke-opacity="0.25"/>`;
  s += `<rect x="100" y="660" width="1720" height="30" rx="15" fill="#0A0F2A" stroke="#33449A" stroke-width="2"/>`;
  const speed = 140, off = (lt * speed) % 40;
  for (let x = 120 + off; x < 1800; x += 40) s += `<line x1="${f(x)}" y1="664" x2="${f(x)}" y2="686" stroke="#2A3A80" stroke-width="3"/>`;
  [115, 1805].forEach((x) => {
    s += `<circle cx="${x}" cy="675" r="16" fill="${C.navy2}" stroke="${C.aqua}" stroke-width="2"/>`;
    const a = lt * speed / 16;
    s += `<line x1="${f(x - 12 * Math.cos(a))}" y1="${f(675 - 12 * Math.sin(a))}" x2="${f(x + 12 * Math.cos(a))}" y2="${f(675 + 12 * Math.sin(a))}" stroke="${C.aqua}" stroke-width="2"/>`;
  });
  // Bottles gliding; fill as they pass the nozzle at x 960
  const N = 11, sp = 170, span = N * sp;
  let nearest = 999;
  s += `<g clip-path="url(#${ID}belt)">`;
  for (let i = 0; i < N; i++) {
    const x = ((i * sp + lt * speed) % span) + 20;
    nearest = Math.min(nearest, Math.abs(x - 960));
    const level = clamp((x - 925) / 80);
    const edge = clamp((x - 100) / 80) * clamp((1820 - x) / 80);
    s += bottle(x, 660, 58, 132, { op: 0.9 * edge, level });
  }
  s += '</g>';
  // Filling head
  const down = clamp(1 - nearest / 70);
  const tipY = 498 + 18 * down;
  if (down > 0.25) s += `<rect x="955" y="${f(tipY)}" width="10" height="${f(560 - tipY)}" rx="5" fill="${C.aqua}" opacity="${f(down)}"/>`;
  s += `<rect x="948" y="470" width="24" height="${f(tipY - 470)}" fill="#3B4A9A"/>`;
  s += `<path d="M942,${f(tipY - 6)} L978,${f(tipY - 6)} L968,${f(tipY + 6)} L952,${f(tipY + 6)} Z" fill="${C.aquaLt}"/>`;
  s += `<rect x="880" y="360" width="160" height="112" rx="16" fill="${C.navy2}" stroke="${C.aqua}" stroke-opacity="0.5" stroke-width="2"/>`;
  s += `<circle cx="1012" cy="386" r="7" fill="${C.green}" opacity="${f(0.5 + 0.5 * Math.abs(Math.sin(lt * 4)))}"/>`;
  s += `<rect x="900" y="410" width="90" height="10" rx="5" fill="${C.aqua}" opacity="0.35"/><rect x="900" y="430" width="60" height="10" rx="5" fill="${C.aqua}" opacity="0.25"/>`;
  // Copy
  const h1 = prog(t, 5.3, 0.6, ease.out), h2 = prog(t, 5.6, 0.6, ease.out);
  s += text(120, 240 + 16 * (1 - h1), 'Mouchak lines', { size: 66, weight: 700, opacity: h1 });
  const cp = prog(t, 5.8, 0.9, ease.out);
  const num = '+' + count(cp, 45) + '%';
  const sc = popScale(t, 6.7);
  s += `<text x="122" y="${f(300 + 14 * (1 - h2))}" font-family="Segoe UI" font-size="38" font-weight="600" fill="${C.pale}" opacity="${h2}">(<tspan fill="${C.amber}" font-weight="700" font-size="${f(38 * sc)}">${num}</tspan> shampoo batch capacity, FY26)</text>`;
  const ch = prog(t, 7.0, 0.6, ease.outBack);
  if (ch > 0) {
    s += scaled(120, 372, 0.85 + 0.15 * ch, `<g opacity="${clamp(ch)}"><rect x="120" y="340" width="430" height="64" rx="32" fill="${C.aqua}" fill-opacity="0.16" stroke="${C.aqua}" stroke-width="2"/>
      <text x="150" y="383" font-family="Segoe UI" font-size="32" font-weight="600" fill="${C.pale}">Buy only: <tspan fill="#FFFFFF" font-weight="700">strip + GLDA</tspan></text></g>`);
  }
  return s;
}

// ---------- Beat C (10–14.5 s): strategy triangle ----------
const ICON = {
  // light bulb
  0: (x, y) => `<circle cx="${x}" cy="${y - 6}" r="15" fill="none" stroke="#fff" stroke-width="4"/><rect x="${x - 8}" y="${y + 12}" width="16" height="6" rx="2" fill="#fff"/><rect x="${x - 6}" y="${y + 21}" width="12" height="4" rx="2" fill="#fff"/>`,
  // branching arrows
  1: (x, y) => `<path d="M${x},${y + 20} L${x},${y} M${x},${y} L${x - 16},${y - 16} M${x},${y} L${x + 16},${y - 16} M${x},${y} L${x},${y - 22}" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none"/>`,
  // rising bars
  2: (x, y) => `<rect x="${x - 20}" y="${y + 4}" width="10" height="16" rx="2" fill="#fff"/><rect x="${x - 5}" y="${y - 8}" width="10" height="28" rx="2" fill="#fff"/><rect x="${x + 10}" y="${y - 20}" width="10" height="40" rx="2" fill="#fff"/>`,
};
function beatC(t) {
  const P = [[960, 250], [650, 740], [1270, 740]];
  let s = '';
  const fillP = prog(t, 11.6, 0.8, ease.out);
  s += `<path d="M${P[0]}L${P[1]}L${P[2]}Z" fill="${C.aqua}" opacity="${f(0.1 * fillP)}"/>`;
  // edges draw in
  [[0, 1], [1, 2], [2, 0]].forEach(([a, b], k) => {
    const len = Math.hypot(P[b][0] - P[a][0], P[b][1] - P[a][1]);
    const p = prog(t, 10.3 + k * 0.4, 0.7, ease.inOut);
    s += `<line x1="${P[a][0]}" y1="${P[a][1]}" x2="${P[b][0]}" y2="${P[b][1]}" stroke="${C.aqua}" stroke-width="4" stroke-dasharray="${f(len)}" stroke-dashoffset="${f(len * (1 - p))}" stroke-linecap="round" opacity="0.8"/>`;
  });
  // centre product
  const bp = prog(t, 11.9, 0.8, ease.out);
  const bw = 86, bh = bw * ASSET_SIZE['bottle180.png'][1] / ASSET_SIZE['bottle180.png'][0];
  s += `<ellipse cx="960" cy="590" rx="${f(130 * bp)}" ry="${f(150 * bp)}" fill="url(#${ID}glow)" opacity="${f(0.7 * bp)}"/>`;
  s += `<g opacity="${bp}" transform="translate(0 ${f(20 * (1 - bp))})">${img('bottle180.png', 960 - bw / 2, 590 - bh / 2 + 10, bw)}</g>`;
  // corner nodes pop in
  const labels = [['Innovation', 960, 168, 'middle'], ['Diversification', 572, 754, 'end'], ['Scaling up', 1348, 754, 'start']];
  P.forEach(([x, y], i) => {
    const p = prog(t, 10.2 + i * 0.5, 0.6, ease.outBack);
    if (p <= 0) return;
    const ring = prog(t, 10.2 + i * 0.5, 0.9, ease.out);
    s += `<circle cx="${x}" cy="${y}" r="${f(46 + 40 * ring)}" fill="none" stroke="${C.aqua}" stroke-width="3" opacity="${f(0.6 * (1 - ring))}"/>`;
    s += scaled(x, y, Math.max(0, p), `<circle cx="${x}" cy="${y}" r="50" fill="${C.teal}" stroke="${C.aquaLt}" stroke-width="3"/>${ICON[i](x, y)}`);
    const lp = prog(t, 10.4 + i * 0.5, 0.6, ease.out);
    const [l, lx, ly, an] = labels[i];
    s += text(lx, ly + 12 * (1 - lp), l, { size: 46, weight: 700, anchor: an, opacity: lp });
  });
  s += `<g opacity="${bp}">${tag('Concept mock-up')}</g>`;
  return s;
}

// ---------- Beat D (14.5–18 s): coastal dusk, LonaJol next ----------
function beatD(t) {
  const lt = t - 14.4;
  const z = lerp(1.05, 1, prog(t, 14.4, 3.6, ease.out));
  let s = `<g transform="translate(960 540) scale(${f(z * 1000) / 1000}) translate(-960 -540)">`;
  s += `<rect x="-20" y="-20" width="1960" height="620" fill="url(#${ID}sky)"/>`;
  // sun + glow
  s += `<circle cx="1440" cy="590" r="260" fill="url(#${ID}sun)"/>`;
  s += `<circle cx="1440" cy="590" r="66" fill="#FFD9AE"/>`;
  // sea
  s += `<rect x="-20" y="590" width="1960" height="510" fill="url(#${ID}sea)"/>`;
  for (let k = 0; k < 7; k++) {
    const y = 610 + k * k * 9 + k * 18;
    const amp = 3 + k * 1.6, ph = lt * (1.2 + k * 0.15) + k;
    let d = '';
    for (let x = -20; x <= 1940; x += 40) d += (x === -20 ? 'M' : 'L') + `${x},${f(y + amp * Math.sin(x / (90 + k * 20) + ph))}`;
    s += `<path d="${d}" fill="none" stroke="${C.aquaLt}" stroke-width="${f(1.5 + k * 0.4)}" opacity="${f(0.32 - k * 0.03)}"/>`;
  }
  // sun reflection
  for (let k = 0; k < 9; k++) {
    const y = 608 + k * 24, w = (140 - k * 10) * (0.7 + 0.3 * Math.sin(lt * 3 + k));
    s += `<rect x="${f(1440 - w / 2)}" y="${y}" width="${f(w)}" height="4" rx="2" fill="#FFD9AE" opacity="${f(0.55 - k * 0.05)}"/>`;
  }
  // shoreline with foam wash
  const wash = 14 * Math.sin(lt * 1.8);
  s += `<path d="M-20,${f(820 + wash)} C400,${f(770 + wash)} 900,${f(830 + wash)} 1940,${f(790 + wash)} L1940,1100 L-20,1100 Z" fill="${C.aquaLt}" opacity="0.35"/>`;
  s += `<path d="M-20,830 C400,784 900,842 1940,804 L1940,1100 L-20,1100 Z" fill="url(#${ID}sand)"/>`;
  s += '</g>';
  // fade bottom to navy so subtitle band stays clean
  s += `<rect x="0" y="760" width="1920" height="320" fill="url(#${ID}foot)"/>`;
  // copy
  const pp = prog(t, 14.8, 0.6, ease.outBack), hp = prog(t, 15.0, 0.7, ease.out);
  if (pp > 0) s += scaled(120, 236, 0.85 + 0.15 * pp, `<g opacity="${clamp(pp)}"><rect x="120" y="210" width="168" height="54" rx="27" fill="${C.aqua}" fill-opacity="0.2" stroke="${C.aquaLt}" stroke-width="2"/>${text(204, 247, 'Phase 2', { size: 28, weight: 700, anchor: 'middle' })}</g>`);
  s += text(120, 350 + 18 * (1 - hp), 'Next: LonaJol for coastal saline water', { size: 64, weight: 700, opacity: hp });
  return s;
}

const DEFS = `<defs>
  <linearGradient id="${ID}pb" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E4F0EA"/><stop offset="0.5" stop-color="#C8DCD6"/><stop offset="1" stop-color="#9FB6C4"/></linearGradient>
  <linearGradient id="${ID}panel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#26327C"/><stop offset="1" stop-color="#121A4C"/></linearGradient>
  <linearGradient id="${ID}cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E3F5FA" stop-opacity="0.22"/><stop offset="1" stop-color="#E3F5FA" stop-opacity="0"/></linearGradient>
  <linearGradient id="${ID}wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9A6A42"/><stop offset="1" stop-color="#5A3A22"/></linearGradient>
  <radialGradient id="${ID}glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${C.aqua}" stop-opacity="0.55"/><stop offset="1" stop-color="${C.aqua}" stop-opacity="0"/></radialGradient>
  <clipPath id="${ID}belt"><rect x="100" y="380" width="1720" height="300"/></clipPath>
  <linearGradient id="${ID}sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121A4C"/><stop offset="0.45" stop-color="#3A3478"/><stop offset="0.78" stop-color="#9A5677"/><stop offset="1" stop-color="#E59A72"/></linearGradient>
  <radialGradient id="${ID}sun" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFC890" stop-opacity="0.7"/><stop offset="1" stop-color="#FFC890" stop-opacity="0"/></radialGradient>
  <linearGradient id="${ID}sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3D3F80"/><stop offset="1" stop-color="#0E1440"/></linearGradient>
  <linearGradient id="${ID}sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6E5A78"/><stop offset="1" stop-color="#2A2450"/></linearGradient>
  <linearGradient id="${ID}foot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.navy3}" stop-opacity="0"/><stop offset="0.55" stop-color="${C.navy3}" stop-opacity="0.85"/><stop offset="1" stop-color="${C.navy3}" stop-opacity="1"/></linearGradient>
</defs>`;

module.exports = {
  id: ID,
  duration: 18,
  render(t) {
    let s = bg(t, { glow: 0.45 }) + DEFS;
    const a = win(t, 0, 5.0), b = win(t, 4.9, 10.0), c = win(t, 9.9, 14.5), d = win(t, 14.4, 19);
    if (a > 0) s += `<g opacity="${f(a * 1000) / 1000}" transform="translate(${f(-40 * (1 - a) * (t > 2.5 ? 1 : 0))} 0)">${beatA(t)}</g>`;
    if (b > 0) s += `<g opacity="${f(b * 1000) / 1000}">${beatB(t)}</g>`;
    if (c > 0) s += `<g opacity="${f(c * 1000) / 1000}">${beatC(t)}</g>`;
    if (d > 0) s += `<g opacity="${f(d * 1000) / 1000}">${beatD(t)}</g>`;
    // persistent eyebrow (beats A–C)
    const ey = Math.min(prog(t, 0.2, 0.6, ease.out), 1 - prog(t, 14.0, 0.4, ease.in));
    s += text(122, 140, 'Why Marico wins', { size: 28, weight: 600, fill: C.aqua, ls: 2, opacity: ey });
    s += `<rect x="122" y="156" width="${f(64 * ey)}" height="4" rx="2" fill="${C.aqua}" opacity="${ey}"/>`;
    s += source('Marico Bangladesh Annual Report FY2025-26');
    return s;
  },
};
