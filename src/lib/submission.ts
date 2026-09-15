// Turns the public submit form into a skill file, with the same rules as the build.
import { ContentError, parseSkill } from "./content/parse";
import type { SkillFrontMatterInput } from "./content/schema";
import { renderSkillFile, slugify } from "./content/template";

export type SubmissionDraft = {
  name: string;
  tagline: string;
  category: string;
  type: string;
  platforms: string[];
  difficulty: string;
  price: string;
  tags: string;
  authorName: string;
  authorUrl: string;
  source: string;
  docs: string;
  install: string;
  video: string;
  linkedinUrl: string;
  whatItDoes: string;
  whyUseful: string;
  howToUse: string;
  watchOutFor: string;
};
export type DraftField = keyof SubmissionDraft;
export type DraftIssue = { field: DraftField; message: string };

export const EMPTY_DRAFT: SubmissionDraft = {
  name: "", tagline: "", category: "coding", type: "skill", platforms: ["claude-code"], difficulty: "beginner", price: "free",
  tags: "", authorName: "", authorUrl: "", source: "", docs: "", install: "", video: "", linkedinUrl: "",
  whatItDoes: "", whyUseful: "", howToUse: "", watchOutFor: "",
};

const REQUIRED: [DraftField, string][] = [
  ["name", "Give it a name."],
  ["tagline", "Add a one-sentence tagline."],
  ["source", "Add a link to the source."],
  ["authorName", "Say who made it."],
  ["whatItDoes", "Say what it does in one or two sentences."],
];

const PATH_TO_FIELD: Record<string, DraftField> = {
  slug: "name", name: "name", tagline: "tagline", category: "category", type: "type", platforms: "platforms",
  difficulty: "difficulty", price: "price", tags: "tags", "author.name": "authorName", "author.url": "authorUrl",
  "links.source": "source", "links.docs": "docs", "links.install": "install", "media.video": "video", "origin.linkedinUrl": "linkedinUrl",
};

export function draftBody(draft: SubmissionDraft): string {
  const sections: [string, string][] = [
    ["What it does", draft.whatItDoes],
    ["Why it is useful", draft.whyUseful],
    ["How to use it", draft.howToUse],
    ["Watch out for", draft.watchOutFor],
  ];
  return sections.filter(([, text]) => text.trim()).map(([title, text]) => `## ${title}\n\n${text.trim()}`).join("\n\n");
}

const optional = (value: string) => value.trim() || undefined;

export function draftToFile(draft: SubmissionDraft, today: string): { slug: string; text: string; issues: DraftIssue[] } {
  const slug = slugify(draft.name) || "your-skill";
  const data = {
    slug,
    name: draft.name.trim(),
    tagline: draft.tagline.trim(),
    category: draft.category,
    type: draft.type,
    tags: draft.tags.split(",").map((t) => slugify(t)).filter(Boolean),
    platforms: draft.platforms,
    difficulty: draft.difficulty,
    price: draft.price,
    status: "community",
    author: { name: draft.authorName.trim(), url: optional(draft.authorUrl) },
    links: { source: draft.source.trim(), docs: optional(draft.docs), install: optional(draft.install) },
    media: { video: optional(draft.video) },
    origin: { linkedinUrl: optional(draft.linkedinUrl) },
    addedAt: today,
    updatedAt: today,
  } as SkillFrontMatterInput;
  const text = renderSkillFile(data, draftBody(draft) || "## What it does");

  const issues: DraftIssue[] = [];
  const empty = new Set<DraftField>();
  for (const [field, message] of REQUIRED) {
    if (!String(draft[field]).trim()) {
      empty.add(field);
      issues.push({ field, message });
    }
  }
  try {
    parseSkill(text, `${slug}.md`);
  } catch (error) {
    if (!(error instanceof ContentError)) throw error;
    for (const issue of error.issues) {
      const at = issue.message.indexOf(": ");
      const path = at > 0 ? issue.message.slice(0, at).replace(/\.\d+$/, "") : "";
      const field = PATH_TO_FIELD[path] ?? "name";
      if (!empty.has(field)) issues.push({ field, message: at > 0 ? issue.message.slice(at + 2) : issue.message });
    }
  }
  return { slug, text, issues };
}

const MAX_URL_LENGTH = 7500;

/** Links that open GitHub with the new file filled in (forks for non-members), or a suggestion issue. */
export function githubLinks(repo: { url: string; branch: string } | null, slug: string, text: string, name: string) {
  if (!repo) return { pullRequest: null, issue: null, needsPaste: false };
  const filename = `content/skills/${slug}.md`;
  const full = `${repo.url}/new/${repo.branch}?${new URLSearchParams({ filename, value: text })}`;
  const short = `${repo.url}/new/${repo.branch}?${new URLSearchParams({ filename })}`;
  const pullRequest = full.length <= MAX_URL_LENGTH ? full : short;
  const issue = `${repo.url}/issues/new?${new URLSearchParams({ template: "suggest-skill.yml", title: `Suggest: ${name.trim() || "a skill"}` })}`;
  return { pullRequest, issue, needsPaste: pullRequest === short };
}
