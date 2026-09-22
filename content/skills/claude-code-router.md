---
slug: claude-code-router
name: Claude Code Router
tagline: Route Claude Code and other coding agents to the model providers you choose, with fail-over and per-task routing.
category: token-cost
type: tool
tags: [ model-routing, providers, cost ]
platforms: [ claude-code, codex ]
difficulty: intermediate
price: free
status: community
language: TypeScript
author:
  name: musistudio
  url: https://github.com/musistudio
links:
  source: https://github.com/musistudio/claude-code-router
  install: npm install -g @musistudio/claude-code-router
metrics:
  githubStars: 37371
  lastCommit: 2026-09-20
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Claude Code Router (CCR) sits between your coding agent and the model APIs. You connect providers once, then route requests to the model you want, fail over when one is down, and add capabilities with plugins.

## Why it is useful

- Send cheap background work to a cheaper model and keep the strong model for hard tasks.
- Try new providers without changing your agent setup.

## How to use it

```bash
npm install -g @musistudio/claude-code-router
```

Configure your providers, then start your agent through the router. The README has the command for each tool.

## Watch out for

- Other models may not follow the agent's tool format as well. Test on a small task first.
- You manage several API keys and bills instead of one.
