---
slug: markitdown
name: MarkItDown
tagline: Microsoft's lightweight Python tool that converts PDFs, Office files and more into clean Markdown for LLMs.
category: data-research
type: tool
tags: [ conversion, pdf, office, markdown, python ]
platforms: [ any ]
difficulty: beginner
price: free
status: community
language: Python
author:
  name: Microsoft
  url: https://github.com/microsoft
links:
  source: https://github.com/microsoft/markitdown
  install: pip install 'markitdown[all]'
metrics:
  githubStars: 186537
  lastCommit: 2026-09-21
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: true
---

## What it does

MarkItDown converts many file types (PDF, Word, PowerPoint, Excel and more) to Markdown that keeps the structure: headings, lists, tables and links. That is the format LLMs read best.

## Why it is useful

- One tool for most of the documents you want to feed to a model.
- Markdown is compact, so you spend fewer tokens than with raw HTML.

## How to use it

```bash
pip install 'markitdown[all]'
markitdown report.pdf > report.md
```

## Watch out for

- It reads files with the permissions of your user. The README warns you to sanitize untrusted input.
- Scanned PDFs need the separate OCR add-on.
