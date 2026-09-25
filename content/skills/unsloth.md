---
slug: unsloth
name: Unsloth
tagline: Run, fine-tune and serve LLMs and diffusion models on your own hardware, with an OpenAI-compatible API for your agents.
category: devops
type: tool
tags: [ fine-tuning, local-llm, training ]
platforms: [ claude-code, codex, any ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: Unsloth
  url: https://github.com/unslothai
links:
  source: https://github.com/unslothai/unsloth
  install: uv pip install unsloth --torch-backend=auto
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7493879097878540288/
  postedAt: 2026-08-14
metrics:
  githubStars: 76739
  lastCommit: 2026-09-25
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Unsloth is a local AI runtime and desktop app for running and training models. It serves them through an OpenAI-compatible API, so your agent tooling does not need to change.

## Why it is useful

- Point Claude Code or Codex at a local model. The post shows `unsloth start claude` for this.
- Known for fast, memory-efficient fine-tuning.

## How to use it

```bash
uv pip install unsloth --torch-backend=auto
```

Or download the desktop app from the README.

## Watch out for

- Local models are usually weaker than frontier cloud models. Match the model to the task.
