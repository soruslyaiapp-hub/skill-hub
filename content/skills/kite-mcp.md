---
slug: kite-mcp
name: Kite MCP Server
tagline: Hosted MCP server that lets Claude, ChatGPT, Cursor or Codex draw real, editable layers in a Kite design file your team edits live.
category: media
type: mcp
tags: [ design, ui, figma-alternative, design-to-code ]
platforms: [ claude-ai, claude-code, chatgpt, cursor, codex, any ]
difficulty: beginner
price: freemium
status: community
author:
  name: Kite
  url: https://kite.new
links:
  source: https://github.com/kitedotnew/kite-agent-plugins
  docs: https://kite.new/docs/mcp
  install: https://kite.new/api/mcp
addedAt: 2026-11-25
updatedAt: 2026-11-25
---

## What it does

Connects your agent to Kite, a browser and desktop design tool. The agent creates and edits real layers (frames, text, components, auto layout) in the same file your team is editing, instead of handing back a screenshot or a code blob.

## Why it is useful

- Design work done by the agent stays editable by people, on the same canvas.
- Any frame can be copied to Figma, or as HTML, React or Tailwind, when it is time to build.

## How to use it

Add the remote MCP server URL `https://kite.new/api/mcp` in your client (Claude, ChatGPT, Cursor, Codex or any MCP client) and sign in with OAuth. The plugin repo has ready-made configs: https://github.com/kitedotnew/kite-agent-plugins

## Watch out for

- The free plan allows 100 agent actions a day and 3 files; Pro is $16 per editor a month billed yearly.
- The server is hosted by Kite, so your design content is sent to Kite's service.
