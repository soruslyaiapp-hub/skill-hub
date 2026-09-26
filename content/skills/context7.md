---
slug: context7
name: Context7
tagline: Pulls up-to-date, version-specific library docs and code examples straight into your agent's prompt.
category: coding
type: mcp
tags: [ documentation, libraries, hallucinations ]
platforms: [ claude-code, cursor, vscode, any ]
difficulty: beginner
price: free
status: community
language: TypeScript
author:
  name: Upstash
  url: https://github.com/upstash
links:
  source: https://github.com/upstash/context7
  install: npx ctx7 setup
metrics:
  githubStars: 62433
  lastCommit: 2026-09-26
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: true
---

## What it does

Models often know an old version of a library, or invent APIs that do not exist. Context7 fetches current documentation and code examples for the library and version you use, and places them in the prompt.

## Why it is useful

- Fewer made-up functions and outdated patterns.
- Works with the major coding agents through MCP.

## How to use it

```bash
npx ctx7 setup
```

Then ask your agent to use Context7 when you work with a library.

## Watch out for

- It adds documentation to your context, which costs tokens. Ask for the topic you need, not the whole library.
