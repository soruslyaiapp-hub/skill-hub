---
slug: corpusiq
name: CorpusIQ
tagline: One remote MCP server that answers a business question across 40+ business systems, with cited sources.
category: business
type: mcp
tags: [ business-data, analytics, finance, remote-mcp ]
platforms: [ claude-code, claude-ai, chatgpt, cursor, any ]
difficulty: beginner
price: paid
status: community
author:
  name: CorpusIQ
  url: https://github.com/CorpusIQ
links:
  source: https://github.com/CorpusIQ/mcp-manifest
  docs: https://www.corpusiq.io/mcp
  install: claude mcp add --transport http corpusiq https://mcp2.corpusiq.io/mcp
addedAt: 2026-11-18
updatedAt: 2026-11-18
---

## What it does

CorpusIQ is one remote MCP server that answers a business question across more than 40 business systems. Connect Google Analytics, Search Console, Google Ads, Stripe, QuickBooks, Shopify, HubSpot or Klaviyo, then ask the question in the assistant you already use. The answer comes back once, with the sources it used.

## Why it is useful

- One question returns one answer instead of a tour through six dashboards.
- Every answer names the connector and the record it came from, so the number can be checked.
- Each connector is authorized separately with read-only OAuth, and the data is read on demand rather than copied into another store.

## How to use it

```bash
claude mcp add --transport http corpusiq https://mcp2.corpusiq.io/mcp
```

Then connect a data source in the CorpusIQ dashboard, authorize it, and ask your first question, for example: which product line lost margin last quarter?

## Watch out for

- Each connector needs its own OAuth grant, so the first setup is per account.
- It answers from the sources you authorize. A metric that lives nowhere in those systems will not appear in the answer.
- It is read-only by design. It reads and reports, and does not write to your accounts.
