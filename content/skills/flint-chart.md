---
slug: flint-chart
name: Flint
tagline: Microsoft's chart language that lets AI agents produce polished charts from short, human-editable specs.
category: data-research
type: tool
tags: [ charts, data-visualization, mcp ]
platforms: [ claude-code, any ]
difficulty: intermediate
price: free
status: community
language: TypeScript
author:
  name: Microsoft
  url: https://github.com/microsoft
links:
  source: https://github.com/microsoft/flint-chart
  docs: https://microsoft.github.io/flint-chart/
  install: npm install flint-chart
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7488632034689462272/
  postedAt: 2026-07-30
metrics:
  githubStars: 4233
  lastCommit: 2026-09-16
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Flint is a visualization language for agents. The agent writes a compact spec that says what it means, and the Flint compiler handles axes, spacing, labels and layout.

## Why it is useful

- Agents stop drowning in verbose chart configuration.
- More than 70 semantic types, such as Rank, Temperature and Country, help charts look right by default.
- Specs stay short enough for a human to edit.

## How to use it

```bash
npm install flint-chart
```

For agents, run the MCP server with `npx -y flint-chart-mcp`.

## Watch out for

- It is a new language. Check the site's examples before building on it.
