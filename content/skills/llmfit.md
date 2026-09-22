---
slug: llmfit
name: llmfit
tagline: One command to find which open-source LLMs actually run on your hardware, scored for fit, speed, quality and context.
category: devops
type: tool
tags: [ local-llm, hardware, cli ]
platforms: [ any ]
difficulty: beginner
price: free
status: community
language: Rust
author:
  name: AlexsJones
  url: https://github.com/AlexsJones
links:
  source: https://github.com/AlexsJones/llmfit
  install: uvx llmfit
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7485544168975454208/
  postedAt: 2026-07-22
metrics:
  githubStars: 36962
  lastCommit: 2026-09-21
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

llmfit inspects your CPU, RAM, GPU and VRAM, then scores hundreds of models on memory fit, speed, quality and context. You skip the trial and error of downloading models that will not load or will crawl.

## Why it is useful

- Picking a local model stops being guesswork.
- Both an interactive TUI and a plain CLI are included.

## How to use it

```bash
uvx llmfit
```

Homebrew and an install script are also available.

## Watch out for

- Scores are estimates. The new benchmark mode measures real tokens per second on your machine.
