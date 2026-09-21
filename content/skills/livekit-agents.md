---
slug: livekit-agents
name: LiveKit Agents
tagline: A Python framework for building realtime voice and video AI agents, with telephony, job scheduling and MCP support built in.
category: agent-optimization
type: tool
tags: [ voice-agents, realtime, telephony ]
platforms: [ any ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: LiveKit
  url: https://github.com/livekit
links:
  source: https://github.com/livekit/agents
  install: pip install "livekit-agents[openai,deepgram,cartesia]"
origin:
  linkedinUrl: https://www.linkedin.com/feed/update/urn:li:share:7501972419381866499/
  postedAt: 2026-09-05
metrics:
  githubStars: 14296
  lastCommit: 2026-09-21
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

LiveKit Agents builds real-time, multimodal agents that can see, hear and talk. It saves you from wiring speech-to-text, the LLM and text-to-speech together by hand.

## Why it is useful

- Job scheduling, telephony and MCP integration come built in.
- Includes testing support, so you can check that voice agents behave correctly.

## How to use it

```bash
pip install "livekit-agents[openai,deepgram,cartesia]"
```

There is also a skill for coding agents: `npx skills add livekit/agent-skills --skill livekit-agents`.

## Watch out for

- Voice pipelines call several paid services per minute of talk. Check the costs.
