/**
 * Check every external link in the skill files.
 *   npm run check:links
 *   npm run check:links -- --report link-report.md    also write a Markdown report
 * linkedin.com links are skipped because LinkedIn blocks automated requests.
 */
import fs from "node:fs";
import { loadSkills } from "../src/lib/content/skills";
import { collectLinks } from "./lib/links";

const CONCURRENCY = 6;
const TIMEOUT_MS = 15_000;
const HEADERS = { "User-Agent": "Mozilla/5.0 (compatible; SkillHubLinkCheck/1.0)" };

type Result = { status: number | string; ok: boolean };

async function request(url: string, method: "HEAD" | "GET"): Promise<number> {
  const res = await fetch(url, { method, redirect: "follow", headers: HEADERS, signal: AbortSignal.timeout(TIMEOUT_MS) });
  await res.body?.cancel();
  return res.status;
}

async function check(url: string): Promise<Result> {
  try {
    let status = await request(url, "HEAD");
    if (status >= 400) status = await request(url, "GET"); // many servers mishandle HEAD
    return { status, ok: status < 400 || status === 429 }; // 429 means "slow down", not "gone"
  } catch (error) {
    return { status: error instanceof Error ? error.name : "error", ok: false };
  }
}

async function main() {
  const reportAt = process.argv.indexOf("--report");
  const reportPath = reportAt >= 0 ? process.argv[reportAt + 1] : undefined;
  const links = collectLinks(loadSkills());
  const unique = [...new Set(links.map((l) => l.url))];
  const results = new Map<string, Result>();

  let cursor = 0;
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (cursor < unique.length) {
        const url = unique[cursor++];
        results.set(url, await check(url));
      }
    }),
  );

  const broken = links.filter((l) => !results.get(l.url)?.ok);
  console.log(`Checked ${unique.length} unique links from ${links.length} fields.`);
  if (broken.length === 0) {
    console.log("✓ No broken links.");
    return;
  }
  const rows = broken.map((l) => `| ${l.slug} | ${l.field} | ${l.url} | ${results.get(l.url)?.status} |`);
  const report = ["## Broken links", "", "| Skill | Field | URL | Status |", "|---|---|---|---|", ...rows, ""].join("\n");
  console.error(report);
  if (reportPath) fs.writeFileSync(reportPath, report);
  process.exitCode = 1;
}

main();
