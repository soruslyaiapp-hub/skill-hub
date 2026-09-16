---
slug: agent-governance-toolkit
name: Agent Governance Toolkit
tagline: Microsoft's policy enforcement, identity, sandboxing and audit logging for autonomous AI agents.
category: security
type: tool
tags: [ governance, policy, compliance, owasp ]
platforms: [ claude-code, any ]
difficulty: advanced
price: free
status: community
language: Python
author:
  name: Microsoft
  url: https://github.com/microsoft
links:
  source: https://github.com/microsoft/agent-governance-toolkit
  install: pip install "agent-governance-toolkit[full]"
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7488632019787382785/
  postedAt: 2026-07-30
metrics:
  githubStars: 6271
  lastCommit: 2026-09-15
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

The toolkit puts hard controls around agents. A YAML policy engine intercepts every tool call before it runs, and the toolkit adds zero-trust identity, execution sandboxing and audit logs.

## Why it is useful

- Prompt-level safety is only a request. Policies make bad actions impossible.
- The project says it covers all ten items of the OWASP Agentic Top 10.
- Works with any framework, and has a Claude Code plugin.

## How to use it

```bash
pip install "agent-governance-toolkit[full]"
```

In Claude Code: `/plugin marketplace add microsoft/agent-governance-toolkit`.

## Watch out for

- It is a public preview. Expect breaking changes before the stable release.
