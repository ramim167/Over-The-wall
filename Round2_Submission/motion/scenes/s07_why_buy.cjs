// Scene 7 · Why people will buy: headline, then four navy cards that land in sync with the narration;
// the active card scales up while the others dim.
const { C, text, count, prog, ease, lerp, clamp, bg, tag, source, img, METER } = require('../engine.cjs');

const CW = 820, CH = 290;
const POS = [[120, 235], [980, 235], [120, 560], [980, 560]];
const S = [3.5, 7, 10.5, 15];
const ALL_ON = 19.6;
const f1 = (v) => v.toFixed(1);

function tsp(str, fill, extra = '') {
  return `<tspan fill="${fill}" ${extra}>${str}</tspan>`;
}
function line(x, y, size, inner, weight = 700) {
  return `<text x="${x}" y="${y}" font-family="Segoe UI" font-size="${size}" font-weight="${weight}" fill="#FFFFFF">${inner}</text>`;
}

// Card 1: a strip whose pad blooms through the meter colours.
function icon1(t, lt) {
  const cyc = (lt * 0.62) % 1, ci = Math.floor(lt * 0.62) % 4;
  const col = METER[ci][0], prev = METER[(ci + 3) % 4][0];
  const bl = ease.out(clamp(cyc / 0.6));
  let s = `<g clip-path="url(#s07clip)">`;
  s += `<circle cx="120" cy="170" r="${f1(10 + 70 * bl)}" fill="${col}" opacity="${(0.55 * (1 - cyc)).toFixed(2)}"/>`;
  s += `</g>`;
  s += `<g transform="rotate(${f1(6 * Math.sin(lt * 2))} 120 145)"><rect x="109" y="88" width="22" height="104" rx="5" fill="#FFFFFF"/>`;
  s += `<rect x="109" y="158" width="22" height="34" rx="5" fill="${prev}"/><rect x="109" y="158" width="22" height="34" rx="5" fill="${col}" opacity="${bl.toFixed(2)}"/></g>`;
  return s;
}
// Card 2: mini bottle, bobbing with sparkles.
function icon2(t, lt) {
  const by = 5 * Math.sin(lt * 2.2), rot = 3 * Math.sin(lt * 1.6);
  let s = `<g transform="rotate(${f1(rot)} 120 150) translate(0 ${f1(by)})">${img('bottle340.png', 82, 62, 76)}</g>`;
  for (let k = 0; k < 3; k++) {
    const ph = (lt * 0.8 + k / 3) % 1, sc = Math.sin(Math.PI * ph);
    const [x, y] = [[178, 88], [62, 120], [170, 200]][k];
    s += `<path transform="translate(${x} ${y}) scale(${f1(sc * 1.1)})" d="M0,-12 L3,-3 L12,0 L3,3 L0,12 L-3,3 L-12,0 L-3,-3 Z" fill="#FFFFFF" opacity="${f1(sc)}"/>`;
  }
  return s;
}
// Card 3: mini sachet swaying.
function icon3(t, lt) {
  const rot = 7 * Math.sin(lt * 2.0);
  return `<g transform="rotate(${f1(rot)} 120 145)">${img('sachet.png', 78, 86, 84)}</g>`;
}
// Card 4: ring filling to 45.5% with a comet running along the arc.
function icon4(t, lt) {
  const r = 48, circ = 2 * Math.PI * r;
  const p = 0.455 * prog(lt, 0.1, 1.4, ease.out);
  let s = `<circle cx="120" cy="145" r="${r}" fill="none" stroke="${C.navy}" stroke-opacity="0.55" stroke-width="16"/>`;
  s += `<circle cx="120" cy="145" r="${r}" fill="none" stroke="#FFFFFF" stroke-width="16" stroke-linecap="round" stroke-dasharray="${f1(circ * p)} ${f1(circ)}" transform="rotate(-90 120 145)"/>`;
  if (lt > 1.5) {
    const q = ((lt - 1.5) * 0.5) % 1, a = -Math.PI / 2 + 2 * Math.PI * 0.455 * q;
    s += `<circle cx="${f1(120 + r * Math.cos(a))}" cy="${f1(145 + r * Math.sin(a))}" r="7" fill="${C.aqua}" opacity="${f1(Math.sin(Math.PI * q))}"/>`;
  }
  return s;
}

function body(k, t, lt) {
  const x = 235;
  if (k === 0) {
    return line(x, 132, 46, 'They feel it, and now') + line(x, 192, 46, `they can ${tsp('see it', C.aqua)}`);
  }
  if (k === 1) {
    return line(x, 132, 46, `${tsp('Naturale,', C.aqua)} a brand`) + line(x, 192, 46, 'they already trust');
  }
  if (k === 2) {
    const ap = prog(lt, 0.5, 0.5, ease.out);
    return line(x, 88, 42, 'Fair price:') +
      line(x, 142, 32, `${tsp('Tk 3', C.amber, `font-weight="800" fill-opacity="${ap.toFixed(2)}"`)} sachet to try`, 600) +
      line(x, 190, 32, `${tsp('Tk 106', C.amber, `font-weight="800" fill-opacity="${ap.toFixed(2)}"`)} per 100 ml vs ${tsp('Tk 142–180', C.pale)}`, 600) +
      line(x, 238, 32, 'for premium brands', 600);
  }
  const cp = prog(lt, 0.2, 1.5, ease.out);
  const n = count(cp, 45.5, 1);
  const pop = 1 + 0.08 * Math.sin(Math.PI * clamp((lt - 1.7) / 0.35));
  return `<g transform="translate(${x} 138) scale(${pop.toFixed(3)}) translate(${-x} -138)">${text(x, 138, n + '%', { size: 104, weight: 800, fill: C.amber })}</g>` +
    line(x, 190, 32, 'of water-movers named a price', 600) + line(x, 232, 32, 'of Tk 360 or more', 600) +
    text(x, 268, 'Team survey, 10 of 22', { size: 20, weight: 400, fill: C.pale, opacity: 0.85 });
}

function card(k, t) {
  const st = S[k], en = prog(t, st, 0.8, ease.outBack);
  if (t < st) return '';
  const [x, y] = POS[k];
  const dir = k % 2 ? 1 : -1;
  const next = k < 3 ? S[k + 1] : ALL_ON;
  const act = clamp(prog(t, st, 0.4) - prog(t, next, 0.4));
  const anyAct = t < ALL_ON + 0.4 ? 1 : 0;
  const allOn = prog(t, ALL_ON, 0.5);
  const op = clamp((t - st) / 0.35) * lerp(anyAct ? 0.42 : 1, 1, Math.max(act, allOn));
  const sc = (0.85 + 0.15 * en) * (1 + 0.045 * act);
  const dx = dir * 280 * (1 - en);
  const fl = 3 * Math.sin(t * 1.3 + k * 1.7);
  const cx = x + CW / 2 + dx, cy = y + CH / 2 + fl;
  const lt = t - st;
  let s = `<g transform="translate(${f1(cx)} ${f1(cy)}) scale(${sc.toFixed(4)}) translate(${-CW / 2} ${-CH / 2})" opacity="${op.toFixed(3)}">`;
  s += `<rect x="6" y="14" width="${CW}" height="${CH}" rx="26" fill="#000000" opacity="0.22"/>`;
  s += `<rect x="0" y="0" width="${CW}" height="${CH}" rx="26" fill="${C.navy2}"/>`;
  s += `<rect x="0" y="0" width="${CW}" height="${CH}" rx="26" fill="none" stroke="${C.aqua}" stroke-width="3" opacity="${(0.15 + 0.85 * act).toFixed(3)}"/>`;
  // Icon circle with pulse halo when active.
  const ip = prog(lt, 0.15, 0.6, ease.outBack);
  const halo = (lt * 0.8) % 1;
  s += `<circle cx="120" cy="145" r="${f1(72 + 26 * halo)}" fill="none" stroke="${C.aqua}" stroke-width="3" opacity="${(0.6 * (1 - halo) * act).toFixed(2)}"/>`;
  s += `<g transform="translate(120 145) scale(${ip.toFixed(3)}) translate(-120 -145)"><circle cx="120" cy="145" r="72" fill="${C.aqua}"/>`;
  s += [icon1, icon2, icon3, icon4][k](t, lt) + '</g>';
  const tp = prog(lt, 0.3, 0.6, ease.out);
  s += `<g opacity="${tp.toFixed(3)}" transform="translate(${f1(30 * (1 - tp))} 0)">${body(k, t, lt)}</g>`;
  return s + '</g>';
}

module.exports = {
  id: 's07',
  duration: 21,
  render(t) {
    let s = bg(t, { glow: 0.5 });
    s += `<defs><clipPath id="s07clip"><circle cx="120" cy="145" r="72"/></clipPath></defs>`;
    // Parallax drifting bubbles.
    for (let k = 0; k < 14; k++) {
      const depth = 0.4 + (k % 3) * 0.3;
      const x = (k * 157 + t * 18 * depth) % 2000 - 40, y = 120 + ((k * 263) % 760) + 14 * Math.sin(t * 0.7 + k);
      s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(3 + 5 * depth)}" fill="${C.aqua}" opacity="${(0.08 + 0.1 * depth).toFixed(2)}"/>`;
    }
    // Headline: big centre, then settles at the top.
    const hin = prog(t, 0.15, 0.8, ease.outBack), mv = prog(t, 2.5, 0.85, ease.inOut);
    const hy = lerp(560, 160, mv), hs = lerp(1, 0.58, mv) * (0.8 + 0.2 * hin);
    s += `<g transform="translate(960 ${f1(hy)}) scale(${hs.toFixed(4)})" opacity="${clamp(hin * 1.4).toFixed(3)}">${text(0, 0, 'Why people will buy', { size: 124, weight: 800, anchor: 'middle' })}`;
    const ul = prog(t, 0.7, 0.7, ease.out);
    s += `<rect x="${f1(-260 * ul)}" y="34" width="${f1(520 * ul)}" height="10" rx="5" fill="${C.aqua}"/></g>`;
    for (let k = 0; k < 4; k++) s += card(k, t);
    s += source('Prices: Chaldal/Arogga, 9 Oct 2026 · Team survey, 3–9 Oct 2026', 0.6 * prog(t, 3.8, 0.8));
    if (t > 7) s += `<g opacity="${prog(t, 7, 0.5).toFixed(3)}">${tag('Concept mock-up')}</g>`;
    return s;
  },
};
