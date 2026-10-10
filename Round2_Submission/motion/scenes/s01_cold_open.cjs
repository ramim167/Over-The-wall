// Scene 1 · 0:00–0:06 · Cold open: a rust-tinted droplet falls in slow motion onto dark hair; Bangla question.
const { C, BN, text, prog, ease, lerp, bg } = require('../engine.cjs');

module.exports = {
  id: 's01',
  duration: 6,
  render(t) {
    // Droplet falls 0–2.2 s, splashes at 2.2 s into a crown of small droplets.
    const fall = prog(t, 0.2, 2.0, ease.in);
    const dy = lerp(-80, 560, fall);
    const splash = prog(t, 2.2, 0.9, ease.out);
    let s = bg(t, { glow: 0.3 });
    // Hair strands: dark curved strokes across the lower third.
    for (let i = 0; i < 26; i++) {
      const x0 = 520 + i * 34, sway = 10 * Math.sin(t * 0.8 + i);
      s += `<path d="M${x0},${1080} C${x0 + 30 + sway},${820} ${x0 - 40},${700} ${x0 + 20 + sway},${600}" stroke="#0A0F2A" stroke-width="${7 + (i % 3)}" fill="none" stroke-linecap="round" opacity="0.95"/>`;
      s += `<path d="M${x0 + 4},${1080} C${x0 + 34 + sway},${820} ${x0 - 36},${700} ${x0 + 24 + sway},${600}" stroke="#2A335E" stroke-width="2" fill="none" opacity="0.6"/>`;
    }
    if (t < 2.25) {
      s += `<defs><radialGradient id="dg" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="#FFE3C8"/><stop offset="0.55" stop-color="${C.rustLt}"/><stop offset="1" stop-color="${C.rust}"/></radialGradient></defs>`;
      s += `<path transform="translate(960 ${dy}) scale(1.4)" d="M0,-60 C0,-60 -36,-8 -36,16 A36,36 0 0 0 36,16 C36,-8 0,-60 0,-60 Z" fill="url(#dg)" opacity="0.95"/>`;
      s += `<ellipse cx="${960 - 14}" cy="${dy - 10}" rx="8" ry="14" fill="#FFFFFF" opacity="0.7"/>`;
    } else {
      for (let k = 0; k < 12; k++) {
        const a = Math.PI + (k / 11) * Math.PI;
        const r = 40 + 190 * splash;
        const x = 960 + Math.cos(a) * r, y = 600 + Math.sin(a) * r * 0.6 + 140 * splash * splash;
        s += `<circle cx="${x}" cy="${y}" r="${(10 - k % 4) * (1 - splash * 0.6)}" fill="${k % 3 ? C.rustLt : C.rust}" opacity="${1 - splash}"/>`;
      }
      s += `<ellipse cx="960" cy="604" rx="${60 + 260 * splash}" ry="${10 + 40 * splash}" fill="none" stroke="${C.rustLt}" stroke-width="3" opacity="${0.8 * (1 - splash)}"/>`;
    }
    // Text: Bangla question then English line.
    const q = prog(t, 2.6, 0.8, ease.out), e = prog(t, 3.5, 0.8, ease.out);
    s += text(960, 300 - 20 * (1 - q), 'দোষ কি চুলের, নাকি পানির?', { size: 92, weight: 400, font: BN, anchor: 'middle', opacity: q });
    s += text(960, 390 - 15 * (1 - e), 'Is it your hair, or your water?', { size: 46, weight: 400, fill: C.aqua, anchor: 'middle', opacity: e, italic: true });
    return s;
  },
};
