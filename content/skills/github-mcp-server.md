---
slug: github-mcp-server
name: GitHub MCP Server
tagline: GitHub's official MCP server. Let agents read code, manage issues and pull requests, and check workflow runs.
category: integrations
type: mcp
tags: [ github, issues, pull-requests, ci ]
platforms: [ vscode, claude-code, cursor, any ]
difficulty: beginner
price: free
status: community
language: Go
author:
  name: GitHub
  url: https://github.com/github
links:
  source: https://github.com/github/github-mcp-server
metrics:
  githubStars: 33118
  lastCommit: 2026-09-21
  license: MIT
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: true
---

## What it does

The GitHub MCP Server connects AI tools to GitHub. Agents can read repositories and files, manage issues and pull requests, look at code security alerts and check GitHub Actions runs.

## Why it is useful

- The agent can go from an issue to an open pull request without leaving the chat.
- It is official. Use GitHub's hosted remote server, or run it yourself with Docker.

## How to use it

Most clients can add the hosted remote server with a GitHub sign-in. The README shows the setup for each client and the Docker option.

## Watch out for

- Limit the toolsets and token scopes to what the agent needs. Write access to many repositories is a big risk.
