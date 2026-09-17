---
slug: ltx-2
name: LTX-2
tagline: Lightricks' open audio-video model that generates synchronized video and sound from one prompt, with an official LoRA trainer.
category: media
type: model
tags: [ video-generation, audio, diffusion ]
platforms: [ any ]
difficulty: advanced
price: free
status: community
language: Python
author:
  name: Lightricks
  url: https://github.com/Lightricks
links:
  source: https://github.com/Lightricks/LTX-2
  install: git clone https://github.com/Lightricks/LTX-2.git
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7494724682441621504/
  postedAt: 2026-08-16
metrics:
  githubStars: 9445
  lastCommit: 2026-08-26
  license: NOASSERTION
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

LTX-2 is a DiT-based foundation model that generates video and matching audio together, in one pass. The repo holds the official Python inference code and a LoRA trainer.

## Why it is useful

- No more stitching sound onto generated clips afterwards.
- You can run it locally and fine-tune it with LoRA.

## How to use it

Clone the repo and follow the README to download the weights and run inference.

## Watch out for

- It needs a strong GPU.
- Check the model licence before commercial use.
