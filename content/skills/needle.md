---
slug: needle
name: Needle
tagline: A 45M-parameter tool-calling model in a single 14 MB binary that runs a session in about 28 MB of RAM.
category: agent-optimization
type: model
tags: [ on-device, tool-calling, small-model ]
platforms: [ any ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: Cactus Compute
  url: https://github.com/cactus-compute
links:
  source: https://github.com/cactus-compute/needle
  install: pip install cactus-needle
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7493275111634923521/
  postedAt: 2026-08-12
metrics:
  githubStars: 12294
  lastCommit: 2026-09-23
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Needle 2 is an open model for tool calling, device use and structured extraction on tiny devices: phones, wearables, smart home gear and robots. The weights are baked into one small binary.

## Why it is useful

- Text in, JSON out. A byte-level grammar keeps every tool call valid against your schema.
- The project says it competes with models 5 to 70 times its size.

## How to use it

```bash
pip install cactus-needle
```

Describe your tools, then call them from Python. Extras add LoRA fine-tuning.

## Watch out for

- A tiny model has limits. Test it on your real tool set before you ship.
