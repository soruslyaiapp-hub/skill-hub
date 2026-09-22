---
slug: omniroute
name: OmniRoute
tagline: A free AI gateway with one OpenAI-compatible endpoint that routes across hundreds of providers, many with free tiers.
category: token-cost
type: tool
tags: [ ai-gateway, free-tiers, model-routing ]
platforms: [ claude-code, codex, cursor, any ]
difficulty: intermediate
price: free
status: community
language: TypeScript
author:
  name: diegosouzapw
  url: https://github.com/diegosouzapw
links:
  source: https://github.com/diegosouzapw/OmniRoute
  install: npm install -g omniroute
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7487836056537493506/
  postedAt: 2026-07-28
metrics:
  githubStars: 69076
  lastCommit: 2026-09-22
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

OmniRoute puts many AI providers behind a single endpoint. It tracks the free tiers you have, fails over when a provider hits a rate limit, and shows everything on one dashboard.

## Why it is useful

- Stops coding sessions dying mid-task on a rate limit.
- Works with Claude Code, Codex, Cursor and other agents, and it also exposes an MCP endpoint.

## How to use it

```bash
npm install -g omniroute
```

Add your provider keys in the dashboard, then point your agent at the local endpoint.

## Watch out for

- Free tiers and provider terms change. Check them before you depend on one.
