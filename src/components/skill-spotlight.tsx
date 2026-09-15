import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { SkillSummary } from "@/lib/summary";
import { CategoryTile, hueStyle } from "./category-icon";

export function SkillSpotlight({ skill, week }: { skill: SkillSummary; week: number }) {
  return (
    <Link
      href={`/skills/${skill.slug}`}
      style={hueStyle(skill.category)}
      className="tint-soft group flex flex-col gap-5 rounded-2xl border p-6 outline-none transition hover:shadow-sm focus-visible:ring-3 focus-visible:ring-ring/50 sm:flex-row sm:items-center sm:p-8"
    >
      <CategoryTile category={skill.category} size="lg" />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Skill of the week · Week {week}</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight underline-offset-4 group-hover:underline">{skill.name}</h2>
        <p className="mt-2 max-w-2xl text-pretty text-muted-foreground">{skill.tagline}</p>
      </div>
      <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium">
        Read more
        <ArrowRight aria-hidden className="size-4" />
      </span>
    </Link>
  );
}
