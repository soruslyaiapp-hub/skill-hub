---
slug: book-to-skill
name: book-to-skill
tagline: Turns a technical book or document into a structured Claude Code skill that your agent loads only when it needs it.
category: meta
type: skill
tags: [ agent-skills, pdf, knowledge ]
platforms: [ claude-code ]
difficulty: beginner
price: free
status: community
language: Python
author:
  name: virgiliojr94
  url: https://github.com/virgiliojr94
links:
  source: https://github.com/virgiliojr94/book-to-skill
  install: npx skills add virgiliojr94/book-to-skill
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7492912726894292992/
  postedAt: 2026-08-11
metrics:
  githubStars: 31454
  lastCommit: 2026-09-18
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

book-to-skill distills a PDF, EPUB or other document into a structured skill. Your agent loads the part it needs on demand, instead of the whole book.

## Why it is useful

- Answers, not page numbers, when you come back to a book months later.
- The project says it uses 24 to 51 times fewer tokens than putting the book in context.

## How to use it

```bash
npx skills add virgiliojr94/book-to-skill
```

Then point it at the book file you want to turn into a skill.

## Watch out for

- Only convert books you have the right to use.
