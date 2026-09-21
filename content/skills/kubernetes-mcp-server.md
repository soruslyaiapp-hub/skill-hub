---
slug: kubernetes-mcp-server
name: Kubernetes MCP Server
tagline: An MCP server for Kubernetes and OpenShift that talks to the Kubernetes API directly, with no kubectl needed.
category: devops
type: mcp
tags: [ kubernetes, openshift, clusters, go ]
platforms: [ claude-code, claude-ai, vscode, any ]
difficulty: intermediate
price: free
status: community
language: Go
author:
  name: containers
  url: https://github.com/containers
links:
  source: https://github.com/containers/kubernetes-mcp-server
  install: npx kubernetes-mcp-server@latest
metrics:
  githubStars: 2113
  lastCommit: 2026-09-21
  license: Apache-2.0
  archived: false
addedAt: 2026-09-15
updatedAt: 2026-09-15
featured: false
---

## What it does

This server gives your agent tools to inspect and manage Kubernetes and OpenShift clusters: list and describe resources, read pod logs, run workloads and more. It is a native Go program that talks to the Kubernetes API directly.

## Why it is useful

- The agent does not need kubectl or helm installed to work.
- One binary, available through npx, uvx or a direct download.

## How to use it

Add it to your MCP client with `npx kubernetes-mcp-server@latest`. The README shows the setup for each client.

## Watch out for

- The agent acts with your kubeconfig permissions. Use a read-only context unless you want it to change things.
