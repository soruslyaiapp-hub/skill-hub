---
slug: uber-adr
name: ADR (Agentic AI Detection and Response)
tagline: Uber's enterprise security system for AI coding agents, covering observability, security benchmarking and threat detection.
category: security
type: tool
tags: [ agent-security, observability, benchmark ]
platforms: [ any ]
difficulty: advanced
price: free
status: community
language: Python
author:
  name: Uber
  url: https://github.com/uber
links:
  source: https://github.com/uber/ADR
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7491342374103642112/
  postedAt: 2026-08-07
metrics:
  githubStars: 1582
  lastCommit: 2026-09-23
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

ADR helps companies see and secure what employee-facing agents like Cursor, Claude Code and Codex actually do. It captures agent intent, tool use and execution traces, and flags threats.

## Why it is useful

- Deployed in production at Uber. The paper was accepted to MLSys 2026.
- Includes ADR-Bench, a security benchmark with more than 300 tasks.

## How to use it

Start with the README and the paper, then deploy the observability part on a small team first.

## Watch out for

- It is an enterprise system. Plan time for setup and for the privacy review of agent traces.
