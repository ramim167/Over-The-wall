// Scene 10 · 9 s · Low-risk ask: phased timeline with a progress dot, four go/no-go gates tick green,
// then the amber "Tk 3.5 Cr" lands centre-stage with a ring burst.
const { C, text, prog, ease, lerp, clamp, bg } = require('../engine.cjs');

const X0 = 200, X1 = 1720, PX = (X1 - X0) / 16; // 16 months
const TY = 205; // timeline bar centre y
const PHASES = [
  { m0: 0, m1: 6, code: 'M1–6', name: 'R&D', col: C.teal },
  { m0: 6, m1: 12, code: 'M7–12', name: 'Pilot (~1,500 outlets)', col: C.aqua },
  { m0: 12, m1: 16, code: 'M13–16', name: 'National launch', col: '#5A6BC0' },
];
const GATES = [
  ['Rate of sale', '≥70%'],
  ['Paid repeat', '≥25%'],
  ['Blended margin', '≥45%'],
  ['Strip complaints', '<2%'],
];
const GX = 180, GW = 360, GGAP = 40, GY = 345, GH = 140;

module.exports = {
  id: 's10',
  duration: 9,
  render(t) {
    let s = bg(t, { glow: 0.45 });
    s += `<defs>
      <radialGradient id="s10dot" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0.9"/><stop offset="0.35" stop-color="${C.aqua}" stop-opacity="0.55"/><stop offset="1" stop-color="${C.aqua}" stop-opacity="0"/></radialGradient>
      <radialGradient id="s10amb" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${C.amber}" stop-opacity="0.42"/><stop offset="0.55" stop-color="${C.amber}" stop-opacity="0.10"/><stop offset="1" stop-color="${C.amber}" stop-opacity="0"/></radialGradient>
      <linearGradient id="s10fill" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${C.teal}"/><stop offset="1" stop-color="#7FE3F5"/></linearGradient>
    </defs>`;

    // Upper content dims when the ask lands.
    const dim = lerp(1, 0.38, prog(t, 5.2, 0.6, ease.inOut));

    // ---------- Timeline ----------
    const tin = prog(t, 0.1, 1.1, ease.out);
    let tl = '';
    // base track
    tl += `<rect x="${X0}" y="${TY - 3}" width="${(X1 - X0) * prog(t, 0.1, 1.0, ease.inOut)}" height="6" rx="3" fill="${C.pale}" opacity="0.25"/>`;
    PHASES.forEach((ph, i) => {
      const pp = prog(t, 0.3 + i * 0.22, 0.8, ease.out);
      const xa = X0 + ph.m0 * PX + 8, xb = X0 + ph.m1 * PX - 8;
      const mid = (xa + xb) / 2;
      tl += `<rect x="${xa}" y="${TY - 9}" width="${Math.max(0, (xb - xa) * pp)}" height="18" rx="9" fill="${ph.col}" opacity="${0.55 * pp}"/>`;
      tl += text(mid, TY - 38 + 12 * (1 - pp), ph.code, { size: 28, weight: 700, fill: i === 1 ? '#7FE3F5' : C.aqua, anchor: 'middle', opacity: pp, ls: 1 });
      tl += text(mid, TY + 62 - 12 * (1 - pp), ph.name, { size: 36, weight: 600, anchor: 'middle', opacity: pp });
    });
    // Progress fill + dot travelling through R&D and the pilot to the go/no-go gate.
    const dp = prog(t, 1.0, 3.4, ease.inOut);
    const dx = lerp(X0, X0 + 12 * PX, dp);
    const dotOn = prog(t, 0.8, 0.4, ease.out);
    if (dp > 0) tl += `<rect x="${X0}" y="${TY - 9}" width="${dx - X0}" height="18" rx="9" fill="url(#s10fill)" opacity="0.95"/>`;
    // Gate marker at month 12 (go/no-go).
    const gx = X0 + 12 * PX;
    const go = prog(t, 4.4, 0.5, ease.outBack);
    const gateCol = go > 0.05 ? C.green : C.pale;
    tl += `<g transform="translate(${gx} ${TY}) rotate(45)"><rect x="-17" y="-17" width="34" height="34" rx="6" fill="${go > 0.05 ? C.green : C.navy3}" stroke="${gateCol}" stroke-width="3" opacity="${tin}" transform="scale(${1 + 0.25 * Math.sin(Math.PI * clamp((t - 4.4) / 0.5))})"/></g>`;
    // nodes at start and end
    [X0, X1].forEach((x) => { tl += `<circle cx="${x}" cy="${TY}" r="9" fill="${C.pale}" opacity="${0.8 * tin}"/>`; });
    if (dotOn > 0) {
      tl += `<circle cx="${dx}" cy="${TY}" r="${42 + 6 * Math.sin(t * 5)}" fill="url(#s10dot)" opacity="${dotOn}"/>`;
      tl += `<circle cx="${dx}" cy="${TY}" r="${13 * dotOn}" fill="#FFFFFF" stroke="${C.aqua}" stroke-width="4"/>`;
    }
    s += `<g transform="translate(${60 * (1 - tin)} 0)" opacity="${tin * dim}">${tl}</g>`;

    // ---------- Gates ----------
    let gs = '';
    GATES.forEach(([name, thr], i) => {
      const x = GX + i * (GW + GGAP);
      const ap = prog(t, 1.4 + i * 0.15, 0.7, ease.out);
      if (ap <= 0) return;
      const tk = prog(t, 2.2 + i * 0.55, 0.45, ease.outBack);
      const ck = prog(t, 2.3 + i * 0.55, 0.35, ease.out);
      const y = GY + 30 * (1 - ap);
      gs += `<g opacity="${ap}">`;
      gs += `<rect x="${x}" y="${y}" width="${GW}" height="${GH}" rx="22" fill="${C.navy2}" fill-opacity="0.85" stroke="${C.green}" stroke-width="3" stroke-opacity="${0.9 * clamp(tk)}"/>`;
      gs += `<rect x="${x}" y="${y}" width="${GW}" height="${GH}" rx="22" fill="none" stroke="#FFFFFF" stroke-opacity="${0.12 * (1 - clamp(tk))}" stroke-width="2"/>`;
      const cx = x + 62, cy = y + GH / 2;
      gs += `<circle cx="${cx}" cy="${cy}" r="32" fill="none" stroke="${C.pale}" stroke-opacity="0.35" stroke-width="3"/>`;
      if (tk > 0) {
        gs += `<circle cx="${cx}" cy="${cy}" r="${32 * tk}" fill="${C.green}"/>`;
        gs += `<circle cx="${cx}" cy="${cy}" r="${32 + 26 * clamp((t - 2.2 - i * 0.55) / 0.6)}" fill="none" stroke="${C.green}" stroke-width="3" opacity="${0.7 * (1 - clamp((t - 2.2 - i * 0.55) / 0.6))}"/>`;
        gs += `<path d="M${cx - 14},${cy + 1} L${cx - 4},${cy + 11} L${cx + 15},${cy - 10}" fill="none" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="44" stroke-dashoffset="${44 * (1 - ck)}"/>`;
      }
      gs += text(x + 116, y + 58, name, { size: 27, weight: 600, fill: C.pale });
      gs += text(x + 116, y + 110, thr, { size: 46, weight: 700, fill: C.white });
      gs += `</g>`;
    });
    s += `<g opacity="${dim}">${gs}</g>`;

    // ---------- The ask ----------
    const pop = prog(t, 5.5, 0.7, ease.outBack);
    if (t >= 5.45) {
      const cx = 960, cy = 668;
      const glowP = prog(t, 5.5, 0.9, ease.out);
      s += `<ellipse cx="${cx}" cy="${cy}" rx="${520 * glowP}" ry="${260 * glowP}" fill="url(#s10amb)" opacity="${0.9 + 0.1 * Math.sin(t * 3)}"/>`;
      // ring burst
      for (let k = 0; k < 3; k++) {
        const rp = prog(t, 5.6 + k * 0.16, 1.2, ease.out);
        if (rp > 0 && rp < 1) s += `<ellipse cx="${cx}" cy="${cy}" rx="${120 + 520 * rp}" ry="${60 + 230 * rp}" fill="none" stroke="${C.amber}" stroke-width="${5 - k * 1.2}" opacity="${0.75 * (1 - rp)}"/>`;
      }
      // sparks
      const sp = prog(t, 5.6, 1.0, ease.out);
      if (sp > 0 && sp < 1) {
        for (let k = 0; k < 16; k++) {
          const a = (k / 16) * Math.PI * 2 + 0.2;
          const r1 = 180 + 300 * sp, r0 = 150 + 240 * sp;
          s += `<line x1="${cx + Math.cos(a) * r0}" y1="${cy + Math.sin(a) * r0 * 0.5}" x2="${cx + Math.cos(a) * r1}" y2="${cy + Math.sin(a) * r1 * 0.5}" stroke="${C.amber}" stroke-width="4" stroke-linecap="round" opacity="${0.85 * (1 - sp)}"/>`;
        }
      }
      const sc = lerp(0.35, 1, pop);
      s += `<g transform="translate(${cx} ${cy}) scale(${sc}) translate(${-cx} ${-cy})" opacity="${clamp(pop * 1.6)}">`;
      s += text(cx, cy + 62, 'Tk 3.5 Cr', { size: 190, weight: 700, fill: C.amber, anchor: 'middle', ls: -2 });
      s += `</g>`;
      const lp = prog(t, 6.2, 0.8, ease.out);
      s += text(960, 832 + 16 * (1 - lp), 'The ask: Tk 3.5 Cr before go/no-go · 6-month pilot · ~1,500 outlets', { size: 34, weight: 600, fill: C.white, anchor: 'middle', opacity: lp });
    }
    return s;
  },
};
