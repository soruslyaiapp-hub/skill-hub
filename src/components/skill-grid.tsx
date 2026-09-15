import type { SkillSummary } from "@/lib/summary";
import { SkillCard } from "./skill-card";

/** `label` adds a hidden h2, so the h3 card titles keep a valid heading order under a page h1. */
export function SkillGrid({ skills, label }: { skills: SkillSummary[]; label?: string }) {
  return (
    <>
      {label ? <h2 className="sr-only">{label}</h2> : null}
      <ul role="list" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {skills.map((skill) => (
          <li key={skill.slug} className="flex">
            <SkillCard skill={skill} />
          </li>
        ))}
      </ul>
    </>
  );
}
