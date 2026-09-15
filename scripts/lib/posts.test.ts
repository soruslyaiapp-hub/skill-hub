import { describe, expect, it } from "vitest";
import { getSkill, loadSkills } from "../../src/lib/content/skills";
import { buildDigest } from "./digest";
import { buildLinkedInPost, hashtag, sectionText } from "./linkedin";

describe("LinkedIn post", () => {
  it("builds a post from the skill write-up", () => {
    const post = buildLinkedInPost(getSkill("rtk")!, "https://skillcurio.dev/skills/rtk");
    expect(post.split("\n")[0]).toMatch(/^RTK \(Rust Token Killer\): /);
    expect(post).toContain("→ ");
    expect(post).toContain("Try it: brew install rtk");
    expect(post).toContain("https://skillcurio.dev/skills/rtk");
    expect(post).toMatch(/#AI #AIAgents #ClaudeCode/);
  });

  it("reads sections and makes hashtags", () => {
    expect(sectionText("## A\n\none\n\n## B\n\ntwo", "a")).toBe("one");
    expect(hashtag("token-savings")).toBe("#TokenSavings");
    expect(hashtag("cli")).toBe("#CLI");
    expect(hashtag("AI agents")).toBe("#AIAgents");
  });
});

describe("digest", () => {
  it("lists new skills by category with the spotlight first", () => {
    const skills = loadSkills();
    const text = buildDigest(skills, { since: "2026-09-15", siteUrl: "https://x.dev", spotlight: skills[0] });
    expect(text).toMatch(/^# \d+ new AI skills this week/);
    expect(text.indexOf("## Skill of the week")).toBeLessThan(text.indexOf("## Agent Optimization"));
    expect(buildDigest(skills, { since: "2999-01-01", siteUrl: "https://x.dev", spotlight: null })).toContain("No new skills this week.");
  });
});
