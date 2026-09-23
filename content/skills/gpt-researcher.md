---
slug: gpt-researcher
name: GPT Researcher
tagline: An open deep-research agent that searches the web and your local files and writes a detailed report with citations.
category: data-research
type: agent
tags: [ deep-research, reports, citations, python ]
platforms: [ any, claude-code ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: assafelovic
  url: https://github.com/assafelovic
links:
  source: https://github.com/assafelovic/gpt-researcher
  install: pip install gpt-researcher
metrics:
  githubStars: 29580
  lastCommit: 2026-08-27
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

GPT Researcher plans a research task, runs many searches, reads the sources and writes a detailed report with citations. It can research the web, your local documents, or both.

## Why it is useful

- Hours of reading become a first-draft report in minutes.
- Claims link back to sources, so you can check them.
- It works with many LLM and search providers.

## How to use it

```bash
pip install gpt-researcher
```

Set your LLM and search API keys, then run it from Python or the web app. It is also available as a skill: `npx skills add assafelovic/gpt-researcher`.

## Watch out for

- A deep report makes many LLM calls. Set a budget.
- Check the sources. Search results can be wrong or biased.
