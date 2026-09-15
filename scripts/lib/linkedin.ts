import type { Skill } from "../../src/lib/content/parse";

/** Text under a "## Heading" in a Markdown body, up to the next "## ". */
export function sectionText(body: string, heading: string): string {
  const lines = body.split(/\r?\n/);
  const start = lines.findIndex((l) => l.trim().toLowerCase() === `## ${heading}`.toLowerCase());
  if (start < 0) return "";
  const rest = lines.slice(start + 1);
  const end = rest.findIndex((l) => l.startsWith("## "));
  return (end < 0 ? rest : rest.slice(0, end)).join("\n").trim();
}

const plain = (text: string) =>
  text.replace(/`([^`]*)`/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();

const ACRONYMS = new Set(["ai", "api", "cli", "mcp", "rag", "lsp", "sdk", "seo", "pdf", "tdd", "ui", "ci", "llm", "3d"]);

/** "token-savings" -> "#TokenSavings", "cli" -> "#CLI" */
export function hashtag(word: string): string {
  const parts = word.split(/[^a-z0-9]+/i).filter(Boolean);
  return `#${parts.map((p) => (ACRONYMS.has(p.toLowerCase()) ? p.toUpperCase() : p[0].toUpperCase() + p.slice(1))).join("")}`;
}

/** A ready-to-paste LinkedIn post that links back to the skill page. */
export function buildLinkedInPost(skill: Skill, url: string): string {
  const what = plain(sectionText(skill.body, "What it does").split(/\n\s*\n/)[0] ?? "").replace(/\s+/g, " ");
  const why = sectionText(skill.body, "Why it is useful")
    .split(/\r?\n/)
    .filter((l) => l.startsWith("- "))
    .map((l) => plain(l.slice(2)))
    .slice(0, 3);
  const words = ["AI", "AI agents", ...(skill.platforms.includes("claude-code") ? ["Claude Code"] : []), ...skill.tags.slice(0, 3)];
  const tags = [...new Set(words.map(hashtag))].slice(0, 6);
  return [
    `${skill.name}: ${skill.tagline}`,
    "",
    what,
    "",
    ...(why.length ? ["Why it is worth a look:", ...why.map((b) => `→ ${b}`), ""] : []),
    ...(skill.links.install ? [`Try it: ${skill.links.install}`, ""] : []),
    `Full write-up, install steps and similar tools: ${url}`,
    "",
    tags.join(" "),
    "",
  ].join("\n");
}
