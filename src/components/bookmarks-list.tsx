"use client";

import { Bookmark } from "lucide-react";
import Link from "next/link";
import { useBookmarks } from "@/lib/bookmarks";
import type { SkillSummary } from "@/lib/summary";
import { SkillGrid } from "./skill-grid";

export function BookmarksList({ skills }: { skills: SkillSummary[] }) {
  const saved = useBookmarks();
  const bySlug = new Map(skills.map((s) => [s.slug, s]));
  const list = saved.flatMap((slug) => bySlug.get(slug) ?? []);
  if (list.length === 0) {
    return (
      <div className="flex flex-col items-center rounded-xl border border-dashed px-6 py-16 text-center">
        <Bookmark aria-hidden className="size-8 text-muted-foreground" />
        <p className="mt-3 font-medium">Nothing saved yet.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Press <strong>Save</strong> on any skill page. <Link href="/skills" className="underline underline-offset-4">Browse skills</Link>
        </p>
      </div>
    );
  }
  return <SkillGrid skills={list} label="Saved skills" />;
}
