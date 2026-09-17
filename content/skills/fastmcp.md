---
slug: fastmcp
name: FastMCP
tagline: The fast, Pythonic way to build MCP servers and clients, now a full MCP application framework from Prefect.
category: meta
type: tool
tags: [ mcp, python, framework ]
platforms: [ any ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: Prefect
  url: https://github.com/PrefectHQ
links:
  source: https://github.com/PrefectHQ/fastmcp
  docs: https://gofastmcp.com
  install: pip install fastmcp
metrics:
  githubStars: 27704
  lastCommit: 2026-09-16
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

FastMCP turns Python functions into MCP tools with a decorator. It handles the protocol details, so you can focus on what the tools do. It covers servers, clients and interactive apps.

## Why it is useful

- A working MCP server in a few lines of Python.
- Built-in help for auth, testing and deployment.

## How to use it

```bash
pip install fastmcp
```

Decorate a function with `@mcp.tool`, then run the server.

## Watch out for

- FastMCP version 1 was folded into the official MCP Python SDK. Make sure the docs you read match the version you install.
