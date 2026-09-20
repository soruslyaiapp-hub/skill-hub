---
slug: strix
name: Strix
tagline: Open-source AI penetration testers that run your app, find vulnerabilities and prove each one with a working exploit.
category: security
type: agent
tags: [ pentesting, appsec, ci ]
platforms: [ any ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: Strix
  url: https://github.com/usestrix
links:
  source: https://github.com/usestrix/strix
  install: curl -sSL https://strix.ai/install | bash
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7487507101783875584/
  postedAt: 2026-07-27
metrics:
  githubStars: 63765
  lastCommit: 2026-09-20
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Strix runs autonomous agents that act like real attackers. They run your code dynamically, look for vulnerabilities, and validate each finding with a proof of concept.

## Why it is useful

- Far fewer false positives than static scanners.
- Multi-agent recon, exploitation and validation run in parallel.
- Plugs into GitHub Actions to block insecure pull requests.

## How to use it

Run the install script from the README, then point Strix at an app you own. It is also available as a skill: `npx skills add usestrix/strix`.

## Watch out for

- Only test systems you own or have written permission to test.
