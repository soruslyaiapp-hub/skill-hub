import fs from "node:fs";
import path from "node:path";
import { ContentError, parseSkill, type ContentIssue, type Skill } from "./parse";

export const SKILLS_DIR = path.join(process.cwd(), "content", "skills");

function byNewest(a: Skill, b: Skill): number {
  return b.addedAt.localeCompare(a.addedAt) || a.name.localeCompare(b.name);
}

/** Read and validate every skill file. Throws one ContentError that lists all problems. */
export function loadSkills(dir: string = SKILLS_DIR): Skill[] {
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .sort();

  const skills: Skill[] = [];
  const issues: ContentIssue[] = [];

  for (const file of files) {
    try {
      skills.push(parseSkill(fs.readFileSync(path.join(dir, file), "utf8"), file));
    } catch (error) {
      if (error instanceof ContentError) issues.push(...error.issues);
      else issues.push({ file, message: (error as Error).message });
    }
  }

  const seen = new Map<string, string>();
  for (const skill of skills) {
    const key = skill.name.toLowerCase();
    const other = seen.get(key);
    if (other) issues.push({ file: `${skill.slug}.md`, message: `name "${skill.name}" is also used by ${other}.md` });
    else seen.set(key, skill.slug);
  }

  if (issues.length > 0) throw new ContentError(issues);
  return skills.sort(byNewest);
}

let cache: Skill[] | undefined;

/** All skills, newest first. Cached in production; re-read in dev so edits show up. */
export function getAllSkills(): Skill[] {
  if (process.env.NODE_ENV !== "production") return loadSkills();
  cache ??= loadSkills();
  return cache;
}

export function getSkill(slug: string): Skill | undefined {
  return getAllSkills().find((s) => s.slug === slug);
}
