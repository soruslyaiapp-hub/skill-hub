---
slug: soup
name: Soup
tagline: Fine-tune LLMs from one YAML file; layer streaming trains an 8B model on a 4 GB laptop GPU.
category: devops
type: tool
tags: [ fine-tuning, cli, consumer-gpu ]
platforms: [ any ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: MakazhanAlpamys
  url: https://github.com/MakazhanAlpamys
links:
  source: https://github.com/MakazhanAlpamys/Soup
  install: pip install "soup-cli[train]"
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7495449443786272768/
  postedAt: 2026-08-18
metrics:
  githubStars: 7158
  lastCommit: 2026-09-25
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Soup is a CLI for fine-tuning and post-training LLMs with one config and one command. Layer streaming feeds the frozen base model to the GPU one layer at a time.

## Why it is useful

- The post reports an 8B model training in about 3.3 GB of peak VRAM.
- No SSH into a remote GPU box needed.

## How to use it

```bash
pip install "soup-cli[train]"
```

Write the YAML config, then run the training command from the README.

## Watch out for

- Streaming layers is slower than keeping the whole model on the GPU.
