/**
 * Refresh GitHub stats (stars, last commit, license, archived, language) in every skill file.
 *   npm run sync:github                      update the files
 *   npm run sync:github -- --dry-run         show what would change, write nothing (still uses API calls)
 *   npm run sync:github -- --only rtk,repomix
 * Set GITHUB_TOKEN for 5,000 requests per hour (60 without it).
 */
import fs from "node:fs";
import path from "node:path";
import { parseSkill } from "../src/lib/content/parse";
import { SKILLS_DIR } from "../src/lib/content/skills";
import { renderSkillFile } from "../src/lib/content/template";
import { parseGitHubRepo } from "./lib/github";

type RepoInfo = {
  full_name: string;
  stargazers_count: number;
  pushed_at: string | null;
  license: { spdx_id: string | null } | null;
  archived: boolean;
  language: string | null;
};
type FetchResult = { ok: true; info: RepoInfo } | { ok: false; status: number; limited: boolean };

async function fetchRepo(repo: string, token?: string): Promise<FetchResult> {
  const res = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "skillhub-sync",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (!res.ok) return { ok: false, status: res.status, limited: res.status === 403 || res.status === 429 };
  return { ok: true, info: (await res.json()) as RepoInfo };
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const onlyAt = args.indexOf("--only");
  const only = onlyAt >= 0 ? new Set((args[onlyAt + 1] ?? "").split(",")) : null;
  const token = process.env.GITHUB_TOKEN || undefined;

  const files = fs.readdirSync(SKILLS_DIR).filter((f) => f.endsWith(".md") && !f.startsWith("_")).sort();
  const cache = new Map<string, FetchResult>();
  let changed = 0;
  let failed = 0;

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    if (only && !only.has(slug)) continue;
    const fullPath = path.join(SKILLS_DIR, file);
    const source = fs.readFileSync(fullPath, "utf8");
    const skill = parseSkill(source, file);
    const repo = parseGitHubRepo(skill.links.source);
    if (!repo) {
      console.log(`- ${slug}: not a GitHub link, skipped`);
      continue;
    }

    const key = repo.toLowerCase();
    if (!cache.has(key)) cache.set(key, await fetchRepo(repo, token));
    const result = cache.get(key)!;
    if (!result.ok) {
      failed++;
      console.error(`✗ ${slug}: ${repo} returned HTTP ${result.status}${result.limited ? " (rate limited, stopping)" : ""}`);
      if (result.limited) break;
      continue;
    }

    const { info } = result;
    if (info.full_name.toLowerCase() !== key) console.log(`  note: ${repo} moved to ${info.full_name}. Update links.source.`);
    if (info.archived && skill.status !== "deprecated") console.log(`  note: ${slug} is archived. Consider status: deprecated.`);

    const { body, excerpt: _excerpt, ...data } = skill;
    void _excerpt;
    const metrics = {
      githubStars: info.stargazers_count,
      lastCommit: info.pushed_at ? info.pushed_at.slice(0, 10) : null,
      ...(info.license?.spdx_id ? { license: info.license.spdx_id } : {}),
      archived: info.archived,
    };
    const next = renderSkillFile({ ...data, language: data.language ?? info.language ?? undefined, metrics }, body);
    if (next === source) continue;

    changed++;
    const before = skill.metrics;
    console.log(`✓ ${slug}: stars ${before.githubStars ?? "?"} -> ${metrics.githubStars}, last commit ${before.lastCommit ?? "?"} -> ${metrics.lastCommit}`);
    if (!dryRun) fs.writeFileSync(fullPath, next);
  }

  console.log(`\n${changed} file(s) ${dryRun ? "would change" : "updated"}, ${failed} failed.`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
