---
slug: serena
name: Serena
tagline: An MCP toolkit that gives coding agents IDE-like, symbol-level code search and editing instead of reading whole files.
category: coding
type: mcp
tags: [ code-intelligence, lsp, refactoring, token-savings ]
platforms: [ claude-code, codex, cursor, any ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: oraios
  url: https://github.com/oraios
links:
  source: https://github.com/oraios/serena
metrics:
  githubStars: 29659
  lastCommit: 2026-09-19
  license: NOASSERTION
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Serena gives an agent semantic tools for code: find a symbol, find its references, and edit or refactor at the symbol level. It works on the structure of the code, much like an IDE, instead of text search over whole files.

## Why it is useful

- The agent reads only the code it needs, which saves tokens on large codebases.
- Edits are more precise, because they target symbols, not line numbers.

## How to use it

Add Serena as an MCP server in your client (the README has a command for each tool), then point it at your project.

## Watch out for

- It is most useful on medium and large codebases. On small projects the setup may not pay off.
- Language support depends on the language servers it can run.
