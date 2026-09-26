---
slug: superpowers
name: Superpowers
tagline: A complete software-development method for coding agents, built from composable skills like planning, TDD and debugging.
category: agent-optimization
type: plugin
tags: [ methodology, planning, tdd, debugging ]
platforms: [ claude-code, codex, cursor ]
difficulty: intermediate
price: free
status: community
language: Shell
author:
  name: obra
  url: https://github.com/obra
links:
  source: https://github.com/obra/superpowers
  install: /plugin install superpowers@claude-plugins-official
metrics:
  githubStars: 291787
  lastCommit: 2026-09-25
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: true
---

## What it does

Superpowers gives your coding agent a way of working, not only a list of tricks. It is a set of composable skills plus starter instructions that make the agent use them: think through the problem first, write a plan, build test-first, and debug step by step.

## Why it is useful

- The agent stops jumping straight into code. It clarifies the task and plans before it edits.
- The skills compose, so the same method works on small fixes and large features.
- It is available in the official Claude Code plugin marketplace, and for Codex and Cursor.

## How to use it

In Claude Code:

```bash
/plugin install superpowers@claude-plugins-official
```

Start a new session and describe a feature. The agent now asks questions and proposes a plan before it writes code.

## Watch out for

- Install it once per harness. Each tool (Claude Code, Codex, Cursor) has its own install step.
- The method adds steps. For one-line fixes you can tell the agent to skip the plan.
