---
slug: claude-youtube-editor
name: Claude YouTube Editor
tagline: Record the talking head and Claude Code does the rest, from the cut and visuals to the thumbnail and the upload.
category: media
type: workflow
tags: [ video-editing, remotion, youtube ]
platforms: [ claude-code ]
difficulty: advanced
price: free
status: community
language: TypeScript
author:
  name: hassancs91
  url: https://github.com/hassancs91
links:
  source: https://github.com/hassancs91/claude-youtube-editor
  install: git clone https://github.com/hassancs91/claude-youtube-editor
metrics:
  githubStars: 304
  lastCommit: 2026-08-18
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
---

## What it does

An open-source pipeline that takes a raw recording to a published YouTube video. Claude Code runs a set of skills for the cut, the visuals, the voice, the sound effects, the thumbnail and the upload. Every on-screen moment is built as Remotion (React video) code, not screen-recorded.

## Why it is useful

- You record once and skip the video editor.
- Visuals are code, so they are easy to repeat and change between videos.
- The editor lives in `.claude/skills/`, so you can read and change each step.

## How to use it

You need Claude Code, Python 3.10+ and Node 18+.

```bash
git clone https://github.com/hassancs91/claude-youtube-editor
cd claude-youtube-editor
```

Follow the Quickstart in the README to set up Python and the Remotion registry, then open the folder in Claude Code.

## Watch out for

- Claude Code needs a paid plan or API credits. Check the cost table in the README before the first run.
- This is a full pipeline with several moving parts. Plan an afternoon for setup.
