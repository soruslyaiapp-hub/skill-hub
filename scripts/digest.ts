/**
 * Print the weekly digest email as Markdown.
 *   npm run digest                                   skills added in the last 7 days
 *   npm run digest -- --days 14 --site https://your-domain.com --out digest.md
 */
import fs from "node:fs";
import { loadSkills } from "../src/lib/content/skills";
import { site } from "../src/lib/site";
import { skillOfTheWeek } from "../src/lib/spotlight";
import { buildDigest } from "./lib/digest";

const args = process.argv.slice(2);
const flag = (name: string) => {
  const at = args.indexOf(name);
  return at >= 0 ? args[at + 1] : undefined;
};

const days = Number(flag("--days")) || 7;
const now = new Date();
const since = new Date(now.getTime() - days * 86_400_000).toISOString().slice(0, 10);
const skills = loadSkills();
const text = buildDigest(skills, {
  since,
  siteUrl: (flag("--site") ?? site.url).replace(/\/$/, ""),
  spotlight: skillOfTheWeek(skills, now)?.skill ?? null,
});

const out = flag("--out");
if (out) {
  fs.writeFileSync(out, text);
  console.log(`Wrote ${out}`);
} else {
  console.log(text);
}
