import { describe, expect, it } from "vitest";
import { parseSkill } from "./content/parse";
import { draftToFile, EMPTY_DRAFT, githubLinks, type SubmissionDraft } from "./submission";

const good: SubmissionDraft = {
  ...EMPTY_DRAFT,
  name: "Demo Tool",
  tagline: "A demo tool that the submission tests use.",
  source: "https://github.com/example/demo-tool",
  authorName: "Example",
  tags: "Testing, Demo Tag",
  whatItDoes: "It shows that the form works.",
};

const fields = (draft: SubmissionDraft) => draftToFile(draft, "2026-09-15").issues.map((i) => i.field);

describe("draftToFile", () => {
  it("builds a valid skill file from a good draft", () => {
    const { slug, text, issues } = draftToFile(good, "2026-09-15");
    expect(issues).toEqual([]);
    expect(slug).toBe("demo-tool");
    const skill = parseSkill(text, "demo-tool.md");
    expect(skill.tags).toEqual(["testing", "demo-tag"]);
    expect(skill.status).toBe("community");
    expect(skill.body).toBe("## What it does\n\nIt shows that the form works.");
  });

  it("gives friendly messages for empty required fields", () => {
    const issues = draftToFile(EMPTY_DRAFT, "2026-09-15").issues;
    expect(issues.map((i) => i.field)).toEqual(["name", "tagline", "source", "authorName", "whatItDoes"]);
    expect(issues[0].message).toBe("Give it a name.");
  });

  it("maps schema problems to the right field", () => {
    expect(fields({ ...good, source: "http://example.com" })).toEqual(["source"]);
    expect(fields({ ...good, tagline: "short" })).toEqual(["tagline"]);
    expect(fields({ ...good, linkedinUrl: "https://example.com/post" })).toEqual(["linkedinUrl"]);
    expect(fields({ ...good, platforms: [] })).toEqual(["platforms"]);
  });
});

describe("githubLinks", () => {
  const repo = { url: "https://github.com/me/skill-hub", branch: "main" };

  it("prefills the new file on GitHub", () => {
    const links = githubLinks(repo, "demo-tool", "hello world", "Demo Tool");
    const url = new URL(links.pullRequest!);
    expect(url.pathname).toBe("/me/skill-hub/new/main");
    expect(url.searchParams.get("filename")).toBe("content/skills/demo-tool.md");
    expect(url.searchParams.get("value")).toBe("hello world");
    expect(links.needsPaste).toBe(false);
    expect(new URL(links.issue!).searchParams.get("title")).toBe("Suggest: Demo Tool");
  });

  it("falls back to an empty file when the URL would be too long", () => {
    const links = githubLinks(repo, "big", "x".repeat(9000), "Big");
    expect(new URL(links.pullRequest!).searchParams.get("value")).toBeNull();
    expect(links.needsPaste).toBe(true);
  });

  it("returns no links when the repo is not configured", () => {
    expect(githubLinks(null, "a", "b", "c")).toEqual({ pullRequest: null, issue: null, needsPaste: false });
  });
});
