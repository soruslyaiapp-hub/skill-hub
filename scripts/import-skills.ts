/**
 * Add many skills at once from a YAML list. Each item is a skill object plus an optional `body` (Markdown).
 *   npm run import -- backlog.yaml
 *   npm run import -- backlog.yaml --dry-run
 * Dates default to today. Existing files are never overwritten. Run `npm run sync:github` after it.
 */
import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import { ContentError, parseSkill } from "../src/lib/content/parse";
import type { SkillFrontMatterInput } from "../src/lib/content/schema";
import { SKILLS_DIR } from "../src/lib/content/skills";
import { DEFAULT_BODY, renderSkillFile, slugify } from "../src/lib/content/template";

const [input, ...rest] = process.argv.slice(2);
const dryRun = rest.includes("--dry-run");
if (!input) {
  console.error("Usage: npm run import -- <file.yaml> [--dry-run]");
  process.exit(1);
}

const entries: unknown = YAML.parse(fs.readFileSync(input, "utf8"));
if (!Array.isArray(entries)) {
  console.error("The file must contain a YAML list of skills.");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
let created = 0;
let skipped = 0;
let failed = 0;

for (const entry of entries as Record<string, unknown>[]) {
  const { body, ...fields } = entry;
  const slug = String(fields.slug ?? slugify(String(fields.name ?? "")));
  const data = { addedAt: today, updatedAt: today, ...fields, slug } as SkillFrontMatterInput;
  const file = path.join(SKILLS_DIR, `${slug}.md`);

  if (fs.existsSync(file)) {
    console.log(`- ${slug}: already exists, skipped`);
    skipped++;
    continue;
  }

  const text = renderSkillFile(data, typeof body === "string" ? body : DEFAULT_BODY);
  try {
    parseSkill(text, file);
  } catch (error) {
    failed++;
    console.error(error instanceof ContentError ? error.message : String(error));
    continue;
  }

  if (!dryRun) fs.writeFileSync(file, text, { flag: "wx" });
  console.log(`✓ ${slug}${dryRun ? " (dry run)" : ""}`);
  created++;
}

console.log(`\n${created} created, ${skipped} skipped, ${failed} failed.`);
if (failed > 0) process.exitCode = 1;
