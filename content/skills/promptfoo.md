---
slug: promptfoo
name: Promptfoo
tagline: Test and compare prompts, agents and RAG pipelines, and red-team them for security problems, from the command line.
category: meta
type: tool
tags: [ evals, red-teaming, testing, prompts ]
platforms: [ any ]
difficulty: intermediate
price: free
status: community
language: TypeScript
author:
  name: Promptfoo
  url: https://github.com/promptfoo
links:
  source: https://github.com/promptfoo/promptfoo
  docs: https://www.promptfoo.dev
  install: npx promptfoo@latest init
metrics:
  githubStars: 25437
  lastCommit: 2026-09-25
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Promptfoo runs your prompts, agents or RAG pipelines against test cases and scores the results, so you can compare models and prompt versions side by side. It also red-teams your app for problems like prompt injection and data leaks.

## Why it is useful

- Replace "it looks better" with numbers when you change a prompt or a model.
- It runs in CI, so a prompt change that breaks a test fails the build.

## How to use it

```bash
npx promptfoo@latest init
npx promptfoo@latest eval
```

Edit the generated config with your prompts and test cases between the two commands.

## Watch out for

- Promptfoo is now part of OpenAI. The README says it stays open source and MIT licensed.
- Evals are only as good as your test cases. Use real examples.
