import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { importArtifactTool } from 'file:///C:/Users/User/.codex/plugins/cache/openai-primary-runtime/presentations/26.521.10419/skills/presentations/scripts/artifact_tool_utils.mjs';

const work = path.dirname(fileURLToPath(import.meta.url));
const { FileBlob, PresentationFile } = await importArtifactTool(work);
const folder = 'C:/Users/User/OneDrive/Desktop/Over the wall/Round2_Submission';
const report = [];
for (const name of ['WaterSmart_Round2_Deck_Survey360.pptx', 'WaterSmart_Round2_Deck_NoFieldwork_Survey360.pptx']) {
  const presentation = await PresentationFile.importPptx(await FileBlob.load(path.join(folder, name)));
  const count = presentation.slides.items?.length ?? presentation.slides.count;
  if (count !== 18) throw new Error('Unexpected imported slide count: ' + count);
  report.push({ name, import_succeeded: true, slide_count: count });
}
await fs.writeFile(path.join(work, 'repaired-import-verification.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
