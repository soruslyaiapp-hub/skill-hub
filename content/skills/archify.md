---
slug: archify
name: Archify
tagline: An agent skill that turns a codebase or system description into a polished, interactive architecture diagram in one HTML file.
category: coding
type: skill
tags: [ architecture, diagrams, visualization ]
platforms: [ cursor, claude-code, codex, any ]
difficulty: beginner
price: free
status: community
language: JavaScript
author:
  name: tt-a1i
  url: https://github.com/tt-a1i
links:
  source: https://github.com/tt-a1i/archify
  install: npx skills add tt-a1i/archify -g
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7500885260323434496/
  postedAt: 2026-09-02
metrics:
  githubStars: 71958
  lastCommit: 2026-09-25
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Your agent produces typed JSON describing the system. Archify compiles it into an interactive HTML and SVG diagram for architecture, workflow, sequence, data-flow or lifecycle views.

## Why it is useful

- A shareable diagram instead of a wall of text in chat.
- No drawing editor to fight. Rendering and validation are deterministic.

## How to use it

```bash
npx skills add tt-a1i/archify -g
```

Then ask your agent to map your repo.

## Watch out for

- The diagram is only as accurate as the agent's understanding. Check it against the code.
