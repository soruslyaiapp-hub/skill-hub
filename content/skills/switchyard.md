---
slug: switchyard
name: Switchyard
tagline: NVIDIA's Rust proxy that routes each LLM call to the cheapest model that can still do the job, keeping native OpenAI and Anthropic APIs.
category: token-cost
type: tool
tags: [ model-routing, proxy, rust ]
platforms: [ claude-code, codex, any ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: NVIDIA NeMo
  url: https://github.com/NVIDIA-NeMo
links:
  source: https://github.com/NVIDIA-NeMo/Switchyard
  install: pip install nemo-switchyard
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7493999898015555584/
  postedAt: 2026-08-14
metrics:
  githubStars: 3163
  lastCommit: 2026-09-19
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Switchyard sits between your app and the model APIs. It routes traffic across models and providers and translates between OpenAI and Anthropic formats on the fly.

## Why it is useful

- Your coding agent keeps speaking its native API while requests go to vLLM, Ollama, NVIDIA NIM or any OpenAI-compatible backend.
- Good for benchmarking and for cutting cost per task.

## How to use it

```bash
pip install nemo-switchyard
```

Rust users can run `cargo install --locked switchyard-server`.

## Watch out for

- Cheaper models can fail on hard tasks. Watch quality when you route.
