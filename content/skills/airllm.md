---
slug: airllm
name: AirLLM
tagline: Runs 70B models on a single 4 GB GPU without quantization, by keeping only one layer on the GPU at a time.
category: devops
type: tool
tags: [ inference, low-memory, local-llm ]
platforms: [ any ]
difficulty: intermediate
price: free
status: community
language: Jupyter Notebook
author:
  name: lyogavin
  url: https://github.com/lyogavin
links:
  source: https://github.com/lyogavin/airllm
  install: pip install airllm
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7490051369123540993/
  postedAt: 2026-08-03
metrics:
  githubStars: 34362
  lastCommit: 2026-09-15
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

AirLLM cuts inference memory by loading one model layer onto the GPU at a time. The project says very large models, such as DeepSeek-V3, fit in about 12 GB this way.

## Why it is useful

- Big open models on consumer graphics cards.
- No quantization, distillation or pruning, so you keep full precision.

## How to use it

```bash
pip install airllm
```

Load a supported model (Llama, Qwen, DeepSeek and more) and run it from Python.

## Watch out for

- Moving layers in and out is slow. It suits batch and offline work more than live chat.
