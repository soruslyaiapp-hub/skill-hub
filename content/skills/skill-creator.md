---
slug: skill-creator
name: Skill Creator
tagline: The official Anthropic skill for writing new Agent Skills, improving existing ones and measuring them with evals.
category: meta
type: skill
tags: [ agent-skills, evals, anthropic ]
platforms: [ claude-code, claude-ai ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: Anthropic
  url: https://github.com/anthropics
links:
  source: https://github.com/anthropics/skills/tree/main/skills/skill-creator
  docs: https://support.claude.com/en/articles/12512198-creating-custom-skills
  install: /plugin marketplace add anthropics/skills
metrics:
  githubStars: 177550
  lastCommit: 2026-09-10
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: true
---

## What it does

Skill Creator is a skill that builds skills. It walks Claude through deciding what a new skill should do, drafting the `SKILL.md`, writing test prompts, and then running and comparing versions until the skill works.

## Why it is useful

- It turns "write a skill" into a loop you can measure: a benchmark view shows pass rates, timing and token use for each version.
- It also improves skills you already have, not only new ones.
- The result is packaged as a `.skill` file that you can install or share.

## How to use it

In Claude Code, add the Anthropic marketplace, then install the skill from **Browse and install plugins**:

```bash
/plugin marketplace add anthropics/skills
```

Then ask Claude to "create a skill that ..." and follow its questions.

## Watch out for

- Good evals need real example prompts. Collect three to five real tasks before you start.
- The installed skill folder can be read-only. Copy it before you edit it by hand.
