---
slug: spec-kit
name: Spec Kit
tagline: GitHub's toolkit for spec-driven development. Write the spec first, then let the agent plan, split the work into tasks and build.
category: agent-optimization
type: workflow
tags: [ spec-driven, planning, methodology ]
platforms: [ claude-code, codex, cursor, vscode ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: GitHub
  url: https://github.com/github
links:
  source: https://github.com/github/spec-kit
metrics:
  githubStars: 136883
  lastCommit: 2026-09-14
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Spec Kit turns loose prompting into a repeatable process. You describe what you want in a specification, and the agent follows a fixed flow: spec, technical plan, task list, then implementation. Each step writes a file you can review.

## Why it is useful

- The agent builds from an agreed spec instead of guessing, so large features drift less.
- The spec and the plan stay in the repo as living documentation.
- It works with many coding agents, not only one vendor.

## How to use it

Install the `specify` CLI as shown in the README, then run `specify init` in your project. Use the slash commands it adds to move from spec to plan to tasks.

## Watch out for

- The process adds overhead. It pays off on multi-day features, less on small fixes.
- Version 1.0.0 shipped in August 2026. Older blog posts may show outdated commands.
