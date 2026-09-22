---
slug: notion-mcp
name: Notion MCP Server
tagline: The official Notion MCP server. Let your agent search, read and update the pages and databases in your workspace.
category: productivity
type: mcp
tags: [ notion, notes, knowledge-base ]
platforms: [ claude-ai, claude-code, cursor, any ]
difficulty: beginner
price: free
status: community
language: TypeScript
author:
  name: Notion
  url: https://github.com/makenotion
links:
  source: https://github.com/makenotion/notion-mcp-server
  install: npx @notionhq/notion-mcp-server
metrics:
  githubStars: 4642
  lastCommit: 2026-09-20
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Connects your agent to Notion, so it can search your workspace, read pages, and create or update pages and database entries.

## Why it is useful

- Your notes, specs and task lists become context the agent can use and keep up to date.
- It is official and maintained by Notion.

## How to use it

Notion now also offers a hosted remote MCP server with OAuth sign-in, which is the easiest setup. For this local server, create a Notion integration token and run:

```bash
npx @notionhq/notion-mcp-server
```

## Watch out for

- Share only the pages the agent needs with the integration.
