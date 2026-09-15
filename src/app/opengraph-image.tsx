import { ImageResponse } from "next/og";
import { BRAND_MARK_DATA_URI } from "@/lib/brand";
import { getSummaries } from "@/lib/catalog";
import { oklchToHex } from "@/lib/color";
import { loadOgFonts } from "@/lib/og-fonts";
import { site } from "@/lib/site";
import { categoryList } from "@/lib/taxonomy";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const count = getSummaries().length;
  const fonts = await loadOgFonts();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0b0b0c",
          backgroundImage: `radial-gradient(circle at 90% 0%, ${oklchToHex(0.34, 0.09, 295)} 0%, transparent 60%)`,
          color: "#fafafa",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 36, fontWeight: 600 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- OG images render with Satori, not the DOM */}
          <img src={BRAND_MARK_DATA_URI} width={56} height={56} alt="" />
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 76, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2 }}>Find the right AI skill for the job.</div>
          <div style={{ fontSize: 34, color: "#a1a1aa" }}>Skills, agents, MCP servers and tools, sorted by what they do.</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {categoryList.map((c) => (
            <div key={c.key} style={{ width: 22, height: 22, borderRadius: 999, background: oklchToHex(0.7, 0.15, c.hue) }} />
          ))}
          <div style={{ marginLeft: 16, fontSize: 28, color: "#d4d4d8" }}>{`${count} skills · ${categoryList.length} categories`}</div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
