---
slug: claude-code-security-review
name: Claude Code Security Review
tagline: An Anthropic GitHub Action that uses Claude to review the changes in each pull request for security vulnerabilities.
category: security
type: workflow
tags: [ github-actions, code-review, pull-requests ]
platforms: [ any ]
difficulty: beginner
price: free
status: community
language: Python
author:
  name: Anthropic
  url: https://github.com/anthropics
links:
  source: https://github.com/anthropics/claude-code-security-review
metrics:
  githubStars: 6251
  lastCommit: 2026-02-11
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Add this GitHub Action and Claude reads the changes in every pull request, looks for security problems and reports what it finds. It reasons about the context of the code, not only about fixed patterns.

## Why it is useful

- A security reviewer on every PR, including the ones nobody has time to look at.
- Findings arrive where developers already work: in the pull request.

## How to use it

Add the action to `.github/workflows/security.yml` as shown in the README, and store your Anthropic API key as a repository secret.

## Watch out for

- It uses API credits on every PR. Limit it to the branches that matter.
- Activity has slowed: the last commit was in February 2026.
