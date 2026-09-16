---
slug: stripe-ai
name: Stripe AI Toolkit
tagline: Stripe's official SDKs, plugins and skills for connecting payments and billing to LLMs and agent frameworks.
category: business
type: tool
tags: [ payments, billing, sdk, agents ]
platforms: [ claude-code, any ]
difficulty: intermediate
price: free
status: community
language: TypeScript
author:
  name: Stripe
  url: https://github.com/stripe
links:
  source: https://github.com/stripe/ai
  docs: https://docs.stripe.com
metrics:
  githubStars: 1821
  lastCommit: 2026-09-16
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

This repo is the Stripe one-stop shop for AI. It holds SDKs that plug Stripe into LLMs and agent frameworks, plus agent plugins and skills, so an agent can work with customers, products, payment links and more through the Stripe API.

## Why it is useful

- Official and maintained by Stripe, so it follows current Stripe APIs.
- Lets you build agents that can look up billing, create payment links or issue refunds.

## How to use it

Pick the SDK or plugin for your framework in the README. Start with a Stripe test-mode key.

## Watch out for

- Use restricted API keys with only the permissions the agent needs.
- Keep a human approval step before any real money moves.
