/**
 * Create a new skill file by answering a few questions.
 *   npm run new-skill
 *   npm run new-skill -- --out ./some/dir     write somewhere else (for a dry run)
 * Never overwrites an existing file.
 */
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { ContentError, parseSkill } from "../src/lib/content/parse";
import { isHttpsUrl, SLUG_RE } from "../src/lib/content/schema";
import { renderSkillFile, slugify } from "../src/lib/content/template";
import { DIFFICULTY_KEYS, PLATFORM_KEYS, PLATFORMS, PRICE_KEYS, SKILL_TYPES, TYPE_KEYS } from "../src/lib/facets";
import { CATEGORIES, CATEGORY_KEYS } from "../src/lib/taxonomy";

const args = process.argv.slice(2);
const outFlag = args.indexOf("--out");
const outDir = path.resolve(outFlag >= 0 && args[outFlag + 1] ? args[outFlag + 1] : path.join("content", "skills"));

const interactive = Boolean(process.stdin.isTTY);
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: interactive });
const lines = rl[Symbol.asyncIterator]();

async function ask(question: string, fallback = ""): Promise<string> {
  process.stdout.write(`${question}${fallback ? ` [${fallback}]` : ""}: `);
  const next = await lines.next();
  if (next.done) throw new Error("Input ended before all questions were answered.");
  if (!interactive) process.stdout.write(`${next.value}\n`);
  return String(next.value).trim() || fallback;
}

async function askUntil(question: string, check: (v: string) => string | null, fallback = ""): Promise<string> {
  for (;;) {
    const value = await ask(question, fallback);
    const problem = check(value);
    if (!problem) return value;
    console.log(`  ✗ ${problem}`);
    if (!interactive) throw new Error(`${question}: ${problem}`);
  }
}

function resolveChoice<K extends string>(value: string, keys: readonly K[]): K | undefined {
  const n = Number(value);
  if (Number.isInteger(n) && n >= 1 && n <= keys.length) return keys[n - 1];
  return keys.find((k) => k === value);
}

function printChoices<K extends string>(label: string, keys: readonly K[], describe: (k: K) => string) {
  console.log(`\n${label}:`);
  keys.forEach((k, i) => console.log(`  ${String(i + 1).padStart(2)}. ${describe(k)} (${k})`));
}

async function choose<K extends string>(label: string, keys: readonly K[], describe: (k: K) => string, fallback = ""): Promise<K> {
  printChoices(label, keys, describe);
  const value = await askUntil("Pick a number or a key", (v) => (resolveChoice(v, keys) ? null : "not in the list"), fallback);
  return resolveChoice(value, keys)!;
}

async function chooseMany<K extends string>(label: string, keys: readonly K[], describe: (k: K) => string, fallback = ""): Promise<K[]> {
  printChoices(label, keys, describe);
  const parts = (v: string) => v.split(",").map((p) => p.trim()).filter(Boolean);
  const value = await askUntil(
    "Pick numbers or keys, separated by commas",
    (v) => (parts(v).length > 0 && parts(v).every((p) => resolveChoice(p, keys)) ? null : "pick at least one item from the list"),
    fallback,
  );
  return [...new Set(parts(value).map((p) => resolveChoice(p, keys)!))];
}

const optionalUrl = (v: string) => (!v || isHttpsUrl(v) ? null : "leave empty or use a full https:// URL");
const requiredUrl = (v: string) => (isHttpsUrl(v) ? null : "use a full https:// URL");

async function main() {
  console.log("New skill. Answer each question. Press Enter to accept the value in [brackets].\n");
  const name = await askUntil("Name", (v) => (v.length >= 2 && v.length <= 60 ? null : "use 2 to 60 characters"));
  const slug = await askUntil("Slug", (v) => (SLUG_RE.test(v) ? null : "use lowercase-kebab-case"), slugify(name));
  const file = path.join(outDir, `${slug}.md`);
  if (fs.existsSync(file)) throw new Error(`${path.relative(process.cwd(), file)} already exists. Pick another slug.`);

  const tagline = await askUntil("Tagline (one sentence, 10-140 characters)", (v) =>
    v.length >= 10 && v.length <= 140 ? null : "use 10 to 140 characters",
  );
  const category = await choose("Category", CATEGORY_KEYS, (k) => CATEGORIES[k].name);
  const type = await choose("Type", TYPE_KEYS, (k) => SKILL_TYPES[k].name);
  const platforms = await chooseMany("Platforms", PLATFORM_KEYS, (k) => PLATFORMS[k].name, "claude-code");
  const difficulty = await choose("Difficulty", DIFFICULTY_KEYS, (k) => k, "beginner");
  const price = await choose("Price", PRICE_KEYS, (k) => k, "free");
  const tags = (await ask("Tags (comma separated, optional)")).split(",").map((t) => slugify(t)).filter(Boolean);
  const authorName = await askUntil("Author name", (v) => (v ? null : "this is required"));
  const authorUrl = await askUntil("Author URL (optional)", optionalUrl);
  const source = await askUntil("Source URL (GitHub repo or home page)", requiredUrl);
  const install = await ask("Install command (optional)");
  const video = await askUntil("Demo video URL (optional)", optionalUrl);
  const linkedinUrl = await askUntil("Your LinkedIn post URL (optional)", optionalUrl);
  const today = new Date().toISOString().slice(0, 10);

  const text = renderSkillFile({
    slug, name, tagline, category, type, tags, platforms, difficulty, price,
    author: { name: authorName, url: authorUrl || undefined },
    links: { source, install: install || undefined },
    media: { video: video || undefined },
    origin: { linkedinUrl: linkedinUrl || undefined, postedAt: linkedinUrl ? today : undefined },
    addedAt: today,
    updatedAt: today,
  });

  parseSkill(text, file); // same rules as the build
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(file, text, { flag: "wx" });
  console.log(`\n✓ Created ${path.relative(process.cwd(), file)}\n  Next: write the body, then run npm run validate.`);
}

main()
  .catch((error: unknown) => {
    console.error(`\n✗ ${error instanceof Error ? error.message : String(error)}`);
    if (error instanceof ContentError) console.error("  The file was not written.");
    process.exitCode = 1;
  })
  .finally(() => rl.close());
