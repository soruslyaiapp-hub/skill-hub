---
slug: repomix
name: Repomix
tagline: Packs a whole repository into one AI-friendly file, with token counts, so you can hand a codebase to any LLM.
category: token-cost
type: tool
tags: [ context, codebase, packing, cli ]
platforms: [ any ]
difficulty: beginner
price: free
status: community
language: TypeScript
author:
  name: yamadashy
  url: https://github.com/yamadashy
links:
  source: https://github.com/yamadashy/repomix
  install: npx repomix@latest
metrics:
  githubStars: 28407
  lastCommit: 2026-09-19
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: true
---

## What it does

Repomix walks your repository and writes one file with its structure and contents, ready to give to Claude, ChatGPT or any other model.

## Why it is useful

- It shows token counts per file, so you can see what is expensive and leave it out.
- It respects `.gitignore` and supports include and ignore patterns, so the pack stays lean.
- It also works on remote repositories.

## How to use it

```bash
npx repomix@latest
```

Run it in the project folder. Homebrew and Docker installs are also available.

## Watch out for

- A full repo can still be huge. Use include and ignore patterns to pack only what the task needs.
- Check the output for secrets before you share it.
