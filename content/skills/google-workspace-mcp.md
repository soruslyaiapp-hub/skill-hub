---
slug: google-workspace-mcp
name: Google Workspace MCP
tagline: Control Gmail, Calendar, Drive, Docs, Sheets, Slides and more with natural language from any MCP client.
category: productivity
type: mcp
tags: [ gmail, calendar, google-drive, docs ]
platforms: [ claude-ai, claude-code, codex, any ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: taylorwilsdon
  url: https://github.com/taylorwilsdon
links:
  source: https://github.com/taylorwilsdon/google_workspace_mcp
  install: uvx workspace-mcp --tool-tier core
metrics:
  githubStars: 3185
  lastCommit: 2026-09-17
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

A full-featured MCP server for Google Workspace: Gmail, Calendar, Drive, Docs, Sheets, Slides, Forms, Tasks, Contacts and Chat. It also includes a CLI and a code mode for tools like Claude Code and Codex.

## Why it is useful

- One server covers most of your daily Google apps.
- Tool tiers (core, extended, complete) load only what you need, which keeps the tool list and token cost down.

## How to use it

Create Google OAuth credentials (the README walks you through it), then run:

```bash
uvx workspace-mcp --tool-tier core
```

## Watch out for

- The agent can read and send email as you. Start with read-only tasks and confirm every send.
