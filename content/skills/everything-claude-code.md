---
slug: everything-claude-code
name: ECC (Everything Claude Code)
tagline: A large, battle-tested kit of agents, skills, hooks and commands that tunes Claude Code for quality, security and cost.
category: agent-optimization
type: plugin
tags: [ harness, agents, hooks, skills ]
platforms: [ claude-code, codex ]
difficulty: intermediate
price: free
status: community
language: JavaScript
author:
  name: affaan-m
  url: https://github.com/affaan-m
links:
  source: https://github.com/affaan-m/ECC
  install: npx ecc-universal setup
metrics:
  githubStars: 259585
  lastCommit: 2026-09-15
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: true
---

## What it does

ECC is a full harness for your coding agent. It ships specialist subagents (planner, code reviewer, security reviewer, build fixers), skills, slash commands and hooks. The project describes itself as an agent harness performance system: skills, instincts, memory, security and research-first development.

## Why it is useful

- You get a working setup for planning, TDD, reviews and security checks without writing each piece yourself.
- Hooks add guard rails, for example checks before risky shell commands.
- It installs for more than one harness, including Codex.

## How to use it

```bash
npx ecc-universal setup
```

The guided installer (`install --guided`) lets you pick only the parts you want.

## Watch out for

- It is big. Start with a small profile and add parts as you need them, or your context fills up with instructions.
- Hooks change how the agent behaves. Read what each hook does before you turn it on.
