---
slug: minimind
name: MiniMind
tagline: Train a 64M-parameter language model from scratch in about two hours, with every step written in plain PyTorch.
category: meta
type: resource
tags: [ llm-training, pytorch, education ]
platforms: [ any ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: jingyaogong
  url: https://github.com/jingyaogong
links:
  source: https://github.com/jingyaogong/minimind
  install: git clone https://github.com/jingyaogong/minimind
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7503059587625799680/
  postedAt: 2026-09-08
metrics:
  githubStars: 61746
  lastCommit: 2026-09-18
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

MiniMind walks you through building a small language model from zero. Every core algorithm, from pretraining to RLHF to tool calling, is implemented without high-level framework shortcuts.

## Why it is useful

- The best way to understand LLM internals is to build one.
- The project says a full training run costs about 3 yuan of rented GPU time.

## How to use it

Clone the repo, install the requirements and follow the README training steps.

## Watch out for

- The README is mainly in Chinese.
- A 64M model is for learning, not for production use.
