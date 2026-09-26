---
slug: skill-recorder
name: Skill Recorder
tagline: Record yourself doing a task once, and this Microsoft desktop app turns the session into a reusable agent skill.
category: meta
type: tool
tags: [ agent-skills, automation, screen-recording ]
platforms: [ any ]
difficulty: intermediate
price: free
status: community
language: TypeScript
author:
  name: Microsoft
  url: https://github.com/microsoft
links:
  source: https://github.com/microsoft/skill-recorder
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7490322150063759360/
  postedAt: 2026-08-04
metrics:
  githubStars: 4119
  lastCommit: 2026-09-23
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

Skill Recorder captures a real work session: screen activity, app switches, URLs and optional spoken narration. It then uses the GitHub Copilot CLI to rebuild the session as an intent plus ordered steps, and packages that as a skill or automation.

## Why it is useful

- Build agent skills by doing the task, not by writing prompts or scripts.
- Capture happens locally.

## How to use it

Install the desktop app from the README, record one run of the task, then review the generated skill.

## Watch out for

- Recordings can contain private data. Close sensitive apps before you record.
- It needs the GitHub Copilot CLI.
