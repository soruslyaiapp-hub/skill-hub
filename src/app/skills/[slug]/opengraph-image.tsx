import { ImageResponse } from "next/og";
import { BRAND_MARK_DATA_URI } from "@/lib/brand";
import { oklchToHex } from "@/lib/color";
import { getAllSkills, getSkill } from "@/lib/content/skills";
import { PLATFORMS, SKILL_TYPES } from "@/lib/facets";
import { formatCompact } from "@/lib/format";
import { loadOgFonts } from "@/lib/og-fonts";
import { site } from "@/lib/site";
import { CATEGORIES } from "@/lib/taxonomy";

export const alt = `Skill card on ${site.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSkills().map((skill) => ({ slug: skill.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const skill = getSkill((await params).slug);
  const fonts = await loadOgFonts();
  if (!skill) return new ImageResponse(<div style={{ display: "flex" }}>{site.name}</div>, { ...size, fonts });

  const category = CATEGORIES[skill.category];
  const accent = oklchToHex(0.8, 0.12, category.hue);
  const stars = skill.metrics.githubStars;
  const meta = [SKILL_TYPES[skill.type].name, skill.platforms.slice(0, 3).map((p) => PLATFORMS[p].name).join(", ")];
  if (typeof stars === "number") meta.push(`${formatCompact(stars)} GitHub stars`);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0c",
          backgroundImage: `radial-gradient(circle at 92% 0%, ${oklchToHex(0.38, 0.1, category.hue)} 0%, transparent 58%)`,
          color: "#fafafa",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 600 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- OG images render with Satori, not the DOM */}
            <img src={BRAND_MARK_DATA_URI} width={48} height={48} alt="" />
            {site.name}
          </div>
          <div style={{ display: "flex", padding: "10px 24px", borderRadius: 999, border: `2px solid ${accent}`, color: accent, fontSize: 24 }}>
            {category.name}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: skill.name.length > 26 ? 64 : 80, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2 }}>{skill.name}</div>
          <div style={{ fontSize: 32, lineHeight: 1.35, color: "#a1a1aa", maxWidth: 1000 }}>{skill.tagline}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", fontSize: 26, color: "#d4d4d8" }}>
          <div style={{ display: "flex" }}>{meta.join("   ·   ")}</div>
          <div style={{ display: "flex", marginLeft: "auto", color: accent }}>{`by ${skill.author.name}`}</div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
