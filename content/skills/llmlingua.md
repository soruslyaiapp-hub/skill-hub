---
slug: llmlingua
name: LLMLingua
tagline: A Microsoft Research library that compresses long prompts by dropping low-value tokens, so the model reads less and costs less.
category: token-cost
type: tool
tags: [ prompt-compression, research, python ]
platforms: [ any ]
difficulty: advanced
price: free
status: community
language: Python
author:
  name: Microsoft
  url: https://github.com/microsoft
links:
  source: https://github.com/microsoft/LLMLingua
  install: pip install llmlingua
metrics:
  githubStars: 6698
  lastCommit: 2026-09-10
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

LLMLingua uses a small, well-trained language model to find and remove tokens that do not matter in a prompt. The shorter prompt then goes to your main model. It comes from Microsoft Research papers (EMNLP 2023, ACL 2024).

## Why it is useful

- Large savings on long, repetitive inputs such as retrieved documents or chat history.
- It can also help the model focus on the key information.

## How to use it

```bash
pip install llmlingua
```

Pass your prompt through its `PromptCompressor` before you send it to the model.

## Watch out for

- Compression can drop details that matter. Measure answer quality before and after.
- The small model needs compute. Plan for it in production.
