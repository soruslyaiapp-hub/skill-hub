---
slug: turbovec
name: turbovec
tagline: A Rust vector index with Python bindings that, the project says, fits 10M documents in about 4 GB and searches faster than FAISS.
category: data-research
type: tool
tags: [ vector-search, embeddings, rag, rust ]
platforms: [ any ]
difficulty: intermediate
price: free
status: community
language: Rust
author:
  name: RyanCodrai
  url: https://github.com/RyanCodrai
links:
  source: https://github.com/RyanCodrai/turbovec
  install: pip install turbovec
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7484222969699934208/
  postedAt: 2026-07-18
metrics:
  githubStars: 17214
  lastCommit: 2026-09-13
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

turbovec is a vector index built on Google Research's TurboQuant algorithm. It compresses embeddings heavily, so a 10M-document corpus that needs about 31 GB as float32 fits in about 4 GB.

## Why it is useful

- No training phase and no index rebuilds.
- Runs on your own machine, so your data stays local.

## How to use it

```bash
pip install turbovec
```

Rust users can add it with `cargo add turbovec`.

## Watch out for

- Quantization trades a little accuracy for memory. Measure recall on your own data.
