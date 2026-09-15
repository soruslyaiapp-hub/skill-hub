import Link from "next/link";
import type { ReactNode } from "react";
import type { Skill } from "@/lib/content/parse";
import { DIFFICULTIES, PLATFORMS, PRICES, SKILL_TYPES } from "@/lib/facets";
import { formatDate } from "@/lib/format";
import { CATEGORIES } from "@/lib/taxonomy";
import { LinkedInIcon } from "./icons";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex justify-between gap-4 py-2.5">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{children}</dd>
    </div>
  );
}

export function SkillFacts({ skill }: { skill: Skill }) {
  const { metrics } = skill;
  const license = metrics.license === "NOASSERTION" ? "See repository" : metrics.license;
  return (
    <div className="space-y-6">
      <section aria-labelledby="facts-title" className="rounded-xl border p-4">
        <h2 id="facts-title" className="text-sm font-semibold">
          Details
        </h2>
        <dl className="mt-1 divide-y text-sm">
          <Row label="Category">
            <Link href={`/categories/${skill.category}`} className="hover:underline">
              {CATEGORIES[skill.category].short}
            </Link>
          </Row>
          <Row label="Type">{SKILL_TYPES[skill.type].name}</Row>
          <Row label="Difficulty">{DIFFICULTIES[skill.difficulty].name}</Row>
          <Row label="Price">{PRICES[skill.price].name}</Row>
          {skill.language ? <Row label="Language">{skill.language}</Row> : null}
          {license ? <Row label="License">{license}</Row> : null}
          {typeof metrics.githubStars === "number" ? <Row label="GitHub stars">{metrics.githubStars.toLocaleString("en-US")}</Row> : null}
          <Row label="Last activity">{formatDate(metrics.lastCommit ?? skill.updatedAt)}</Row>
          <Row label="Listed">{formatDate(skill.addedAt)}</Row>
        </dl>
      </section>

      <section aria-labelledby="platforms-title">
        <h2 id="platforms-title" className="mb-2 text-sm font-semibold">
          Works with
        </h2>
        <ul className="flex flex-wrap gap-1.5">
          {skill.platforms.map((p) => (
            <li key={p}>
              <Link href={`/skills?platform=${p}`} className="inline-flex rounded-md border px-2 py-1 text-xs transition hover:bg-muted">
                {PLATFORMS[p].name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {skill.tags.length > 0 ? (
        <section aria-labelledby="tags-title">
          <h2 id="tags-title" className="mb-2 text-sm font-semibold">
            Tags
          </h2>
          <ul className="flex flex-wrap gap-1.5">
            {skill.tags.map((tag) => (
              <li key={tag}>
                <Link href={`/tags/${tag}`} className="inline-flex rounded-md bg-muted px-2 py-1 font-mono text-xs transition hover:bg-muted/70">
                  #{tag}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {skill.origin.linkedinUrl ? (
        <a
          href={skill.origin.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 rounded-xl border p-3 text-sm transition hover:bg-muted"
        >
          <LinkedInIcon className="size-4 shrink-0 text-[#0A66C2]" />
          <span>
            Originally shared on LinkedIn
            {skill.origin.postedAt ? <span className="text-muted-foreground"> · {formatDate(skill.origin.postedAt)}</span> : null}
          </span>
        </a>
      ) : null}
    </div>
  );
}
