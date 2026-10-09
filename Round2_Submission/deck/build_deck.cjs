// Builds the Round 2 proposal deck. Every financial number is read from
// ../finance/finance_v4_output.json so the deck, model and script stay on one version.
// Field-research slots are marked "[ ]" and must be filled with the team's real results.
const path = require('path');
const pptxgen = require('pptxgenjs');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const fa = require('react-icons/fa6');
const sharp = require('sharp');
const fin = require('../finance/finance_v4_output.json');

const SKILL = 'C:/Users/Administrator/.claude/skills/synced/157622e8-87f8-4d11-ae7f-5080983dd929_59fd7551-cb71-4a30-b220-b40c1256c42f/pptx';
const { applyTheme } = require(SKILL + '/scripts/apply_theme.js');

const NOFIELD = process.env.NOFIELD === '1';
const OUT = path.resolve(__dirname, NOFIELD ? '../WaterSmart_Round2_Deck_NoFieldwork.pptx' : '../WaterSmart_Round2_Deck.pptx');
const A = (f) => path.resolve(__dirname, 'assets', f);
const LOGO = A('otw_logo.png');

const C = {
  navy: '141C52', navy2: '222D72', blue: '0B6FB8', aqua: '12A5C4', aquaLt: 'E3F5FA', aquaTx: '0E7FA0',
  orange: 'F5A31A', orangeLt: 'FFF4E0', rust: 'B4511F', rustLt: 'FBEDE3', green: '3E9B3A', greenLt: 'E9F5E7',
  ink: '1F2937', muted: '5B6472', line: 'D5DCE6', panel: 'F3F6FA', white: 'FFFFFF', paleTx: 'C9D3F5',
};
const THEME = {
  name: 'WaterSmart',
  colors: { dk1: C.ink, lt1: C.white, dk2: C.navy, lt2: C.panel, accent1: C.aqua, accent2: C.navy, accent3: C.orange, accent4: C.rust, accent5: C.green, accent6: C.blue, hlink: C.blue, folHlink: '6B4FA0' },
};
const BN = 'Nirmala UI';

// ---------- numbers from the model ----------
const b = fin.base, pl = fin.deck.pl, wf = fin.deck.waterfall340, sc = fin.scenarios, sens = fin.sensitivity_npv_without_release_cr;
const cr1 = (x) => (x < 0 ? `(${Math.abs(x).toFixed(1)})` : x.toFixed(1));
const pct = (x, d = 1) => (x * 100).toFixed(d) + '%';
const sgn = (x) => (x >= 0 ? '+' : '−') + 'Tk ' + Math.abs(x).toFixed(1) + ' Cr';
const npv = b.npv_with_release_cr, npvNo = b.npv_without_release_cr;

// ---------- icons ----------
const ICONS = {};
async function icon(name, color) {
  const key = name + color;
  if (!ICONS[key]) {
    const svg = renderToStaticMarkup(React.createElement(fa[name], { size: 256, color: '#' + color }));
    const buf = await sharp(Buffer.from(svg)).resize(256, 256, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
    ICONS[key] = 'image/png;base64,' + buf.toString('base64');
  }
  return ICONS[key];
}

(async () => {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.author = 'Team The Last BrainCell';
  pres.title = 'Parachute Naturale WaterSmart: OTW Season 5 Round 2 proposal';
  pres.theme = { headFontFace: 'Calibri', bodyFontFace: 'Calibri' };

  const footer = 'Parachute Naturale WaterSmart  ·  Team The Last BrainCell  ·  Over The Wall Season 5, Round 2';
  pres.defineSlideMaster({
    title: 'CONTENT',
    background: { color: C.white },
    objects: [
      { image: { x: 11.62, y: 0.22, w: 1.36, h: 0.643, path: LOGO } },
      { text: { text: footer, options: { x: 0.6, y: 7.0, w: 9.5, h: 0.3, fontSize: 10, color: C.muted, margin: 0 } } },
      { placeholder: { options: { name: 'title', type: 'title', x: 0.6, y: 0.62, w: 10.8, h: 0.95, fontSize: 26, bold: true, color: C.navy, valign: 'top', align: 'left', margin: 0 }, text: '' } },
    ],
    slideNumber: { x: 12.23, y: 7.0, w: 0.5, h: 0.3, fontSize: 10, color: C.muted, align: 'right' },
  });
  pres.defineSlideMaster({
    title: 'DARK',
    background: { color: C.navy },
    objects: [
      { text: { text: footer, options: { x: 0.6, y: 7.0, w: 9.5, h: 0.3, fontSize: 10, color: 'AEB6D9', margin: 0 } } },
      { placeholder: { options: { name: 'title', type: 'title', x: 0.6, y: 0.62, w: 12.1, h: 0.95, fontSize: 28, bold: true, color: C.white, valign: 'top', align: 'left', margin: 0 }, text: '' } },
    ],
    slideNumber: { x: 12.23, y: 7.0, w: 0.5, h: 0.3, fontSize: 10, color: 'AEB6D9', align: 'right' },
  });
  pres.defineSlideMaster({ title: 'COVER', background: { color: C.navy }, objects: [] });

  // ---------- helpers ----------
  const T = (s, text, o) => s.addText(text, { margin: 0, isTextBox: true, fontSize: 12, color: C.ink, valign: 'top', ...o });
  const box = (s, x, y, w, h, fill, extra = {}) =>
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: fill }, line: { type: 'none' }, ...extra });
  const rect = (s, x, y, w, h, fill, extra = {}) => s.addShape(pres.shapes.RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { type: 'none' }, ...extra });
  const shadow = () => ({ type: 'outer', color: '000000', opacity: 0.12, blur: 8, offset: 2, angle: 90 });
  const tag = (s, text, dark) => T(s, text.toUpperCase(), { x: 0.6, y: 0.3, w: 10.5, h: 0.28, fontSize: 11, bold: true, color: dark ? C.orange : C.aquaTx, charSpacing: 2 });
  const title = (s, text) => s.addText(text, { placeholder: 'title' });
  const source = (s, text, dark) => T(s, text, { x: 0.6, y: 6.55, w: 12.13, h: 0.4, fontSize: 10, italic: true, color: dark ? 'AEB6D9' : C.muted, valign: 'bottom' });
  async function iconCircle(s, name, x, y, d, bg, fg = C.white) {
    s.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: bg }, line: { type: 'none' } });
    const p = d * 0.24;
    s.addImage({ data: await icon(name, fg), x: x + p, y: y + p, w: d - 2 * p, h: d - 2 * p });
  }
  function field(s, x, y, w, h, heading, lines, fs = 12) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: C.orangeLt }, line: { color: C.orange, width: 1.5, dashType: 'dash' } });
    const runs = [{ text: heading, options: { bold: true, color: 'B26B00', fontSize: 11, charSpacing: 1, breakLine: true } }];
    lines.forEach((l, i) => runs.push({ text: l, options: { bullet: { indent: 12 }, fontSize: fs, color: C.ink, breakLine: i < lines.length - 1, paraSpaceBefore: 5 } }));
    T(s, runs, { x: x + 0.18, y: y + 0.14, w: w - 0.36, h: h - 0.28 });
  }
  const content = (sec) => pres.addSlide({ masterName: 'CONTENT', sectionTitle: sec });

  // =============== 1. COVER ===============
  pres.addSection({ title: 'Cover' });
  {
    const s = pres.addSlide({ masterName: 'COVER', sectionTitle: 'Cover' });
    s.addShape(pres.shapes.OVAL, { x: 7.75, y: 0.45, w: 6.4, h: 6.4, fill: { color: C.aqua, transparency: 84 }, line: { type: 'none' } });
    s.addShape(pres.shapes.OVAL, { x: 8.75, y: 1.45, w: 4.4, h: 4.4, fill: { color: C.aqua, transparency: 72 }, line: { type: 'none' } });
    s.addImage({ path: A('bottle340.png'), x: 9.5, y: 0.7, w: 2.887, h: 6.0 });
    box(s, 0.6, 0.5, 2.25, 1.0, C.white, { rectRadius: 0.12 });
    s.addImage({ path: LOGO, x: 0.8, y: 0.563, w: 1.85, h: 0.874 });
    T(s, 'ROUND 2  ·  HAIR CLEANSING  ·  BUSINESS PROPOSAL', { x: 0.6, y: 1.95, w: 8.5, h: 0.35, fontSize: 13, bold: true, color: C.orange, charSpacing: 2 });
    T(s, [
      { text: 'Parachute Naturale', options: { fontSize: 30, color: C.paleTx, breakLine: true } },
      { text: 'WaterSmart', options: { fontSize: 66, bold: true, color: C.white } },
    ], { x: 0.6, y: 2.35, w: 8.6, h: 1.85 });
    T(s, 'The shampoo that checks your water first', { x: 0.6, y: 4.2, w: 8.5, h: 0.5, fontSize: 24, color: '9FE3F2' });
    T(s, 'দোষ কি চুলের, নাকি পানির?', { x: 0.6, y: 4.85, w: 8.5, h: 0.7, fontSize: 30, color: C.white, fontFace: BN });
    T(s, 'Is it your hair, or your water?', { x: 0.6, y: 5.55, w: 8, h: 0.4, fontSize: 16, italic: true, color: C.paleTx });
    T(s, 'Team The Last BrainCell', { x: 0.6, y: 6.3, w: 6, h: 0.4, fontSize: 18, bold: true, color: C.white });
    T(s, 'Over The Wall Season 5  ·  Marico Bangladesh  ·  October 2026', { x: 0.6, y: 6.7, w: 8, h: 0.3, fontSize: 12, color: 'AEB6D9' });
    s.addNotes('Open with the tagline: Is it your hair, or your water? WaterSmart is a Naturale shampoo that lets people test their water and then cleans away iron and hard-water build-up.');
  }

  // =============== 2. EXECUTIVE SUMMARY ===============
  pres.addSection({ title: 'Summary' });
  {
    const s = content('Summary');
    tag(s, 'Executive summary');
    title(s, 'WaterSmart turns Bangladesh’s hard, iron-rich water into Naturale’s next growth platform');
    const cards = [
      ['THE PROBLEM', 'FaDroplet', C.rust, '83%', 'of 3,530 sampled wells exceeded iron or hardness screening levels (BGS/DPHE)', 'Minerals block lather and leave hair rough and dull. People who move city or water source notice it first.'],
      ['THE IDEA', 'FaBottleDroplet', C.aqua, '3-in-1', 'chelating formula + PaniCheck cap + Pani Map', 'A Naturale shampoo with a hardness test strip in every 340 ml cap and a QR code to your area’s water profile.'],
      ['WHY MARICO', 'FaIndustry', C.blue, '#2', 'Naturale is the 2nd most penetrated shampoo brand in Bangladesh', 'Made on existing Mouchak lines (+45% shampoo batch capacity in FY26) and sold through Naturale’s distribution.'],
      ['THE BUSINESS', 'FaChartLine', C.green, `Tk ${pl[2].nr.toFixed(0)} Cr`, 'Year-3 net revenue; EBITDA-positive from Year 2', `NPV ${sgn(npv)} and IRR ${pct(b.irr_with_release, 0)} against a 15% hurdle. Peak funding Tk ${b.peak_funding_cr.toFixed(1)} Cr.`],
    ];
    for (let i = 0; i < 4; i++) {
      const [lab, ic, col, big, sub, body] = cards[i];
      const x = 0.6 + i * 3.09, y = 1.75, w = 2.86;
      box(s, x, y, w, 3.95, C.panel);
      await iconCircle(s, ic, x + 0.25, y + 0.25, 0.62, col);
      T(s, lab, { x: x + 1.0, y: y + 0.42, w: w - 1.15, h: 0.3, fontSize: 12, bold: true, color: col, charSpacing: 1 });
      T(s, big, { x: x + 0.25, y: y + 1.05, w: w - 0.5, h: 0.75, fontSize: 38, bold: true, color: C.navy });
      T(s, sub, { x: x + 0.25, y: y + 1.85, w: w - 0.5, h: 0.75, fontSize: 12, bold: true, color: C.ink });
      T(s, body, { x: x + 0.25, y: y + 2.65, w: w - 0.5, h: 1.2, fontSize: 12, color: C.muted });
    }
    box(s, 0.6, 5.88, 12.13, 0.62, C.navy);
    T(s, [
      { text: 'OUR ASK   ', options: { bold: true, color: C.orange, charSpacing: 1 } },
      { text: `Fund R&D and a 6-month, 1,500-outlet pilot: Tk ${fin.deck.prelaunch.cash_before_scale_decision_cr.toFixed(1)} Cr committed before the national go/no-go.`, options: { color: C.white } },
    ], { x: 0.85, y: 5.88, w: 11.7, h: 0.62, fontSize: 15, valign: 'middle' });
    source(s, 'Sources: BGS & DPHE (2001) national hydrochemical survey, team analysis; Marico Bangladesh Annual Report FY2025-26; team financial model v4 (planning assumptions, see Appendix A).');
    s.addNotes('The whole proposal on one page: a real water problem, a three-part product system, a strong Marico fit, and a business case that starts with a low-risk pilot.');
  }

  // =============== 3. COMPETITIVE LANDSCAPE ===============
  pres.addSection({ title: 'Business plan' });
  {
    const s = content('Business plan');
    tag(s, 'Business plan  ·  Competitive landscape');
    title(s, 'Every option fights for hair; none is built for the water');
    T(s, 'What someone with “bad-water hair” can choose today', { x: 0.6, y: 1.68, w: 6.3, h: 0.35, fontSize: 14, bold: true, color: C.navy });
    const rows = [
      ['FaBottleDroplet', 'Mass shampoos', 'Sunsilk, Clinic Plus, Naturale, Pantene · Tk 83–103 per 100 ml', 'Benefit-led, not built for minerals'],
      ['FaTags', 'Premium and anti-dandruff', 'Dove, Clear, Head & Shoulders, L’Oréal · Tk 142–180 per 100 ml', 'Costs more; same water problem'],
      ['FaWater', 'Imported hard-water shampoos', 'Dove Hard Water Defense (Gulf), Malibu C, import listings', 'Proves the need; import-priced, not in general trade'],
      ['FaShower', 'Workarounds', 'More shampoo, hair oil, conditioner, bottled-water rinse, filters', 'Cost more; treat symptoms only'],
      ['FaTriangleExclamation', 'Do nothing', 'Live with rough, dull hair', 'The biggest competitor'],
    ];
    for (let i = 0; i < rows.length; i++) {
      const [ic, name, ex, verdict] = rows[i];
      const y = 2.12 + i * 0.86;
      box(s, 0.6, y, 6.3, 0.78, C.panel);
      await iconCircle(s, ic, 0.75, y + 0.14, 0.5, i === 2 ? C.aqua : C.navy);
      T(s, name, { x: 1.4, y: y + 0.08, w: 3.2, h: 0.3, fontSize: 13, bold: true, color: C.navy });
      T(s, ex, { x: 1.4, y: y + 0.37, w: 3.25, h: 0.38, fontSize: 11, color: C.muted });
      T(s, verdict, { x: 4.75, y: y + 0.08, w: 2.0, h: 0.62, fontSize: 11, bold: true, color: C.rust, valign: 'middle' });
    }
    box(s, 7.2, 1.7, 5.53, 0.95, C.navy);
    T(s, [
      { text: 'Tk ~2,150 Cr', options: { fontSize: 26, bold: true, color: C.white, breakLine: true } },
      { text: 'Bangladesh shampoo market, 2026 estimate (USD 176M, Mordor Intelligence; Tk 122/USD)', options: { fontSize: 11, color: C.paleTx } },
    ], { x: 7.42, y: 1.76, w: 5.1, h: 0.85, valign: 'middle' });
    const labels = ['Naturale core 320 ml', 'Sunsilk 340 ml', 'WaterSmart 340 ml (proposed)', 'Naturale Hijab Fresh 340 ml', 'Dove 330 ml', 'Clear Men 330 ml', 'Head & Shoulders 1 L'];
    const vals = [83, 103, 106, 115, 142, 152, 180];
    s.addChart(pres.charts.BAR, [{ name: 'Tk per 100 ml', labels, values: vals }], {
      x: 7.1, y: 2.78, w: 5.65, h: 3.05, barDir: 'bar', catAxisOrientation: 'maxMin',
      chartColors: vals.map((_, i) => (i === 2 ? C.aqua : 'A7B0BE')), barGapWidthPct: 45,
      showValue: true, dataLabelPosition: 'outEnd', dataLabelFontSize: 11, dataLabelColor: C.ink, dataLabelFormatCode: '0', dataLabelFontFace: 'Calibri',
      catAxisLabelFontSize: 11, catAxisLabelColor: C.ink, catAxisLabelFontFace: 'Calibri', catAxisLineShow: false,
      valAxisHidden: true, valGridLine: { style: 'none' }, showLegend: false,
      showTitle: true, title: 'Shelf price per 100 ml (Tk), 9 Oct 2026', titleFontSize: 12, titleColor: C.navy, titleFontFace: 'Calibri',
    });
    T(s, 'Unilever already sells “Hard Water Defense” in the Gulf, so the need is proven abroad. We found no mass-priced option on the Bangladeshi e-retailers we checked.', { x: 7.2, y: 5.9, w: 5.53, h: 0.6, fontSize: 12, italic: true, color: C.navy });
    source(s, 'Sources: Chaldal and Arogga listings (accessed 9 Oct 2026, sale prices); Dove Arabia product page; Malibu C official site; Mordor Intelligence, Bangladesh Shampoo Market (2026 estimate).');
    s.addNotes('The universe is wider than shampoo brands: workarounds and doing nothing are the real competition. Price per 100 ml is from real retailer listings on 9 Oct 2026.');
  }

  // =============== 4. NEW OPPORTUNITIES ===============
  {
    const s = content('Business plan');
    tag(s, 'Business plan  ·  New opportunities identification');
    title(s, 'The opportunity is in the water: in 58 of 61 sampled districts, most wells are iron-rich or hard');
    s.addImage({ path: A('map.png'), x: 0.55, y: 1.65, w: 3.39, h: 4.75 });
    T(s, 'Share of wells flagged*', { x: 2.45, y: 1.64, w: 1.8, h: 0.22, fontSize: 10, bold: true, color: C.navy });
    const leg = [['8E3B12', '90% or more'], ['C8612A', '75–89%'], ['E9A06B', '50–74%'], ['F6DCC4', 'Under 50%'], ['D9DEE5', 'Not sampled']];
    leg.forEach(([c, l], i) => {
      rect(s, 2.45, 1.9 + i * 0.17, 0.15, 0.12, c);
      T(s, l, { x: 2.66, y: 1.87 + i * 0.17, w: 1.3, h: 0.18, fontSize: 10, color: C.ink });
    });
    const stats = [
      ['65%', 'of 3,530 wells had iron above 0.3 mg/L, the level that stains buckets and tastes metallic'],
      ['58%', 'were hard or very hard: above 120 mg/L as CaCO₃ (USGS classes)'],
      ['6 of 12', 'Dhaka tap locations tested hard in a 2025 study, up to 300 mg/L at Amin Bazar'],
      ['5 of 5', 'largest division districts are majority-flagged: Dhaka 76%, Chattogram 86%, Rajshahi 94%, Khulna 96%, Sylhet 91%'],
    ];
    stats.forEach(([n, t], i) => {
      const x = 4.3 + (i % 2) * 4.33, y = 1.7 + Math.floor(i / 2) * 1.6;
      box(s, x, y, 4.1, 1.45, C.rustLt);
      T(s, n, { x: x + 0.2, y: y + 0.2, w: 1.75, h: 1.05, fontSize: 34, bold: true, color: C.rust, valign: 'middle' });
      T(s, t, { x: x + 2.0, y: y + 0.15, w: 1.95, h: 1.15, fontSize: 12, color: C.ink, valign: 'middle' });
    });
    const chain = [
      [C.rustLt, 'Calcium, magnesium and iron deposit on hair and tie up shampoo surfactant'],
      [C.rustLt, 'Less lather, a rough or dull feel, and more shampoo used per wash'],
      [C.aquaLt, 'A chelator (GLDA) locks the minerals so they rinse away'],
    ];
    chain.forEach(([c, t], i) => {
      const x = 4.3 + i * 2.9;
      box(s, x, 4.95, 2.55, 0.95, c);
      T(s, t, { x: x + 0.15, y: 4.95, w: 2.25, h: 0.95, fontSize: 12, color: C.ink, valign: 'middle', bold: i === 2 });
      if (i < 2) s.addShape(pres.shapes.RIGHT_ARROW, { x: x + 2.6, y: 5.27, w: 0.3, h: 0.3, fill: { color: 'A7B0BE' }, line: { type: 'none' } });
    });
    if (NOFIELD) T(s, 'Pani Map makes this district history searchable; the PaniCheck strip measures each home’s water today.', { x: 4.3, y: 6.02, w: 8.43, h: 0.48, fontSize: 12, bold: true, color: C.aquaTx, valign: 'middle' });
    else field(s, 4.3, 6.02, 8.43, 0.48, 'OUR TEST [date]:  hall tap water  [ ] mg/L hardness  ·  [ ] mg/L iron  ·  TDS [ ] ppm', [], 11);
    source(s, '*Iron >0.3 mg/L or hardness >120 mg/L. BGS & DPHE (2001): 3,534 wells sampled 1998–99, team analysis (historical wells, not today’s taps). ICCEI 2025 Dhaka tap study; USGS hardness classes; US EPA iron guideline 0.3 mg/L.');
    s.addNotes('Real national data: 2,926 of 3,530 sampled wells were flagged for iron or hardness. These are historical wells, which is exactly why the product puts a test in the user’s hand.');
  }

  // =============== 5. CONSUMER ===============
  {
    const s = content('Business plan');
    tag(s, 'Business plan  ·  Consumer understanding & insights');
    title(s, 'Movers feel it first: a new city, new water, and hair that no longer feels right');
    box(s, 0.6, 1.7, 3.95, 4.1, C.navy);
    await iconCircle(s, 'FaPersonWalkingLuggage', 0.82, 1.9, 0.55, C.orange, C.navy);
    T(s, 'TARGET: ADULT “MOVERS”, 18–35', { x: 1.5, y: 1.98, w: 2.95, h: 0.4, fontSize: 12, bold: true, color: C.orange });
    const who = [
      'University and hall students: 4.82M in public universities and affiliated colleges (UGC, 2023)',
      'Mess residents and young workers who moved city or changed water source',
      'Urban and peri-urban, women and men; price-aware but brand-aware',
      'Where: hall, mess and rented-flat bathrooms on tube-well or supply water',
      'Want: hair that feels like home, proof rather than promises, a fair price',
      'Phase 2: coastal households on saline water (LonaJol)',
    ];
    T(s, who.map((t, i) => ({ text: t, options: { bullet: { indent: 12 }, breakLine: i < who.length - 1, paraSpaceAfter: 5 } })), { x: 0.8, y: 2.6, w: 3.6, h: 3.1, fontSize: 12, color: C.white });
    const ev = [
      ['#1 = function', 'Women shampoo users (n=390, Dhaka and Chattogram) rank functionality first (4.21/5), above brand image (4.15) and price (4.13). Packaging comes last (3.40).', 'Khanam & Rahman, 2022'],
      ['47%', 'of coastal adults (182 of 391, Ramgati) say saline water frequently or very frequently causes hair loss, as they perceive it.', 'Zakaria et al., 2025'],
      ['53.8M', 'Bangladeshis live in urban areas (31.7%). The cities Movers move to are majority-flagged for iron or hardness.', 'BBS Census 2022; BGS/DPHE'],
    ];
    ev.forEach(([n, t, src], i) => {
      const y = 1.7 + i * 1.4;
      box(s, 4.8, y, 4.0, 1.3, C.panel);
      T(s, n, { x: 5.0, y: y + 0.1, w: 3.6, h: 0.42, fontSize: 20, bold: true, color: C.aquaTx });
      T(s, t, { x: 5.0, y: y + 0.5, w: 3.65, h: 0.62, fontSize: 11, color: C.ink });
      T(s, src, { x: 5.0, y: y + 1.04, w: 3.6, h: 0.22, fontSize: 10, italic: true, color: C.muted });
    });
    if (NOFIELD) {
      box(s, 9.05, 1.7, 3.68, 4.1, C.aquaLt);
      T(s, [
        { text: 'BIG BRANDS SEE THE NEED', options: { bold: true, color: C.aquaTx, fontSize: 11, charSpacing: 1, breakLine: true } },
        { text: 'Unilever launched Dove Hard Water Defense in the Gulf, built on “Mineral Shield” technology against calcium deposits.', options: { fontSize: 12, color: C.ink, breakLine: true, paraSpaceBefore: 6 } },
        { text: 'NEXT: OUR CONSUMER TEST', options: { bold: true, color: C.aquaTx, fontSize: 11, charSpacing: 1, breakLine: true, paraSpaceBefore: 14 } },
        { text: 'Before the pilot: an adult survey of Movers (hair change after a water change, unprompted cause, open price before Tk 360) and a same-shampoo foam test in hall water. Results are reported with their real sample sizes.', options: { fontSize: 12, color: C.ink, paraSpaceBefore: 6 } },
      ], { x: 9.25, y: 1.85, w: 3.3, h: 3.85 });
    } else field(s, 9.05, 1.7, 3.68, 4.1, 'OUR FIELD RESEARCH · 9–10 OCT 2026', [
      'Google Form survey: n = [ ] consenting adults',
      'Changed water source in the last 12 months: [ ]; of them, [ ]% felt their hair got worse',
      '[ ]% of those with a hair problem named water as a cause, unprompted',
      '[ ]% would definitely or probably buy at Tk 360',
      'Median maximum price for 340 ml: Tk [ ]',
      'Foam test: same shampoo, [ ]% less foam in hall water than in bottled water',
    ], 12);
    box(s, 0.6, 5.95, 12.13, 0.55, C.aquaLt);
    T(s, [
      { text: 'INSIGHT   ', options: { bold: true, color: C.aquaTx, charSpacing: 1 } },
      { text: 'People blame their hair, or their shampoo. The real culprit may be the water, and nobody gives them a way to check.', options: { color: C.navy } },
    ], { x: 0.85, y: 5.95, w: 11.7, h: 0.55, fontSize: 14, valign: 'middle' });
    source(s, 'Sources: Khanam & Rahman (2022), Journal of Social Sciences 10(12); Zakaria et al. (2025), Frontiers in Public Health; UGC Annual Report 2023 via Prothom Alo (4 Oct 2025); BBS Population & Housing Census 2022.');
    s.addNotes(NOFIELD ? 'Published surveys are credited to their authors. Our own consumer test is part of the pre-pilot plan.' : 'Published surveys are credited to their authors. The dashed panel holds our own survey and foam-test results, reported with their real sample sizes.');
  }

  // =============== 6. BIG IDEA ===============
  {
    const s = content('Business plan');
    tag(s, 'Business plan  ·  Your big idea');
    title(s, 'Parachute Naturale WaterSmart: check your water, then wash smarter');
    s.addShape(pres.shapes.OVAL, { x: 0.45, y: 2.0, w: 5.2, h: 4.4, fill: { color: C.aquaLt }, line: { type: 'none' } });
    s.addImage({ path: A('bottle340.png'), x: 0.6, y: 1.62, w: 2.262, h: 4.7 });
    s.addImage({ path: A('bottle180.png'), x: 2.7, y: 2.9, w: 1.636, h: 3.4 });
    s.addImage({ path: A('sachet.png'), x: 4.25, y: 4.55, w: 1.25, h: 1.75 });
    const parts = [
      ['FaFlask', C.aqua, 'THE FORMULA  ·  chelating cleanse', 'GLDA, a readily biodegradable chelator, binds iron, calcium and magnesium so they rinse away. Coconut-derived surfactants lather in hard water; Coconut Milk Protein conditions.'],
      ['FaVial', C.orange, 'THE PACK  ·  PaniCheck cap', 'A foil-sealed hardness strip in every 340 ml cap. Dip for one second, match the colour, and know your water in under a minute.'],
      ['FaMapLocationDot', C.blue, 'THE SERVICE  ·  Pani Map', 'A QR code on every pack, sachets included, opens your area’s water profile (BGS/DPHE data) and a step-by-step guide to testing your own water.'],
    ];
    for (let i = 0; i < 3; i++) {
      const [ic, col, h, t] = parts[i];
      const y = 1.7 + i * 1.22;
      box(s, 5.9, y, 6.83, 1.1, C.panel);
      await iconCircle(s, ic, 6.08, y + 0.22, 0.62, col);
      T(s, h, { x: 6.9, y: y + 0.1, w: 5.7, h: 0.3, fontSize: 13, bold: true, color: C.navy });
      T(s, t, { x: 6.9, y: y + 0.4, w: 5.7, h: 0.65, fontSize: 12, color: C.ink });
    }
    T(s, 'Sachet Tk 3  ·  180 ml Tk 180  ·  340 ml + PaniCheck Tk 360  ·  Phase 2: LonaJol (saline)', { x: 5.9, y: 5.38, w: 6.83, h: 0.35, fontSize: 12, bold: true, color: C.aquaTx });
    box(s, 5.9, 5.82, 6.83, 0.66, C.navy);
    T(s, [
      { text: 'দোষ কি চুলের, নাকি পানির?  আগে পানি চেক করুন।', options: { fontFace: BN, fontSize: 17, color: C.white, breakLine: true } },
      { text: 'Is it your hair, or your water? Check your water first.', options: { fontSize: 11, italic: true, color: C.paleTx } },
    ], { x: 6.1, y: 5.82, w: 6.5, h: 0.66, valign: 'middle' });
    source(s, 'Mock-ups are illustrative concepts. Product claims are proposed and subject to Marico R&D substantiation. GLDA: Nouryon Dissolvine product guide (readily biodegradable).');
    s.addNotes('Three parts working together: a formula that fixes the problem, a cap that reveals it, and a map that explains it. The 340 ml carries the strip; sachets carry the QR.');
  }

  // =============== 7. BRAND ===============
  {
    const s = content('Business plan');
    tag(s, 'Business plan  ·  Brand definition & category fit');
    title(s, 'A Naturale variant, not a new brand: natural care upgraded with water science');
    box(s, 0.6, 1.7, 6.3, 0.8, C.navy);
    T(s, [
      { text: 'BRAND PROMISE', options: { fontSize: 10, bold: true, color: C.orange, charSpacing: 2, breakLine: true } },
      { text: 'Clean you can feel, in any water', options: { fontSize: 20, bold: true, color: C.white } },
    ], { x: 0.85, y: 1.7, w: 5.9, h: 0.8, valign: 'middle' });
    const pillars = [
      ['FaFlask', 'Water science', 'GLDA chelation; lathers in hard water'],
      ['FaLeaf', 'Natural care', 'Coconut Milk Protein; paraben-free and dermatologically tested, like all Naturale'],
      ['FaMagnifyingGlass', 'Know your water', 'PaniCheck strip and Pani Map'],
    ];
    for (let i = 0; i < 3; i++) {
      const [ic, h, t] = pillars[i];
      const x = 0.6 + i * 2.17;
      box(s, x, 2.62, 1.96, 2.25, C.aquaLt);
      await iconCircle(s, ic, x + 0.68, 2.8, 0.6, C.aqua);
      T(s, h, { x: x + 0.12, y: 3.5, w: 1.72, h: 0.35, fontSize: 14, bold: true, color: C.navy, align: 'center' });
      T(s, t, { x: x + 0.15, y: 3.88, w: 1.66, h: 0.95, fontSize: 11, color: C.ink, align: 'center' });
    }
    box(s, 0.6, 4.99, 6.3, 0.7, C.greenLt);
    T(s, [
      { text: 'FOUNDATION   ', options: { bold: true, color: C.green, fontSize: 11, charSpacing: 1 } },
      { text: 'Parachute Naturale, the 2nd most penetrated shampoo brand in Bangladesh', options: { color: C.ink, fontSize: 13 } },
    ], { x: 0.8, y: 4.99, w: 6.0, h: 0.7, valign: 'middle' });
    T(s, 'Personality', { x: 0.6, y: 5.9, w: 1.2, h: 0.4, fontSize: 12, bold: true, color: C.navy, valign: 'middle' });
    ['Smart', 'Honest', 'Reassuring', 'Youthful'].forEach((p, i) => {
      box(s, 1.85 + i * 1.27, 5.9, 1.15, 0.4, C.white, { line: { color: C.aqua, width: 1 } });
      T(s, p, { x: 1.85 + i * 1.27, y: 5.9, w: 1.15, h: 0.4, fontSize: 12, color: C.aquaTx, align: 'center', valign: 'middle' });
    });
    box(s, 7.2, 1.7, 5.53, 1.55, C.panel);
    T(s, [
      { text: 'CATEGORY FIT', options: { bold: true, color: C.aquaTx, fontSize: 11, charSpacing: 1, breakLine: true } },
      { text: 'Existing category: hair cleansing. New need-state: water-smart cleansing, the first Naturale variant chosen by your water rather than your hair type. It answers the brief’s call for “hair cleansing solutions for emerging consumer needs and usage occasions”.', options: { fontSize: 12, color: C.ink } },
    ], { x: 7.4, y: 1.82, w: 5.15, h: 1.35 });
    box(s, 7.2, 3.37, 5.53, 1.85, C.panel);
    const why = ['2nd most penetrated shampoo brand (Marico FY26)', 'Same hero ingredient: Coconut Milk Protein', 'Existing general trade, modern trade and e-commerce reach; e-commerce shampoo grew about 45% in FY26', 'Cheaper to launch than a new brand'];
    T(s, [{ text: 'WHY UNDER NATURALE', options: { bold: true, color: C.aquaTx, fontSize: 11, charSpacing: 1, breakLine: true } },
      ...why.map((t, i) => ({ text: t, options: { bullet: { indent: 12 }, fontSize: 12, color: C.ink, breakLine: i < why.length - 1, paraSpaceBefore: 4 } }))],
    { x: 7.4, y: 3.48, w: 5.15, h: 1.68 });
    [['INNOVATION', 'Formula + a test in the cap'], ['DIVERSIFICATION', 'New need-state; coastal Phase 2'], ['SCALING UP', 'Existing lines; sachet-to-bottle ladder']].forEach(([h, t], i) => {
      const x = 7.2 + i * 1.88;
      box(s, x, 5.34, 1.77, 0.96, C.orangeLt);
      T(s, [{ text: h, options: { bold: true, fontSize: 10, color: 'B26B00', charSpacing: 1, breakLine: true } }, { text: t, options: { fontSize: 11, color: C.ink } }], { x: x + 0.1, y: 5.4, w: 1.6, h: 0.86 });
    });
    source(s, 'Sources: Marico Bangladesh Annual Report FY2025-26 (Naturale penetration, e-commerce shampoo growth); OTW Season 5 case brief. Innovation, Diversification and Scaling Up are the Season 5 pivots.');
    s.addNotes('Launching under Naturale borrows its trust and distribution, which is why the launch budget is affordable.');
  }

  // =============== 8. MARKET SIZE ===============
  {
    const s = content('Business plan');
    tag(s, 'Business plan  ·  Market / opportunity size');
    title(s, 'A mass-market problem: a Tk ~2,150 Cr category and Tk 71 Cr of WaterSmart sales by Year 3');
    s.addShape(pres.shapes.OVAL, { x: 0.6, y: 1.85, w: 4.55, h: 4.55, fill: { color: 'DCE3F3' }, line: { type: 'none' } });
    s.addShape(pres.shapes.OVAL, { x: 1.27, y: 3.15, w: 3.2, h: 3.2, fill: { color: '9ED9E8' }, line: { type: 'none' } });
    s.addShape(pres.shapes.OVAL, { x: 2.02, y: 4.6, w: 1.7, h: 1.7, fill: { color: C.orange }, line: { type: 'none' } });
    T(s, [{ text: 'TAM', options: { fontSize: 11, bold: true, color: C.navy, breakLine: true } }, { text: 'Tk ~2,150 Cr', options: { fontSize: 18, bold: true, color: C.navy } }], { x: 1.4, y: 2.1, w: 2.95, h: 0.8, align: 'center' });
    T(s, [{ text: 'SAM', options: { fontSize: 11, bold: true, color: C.navy, breakLine: true } }, { text: 'Up to ~21M Movers', options: { fontSize: 15, bold: true, color: C.navy } }], { x: 1.6, y: 3.45, w: 2.55, h: 0.8, align: 'center' });
    T(s, [{ text: 'SOM, Y3', options: { fontSize: 10, bold: true, color: C.navy, breakLine: true } }, { text: `Tk ${pl[2].gross.toFixed(0)} Cr`, options: { fontSize: 17, bold: true, color: C.navy } }], { x: 2.02, y: 5.05, w: 1.7, h: 0.8, align: 'center' });
    const washes = pl[2].units.b340 * 340 / 7 + pl[2].units.b180 * 180 / 7 + pl[2].units.sachet;
    const users = washes / 104 / 1e6;
    const rows = [
      [C.navy, C.white, 'TAM', 'Tk ~2,150 Cr: Bangladesh shampoo market value, 2026 estimate (USD 176M, Mordor; Tk 122/USD). The problem is national: 58 of 61 sampled districts are majority-flagged for iron or hardness.'],
      ['9ED9E8', C.navy, 'SAM', 'Up to ~21M Movers: 4.82M students in public universities and affiliated colleges (UGC 2023) plus ~16.5M lifetime internal migrants (9.7% of 169.8M people, 2011 census share). The groups overlap.'],
      [C.orange, C.navy, 'SOM', `Tk ${pl[2].gross.toFixed(1)} Cr gross sales in Year 3, ${(pl[2].gross / 2150 * 100).toFixed(1)}% of today’s category. ${(washes / 1e6).toFixed(0)}M washes a year is about ${users.toFixed(1)}M regular users at two washes a week, roughly ${(users / 21 * 100).toFixed(0)}% of Movers.`],
    ];
    rows.forEach(([bg, fg, h, t], i) => {
      const y = 1.75 + i * 1.35;
      box(s, 5.6, y, 7.13, 1.22, C.panel);
      box(s, 5.78, y + 0.36, 0.95, 0.5, bg);
      T(s, h, { x: 5.78, y: y + 0.36, w: 0.95, h: 0.5, fontSize: 14, bold: true, color: fg, align: 'center', valign: 'middle' });
      T(s, t, { x: 6.95, y: y + 0.1, w: 5.6, h: 1.02, fontSize: 12, color: C.ink, valign: 'middle' });
    });
    box(s, 5.6, 5.85, 7.13, 0.62, C.aquaLt);
    T(s, `Cross-checks: Year-3 net revenue Tk ${pl[2].nr.toFixed(1)} Cr is ${(pl[2].nr / 2071.2 * 100).toFixed(1)}% of Marico Bangladesh’s FY26 revenue (Tk 2,071 Cr). Mass, not niche: a Tk 3 sachet entry and 104k outlets by Year 3.`, { x: 5.8, y: 5.85, w: 6.8, h: 0.62, fontSize: 12, color: C.navy, valign: 'middle' });
    source(s, 'Sources: Mordor Intelligence (2026e); UGC Annual Report 2023 via Prothom Alo; BBS Census 2011 (lifetime migration) and 2022 (population); Marico FY26; team model v4. Usage assumption: 7 ml per wash, two washes a week.');
    s.addNotes('Sizing is bottom-up from outlets and units, then cross-checked against the category and against Marico’s revenue.');
  }

  // =============== 9. VALUE PROPOSITION ===============
  {
    const s = content('Business plan');
    tag(s, 'Business plan  ·  Value proposition');
    title(s, 'Our promise: hair that feels clean again, whatever water you live with');
    const panel = async (x, bg, col, ic, head, blocks) => {
      box(s, x, 1.7, 5.7, 3.95, bg);
      await iconCircle(s, ic, x + 0.25, 1.88, 0.55, col);
      T(s, head, { x: x + 0.95, y: 1.95, w: 4.5, h: 0.42, fontSize: 16, bold: true, color: C.navy });
      blocks.forEach(([l, t], i) => {
        const y = 2.6 + i * 0.98;
        T(s, l, { x: x + 0.3, y, w: 5.1, h: 0.26, fontSize: 11, bold: true, color: col, charSpacing: 1 });
        T(s, t, { x: x + 0.3, y: y + 0.27, w: 5.1, h: 0.65, fontSize: 12, color: C.ink });
      });
    };
    await panel(0.6, C.rustLt, C.rust, 'FaPersonWalkingLuggage', 'The Mover', [
      ['JOB TO BE DONE', 'Get clean, soft hair with whatever water the hall, mess or flat has'],
      ['PAINS', 'Low lather, a rough or sticky feel, dull hair, extra shampoo, orange stains, and “is it me or the water?”'],
      ['GAINS', 'Hair that feels like home, confidence, no wasted money'],
    ]);
    await panel(7.03, C.aquaLt, C.aquaTx, 'FaBottleDroplet', 'WaterSmart', [
      ['PRODUCTS', 'Iron & Hard Water shampoo, PaniCheck cap, Pani Map'],
      ['PAIN RELIEVERS', 'Chelator removes mineral build-up*; lathers in hard water*; the strip ends the guesswork'],
      ['GAIN CREATORS', 'Coconut Milk Protein care; Tk 106 per 100 ml against Tk 142–180 for premium brands; a Tk 3 sachet to try'],
    ]);
    s.addShape(pres.shapes.OVAL, { x: 6.37, y: 3.3, w: 0.6, h: 0.6, fill: { color: C.navy }, line: { color: C.white, width: 2 } });
    T(s, 'FIT', { x: 6.37, y: 3.3, w: 0.6, h: 0.6, fontSize: 11, bold: true, color: C.white, align: 'center', valign: 'middle' });
    box(s, 0.6, 5.8, 12.13, 0.7, C.navy);
    T(s, 'For Movers whose hair changed with their water, WaterSmart is the Naturale shampoo that checks your water and cleans away iron and hard-water build-up, so hair feels like home again.', { x: 0.85, y: 5.8, w: 11.7, h: 0.7, fontSize: 14, italic: true, color: C.white, valign: 'middle' });
    source(s, '*Proposed claims, to be substantiated by Marico R&D (hair-tress deposit and lather tests) before launch. Prices: Chaldal and Arogga listings, 9 Oct 2026.');
    s.addNotes('Value proposition: what the brand promises. The USP on the next slide is what makes it different.');
  }

  // =============== 10. USP ===============
  {
    const s = content('Business plan');
    tag(s, 'Business plan  ·  Unique selling proposition');
    title(s, 'USP: a water test in every cap. No shampoo we found offers one');
    const steps = [['FaHandPointer', 'Flip the cap', 'The strip sits in a foil pouch in the lid'], ['FaDroplet', 'Dip for 1 second', 'In your bucket, shower or tap water'], ['FaMagnifyingGlass', 'Match the colour', 'Soft, moderate, hard or very hard'], ['FaQrcode', 'Scan the QR', 'Pani Map and tips for your water']];
    for (let i = 0; i < 4; i++) {
      const [ic, h, t] = steps[i];
      const x = 0.55 + i * 1.65;
      await iconCircle(s, ic, x + 0.5, 1.7, 0.62, C.navy);
      s.addShape(pres.shapes.OVAL, { x: x + 0.98, y: 1.62, w: 0.3, h: 0.3, fill: { color: C.orange }, line: { type: 'none' } });
      T(s, String(i + 1), { x: x + 0.98, y: 1.62, w: 0.3, h: 0.3, fontSize: 11, bold: true, color: C.navy, align: 'center', valign: 'middle' });
      T(s, h, { x, y: 2.42, w: 1.6, h: 0.3, fontSize: 13, bold: true, color: C.navy, align: 'center' });
      T(s, t, { x, y: 2.74, w: 1.6, h: 0.6, fontSize: 11, color: C.muted, align: 'center' });
    }
    s.addImage({ path: A('chart.png'), x: 0.6, y: 3.55, w: 4.5, h: 1.69 });
    T(s, 'Illustrative colours; the final chart comes from the strip supplier.', { x: 0.6, y: 5.27, w: 4.5, h: 0.25, fontSize: 10, italic: true, color: C.muted });
    box(s, 0.6, 5.6, 4.5, 0.85, C.panel);
    T(s, 'Strip spec: total hardness 0–425 mg/L · individually foil-sealed · 18-month target life · Tk 3 target cost including sleeve', { x: 0.75, y: 5.6, w: 4.2, h: 0.85, fontSize: 11, color: C.ink, valign: 'middle' });
    s.addImage({ path: A('phone.png'), x: 5.4, y: 3.45, w: 1.53, h: 2.95 });
    const H = (t) => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.navy }, align: 'center' } });
    const W = (t) => ({ text: t, options: { bold: true, color: C.aquaTx, fill: { color: C.aquaLt }, align: 'center' } });
    const N = (t) => ({ text: t, options: { align: 'center' } });
    const tbl = [
      [{ text: 'Feature', options: { bold: true, color: C.white, fill: { color: C.navy } } }, H('WaterSmart'), H('Dove HWD (Gulf)'), H('Naturale core'), H('Mass brands')],
      ['Mineral chelator', W('GLDA'), N('EDTA'), N('–'), N('–')],
      ['Water test in pack', W('✓'), N('✗'), N('✗'), N('✗')],
      ['Area water info (QR)', W('✓'), N('✗'), N('✗'), N('✗')],
      ['In Bangladesh GT', W('✓'), N('✗'), N('✓'), N('✓')],
      ['Sachet trial', W('Tk 3'), N('✗'), N('Tk 2'), N('✓')],
      ['Price per 100 ml', W('Tk 106'), N('Import'), N('Tk 83'), N('Tk 103')],
    ];
    s.addTable(tbl, { x: 7.25, y: 1.7, w: 5.48, colW: [1.68, 0.98, 1.0, 0.92, 0.9], rowH: 0.4, fontSize: 11, color: C.ink, valign: 'middle', border: { type: 'solid', pt: 0.75, color: C.line }, margin: 0.05 });
    box(s, 7.25, 4.75, 5.48, 1.7, C.navy);
    T(s, [
      { text: 'See the problem, then solve it, in one pack.', options: { fontSize: 18, bold: true, color: C.white, breakLine: true } },
      { text: 'Dove’s Gulf pack shields hair from minerals. WaterSmart also shows people their problem, which turns every bottle into its own product demo.', options: { fontSize: 12, color: C.paleTx } },
    ], { x: 7.5, y: 4.75, w: 5.0, h: 1.7, valign: 'middle' });
    source(s, 'Sources: Dove Arabia product page (ingredients include Disodium EDTA; no in-pack test shown); Chaldal and Arogga, 9 Oct 2026; Hach, Bartovation and Macherey-Nagel sealed hardness-strip specifications.');
    s.addNotes('The strip is the packaging innovation: like Extra Care’s root applicator, it turns the pack into the proof.');
  }

  // =============== 11. MARKETING ===============
  pres.addSection({ title: 'Execution plan' });
  {
    const s = content('Execution plan');
    tag(s, 'Execution plan  ·  Marketing task definition');
    title(s, 'Campaign “Check your water first”: make the problem visible, then make WaterSmart the answer');
    box(s, 0.6, 1.7, 12.13, 0.55, C.aquaLt);
    T(s, [{ text: 'BRAND TASK   ', options: { bold: true, color: C.aquaTx, charSpacing: 1 } }, { text: 'Build salience for a new need-state, “water hair”, among Movers, then turn curiosity into trial.', options: { color: C.navy } }], { x: 0.85, y: 1.7, w: 11.7, h: 0.55, fontSize: 14, valign: 'middle' });
    const stages = [
      ['AWARE', 'FaBullhorn', C.navy, '#PaniCheckChallenge', 'Creators test hall and home water on camera on TikTok, Facebook and YouTube. Influencer-led, like Parachute Advansed Secrets.', 'Surround'],
      ['CONSIDER', 'FaMobileScreenButton', C.blue, 'Pani Map on WhatsApp', 'Scan or message your upazila to see its water history and get a guide to testing your own water.', 'Unique'],
      ['TRY', 'FaFlask', C.aqua, 'Campus “Pani Lab”', 'Booths at 30 universities and halls: a free strip test, a same-shampoo foam demo and Tk 3 sachet sampling.', 'Unique'],
      ['REPEAT', 'FaRotate', C.green, 'Every bottle is a demo', 'The in-cap test works at home. E-commerce brand days and bundles; shelf strips with QR codes at cosmetics stores and supermarkets.', 'Surround'],
    ];
    for (let i = 0; i < 4; i++) {
      const [st, ic, col, h, t, role] = stages[i];
      const x = 0.6 + i * 3.08;
      box(s, x, 2.4, 2.88, 2.2, C.panel);
      await iconCircle(s, ic, x + 0.2, 2.55, 0.55, col);
      T(s, st, { x: x + 0.88, y: 2.6, w: 1.0, h: 0.25, fontSize: 11, bold: true, color: col, charSpacing: 1 });
      box(s, x + 1.88, 2.6, 0.85, 0.27, role === 'Unique' ? C.orange : C.line);
      T(s, role, { x: x + 1.88, y: 2.6, w: 0.85, h: 0.27, fontSize: 10, bold: true, color: C.navy, align: 'center', valign: 'middle' });
      T(s, h, { x: x + 0.2, y: 3.2, w: 2.5, h: 0.32, fontSize: 13, bold: true, color: C.navy });
      T(s, t, { x: x + 0.2, y: 3.52, w: 2.5, h: 1.0, fontSize: 11, color: C.ink });
    }
    T(s, 'Launch calendar, Year 1', { x: 0.6, y: 4.75, w: 4, h: 0.3, fontSize: 12, bold: true, color: C.navy });
    [['Q1', 'Pipeline fill and teaser'], ['Q2', 'Campus blitz at session start'], ['Q3', 'Creators and e-commerce brand days'], ['Q4', 'Rural sachet push and haat activations']].forEach(([q, t], i) => {
      const x = 0.6 + i * 1.88;
      box(s, x, 5.1, 1.78, 1.3, i === 1 ? C.orangeLt : C.panel);
      T(s, [{ text: q, options: { bold: true, fontSize: 14, color: C.navy, breakLine: true } }, { text: t, options: { fontSize: 11, color: C.ink } }], { x: x + 0.12, y: 5.18, w: 1.56, h: 1.15 });
    });
    box(s, 8.25, 4.75, 4.48, 1.65, C.panel);
    T(s, 'Year-1 A&P: Tk 4.5 Cr', { x: 8.45, y: 4.82, w: 4.1, h: 0.3, fontSize: 13, bold: true, color: C.navy });
    [['Digital and creators', 0.4], ['Activation', 0.3], ['Retail visibility', 0.2], ['PR and other', 0.1]].forEach(([l, p], i) => {
      const y = 5.2 + i * 0.29;
      T(s, l, { x: 8.45, y, w: 1.7, h: 0.25, fontSize: 11, color: C.ink, valign: 'middle' });
      rect(s, 10.15, y + 0.04, 1.8 * p / 0.4, 0.18, C.aqua);
      T(s, `${Math.round(p * 100)}% · Tk ${(4.5 * p).toFixed(2)} Cr`, { x: 10.2 + 1.8 * p / 0.4, y, w: 1.5, h: 0.25, fontSize: 10, color: C.muted, valign: 'middle' });
    });
    source(s, 'KPIs: spontaneous awareness among Movers · consideration · water tests done (one per 340 ml bottle: 1.5M in three years) · trial · rate of sale. Framework: Marketing masterclass (unique and surround touchpoints). Budget split is a planning assumption.');
    s.addNotes('Unique touchpoints carry the idea (testing water); surround touchpoints scale it. Campus activation reaches Movers where they live.');
  }

  // =============== 12. SALES ===============
  {
    const s = content('Execution plan');
    tag(s, 'Execution plan  ·  Sales strategy');
    title(s, 'Sales: sachets for reach, 340 ml for value: 37k outlets in Year 1, 104k by Year 3');
    const lead = ['Sachet', 'Sachet, 180 ml', '340 ml + strip', '180 ml', 'Sachet', '340 ml', '340 ml'];
    const names = ['Rural grocer (RG)', 'Urban neighbourhood grocer (UNG)', 'Urban cosmetics store (UCS)', 'Rural cosmetics store (RCS)', 'Wholesale (WS)', 'Modern trade (MT)', 'E-commerce'];
    const fmtU = (u) => u.map((v) => (v === 0 ? '–' : String(v))).join(' · ');
    const hdr = (t) => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.navy }, align: 'center', valign: 'middle' } });
    const rows = [[{ text: 'Channel', options: { bold: true, color: C.white, fill: { color: C.navy } } }, hdr('Year-1 outlets'), hdr('Year-3 outlets'), hdr('Lead pack'), hdr('Units / outlet / month (sachet · 180 · 340)')]];
    let t1 = 0, t3 = 0;
    fin.deck.channels.forEach((c, i) => {
      t1 += c.outlets[0]; t3 += c.outlets[2];
      rows.push([names[i], { text: c.outlets[0].toLocaleString('en-US'), options: { align: 'center' } }, { text: c.outlets[2].toLocaleString('en-US'), options: { align: 'center' } }, { text: lead[i], options: { align: 'center' } }, { text: fmtU(c.units_per_outlet_month), options: { align: 'center' } }]);
    });
    const tot = (t) => ({ text: t, options: { bold: true, fill: { color: C.aquaLt }, align: 'center' } });
    rows.push([{ text: 'Total', options: { bold: true, fill: { color: C.aquaLt } } }, tot(t1.toLocaleString('en-US')), tot(t3.toLocaleString('en-US')), tot(''), tot('')]);
    s.addTable(rows, { x: 0.6, y: 1.7, w: 7.3, colW: [2.35, 1.0, 1.0, 1.25, 1.7], rowH: 0.38, fontSize: 11, color: C.ink, valign: 'middle', border: { type: 'solid', pt: 0.75, color: C.line }, margin: 0.05 });
    // Year-3 net revenue by channel, from the channel drivers and unit net realisation.
    const nrU = b.unit_nr;
    let gt = 0, mt = 0, ec = 0;
    fin.deck.channels.forEach((c) => {
      const u = c.units_per_outlet_month;
      const v = c.outlets[2] * 1.1 * 12 * (u[0] * nrU.sachet + u[1] * nrU.b180 + u[2] * nrU.b340) / 1e7;
      if (/Modern/.test(c.channel)) mt += v; else if (/E-com/.test(c.channel)) ec += v; else gt += v;
    });
    const tot3 = gt + mt + ec;
    T(s, 'Year-3 net revenue by channel', { x: 0.6, y: 5.3, w: 7.3, h: 0.3, fontSize: 12, bold: true, color: C.navy });
    let x0 = 0.6;
    [[gt, C.navy, 'General trade'], [mt, C.aqua, 'MT'], [ec, C.orange, 'E-com']].forEach(([v, col], i) => {
      const w = Math.max(7.3 * v / tot3, 0.12);
      rect(s, x0, 5.65, w, 0.32, col);
      x0 += w;
    });
    T(s, `General trade Tk ${gt.toFixed(1)} Cr (${(gt / tot3 * 100).toFixed(0)}%)  ·  Modern trade Tk ${mt.toFixed(1)} Cr  ·  E-commerce Tk ${ec.toFixed(1)} Cr`, { x: 0.6, y: 6.02, w: 7.3, h: 0.3, fontSize: 11, color: C.ink });
    const cards = [
      ['BENCHMARKS (3 WAYS)', [['Existing product: ', 'Naturale Anti Hair Fall 320 ml, Tk 265'], ['Similar channel: ', 'the Naturale range in GT, MT and e-commerce'], ['Similar price point: ', 'Naturale Hijab Fresh 340 ml Tk 390; Sunsilk 340 ml Tk 350']], 1.7, 2.05],
      ['BOOSTERS', [['TLO: ', '12-sachet display strips at launch'], ['QPDS: ', 'shelf talker and QR at UCS and MT'], ['TO/CO: ', 'e-commerce bundles and brand days'], ['Incentive: ', '“Dhamaka” bonus on 340 ml drops']], 3.87, 1.75],
    ];
    cards.forEach(([h, items, y, hh]) => {
      box(s, 8.2, y, 4.53, hh, C.panel);
      T(s, [{ text: h, options: { bold: true, color: C.aquaTx, fontSize: 11, charSpacing: 1, breakLine: true } },
        ...items.flatMap(([a, c], i) => [{ text: a, options: { bold: true, fontSize: 12, color: C.navy, paraSpaceBefore: 5 } }, { text: c, options: { fontSize: 12, color: C.ink, breakLine: i < items.length - 1 } }])],
      { x: 8.4, y: y + 0.1, w: 4.15, h: hh - 0.15 });
    });
    box(s, 8.2, 5.74, 4.53, 0.6, C.orangeLt);
    T(s, [{ text: 'Margins: ', options: { bold: true, color: C.navy } }, { text: 'retailer + distributor 22% on bottles, 25% on sachets', options: { color: C.ink } }], { x: 8.4, y: 5.74, w: 4.2, h: 0.6, fontSize: 12, valign: 'middle' });
    source(s, 'Outlet universe and channel types: Marico Sales masterclass (294k outlets in the demonstration). Units per outlet are planning assumptions to be validated in the pilot. Prices: Chaldal, 9 Oct 2026.');
    s.addNotes('Volume = active outlets × units per outlet per month × months, as the Finance masterclass asks. Sachets give reach in rural grocers; the 340 ml with the strip drives value in cosmetics stores and modern trade.');
  }

  // =============== 13. SUPPLY CHAIN ===============
  {
    const s = content('Execution plan');
    tag(s, 'Execution plan  ·  Supply chain strategy');
    title(s, 'Supply chain: Make and Modify on existing Naturale lines; Buy only the strip and the chelator');
    const flow = [
      ['PLAN', C.navy, 'Demand set from pilot rate of sale; make-to-stock with 30 days’ safety stock of strips and caps'],
      ['SOURCE', C.blue, 'Local: surfactants, bottles, caps, labels. Imported: GLDA (via local agents of Nouryon or BASF) and foil-sealed strips from two suppliers'],
      ['MAKE', C.aqua, 'Mouchak: batch mixing (+45% capacity in FY26), bottle and sachet filling (two new sachet machines), strip insertion (manual in pilot, semi-automatic nationally)'],
      ['MOVE', C.green, 'Existing Naturale distributors to GT, MT and e-commerce. QC release: pH 5.0–5.5, viscosity, microbiology, strip CoA and seal check'],
    ];
    flow.forEach(([h, col, t], i) => {
      const x = 0.6 + i * 3.09;
      box(s, x, 1.7, 2.86, 1.6, C.panel);
      box(s, x + 0.15, 1.82, 1.0, 0.3, col);
      T(s, h, { x: x + 0.15, y: 1.82, w: 1.0, h: 0.3, fontSize: 11, bold: true, color: C.white, align: 'center', valign: 'middle' });
      T(s, t, { x: x + 0.15, y: 2.2, w: 2.58, h: 1.05, fontSize: 11, color: C.ink });
      if (i < 3) s.addShape(pres.shapes.RIGHT_ARROW, { x: x + 2.89, y: 2.38, w: 0.17, h: 0.24, fill: { color: 'A7B0BE' }, line: { type: 'none' } });
    });
    box(s, 0.6, 3.45, 3.8, 2.95, C.panel);
    T(s, 'MAKE · MODIFY · BUY', { x: 0.8, y: 3.55, w: 3.4, h: 0.3, fontSize: 11, bold: true, color: C.aquaTx, charSpacing: 1 });
    [['MAKE', C.navy, 'Bulk shampoo; bottle and sachet filling'], ['MODIFY', C.aqua, 'Naturale base + GLDA; 340 ml flip-top cap with a strip pocket (new mould)'], ['BUY', C.orange, 'Hardness strips with foil sleeve; GLDA chelator']].forEach(([h, col, t], i) => {
      const y = 3.95 + i * 0.8;
      box(s, 0.8, y, 0.95, 0.32, col);
      T(s, h, { x: 0.8, y, w: 0.95, h: 0.32, fontSize: 10, bold: true, color: i === 2 ? C.navy : C.white, align: 'center', valign: 'middle' });
      T(s, t, { x: 1.85, y: y - 0.05, w: 2.45, h: 0.72, fontSize: 11, color: C.ink });
    });
    box(s, 4.6, 3.45, 4.0, 2.95, C.panel);
    T(s, 'FACTORY READINESS', { x: 4.8, y: 3.55, w: 3.7, h: 0.3, fontSize: 10, bold: true, color: C.aquaTx, charSpacing: 1 });
    const fac = [['Feasibility', true, 'Shampoo variant on an existing line'], ['Affordability', true, `Blended gross margin ${pct(pl[2].gm, 0)}`], ['Capability', true, 'Make + Modify in-house'], ['Time', false, '4–6 months of stability testing'], ['Operation', true, `${pl[2].units ? (fin.base.years[2].litres_m).toFixed(2) : ''}M litres in Year 3`], ['Risk', false, 'Strip life in humidity; DGDA and BSTI'], ['Yield & scale', true, 'One platform, two variants']];
    fac.forEach(([l, ok, t], i) => {
      const y = 3.92 + i * 0.35;
      s.addShape(pres.shapes.OVAL, { x: 4.8, y: y + 0.05, w: 0.22, h: 0.22, fill: { color: ok ? C.green : C.orange }, line: { type: 'none' } });
      T(s, ok ? '✓' : '!', { x: 4.8, y: y + 0.05, w: 0.22, h: 0.22, fontSize: 10, bold: true, color: C.white, align: 'center', valign: 'middle' });
      T(s, [{ text: l + '  ', options: { bold: true, color: C.navy } }, { text: t, options: { color: C.ink } }], { x: 5.12, y, w: 3.4, h: 0.32, fontSize: 11, valign: 'middle' });
    });
    box(s, 8.8, 3.45, 3.93, 2.95, C.panel);
    const reg = ['BSTI: shampoo needs certification under BDS 1269:2022', 'DGDA: Drugs and Cosmetics Act 2023; 2026 cosmetics rules still in draft', 'EPR Guidelines 2026: plastic take-back; 1% of net revenue reserved', 'GLDA is readily biodegradable, unlike EDTA', 'Phase 2 refill pouch: 68% less plastic per wash'];
    T(s, [{ text: 'REGULATION & SUSTAINABILITY', options: { bold: true, color: C.aquaTx, fontSize: 10, charSpacing: 1, breakLine: true } },
      ...reg.map((t, i) => ({ text: t, options: { bullet: { indent: 12 }, fontSize: 11, color: C.ink, breakLine: i < reg.length - 1, paraSpaceBefore: 5 } }))],
    { x: 9.0, y: 3.55, w: 3.6, h: 2.8 });
    source(s, 'Sources: Marico Bangladesh Annual Report FY2025-26 (Mouchak capacity); BSTI mandatory-certification list; Drugs and Cosmetics Act 2023; EPR Guidelines 2026 (SRO 293); Nouryon Dissolvine guide; Supply chain and Manufacturing masterclasses.');
    s.addNotes('Only the strip and the chelator are bought in. Everything else runs on capacity Marico expanded in FY26.');
  }

  // =============== 14. REVENUE MODEL ===============
  pres.addSection({ title: 'Financial plan' });
  {
    const s = content('Financial plan');
    tag(s, 'Financial plan  ·  Revenue model');
    title(s, `Revenue built bottom-up: outlets × units × net realisation = Tk ${pl[2].nr.toFixed(0)} Cr by Year 3`);
    T(s, 'Where Tk 360 goes: one 340 ml bottle', { x: 0.6, y: 1.68, w: 6, h: 0.32, fontSize: 14, bold: true, color: C.navy });
    const base = 5.55, top = 2.45, k = (base - top) / 360;
    const bars = [
      ['MRP', 0, wf.mrp, C.navy, `Tk ${wf.mrp.toFixed(0)}`],
      ['VAT 15%', wf.mrp - wf.vat, wf.mrp, 'A7B0BE', `−${wf.vat.toFixed(0)}`],
      ['Trade 22%', wf.mrp - wf.vat - wf.trade, wf.mrp - wf.vat, 'A7B0BE', `−${wf.trade.toFixed(0)}`],
      ['SD 15%', wf.nr, wf.nr + wf.sd, 'A7B0BE', `−${wf.sd.toFixed(0)}`],
      ['Net realisation', 0, wf.nr, C.aqua, `Tk ${wf.nr.toFixed(0)}`],
      ['COGS', wf.gp, wf.nr, C.rust, `−${wf.cogs.toFixed(0)}`],
      ['Gross profit', 0, wf.gp, C.green, `Tk ${wf.gp.toFixed(0)}`],
    ];
    bars.forEach(([l, lo, hi, col, lab], i) => {
      const x = 0.75 + i * 0.83, y = base - hi * k, h = (hi - lo) * k;
      rect(s, x, y, 0.62, h, col);
      T(s, lab, { x: x - 0.15, y: y - 0.3, w: 0.92, h: 0.26, fontSize: 11, bold: true, color: C.navy, align: 'center' });
      T(s, l, { x: x - 0.12, y: base + 0.06, w: 0.86, h: 0.42, fontSize: 10, color: C.ink, align: 'center' });
    });
    s.addShape(pres.shapes.LINE, { x: 0.65, y: base, w: 5.85, h: 0, line: { color: C.line, width: 1 } });
    T(s, `Gross margin ${pct(wf.gp / wf.nr, 0)} on the 340 ml; blended ${pct(pl[2].gm, 0)} with the 180 ml (${pct((b.unit_nr.b180 - b.unit_cogs.b180) / b.unit_nr.b180, 0)}) and sachets (${pct((b.unit_nr.sachet - b.unit_cogs.sachet) / b.unit_nr.sachet, 0)}).`, { x: 0.6, y: 6.1, w: 6.0, h: 0.35, fontSize: 11, italic: true, color: C.muted });
    const yl = pl.slice(0, 3).map((p) => `Year ${p.year}: Tk ${p.nr.toFixed(1)} Cr`);
    s.addChart(pres.charts.BAR, [
      { name: 'Sachet 6 ml', labels: yl, values: pl.slice(0, 3).map((p) => +p.nr_by_sku.sachet.toFixed(2)) },
      { name: '180 ml', labels: yl, values: pl.slice(0, 3).map((p) => +p.nr_by_sku.b180.toFixed(2)) },
      { name: '340 ml + PaniCheck', labels: yl, values: pl.slice(0, 3).map((p) => +p.nr_by_sku.b340.toFixed(2)) },
    ], {
      x: 6.9, y: 1.65, w: 5.83, h: 3.95, barDir: 'col', barGrouping: 'stacked', barGapWidthPct: 55,
      chartColors: [C.aqua, C.blue, C.navy], showValue: true, dataLabelPosition: 'ctr', dataLabelFontSize: 10, dataLabelColor: C.white, dataLabelFormatCode: '0.0', dataLabelFontFace: 'Calibri',
      catAxisLabelFontSize: 11, catAxisLabelColor: C.ink, catAxisLabelFontFace: 'Calibri', valAxisHidden: true, valGridLine: { style: 'none' },
      showLegend: true, legendPos: 'b', legendFontSize: 11, legendFontFace: 'Calibri', legendColor: C.ink,
      showTitle: true, title: 'Net revenue by pack (Tk Cr)', titleFontSize: 12, titleColor: C.navy, titleFontFace: 'Calibri',
    });
    const u = (k2) => pl.slice(0, 3).map((p) => (p.units[k2] / 1e6).toFixed(2)).join(' → ');
    box(s, 6.9, 5.7, 5.83, 0.78, C.panel);
    T(s, `Units (million): sachets ${pl.slice(0, 3).map((p) => (p.units.sachet / 1e6).toFixed(1)).join(' → ')} · 180 ml ${u('b180')} · 340 ml ${u('b340')}. Year 1 has nine selling months after the pilot and pipeline fill.`, { x: 7.05, y: 5.7, w: 5.55, h: 0.78, fontSize: 11, color: C.ink, valign: 'middle' });
    source(s, 'Team model v4. Gross-to-net as taught in the Finance masterclass: MRP − VAT − trade margin − SD = net realisation. VAT and SD at 15% on shampoo (VAT & SD Act 2012); invoice treatment to be confirmed with Marico Tax.');
    s.addNotes('Every taka of revenue is net realisation, not MRP: the denominator judges check.');
  }

  // =============== 15. P&L ===============
  {
    const s = content('Financial plan');
    tag(s, 'Financial plan  ·  Profit & loss road map');
    title(s, `P&L: EBITDA-positive in Year 2 and NPV ${sgn(npv)} at a 15% hurdle`);
    const y3 = pl.slice(0, 3);
    const L = (label, f, o = {}) => [{ text: label, options: { bold: !!o.bold, fill: o.fill ? { color: o.fill } : undefined, color: o.color || C.ink, indentLevel: o.indent ? 1 : 0 } },
      ...y3.map((p) => ({ text: f(p), options: { align: 'right', bold: !!o.bold, fill: o.fill ? { color: o.fill } : undefined, color: o.color || C.ink } }))];
    const neg = (v) => cr1(-v);
    const rows = [
      [{ text: 'Tk crore', options: { bold: true, color: C.white, fill: { color: C.navy } } }, ...['Year 1', 'Year 2', 'Year 3'].map((t) => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.navy }, align: 'right' } }))],
      L('Gross sales (MRP)', (p) => cr1(p.gross), { color: C.muted }),
      L('Net revenue', (p) => cr1(p.nr), { bold: true, fill: C.aquaLt }),
      L('Gross profit', (p) => cr1(p.gp), { bold: true }),
      L('   Gross margin', (p) => pct(p.gm), { color: C.muted }),
      L('Advertising and promotion', (p) => neg(p.ap)),
      L('Selling and distribution', (p) => neg(p.sd)),
      L('EPR (plastic)', (p) => neg(p.epr)),
      L('EBITDA, standalone', (p) => cr1(p.ebitda_sa)),
      L('Naturale cannibalisation', (p) => neg(p.cann)),
      L('Incremental EBITDA', (p) => cr1(p.ebitda), { bold: true, fill: C.aquaLt }),
      L('   EBITDA margin', (p) => pct(p.ebitda_margin), { color: C.muted }),
      L('Depreciation', (p) => neg(p.da)),
      L('WPPF and tax', (p) => neg(p.wppf + p.tax)),
      L('Net profit', (p) => cr1(p.net_profit), { bold: true }),
      L('Free cash flow', (p) => cr1(p.fcf), { color: C.muted }),
    ];
    s.addTable(rows, { x: 0.6, y: 1.65, w: 6.9, colW: [3.3, 1.2, 1.2, 1.2], rowH: 0.28, fontSize: 11, color: C.ink, valign: 'middle', border: { type: 'solid', pt: 0.5, color: C.line }, margin: [0.02, 0.08, 0.02, 0.08] });
    const tiles = [
      ['NPV @ 15%', sgn(npv), `${sgn(npvNo)} without working-capital recovery`],
      ['IRR', pct(b.irr_with_release), `${pct(b.irr_without_release)} without recovery; hurdle 15%`],
      ['Peak funding', `Tk ${b.peak_funding_cr.toFixed(1)} Cr`, `Month ${b.peak_month}, end of the launch year`],
      ['Payback', `${b.payback_years_from_M0.toFixed(1)} years`, `From project start; ${(b.payback_years_from_M0 - 15 / 12).toFixed(1)} years after first sale`],
    ];
    tiles.forEach(([h, v, sub], i) => {
      const x = 7.8 + (i % 2) * 2.57, y = 1.65 + Math.floor(i / 2) * 1.37;
      box(s, x, y, 2.36, 1.25, i === 0 ? C.navy : C.panel);
      const dark = i === 0;
      T(s, h, { x: x + 0.15, y: y + 0.1, w: 2.1, h: 0.25, fontSize: 11, bold: true, color: dark ? C.orange : C.aquaTx, charSpacing: 1 });
      T(s, v, { x: x + 0.15, y: y + 0.35, w: 2.1, h: 0.5, fontSize: 24, bold: true, color: dark ? C.white : C.navy });
      T(s, sub, { x: x + 0.15, y: y + 0.84, w: 2.1, h: 0.38, fontSize: 10, color: dark ? C.paleTx : C.muted });
    });
    const sr = [
      [{ text: 'Scenario (Finance masterclass grid)', options: { bold: true, color: C.white, fill: { color: C.navy } } }, { text: 'NPV', options: { bold: true, color: C.white, fill: { color: C.navy }, align: 'right' } }],
      ['Worst: volume −20%, price −5%, COGS +8%, 3-month delay', { text: sgn(sc.worst.npv_with_release_cr), options: { align: 'right', bold: true, color: C.rust } }],
      [{ text: 'Base plan', options: { bold: true } }, { text: sgn(sc.base.npv_with_release_cr), options: { align: 'right', bold: true, color: C.navy } }],
      ['Best: volume +15%, price +2%, COGS −3%', { text: sgn(sc.best.npv_with_release_cr), options: { align: 'right', bold: true, color: C.green } }],
    ];
    s.addTable(sr, { x: 7.8, y: 4.45, w: 4.93, colW: [3.83, 1.1], rowH: 0.34, fontSize: 11, color: C.ink, valign: 'middle', border: { type: 'solid', pt: 0.5, color: C.line }, margin: [0.02, 0.08, 0.02, 0.08] });
    T(s, 'The downside is why we pilot first: only Tk 3.5 Cr is at risk before the go/no-go.', { x: 7.8, y: 5.92, w: 4.93, h: 0.5, fontSize: 12, bold: true, color: C.navy });
    source(s, 'Five commercial years after a 12-month R&D and pilot phase; no terminal value; working capital 12% of net revenue. Cannibalisation: 20% of WaterSmart revenue taken from Naturale at 45% contribution. Tax 20%, WPPF 5%. Inputs are planning assumptions (Appendix A).');
    s.addNotes('Incremental EBITDA is after cannibalisation, so the P&L shows what Marico actually gains.');
  }

  // =============== 16. DECISION (dark) ===============
  pres.addSection({ title: 'Decision' });
  {
    const s = pres.addSlide({ masterName: 'DARK', sectionTitle: 'Decision' });
    tag(s, 'The decision', true);
    title(s, 'Approve a 6-month pilot, and scale nationally only on proof');
    const tl = [['M1–6', 'R&D and qualification', 'Formula, stability, strip shelf-life, BSTI and DGDA'], ['M7–12', 'Pilot in two cells', '~1,500 outlets: a Dhaka hall/mess catchment and one hard-water town'], ['M13–16', 'National launch', 'Pipeline fill; first sales in month 16'], ['Year 2', 'LonaJol gate', 'Coastal saline variant only after its own tests']];
    tl.forEach(([m, h, t], i) => {
      const x = 0.6 + i * 3.08;
      box(s, x, 1.7, 2.9, 1.15, C.navy2);
      T(s, [{ text: m + '  ', options: { bold: true, color: C.orange, fontSize: 12 } }, { text: h, options: { bold: true, color: C.white, fontSize: 13, breakLine: true } }, { text: t, options: { color: C.paleTx, fontSize: 11 } }], { x: x + 0.15, y: 1.78, w: 2.6, h: 1.0 });
      if (i < 3) s.addShape(pres.shapes.RIGHT_ARROW, { x: x + 2.92, y: 2.15, w: 0.14, h: 0.24, fill: { color: C.orange }, line: { type: 'none' } });
    });
    T(s, 'GO / NO-GO GATES AT MONTH 12', { x: 0.6, y: 3.0, w: 6, h: 0.28, fontSize: 11, bold: true, color: C.orange, charSpacing: 2 });
    ['Rate of sale at least 70% of plan', 'Paid repeat at least 25% in mature cohorts', 'Blended gross margin at least 45%', 'Strip complaints under 2%; all safety and regulatory gates passed'].forEach((g, i) => {
      const x = 0.6 + i * 3.08;
      box(s, x, 3.32, 2.9, 0.78, C.orange);
      T(s, g, { x: x + 0.15, y: 3.32, w: 2.6, h: 0.78, fontSize: 12, bold: true, color: C.navy, valign: 'middle' });
    });
    const npvDropCogs = npvNo - sens['COGS +8%'];
    const risks = [
      ['Claims not proven', 'R&D tress and lather tests before any claim; never “stops hair fall”'],
      ['Strip life in humid storage', 'Foil-sealed strips, supplier stability data, two suppliers'],
      ['Cannibalising Naturale', 'Priced above core Naturale; target users of other brands; measured in the pilot'],
      [`Cost inflation (COGS +8% cuts NPV by Tk ${npvDropCogs.toFixed(1)} Cr)`, 'Dual sourcing; pack and sachet-film optimisation'],
      ['Regulation: draft cosmetics rules, EPR, sachets', 'Marico Regulatory sign-off; recyclable mono-material sachet plan'],
    ];
    const rr = [[{ text: 'Top risks', options: { bold: true, color: C.orange } }, { text: 'Mitigation', options: { bold: true, color: C.orange } }],
      ...risks.map(([r, m]) => [{ text: r, options: { bold: true, color: C.white } }, { text: m, options: { color: C.paleTx } }])];
    s.addTable(rr, { x: 0.6, y: 4.28, w: 8.2, colW: [3.3, 4.9], rowH: 0.33, fontSize: 11, valign: 'middle', fill: { color: C.navy2 }, border: { type: 'solid', pt: 0.75, color: C.navy }, margin: [0.02, 0.08, 0.02, 0.08] });
    box(s, 9.05, 4.28, 3.68, 2.0, C.white);
    T(s, [
      { text: 'THE ASK', options: { bold: true, fontSize: 11, color: C.aquaTx, charSpacing: 2, breakLine: true } },
      { text: `Tk ${fin.deck.prelaunch.cash_before_scale_decision_cr.toFixed(1)} Cr`, options: { bold: true, fontSize: 36, color: C.navy, breakLine: true } },
      { text: `committed before the go/no-go: CAPEX Tk ${fin.deck.prelaunch.capex_cr.toFixed(1)} Cr + R&D and pilot Tk ${fin.deck.prelaunch.pilot_cr.toFixed(1)} Cr`, options: { fontSize: 12, color: C.ink } },
    ], { x: 9.25, y: 4.38, w: 3.3, h: 1.8 });
    T(s, 'দোষ কি চুলের, নাকি পানির?  আগে পানি চেক করুন।', { x: 0.6, y: 6.38, w: 12.1, h: 0.5, fontSize: 20, color: C.white, fontFace: BN, align: 'center', valign: 'middle' });
    s.addNotes('Close with the decision and the tagline. The pilot caps the downside at the pre-launch spend.');
  }

  // =============== 17. APPENDIX A ===============
  pres.addSection({ title: 'Appendix' });
  {
    const s = content('Appendix');
    tag(s, 'Appendix A');
    title(s, 'Assumption register: every driver, its basis and who confirms it');
    const reg = [
      ['MRP 340 ml + PaniCheck', 'Tk 360', 'Naturale Hijab Fresh 340 ml Tk 390; Sunsilk 340 ml Tk 350 (Chaldal, 9 Oct 2026)', 'Brand'],
      ['MRP 180 ml / 6 ml sachet', 'Tk 180 / Tk 3', 'Naturale 160–175 ml Tk 140–150; Naturale sachet Tk 2 per 5.25 ml', 'Brand'],
      ['Trade margin', '22% bottles, 25% sachets', 'Retailer + distributor; planning assumption', 'Sales'],
      ['VAT / SD', '15% / 15%', 'VAT & SD Act 2012, shampoo; invoice treatment to confirm', 'Tax'],
      ['COGS per unit', 'Tk 95 / 55 / 1.20', 'Bulk Tk 135/kg plus pack and conversion; strip Tk 3 target (unquoted)', 'Procurement'],
      ['Active outlets', '37k / 72k / 104k', 'Channel plan; Sales masterclass universe of 294k outlets', 'Sales'],
      ['Units per outlet per month', 'See Sales slide', 'Planning assumption; validated by pilot rate of sale', 'Sales'],
      ['A&P', 'Y1 Tk 4.5 Cr; then 15%, 12%, 10%, 10% of NR', 'Marico FY26 marketing, selling and distribution = 5.2% of revenue', 'Marketing'],
      ['Selling and distribution', '8% of NR + Tk 1 Cr a year', 'Incremental SKU on existing Naturale routes', 'Sales / Finance'],
      ['Cannibalisation', '20% × 45% contribution', 'Planning assumption; measured in the pilot', 'Finance / Insights'],
      ['EPR', '1% of NR', 'EPR Guidelines 2026 (SRO 293); reserve, not a compliance quote', 'ESG'],
      ['Working capital', '12% of annualised NR', 'Marico FY26 core working capital = 11.5% of revenue', 'Finance'],
      ['CAPEX / pre-launch', 'Tk 3.0 Cr / Tk 0.5 Cr', 'Cap mould, strip insertion, line changeover; R&D and pilot', 'Manufacturing'],
      ['Tax / WPPF / hurdle', '20% / 5% / 15%', 'Marico FY26 disclosures; hurdle assumed', 'Finance'],
      ['Horizon', '12 + 60 months', 'Pre-launch plus five commercial years; no terminal value', 'Finance'],
    ];
    const hd = (t) => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.navy } } });
    s.addTable([[hd('Driver'), hd('Value'), hd('Basis / source'), hd('Confirms')], ...reg.map((r, i) => r.map((c, j) => ({ text: c, options: { bold: j === 0, fill: { color: i % 2 ? C.white : C.panel } } })))],
      { x: 0.6, y: 1.6, w: 12.13, colW: [2.45, 2.6, 5.48, 1.6], rowH: 0.29, fontSize: 10, color: C.ink, valign: 'middle', border: { type: 'solid', pt: 0.5, color: C.line }, margin: [0.02, 0.06, 0.02, 0.06] });
    source(s, `Model: Round2_Submission/finance/finance_v4.cjs. It reuses the team’s v3 monthly model unchanged, adds the SD/tax/WPPF correction (reproducing the corrected −3.82/−6.32 Cr), then applies the v4 proposal decisions above.`);
  }

  // =============== 18. APPENDIX B ===============
  {
    const s = content('Appendix');
    tag(s, 'Appendix B');
    title(s, 'Evidence base, method and sensitivity');
    const ev = [
      ['Water', 'BGS & DPHE (2001) National Hydrochemical Survey: 3,534 wells, 61 districts, sampled Mar 1998–Dec 1999. Team analysis: hardness = 2.497 Ca + 4.118 Mg (USGS); flags Fe >0.3 and hardness >120 mg/L. Historical wells, not today’s taps, which is why the pack carries a test.'],
      ['Recent water', 'ICCEI 2025 Dhaka tap study (12 locations with values); BWDB 2022 groundwater-quality report (901 monitoring wells, 2019–21).'],
      ['Consumers', NOFIELD ? 'Khanam & Rahman 2022 (n=390); Zakaria et al. 2025 (n=391). Our own survey and foam test run before the pilot.' : 'Khanam & Rahman 2022 (n=390); Zakaria et al. 2025 (n=391); our Google Form survey (n=[ ]) and foam test.'],
      ['Hair science', 'Luqman 2018 (n=70: tensile strength 255 vs 234 with hard water); Srinivasan 2013 (n=15: no significant difference). Evidence is mixed, so claims wait for our own R&D tests.'],
      ['Market and prices', 'Mordor Intelligence (2026e); 24 online price observations, Chaldal and Arogga, 9 Oct 2026; Marico Bangladesh Annual Report FY2025-26.'],
    ];
    T(s, ev.flatMap(([h, t], i) => [{ text: h + ': ', options: { bold: true, color: C.navy } }, { text: t, options: { color: C.ink, breakLine: i < ev.length - 1, paraSpaceAfter: 7 } }]), { x: 0.6, y: 1.65, w: 6.3, h: 3.6, fontSize: 11 });
    box(s, 0.6, 4.75, 6.3, 1.1, C.aquaLt);
    T(s, [{ text: 'R&D TEST PLAN   ', options: { bold: true, color: C.aquaTx, charSpacing: 1 } }, { text: 'Hair-tress deposit test: at least 30% less Ca/Fe than Naturale core. Lather at least 80% of a soft-water reference at 150 and 300 mg/L. Home-use test n≈100. Stability at 40°C / 75% RH.', options: { color: C.ink } }], { x: 0.8, y: 4.75, w: 5.95, h: 1.1, fontSize: 11, valign: 'middle' });
    const keys = ['Cannibalisation 30%', 'COGS +8%', 'Price −5%', 'Volume −20%', 'Launch delay 3 months', 'Strip Tk 6 (vs Tk 3)', 'Volume +15%'];
    const src = ['cannibalisation 30%', 'COGS +8%', 'price -5%', 'volume -20%', 'launch delay 3m', 'strip Tk 6 (vs 3)', 'volume +15%'];
    const vals = src.map((k2) => +sens[k2].toFixed(2));
    s.addChart(pres.charts.BAR, [{ name: 'NPV, Tk Cr', labels: keys, values: vals }], {
      x: 7.1, y: 1.6, w: 5.65, h: 4.2, barDir: 'bar', catAxisOrientation: 'maxMin', barGapWidthPct: 45,
      chartColors: vals.map((v) => (v < npvNo ? C.rust : C.green)), invertedColors: vals.map((v) => (v < npvNo ? C.rust : C.green)),
      showValue: true, dataLabelPosition: 'outEnd', dataLabelFontSize: 11, dataLabelColor: C.ink, dataLabelFormatCode: '0.0', dataLabelFontFace: 'Calibri',
      catAxisLabelFontSize: 11, catAxisLabelColor: C.ink, catAxisLabelFontFace: 'Calibri', catAxisLabelPos: 'low',
      valAxisHidden: true, valGridLine: { style: 'none' }, showLegend: false,
      showTitle: true, title: `NPV without working-capital recovery (base ${sgn(npvNo)}), one change at a time`, titleFontSize: 12, titleColor: C.navy, titleFontFace: 'Calibri',
    });
    T(s, 'Biggest levers: cannibalisation and COGS. Both are measured in the pilot before any national spend.', { x: 7.2, y: 5.9, w: 5.5, h: 0.5, fontSize: 12, bold: true, color: C.navy });
    source(s, 'Hair-science references: Luqman et al. 2018 (PMID 30034190); Srinivasan et al. 2013 (PMID 24574692). Sensitivities from finance_v4.cjs.');
  }

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log('wrote', OUT);
})().catch((e) => { console.error(e); process.exit(1); });
