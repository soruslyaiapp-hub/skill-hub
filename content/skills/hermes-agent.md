---
slug: hermes-agent
name: Hermes Agent
tagline: Nous Research's self-improving agent, which creates skills from experience, improves them in use and remembers you across sessions.
category: agent-optimization
type: agent
tags: [ self-improving, memory, skills ]
platforms: [ any ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: Nous Research
  url: https://github.com/NousResearch
links:
  source: https://github.com/NousResearch/hermes-agent
  install: curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7484222959562252289/
  postedAt: 2026-07-18
metrics:
  githubStars: 248798
  lastCommit: 2026-09-25
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Hermes Agent has a built-in learning loop. After complex tasks it creates skills, it improves them while it uses them, and it builds a model of who you are over time.

## Why it is useful

- It does not forget everything between sessions.
- Runs on a small VPS, a GPU cluster or serverless, so it is not tied to your laptop.
- Works with many model providers, including your own endpoint.

## How to use it

Run the install script from the README, then connect the model provider you want.

## Watch out for

- Read install scripts before you pipe them into bash.
- Review the skills it creates. Self-made skills can pick up bad habits.
