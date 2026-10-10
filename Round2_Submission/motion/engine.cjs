// Motion engine: each scene module exports { id, duration, render(t) } where render returns a
// 1920x1080 SVG string for time t (seconds). Frames are rasterised with sharp and piped to ffmpeg.
// Usage: node engine.cjs <scene-file> [--check t1,t2,...]   (check writes PNG stills only)
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { spawn } = require('child_process');

const W = 1920, H = 1080, FPS = 25;
const FF = path.resolve(__dirname, '../deck/node_modules/@ffmpeg-installer/win32-x64/ffmpeg.exe');
const C = {
  navy: '#141C52', navy2: '#222D72', navy3: '#0C1238', aqua: '#12A5C4', teal: '#0E7FA0', aquaLt: '#E3F5FA',
  amber: '#F5A31A', rust: '#B4511F', rustLt: '#E9A06B', white: '#FFFFFF', pale: '#C9D3F5', muted: '#AEB6D9', green: '#3E9B3A',
};
const FONT = 'Segoe UI';
const BN = 'Nirmala UI';

// ---- assets (data URIs, cached) ----
const ASSET_DIR = path.resolve(__dirname, '../deck/assets');
const _a = {};
function asset(name) {
  if (!_a[name]) _a[name] = 'data:image/png;base64,' + fs.readFileSync(path.join(ASSET_DIR, name)).toString('base64');
  return _a[name];
}
// Native pixel sizes for aspect ratios.
const ASSET_SIZE = { 'bottle340.png': [960, 1995], 'bottle180.png': [960, 1995], 'sachet.png': [600, 840], 'phone.png': [840, 1620], 'map.png': [1400, 1962], 'otw_logo.png': [512, 242], 'chart.png': [1200, 450] };
function img(name, x, y, w, extra = '') {
  const [iw, ih] = ASSET_SIZE[name];
  const h = w * ih / iw;
  return `<image href="${asset(name)}" x="${x}" y="${y}" width="${w}" height="${h}" ${extra}/>`;
}

// ---- timing ----
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, p) => a + (b - a) * p;
const ease = {
  linear: (t) => t,
  out: (t) => 1 - Math.pow(1 - t, 3),
  in: (t) => t * t * t,
  inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  outBack: (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
  outElastic: (t) => (t === 0 || t === 1 ? t : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI) / 3) + 1),
};
// Progress 0..1 of an animation that starts at `start` and lasts `dur`, eased.
const prog = (t, start, dur, fn = ease.inOut) => fn(clamp((t - start) / dur));

// ---- drawing helpers ----
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function text(x, y, str, o = {}) {
  const { size = 48, weight = 600, fill = C.white, anchor = 'start', font = FONT, opacity = 1, ls = 0, italic = false, extra = '' } = o;
  return `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" opacity="${opacity}" letter-spacing="${ls}"${italic ? ' font-style="italic"' : ''} ${extra}>${esc(str)}</text>`;
}
// Number that counts up from 0 to `to` with given decimals.
function count(p, to, dec = 0) {
  const v = to * p;
  return v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
}
// Navy stage background with soft aqua caustic glows that drift with time.
function bg(t, o = {}) {
  const { glow = 0.5 } = o;
  const gx = 960 + 260 * Math.sin(t * 0.25), gy = 420 + 120 * Math.cos(t * 0.31);
  return `<defs><radialGradient id="bgG" cx="${gx / W}" cy="${gy / H}" r="0.75"><stop offset="0" stop-color="#22307E"/><stop offset="1" stop-color="${C.navy3}"/></radialGradient>
    <radialGradient id="bgA" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="${C.aqua}" stop-opacity="${0.35 * glow}"/><stop offset="1" stop-color="${C.aqua}" stop-opacity="0"/></radialGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#bgG)"/>
    <ellipse cx="${1500 + 120 * Math.sin(t * 0.4)}" cy="${300 + 80 * Math.cos(t * 0.3)}" rx="700" ry="520" fill="url(#bgA)"/>`;
}
// Small corner pill: "Concept mock-up" or "Illustrative animation".
const tag = (label) => `<g><rect x="${W - 60 - label.length * 13}" y="40" width="${label.length * 13 + 30}" height="40" rx="20" fill="#FFFFFF" fill-opacity="0.12" stroke="#FFFFFF" stroke-opacity="0.35"/>${text(W - 45, 67, label, { size: 20, weight: 600, fill: C.pale, anchor: 'end' })}</g>`;
// Source line (keep y > 900 clear except this; y 950+ is reserved for subtitles).
const source = (s, opacity = 0.6) => text(60, 915, s, { size: 20, weight: 400, fill: C.pale, opacity });
// The hero motif: 5-step hardness meter. p = reveal 0..1; land = index lit (0..4) or -1; glow pulse uses t.
const METER = [['#3FA96B', 'Soft', '0'], ['#8C9A4E', 'Moderate', '60'], ['#A2647F', 'Hard', '120'], ['#B0407D', 'Very hard', '250'], ['#7A2466', '', '425']];
function meter(x, y, w, p, land = -1, t = 0) {
  const seg = w / 5;
  let s = '';
  METER.forEach(([c, l, v], i) => {
    const pi = clamp(p * 5 - i);
    const lit = i === land;
    const pulse = lit ? 0.6 + 0.4 * Math.sin(t * 6) : 0;
    s += `<rect x="${x + i * seg + 6}" y="${y}" width="${(seg - 12) * pi}" height="34" rx="17" fill="${c}" opacity="${lit ? 1 : 0.75}"/>`;
    if (lit) s += `<rect x="${x + i * seg}" y="${y - 6}" width="${seg}" height="46" rx="23" fill="none" stroke="#FFFFFF" stroke-width="4" opacity="${pulse}"/>`;
    if (pi > 0.6) s += text(x + i * seg + seg / 2, y + 78, v, { size: 30, weight: 700, anchor: 'middle', opacity: pi }) + text(x + i * seg + seg / 2, y + 112, l, { size: 22, weight: 400, fill: C.pale, anchor: 'middle', opacity: pi });
  });
  return s;
}
// Rounded card.
const card = (x, y, w, h, fill = C.navy2, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${fill}" ${extra}/>`;
const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${body}</svg>`;

// ---- renderer ----
async function frameBuffer(scene, t) {
  let body = scene.render(t);
  // Automatic 0.3 s fade from/to navy at scene edges for clean cuts.
  const edge = Math.min(clamp(t / 0.3), clamp((scene.duration - t) / 0.3));
  if (edge < 1) body += `<rect width="${W}" height="${H}" fill="${C.navy3}" opacity="${1 - edge}"/>`;
  return sharp(Buffer.from(svg(body)), { density: 72 }).resize(W, H).removeAlpha().raw().toBuffer();
}

async function renderScene(file, checks) {
  const scene = require(path.resolve(file));
  if (process.env.DUR) scene.duration = +process.env.DUR; // stretch a scene to fit its narration
  if (checks) {
    const outDir = path.resolve(__dirname, 'frames_check');
    for (const t of checks) {
      const b = scene.render(t) + '';
      await sharp(Buffer.from(svg(b))).resize(960, 540).png().toFile(path.join(outDir, `${scene.id}_${t}.png`));
      console.log('still', scene.id, t);
    }
    return;
  }
  const n = Math.round(scene.duration * FPS);
  const out = path.resolve(__dirname, process.env.OUTDIR || 'segments', scene.id + '.mp4');
  const ff = spawn(FF, ['-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', `${W}x${H}`, '-r', String(FPS), '-i', '-',
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p', out]);
  ff.stderr.on('data', (d) => process.stderr.write(d));
  const t0 = Date.now();
  for (let i = 0; i < n; i++) {
    const buf = await frameBuffer(scene, i / FPS);
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
    if (i % 150 === 0) console.log(scene.id, `frame ${i}/${n}`, ((Date.now() - t0) / 1000).toFixed(0) + 's');
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  console.log('done', out, ((Date.now() - t0) / 1000).toFixed(0) + 's');
}

module.exports = { W, H, FPS, C, FONT, BN, asset, img, ASSET_SIZE, clamp, lerp, ease, prog, esc, text, count, bg, tag, source, meter, METER, card, svg };

if (require.main === module) {
  const [file, flag, list] = process.argv.slice(2);
  renderScene(file, flag === '--check' ? list.split(',').map(Number) : null).catch((e) => { console.error(e); process.exit(1); });
}
