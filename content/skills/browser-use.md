---
slug: browser-use
name: Browser Use
tagline: The popular open-source library for AI agents that operate a real browser to click, type and finish web tasks.
category: productivity
type: tool
tags: [ browser-automation, agents, python ]
platforms: [ any ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: Browser Use
  url: https://github.com/browser-use
links:
  source: https://github.com/browser-use/browser-use
  install: pip install browser-use
metrics:
  githubStars: 115053
  lastCommit: 2026-09-15
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Browser Use lets an LLM operate a web browser. It reads the page, decides what to click or type, and repeats until the task is done, for example finding a free slot and booking an appointment.

## Why it is useful

- Automates web tasks that have no API.
- Works with many LLM providers, and a hosted cloud option exists if you do not want to run browsers yourself.

## How to use it

```bash
pip install browser-use
```

Write a short Python script that gives the agent a task and a model. The README has a minimal example.

## Watch out for

- Web agents can misclick. Keep a human check before purchases, bookings or messages.
- Some sites forbid automation in their terms.
