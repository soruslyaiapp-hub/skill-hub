#!/usr/bin/env node
// SkillHub CLI: search the directory and install a skill. No dependencies.
import { spawn } from "node:child_process";
import { createInterface } from "node:readline/promises";

const API = process.env.SKILLHUB_API || "https://skill-hub-teal.vercel.app/api/skills.json";

const HELP = `skillhub: search and install AI skills

Usage:
  skillhub search <words>   find skills
  skillhub info <slug>      show one skill
  skillhub add <slug>       show the install command, then run it if you say yes

Data comes from SKILLHUB_API (now: ${API}).`;

async function loadSkills() {
  let res;
  try {
    res = await fetch(API);
  } catch {
    throw new Error(`Could not reach ${API}. Is the site up? Set SKILLHUB_API to your SkillHub site.`);
  }
  if (!res.ok) throw new Error(`Could not load ${API} (HTTP ${res.status}). Set SKILLHUB_API to your SkillHub site.`);
  return (await res.json()).skills;
}

function score(skill, words) {
  const haystack = [skill.name, skill.tagline, skill.categoryName, ...skill.tags].join(" ").toLowerCase();
  if (!words.every((w) => haystack.includes(w))) return 0;
  return words.reduce((total, w) => total + (skill.name.toLowerCase().includes(w) ? 3 : 1), 0);
}

function findSkill(skills, slug) {
  const skill = skills.find((s) => s.slug === slug);
  if (!skill) throw new Error(`No skill "${slug}". Try: skillhub search ${slug}`);
  return skill;
}

async function confirm(question) {
  if (!process.stdin.isTTY) return false;
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(question);
  rl.close();
  return /^y(es)?$/i.test(answer.trim());
}

async function main() {
  const [command, ...rest] = process.argv.slice(2);
  if (!command || command === "help" || command === "--help") return console.log(HELP);
  const skills = await loadSkills();

  if (command === "search") {
    const words = rest.join(" ").toLowerCase().split(/\s+/).filter(Boolean);
    const hits = skills.map((s) => [score(s, words), s]).filter(([n]) => n > 0).sort((a, b) => b[0] - a[0]).slice(0, 10);
    if (hits.length === 0) return console.log("No matches.");
    for (const [, s] of hits) console.log(`${s.slug.padEnd(30)} ${s.tagline}`);
    return;
  }

  const skill = findSkill(skills, rest[0]);
  if (command === "info") {
    console.log(`${skill.name}\n${skill.tagline}\n`);
    console.log(`Category:   ${skill.categoryName}\nType:       ${skill.typeName}\nWorks with: ${skill.platformNames.join(", ")}`);
    console.log(`Install:    ${skill.install ?? "see the source"}\nSource:     ${skill.source}\nPage:       ${skill.url}`);
    return;
  }

  if (command === "add") {
    if (!skill.install) return console.log(`No install command listed. Follow the source: ${skill.source}`);
    console.log(`\n  ${skill.install}\n`);
    console.log("Read the command first. It comes from the SkillHub listing and runs on your machine.");
    if (!(await confirm("Run it now? [y/N] "))) return console.log("Not run. Copy the command above if you want it.");
    const child = spawn(skill.install, { shell: true, stdio: "inherit" });
    child.on("exit", (code) => process.exit(code ?? 0));
    return;
  }

  console.log(HELP);
  process.exitCode = 1;
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
