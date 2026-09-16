---
slug: mcp-inspector
name: MCP Inspector
tagline: The official tool for testing and debugging MCP servers, with a web UI, a CLI and a terminal UI.
category: meta
type: tool
tags: [ mcp, debugging, testing ]
platforms: [ any ]
difficulty: beginner
price: free
status: community
language: TypeScript
author:
  name: Model Context Protocol
  url: https://github.com/modelcontextprotocol
links:
  source: https://github.com/modelcontextprotocol/inspector
  install: npx @modelcontextprotocol/inspector
metrics:
  githubStars: 10887
  lastCommit: 2026-09-16
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

MCP Inspector connects to any MCP server and shows what it offers: tools, resources and prompts. You can call each tool by hand and see the requests and responses.

## Why it is useful

- Find out if a bug is in your server or in the agent.
- Test a new server before you give it to a model.

## How to use it

```bash
npx @modelcontextprotocol/inspector
npx @modelcontextprotocol/inspector --cli
npx @modelcontextprotocol/inspector --tui
```

The first command opens the web UI. The other two give a CLI for scripts and a terminal UI.

## Watch out for

- Run it only on your own machine. It can start local server processes.
