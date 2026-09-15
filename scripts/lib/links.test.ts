import { describe, expect, it } from "vitest";
import { parseSkill } from "../../src/lib/content/parse";
import { renderSkillFile } from "../../src/lib/content/template";
import { collectLinks } from "./links";

const skill = parseSkill(
  renderSkillFile({
    slug: "demo",
    name: "Demo",
    tagline: "A demo skill for the link collector.",
    category: "coding",
    type: "tool",
    platforms: ["any"],
    difficulty: "beginner",
    price: "free",
    author: { name: "Me", url: "https://github.com/me" },
    links: { source: "https://github.com/me/demo", docs: "https://demo.dev" },
    media: { cover: "/covers/demo.png", screenshots: ["https://cdn.demo.dev/1.png"] },
    origin: { linkedinUrl: "https://www.linkedin.com/posts/demo" },
    addedAt: "2026-09-15",
    updatedAt: "2026-09-15",
  }),
  "demo.md",
);

describe("collectLinks", () => {
  it("collects external links and skips LinkedIn and local files", () => {
    expect(collectLinks([skill]).map((l) => l.field)).toEqual(["links.source", "links.docs", "author.url", "media.screenshots.0"]);
  });
});
