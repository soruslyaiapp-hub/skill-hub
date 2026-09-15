import { describe, expect, it } from "vitest";
import { getAllSkills } from "./content/skills";
import { escapeXml, rssXml, skillsJson } from "./feed";

describe("feeds", () => {
  it("escapes XML special characters", () => {
    expect(escapeXml(`Tom & "Jerry" <3 'x'`)).toBe("Tom &amp; &quot;Jerry&quot; &lt;3 &apos;x&apos;");
  });

  it("builds an RSS item per skill, up to the limit", () => {
    const xml = rssXml(getAllSkills(), new Date("2026-09-15T00:00:00Z"), 5);
    expect(xml.startsWith('<?xml version="1.0"')).toBe(true);
    expect(xml.match(/<item>/g)).toHaveLength(5);
    expect(xml).toContain("<lastBuildDate>Tue, 15 Sep 2026 00:00:00 GMT</lastBuildDate>");
  });

  it("builds the JSON feed with every skill and no Markdown bodies", () => {
    const json = skillsJson(getAllSkills(), "2026-09-15T00:00:00.000Z");
    expect(json.count).toBe(json.skills.length);
    expect(json.skills[0]).toHaveProperty("url");
    expect(json.skills[0]).not.toHaveProperty("body");
  });
});
