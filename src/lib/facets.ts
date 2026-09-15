// Filter vocabularies other than categories. Pure data, shared by site, scripts and tests.

export const TYPE_KEYS = ["skill", "mcp", "agent", "prompt", "workflow", "hook", "plugin", "tool", "model", "resource"] as const;
export type SkillTypeKey = (typeof TYPE_KEYS)[number];
export const SKILL_TYPES: Record<SkillTypeKey, { name: string; description: string }> = {
  skill: { name: "Skill", description: "A skill folder with a SKILL.md file." },
  mcp: { name: "MCP server", description: "A Model Context Protocol server that gives an agent new tools." },
  agent: { name: "Agent", description: "A subagent or agent definition." },
  prompt: { name: "Prompt", description: "A single prompt or a prompt pack." },
  workflow: { name: "Workflow", description: "A multi-step recipe, pipeline or set of slash commands." },
  hook: { name: "Hook", description: "An automation that runs on agent events." },
  plugin: { name: "Plugin", description: "A bundle of skills, agents, commands and hooks." },
  tool: { name: "Tool / CLI", description: "A CLI, library or app that you use with an agent." },
  model: { name: "Model", description: "An open model, with code to run or fine-tune it." },
  resource: { name: "Learning resource", description: "A book, course or guided project." },
};

export const PLATFORM_KEYS = ["claude-code", "claude-ai", "codex", "cursor", "vscode", "windsurf", "chatgpt", "any"] as const;
export type PlatformKey = (typeof PLATFORM_KEYS)[number];
export const PLATFORMS: Record<PlatformKey, { name: string }> = {
  "claude-code": { name: "Claude Code" },
  "claude-ai": { name: "Claude.ai / Desktop" },
  codex: { name: "Codex" },
  cursor: { name: "Cursor" },
  vscode: { name: "VS Code / Copilot" },
  windsurf: { name: "Windsurf" },
  chatgpt: { name: "ChatGPT" },
  any: { name: "Any agent / LLM" },
};

export const DIFFICULTY_KEYS = ["beginner", "intermediate", "advanced"] as const;
export type DifficultyKey = (typeof DIFFICULTY_KEYS)[number];
export const DIFFICULTIES: Record<DifficultyKey, { name: string }> = {
  beginner: { name: "Beginner" },
  intermediate: { name: "Intermediate" },
  advanced: { name: "Advanced" },
};

export const PRICE_KEYS = ["free", "freemium", "paid"] as const;
export type PriceKey = (typeof PRICE_KEYS)[number];
export const PRICES: Record<PriceKey, { name: string }> = {
  free: { name: "Free" },
  freemium: { name: "Freemium" },
  paid: { name: "Paid" },
};

export const STATUS_KEYS = ["verified", "community", "experimental", "deprecated"] as const;
export type StatusKey = (typeof STATUS_KEYS)[number];
export const STATUSES: Record<StatusKey, { name: string; description: string }> = {
  verified: { name: "Verified", description: "Tested by the SkillHub curator." },
  community: { name: "Community", description: "Listed from public sources. Not tested by us yet." },
  experimental: { name: "Experimental", description: "Early or unstable. Expect changes." },
  deprecated: { name: "Deprecated", description: "Archived or replaced. Kept for reference." },
};

export const FRESHNESS_KEYS = ["fresh", "recent", "stale"] as const;
export type FreshnessKey = (typeof FRESHNESS_KEYS)[number];
export const FRESHNESS: Record<FreshnessKey, { name: string; description: string }> = {
  fresh: { name: "Updated < 30 days", description: "Active in the last 30 days." },
  recent: { name: "Updated < 6 months", description: "Active in the last 6 months." },
  stale: { name: "Stale", description: "No activity for 6 months or more." },
};
