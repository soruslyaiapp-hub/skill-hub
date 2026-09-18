---
slug: rtk
name: RTK (Rust Token Killer)
tagline: A CLI proxy that compresses shell output before your coding agent reads it, so every command costs fewer tokens.
category: token-cost
type: tool
tags: [ context, cli, token-savings, rust ]
platforms: [ claude-code, codex, cursor, any ]
difficulty: beginner
price: free
status: community
language: Rust
author:
  name: rtk-ai
  url: https://github.com/rtk-ai
links:
  source: https://github.com/rtk-ai/rtk
  install: brew install rtk
metrics:
  githubStars: 80867
  lastCommit: 2026-09-18
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: true
---

## What it does

RTK sits between your coding agent and the shell. It runs common dev commands (git, ls, test runners, linters, package managers) and compresses the output before the agent sees it. Passing tests collapse to a count, file lists become a tree, and progress noise is dropped.

## Why it is useful

- Shell output is a large, silent token cost in agent sessions. The project says RTK cuts it by 60-90% on common dev commands.
- It is a single Rust binary with no dependencies. Commands it does not know pass through unchanged.

## How to use it

Install it for your OS:

```bash
brew install rtk                                   # macOS / Linux
winget install rtk-ai.rtk                          # Windows
cargo install --git https://github.com/rtk-ai/rtk  # from source
```

Then prefix commands with `rtk`, for example `rtk git status` or `rtk npm test`. Run `rtk init -g` to install the hook for your agent, so this happens without the prefix.

## Watch out for

- A different crate called "rtk" exists on crates.io. Install from the Git URL, not with `cargo install rtk`.
- Compressed output hides detail on purpose. Run the raw command when you need the full log.
