// Scene 3 · 0:23–0:42 · The problem is national: district map draws in, camera pushes into Dhaka,
// stat cards count up, a water ripple sweeps the city, end line "Water changes building to building."
const { C, text, count, prog, ease, lerp, clamp, bg, source, img, METER } = require('../engine.cjs');

const MX = 150, MY = 90, MW = 560, MH = MW * 1962 / 1400; // map placement (unzoomed)
const DX = MX + 0.49 * MW, DY = MY + 0.46 * MH;          // Dhaka in screen space (unzoomed)
const COL = 1010, CW = 850;                               // right column
const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

// Count-up then a 1.08 -> 1.0 pop, scaled around (x, y).
function popNum(t, start, dur, x, y, val, o, suffix = '') {
  const p = prog(t, start, dur, ease.out);
  const pop = prog(t, start + dur, 0.4, ease.out);
  const sc = pop > 0 && pop < 1 ? 1 + 0.08 * (1 - pop) : 1;
  return `<g transform="translate(${x} ${y}) scale(${sc}) translate(${-x} ${-y})">${text(x, y, count(p, val) + suffix, o)}</g>`;
}

// Card frame that slides in from the right and fades.
function cardIn(t, start, y, h, out) {
  const a = prog(t, start, 0.6, ease.out) * (1 - out);
  const dx = 70 * (1 - prog(t, start, 0.6, ease.out)) + 60 * out;
  return { a, dx, frame: `<g opacity="${a}" transform="translate(${dx} 0)"><rect x="${COL}" y="${y}" width="${CW}" height="${h}" rx="22" fill="${C.navy2}" fill-opacity="0.82" stroke="#FFFFFF" stroke-opacity="0.08"/><rect x="${COL}" y="${y + 24}" width="6" height="${h - 48}" rx="3" fill="${C.aqua}"/></g>` };
}

module.exports = {
  id: 's03',
  duration: 19,
  render(t) {
    let s = bg(t, { glow: 0.45 });

    // ---------- MAP ----------
    const push = prog(t, 7.4, 2.8, ease.inOut);
    const sc = lerp(1, 1.9, push);
    const cx = lerp(DX, 470, push), cy = lerp(DY, 470, push); // where Dhaka lands on screen
    const endDim = prog(t, 15.4, 0.8, ease.inOut);
    const wipe0 = 0.3, wipeD = 3.0;
    const front = lerp(MY - 120, MY + MH + 140, prog(t, wipe0, wipeD, ease.inOut)); // scan front (map space)
    const revealing = t < wipe0 + wipeD + 0.2;

    let defs = `<radialGradient id="s03vg" cx="0.5" cy="0.5" r="0.5"><stop offset="0.7" stop-color="#FFFFFF"/><stop offset="1" stop-color="#000000"/></radialGradient>
      <mask id="s03vm" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1080"><rect x="-260" y="40" width="1220" height="860" fill="url(#s03vg)"/><rect x="0" y="0" width="1000" height="1080" fill="#FFFFFF" opacity="${1 - push}"/></mask>
      <linearGradient id="s03scan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.aqua}" stop-opacity="0"/><stop offset="1" stop-color="${C.aqua}" stop-opacity="0.35"/></linearGradient>`;
    if (revealing) {
      // Mosaic reveal: cells light up just behind the scan front with jitter -> "district by district".
      const cell = 28;
      let cells = '';
      const cols = Math.ceil(MW / cell), rows = Math.ceil(MH / cell);
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = MX + i * cell, y = MY + j * cell;
          const jit = rnd(i * 31 + j * 7) * 130;
          const o = clamp((front - y - jit) / 70);
          if (o > 0) cells += `<rect x="${x}" y="${y}" width="${cell + 0.6}" height="${cell + 0.6}" fill="#FFFFFF" opacity="${o.toFixed(2)}"/>`;
        }
      }
      defs += `<mask id="s03m" maskUnits="userSpaceOnUse" x="${MX - 10}" y="${MY - 10}" width="${MW + 20}" height="${MH + 20}">${cells}</mask>`;
    }
    s += `<defs>${defs}</defs>`;

    let map = '';
    map += img('map.png', MX, MY, MW, `opacity="${revealing ? 0.1 : 0}"`); // ghost silhouette before reveal
    map += img('map.png', MX, MY, MW, revealing ? 'mask="url(#s03m)"' : '');
    if (revealing && front > MY - 40 && front < MY + MH + 60) {
      const fy = clamp(front - 40, MY - 20, MY + MH + 20);
      map += `<rect x="${MX - 30}" y="${fy - 70}" width="${MW + 60}" height="70" fill="url(#s03scan)"/>`;
      map += `<rect x="${MX - 30}" y="${fy - 1.5}" width="${MW + 60}" height="3" fill="${C.aqua}"/>`;
      map += `<rect x="${MX - 30}" y="${fy - 5}" width="${MW + 60}" height="10" fill="${C.aqua}" opacity="0.25"/>`;
    }
    s += `<g mask="url(#s03vm)" opacity="${1 - 0.35 * endDim}"><g transform="translate(${cx} ${cy}) scale(${sc}) translate(${-DX} ${-DY})">${map}</g>`;

    // Buildings around Dhaka that take on different hardness colours as the ripple passes.
    const rip0 = 10.4;
    if (t > rip0 - 0.2) {
      for (let k = 0; k < 30; k++) {
        const ang = rnd(k + 3) * Math.PI * 2, r = 36 + rnd(k + 57) * 200;
        const bx = cx + Math.cos(ang) * r, by = cy + Math.sin(ang) * r * 0.82;
        const ringR = (t - rip0) * 230;
        const on = clamp((ringR - r) / 40);
        if (on <= 0) continue;
        const ci = Math.floor(rnd(k + 99) * 4);
        const tw = 0.75 + 0.25 * Math.sin(t * 3 + k);
        const sz = 12 + 6 * rnd(k + 11);
        s += `<rect x="${bx - sz / 2}" y="${by - sz / 2}" width="${sz}" height="${sz}" rx="3" fill="${METER[ci][0]}" stroke="#FFFFFF" stroke-width="1.5" stroke-opacity="0.7" opacity="${(on * tw).toFixed(2)}"/>`;
      }
      // Water ripple rings sweeping out from the city.
      for (let k = 0; k < 3; k++) {
        const rp = clamp((t - rip0 - k * 0.55) / 2.6);
        if (rp <= 0 || rp >= 1) continue;
        const R = 20 + 300 * ease.out(rp);
        s += `<ellipse cx="${cx}" cy="${cy}" rx="${R}" ry="${R * 0.82}" fill="none" stroke="${C.aqua}" stroke-width="${5 - 3.5 * rp}" opacity="${(1 - rp) * 0.9}"/>`;
        s += `<ellipse cx="${cx}" cy="${cy}" rx="${R * 0.94}" ry="${R * 0.77}" fill="none" stroke="${C.aquaLt}" stroke-width="1.5" opacity="${(1 - rp) * 0.5}"/>`;
      }
    }
    s += `</g>`;

    // Dhaka pin: drops in with outBack, pulse rings.
    const pin = prog(t, 8.6, 0.6, ease.outBack);
    if (pin > 0) {
      const pa = clamp((t - 8.6) / 0.25);
      for (let k = 0; k < 2; k++) {
        const ph = ((t - 8.6) / 1.4 + k * 0.5) % 1;
        s += `<circle cx="${cx}" cy="${cy}" r="${10 + 46 * ph}" fill="none" stroke="${C.aqua}" stroke-width="3" opacity="${pa * (1 - ph) * 0.9}"/>`;
      }
      const py = cy - 70 * (1 - pin);
      s += `<g opacity="${pa}"><ellipse cx="${cx}" cy="${cy + 2}" rx="11" ry="4" fill="#000" opacity="0.35"/>
        <path transform="translate(${cx} ${py})" d="M0,0 C-6,-14 -20,-24 -20,-40 A20,20 0 1 1 20,-40 C20,-24 6,-14 0,0 Z" fill="${C.aqua}" stroke="#FFFFFF" stroke-width="2.5"/>
        <circle cx="${cx}" cy="${py - 40}" r="7.5" fill="#FFFFFF"/></g>`;
      const la = prog(t, 9.0, 0.5, ease.out) * (1 - endDim * 0.3);
      s += `<g opacity="${la}"><rect x="${cx + 30}" y="${cy - 84}" width="118" height="44" rx="22" fill="${C.navy3}" fill-opacity="0.85" stroke="${C.aqua}" stroke-opacity="0.7"/>${text(cx + 89, cy - 54, 'Dhaka', { size: 26, weight: 600, anchor: 'middle' })}</g>`;
    }

    // ---------- RIGHT COLUMN ----------
    const out = prog(t, 15.2, 0.7, ease.inOut);
    const h1 = prog(t, 0.3, 0.7, ease.out);
    s += text(COL, 170 - 20 * (1 - h1), 'The problem is national', { size: 64, weight: 600, opacity: h1 * (1 - out) });

    // Card 1 · 58 of 61 districts
    {
      const y = 215, h = 195, st = 2.6;
      const k = cardIn(t, st, y, h, out);
      s += k.frame;
      if (k.a > 0) {
        s += `<g opacity="${k.a}" transform="translate(${k.dx} 0)">`;
        s += popNum(t, st + 0.3, 1.3, COL + 44, y + 118, 58, { size: 104, weight: 700, fill: C.amber });
        s += text(COL + 180, y + 118, 'of 61', { size: 52, weight: 600 });
        s += text(COL + 44, y + 166, 'districts: most wells iron-rich or hard', { size: 28, weight: 400, fill: C.pale });
        // 61 ticks, 58 fill rust as the count runs.
        const fill = Math.round(58 * prog(t, st + 0.3, 1.3, ease.out));
        for (let i = 0; i < 61; i++) {
          const tx = COL + 400 + i * 6.9;
          s += `<rect x="${tx}" y="${y + 52}" width="4" height="70" rx="2" fill="${i < fill ? C.rustLt : '#FFFFFF'}" opacity="${i < fill ? 0.95 : 0.16}"/>`;
        }
        s += '</g>';
      }
    }
    // Card 2 · 65% iron · 58% hard
    {
      const y = 432, h = 215, st = 5.0;
      const k = cardIn(t, st, y, h, out);
      s += k.frame;
      if (k.a > 0) {
        s += `<g opacity="${k.a}" transform="translate(${k.dx} 0)">`;
        s += popNum(t, st + 0.3, 1.2, COL + 44, y + 108, 65, { size: 96, weight: 700, fill: C.amber }, '%');
        s += text(COL + 44, y + 152, 'of wells above the iron', { size: 26, weight: 400, fill: C.pale });
        s += text(COL + 44, y + 184, 'staining level', { size: 26, weight: 400, fill: C.pale });
        s += `<rect x="${COL + 430}" y="${y + 36}" width="2" height="${h - 72}" fill="#FFFFFF" opacity="0.15"/>`;
        s += popNum(t, st + 0.8, 1.2, COL + 474, y + 108, 58, { size: 96, weight: 700, fill: C.amber }, '%');
        s += text(COL + 474, y + 152, 'hard or very hard', { size: 26, weight: 400, fill: C.pale });
        s += '</g>';
      }
    }
    // Card 3 · 6 of 12 Dhaka taps (2025)
    {
      const y = 670, h = 195, st = 9.2;
      const k = cardIn(t, st, y, h, out);
      s += k.frame;
      if (k.a > 0) {
        s += `<g opacity="${k.a}" transform="translate(${k.dx} 0)">`;
        s += popNum(t, st + 0.3, 1.0, COL + 44, y + 118, 6, { size: 104, weight: 700, fill: C.amber });
        s += text(COL + 120, y + 118, 'of 12', { size: 52, weight: 600 });
        s += text(COL + 44, y + 166, 'Dhaka tap locations tested hard (2025)', { size: 28, weight: 400, fill: C.pale });
        const lit = 6 * prog(t, st + 0.3, 1.0, ease.out);
        for (let i = 0; i < 12; i++) {
          const tx = COL + 520 + (i % 6) * 50, ty = y + 58 + Math.floor(i / 6) * 50;
          const on = clamp(lit - i);
          s += `<circle cx="${tx}" cy="${ty}" r="16" fill="${C.rustLt}" opacity="${on}"/><circle cx="${tx}" cy="${ty}" r="16" fill="none" stroke="#FFFFFF" stroke-opacity="${on > 0 ? 0 : 0.35}" stroke-width="2"/>`;
        }
        s += '</g>';
      }
    }

    // ---------- END BEAT ----------
    const e1 = prog(t, 15.9, 0.7, ease.out), e2 = prog(t, 16.4, 0.7, ease.out), e3 = prog(t, 17.1, 0.6, ease.outBack);
    if (e1 > 0) {
      s += text(COL, 400 - 20 * (1 - e1), 'Water changes', { size: 72, weight: 600, opacity: e1 });
      s += text(COL, 492 - 20 * (1 - e2), 'building to building.', { size: 72, weight: 600, opacity: e2 });
      const ea = clamp((t - 17.1) / 0.3);
      s += `<g transform="translate(${COL} 620) scale(${0.9 + 0.1 * e3}) translate(${-COL} -620)">${text(COL, 620, 'Check your own.', { size: 80, weight: 700, fill: C.aqua, opacity: ea })}</g>`;
      s += `<rect x="${COL}" y="660" width="${340 * prog(t, 17.4, 0.6, ease.out)}" height="6" rx="3" fill="${C.aqua}" opacity="0.8"/>`;
    }

    s += source('BGS & DPHE national well survey, 3,530 wells with results, 1998–99 · ICCEI 2025 Dhaka tap study', 0.6 * prog(t, 2.6, 0.8, ease.out));
    return s;
  },
};
