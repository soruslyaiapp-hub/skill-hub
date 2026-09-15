/**
 * Print a LinkedIn post draft for one skill, linking back to its page.
 *   npm run linkedin -- rtk
 *   npm run linkedin -- rtk --site https://your-domain.com
 */
import { getSkill } from "../src/lib/content/skills";
import { site } from "../src/lib/site";
import { buildLinkedInPost } from "./lib/linkedin";

const args = process.argv.slice(2);
const slug = args.find((a) => !a.startsWith("--"));
const siteAt = args.indexOf("--site");
const siteUrl = (siteAt >= 0 ? args[siteAt + 1] : site.url).replace(/\/$/, "");
const skill = slug ? getSkill(slug) : undefined;

if (!skill) {
  console.error(slug ? `No skill with slug "${slug}".` : "Usage: npm run linkedin -- <slug> [--site https://your-domain.com]");
  process.exit(1);
}
console.log(buildLinkedInPost(skill, `${siteUrl}/skills/${skill.slug}`));
