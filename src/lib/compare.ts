import type { Skill } from "./content/parse";
import { DIFFICULTIES, PLATFORMS, PRICES, SKILL_TYPES, STATUSES } from "./facets";
import { formatDate } from "./format";
import { CATEGORIES } from "./taxonomy";

export const COMPARE_ROWS = [
  ["category", "Category"],
  ["type", "Type"],
  ["platforms", "Works with"],
  ["difficulty", "Difficulty"],
  ["price", "Price"],
  ["status", "Status"],
  ["stars", "GitHub stars"],
  ["lastActivity", "Last activity"],
  ["language", "Language"],
  ["license", "Licence"],
  ["install", "Install"],
] as const;
export type CompareRowKey = (typeof COMPARE_ROWS)[number][0];

export type CompareSkill = { slug: string; name: string; tagline: string; category: string; values: Record<CompareRowKey, string> };

const NONE = "—";

/** Pre-formatted values, so the client component only renders strings. */
export function toCompareSkill(skill: Skill): CompareSkill {
  const { metrics } = skill;
  const license = metrics.license === "NOASSERTION" ? "See repository" : metrics.license;
  return {
    slug: skill.slug,
    name: skill.name,
    tagline: skill.tagline,
    category: CATEGORIES[skill.category].name,
    values: {
      category: CATEGORIES[skill.category].name,
      type: SKILL_TYPES[skill.type].name,
      platforms: skill.platforms.map((p) => PLATFORMS[p].name).join(", "),
      difficulty: DIFFICULTIES[skill.difficulty].name,
      price: PRICES[skill.price].name,
      status: STATUSES[skill.status].name,
      stars: typeof metrics.githubStars === "number" ? metrics.githubStars.toLocaleString("en-US") : NONE,
      lastActivity: formatDate(metrics.lastCommit ?? skill.updatedAt),
      language: skill.language ?? NONE,
      license: license ?? NONE,
      install: skill.links.install ?? NONE,
    },
  };
}
