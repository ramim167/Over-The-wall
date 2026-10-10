// Narration: one WAV per scene in audio/<id>.wav, fitted inside the scene (speech rate raised if needed).
// To use ElevenLabs (or your own voice), save audio/<id>.wav files and run assemble.cjs without rerunning this.
const fs = require('fs');
const path = require('path');
const { execFileSync, spawnSync } = require('child_process');

const FF = path.resolve(__dirname, '../deck/node_modules/@ffmpeg-installer/win32-x64/ffmpeg.exe');
const VOICE = process.env.VOICE || 'Microsoft David Desktop';
const lines = JSON.parse(fs.readFileSync(path.join(__dirname, 'narration.json'), 'utf8'));
fs.mkdirSync(path.join(__dirname, 'audio'), { recursive: true });

function duration(file) {
  const m = /Duration: (\d+):(\d+):([\d.]+)/.exec(spawnSync(FF, ['-i', file], { encoding: 'utf8' }).stderr);
  return +m[1] * 3600 + +m[2] * 60 + +m[3];
}
function speak(text, out, rate) {
  fs.writeFileSync(out + '.txt', text, 'utf8');
  const ps = `Add-Type -AssemblyName System.Speech; $s = New-Object System.Speech.Synthesis.SpeechSynthesizer; $s.SelectVoice('${VOICE}'); $s.Rate = ${rate}; $s.SetOutputToWaveFile('${out}'); $s.Speak([IO.File]::ReadAllText('${out}.txt')); $s.Dispose()`;
  execFileSync('powershell', ['-NoProfile', '-Command', ps]);
  fs.unlinkSync(out + '.txt');
}
for (const l of lines) {
  const out = path.join(__dirname, 'audio', l.id + '.wav');
  let rate = 0, d;
  for (;;) {
    speak(l.say, out, rate);
    d = duration(out);
    if (d <= l.dur - 0.7 || rate >= 4) break;
    rate++;
  }
  console.log(l.id, `scene ${l.dur}s`, `voice ${d.toFixed(1)}s`, `rate ${rate}`);
}
