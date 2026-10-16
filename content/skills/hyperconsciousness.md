---
slug: hyperconsciousness
name: Hyperconsciousness
tagline: Stores agent notes in an encrypted, append-only log and exposes them through scoped, expiring MCP grants.
category: agent-optimization
type: mcp
tags: [ memory, notes, encryption, local-first ]
platforms: [ any ]
difficulty: advanced
price: free
status: community
language: Rust
author:
  name: Louis Beaumont
  url: https://github.com/louis030195
links:
  source: https://github.com/louis030195/hyperconsciousness
  docs: https://github.com/louis030195/hyperconsciousness#give-an-agent-limited-access
  install: git clone https://github.com/louis030195/hyperconsciousness.git && cd hyperconsciousness && cargo build --release --locked
addedAt: 2026-10-03
updatedAt: 2026-10-03
---

## What it does

Hyperconsciousness is an MIT-licensed developer-alpha knowledge store with a Rust CLI and MCP server. It keeps encrypted, append-only records and lets agents retrieve notes through grants restricted by record kind, tags, sensitivity and expiry.

## Why it is useful

An agent can retrieve selected notes across sessions without receiving the whole store through MCP. The owner can revoke grants and inspect an access audit. An optional lexical relevance mode ranks multiword searches without a model or external service.

## How to use it

Install Rust and the native dependencies listed in the [source installation guide](https://github.com/louis030195/hyperconsciousness#install-from-source). The repository pins Rust 1.88.0.

```sh
git clone https://github.com/louis030195/hyperconsciousness.git
cd hyperconsciousness
cargo build --release --locked
```

Follow the README to create an isolated demo store, add a synthetic note and issue a read-only grant. Configure a stdio MCP client with the absolute path to the built `hc` binary and arguments `mcp --as <grant-id> --dir /absolute/path/to/hc-demo`. Writes require explicit `--write` access.

## Watch out for

- This is a developer alpha, not an independently audited security product. Review the [security constraints](https://github.com/louis030195/hyperconsciousness/blob/main/docs/CONSTRAINTS.md) before using sensitive data.
- Grants restrict server responses; they do not isolate processes that already have access to the owner's OS account, files or keys.
- Hosted model providers can see plaintext returned by MCP. Local storage does not keep those responses local.
