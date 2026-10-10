// Fallback: renders any missing scene segment from the matching deck slide with a slow zoom.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const FF = path.resolve(__dirname, '../deck/node_modules/@ffmpeg-installer/win32-x64/ffmpeg.exe');
const lines = JSON.parse(fs.readFileSync(path.join(__dirname, 'narration.json'), 'utf8'));
const SLIDE = { s02: 'slide05', s03: 'slide04', s04: 'slide05', s05: 'slide06', s06: 'slide10', s07: 'slide09', s08: 'slide07', s09: 'slide15', s10: 'slide16', s11: 'slide01' };
for (const l of lines) {
  const out = path.join(__dirname, process.env.SEG || 'segments', l.id + '.mp4');
  if (fs.existsSync(out) || !SLIDE[l.id]) continue;
  const img = path.resolve(__dirname, '../video/slides', SLIDE[l.id] + '.png');
  const frames = Math.round(l.dur * 25);
  execFileSync(FF, ['-y', '-loglevel', 'error', '-loop', '1', '-i', img, '-vf',
    `scale=3840:2160,zoompan=z='min(1+0.0006*on,1.08)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=${frames}:s=1920x1080:fps=25,fade=t=in:d=0.3,fade=t=out:st=${(l.dur - 0.3).toFixed(2)}:d=0.3,format=yuv420p`,
    '-frames:v', String(frames), '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', out]);
  console.log('fallback', l.id, 'from', SLIDE[l.id]);
}
