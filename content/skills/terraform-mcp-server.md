---
slug: terraform-mcp-server
name: Terraform MCP Server
tagline: HashiCorp's official MCP server that connects agents to the Terraform Registry and HCP Terraform for accurate infrastructure code.
category: devops
type: mcp
tags: [ terraform, infrastructure-as-code, hashicorp ]
platforms: [ claude-code, codex, vscode, any ]
difficulty: intermediate
price: free
status: community
language: Go
author:
  name: HashiCorp
  url: https://github.com/hashicorp
links:
  source: https://github.com/hashicorp/terraform-mcp-server
  install: claude mcp add terraform -s user -t stdio -- docker run -i --rm hashicorp/terraform-mcp-server
metrics:
  githubStars: 1534
  lastCommit: 2026-09-26
  license: MPL-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

The server lets your agent look up providers, modules and resource docs in the Terraform Registry, and work with HCP Terraform. The agent writes Terraform from current docs instead of memory.

## Why it is useful

- Fewer wrong argument names and outdated provider versions.
- Official, and it runs as a single Docker container.

## How to use it

```bash
claude mcp add terraform -s user -t stdio -- docker run -i --rm hashicorp/terraform-mcp-server
```

## Watch out for

- Review every plan before you apply it. The agent can write valid code that does the wrong thing.
