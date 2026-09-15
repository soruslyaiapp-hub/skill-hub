import { describe, expect, it } from "vitest";
import { getAllCollections, parseCollection } from "./collections";
import { ContentError } from "./parse";

const known = new Set(["alpha", "beta"]);
const file = (fm: string) => `---\n${fm}\n---\n\nIntro text.`;
const issues = (fn: () => unknown) => {
  try {
    fn();
  } catch (error) {
    if (error instanceof ContentError) return error.issues.map((i) => i.message);
    throw error;
  }
  return [];
};

describe("parseCollection", () => {
  it("parses a valid collection", () => {
    const c = parseCollection(file("slug: starter\ntitle: Starter kit\ndescription: Two skills that go together.\nskills: [alpha, beta]"), "starter.md", known);
    expect(c.skills).toEqual(["alpha", "beta"]);
    expect(c.featured).toBe(false);
    expect(c.body).toBe("Intro text.");
  });

  it("rejects skills that do not exist, and duplicates", () => {
    const found = issues(() =>
      parseCollection(file("slug: starter\ntitle: Starter kit\ndescription: Two skills that go together.\nskills: [alpha, ghost, alpha]"), "starter.md", known),
    );
    expect(found).toEqual(['skills: "ghost" is not a file in content/skills', "skills: a skill is listed twice"]);
  });

  it("needs at least two skills", () => {
    expect(issues(() => parseCollection(file("slug: s\ntitle: Solo\ndescription: Only one skill here.\nskills: [alpha]"), "s.md", known))[0]).toMatch(/at least 2/);
  });

  it("every committed collection is valid", () => {
    expect(getAllCollections().length).toBeGreaterThan(0);
  });
});
