import { AlertTriangle, ArrowUpRight, BookOpen, ChevronRight, PencilLine, Star } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import type { Skill } from "@/lib/content/parse";
import { SKILL_TYPES } from "@/lib/facets";
import { formatCompact } from "@/lib/format";
import { linkedInShareUrl } from "@/lib/share";
import type { SkillSummary } from "@/lib/summary";
import { CATEGORIES } from "@/lib/taxonomy";
import { CategoryTile, hueStyle } from "./category-icon";
import { CopyButton } from "./copy-button";
import { FreshnessDot } from "./freshness-dot";
import { LinkedInIcon } from "./icons";
import { StatusBadge } from "./status-badge";

const EXTERNAL = { target: "_blank", rel: "noopener noreferrer" } as const;

type Props = { skill: Skill; summary: SkillSummary; pageUrl: string; editUrl: string | null };

export function SkillHero({ skill, summary, pageUrl, editUrl }: Props) {
  const category = CATEGORIES[skill.category];
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/skills" className="hover:text-foreground">Skills</Link>
          </li>
          <li aria-hidden><ChevronRight className="size-3.5" /></li>
          <li>
            <Link href={`/categories/${category.key}`} className="hover:text-foreground">{category.short}</Link>
          </li>
          <li aria-hidden><ChevronRight className="size-3.5" /></li>
          <li aria-current="page" className="truncate text-foreground">{skill.name}</li>
        </ol>
      </nav>

      {summary.archived ? (
        <div role="note" className="mb-6 flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-800 dark:text-amber-200">
          <AlertTriangle aria-hidden className="size-4 shrink-0" />
          This repository is archived on GitHub. It may no longer be maintained.
        </div>
      ) : null}

      <header style={hueStyle(skill.category)} className="tint-soft rounded-2xl border p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <CategoryTile category={skill.category} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{skill.name}</h1>
              <StatusBadge status={skill.status} />
            </div>
            <p className="mt-3 max-w-3xl text-pretty text-lg text-muted-foreground">{skill.tagline}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span>
                by{" "}
                {skill.author.url ? (
                  <a href={skill.author.url} {...EXTERNAL} className="font-medium text-foreground hover:underline">{skill.author.name}</a>
                ) : (
                  <span className="font-medium text-foreground">{skill.author.name}</span>
                )}
              </span>
              <span>{SKILL_TYPES[skill.type].name}</span>
              {summary.stars !== null ? (
                <span className="inline-flex items-center gap-1">
                  <Star aria-hidden className="size-4" />
                  {formatCompact(summary.stars)} stars
                </span>
              ) : null}
              <FreshnessDot withLabel freshness={summary.freshness} date={summary.lastActivity} />
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <a href={skill.links.source} {...EXTERNAL} className={buttonVariants({ size: "lg" })}>
                View source
                <ArrowUpRight data-icon="inline-end" />
              </a>
              {skill.links.docs ? (
                <a href={skill.links.docs} {...EXTERNAL} className={buttonVariants({ variant: "outline", size: "lg" })}>
                  <BookOpen data-icon="inline-start" />
                  Docs
                </a>
              ) : null}
              <a href={linkedInShareUrl(pageUrl)} {...EXTERNAL} className={buttonVariants({ variant: "outline", size: "lg" })}>
                <LinkedInIcon data-icon="inline-start" className="size-4 text-[#0A66C2] dark:text-[#70B5F9]" />
                Share
              </a>
              <CopyButton value={pageUrl} label="Copy link to this skill" />
              {editUrl ? (
                <a href={editUrl} {...EXTERNAL} className={buttonVariants({ variant: "ghost", size: "lg" })}>
                  <PencilLine data-icon="inline-start" />
                  Suggest an edit
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
