---
slug: open-code-review
name: Open Code Review
tagline: Alibaba's AI code review CLI that mixes deterministic pipelines with an LLM agent for precise, line-level comments on Git diffs.
category: coding
type: tool
tags: [ code-review, cli, git ]
platforms: [ any ]
difficulty: intermediate
price: free
status: community
language: Go
author:
  name: Alibaba
  url: https://github.com/alibaba
links:
  source: https://github.com/alibaba/open-code-review
  install: npm install -g @alibaba-group/open-code-review
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7487356111742713856/
  postedAt: 2026-07-27
metrics:
  githubStars: 37005
  lastCommit: 2026-09-19
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Open Code Review reviews Git diffs and leaves comments on exact lines. It began as Alibaba's internal AI review assistant and served tens of thousands of developers there for two years.

## Why it is useful

- Smart file bundling groups related files, so it misses fewer files than a general agent.
- Ships with a tuned ruleset for common bugs, such as null pointers and thread safety.

## How to use it

```bash
npm install -g @alibaba-group/open-code-review
```

Connect an LLM provider, then run it on a branch or pull request.

## Watch out for

- Treat comments as suggestions. A human still owns the merge.
