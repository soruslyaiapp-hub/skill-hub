// The fixed vocabulary of the directory. Keys are stored in skill files; labels are shown in the UI.
// Pure data only: this module is shared by the site, the scripts and the tests.

export const CATEGORY_KEYS = [
  "agent-optimization",
  "token-cost",
  "coding",
  "media",
  "content",
  "data-research",
  "business",
  "devops",
  "security",
  "productivity",
  "integrations",
  "meta",
] as const;
export type CategoryKey = (typeof CATEGORY_KEYS)[number];

export type CategoryMeta = {
  key: CategoryKey;
  name: string;
  short: string;
  description: string;
  /** OKLCH hue (0-360) used to tint the category in both themes. */
  hue: number;
};

export const CATEGORIES: Record<CategoryKey, CategoryMeta> = {
  "agent-optimization": {
    key: "agent-optimization",
    name: "Agent Optimization",
    short: "Agents",
    description: "Orchestration, multi-agent setups, planning, memory and self-improvement.",
    hue: 295,
  },
  "token-cost": {
    key: "token-cost",
    name: "Token & Cost Optimization",
    short: "Token & Cost",
    description: "Context compression, caching, model routing and usage tracking.",
    hue: 85,
  },
  coding: {
    key: "coding",
    name: "Coding & Engineering",
    short: "Coding",
    description: "Code review, debugging, testing, refactors and code intelligence.",
    hue: 265,
  },
  media: {
    key: "media",
    name: "Media & Creative",
    short: "Media",
    description: "Video editing, images, audio, 3D, design and motion.",
    hue: 355,
  },
  content: {
    key: "content",
    name: "Content & Writing",
    short: "Content",
    description: "Documents, slides, docs, newsletters and social posts.",
    hue: 55,
  },
  "data-research": {
    key: "data-research",
    name: "Data & Research",
    short: "Data",
    description: "Scraping, file conversion, deep research, search and spreadsheets.",
    hue: 205,
  },
  business: {
    key: "business",
    name: "Business & Ops",
    short: "Business",
    description: "Sales, marketing, payments, brand and support.",
    hue: 145,
  },
  devops: {
    key: "devops",
    name: "DevOps & Infra",
    short: "DevOps",
    description: "Cloud, infrastructure as code, Kubernetes and monitoring.",
    hue: 235,
  },
  security: {
    key: "security",
    name: "Security & Compliance",
    short: "Security",
    description: "Security review, vulnerability research and audits.",
    hue: 25,
  },
  productivity: {
    key: "productivity",
    name: "Productivity & Personal",
    short: "Productivity",
    description: "Email, calendar, notes, files, the desktop and the browser.",
    hue: 115,
  },
  integrations: {
    key: "integrations",
    name: "Integrations & Connectors",
    short: "Integrations",
    description: "MCP servers and connectors for the tools you already use.",
    hue: 175,
  },
  meta: {
    key: "meta",
    name: "Meta / Skill Building",
    short: "Meta",
    description: "Tools that build skills and servers, plus prompt and eval tooling.",
    hue: 325,
  },
};

export const categoryList: CategoryMeta[] = CATEGORY_KEYS.map((key) => CATEGORIES[key]);
