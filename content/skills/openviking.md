---
slug: openviking
name: OpenViking
tagline: An open-source context database for agents that stores memories, resources and skills under a viking:// filesystem you can browse.
category: agent-optimization
type: tool
tags: [ context-database, memory, rag ]
platforms: [ any ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: Volcengine
  url: https://github.com/volcengine
links:
  source: https://github.com/volcengine/OpenViking
  install: pip install openviking --upgrade
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7496898991436251136/
  postedAt: 2026-08-22
metrics:
  githubStars: 38040
  lastCommit: 2026-09-19
  license: AGPL-3.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

OpenViking gives agents one place to store knowledge, remember users and reuse experience. Context lives under a `viking://` URI scheme, so agents navigate it with `ls`, `tree` and `find` instead of opaque vector lookups.

## Why it is useful

- Every retrieval leaves a visible trail, so you can debug why the agent got the wrong context.
- Unifies memory, knowledge retrieval and skills.

## How to use it

```bash
pip install openviking --upgrade
```

## Watch out for

- It is another service to run and back up. Start with one agent.
