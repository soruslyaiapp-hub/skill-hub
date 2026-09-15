import { BadgeCheck, Star } from "lucide-react";
import Link from "next/link";
import { PLATFORMS, SKILL_TYPES } from "@/lib/facets";
import { formatCompact } from "@/lib/format";
import type { SkillSummary } from "@/lib/summary";
import { CATEGORIES } from "@/lib/taxonomy";
import { CategoryTile, hueStyle } from "./category-icon";
import { FreshnessDot } from "./freshness-dot";

export function SkillCard({ skill }: { skill: SkillSummary }) {
  const shown = skill.platforms.slice(0, 2).map((p) => PLATFORMS[p].name);
  const more = skill.platforms.length - shown.length;
  return (
    <Link
      href={`/skills/${skill.slug}`}
      className="group flex w-full flex-col gap-3 rounded-xl border bg-card p-4 text-card-foreground outline-none transition hover:border-foreground/20 hover:shadow-sm focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <div className="flex items-start gap-3">
        <CategoryTile category={skill.category} />
        <div className="min-w-0 flex-1">
          <h3 className="flex items-start gap-1 font-semibold leading-snug">
            <span className="line-clamp-2 underline-offset-4 group-hover:underline">{skill.name}</span>
            {skill.status === "verified" ? <BadgeCheck aria-label="Verified" className="mt-0.5 size-4 shrink-0 text-sky-500" /> : null}
          </h3>
          <p className="mt-1 truncate text-xs text-muted-foreground">
            {skill.author} · {SKILL_TYPES[skill.type].name}
          </p>
        </div>
        {skill.stars !== null ? (
          <span className="flex shrink-0 items-center gap-1 text-xs tabular-nums text-muted-foreground" title={`${skill.stars.toLocaleString("en-US")} GitHub stars`}>
            <Star aria-hidden className="size-3.5" />
            {formatCompact(skill.stars)}
          </span>
        ) : null}
      </div>
      <p className="line-clamp-2 text-sm text-muted-foreground">{skill.tagline}</p>
      <div className="mt-auto flex items-center gap-2 border-t pt-3 text-xs text-muted-foreground">
        <span style={hueStyle(skill.category)} className="tint-text shrink-0 font-medium">
          {CATEGORIES[skill.category].short}
        </span>
        <span aria-hidden>·</span>
        <span className="truncate">
          {shown.join(", ")}
          {more > 0 ? ` +${more}` : ""}
        </span>
        <FreshnessDot className="ml-auto shrink-0" freshness={skill.freshness} date={skill.lastActivity} />
      </div>
    </Link>
  );
}
