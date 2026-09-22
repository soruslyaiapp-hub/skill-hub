---
slug: playwright-mcp
name: Playwright MCP
tagline: Microsoft's MCP server that lets an agent drive a real browser through the accessibility tree instead of screenshots.
category: coding
type: mcp
tags: [ browser-automation, testing, playwright ]
platforms: [ claude-code, codex, cursor, vscode, any ]
difficulty: beginner
price: free
status: community
language: TypeScript
author:
  name: Microsoft
  url: https://github.com/microsoft
links:
  source: https://github.com/microsoft/playwright-mcp
  docs: https://playwright.dev
  install: claude mcp add playwright npx @playwright/mcp@latest
metrics:
  githubStars: 37465
  lastCommit: 2026-09-18
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Playwright MCP gives an agent browser tools: open a page, click, type, read, and check results. It works on Playwright's accessibility tree, so the model reads structured page data instead of guessing from pixels.

## Why it is useful

- Fast and light: no vision model is needed to use a web page.
- Good for testing your own web app, reproducing bugs, and filling repetitive web forms.
- One `npx` command works in Claude Code, Codex, Cursor, VS Code and most other MCP clients.

## How to use it

```bash
claude mcp add playwright npx @playwright/mcp@latest
```

Then ask the agent to "open localhost:3000 and check that the sign-up form works".

## Watch out for

- For plain coding agents, Microsoft now suggests its Playwright CLI with skills, because CLI calls use fewer tokens than large MCP tool schemas.
- MCP is still the better fit for long, exploratory browser sessions that need state.
