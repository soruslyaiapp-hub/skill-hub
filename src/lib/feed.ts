// Public feeds: /api/skills.json and /rss.xml.
import type { Skill } from "./content/parse";
import { PLATFORMS, SKILL_TYPES } from "./facets";
import { absoluteUrl, site } from "./site";
import { CATEGORIES } from "./taxonomy";

export function toFeedSkill(skill: Skill) {
  return {
    slug: skill.slug,
    name: skill.name,
    tagline: skill.tagline,
    url: absoluteUrl(`/skills/${skill.slug}`),
    category: skill.category,
    categoryName: CATEGORIES[skill.category].name,
    type: skill.type,
    typeName: SKILL_TYPES[skill.type].name,
    tags: skill.tags,
    platforms: skill.platforms,
    platformNames: skill.platforms.map((p) => PLATFORMS[p].name),
    difficulty: skill.difficulty,
    price: skill.price,
    status: skill.status,
    author: skill.author,
    source: skill.links.source,
    docs: skill.links.docs ?? null,
    install: skill.links.install ?? null,
    video: skill.media.video ?? null,
    language: skill.language ?? null,
    githubStars: skill.metrics.githubStars ?? null,
    lastCommit: skill.metrics.lastCommit ?? null,
    license: skill.metrics.license ?? null,
    addedAt: skill.addedAt,
    updatedAt: skill.updatedAt,
  };
}

export function skillsJson(skills: Skill[], generatedAt: string) {
  return { name: site.name, url: absoluteUrl("/"), generatedAt, count: skills.length, skills: skills.map(toFeedSkill) };
}

const XML_ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" };

export function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => XML_ESCAPES[char]);
}

/** RSS 2.0 feed of the newest skills (input must be sorted newest first). */
export function rssXml(skills: Skill[], buildDate: Date, limit = 50): string {
  const items = skills.slice(0, limit).map((skill) => {
    const url = escapeXml(absoluteUrl(`/skills/${skill.slug}`));
    return [
      "    <item>",
      `      <title>${escapeXml(skill.name)}</title>`,
      `      <link>${url}</link>`,
      `      <guid isPermaLink="true">${url}</guid>`,
      `      <pubDate>${new Date(`${skill.addedAt}T00:00:00Z`).toUTCString()}</pubDate>`,
      `      <category>${escapeXml(CATEGORIES[skill.category].name)}</category>`,
      `      <description>${escapeXml(skill.tagline)}</description>`,
      "    </item>",
    ].join("\n");
  });
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(site.name)}</title>`,
    `    <link>${escapeXml(absoluteUrl("/"))}</link>`,
    `    <description>${escapeXml(site.description)}</description>`,
    "    <language>en</language>",
    `    <lastBuildDate>${buildDate.toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${escapeXml(absoluteUrl("/rss.xml"))}" rel="self" type="application/rss+xml" />`,
    ...items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}
