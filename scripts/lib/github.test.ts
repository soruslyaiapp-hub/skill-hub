import { describe, expect, it } from "vitest";
import { parseGitHubRepo } from "./github";

describe("parseGitHubRepo", () => {
  it("reads owner and repo from any GitHub URL", () => {
    expect(parseGitHubRepo("https://github.com/rtk-ai/rtk")).toBe("rtk-ai/rtk");
    expect(parseGitHubRepo("https://github.com/anthropics/skills/tree/main/skills/pdf")).toBe("anthropics/skills");
    expect(parseGitHubRepo("https://github.com/a/b.git")).toBe("a/b");
  });
  it("ignores other hosts and incomplete paths", () => {
    expect(parseGitHubRepo("https://gitlab.com/a/b")).toBeNull();
    expect(parseGitHubRepo("https://github.com/only-owner")).toBeNull();
    expect(parseGitHubRepo("nope")).toBeNull();
  });
});
