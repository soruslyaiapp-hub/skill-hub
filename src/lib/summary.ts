import type { Skill } from "./content/parse";
import type { DifficultyKey, FreshnessKey, PlatformKey, PriceKey, SkillTypeKey, StatusKey } from "./facets";
import { freshnessOf } from "./freshness";
import type { CategoryKey } from "./taxonomy";

/** The small, client-safe view of a skill used by cards, search and filters. */
export type SkillSummary = {
  slug: string;
  name: string;
  tagline: string;
  category: CategoryKey;
  type: SkillTypeKey;
  tags: string[];
  platforms: PlatformKey[];
  difficulty: DifficultyKey;
  price: PriceKey;
  status: StatusKey;
  language: string | null;
  author: string;
  stars: number | null;
  /** Last commit date if known, otherwise the date the entry was updated. */
  lastActivity: string;
  freshness: FreshnessKey;
  addedAt: string;
  featured: boolean;
  archived: boolean;
  excerpt: string;
};

export function toSummary(skill: Skill, now: Date = new Date()): SkillSummary {
  const lastActivity = skill.metrics.lastCommit ?? skill.updatedAt;
  return {
    slug: skill.slug,
    name: skill.name,
    tagline: skill.tagline,
    category: skill.category,
    type: skill.type,
    tags: skill.tags,
    platforms: skill.platforms,
    difficulty: skill.difficulty,
    price: skill.price,
    status: skill.status,
    language: skill.language ?? null,
    author: skill.author.name,
    stars: skill.metrics.githubStars ?? null,
    lastActivity,
    freshness: freshnessOf(lastActivity, now),
    addedAt: skill.addedAt,
    featured: skill.featured,
    archived: skill.metrics.archived ?? false,
    excerpt: skill.excerpt,
  };
}
