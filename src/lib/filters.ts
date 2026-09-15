// Pure filter logic for the browse page. The URL is the source of truth, so every view is shareable.
import { DIFFICULTY_KEYS, FRESHNESS_KEYS, PLATFORM_KEYS, PRICE_KEYS, STATUS_KEYS, TYPE_KEYS } from "./facets";
import type { SkillSummary } from "./summary";
import { CATEGORY_KEYS } from "./taxonomy";

export const FACET_KEYS = ["category", "type", "platform", "difficulty", "price", "freshness", "status", "language"] as const;
export type FacetKey = (typeof FACET_KEYS)[number];
export type Facets = Record<FacetKey, string[]>;

export const SORT_KEYS = ["relevance", "newest", "stars", "updated", "name"] as const;
export type SortKey = (typeof SORT_KEYS)[number];
export const SORT_LABELS: Record<SortKey, string> = {
  relevance: "Best match",
  newest: "Newest",
  stars: "Most stars",
  updated: "Recently updated",
  name: "Name A-Z",
};

export type FilterState = { q: string; sort: SortKey | null; facets: Facets };

const ALLOWED: Partial<Record<FacetKey, readonly string[]>> = {
  category: CATEGORY_KEYS,
  type: TYPE_KEYS,
  platform: PLATFORM_KEYS,
  difficulty: DIFFICULTY_KEYS,
  price: PRICE_KEYS,
  freshness: FRESHNESS_KEYS,
  status: STATUS_KEYS,
};

export function emptyFacets(): Facets {
  return { category: [], type: [], platform: [], difficulty: [], price: [], freshness: [], status: [], language: [] };
}

export function parseFilters(params: { get(name: string): string | null }): FilterState {
  const facets = emptyFacets();
  for (const key of FACET_KEYS) {
    const raw = params.get(key);
    if (!raw) continue;
    const values = [...new Set(raw.split(",").map((v) => v.trim()).filter(Boolean))];
    const allowed = ALLOWED[key];
    facets[key] = allowed ? values.filter((v) => allowed.includes(v)) : values.slice(0, 20);
  }
  const sortRaw = params.get("sort");
  return {
    q: (params.get("q") ?? "").slice(0, 100),
    sort: SORT_KEYS.find((s) => s === sortRaw) ?? null,
    facets,
  };
}

export function toSearchParams(state: FilterState): URLSearchParams {
  const params = new URLSearchParams();
  const q = state.q.trim();
  if (q) params.set("q", q);
  for (const key of FACET_KEYS) if (state.facets[key].length) params.set(key, state.facets[key].join(","));
  if (state.sort) params.set("sort", state.sort);
  return params;
}

export function facetValues(skill: SkillSummary, facet: FacetKey): string[] {
  switch (facet) {
    case "category":
      return [skill.category];
    case "type":
      return [skill.type];
    case "platform":
      return skill.platforms;
    case "difficulty":
      return [skill.difficulty];
    case "price":
      return [skill.price];
    case "freshness":
      return [skill.freshness];
    case "status":
      return [skill.status];
    case "language":
      return skill.language ? [skill.language] : [];
  }
}

/** OR inside one facet, AND across facets. `except` skips one facet (used for its own counts). */
export function matchesFacets(skill: SkillSummary, facets: Facets, except?: FacetKey): boolean {
  return FACET_KEYS.every((key) => {
    if (key === except || facets[key].length === 0) return true;
    const values = facetValues(skill, key);
    return facets[key].some((v) => values.includes(v));
  });
}

/** How many skills each value of `facet` would show, given every other active filter. */
export function facetCounts(skills: SkillSummary[], facets: Facets, facet: FacetKey): Map<string, number> {
  const counts = new Map<string, number>();
  for (const skill of skills) {
    if (!matchesFacets(skill, facets, facet)) continue;
    for (const value of facetValues(skill, facet)) counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return counts;
}

const byName = (a: SkillSummary, b: SkillSummary) => a.name.localeCompare(b.name);

export function sortSkills(skills: SkillSummary[], sort: Exclude<SortKey, "relevance">): SkillSummary[] {
  const list = [...skills];
  switch (sort) {
    case "newest":
      return list.sort((a, b) => b.addedAt.localeCompare(a.addedAt) || byName(a, b));
    case "stars":
      return list.sort((a, b) => (b.stars ?? -1) - (a.stars ?? -1) || byName(a, b));
    case "updated":
      return list.sort((a, b) => b.lastActivity.localeCompare(a.lastActivity) || byName(a, b));
    case "name":
      return list.sort(byName);
  }
}

/** `searchOrder` is the list of matching slugs, best first, or null when there is no query. */
export function applyFilters(skills: SkillSummary[], state: FilterState, searchOrder: string[] | null): SkillSummary[] {
  const bySlug = new Map(skills.map((s) => [s.slug, s]));
  const pool = searchOrder ? searchOrder.flatMap((slug) => bySlug.get(slug) ?? []) : skills;
  const filtered = pool.filter((s) => matchesFacets(s, state.facets));
  const sort = state.sort ?? (searchOrder ? "relevance" : "newest");
  if (sort === "relevance") return searchOrder ? filtered : sortSkills(filtered, "newest");
  return sortSkills(filtered, sort);
}

export function toggleFacetValue(state: FilterState, facet: FacetKey, value: string): FilterState {
  const current = state.facets[facet];
  const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
  return { ...state, facets: { ...state.facets, [facet]: next } };
}

export function activeFacetCount(facets: Facets): number {
  return FACET_KEYS.reduce((total, key) => total + facets[key].length, 0);
}

/** Query string with readable commas, for example ?category=coding,media */
export function toQueryString(state: FilterState): string {
  return toSearchParams(state).toString().replace(/%2C/gi, ",");
}
