---
slug: docx-skill
name: Word Documents (docx) Skill
tagline: The Anthropic skill that lets Claude create, read and edit real Word documents and templates.
category: content
type: skill
tags: [ word, documents, office, anthropic ]
platforms: [ claude-code, claude-ai ]
difficulty: beginner
price: free
status: community
language: Python
author:
  name: Anthropic
  url: https://github.com/anthropics
links:
  source: https://github.com/anthropics/skills/tree/main/skills/docx
  install: /plugin marketplace add anthropics/skills
metrics:
  githubStars: 178448
  lastCommit: 2026-09-24
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

This skill teaches Claude to work with Word files (`.docx`, and `.dotx` templates): create professional documents, read and edit existing ones, and keep the formatting intact.

## Why it is useful

- You get a real `.docx` file you can send, not Markdown you must reformat.
- It works on existing documents, so Claude can revise a report in place.

## How to use it

In Claude Code:

```bash
/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills
```

## Watch out for

- Complex layouts can still need a manual touch in Word.
- Check the license file in the skill folder before you reuse the code.
