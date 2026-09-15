import { describe, expect, it } from "vitest";
import {
  activeFacetCount,
  applyFilters,
  emptyFacets,
  facetCounts,
  parseFilters,
  toggleFacetValue,
  toSearchParams,
  type FilterState,
} from "./filters";
import { createSearch } from "./search";
import type { SkillSummary } from "./summary";

function skill(patch: Partial<SkillSummary> & { slug: string }): SkillSummary {
  return {
    name: patch.slug,
    tagline: "A test skill used by the filter tests.",
    category: "coding",
    type: "mcp",
    tags: [],
    platforms: ["claude-code"],
    difficulty: "beginner",
    price: "free",
    status: "community",
    language: null,
    author: "tester",
    stars: null,
    lastActivity: "2026-09-01",
    freshness: "fresh",
    addedAt: "2026-09-01",
    featured: false,
    archived: false,
    excerpt: "",
    ...patch,
  };
}

const skills = [
  skill({ slug: "alpha", name: "Alpha", platforms: ["claude-code", "cursor"], stars: 10, addedAt: "2026-09-03", language: "Go" }),
  skill({ slug: "bravo", name: "Bravo", category: "media", type: "tool", platforms: ["cursor"], stars: 500, addedAt: "2026-09-01", lastActivity: "2026-09-10" }),
  skill({ slug: "charlie", name: "Charlie", type: "skill", difficulty: "advanced", addedAt: "2026-09-02", tags: ["video-editing"] }),
];

const state = (patch: Partial<FilterState> = {}): FilterState => ({ q: "", sort: null, facets: emptyFacets(), ...patch });
const slugs = (list: SkillSummary[]) => list.map((s) => s.slug);

describe("URL state", () => {
  it("round-trips through the query string", () => {
    const original = state({ q: "video", sort: "stars", facets: { ...emptyFacets(), category: ["coding", "media"], language: ["Go"] } });
    const parsed = parseFilters(new URLSearchParams(toSearchParams(original).toString()));
    expect(parsed).toEqual(original);
  });

  it("drops unknown values and unknown sorts", () => {
    const parsed = parseFilters(new URLSearchParams("category=coding,cooking&type=nope&sort=random"));
    expect(parsed.facets.category).toEqual(["coding"]);
    expect(parsed.facets.type).toEqual([]);
    expect(parsed.sort).toBeNull();
  });

  it("writes nothing for an empty state", () => {
    expect(toSearchParams(state({ q: "   " })).toString()).toBe("");
  });
});

describe("applyFilters", () => {
  it("ORs values inside a facet and ANDs across facets", () => {
    const either = state({ facets: { ...emptyFacets(), category: ["coding", "media"] } });
    expect(slugs(applyFilters(skills, either, null))).toEqual(["alpha", "charlie", "bravo"]);
    const both = state({ facets: { ...emptyFacets(), category: ["coding"], platform: ["cursor"] } });
    expect(slugs(applyFilters(skills, both, null))).toEqual(["alpha"]);
  });

  it("sorts newest first by default", () => {
    expect(slugs(applyFilters(skills, state(), null))).toEqual(["alpha", "charlie", "bravo"]);
  });

  it("sorts by stars with unknown stars last", () => {
    expect(slugs(applyFilters(skills, state({ sort: "stars" }), null))).toEqual(["bravo", "alpha", "charlie"]);
  });

  it("sorts by last activity", () => {
    expect(slugs(applyFilters(skills, state({ sort: "updated" }), null))[0]).toBe("bravo");
  });

  it("keeps the search order when sorting by relevance", () => {
    expect(slugs(applyFilters(skills, state({ q: "x" }), ["charlie", "alpha"]))).toEqual(["charlie", "alpha"]);
  });
});

describe("facetCounts", () => {
  it("ignores the facet's own selection so other options stay visible", () => {
    const facets = { ...emptyFacets(), category: ["media"], platform: ["cursor"] };
    const categoryCounts = facetCounts(skills, facets, "category");
    expect(categoryCounts.get("coding")).toBe(1);
    expect(categoryCounts.get("media")).toBe(1);
    expect(facetCounts(skills, facets, "platform").get("claude-code")).toBeUndefined();
  });
});

describe("toggleFacetValue", () => {
  it("adds and removes a value", () => {
    const on = toggleFacetValue(state(), "price", "free");
    expect(on.facets.price).toEqual(["free"]);
    expect(activeFacetCount(on.facets)).toBe(1);
    expect(toggleFacetValue(on, "price", "free").facets.price).toEqual([]);
  });
});

describe("createSearch", () => {
  it("finds skills by name, tag and category name, and returns null for an empty query", () => {
    const search = createSearch(skills);
    expect(search("  ")).toBeNull();
    expect(search("bravo")?.[0]).toBe("bravo");
    expect(search("video editing")).toContain("charlie");
    expect(search("media & creative")).toContain("bravo");
  });
});
