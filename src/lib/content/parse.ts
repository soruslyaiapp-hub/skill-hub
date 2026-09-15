import YAML from "yaml";
import { skillSchema, type SkillFrontMatter } from "./schema";

export type Skill = SkillFrontMatter & {
  /** Markdown body below the front matter. */
  body: string;
  /** Plain-text preview of the body, used by search. */
  excerpt: string;
};

export type ContentIssue = { file: string; message: string };

export class ContentError extends Error {
  constructor(public readonly issues: ContentIssue[]) {
    super(
      `Found ${issues.length} content problem(s):\n` +
        issues.map((i) => `  - ${i.file}: ${i.message}`).join("\n"),
    );
    this.name = "ContentError";
  }
}

const BYTE_ORDER_MARK = 0xfeff;
const FRONT_MATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)([\s\S]*)$/;

export function splitFrontMatter(source: string): { data: unknown; body: string } {
  const text = source.charCodeAt(0) === BYTE_ORDER_MARK ? source.slice(1) : source;
  const match = FRONT_MATTER_RE.exec(text);
  if (!match) throw new Error("missing front matter (the file must start with a --- line)");
  return { data: YAML.parse(match[1]) ?? {}, body: match[2] };
}

/** File name without folders and without ".md". Handles both / and Windows separators. */
export function baseName(file: string): string {
  const name = file.split(/[/\x5c]/).pop() ?? file;
  return name.replace(/\.md$/, "");
}

export function makeExcerpt(markdown: string, max = 220): string {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+.*$/gm, " ")
    .replace(/^\s*[-*+>]\s+/gm, "")
    .replace(/[*_~]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

/** Parse and validate one skill file. Throws ContentError with every problem found. */
export function parseSkill(source: string, file: string): Skill {
  let split: { data: unknown; body: string };
  try {
    split = splitFrontMatter(source);
  } catch (error) {
    throw new ContentError([{ file, message: (error as Error).message }]);
  }

  const result = skillSchema.safeParse(split.data);
  if (!result.success) {
    throw new ContentError(
      result.error.issues.map((issue) => ({
        file,
        message: `${issue.path.join(".") || "(front matter)"}: ${issue.message}`,
      })),
    );
  }

  const expected = baseName(file);
  if (result.data.slug !== expected) {
    throw new ContentError([
      { file, message: `slug "${result.data.slug}" must match the file name "${expected}.md"` },
    ]);
  }

  const body = split.body.trim();
  return { ...result.data, body, excerpt: makeExcerpt(body) };
}
