---
slug: firecrawl-mcp
name: Firecrawl MCP
tagline: The official Firecrawl MCP server. Search, scrape and crawl the live web from any MCP agent and get clean content back.
category: data-research
type: mcp
tags: [ scraping, web-search, crawler ]
platforms: [ claude-code, cursor, any ]
difficulty: beginner
price: freemium
status: community
language: JavaScript
author:
  name: Firecrawl
  url: https://github.com/firecrawl
links:
  source: https://github.com/firecrawl/firecrawl-mcp-server
  install: env FIRECRAWL_API_KEY=fc-YOUR_API_KEY npx -y firecrawl-mcp
metrics:
  githubStars: 7471
  lastCommit: 2026-09-17
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

This server connects Firecrawl to your agent. The agent can search the web, scrape pages to clean Markdown, crawl sites and extract structured data.

## Why it is useful

- Clean, LLM-ready content without writing your own scraper.
- The hosted service renders JavaScript pages for you.

## How to use it

Get an API key from Firecrawl, then run:

```bash
env FIRECRAWL_API_KEY=fc-YOUR_API_KEY npx -y firecrawl-mcp
```

## Watch out for

- It uses the hosted Firecrawl API, which is paid beyond the free credits.
- On Windows, use the command format shown in the README.
