---
slug: claude-mem
name: Claude-Mem
tagline: Persistent memory for coding agents. It records what the agent did in each session and feeds the useful parts into the next one.
category: agent-optimization
type: plugin
tags: [ memory, context, sessions ]
platforms: [ claude-code, any ]
difficulty: beginner
price: free
status: community
language: TypeScript
author:
  name: thedotmack
  url: https://github.com/thedotmack
links:
  source: https://github.com/thedotmack/claude-mem
  install: npx claude-mem install
metrics:
  githubStars: 94713
  lastCommit: 2026-09-26
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: true
---

## What it does

Claude-Mem captures what your agent does during a session, compresses it, and brings the relevant parts back in future sessions. The agent starts each session knowing what happened before.

## Why it is useful

- Less time re-explaining the project at the start of every session.
- It is a Claude Code plugin, and the installer also supports other agent tools.

## How to use it

```bash
npx claude-mem install
```

Or, inside Claude Code: `/plugin marketplace add thedotmack/claude-mem`.

## Watch out for

- Memory can go stale. Review or clear it when the project changes direction.
- It keeps a record of your sessions. Keep secrets out of prompts.
