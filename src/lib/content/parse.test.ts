import { describe, expect, it } from "vitest";
import { ContentError, makeExcerpt, parseSkill } from "./parse";
import type { SkillFrontMatterInput } from "./schema";
import { loadSkills } from "./skills";
import { renderSkillFile, slugify } from "./template";

const valid: SkillFrontMatterInput = {
  slug: "demo-skill",
  name: "Demo Skill",
  tagline: "A demo skill used by the unit tests.",
  category: "coding",
  type: "skill",
  platforms: ["claude-code"],
  difficulty: "beginner",
  price: "free",
  author: { name: "Tester" },
  links: { source: "https://github.com/example/demo" },
  addedAt: "2026-09-15",
  updatedAt: "2026-09-15",
};

function issuesOf(fn: () => unknown): string[] {
  try {
    fn();
  } catch (error) {
    if (error instanceof ContentError) return error.issues.map((i) => i.message);
    throw error;
  }
  throw new Error("expected a ContentError");
}

const parse = (data: unknown, file = "demo-skill.md") =>
  parseSkill(renderSkillFile(data as SkillFrontMatterInput), file);

describe("parseSkill", () => {
  it("parses a valid file and applies defaults", () => {
    const skill = parse(valid);
    expect(skill.slug).toBe("demo-skill");
    expect(skill.status).toBe("community");
    expect(skill.tags).toEqual([]);
    expect(skill.media.screenshots).toEqual([]);
    expect(skill.metrics).toEqual({});
    expect(skill.featured).toBe(false);
  });

  it("rejects unknown keys (catches typos)", () => {
    expect(issuesOf(() => parse({ ...valid, taglin: "typo" })).join()).toMatch(/taglin/);
  });

  it("rejects http links", () => {
    expect(issuesOf(() => parse({ ...valid, links: { source: "http://example.com" } }))).toEqual([
      "links.source: must be a full https:// URL",
    ]);
  });

  it("rejects javascript: links", () => {
    expect(issuesOf(() => parse({ ...valid, links: { source: "javascript:alert(1)" } })).length).toBe(1);
  });

  it("rejects a slug that does not match the file name", () => {
    expect(issuesOf(() => parse(valid, "other.md"))[0]).toMatch(/must match the file name "other.md"/);
  });

  it("rejects an unknown category and names the field", () => {
    expect(issuesOf(() => parse({ ...valid, category: "cooking" }))[0]).toMatch(/^category:/);
  });

  it("only accepts linkedin.com URLs as the origin post", () => {
    expect(issuesOf(() => parse({ ...valid, origin: { linkedinUrl: "https://x.com/post/1" } }))[0]).toMatch(
      /linkedin\.com/,
    );
    expect(parse({ ...valid, origin: { linkedinUrl: "https://www.linkedin.com/posts/abc" } }).origin.linkedinUrl).toBe(
      "https://www.linkedin.com/posts/abc",
    );
  });

  it("reports every problem at once", () => {
    expect(issuesOf(() => parse({ ...valid, tagline: "short", difficulty: "expert" })).length).toBe(2);
  });

  it("rejects files without front matter", () => {
    expect(issuesOf(() => parseSkill("# just markdown", "x.md"))[0]).toMatch(/front matter/);
  });

  it("handles Windows line endings", () => {
    const crlf = renderSkillFile(valid).replace(/\n/g, "\r\n");
    expect(parseSkill(crlf, "demo-skill.md").name).toBe("Demo Skill");
  });
});

describe("renderSkillFile", () => {
  it("round-trips through parseSkill", () => {
    const full: SkillFrontMatterInput = {
      ...valid,
      tags: ["testing", "demo"],
      platforms: ["claude-code", "cursor"],
      links: { source: "https://github.com/example/demo", install: "npx demo@latest" },
      metrics: { githubStars: 12, lastCommit: "2026-09-01", license: "MIT" },
      featured: true,
    };
    const skill = parseSkill(renderSkillFile(full, "## Hello"), "demo-skill.md");
    expect(skill.tags).toEqual(["testing", "demo"]);
    expect(skill.links.install).toBe("npx demo@latest");
    expect(skill.metrics.githubStars).toBe(12);
    expect(skill.body).toBe("## Hello");
  });

  it("drops empty values and writes lists in flow style", () => {
    const text = renderSkillFile({ ...valid, tags: ["a", "b"], media: { video: "" }, origin: {} });
    expect(text).toContain("tags: [ a, b ]");
    expect(text).not.toContain("media");
    expect(text).not.toContain("origin");
  });
});

describe("slugify", () => {
  it("makes safe kebab-case slugs", () => {
    expect(slugify("RTK (Rust Token Killer)")).toBe("rtk-rust-token-killer");
    expect(slugify("  Café -- Déjà Vu!  ")).toBe("cafe-deja-vu");
  });
});

describe("makeExcerpt", () => {
  it("strips markdown and trims to a word boundary", () => {
    const md = "## Title\n\nSome **bold** text with a [link](https://x.dev) and `code`.\n\n```bash\nrm -rf /\n```";
    expect(makeExcerpt(md)).toBe("Some bold text with a link and code.");
    expect(makeExcerpt("word ".repeat(100), 20)).toBe("word word word word…");
  });
});

describe("committed content", () => {
  it("every skill file in content/skills is valid", () => {
    expect(loadSkills().length).toBeGreaterThan(0);
  });
});
