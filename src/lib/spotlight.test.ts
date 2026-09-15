import { describe, expect, it } from "vitest";
import { isoWeek, skillOfTheWeek } from "./spotlight";

describe("isoWeek", () => {
  it("matches ISO week numbers, including year edges", () => {
    expect(isoWeek(new Date("2026-09-15T12:00:00Z"))).toEqual({ year: 2026, week: 38 });
    expect(isoWeek(new Date("2021-01-01T12:00:00Z"))).toEqual({ year: 2020, week: 53 });
    expect(isoWeek(new Date("2026-01-01T12:00:00Z"))).toEqual({ year: 2026, week: 1 });
  });
});

describe("skillOfTheWeek", () => {
  const skills = ["a", "b", "c"].map((slug) => ({ slug, featured: slug !== "c" }));

  it("rotates through featured skills, one per week", () => {
    const one = skillOfTheWeek(skills, new Date("2026-09-15T00:00:00Z"))!;
    const next = skillOfTheWeek(skills, new Date("2026-09-22T00:00:00Z"))!;
    expect(one.skill.featured).toBe(true);
    expect(next.skill.slug).not.toBe(one.skill.slug);
    expect(skillOfTheWeek(skills, new Date("2026-09-16T00:00:00Z"))!.skill).toBe(one.skill);
  });

  it("falls back to every skill when none are featured, and to null when empty", () => {
    expect(skillOfTheWeek([{ slug: "x", featured: false }], new Date())!.skill.slug).toBe("x");
    expect(skillOfTheWeek([], new Date())).toBeNull();
  });
});
