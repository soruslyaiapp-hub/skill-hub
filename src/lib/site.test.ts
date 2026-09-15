import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("site config", () => {
  it("treats an empty repo variable as unset", async () => {
    vi.stubEnv("NEXT_PUBLIC_GITHUB_REPO", "");
    const { site } = await import("./site");
    expect(site.repo).toBe("soruslyaiapp-hub/skill-hub");
    expect(site.repoUrl).toBe("https://github.com/soruslyaiapp-hub/skill-hub");
  });

  it("uses the repo variable when it has a value", async () => {
    vi.stubEnv("NEXT_PUBLIC_GITHUB_REPO", "someone/fork");
    const { site } = await import("./site");
    expect(site.repo).toBe("someone/fork");
  });

  it("falls back to the Vercel production URL when the site URL is empty", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL", "skill-hub-teal.vercel.app");
    const { site } = await import("./site");
    expect(site.url).toBe("https://skill-hub-teal.vercel.app");
  });
});
