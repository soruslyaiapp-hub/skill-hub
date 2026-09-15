// Server-side views over the content. Pages call these at build time.
import type { Skill } from "./content/parse";
import { getAllSkills } from "./content/skills";
import { toSummary, type SkillSummary } from "./summary";
import { CATEGORY_KEYS, type CategoryKey } from "./taxonomy";

export function getSummaries(now: Date = new Date()): SkillSummary[] {
  return getAllSkills().map((skill) => toSummary(skill, now));
}

export function countByCategory(skills: SkillSummary[]): Record<CategoryKey, number> {
  const counts = Object.fromEntries(CATEGORY_KEYS.map((key) => [key, 0])) as Record<CategoryKey, number>;
  for (const skill of skills) counts[skill.category] += 1;
  return counts;
}

export function getTagCounts(skills: SkillSummary[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const skill of skills) for (const tag of skill.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...counts]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

/** Skills that share the category, tags or platforms, best match first. */
export function getRelated(skill: Skill, limit = 3, now: Date = new Date()): SkillSummary[] {
  return getAllSkills()
    .filter((other) => other.slug !== skill.slug)
    .map((other) => ({
      other,
      score:
        (other.category === skill.category ? 3 : 0) +
        other.tags.filter((t) => skill.tags.includes(t)).length +
        other.platforms.filter((p) => skill.platforms.includes(p)).length * 0.25,
    }))
    .filter((entry) => entry.score >= 1)
    .sort((a, b) => b.score - a.score || (b.other.metrics.githubStars ?? 0) - (a.other.metrics.githubStars ?? 0))
    .slice(0, limit)
    .map((entry) => toSummary(entry.other, now));
}
