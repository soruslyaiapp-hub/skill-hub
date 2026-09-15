export type VideoEmbed =
  | { kind: "iframe"; provider: "YouTube" | "Loom" | "Vimeo"; src: string }
  | { kind: "file"; src: string };

const VIDEO_ID = /^[A-Za-z0-9_-]{6,64}$/;

/** Turn a public video link into a safe embed. Returns null for anything we do not recognise. */
export function toVideoEmbed(raw: string): VideoEmbed | null {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;

  const host = url.hostname.replace(/^(www|m)\./, "");
  const parts = url.pathname.split("/").filter(Boolean);
  const iframe = (provider: "YouTube" | "Loom" | "Vimeo", id: string | undefined, prefix: string): VideoEmbed | null =>
    id && VIDEO_ID.test(id) ? { kind: "iframe", provider, src: `${prefix}${id}` } : null;

  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const id = url.searchParams.get("v") ?? (["embed", "shorts", "live"].includes(parts[0]) ? parts[1] : undefined);
    return iframe("YouTube", id, "https://www.youtube-nocookie.com/embed/");
  }
  if (host === "youtu.be") return iframe("YouTube", parts[0], "https://www.youtube-nocookie.com/embed/");
  if (host === "loom.com" && (parts[0] === "share" || parts[0] === "embed")) {
    return iframe("Loom", parts[1], "https://www.loom.com/embed/");
  }
  if (host === "vimeo.com" && /^\d+$/.test(parts[0] ?? "")) return iframe("Vimeo", parts[0], "https://player.vimeo.com/video/");
  if (host === "player.vimeo.com" && parts[0] === "video" && /^\d+$/.test(parts[1] ?? "")) {
    return iframe("Vimeo", parts[1], "https://player.vimeo.com/video/");
  }
  if (/\.(mp4|webm|mov)$/i.test(url.pathname)) return { kind: "file", src: url.toString() };
  return null;
}
