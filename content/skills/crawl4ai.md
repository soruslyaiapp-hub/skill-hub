---
slug: crawl4ai
name: Crawl4AI
tagline: An open-source, LLM-friendly web crawler and scraper that turns pages into clean Markdown and structured data.
category: data-research
type: tool
tags: [ scraping, crawler, markdown, python ]
platforms: [ any ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: unclecode
  url: https://github.com/unclecode
links:
  source: https://github.com/unclecode/crawl4ai
  install: pip install -U crawl4ai
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7502697197587607552/
  postedAt: 2026-09-07
metrics:
  githubStars: 83899
  lastCommit: 2026-09-18
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Crawl4AI crawls websites and returns content in formats that models handle well: clean Markdown, or structured data that you define. It drives a real browser, so it copes with JavaScript-heavy pages.

## Why it is useful

- Open source and self-hosted, so there is no per-page fee.
- Built for RAG and agent pipelines, not only for dumping HTML.

## How to use it

```bash
pip install -U crawl4ai
```

Then run the setup step from the README to install the browser it uses.

## Watch out for

- Respect robots.txt and the terms of the sites you crawl.
- Large crawls need rate limits. Start small.
