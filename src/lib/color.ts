// OKLCH -> sRGB hex. Needed where CSS oklch() is not available (OG images render with Satori).

function toSrgbByte(linear: number): string {
  const v = Math.min(1, Math.max(0, linear));
  const srgb = v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055;
  return Math.round(srgb * 255).toString(16).padStart(2, "0");
}

export function oklchToHex(l: number, c: number, hueDeg: number): string {
  const h = (hueDeg * Math.PI) / 180;
  const a = c * Math.cos(h);
  const b = c * Math.sin(h);
  const l1 = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m1 = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s1 = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const r = 4.0767416621 * l1 - 3.3077115913 * m1 + 0.2309699292 * s1;
  const g = -1.2684380046 * l1 + 2.6097574011 * m1 - 0.3413193965 * s1;
  const bl = -0.0041960863 * l1 - 0.7034186147 * m1 + 1.707614701 * s1;
  return `#${toSrgbByte(r)}${toSrgbByte(g)}${toSrgbByte(bl)}`;
}
