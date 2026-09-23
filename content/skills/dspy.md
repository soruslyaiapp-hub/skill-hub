---
slug: dspy
name: DSPy
tagline: Stanford's framework for programming, not prompting, language models, with optimizers that tune your prompts for you.
category: meta
type: tool
tags: [ prompt-optimization, framework, python, research ]
platforms: [ any ]
difficulty: advanced
price: free
status: community
language: Python
author:
  name: Stanford NLP
  url: https://github.com/stanfordnlp
links:
  source: https://github.com/stanfordnlp/dspy
  docs: https://dspy.ai
  install: pip install dspy
metrics:
  githubStars: 38219
  lastCommit: 2026-09-23
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

DSPy lets you build AI systems from small modules instead of long hand-written prompts. You define what each step takes and returns, and DSPy optimizers improve the prompts (or fine-tune weights) against your examples and your metric.

## Why it is useful

- Prompts stop being fragile strings that you tweak by hand.
- When you switch models, you re-run the optimizer instead of rewriting prompts.

## How to use it

```bash
pip install dspy
```

Start with the tutorials on dspy.ai, which build a small program and optimize it step by step.

## Watch out for

- There is a learning curve. It pays off for pipelines you run many times, less for one-off prompts.
- Optimizers make many model calls. Set a budget.
