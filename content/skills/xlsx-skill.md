---
slug: xlsx-skill
name: Excel Spreadsheets (xlsx) Skill
tagline: The Anthropic skill for opening, fixing and building spreadsheets with working formulas and clean formatting.
category: data-research
type: skill
tags: [ excel, spreadsheets, csv, anthropic ]
platforms: [ claude-code, claude-ai ]
difficulty: beginner
price: free
status: community
language: Python
author:
  name: Anthropic
  url: https://github.com/anthropics
links:
  source: https://github.com/anthropics/skills/tree/main/skills/xlsx
  install: /plugin marketplace add anthropics/skills
metrics:
  githubStars: 177550
  lastCommit: 2026-09-10
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

This skill covers any task where a spreadsheet is the main input or output: open `.xlsx`, `.csv` or `.tsv` files, add columns, compute formulas, fix formatting, or build a new workbook.

## Why it is useful

- Claude writes real formulas, so the sheet stays live when the numbers change.
- It can turn a messy CSV export into a tidy workbook.

## How to use it

```bash
/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills
```

## Watch out for

- Check the formulas on a copy before you trust them with real money.
