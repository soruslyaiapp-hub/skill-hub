import { describe, expect, it } from "vitest";
import { baseName, splitFrontMatter } from "./parse";

const BACKSLASH = String.fromCharCode(92);

describe("baseName", () => {
  it("strips folders on every OS", () => {
    expect(baseName("demo-skill.md")).toBe("demo-skill");
    expect(baseName("content/skills/demo-skill.md")).toBe("demo-skill");
    expect(baseName(["C:", "Users", "me", "demo-skill.md"].join(BACKSLASH))).toBe("demo-skill");
  });
});

describe("splitFrontMatter", () => {
  it("ignores a byte order mark at the start of the file", () => {
    const withBom = String.fromCharCode(0xfeff) + "---\nname: x\n---\nbody";
    expect(splitFrontMatter(withBom)).toEqual({ data: { name: "x" }, body: "body" });
  });
});
