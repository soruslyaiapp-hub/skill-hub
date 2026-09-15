import type { SkillSummary } from "@/lib/summary";
import { SkillCard } from "./skill-card";

export function SkillGrid({ skills }: { skills: SkillSummary[] }) {
  return (
    <ul role="list" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {skills.map((skill) => (
        <li key={skill.slug} className="flex">
          <SkillCard skill={skill} />
        </li>
      ))}
    </ul>
  );
}
