// Fonts for OG images (Satori needs raw TTF/OTF data). Fetched once per build from Google Fonts.
// If the fetch fails, ImageResponse falls back to its built-in font, so the build never breaks.

type OgFont = { name: string; data: ArrayBuffer; weight: 400 | 600; style: "normal" };

async function loadGoogleFont(family: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`)).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    const res = await fetch(src);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

let cached: Promise<OgFont[]> | undefined;

export function loadOgFonts(): Promise<OgFont[]> {
  cached ??= Promise.all([loadGoogleFont("Geist", 400), loadGoogleFont("Geist", 600)]).then(([regular, semibold]) => {
    const fonts: OgFont[] = [];
    if (regular) fonts.push({ name: "Geist", data: regular, weight: 400, style: "normal" });
    if (semibold) fonts.push({ name: "Geist", data: semibold, weight: 600, style: "normal" });
    return fonts;
  });
  return cached;
}
