---
slug: chrome-devtools-mcp
name: Chrome DevTools MCP
tagline: The official Chrome DevTools server for coding agents. Control and inspect a live Chrome with console, network and performance tools.
category: coding
type: mcp
tags: [ debugging, performance, browser, devtools ]
platforms: [ claude-code, cursor, vscode, any ]
difficulty: beginner
price: free
status: community
language: TypeScript
author:
  name: ChromeDevTools
  url: https://github.com/ChromeDevTools
links:
  source: https://github.com/ChromeDevTools/chrome-devtools-mcp
  install: claude mcp add chrome-devtools npx chrome-devtools-mcp@latest
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7501610032850190337/
  postedAt: 2026-09-04
metrics:
  githubStars: 52103
  lastCommit: 2026-09-16
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Chrome DevTools for agents lets your coding agent control and inspect a live Chrome browser. The agent can open pages, read console errors, check network requests and record performance traces.

## Why it is useful

- The agent can check its own front-end changes in a real browser.
- Performance traces help it find slow pages with evidence, not guesses.

## How to use it

```bash
claude mcp add chrome-devtools npx chrome-devtools-mcp@latest
```

Then ask the agent to open your local site and explain why a page is slow.

## Watch out for

- The agent can see everything in that browser profile. Do not use it with a profile that is signed in to sensitive accounts.
