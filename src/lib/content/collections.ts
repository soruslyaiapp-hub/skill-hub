// Curated collections: content/collections/<slug>.md lists skill slugs plus a short intro.
import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { baseName, ContentError, splitFrontMatter, type ContentIssue } from "./parse";
import { SLUG_RE } from "./schema";
import { getAllSkills } from "./skills";

export const collectionSchema = z.strictObject({
  slug: z.string().regex(SLUG_RE, "must be lowercase-kebab-case"),
  title: z.string().trim().min(3, "use 3 to 70 characters").max(70, "use 3 to 70 characters"),
  description: z.string().trim().min(10, "use 10 to 200 characters").max(200, "use 10 to 200 characters"),
  skills: z.array(z.string().regex(SLUG_RE)).min(2, "list at least 2 skills").max(24),
  featured: z.boolean().default(false),
});

export type Collection = z.output<typeof collectionSchema> & { body: string };

export const COLLECTIONS_DIR = path.join(process.cwd(), "content", "collections");

export function parseCollection(source: string, file: string, knownSkills: ReadonlySet<string>): Collection {
  let split: ReturnType<typeof splitFrontMatter>;
  try {
    split = splitFrontMatter(source);
  } catch (error) {
    throw new ContentError([{ file, message: (error as Error).message }]);
  }
  const result = collectionSchema.safeParse(split.data);
  if (!result.success) {
    throw new ContentError(result.error.issues.map((i) => ({ file, message: `${i.path.join(".") || "(front matter)"}: ${i.message}` })));
  }
  const issues: ContentIssue[] = [];
  if (result.data.slug !== baseName(file)) issues.push({ file, message: `slug "${result.data.slug}" must match the file name` });
  for (const slug of result.data.skills) {
    if (!knownSkills.has(slug)) issues.push({ file, message: `skills: "${slug}" is not a file in content/skills` });
  }
  if (new Set(result.data.skills).size !== result.data.skills.length) issues.push({ file, message: "skills: a skill is listed twice" });
  if (issues.length > 0) throw new ContentError(issues);
  return { ...result.data, body: split.body.trim() };
}

export function loadCollections(knownSkills: ReadonlySet<string>, dir: string = COLLECTIONS_DIR): Collection[] {
  if (!fs.existsSync(dir)) return [];
  const collections: Collection[] = [];
  const issues: ContentIssue[] = [];
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".md") && !f.startsWith("_")).sort()) {
    try {
      collections.push(parseCollection(fs.readFileSync(path.join(dir, file), "utf8"), file, knownSkills));
    } catch (error) {
      if (error instanceof ContentError) issues.push(...error.issues);
      else issues.push({ file, message: (error as Error).message });
    }
  }
  if (issues.length > 0) throw new ContentError(issues);
  return collections.sort((a, b) => Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title));
}

let cache: Collection[] | undefined;

export function getAllCollections(): Collection[] {
  const load = () => loadCollections(new Set(getAllSkills().map((s) => s.slug)));
  if (process.env.NODE_ENV !== "production") return load();
  cache ??= load();
  return cache;
}

export function getCollection(slug: string): Collection | undefined {
  return getAllCollections().find((c) => c.slug === slug);
}
