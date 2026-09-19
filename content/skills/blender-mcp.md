---
slug: blender-mcp
name: Blender MCP
tagline: Control Blender with an LLM. Model objects, build scenes and change materials by describing what you want.
category: media
type: mcp
tags: [ 3d, blender, modeling ]
platforms: [ claude-ai, claude-code, codex, cursor ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: ahujasid
  url: https://github.com/ahujasid
links:
  source: https://github.com/ahujasid/blender-mcp
  install: claude mcp add blender uvx blender-mcp
metrics:
  githubStars: 28978
  lastCommit: 2026-09-16
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

A community plugin that connects Blender to your AI assistant. The model can create and change objects, build scenes and edit materials in a running Blender, from plain-language prompts.

## Why it is useful

- Fast blocking-out of scenes and props, even if you are new to Blender.
- You can mix prompting with normal hand editing in the same scene.

## How to use it

Install `uv` first (the README shows how). Then add the server and install the Blender add-on from the README:

```bash
claude mcp add blender uvx blender-mcp
```

## Watch out for

- It is a third-party integration, not made by Blender.
- The model can run Python code inside Blender. Save your work and use it only on files you trust.
