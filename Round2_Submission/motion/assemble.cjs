// Final assembly: scene segments (trimmed to the plan), ElevenLabs narration (silence-trimmed,
// lightly time-fitted), ambient pad + chimes, burned-in subtitles.
// Output: ../WaterSmart_Pitch_Video_Motion.mp4
const fs = require('fs');
const path = require('path');
const { execFileSync, spawnSync } = require('child_process');

const dir = __dirname;
const FF = path.resolve(dir, '../deck/node_modules/@ffmpeg-installer/win32-x64/ffmpeg.exe');
const lines = JSON.parse(fs.readFileSync(path.join(dir, 'narration.json'), 'utf8'));
const AUDIO = process.env.AUDIO || 'audio_trim'; // per-scene <id>.wav
const OUT = process.env.OUT || '../WaterSmart_Pitch_Video_Motion.mp4';
const LEAD = 0.15; // narration starts this long after its scene begins
// Scene length on the timeline, source folder and narration tempo (1 = natural speed).
const PLAN = {
  s01: { len: 5.5 }, s02: { len: 16 }, s03: { len: 18.3 }, s04: { len: 12.6 },
  s05: { len: 28, tempo: 1.03 }, s06: { len: 14.4 }, s07: { len: 19 },
  s08: { len: 20.3, src: 'segments_ext', tempo: 1.06 }, s09: { len: 20, src: process.env.S09 || 'segments_ext', tempo: 1.085 },
  s10: { len: 10.8, src: 'segments_ext', tempo: 1.05 }, s11: { len: 12 },
};
const duration = (f) => { const m = /Duration: (\d+):(\d+):([\d.]+)/.exec(spawnSync(FF, ['-i', f], { encoding: 'utf8' }).stderr); return +m[1] * 3600 + +m[2] * 60 + +m[3]; };

let t = 0;
const scenes = lines.map((l) => {
  const p = PLAN[l.id];
  const seg = path.join(dir, process.env.TESTSEG || p.src || 'segments', l.id + '.mp4');
  const segDur = duration(seg);
  const len = Math.min(p.len, segDur);
  const tempo = p.tempo || 1;
  const vo = path.join(dir, AUDIO, l.id + '.wav');
  const voDur = duration(vo) / tempo;
  if (voDur + LEAD > len) console.warn(`warning: ${l.id} narration ${voDur.toFixed(2)}s exceeds scene ${len}s`);
  const s = { ...l, seg, len, tempo, vo, voDur, start: t };
  t += len;
  return s;
});
const total = t;

// Subtitles spread over each scene's narration in proportion to line length.
const ts = (x) => { const h = Math.floor(x / 3600), m = Math.floor(x / 60) % 60, s = (x % 60).toFixed(2).padStart(5, '0'); return `${h}:${String(m).padStart(2, '0')}:${s}`; };
let ass = `[Script Info]\nScriptType: v4.00+\nPlayResX: 1920\nPlayResY: 1080\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\nStyle: Sub,Segoe UI,38,&H00FFFFFF,&H00FFFFFF,&H00381C14,&H8C1C120C,0,0,0,0,100,100,0,0,3,10,0,2,120,120,30,1\n\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n`;
for (const s of scenes) {
  const totalChars = s.sub.reduce((a, x) => a + x.length, 0);
  let c = s.start + LEAD;
  for (const line of s.sub) {
    const d = s.voDur * line.length / totalChars;
    ass += `Dialogue: 0,${ts(c)},${ts(c + d)},Sub,,0,0,0,,${line}\n`;
    c += d;
  }
}
fs.writeFileSync(path.join(dir, 'subs.ass'), ass, 'utf8');

// Music: soft ambient pad, a gentle pulse under the business section, chimes on the meter reveals.
const st = (id) => scenes.find((x) => x.id === id).start;
const pad = `0.10*(sin(2*PI*110*t)+0.7*sin(2*PI*164.81*t)+0.55*sin(2*PI*220*t)+0.35*sin(2*PI*329.63*t)+0.2*sin(2*PI*440*t))*(0.65+0.35*sin(2*PI*0.07*t))`;
const pulse = `0.30*exp(-10*mod(t,0.6667))*sin(2*PI*(55+70*exp(-30*mod(t,0.6667)))*mod(t,0.6667))*between(t,${st('s08').toFixed(2)},${st('s11').toFixed(2)})`;
const chime = (at) => `0.5*(sin(2*PI*1318.5*(t-${at.toFixed(2)}))*exp(-3*(t-${at.toFixed(2)}))+0.6*sin(2*PI*1975.5*(t-${at.toFixed(2)}))*exp(-4*(t-${at.toFixed(2)})))*gte(t,${at.toFixed(2)})`;
const drip = (at) => `0.6*sin(2*PI*(900-4000*(t-${at.toFixed(2)}))*(t-${at.toFixed(2)}))*exp(-25*(t-${at.toFixed(2)}))*gte(t,${at.toFixed(2)})`;
const music = [pad, pulse, chime(st('s05') + 18), chime(st('s10') + 5.5), chime(st('s11') + 4.8), drip(2.2)].map((x) => `(${x})`).join('+');

const args = [];
scenes.forEach((s) => args.push('-i', s.seg));
scenes.forEach((s) => args.push('-i', s.vo));
const n = scenes.length;
const f = [];
scenes.forEach((s, i) => f.push(`[${i}:v]trim=0:${s.len},setpts=PTS-STARTPTS,fps=25,format=yuv420p,fade=t=out:st=${(s.len - 0.3).toFixed(2)}:d=0.3[v${i}]`));
f.push(`${scenes.map((_, i) => `[v${i}]`).join('')}concat=n=${n}:v=1:a=0[vc]`);
f.push(`[vc]subtitles=subs.ass[vout]`);
scenes.forEach((s, i) => {
  const ms = Math.round((s.start + LEAD) * 1000);
  f.push(`[${n + i}:a]aresample=48000,aformat=channel_layouts=stereo,atempo=${s.tempo},volume=1.5,adelay=${ms}|${ms}[a${i}]`);
});
f.push(`aevalsrc='${music}':s=48000:d=${total.toFixed(2)}[msrc]`);
f.push(`[msrc]aformat=channel_layouts=stereo,lowpass=f=2400,aecho=0.8:0.7:60:0.3,volume=0.30,afade=t=in:d=1.5,afade=t=out:st=${(total - 2.5).toFixed(2)}:d=2.5[m]`);
f.push(`${scenes.map((_, i) => `[a${i}]`).join('')}[m]amix=inputs=${n + 1}:duration=longest:dropout_transition=0,volume=${((n + 1) * 0.8).toFixed(1)}[mix]`);
f.push(`[mix]alimiter=limit=0.89,atrim=0:${total.toFixed(2)}[aout]`);
fs.writeFileSync(path.join(dir, 'filter.txt'), f.join(';\n'));
execFileSync(FF, ['-y', '-loglevel', 'error', ...args, '-filter_complex_script', 'filter.txt', '-map', '[vout]', '-map', '[aout]',
  '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-movflags', '+faststart', OUT],
  { cwd: dir, stdio: 'inherit' });
scenes.forEach((s) => console.log(s.id, 'start', s.start.toFixed(1), 'len', s.len, 'voice', s.voDur.toFixed(1)));
console.log('total', total.toFixed(1) + 's ->', path.resolve(dir, OUT));
