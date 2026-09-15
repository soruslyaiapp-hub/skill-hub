import { describe, expect, it } from "vitest";
import { emptyFacets, parseFilters, toQueryString } from "./filters";

describe("toQueryString", () => {
  it("keeps commas readable and still round-trips", () => {
    const state = { q: "a,b", sort: null, facets: { ...emptyFacets(), category: ["coding", "media"] } };
    const qs = toQueryString(state);
    expect(qs).toBe("q=a,b&category=coding,media");
    expect(parseFilters(new URLSearchParams(qs)).facets.category).toEqual(["coding", "media"]);
  });
});
