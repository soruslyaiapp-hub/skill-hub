---
slug: aws-mcp-servers
name: AWS MCP Servers
tagline: A suite of MCP servers from AWS Labs for AWS docs, the AWS API, infrastructure as code, support and many individual services.
category: devops
type: mcp
tags: [ aws, cloud, infrastructure ]
platforms: [ claude-code, cursor, any ]
difficulty: intermediate
price: free
status: community
language: Python
author:
  name: AWS Labs
  url: https://github.com/awslabs
links:
  source: https://github.com/awslabs/mcp
  install: claude mcp add aws-docs uvx awslabs.aws-documentation-mcp-server@latest
metrics:
  githubStars: 9727
  lastCommit: 2026-09-24
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

AWS Labs publishes a family of MCP servers, one per job: AWS documentation, the AWS API, infrastructure as code, support cases and many individual services. Each one gives your agent focused AWS tools.

## Why it is useful

- The documentation server alone stops a lot of guessing about AWS APIs.
- You add only the servers you need, so the tool list stays small.

## How to use it

```bash
claude mcp add aws-docs uvx awslabs.aws-documentation-mcp-server@latest
```

## Watch out for

- AWS now names the Agent Toolkit for AWS as the successor to these servers. Check the README before a new setup.
- Servers that call AWS APIs use your credentials. Use a least-privilege role.
