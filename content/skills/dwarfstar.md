---
slug: dwarfstar
name: DwarfStar (ds4)
tagline: antirez's focused engine for running DeepSeek V4 Flash and a few other large open models locally on Metal, CUDA and ROCm.
category: devops
type: tool
tags: [ inference, deepseek, local-llm ]
platforms: [ any ]
difficulty: advanced
price: free
status: community
language: C
author:
  name: antirez
  url: https://github.com/antirez
links:
  source: https://github.com/antirez/ds4
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7490719267852611585/
  postedAt: 2026-08-05
metrics:
  githubStars: 22539
  lastCommit: 2026-09-20
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

DwarfStar is a deliberately narrow inference engine. Instead of supporting every model, it is built and tested around a few excellent ones, such as DeepSeek V4 Flash and GLM, on Mac, NVIDIA and AMD hardware.

## Why it is useful

- Tuned for strong open-weight models that now fit on high-end personal machines.
- SSD streaming helps run models that are larger than your memory.

## How to use it

Build it from the repository as the README describes, then download a supported model.

## Watch out for

- Only a few models are supported, by design.
- You still need a high-end machine for the larger models.
