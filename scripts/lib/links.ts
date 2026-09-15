import type { Skill } from "../../src/lib/content/parse";

export type SkillLink = { slug: string; field: string; url: string };

// LinkedIn answers bots with HTTP 999, so its links cannot be checked automatically.
const SKIP_HOSTS = new Set(["linkedin.com", "www.linkedin.com"]);

/** Every external URL in the skill files, minus hosts that block automated checks. */
export function collectLinks(skills: Skill[]): SkillLink[] {
  const links: SkillLink[] = [];
  for (const skill of skills) {
    const candidates: [string, string | undefined][] = [
      ["links.source", skill.links.source],
      ["links.docs", skill.links.docs],
      ["author.url", skill.author.url],
      ["media.video", skill.media.video],
      ["media.cover", skill.media.cover],
      ["origin.linkedinUrl", skill.origin.linkedinUrl],
      ...skill.media.screenshots.map((url, i): [string, string] => [`media.screenshots.${i}`, url]),
    ];
    for (const [field, url] of candidates) {
      if (!url || !url.startsWith("https://")) continue;
      if (SKIP_HOSTS.has(new URL(url).hostname)) continue;
      links.push({ slug: skill.slug, field, url });
    }
  }
  return links;
}
