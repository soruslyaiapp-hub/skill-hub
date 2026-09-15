---
slug: timesfm
name: TimesFM
tagline: Google Research's pretrained time-series foundation model, so you can forecast in a few lines of Python instead of training your own.
category: data-research
type: model
tags: [ forecasting, time-series ]
platforms: [ any ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: Google Research
  url: https://github.com/google-research
links:
  source: https://github.com/google-research/timesfm
  install: pip install timesfm[torch]
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7495691034090283009/
  postedAt: 2026-08-19
metrics:
  githubStars: 32570
  lastCommit: 2026-09-09
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

TimesFM is a pretrained model for time-series forecasting. It has already learned common temporal patterns, so you load it and forecast right away.

## Why it is useful

- Skips months of data prep and training for a first forecast.
- Runs with PyTorch, and there is an MLX build for Apple silicon.

## How to use it

```bash
pip install timesfm[torch]
```

## Watch out for

- A general model is a baseline. Compare it against your own models on your data.
