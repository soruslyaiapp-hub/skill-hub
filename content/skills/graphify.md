---
slug: graphify
name: Graphify
tagline: Type /graphify in your coding assistant and it maps code, docs, PDFs, images and video into a knowledge graph you can query.
category: coding
type: skill
tags: [ knowledge-graph, codebase, tree-sitter ]
platforms: [ claude-code, codex, cursor, any ]
difficulty: beginner
price: free
status: community
language: Python
author:
  name: Graphify Labs
  url: https://github.com/Graphify-Labs
links:
  source: https://github.com/Graphify-Labs/graphify
  install: pip install graphifyy
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7483062702895140864/
  postedAt: 2026-07-15
metrics:
  githubStars: 118718
  lastCommit: 2026-09-16
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Graphify turns a folder of code, SQL, scripts, docs, papers, images or videos into a knowledge graph. You query the graph instead of grepping through files. Code is parsed locally with tree-sitter.

## Why it is useful

- A real graph you can traverse, not only a vector index.
- Code, docs and media end up in one place, so the agent sees how they connect.
- Works in Claude Code, Codex, OpenCode, Cursor, Gemini CLI and more.

## How to use it

```bash
pip install graphifyy
```

Then type `/graphify` in your coding assistant. The README recommends installing with `uv`.

## Watch out for

- The Python package name is `graphifyy`, with two y's.
- Indexing a large project takes time. Start with one folder.
