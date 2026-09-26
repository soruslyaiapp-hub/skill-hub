---
slug: sentry-mcp
name: Sentry MCP
tagline: Sentry's MCP server for coding agents. Pull real errors, stack traces and issues into the chat while you debug.
category: devops
type: mcp
tags: [ monitoring, errors, debugging ]
platforms: [ claude-code, cursor, any ]
difficulty: beginner
price: freemium
status: community
language: TypeScript
author:
  name: Sentry
  url: https://github.com/getsentry
links:
  source: https://github.com/getsentry/sentry-mcp
  install: npx @sentry/mcp-server@latest --access-token=YOUR_SENTRY_TOKEN
metrics:
  githubStars: 863
  lastCommit: 2026-09-25
  license: NOASSERTION
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Sentry's server connects your coding agent to your Sentry projects. The agent can read issues, errors and stack traces, and use them while it fixes the bug.

## Why it is useful

- The agent debugs from real production errors, not a vague bug report.
- It is designed for human-in-the-loop coding workflows.

## How to use it

Use the hosted remote server, or run it locally with a Sentry user token:

```bash
npx @sentry/mcp-server@latest --access-token=YOUR_SENTRY_TOKEN
```

## Watch out for

- Error data can contain personal data about your users. Check your data rules before you send it to a model.
