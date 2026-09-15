import { PlayCircle } from "lucide-react";
import { toVideoEmbed } from "@/lib/video";

export function VideoEmbed({ url, title }: { url: string; title: string }) {
  const embed = toVideoEmbed(url);

  if (!embed) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4">
        <PlayCircle aria-hidden className="size-4" />
        Watch the demo video
      </a>
    );
  }

  if (embed.kind === "file") {
    return <video src={embed.src} controls preload="metadata" className="aspect-video w-full rounded-xl border bg-black" />;
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-xl border bg-black">
      <iframe
        src={embed.src}
        title={`${title} demo (${embed.provider})`}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="size-full"
      />
    </div>
  );
}
