---
slug: agent-qa
name: Agent QA
tagline: The self-improving QA agent for natural-language web and mobile tests.
category: coding
type: tool
tags: [ qa, testing, regression-testing, web-testing, mobile-testing ]
platforms: [ claude-code, codex ]
difficulty: intermediate
price: free
status: community
language: TypeScript
author:
  name: Vostride
  url: https://github.com/vostride
links:
  source: https://github.com/vostride/agent-qa
  docs: https://vostride.com/docs/agent-qa/quickstart
  install: npm install -D agent-qa
addedAt: 2026-09-24
updatedAt: 2026-09-24
---

## What it does

Agent QA runs web and mobile tests written in natural language. It keeps memory from previous runs and can re-observe the UI to recover when an action fails.

## Why it is useful

- Teams can describe actions and assertions without writing selectors for every step.
- Execution memory helps subsequent runs adapt to UI changes and recurring failures.

## How to use it

```bash
npm install -D agent-qa
npx agent-qa init
npx agent-qa install-browsers --chromium
```

Follow the [quickstart](https://vostride.com/docs/agent-qa/quickstart) to configure a model, create a test, and run it. Mobile testing needs separate driver setup.

## Watch out for

- Model-provider or subscription charges may apply depending on the configuration.
- Docker is required if you use sandboxed test hooks.
