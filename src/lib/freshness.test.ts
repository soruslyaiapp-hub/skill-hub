import { describe, expect, it } from "vitest";
import { formatCompact, formatDate } from "./format";
import { daysSince, freshnessOf } from "./freshness";

const now = new Date("2026-09-15T12:00:00Z");

describe("freshnessOf", () => {
  it("buckets by age", () => {
    expect(daysSince("2026-09-14", now)).toBe(1);
    expect(freshnessOf("2026-09-01", now)).toBe("fresh");
    expect(freshnessOf("2026-06-01", now)).toBe("recent");
    expect(freshnessOf("2026-02-11", now)).toBe("stale");
  });
});

describe("format", () => {
  it("formats numbers and dates the same way everywhere", () => {
    expect(formatCompact(80428)).toBe("80.4K");
    expect(formatCompact(304)).toBe("304");
    expect(formatDate("2026-09-14")).toBe("Sep 14, 2026");
  });
});
