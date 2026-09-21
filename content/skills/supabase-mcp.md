---
slug: supabase-mcp
name: Supabase MCP
tagline: Connect your Supabase projects to Cursor, Claude, Windsurf and other assistants to design tables, run queries and more.
category: integrations
type: mcp
tags: [ supabase, postgres, database ]
platforms: [ cursor, claude-code, claude-ai, windsurf, any ]
difficulty: intermediate
price: free
status: community
language: TypeScript
author:
  name: Supabase
  url: https://github.com/supabase
links:
  source: https://github.com/supabase/mcp
metrics:
  githubStars: 2916
  lastCommit: 2026-09-19
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

The Supabase MCP server lets your assistant work with your Supabase projects: design tables, run SQL, manage migrations and fetch project configuration.

## Why it is useful

- The agent sees your real schema, so the code it writes matches your database.
- It is official and maintained by Supabase.

## How to use it

Follow the setup in the README for your client.

## Watch out for

- Connect it to a development project, not to production data.
- Prefer read-only mode, and scope it to one project.
