---
slug: figma-context-mcp
name: Figma Context MCP
tagline: Gives Cursor and other coding agents the layout data from your Figma files, so they build designs more accurately than from screenshots.
category: media
type: mcp
tags: [ figma, design-to-code, ui ]
platforms: [ cursor, claude-code, any ]
difficulty: beginner
price: free
status: community
language: TypeScript
author:
  name: GLips
  url: https://github.com/GLips
links:
  source: https://github.com/GLips/Figma-Context-MCP
metrics:
  githubStars: 15871
  lastCommit: 2026-09-16
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

This MCP server reads a Figma file through the Figma API and gives the agent a simplified version of the layout and styles. The agent then writes code from real design data.

## Why it is useful

- Much better first attempts at a design than pasting screenshots.
- The data is trimmed down to what matters for code, so it does not flood the context.

## How to use it

Create a Figma access token, add the server to your MCP client (see the README), then paste a Figma frame link into the chat and ask the agent to build it.

## Watch out for

- The Figma access token gives access to your files. Treat it like a password.
