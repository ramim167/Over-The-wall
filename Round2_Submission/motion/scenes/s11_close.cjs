// Scene 11 · 12 s · Close: clean aqua droplet glides down glossy hair (echo of s01), bottle hero shot with
// aqua rim light and the meter glowing once, Bangla CTA, then the logo lockup / end card (held > 3 s).
const { C, BN, FONT, text, prog, ease, lerp, clamp, bg, tag, meter, asset, ASSET_SIZE, esc } = require('../engine.cjs');

const N = 42, MID = 21;
const strand = (i, t) => {
  const x0 = 500 + i * 22, sway = 10 * Math.sin(t * 0.8 + i * 0.6);
  return [[x0, 40], [x0 + 40 + sway, 330], [x0 - 50, 620], [x0 + 20 + sway, 900]];
};
const bez = (P, u) => {
  const v = 1 - u;
  return [0, 1].map((k) => v * v * v * P[0][k] + 3 * v * v * u * P[1][k] + 3 * v * u * u * P[2][k] + u * u * u * P[3][k]);
};
const tan = (P, u) => {
  const v = 1 - u;
  return [0, 1].map((k) => 3 * v * v * (P[1][k] - P[0][k]) + 6 * v * u * (P[2][k] - P[1][k]) + 3 * u * u * (P[3][k] - P[2][k]));
};
const sub = (P, a, b, n = 14, dx = 0) => {
  let d = '';
  for (let j = 0; j <= n; j++) { const [x, y] = bez(P, lerp(a, b, j / n)); d += (j ? 'L' : 'M') + (x + dx).toFixed(1) + ',' + y.toFixed(1); }
  return d;
};
const BIW = ASSET_SIZE['bottle340.png'][0], BIH = ASSET_SIZE['bottle340.png'][1];
const bh = (w) => (w * BIH) / BIW;

module.exports = {
  id: 's11',
  duration: 12,
  render(t) {
    let s = bg(t, { glow: lerp(0.3, 0.55, prog(t, 2.5, 1.5)) });
    s += `<defs>
      <linearGradient id="s11hairFade" gradientUnits="userSpaceOnUse" x1="0" y1="40" x2="0" y2="900"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0"/><stop offset="0.12" stop-color="#FFFFFF" stop-opacity="1"/><stop offset="0.8" stop-color="#FFFFFF" stop-opacity="1"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>
      <mask id="s11hairMask"><rect width="1920" height="1080" fill="url(#s11hairFade)"/></mask>
      <radialGradient id="s11drop" cx="0.38" cy="0.62" r="0.75"><stop offset="0" stop-color="#F2FCFF"/><stop offset="0.45" stop-color="#7FDDF0"/><stop offset="1" stop-color="${C.aqua}"/></radialGradient>
      <radialGradient id="s11halo" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${C.aqua}" stop-opacity="0.55"/><stop offset="0.5" stop-color="${C.aqua}" stop-opacity="0.16"/><stop offset="1" stop-color="${C.aqua}" stop-opacity="0"/></radialGradient>
      <radialGradient id="s11mglow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#7FE3F5" stop-opacity="0.6"/><stop offset="1" stop-color="#7FE3F5" stop-opacity="0"/></radialGradient>
      <filter id="s11rim" x="-25%" y="-15%" width="150%" height="130%"><feGaussianBlur in="SourceAlpha" stdDeviation="22" result="b"/><feComponentTransfer in="b" result="b2"><feFuncA type="linear" slope="2.2"/></feComponentTransfer><feFlood flood-color="#4FD3EE"/><feComposite in2="b2" operator="in"/></filter>
      <image id="s11bottle" href="${asset('bottle340.png')}" x="0" y="0" width="${BIW}" height="${BIH}"/>
    </defs>`;

    // ---------- 0–3 s: glossy hair + clean aqua droplet ----------
    const hairOut = prog(t, 2.4, 0.8, ease.inOut);
    if (hairOut < 1) {
      let h = '';
      const sheen = 0.36 + 0.04 * t;
      for (let i = 0; i < N; i++) {
        const P = strand(i, t);
        const d = `M${P[0]} C${P[1]} ${P[2]} ${P[3]}`;
        h += `<path d="${d}" stroke="#0A0F2A" stroke-width="${9 + (i % 3)}" fill="none" stroke-linecap="round"/>`;
        h += `<path d="${d}" transform="translate(3 0)" stroke="#33407A" stroke-width="2" fill="none" opacity="0.65"/>`;
        // glossy highlight band (smooth wave across strands)
        const c = sheen + 0.045 * Math.sin(i * 0.28);
        h += `<path d="${sub(P, c - 0.12, c + 0.12, 14, 1)}" stroke="#7FC9DD" stroke-width="12" fill="none" stroke-linecap="round" opacity="0.10"/>`;
        h += `<path d="${sub(P, c - 0.085, c + 0.085, 12, 1.5)}" stroke="#BDEBF6" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.32"/>`;
        h += `<path d="${sub(P, c - 0.05, c + 0.05, 10, 1.5)}" stroke="#F4FDFF" stroke-width="1.8" fill="none" stroke-linecap="round" opacity="0.85"/>`;
        // second, softer sheen lower down
        const c2 = c + 0.3;
        h += `<path d="${sub(P, c2 - 0.05, c2 + 0.05, 8, 1.5)}" stroke="#CFF3FB" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.28"/>`;
      }
      // droplet runs smoothly down the centre strand
      const P = strand(MID, t);
      const u = lerp(0.1, 0.9, prog(t, 0.2, 2.6, ease.inOut));
      const u0 = Math.max(0.1, u - 0.32);
      h += `<path d="${sub(P, u0, u, 18, 4)}" stroke="#7FDDF0" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.45"/>`;
      h += `<path d="${sub(P, Math.max(0.1, u - 0.12), u, 8, 4)}" stroke="#EAFBFF" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.6"/>`;
      const [px, py] = bez(P, u), [tx, ty] = tan(P, u);
      const ang = (Math.atan2(ty, tx) * 180) / Math.PI - 90;
      h += `<g transform="translate(${px + 6} ${py}) rotate(${ang}) scale(0.62)">
        <ellipse cx="0" cy="34" rx="44" ry="14" fill="${C.aqua}" opacity="0.25"/>
        <path d="M0,-70 C0,-70 -36,-8 -36,16 A36,36 0 0 0 36,16 C36,-8 0,-70 0,-70 Z" fill="url(#s11drop)" opacity="0.96"/>
        <ellipse cx="-14" cy="6" rx="7" ry="15" fill="#FFFFFF" opacity="0.85"/>
        <circle cx="12" cy="30" r="4" fill="#FFFFFF" opacity="0.5"/></g>`;
      const zoom = 1 + 0.06 * hairOut + 0.015 * t;
      s += `<g opacity="${1 - hairOut}" mask="url(#s11hairMask)"><g transform="translate(960 470) scale(${zoom}) translate(-960 -470)">${h}</g></g>`;
    }

    // ---------- 2.5–12 s: bottle hero → end-card lockup ----------
    const bIn = prog(t, 2.7, 1.0, ease.out);
    if (bIn > 0) {
      const mv = prog(t, 6.8, 1.1, ease.inOut);
      const w = lerp(290, 250, mv), cx = lerp(560, 440, mv), y = lerp(110, 215, mv) + 40 * (1 - bIn);
      const h = bh(w), x = cx - w / 2, sc = w / BIW;
      const pulse = 0.85 + 0.15 * Math.sin(t * 2.2);
      s += `<ellipse cx="${cx}" cy="${y + h * 0.5}" rx="${w * 1.25}" ry="${h * 0.62}" fill="url(#s11halo)" opacity="${bIn * pulse}"/>`;
      s += `<ellipse cx="${cx}" cy="${y + h + 6}" rx="${w * 0.55}" ry="14" fill="#000000" opacity="${0.35 * bIn}"/>`;
      s += `<g opacity="${bIn}" transform="translate(${x} ${y}) scale(${sc})">
        <use href="#s11bottle" filter="url(#s11rim)" opacity="${0.9 * pulse}"/>
        <use href="#s11bottle"/></g>`;
      s += tag('Concept mock-up');

      // meter beneath the bottle, glows once
      const mOut = prog(t, 6.4, 0.5, ease.inOut);
      const mp = prog(t, 3.6, 1.0, ease.out);
      if (mp > 0 && mOut < 1) {
        const mx = 260, my = 752, mw = 600;
        const g = Math.sin(Math.PI * clamp((t - 4.7) / 1.0));
        let m = `<ellipse cx="${mx + mw / 2}" cy="${my + 17}" rx="${mw * 0.62}" ry="56" fill="url(#s11mglow)" opacity="${g}"/>`;
        m += meter(mx, my, mw, mp, -1, t);
        m += `<rect x="${mx}" y="${my - 6}" width="${mw}" height="46" rx="23" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="${0.8 * g}"/>`;
        const sx = lerp(mx - 80, mx + mw + 20, clamp((t - 4.7) / 1.0));
        if (g > 0.01) m += `<rect x="${sx}" y="${my}" width="60" height="34" fill="#FFFFFF" opacity="${0.45 * g}"/>`;
        s += `<g opacity="${1 - mOut}">${m}</g>`;
      }

      // CTA lines on the right
      const tOut = prog(t, 6.5, 0.5, ease.inOut);
      if (tOut < 1) {
        const RX = 1340;
        const a1 = prog(t, 3.0, 0.8, ease.out), a2 = prog(t, 3.6, 0.8, ease.out), a3 = prog(t, 4.5, 0.8, ease.out), a4 = prog(t, 5.0, 0.8, ease.out);
        let c = '';
        c += text(RX, 330 - 20 * (1 - a1), 'দোষ কি চুলের, নাকি পানির?', { size: 74, weight: 400, font: BN, anchor: 'middle', opacity: a1 });
        c += text(RX, 400 - 14 * (1 - a2), 'Is it your hair, or your water?', { size: 40, weight: 400, fill: C.aqua, anchor: 'middle', opacity: a2, italic: true });
        c += `<rect x="${RX - 160 * a3}" y="448" width="${320 * a3}" height="3" rx="1.5" fill="${C.aqua}" opacity="${0.6 * a3}"/>`;
        c += text(RX, 560 - 20 * (1 - a3), 'আগে পানি চেক করুন।', { size: 84, weight: 700, font: BN, fill: C.amber, anchor: 'middle', opacity: a3 });
        c += text(RX, 630 - 14 * (1 - a4), 'Check your water first.', { size: 40, weight: 400, fill: C.aqua, anchor: 'middle', opacity: a4, italic: true });
        s += `<g opacity="${1 - tOut}">${c}</g>`;
      }

      // ---------- End card (7–12 s) ----------
      const LX = 760;
      const e1 = prog(t, 7.3, 0.9, ease.out), e2 = prog(t, 7.6, 0.9, ease.out), e3 = prog(t, 7.9, 0.8, ease.out), e4 = prog(t, 8.15, 0.8, ease.out), e5 = prog(t, 8.4, 0.8, ease.out);
      if (e1 > 0) {
        let e = '';
        e += `<text x="${LX - 30 * (1 - e1)}" y="300" font-family="${FONT}" font-size="64" font-weight="600" fill="${C.white}" opacity="${e1}" letter-spacing="1">${esc('Parachute Naturale')}</text>`;
        e += `<text x="${LX - 30 * (1 - e2)}" y="402" font-family="${FONT}" font-size="104" font-weight="700" fill="${C.aqua}" opacity="${e2}" letter-spacing="-1">${esc('WaterSmart')}</text>`;
        e += `<rect x="${LX}" y="442" width="${520 * e3}" height="4" rx="2" fill="${C.amber}" opacity="${0.9 * e3}"/>`;
        e += text(LX, 512 + 14 * (1 - e3), 'Team The Last BrainCell', { size: 46, weight: 600, opacity: e3 });
        e += text(LX, 564 + 14 * (1 - e4), 'Nafis Mohtasim Ramim · Khandaker Shadman Sakib Siddiquee', { size: 30, weight: 400, fill: C.pale, opacity: e4 });
        // OTW logo on white rounded card + event line
        const lw = 230, lh = (lw * 242) / 512;
        const ly = 618 + 20 * (1 - e5);
        e += `<g opacity="${e5}"><rect x="${LX}" y="${ly}" width="${lw + 44}" height="${lh + 36}" rx="18" fill="#FFFFFF"/>`;
        e += `<image href="${asset('otw_logo.png')}" x="${LX + 22}" y="${ly + 18}" width="${lw}" height="${lh}"/>`;
        e += text(LX + lw + 80, ly + (lh + 36) / 2 + 11, 'Over The Wall Season 5 · Round 2', { size: 32, weight: 600, fill: C.pale });
        e += `</g>`;
        s += e;
      }
    }
    return s;
  },
};
