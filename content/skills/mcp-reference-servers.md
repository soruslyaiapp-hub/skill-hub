---
slug: mcp-reference-servers
name: MCP Reference Servers
tagline: The official reference MCP servers, such as Filesystem, Git, Fetch and Memory, from the Model Context Protocol project.
category: integrations
type: mcp
tags: [ mcp, reference, filesystem, git ]
platforms: [ any ]
difficulty: beginner
price: free
status: community
language: TypeScript
author:
  name: Model Context Protocol
  url: https://github.com/modelcontextprotocol
links:
  source: https://github.com/modelcontextprotocol/servers
  docs: https://modelcontextprotocol.io
  install: npx -y @modelcontextprotocol/server-memory
metrics:
  githubStars: 90429
  lastCommit: 2026-09-03
  license: NOASSERTION
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

This repository holds reference implementations of MCP servers. They show how the protocol works and cover basic jobs such as file access, Git, fetching web pages and a simple knowledge-graph memory.

## Why it is useful

- Small, readable servers: a good place to learn MCP.
- Useful building blocks that you can run as they are.

## How to use it

Each server has its own folder and command, for example:

```bash
npx -y @modelcontextprotocol/server-memory
uvx mcp-server-git
```

## Watch out for

- They are references, not hardened products. To find more servers, use the official MCP Registry.
