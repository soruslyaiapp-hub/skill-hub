---
slug: skillopt
name: SkillOpt
tagline: Microsoft's optimizer that trains agent skills like neural networks, with epochs and validation gates, without touching weights.
category: meta
type: tool
tags: [ agent-skills, optimization, evals ]
platforms: [ any ]
difficulty: advanced
price: free
status: community
language: Python
author:
  name: Microsoft
  url: https://github.com/microsoft
links:
  source: https://github.com/microsoft/SkillOpt
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7486133054596628480/
  postedAt: 2026-07-23
metrics:
  githubStars: 17338
  lastCommit: 2026-09-05
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

SkillOpt treats a skill document as the trainable state of a frozen agent. It turns scored runs into edits, keeps only changes that pass validation, and outputs a deployable `best_skill.md`.

## Why it is useful

- Skills improve in a measured, reproducible way instead of by hand-tweaking.
- No fine-tuning and no access to model weights needed.

## How to use it

Follow the installation and training guide in the SkillOpt documentation linked from the README.

## Watch out for

- You need a good evaluation set. The optimizer can only improve what you can score.
