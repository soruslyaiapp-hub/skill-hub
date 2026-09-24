---
slug: vllm
name: vLLM
tagline: A high-throughput, memory-efficient engine for serving LLMs, with PagedAttention, continuous batching and prefix caching.
category: devops
type: tool
tags: [ inference, llm-serving, gpu ]
platforms: [ any ]
difficulty: advanced
price: free
status: community
language: Python
author:
  name: vLLM project
  url: https://github.com/vllm-project
links:
  source: https://github.com/vllm-project/vllm
  install: uv pip install vllm
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7483369840016023552/
  postedAt: 2026-07-16
metrics:
  githubStars: 92590
  lastCommit: 2026-09-24
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

vLLM serves large language models fast and cheaply. It manages key-value memory with PagedAttention, and uses continuous batching and prefix caching to keep throughput high under real traffic.

## Why it is useful

- A standard choice for self-hosted LLM serving, with 2,000+ contributors.
- Supports a wide range of open model families and GPU vendors.

## How to use it

```bash
uv pip install vllm
```

Start a server for the model you want, then point your app or agent at it.

## Watch out for

- You need a suitable GPU, and production tuning takes effort.
