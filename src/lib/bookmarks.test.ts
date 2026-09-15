import { beforeEach, describe, expect, it, vi } from "vitest";

function fakeWindow(blocked = false) {
  const store = new Map<string, string>();
  return {
    localStorage: {
      getItem: (k: string) => {
        if (blocked) throw new Error("blocked");
        return store.get(k) ?? null;
      },
      setItem: (k: string, v: string) => {
        if (blocked) throw new Error("blocked");
        store.set(k, v);
      },
    },
    addEventListener() {},
    removeEventListener() {},
  };
}

describe("bookmarks", () => {
  beforeEach(() => vi.resetModules());

  it("toggles and persists saved skills, newest first", async () => {
    vi.stubGlobal("window", fakeWindow());
    const { getBookmarks, toggleBookmark } = await import("./bookmarks");
    toggleBookmark("rtk");
    toggleBookmark("repomix");
    expect(getBookmarks()).toEqual(["repomix", "rtk"]);
    toggleBookmark("rtk");
    expect(getBookmarks()).toEqual(["repomix"]);
    expect(getBookmarks()).toBe(getBookmarks()); // stable reference for useSyncExternalStore
  });

  it("keeps working in memory when storage is blocked", async () => {
    vi.stubGlobal("window", fakeWindow(true));
    const { getBookmarks, toggleBookmark } = await import("./bookmarks");
    toggleBookmark("rtk");
    expect(getBookmarks()).toEqual(["rtk"]);
  });
});
