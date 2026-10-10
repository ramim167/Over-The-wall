// Scene 4 · 0:42–0:55 · The insight: survey phone dissolves into 22 figures, 18 light amber;
// then a mirror moment: a figure holding two unbranded bottles, "?", three text beats.
const { C, text, prog, ease, lerp, clamp, bg, source } = require('../engine.cjs');

const GREY = new Set([4, 9, 13, 20]);            // the 4 who did not report worse hair
const ORDER = [];
for (let i = 0; i < 22; i++) if (!GREY.has(i)) ORDER.push(i);
const LIT0 = 3.0, STAG = 0.11;                    // light-up start and stagger
const iconPos = (i) => [170 + (i % 11) * 86, 430 + Math.floor(i / 11) * 150];

function person(cx, cy, fill, op, sc = 1) {
  return `<g transform="translate(${cx} ${cy}) scale(${sc})" opacity="${op}"><circle cx="0" cy="-26" r="17" fill="${fill}"/><path d="M-29,34 C-29,8 -16,0 0,0 C16,0 29,8 29,34 Z" fill="${fill}"/></g>`;
}

function phone(t, a, sc) {
  const x = 170, y = 130, w = 420, h = 730;
  let s = `<g opacity="${a}" transform="translate(${x + w / 2} ${y + h / 2}) scale(${sc}) translate(${-(x + w / 2)} ${-(y + h / 2)})">`;
  s += `<rect x="${x + 10}" y="${y + 24}" width="${w}" height="${h}" rx="58" fill="#000" opacity="0.28"/>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="58" fill="${C.navy3}" stroke="${C.pale}" stroke-opacity="0.5" stroke-width="3"/>`;
  s += `<rect x="${x + 16}" y="${y + 16}" width="${w - 32}" height="${h - 32}" rx="44" fill="#F3F6FC"/>`;
  s += `<rect x="${x + w / 2 - 50}" y="${y + 30}" width="100" height="22" rx="11" fill="${C.navy3}"/>`;
  s += text(x + 44, y + 118, 'Hair & water survey', { size: 28, weight: 700, fill: C.navy });
  s += text(x + 44, y + 150, 'Quick check · 3 questions', { size: 18, weight: 400, fill: '#6B7399' });
  const rows = [
    ['Moved to a new city or hall?', ['Yes'], 0],
    ['Did your water change?', ['Yes'], 0],
    ['Your hair problems since then?', ['Better', 'Same', 'Worse'], 2],
  ];
  rows.forEach(([q, opts, sel], r) => {
    const ry = y + 190 + r * 160, st = 0.7 + r * 0.45;
    const ra = prog(t, 0.35 + r * 0.12, 0.5, ease.out);
    const pick = prog(t, st, 0.35, ease.outBack);
    s += `<g opacity="${ra}" transform="translate(0 ${16 * (1 - ra)})">`;
    s += `<rect x="${x + 36}" y="${ry}" width="${w - 72}" height="138" rx="20" fill="#FFFFFF" stroke="#DCE2F2" stroke-width="2"/>`;
    s += text(x + 58, ry + 44, q, { size: 19, weight: 600, fill: C.navy });
    let ox = x + 58;
    opts.forEach((o, k) => {
      const ow = 30 + o.length * 12;
      const on = k === sel ? pick : 0;
      s += `<rect x="${ox}" y="${ry + 70}" width="${ow}" height="42" rx="21" fill="${on > 0 ? C.aqua : '#EEF2FA'}" stroke="${on > 0 ? C.aqua : '#C9D1E8'}" stroke-width="2"/>`;
      if (on > 0) s += `<circle cx="${ox + ow / 2}" cy="${ry + 91}" r="${10 + 40 * clamp((t - st) / 0.5)}" fill="${C.aqua}" opacity="${0.35 * (1 - clamp((t - st) / 0.5))}"/>`;
      s += text(ox + ow / 2, ry + 98, o, { size: 19, weight: 600, fill: on > 0.3 ? '#FFFFFF' : '#5A628A', anchor: 'middle' });
      ox += ow + 12;
    });
    if (pick > 0) s += `<g transform="translate(${x + w - 74} ${ry + 32})" opacity="${clamp(pick)}"><circle r="14" fill="${C.green}"/><path d="M-6,0 l4,5 l8,-9" stroke="#FFF" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
    s += '</g>';
  });
  s += '</g>';
  return s;
}

function bottle(cx, by, fill, rot, glow) {
  let s = `<g transform="translate(${cx} ${by}) rotate(${rot})">`;
  if (glow > 0) s += `<rect x="-44" y="-176" width="88" height="182" rx="24" fill="none" stroke="${C.rustLt}" stroke-width="4" opacity="${glow}"/>`;
  s += `<rect x="-14" y="-170" width="28" height="22" rx="4" fill="${C.pale}"/><rect x="-20" y="-150" width="40" height="18" rx="5" fill="${fill}" opacity="0.9"/>`;
  s += `<rect x="-36" y="-136" width="72" height="136" rx="20" fill="${fill}"/>`;
  s += `<rect x="-36" y="-96" width="72" height="44" fill="#FFFFFF" opacity="0.35"/>`;
  s += `<rect x="-26" y="-128" width="9" height="110" rx="4.5" fill="#FFFFFF" opacity="0.35"/>`;
  return s + '</g>';
}

module.exports = {
  id: 's04',
  duration: 13,
  render(t) {
    let s = bg(t, { glow: 0.4 });
    const exitB = prog(t, 7.3, 0.7, ease.inOut);   // grid/counter leave
    const mirrorIn = prog(t, 7.7, 0.8, ease.out);

    // ---------- PHASE A: phone ----------
    const ph = prog(t, 0, 0.7, ease.outBack);
    const dis = prog(t, 1.85, 0.45, ease.inOut);
    if (dis < 1) s += `<g transform="translate(0 ${260 * (1 - ph)})">${phone(t, clamp(t / 0.35) * (1 - dis), 1 - 0.1 * dis)}</g>`;

    // Headline: right of phone, then glides top-left above the grid.
    const haA = prog(t, 0.4, 0.6, ease.out) * (1 - prog(t, 1.9, 0.35, ease.inOut));
    if (haA > 0) {
      s += text(700, 430 - 16 * (1 - haA), 'In our survey', { size: 72, weight: 600, opacity: haA });
      s += text(700, 492 - 16 * (1 - haA), 'People who changed their water', { size: 34, weight: 400, fill: C.pale, opacity: haA });
    }
    const haB = prog(t, 2.6, 0.6, ease.out) * (1 - exitB);
    if (haB > 0) {
      s += text(130, 230 - 16 * (1 - haB), 'In our survey', { size: 60, weight: 600, opacity: haB });
      s += text(130, 284 - 16 * (1 - haB), 'People who changed their water', { size: 30, weight: 400, fill: C.pale, opacity: haB });
    }

    // ---------- PHASE B: 22 figures ----------
    if (t > 2.1 && exitB < 1) {
      const lit = ORDER.filter((_, k) => t >= LIT0 + k * STAG).length;
      s += `<g opacity="${1 - exitB}" transform="translate(${-80 * exitB} 0)">`;
      for (let i = 0; i < 22; i++) {
        const [gx, gy] = iconPos(i);
        const e = prog(t, 2.0 + i * 0.03, 0.6, ease.out);
        const x = lerp(380, gx, e), y = lerp(500, gy, e);
        const k = ORDER.indexOf(i);
        const lt = k >= 0 ? t - (LIT0 + k * STAG) : -1;
        if (lt >= 0) {
          const pop = clamp(lt / 0.3);
          const scl = 1 + 0.18 * Math.sin(Math.PI * pop);
          if (lt < 0.6) s += `<circle cx="${x}" cy="${y}" r="${30 + 40 * clamp(lt / 0.6)}" fill="none" stroke="${C.amber}" stroke-width="3" opacity="${0.7 * (1 - clamp(lt / 0.6))}"/>`;
          s += person(x, y, C.amber, e, scl);
        } else {
          s += person(x, y, '#FFFFFF', 0.22 * e);
        }
      }
      // Counter
      const ca = prog(t, 2.8, 0.5, ease.out);
      const pop = prog(t, LIT0 + 17 * STAG + 0.05, 0.4, ease.out);
      const sc = pop > 0 && pop < 1 ? 1 + 0.08 * (1 - pop) : 1;
      const NX = 1200, NY = 560;
      s += `<g opacity="${ca}"><g transform="translate(${NX + 125} ${NY}) scale(${sc}) translate(${-NX - 125} ${-NY})">${text(NX + 250, NY, String(lit), { size: 220, weight: 700, fill: C.amber, anchor: 'end' })}</g>`;
      s += text(NX + 268, NY, 'of 22', { size: 84, weight: 600 });
      s += `<rect x="${NX + 4}" y="${NY + 40}" width="${560 * prog(t, 3.2, 0.8, ease.out)}" height="4" rx="2" fill="${C.amber}" opacity="0.6"/>`;
      const la = prog(t, 3.4, 0.6, ease.out);
      s += text(NX, NY + 110 - 14 * (1 - la), 'who changed water:', { size: 36, weight: 400, fill: C.pale, opacity: la });
      s += text(NX, NY + 160 - 14 * (1 - la), 'hair problems got worse', { size: 36, weight: 600, opacity: la });
      s += '</g></g>';
    }

    // ---------- PHASE C: mirror moment ----------
    if (mirrorIn > 0) {
      const mx = 250, my = 130, mw = 520, mh = 740;
      const b1 = prog(t, 8.3, 0.6, ease.out), b2 = prog(t, 9.6, 0.6, ease.out), b3 = prog(t, 10.9, 0.7, ease.outBack);
      s += `<defs><linearGradient id="s04mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A3888"/><stop offset="1" stop-color="${C.navy3}"/></linearGradient>
        <clipPath id="s04mc"><path d="M${mx},${my + mh} V${my + mw / 2} A${mw / 2},${mw / 2} 0 0 1 ${mx + mw},${my + mw / 2} V${my + mh} Z"/></clipPath></defs>`;
      s += `<g opacity="${mirrorIn}" transform="translate(0 ${40 * (1 - mirrorIn)})">`;
      const arch = `M${mx},${my + mh} V${my + mw / 2} A${mw / 2},${mw / 2} 0 0 1 ${mx + mw},${my + mw / 2} V${my + mh} Z`;
      s += `<path d="${arch}" fill="url(#s04mg)"/>`;
      s += `<g clip-path="url(#s04mc)">`;
      // Sheen sweeping across the glass.
      const sx = lerp(mx - 300, mx + mw + 200, ((t - 7.7) / 3.2) % 1);
      s += `<path d="M${sx},${my} l120,0 l-260,${mh} l-120,0 Z" fill="#FFFFFF" opacity="0.06"/><path d="M${sx + 160},${my} l40,0 l-260,${mh} l-40,0 Z" fill="#FFFFFF" opacity="0.05"/>`;
      // Figure silhouette.
      const fx = mx + mw / 2, sway = 3 * Math.sin(t * 1.3);
      const body = '#0A0F2A';
      s += `<g transform="translate(${sway} 0)">`;
      s += `<path d="M${fx - 170},${my + mh} C${fx - 170},${my + 520} ${fx - 120},${my + 430} ${fx},${my + 430} C${fx + 120},${my + 430} ${fx + 170},${my + 520} ${fx + 170},${my + mh} Z" fill="${body}" stroke="${C.aqua}" stroke-opacity="0.35" stroke-width="2"/>`;
      s += `<rect x="${fx - 26}" y="${my + 360}" width="52" height="80" rx="20" fill="${body}"/>`;
      s += `<circle cx="${fx}" cy="${my + 310}" r="72" fill="${body}" stroke="${C.aqua}" stroke-opacity="0.35" stroke-width="2"/>`;
      // Hair beat: rust pulse around the head.
      if (b1 > 0) s += `<circle cx="${fx}" cy="${my + 310}" r="${82 + 6 * Math.sin(t * 6)}" fill="none" stroke="${C.rustLt}" stroke-width="4" opacity="${b1 * (1 - 0.6 * b3)}"/>`;
      // Arms raised, holding two bottles.
      const rotA = -8 + 4 * Math.sin(t * 1.8) + (b2 > 0 && b2 < 1 ? 10 * Math.sin(b2 * Math.PI * 4) : 0);
      const rotB = 8 - 4 * Math.sin(t * 1.8) - (b2 > 0 && b2 < 1 ? 10 * Math.sin(b2 * Math.PI * 4) : 0);
      s += `<path d="M${fx - 140},${my + 520} Q${fx - 200},${my + 640} ${fx - 150},${my + 600}" stroke="${body}" stroke-width="40" fill="none" stroke-linecap="round"/>`;
      s += `<path d="M${fx + 140},${my + 520} Q${fx + 200},${my + 640} ${fx + 150},${my + 600}" stroke="${body}" stroke-width="40" fill="none" stroke-linecap="round"/>`;
      const glow = b2 * (1 - 0.6 * b3);
      s += bottle(fx - 152, my + 600, C.aquaLt, rotA, glow);
      s += bottle(fx + 152, my + 600, '#F2DCC8', rotB, glow);
      s += `<circle cx="${fx - 150}" cy="${my + 600}" r="22" fill="${body}"/><circle cx="${fx + 150}" cy="${my + 600}" r="22" fill="${body}"/>`;
      s += '</g></g>';
      s += `<path d="${arch}" fill="none" stroke="${C.pale}" stroke-opacity="0.6" stroke-width="5"/>`;
      s += `<path d="M${mx - 14},${my + mh} V${my + mw / 2} A${mw / 2 + 14},${mw / 2 + 14} 0 0 1 ${mx + mw + 14},${my + mw / 2} V${my + mh}" fill="none" stroke="${C.aqua}" stroke-opacity="0.35" stroke-width="2"/>`;
      // Question mark above the head.
      const q = prog(t, 8.1, 0.6, ease.outBack);
      if (q > 0) {
        const qy = my + 170 + 8 * Math.sin(t * 2.6);
        const qx = fx + 150;
        const qc = b3 > 0.5 ? C.aqua : '#FFFFFF';
        s += `<g transform="translate(${qx} ${qy}) scale(${q}) rotate(${6 * Math.sin(t * 1.7)})"><circle r="58" fill="${C.navy3}" stroke="${qc}" stroke-width="3" opacity="0.9"/>${text(0, 30, '?', { size: 92, weight: 700, fill: qc, anchor: 'middle' })}</g>`;
        for (let k = 0; k < 2; k++) {
          const fp = ((t - 8.3) / 2.2 + k * 0.5) % 1;
          if (t > 8.3) s += text(qx + 60 + 30 * k, qy - 40 - 90 * fp, '?', { size: 36 - 8 * k, weight: 700, fill: C.pale, opacity: 0.6 * Math.sin(Math.PI * fp) });
        }
      }
      s += '</g>';

      // Text beats.
      const TX = 900, dim = 1 - 0.45 * b3;
      s += text(TX, 360 - 18 * (1 - b1), 'They blame their hair.', { size: 60, weight: 600, opacity: b1 * dim });
      s += text(TX, 450 - 18 * (1 - b2), 'They blame their shampoo.', { size: 60, weight: 600, opacity: b2 * dim });
      const a3 = clamp((t - 10.9) / 0.3);
      s += `<g transform="translate(${TX} 610) scale(${0.92 + 0.08 * b3}) translate(${-TX} -610)" opacity="${a3}">`;
      s += text(TX, 610, 'Nobody gives them', { size: 74, weight: 700, fill: C.aqua });
      s += text(TX, 700, 'a way to check.', { size: 74, weight: 700, fill: C.aqua });
      s += '</g>';
      s += `<rect x="${TX}" y="740" width="${300 * prog(t, 11.4, 0.6, ease.out)}" height="6" rx="3" fill="${C.aqua}" opacity="0.8"/>`;
    }

    s += source('Team survey, n=49, 3–9 Oct 2026', 0.6 * prog(t, 0.6, 0.6, ease.out));
    return s;
  },
};
