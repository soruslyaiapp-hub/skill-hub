/**
 * Check every content file against the schema. Runs before each build.
 *   npm run validate
 */
import { ContentError } from "../src/lib/content/parse";
import { loadSkills } from "../src/lib/content/skills";
import { categoryList } from "../src/lib/taxonomy";

try {
  const skills = loadSkills();
  const counts = new Map<string, number>();
  for (const skill of skills) counts.set(skill.category, (counts.get(skill.category) ?? 0) + 1);

  console.log(`✓ ${skills.length} skill files are valid.`);
  const empty = categoryList.filter((c) => !counts.get(c.key));
  if (empty.length > 0) console.log(`  Note: no skills yet in ${empty.map((c) => c.name).join(", ")}.`);
} catch (error) {
  if (error instanceof ContentError) {
    console.error(`✗ ${error.message}`);
    process.exit(1);
  }
  throw error;
}
