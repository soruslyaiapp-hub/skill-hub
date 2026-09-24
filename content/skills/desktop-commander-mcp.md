---
slug: desktop-commander-mcp
name: Desktop Commander MCP
tagline: Gives Claude Desktop terminal control, file system search and diff-based file editing on your own computer.
category: productivity
type: mcp
tags: [ terminal, files, desktop ]
platforms: [ claude-ai, any ]
difficulty: beginner
price: free
status: community
language: TypeScript
author:
  name: wonderwhy-er
  url: https://github.com/wonderwhy-er
links:
  source: https://github.com/wonderwhy-er/DesktopCommanderMCP
  install: npx @wonderwhy-er/desktop-commander@latest setup
metrics:
  githubStars: 9732
  lastCommit: 2026-09-24
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Desktop Commander turns a chat app like Claude Desktop into a coding and automation assistant. It can run terminal commands and processes, search the file system and edit files with diffs.

## Why it is useful

- Work on your real files through your chat subscription, instead of paying per API token.
- One setup command, with auto-updates.

## How to use it

```bash
npx @wonderwhy-er/desktop-commander@latest setup
```

Restart Claude Desktop and ask it to look at a folder on your computer.

## Watch out for

- It can run any command your user can run. Review commands before you approve them.
