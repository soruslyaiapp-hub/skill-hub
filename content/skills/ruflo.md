---
slug: ruflo
name: RuFlo (formerly Claude Flow)
tagline: An agent meta-harness for Claude Code and Codex that runs coordinated swarms of agents with shared memory.
category: agent-optimization
type: plugin
tags: [ multi-agent, swarms, orchestration, memory ]
platforms: [ claude-code, codex ]
difficulty: advanced
price: free
status: community
language: TypeScript
author:
  name: ruvnet
  url: https://github.com/ruvnet
links:
  source: https://github.com/ruvnet/ruflo
  install: npx ruflo init
metrics:
  githubStars: 73235
  lastCommit: 2026-09-24
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

RuFlo (the project formerly called Claude Flow) coordinates many agents at once. It sets up swarms that split the work, share memory and run workflows on top of Claude Code or Codex.

## Why it is useful

- Big tasks can be split across specialist agents that work in parallel.
- Shared memory, including a RAG memory plugin, lets agents build on earlier work.

## How to use it

```bash
npx ruflo init
```

Or install the Claude Code plugins: `/plugin marketplace add ruvnet/ruflo`, then `/plugin install ruflo-core@ruflo`.

## Watch out for

- Many agents means many tokens. Watch your usage on the first runs.
- This is an advanced tool. Get comfortable with single-agent workflows first.
