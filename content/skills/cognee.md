---
slug: cognee
name: cognee
tagline: An open-source memory platform that gives agents long-term memory across sessions through a self-hosted knowledge graph.
category: agent-optimization
type: tool
tags: [ memory, knowledge-graph, rag ]
platforms: [ any ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: topoteretes
  url: https://github.com/topoteretes
links:
  source: https://github.com/topoteretes/cognee
  install: uv pip install cognee
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7487839303708930048/
  postedAt: 2026-07-28
metrics:
  githubStars: 30798
  lastCommit: 2026-09-18
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

cognee ingests your data in almost any format and builds a knowledge graph your agents can remember from. It replaces the usual stack of a graph database, a vector database and a metadata store with one self-hosted engine.

## Why it is useful

- Agents keep facts across sessions instead of starting from zero.
- One component to run instead of four.

## How to use it

```bash
uv pip install cognee
```

Set your LLM API key, add data, then query it from your agent.

## Watch out for

- Building the graph calls an LLM, so large ingests cost tokens.
