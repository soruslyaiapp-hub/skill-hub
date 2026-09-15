---
slug: skillspector
name: SkillSpector
tagline: NVIDIA's security scanner for agent skills that finds vulnerabilities, prompt injection and malicious patterns before you install a skill.
category: security
type: tool
tags: [ agent-skills, supply-chain, scanner ]
platforms: [ claude-code, codex, any ]
difficulty: beginner
price: free
status: community
language: Python
author:
  name: NVIDIA
  url: https://github.com/NVIDIA
links:
  source: https://github.com/NVIDIA/SkillSpector
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7505596300214620162/
  postedAt: 2026-09-15
metrics:
  githubStars: 17281
  lastCommit: 2026-09-15
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

SkillSpector scans Claude Code, Codex and MCP skills for vulnerabilities, prompt injection, data exfiltration and supply-chain risks before they reach your machine.

## Why it is useful

- Skills run with a lot of implicit trust. In the research behind the tool, 26.1% of skills had vulnerabilities and 5.2% looked likely malicious.
- It also runs as an MCP server, so your agent can check a skill before installing it.

## How to use it

Run it with Docker or as an MCP server, as shown in the README.

## Watch out for

- A clean scan lowers risk but does not prove a skill is safe. Still read what you install.
