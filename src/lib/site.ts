// Single source of truth for site-wide settings. Rename the site here.

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

const repo = process.env.NEXT_PUBLIC_GITHUB_REPO ?? "OWNER/skill-hub";

export const site = {
  name: "SkillHub",
  tagline: "The open directory of AI skills, agents and MCP servers.",
  description:
    "Find, compare and install AI skills, agents, MCP servers and prompts — sorted by the job they do.",
  url: resolveSiteUrl(),
  repo,
  repoUrl: `https://github.com/${repo}`,
  isRepoConfigured: !repo.startsWith("OWNER/"),
  defaultBranch: "main",
} as const;

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
