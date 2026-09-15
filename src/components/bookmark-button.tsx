"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { toggleBookmark, useBookmarks } from "@/lib/bookmarks";

export function BookmarkButton({ slug }: { slug: string }) {
  const saved = useBookmarks().includes(slug);
  return (
    <button
      type="button"
      onClick={() => toggleBookmark(slug)}
      aria-pressed={saved}
      className={buttonVariants({ variant: saved ? "secondary" : "outline", size: "lg" })}
    >
      {saved ? <BookmarkCheck data-icon="inline-start" /> : <Bookmark data-icon="inline-start" />}
      {saved ? "Saved" : "Save"}
    </button>
  );
}
