---
slug: mcp-builder
name: MCP Builder
tagline: The Anthropic skill that guides Claude through designing and building high-quality MCP servers in Python or TypeScript.
category: meta
type: skill
tags: [ mcp, server-development, anthropic ]
platforms: [ claude-code, claude-ai ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: Anthropic
  url: https://github.com/anthropics
links:
  source: https://github.com/anthropics/skills/tree/main/skills/mcp-builder
  install: /plugin marketplace add anthropics/skills
metrics:
  githubStars: 177225
  lastCommit: 2026-09-10
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

MCP Builder is a guide in skill form. It walks Claude through building an MCP server that wraps an external API: planning the tools, writing them in Python (FastMCP) or TypeScript, and testing them.

## Why it is useful

- Good tool design (clear names, focused inputs, useful errors) is the hard part of MCP. This skill builds it in.
- It ends with testing in the MCP Inspector, so you ship a server that works.

## How to use it

```bash
/plugin marketplace add anthropics/skills
```

Then ask Claude to build an MCP server for the API you want to connect.

## Watch out for

- You still own the API keys and the security of what the server can do.
