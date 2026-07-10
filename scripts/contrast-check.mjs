// Contrast ratio checker for OKLCH colors
// Uses the WCAG 2.1 relative luminance formula

function oklchToLinear(c, l, h) {
  // Convert OKLCH to sRGB then to linear RGB
  const hueRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hueRad);
  const b = c * Math.sin(hueRad);

  // OKLCH to OKLab
  const L = l;
  const lg = L + 0.3963377774 * a + 0.2158037573 * b;
  const lb = L - 0.1055613458 * a - 0.0638541728 * b;
  const lc = L - 0.0894841775 * a - 1.2914855480 * b;

  const lg3 = lg * lg * lg;
  const lb3 = lb * lb * lb;
  const lc3 = lc * lc * lc;

  let r = 4.0767416621 * lg3 - 3.3077115913 * lb3 + 0.2309699292 * lc3;
  let g = -1.2684380046 * lg3 + 2.6097574011 * lb3 - 0.3413193965 * lc3;
  let b2 = -0.0041960863 * lg3 - 0.7034186147 * lb3 + 1.7076147010 * lc3;

  // Linear to sRGB
  r = r > 0.0031308 ? 1.055 * Math.pow(r, 1 / 2.4) - 0.055 : 12.92 * r;
  g = g > 0.0031308 ? 1.055 * Math.pow(g, 1 / 2.4) - 0.055 : 12.92 * g;
  b2 = b2 > 0.0031308 ? 1.055 * Math.pow(b2, 1 / 2.4) - 0.055 : 12.92 * b2;

  return [Math.max(0, Math.min(1, r)), Math.max(0, Math.min(1, g)), Math.max(0, Math.min(1, b2))];
}

function relativeLuminance(rgb) {
  const [r, g, b] = rgb.map((c) => {
    c = Math.max(0, Math.min(1, c));
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(l1, l2) {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function parseOklch(str) {
  const match = str.match(/oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*[\d.]+)?\)/);
  if (!match) return null;
  const l = parseFloat(match[1]) / 100;
  const c = parseFloat(match[2]);
  const h = parseFloat(match[3]);
  return { l, c, h };
}

// Design system colors
const colors = {
  // Text
  "text-primary": "oklch(97% 0.006 260)",
  "text-secondary": "oklch(78% 0.016 258)",
  "text-tertiary": "oklch(62% 0.018 258)",
  "text-disabled": "oklch(42% 0.016 258)",

  // Backgrounds
  "bg-void": "oklch(13% 0.02 264)",
  "bg-base": "oklch(16% 0.024 264)",
  "bg-surface": "oklch(20% 0.026 262)",
  "bg-surface-2": "oklch(24% 0.028 261)",
  "bg-surface-3": "oklch(29% 0.03 260)",

  // Accent
  "orange-300": "oklch(83% 0.12 44)",
  "orange-400": "oklch(75% 0.165 43)",
  "teal-300": "oklch(85% 0.075 196)",
  "teal-400": "oklch(76% 0.1 195)",

  // Semantic
  "success": "oklch(72% 0.17 148)",
  "error": "oklch(63% 0.213 26)",
  "warning": "oklch(80% 0.15 75)",
};

console.log("=== Color Contrast Ratios ===\n");

// Text on backgrounds
const textColors = ["text-primary", "text-secondary", "text-tertiary", "text-disabled"];
const bgColors = ["bg-void", "bg-base", "bg-surface", "bg-surface-2", "bg-surface-3"];

for (const textColor of textColors) {
  const textParsed = parseOklch(colors[textColor]);
  const textRgb = oklchToLinear(textParsed.c, textParsed.l, textParsed.h);
  const textLum = relativeLuminance(textRgb);

  console.log(`${textColor} (${colors[textColor]}):`);
  for (const bgColor of bgColors) {
    const bgParsed = parseOklch(colors[bgColor]);
    const bgRgb = oklchToLinear(bgParsed.c, bgParsed.l, bgParsed.h);
    const bgLum = relativeLuminance(bgRgb);
    const ratio = contrastRatio(textLum, bgLum);
    const pass = ratio >= 4.5 ? "✓" : ratio >= 3 ? "△" : "✗";
    console.log(`  on ${bgColor}: ${ratio.toFixed(2)}:1 ${pass}`);
  }
  console.log();
}

// Accent on backgrounds
const accentColors = ["orange-300", "orange-400", "teal-300", "teal-400", "success", "error"];
console.log("=== Accent Colors on bg-surface ===\n");
for (const accentColor of accentColors) {
  const accentParsed = parseOklch(colors[accentColor]);
  const accentRgb = oklchToLinear(accentParsed.c, accentParsed.l, accentParsed.h);
  const accentLum = relativeLuminance(accentRgb);

  const bgParsed = parseOklch(colors["bg-surface"]);
  const bgRgb = oklchToLinear(bgParsed.c, bgParsed.l, bgParsed.h);
  const bgLum = relativeLuminance(bgRgb);
  const ratio = contrastRatio(accentLum, bgLum);
  const pass = ratio >= 4.5 ? "✓" : ratio >= 3 ? "△" : "✗";
  console.log(`${accentColor} (${colors[accentColor]}): ${ratio.toFixed(2)}:1 ${pass}`);
}
