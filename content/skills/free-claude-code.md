---
slug: free-claude-code
name: Free Claude Code
tagline: A local proxy that runs Claude Code, Codex and other agents on free-tier providers, falling back automatically when one goes down.
category: token-cost
type: tool
tags: [ proxy, free-tiers, model-routing ]
platforms: [ claude-code, codex, any ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: Alishahryar1
  url: https://github.com/Alishahryar1
links:
  source: https://github.com/Alishahryar1/free-claude-code
  install: curl -fsSL "https://raw.githubusercontent.com/Alishahryar1/free-claude-code/main/scripts/install.sh" | sh
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7498348541468262400/
  postedAt: 2026-08-26
metrics:
  githubStars: 55812
  lastCommit: 2026-09-24
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Free Claude Code routes your coding agents through many free-tier providers. The project says this adds up to more than 1.3B free tokens a month. A searchable admin UI lets you swap models without touching code.

## Why it is useful

- Good for experiments and side projects where paid plans feel heavy.
- Automatic fallback keeps a session going when a provider fails.

## How to use it

Run the install script from the README, then pick your providers in the admin UI.

## Watch out for

- Free tiers are set by each provider and can change.
- Results depend on the model you route to, not on Claude.
