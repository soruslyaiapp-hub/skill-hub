---
slug: deepseek-reasonix
name: DeepSeek-Reasonix
tagline: A DeepSeek-native coding agent for the terminal, built around prefix-cache stability to keep long sessions cheap.
category: coding
type: agent
tags: [ coding-agent, deepseek, prefix-cache, cli ]
platforms: [ any ]
difficulty: intermediate
price: free
status: community
language: Go
author:
  name: esengine
  url: https://github.com/esengine
links:
  source: https://github.com/esengine/DeepSeek-Reasonix
  install: npm i -g reasonix
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7491825561372110848/
  postedAt: 2026-08-08
metrics:
  githubStars: 35709
  lastCommit: 2026-09-26
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Reasonix is a terminal coding agent designed around DeepSeek's prefix cache, so repeated context stays cached and cheap across long sessions.

## Why it is useful

- Lower token bills on long coding sessions.
- Config-driven: providers, tools and plugins are declared in `reasonix.toml`, with no hardcoded models.
- Works with any OpenAI-compatible provider.

## How to use it

```bash
npm i -g reasonix
```

## Watch out for

- The cost savings depend on DeepSeek-style prefix caching. Other providers may not see the same gain.
