# Contributing to SkillCurio

Thank you for helping. SkillCurio is a curated list, so every entry is reviewed before it goes live.

## Three ways to add a skill

1. **The web form (easiest).** Open `/submit` on the site and fill it in. It builds the file and opens a pull request on GitHub for you.
2. **The terminal.** Clone the repo, run `npm install`, then `npm run new-skill`. Answer the questions, write the body, and open a pull request.
3. **An issue.** Not ready for a pull request? Open a "Suggest a skill" issue with the link and one sentence on why it is useful.

## What makes a good entry

- **Public and working.** It links to its source, usually a GitHub repo.
- **One primary category: the job it does, not the tool it uses.** A video pipeline built with Remotion goes in Media, not Coding.
- **An honest tagline.** One sentence, 10 to 140 characters. Say what it does. Skip words like "revolutionary" or "10x".
- **A short write-up in four parts:** What it does, Why it is useful, How to use it, Watch out for.
- **https links only.**
- **`status: community`.** Only the curator sets `verified`, after testing it.
- **Leave `metrics` alone.** A nightly job fills stars, last commit and licence from GitHub.

## The skill file

One Markdown file per skill in `content/skills/<slug>.md`. The slug must match the file name.

```yaml
---
slug: repomix
name: Repomix
tagline: Packs a whole repository into one AI-friendly file, with token counts.
category: token-cost
type: tool
tags: [ context, codebase ]
platforms: [ any ]
difficulty: beginner
price: free
status: community
author:
  name: yamadashy
  url: https://github.com/yamadashy
links:
  source: https://github.com/yamadashy/repomix
  install: npx repomix@latest
addedAt: 2026-09-15
updatedAt: 2026-09-15
---

## What it does
...
```

Optional fields: `language`, `links.docs`, `media.video` (YouTube, Loom or Vimeo), `media.cover`, `media.screenshots`, `origin.linkedinUrl`, `origin.postedAt`, `featured`.
The full rules live in `src/lib/content/schema.ts`. Unknown keys are rejected, so typos fail fast.

## Before you open a pull request

```bash
npm run validate
npm test
```

CI runs these checks, plus lint, the type check and a full build, on every pull request.

## Working on the site

- `npm run dev` starts the dev server on http://localhost:3000.
- Pure logic lives in `src/lib`, with unit tests next to it.
- UI components are in `src/components`. Pages are in `src/app`.
- Keep pages static. Read content only through `src/lib/content/skills.ts`.
- Skill bodies are plain Markdown on purpose: a pull request cannot run code at build time.

## Be kind

Review the entry, not the person. Be specific. Assume good intent.
