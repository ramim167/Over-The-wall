// Scene 9 · 16 s · The business case: outlet bloom on the map, revenue bars, EBITDA call-outs, NPV / IRR tiles.
const { C, text, count, prog, ease, lerp, clamp, bg, source, img, ASSET_SIZE } = require('../engine.cjs');

const ID = 's09';
const f = (v) => (+v).toFixed(1);
const win = (t, a, b, fin = 0.5, fout = 0.4) => Math.min(a <= 0 ? 1 : prog(t, a, fin, ease.out), 1 - prog(t, b - fout, fout, ease.in));
const popScale = (t, end) => 1 + 0.08 * Math.sin(Math.PI * prog(t, end, 0.4, ease.out));
const scaled = (x, y, s, body) => `<g transform="translate(${f(x)} ${f(y)}) scale(${(+s).toFixed(4)}) translate(${f(-x)} ${f(-y)})">${body}</g>`;

// Outlet dots: normalised positions sampled from the map's land area (seeded), in random order.
const DOTS = [[0.289,0.21],[0.684,0.636],[0.374,0.707],[0.684,0.468],[0.922,0.807],[0.923,0.688],[0.644,0.577],[0.372,0.335],[0.837,0.332],[0.152,0.297],[0.428,0.295],[0.56,0.509],[0.405,0.283],[0.364,0.424],[0.332,0.532],[0.863,0.635],[0.634,0.516],[0.504,0.689],[0.708,0.251],[0.586,0.35],[0.33,0.391],[0.154,0.077],[0.885,0.908],[0.761,0.275],[0.266,0.223],[0.209,0.564],[0.883,0.861],[0.764,0.419],[0.248,0.727],[0.234,0.405],[0.886,0.559],[0.351,0.621],[0.734,0.335],[0.199,0.311],[0.497,0.557],[0.662,0.521],[0.757,0.362],[0.299,0.541],[0.291,0.235],[0.659,0.429],[0.036,0.136],[0.08,0.108],[0.191,0.134],[0.243,0.456],[0.396,0.416],[0.21,0.602],[0.272,0.646],[0.556,0.481],[0.413,0.314],[0.962,0.801],[0.348,0.407],[0.567,0.722],[0.438,0.487],[0.357,0.079],[0.536,0.443],[0.874,0.27],[0.686,0.434],[0.395,0.187],[0.899,0.822],[0.338,0.682],[0.947,0.7],[0.175,0.117],[0.811,0.591],[0.331,0.715],[0.224,0.581],[0.62,0.629],[0.69,0.406],[0.791,0.66],[0.866,0.791],[0.469,0.559],[0.141,0.323],[0.7,0.388],[0.711,0.603],[0.544,0.387],[0.125,0.052],[0.768,0.318],[0.813,0.318],[0.459,0.299],[0.691,0.285],[0.711,0.324],[0.845,0.659],[0.459,0.386],[0.538,0.751],[0.297,0.254],[0.614,0.551],[0.316,0.6],[0.209,0.118],[0.398,0.125],[0.154,0.053],[0.404,0.457],[0.274,0.303],[0.607,0.578],[0.624,0.736],[0.891,0.58],[0.239,0.534],[0.811,0.683],[0.845,0.679],[0.446,0.432],[0.085,0.306],[0.317,0.29],[0.431,0.635],[0.404,0.628],[0.052,0.286],[0.272,0.141],[0.911,0.768],[0.276,0.523],[0.835,0.707],[0.287,0.405],[0.159,0.344],[0.171,0.184],[0.912,0.72],[0.889,0.669],[0.275,0.675],[0.122,0.089],[0.361,0.654],[0.244,0.245],[0.18,0.277],[0.591,0.407],[0.567,0.648],[0.481,0.441],[0.952,0.667],[0.369,0.315],[0.135,0.117],[0.623,0.655],[0.679,0.579],[0.244,0.165],[0.154,0.51],[0.515,0.629],[0.674,0.723],[0.147,0.385],[0.446,0.275],[0.852,0.538],[0.361,0.537],[0.49,0.387],[0.185,0.53],[0.101,0.023],[0.944,0.736],[0.067,0.358],[0.473,0.525],[0.514,0.593],[0.674,0.616],[0.341,0.206],[0.894,0.623],[0.255,0.613],[0.35,0.517],[0.268,0.503],[0.84,0.353],[0.114,0.171],[0.45,0.362],[0.842,0.619],[0.446,0.744],[0.649,0.264],[0.882,0.728],[0.206,0.373],[0.672,0.338],[0.591,0.535],[0.231,0.505],[0.264,0.582],[0.421,0.677],[0.505,0.319],[0.404,0.594],[0.535,0.464],[0.453,0.721],[0.419,0.253],[0.742,0.643],[0.319,0.422],[0.586,0.376],[0.556,0.266],[0.322,0.368],[0.514,0.27],[0.594,0.295],[0.127,0.348],[0.303,0.445],[0.191,0.448],[0.794,0.277],[0.634,0.606],[0.945,0.847],[0.331,0.65],[0.479,0.645],[0.198,0.179],[0.386,0.678],[0.721,0.622],[0.264,0.269],[0.246,0.655],[0.626,0.427],[0.203,0.204],[0.208,0.409],[0.701,0.556],[0.29,0.186],[0.164,0.48],[0.14,0.255],[0.656,0.489],[0.216,0.264],[0.229,0.689],[0.293,0.726],[0.304,0.314],[0.523,0.517],[0.787,0.352],[0.593,0.439],[0.363,0.185],[0.889,0.498],[0.373,0.376],[0.553,0.31],[0.45,0.769],[0.37,0.736],[0.901,0.537],[0.857,0.304],[0.086,0.33],[0.329,0.177],[0.379,0.776],[0.819,0.248],[0.487,0.503],[0.369,0.461],[0.242,0.754],[0.266,0.787],[0.84,0.775],[0.4,0.394],[0.839,0.514],[0.304,0.682],[0.584,0.25],[0.298,0.657],[0.353,0.359],[0.381,0.552],[0.339,0.337],[0.869,0.369],[0.155,0.142],[0.212,0.074],[0.47,0.245],[0.481,0.771],[0.242,0.138],[0.021,0.328],[0.626,0.462],[0.625,0.675],[0.102,0.372],[0.5,0.746],[0.561,0.7],[0.309,0.112],[0.559,0.41],[0.544,0.773],[0.046,0.343],[0.343,0.281],[0.524,0.708],[0.229,0.637],[0.556,0.537],[0.526,0.547],[0.376,0.219],[0.795,0.61],[0.461,0.661],[0.703,0.678],[0.312,0.491],[0.494,0.419],[0.849,0.6],[0.763,0.615],[0.283,0.361],[0.683,0.358],[0.861,0.756],[0.304,0.345],[0.508,0.444],[0.662,0.312],[0.443,0.615],[0.359,0.119],[0.375,0.27],[0.388,0.494],[0.811,0.544],[0.972,0.777],[0.886,0.646],[0.889,0.292],[0.091,0.066],[0.828,0.276],[0.804,0.395],[0.531,0.327],[0.424,0.712],[0.282,0.462],[0.29,0.162],[0.715,0.43],[0.108,0.275],[0.461,0.58],[0.65,0.659],[0.175,0.428],[0.727,0.305],[0.477,0.469],[0.618,0.337],[0.059,0.092],[0.628,0.367],[0.258,0.119],[0.381,0.615],[0.275,0.442],[0.107,0.121],[0.751,0.693],[0.091,0.154],[0.231,0.792],[0.59,0.706],[0.446,0.547],[0.496,0.726],[0.896,0.791],[0.658,0.245],[0.301,0.14],[0.263,0.386],[0.575,0.746],[0.556,0.347],[0.322,0.574],[0.136,0.183],[0.344,0.234],[0.907,0.277],[0.106,0.244],[0.451,0.321],[0.377,0.575],[0.539,0.281],[0.249,0.289],[0.266,0.706],[0.816,0.787],[0.452,0.701],[0.609,0.277],[0.531,0.687],[0.209,0.544],[0.921,0.602],[0.074,0.133],[0.53,0.488],[0.488,0.707],[0.23,0.355],[0.821,0.844],[0.675,0.671],[0.583,0.678],[0.171,0.551],[0.461,0.406],[0.581,0.465],[0.727,0.27],[0.636,0.29],[0.235,0.558],[0.231,0.049],[0.389,0.163],[0.834,0.561],[0.642,0.348],[0.709,0.369],[0.66,0.37],[0.359,0.164],[0.272,0.335],[0.411,0.356],[0.936,0.775],[0.631,0.314]];
const MAP_X = 140, MAP_Y = 150, MAP_W = 520, MAP_H = MAP_W * ASSET_SIZE['map.png'][1] / ASSET_SIZE['map.png'][0];
const N1 = 122; // share of dots lit by Year 1 (37,330 / 104,400 of 340)

function mapBeat(t) {
  const vis = 1 - prog(t, 8.9, 0.7, ease.inOut);
  if (vis <= 0) return '';
  const dx = -60 * prog(t, 8.9, 0.7, ease.in);
  let s = `<g opacity="${f(vis * 100) / 100}" transform="translate(${f(dx)} 0)">`;
  const mIn = prog(t, 0, 0.8, ease.out);
  s += img('map.png', MAP_X, MAP_Y, MAP_W, `opacity="${f(0.35 * mIn * 100) / 100}"`);
  DOTS.forEach(([nx, ny], i) => {
    const ti = i < N1 ? 0.3 + (i / N1) * 1.1 : 1.7 + ((i - N1) / (DOTS.length - N1)) * 1.5;
    if (t < ti) return;
    const x = MAP_X + nx * MAP_W, y = MAP_Y + ny * MAP_H;
    const p = prog(t, ti, 0.35, ease.outBack), q = prog(t, ti, 0.7, ease.out);
    const tw = 0.8 + 0.2 * Math.sin(t * 2.2 + i * 1.7);
    if (q < 1) s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(5 + 16 * q)}" fill="none" stroke="${C.aqua}" stroke-width="2" opacity="${f(0.6 * (1 - q) * 100) / 100}"/>`;
    s += `<circle cx="${f(x)}" cy="${f(y)}" r="${f(Math.max(0, 5.5 * p))}" fill="${i < N1 ? C.aqua : C.aquaLt}" opacity="${f(tw * 100) / 100}"/>`;
  });
  return s + '</g>';
}

function outletsBeat(t) {
  const o = win(t, 0, 4.4);
  if (o <= 0) return '';
  const up = -30 * prog(t, 4.0, 0.4, ease.in);
  let s = `<g opacity="${f(o * 100) / 100}" transform="translate(0 ${f(up)})">`;
  const l = prog(t, 0.2, 0.6, ease.out);
  s += text(800, 330 + 14 * (1 - l), 'Outlets', { size: 46, weight: 600, fill: C.pale, opacity: l });
  const p1 = prog(t, 0.3, 1.1, ease.out), p2 = prog(t, 1.7, 1.5, ease.out), ar = prog(t, 1.4, 0.5, ease.out);
  if (p1 > 0) s += scaled(800, 450, popScale(t, 1.4), text(800, 470, count(p1, 37330), { size: 120, weight: 700, fill: C.amber }));
  s += text(1222 - 20 * (1 - ar), 455, '→', { size: 84, weight: 600, fill: C.aqua, opacity: ar });
  if (p2 > 0) s += scaled(1310, 450, popScale(t, 3.2), text(1310, 470, count(p2, 104400), { size: 120, weight: 700, fill: C.amber }));
  s += text(804, 530, 'Year 1', { size: 32, weight: 600, fill: C.pale, opacity: l });
  s += text(1314, 530, 'Year 3', { size: 32, weight: 600, fill: C.pale, opacity: ar });
  // growth track
  const w1 = 960 * 37330 / 104400;
  s += `<rect x="800" y="580" width="960" height="14" rx="7" fill="#FFFFFF" opacity="${f(0.1 * l * 100) / 100}"/>`;
  s += `<rect x="800" y="580" width="${f(Math.max(0, w1 * p1 + (960 - w1) * p2))}" height="14" rx="7" fill="${C.aqua}"/>`;
  return s + '</g>';
}

const BARS = [['Year 1', 8.1], ['Year 2', 28.5], ['Year 3', 41.4]];
function chartBeat(t) {
  const o = win(t, 4.2, 12.2);
  if (o <= 0) return '';
  const dx = -680 * prog(t, 9.0, 0.8, ease.inOut);
  const X0 = 820, BASE = 800, MAXH = 460;
  let s = `<g opacity="${f(o * 100) / 100}" transform="translate(${f(dx)} 0)">`;
  const ti = prog(t, 4.3, 0.6, ease.out);
  s += text(X0, 230 + 14 * (1 - ti), 'Net revenue', { size: 46, weight: 700, opacity: ti });
  s += `<line x1="${X0}" y1="${BASE}" x2="${X0 + 880}" y2="${BASE}" stroke="${C.pale}" stroke-opacity="${f(0.4 * ti * 100) / 100}" stroke-width="2"/>`;
  BARS.forEach(([label, v], i) => {
    const st = 4.7 + i * 0.6, p = prog(t, st, 1.1, ease.out);
    const x = X0 + 40 + i * 300, bw = 200, h = MAXH * v / 41.4 * p;
    const cx = x + bw / 2;
    s += text(cx, BASE + 50, label, { size: 32, weight: 600, fill: C.pale, anchor: 'middle', opacity: ti });
    if (p <= 0) return;
    // highlight rings for call-outs
    const hl = i === 1 ? prog(t, 9.8, 0.6, ease.out) : i === 2 ? prog(t, 10.5, 0.6, ease.out) : 0;
    if (hl > 0) s += `<rect x="${x - 8}" y="${f(BASE - h - 8)}" width="${bw + 16}" height="${f(h + 8)}" rx="16" fill="none" stroke="${i === 1 ? C.green : C.aquaLt}" stroke-width="4" opacity="${f(hl * (0.75 + 0.25 * Math.sin(t * 5)) * 100) / 100}"/>`;
    s += `<rect x="${x}" y="${f(BASE - h)}" width="${bw}" height="${f(h)}" rx="10" fill="url(#${ID}bar)"/>`;
    s += `<rect x="${x}" y="${f(BASE - h)}" width="${bw}" height="${f(Math.min(h, 6))}" rx="3" fill="${C.aquaLt}" opacity="0.7"/>`;
    s += scaled(cx, BASE - h - 30, popScale(t, st + 1.1), text(cx, f(BASE - h - 24), 'Tk ' + count(p, v, 1) + ' Cr', { size: 50, weight: 700, fill: C.amber, anchor: 'middle', opacity: clamp(p * 2) }));
  });
  return s + '</g>';
}

function ebitdaBeat(t) {
  const o = win(t, 9.5, 12.2);
  if (o <= 0) return '';
  let s = `<g opacity="${f(o * 100) / 100}">`;
  const X = 1120;
  const c1 = prog(t, 9.7, 0.6, ease.outBack);
  if (c1 > 0) {
    s += scaled(X, 300, 0.85 + 0.15 * c1, `<g opacity="${f(clamp(c1) * 100) / 100}">
      <rect x="${X}" y="262" width="560" height="76" rx="38" fill="${C.green}" fill-opacity="0.18" stroke="${C.green}" stroke-width="3"/>
      <circle cx="${X + 40}" cy="300" r="20" fill="${C.green}"/>
      <path d="M${X + 30},300 L${X + 37},308 L${X + 51},292" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      ${text(X + 76, 312, 'EBITDA-positive in Year 2', { size: 34, weight: 700 })}</g>`);
  }
  const c2 = prog(t, 10.3, 0.7, ease.out);
  if (c2 > 0) {
    s += `<g opacity="${f(c2 * 100) / 100}" transform="translate(${f(40 * (1 - c2))} 0)">`;
    s += `<rect x="${X}" y="390" width="640" height="300" rx="22" fill="${C.navy2}" stroke="${C.aqua}" stroke-opacity="0.35" stroke-width="2"/>`;
    s += `<rect x="${X}" y="390" width="8" height="300" rx="4" fill="${C.aqua}"/>`;
    const n = prog(t, 10.5, 0.9, ease.out);
    s += scaled(X + 50, 500, popScale(t, 11.4), text(X + 50, 525, '+Tk ' + count(n, 5.9, 1) + ' Cr', { size: 96, weight: 700, fill: C.amber }));
    s += text(X + 52, 594, 'incremental EBITDA in Year 3', { size: 36, weight: 600 });
    s += text(X + 52, 642, '(after cannibalisation)', { size: 30, weight: 400, fill: C.pale });
    s += '</g>';
  }
  return s + '</g>';
}

function tile(t, x, start, label, valueStr, extra) {
  const p = prog(t, start, 0.6, ease.outBack);
  if (p <= 0) return '';
  const W = 720, Y = 290, Hh = 420;
  let b = `<rect x="${x}" y="${Y}" width="${W}" height="${Hh}" rx="28" fill="${C.navy2}" stroke="${C.aqua}" stroke-opacity="0.4" stroke-width="2"/>`;
  b += `<rect x="${x + 56}" y="${Y + 52}" width="70" height="6" rx="3" fill="${C.aqua}"/>`;
  b += text(x + 56, Y + 124, label, { size: 44, weight: 600, fill: C.pale });
  b += valueStr + extra;
  return scaled(x + W / 2, Y + Hh / 2, 0.8 + 0.2 * p, `<g opacity="${f(clamp(p) * 100) / 100}">${b}</g>`);
}
function tilesBeat(t) {
  if (t < 12.1) return '';
  let s = '';
  // NPV
  const n1 = prog(t, 12.4, 1.0, ease.out);
  s += tile(t, 200, 12.1, 'NPV', scaled(256, 520, popScale(t, 13.4), text(256, 560, '+Tk ' + count(n1, 3.1, 1) + ' Cr', { size: 110, weight: 700, fill: C.amber })),
    `<rect x="256" y="620" width="${f(380 * n1)}" height="10" rx="5" fill="${C.aqua}" opacity="0.8"/>`);
  // IRR vs hurdle
  const n2 = prog(t, 12.8, 1.0, ease.out), X = 1000;
  const track = 600, hurdle = X + 56 + track * 15 / 30;
  const extra = text(X + 58, 616, 'vs 15% hurdle', { size: 36, weight: 600, fill: C.pale }) +
    `<rect x="${X + 56}" y="648" width="${track}" height="12" rx="6" fill="#FFFFFF" opacity="0.12"/>` +
    `<rect x="${X + 56}" y="648" width="${f(track * 25 / 30 * n2)}" height="12" rx="6" fill="${C.aqua}"/>` +
    `<rect x="${f(hurdle - 2)}" y="636" width="4" height="36" rx="2" fill="#FFFFFF"/>`;
  s += tile(t, X, 12.4, 'IRR', scaled(X + 56, 520, popScale(t, 13.8), text(X + 56, 560, count(n2, 25) + '%', { size: 120, weight: 700, fill: C.amber })), extra);
  return s;
}

const DEFS = `<defs><linearGradient id="${ID}bar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${C.aqua}"/><stop offset="1" stop-color="${C.teal}" stop-opacity="0.75"/></linearGradient></defs>`;

module.exports = {
  id: ID,
  duration: 16,
  render(t) {
    let s = bg(t, { glow: 0.35 }) + DEFS;
    s += mapBeat(t) + outletsBeat(t) + chartBeat(t) + ebitdaBeat(t) + tilesBeat(t);
    const ey = prog(t, 0.1, 0.6, ease.out);
    s += text(122, 118, 'The business case', { size: 28, weight: 600, fill: C.aqua, ls: 2, opacity: ey });
    s += `<rect x="122" y="132" width="${f(64 * ey)}" height="4" rx="2" fill="${C.aqua}" opacity="${f(ey * 100) / 100}"/>`;
    s += source('Team financial model v4, planning assumptions');
    return s;
  },
};
