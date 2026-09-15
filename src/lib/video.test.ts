import { describe, expect, it } from "vitest";
import { toVideoEmbed } from "./video";

describe("toVideoEmbed", () => {
  it("embeds YouTube links with the privacy-friendly domain", () => {
    const expected = { kind: "iframe", provider: "YouTube", src: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" };
    expect(toVideoEmbed("https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10")).toEqual(expected);
    expect(toVideoEmbed("https://youtu.be/dQw4w9WgXcQ")).toEqual(expected);
    expect(toVideoEmbed("https://youtube.com/shorts/dQw4w9WgXcQ")).toEqual(expected);
  });

  it("embeds Loom and Vimeo", () => {
    expect(toVideoEmbed("https://www.loom.com/share/abc123def456")?.kind).toBe("iframe");
    expect(toVideoEmbed("https://vimeo.com/76979871")).toEqual({
      kind: "iframe",
      provider: "Vimeo",
      src: "https://player.vimeo.com/video/76979871",
    });
  });

  it("plays direct video files", () => {
    expect(toVideoEmbed("https://cdn.example.com/demo.mp4")).toEqual({ kind: "file", src: "https://cdn.example.com/demo.mp4" });
  });

  it("refuses unsafe or unknown links", () => {
    expect(toVideoEmbed("http://youtube.com/watch?v=dQw4w9WgXcQ")).toBeNull();
    expect(toVideoEmbed("https://youtube.com/watch?v=bad\"id")).toBeNull();
    expect(toVideoEmbed("https://example.com/page")).toBeNull();
    expect(toVideoEmbed("not a url")).toBeNull();
  });
});
