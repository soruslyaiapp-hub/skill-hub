import {
  DIFFICULTIES,
  FRESHNESS,
  PLATFORMS,
  PRICES,
  SKILL_TYPES,
  STATUSES,
  type DifficultyKey,
  type FreshnessKey,
  type PlatformKey,
  type PriceKey,
  type SkillTypeKey,
  type StatusKey,
} from "./facets";
import type { FacetKey } from "./filters";
import { CATEGORIES, type CategoryKey } from "./taxonomy";

/** Human label for a facet value, for chips and checkboxes. */
export function facetLabel(facet: FacetKey, value: string): string {
  switch (facet) {
    case "category":
      return CATEGORIES[value as CategoryKey]?.short ?? value;
    case "type":
      return SKILL_TYPES[value as SkillTypeKey]?.name ?? value;
    case "platform":
      return PLATFORMS[value as PlatformKey]?.name ?? value;
    case "difficulty":
      return DIFFICULTIES[value as DifficultyKey]?.name ?? value;
    case "price":
      return PRICES[value as PriceKey]?.name ?? value;
    case "freshness":
      return FRESHNESS[value as FreshnessKey]?.name ?? value;
    case "status":
      return STATUSES[value as StatusKey]?.name ?? value;
    case "language":
      return value;
  }
}
