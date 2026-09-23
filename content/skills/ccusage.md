---
slug: ccusage
name: ccusage
tagline: A CLI that reads your local Claude Code logs and shows token use and estimated cost by day, month and session.
category: token-cost
type: tool
tags: [ usage, cost-tracking, cli, reports ]
platforms: [ claude-code ]
difficulty: beginner
price: free
status: community
language: Rust
author:
  name: ccusage
  url: https://github.com/ccusage
links:
  source: https://github.com/ccusage/ccusage
  install: npx ccusage@latest
metrics:
  githubStars: 18696
  lastCommit: 2026-09-23
  license: NOASSERTION
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

ccusage analyzes the usage logs that Claude Code already writes on your machine. It turns them into clear reports: tokens and estimated cost per day, per month and per session.

## Why it is useful

- You see where your tokens go before you try to cut them.
- It runs locally with one command. No account and no setup.

## How to use it

```bash
npx ccusage@latest
npx ccusage@latest monthly
```

## Watch out for

- Costs are estimates based on public API prices. Subscription plans bill differently.
