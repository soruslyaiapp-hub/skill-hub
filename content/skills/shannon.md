---
slug: shannon
name: Shannon
tagline: An autonomous AI pentester for web apps and APIs that only reports the vulnerabilities it can prove with a working exploit.
category: security
type: agent
tags: [ pentesting, appsec, ci ]
platforms: [ any ]
difficulty: intermediate
price: free
status: community
language: TypeScript
author:
  name: Keygraph
  url: https://github.com/KeygraphHQ
links:
  source: https://github.com/KeygraphHQ/shannon
  install: npx @keygraph/shannon@latest setup
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7503784358059765761/
  postedAt: 2026-09-10
metrics:
  githubStars: 48278
  lastCommit: 2026-09-21
  license: AGPL-3.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Shannon analyzes your source code, finds attack paths and runs real exploits. No exploit, no report, so you get findings with a working proof of concept attached.

## Why it is useful

- Continuous testing instead of one pentest a year.
- Drops into CI/CD to gate releases.

## How to use it

```bash
npx @keygraph/shannon@latest setup
```

## Watch out for

- Only test apps you own or have written permission to test.
