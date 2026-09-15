import type { Skill } from "../../src/lib/content/parse";
import { CATEGORIES, CATEGORY_KEYS } from "../../src/lib/taxonomy";

/** Markdown for the weekly email: skill of the week, then new skills grouped by category. */
export function buildDigest(skills: Skill[], opts: { since: string; siteUrl: string; spotlight: Skill | null }): string {
  const fresh = skills.filter((s) => s.addedAt >= opts.since);
  const link = (s: Skill) => `${opts.siteUrl}/skills/${s.slug}`;
  const out = [`# ${fresh.length ? `${fresh.length} new AI skill${fresh.length === 1 ? "" : "s"} this week` : "This week in AI skills"}`, ""];
  if (opts.spotlight) {
    out.push("## Skill of the week", "", `**[${opts.spotlight.name}](${link(opts.spotlight)})**: ${opts.spotlight.tagline}`, "");
  }
  for (const key of CATEGORY_KEYS) {
    const group = fresh.filter((s) => s.category === key);
    if (group.length === 0) continue;
    out.push(`## ${CATEGORIES[key].name}`, "", ...group.map((s) => `- **[${s.name}](${link(s)})**: ${s.tagline}`), "");
  }
  if (fresh.length === 0) out.push("No new skills this week.", "");
  out.push(`Browse every skill: ${opts.siteUrl}/skills`, "");
  return out.join("\n");
}
