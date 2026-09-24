---
slug: orca
name: Orca
tagline: A desktop workspace for running a fleet of coding agents in parallel, each in its own git worktree, tracked in one place.
category: agent-optimization
type: tool
tags: [ parallel-agents, worktrees, desktop ]
platforms: [ claude-code, codex, any ]
difficulty: beginner
price: free
status: community
language: TypeScript
author:
  name: Stably AI
  url: https://github.com/stablyai
links:
  source: https://github.com/stablyai/orca
  install: brew install --cask stablyai/orca/orca
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7499798098148356096/
  postedAt: 2026-08-30
metrics:
  githubStars: 76928
  lastCommit: 2026-09-24
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Orca runs Claude Code, Codex, OpenCode or Pi side by side. Each agent gets its own isolated git worktree, and everything is tracked in one app.

## Why it is useful

- Fan one prompt out to several agents, compare the results, and merge the best one.
- Watch and steer agents from your phone, with a notice when one finishes.
- Uses your own agent subscriptions.

## How to use it

```bash
brew install --cask stablyai/orca/orca
```

## Watch out for

- Parallel agents multiply token use. Start with two.
