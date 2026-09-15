import YAML, { isCollection } from "yaml";
import type { SkillFrontMatterInput } from "./schema";

export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");
}

export const DEFAULT_BODY = `## What it does

One short paragraph. Say what problem it solves and for whom.

## Why it is useful

- The main win, in one line.
- A second win, if there is one.

## How to use it

Explain the first thing a new user should try.

## Watch out for

- Limits, costs, or setup traps.
`;

/** Remove undefined values, empty strings, empty arrays and empty objects. */
function compact(value: unknown): unknown {
  if (Array.isArray(value)) return value.length ? value.map(compact) : undefined;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      const c = compact(v);
      if (c !== undefined) out[k] = c;
    }
    return Object.keys(out).length ? out : undefined;
  }
  if (value === "" || value === undefined) return undefined;
  return value;
}

const ORDER = [
  "slug", "name", "tagline", "category", "type", "tags", "platforms", "difficulty", "price",
  "status", "language", "author", "links", "media", "origin", "metrics", "addedAt", "updatedAt", "featured",
];

/** Render a skill file (front matter + body) in the canonical key order. */
export function renderSkillFile(data: SkillFrontMatterInput, body: string = DEFAULT_BODY): string {
  const cleaned = (compact(data) ?? {}) as Record<string, unknown>;
  const ordered: Record<string, unknown> = {};
  for (const key of ORDER) if (key in cleaned) ordered[key] = cleaned[key];
  for (const key of Object.keys(cleaned)) if (!(key in ordered)) ordered[key] = cleaned[key];

  const doc = new YAML.Document(ordered);
  for (const path of [["tags"], ["platforms"], ["media", "screenshots"]]) {
    const node = doc.getIn(path, true);
    if (isCollection(node)) node.flow = true;
  }
  const yaml = doc.toString({ lineWidth: 0 });
  return `---\n${yaml}---\n\n${body.trim()}\n`;
}
