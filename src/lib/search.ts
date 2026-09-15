import Fuse from "fuse.js";
import type { SkillSummary } from "./summary";
import { CATEGORIES } from "./taxonomy";

/** Build a fuzzy search over the given skills. The returned function gives matching slugs, best first. */
export function createSearch(skills: SkillSummary[]): (query: string) => string[] | null {
  const fuse = new Fuse(skills, {
    keys: [
      { name: "name", weight: 0.4 },
      { name: "tagline", weight: 0.2 },
      { name: "tags", weight: 0.15 },
      { name: "excerpt", weight: 0.1 },
      { name: "categoryName", weight: 0.1, getFn: (s) => CATEGORIES[s.category].name },
      { name: "author", weight: 0.05 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });
  return (query) => {
    const q = query.trim();
    if (!q) return null;
    return fuse.search(q).map((r) => r.item.slug);
  };
}
