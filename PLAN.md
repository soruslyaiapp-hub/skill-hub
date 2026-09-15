# SkillHub — Build Plan

> An open, searchable directory of AI skills, agents, MCP servers and prompts.
> Think "Hugging Face, but for skills instead of models."

- **Status:** Built — phases 0 to 6 done. Live on GitHub. Waiting on Ahmed: Vercel sign-in and deploy, name and domain, optional Supabase.
- **Owner:** Ahmed
- **Created:** 2026-09-02
- **Last updated:** 2026-09-15

---

## 1. Why we build this

Ahmed finds useful AI skills, researches them, and posts them on LinkedIn.
LinkedIn is a bad archive:

- Posts sink after 48 hours.
- There is no search, no category, no filter.
- Readers cannot compare two skills.
- The work is lost after one week.

**SkillHub fixes this.** Every LinkedIn post becomes a permanent, searchable page.
LinkedIn stays the marketing channel. SkillHub becomes the library.

### Goals

| # | Goal | How we measure it |
|---|------|-------------------|
| G1 | One page per skill, forever | 100% of new LinkedIn posts also land on the site |
| G2 | Find any skill in under 15 seconds | Search + filters on the home page |
| G3 | Look professional | Clean design, dark mode, fast load (Lighthouse > 90) |
| G4 | Grow without Ahmed doing all the work | Public "Submit a skill" flow |
| G5 | Be the default link people share | Own OG images, clean URLs, an API |

### Non-goals (for v1)

- We do not host or run the skills. We link to them.
- We do not build a paid marketplace.
- We do not build user accounts in v1.

---

## 2. What a "skill" is here

A **skill** is any packaged, reusable AI capability. It can be:

| Type | Example |
|------|---------|
| `skill` | A Claude Code skill folder with `SKILL.md` |
| `mcp` | An MCP server (Model Context Protocol) |
| `agent` | A subagent definition |
| `prompt` | A single strong prompt or prompt pack |
| `workflow` | A multi-step recipe or slash command |
| `hook` | An automation hook |
| `plugin` | A bundle of the above |
| `tool` | A CLI, library or app used with an agent (RTK, Repomix) |

---

## 3. Categories

This is the heart of the product. We use **one primary category** plus **many tags**.

### 3.1 Primary categories

| Key | Name | What goes in it |
|-----|------|-----------------|
| `agent-optimization` | Agent Optimization | Orchestration, multi-agent, planning, memory, self-improvement, evals |
| `token-cost` | Token & Cost Optimization | Context compression, caching, model routing, output trimming |
| `coding` | Coding & Engineering | Code review, debugging, tests, refactor, migrations, build fixes |
| `media` | Media & Creative | Video editing, image generation, audio, design, motion |
| `content` | Content & Writing | Blogs, docs, newsletters, social posts, translation |
| `data-research` | Data & Research | Scraping, analysis, RAG, deep research, dashboards |
| `business` | Business & Ops | Sales, marketing, finance, HR, CRM, support |
| `devops` | DevOps & Infra | CI/CD, deploy, Docker, Kubernetes, monitoring |
| `security` | Security & Compliance | Audits, secret scanning, pentest, HIPAA/SOC2 |
| `productivity` | Productivity & Personal | Email, calendar, notes, files, browser |
| `integrations` | Integrations & Connectors | API wrappers, MCP servers, SaaS connectors |
| `meta` | Meta / Skill Building | Skills that build skills, prompt optimizers, eval harnesses |

Rule: if a skill fits two categories, pick the **job it does**, not the tool it uses.

### 3.2 Filter facets (cross-cutting)

These are separate filters, not categories:

- **Platform:** Claude Code / Claude.ai / Codex / Cursor / VS Code / Windsurf / ChatGPT / Any
- **Type:** skill / mcp / agent / prompt / workflow / hook / plugin / tool
- **Difficulty:** Beginner / Intermediate / Advanced
- **Price:** Free / Freemium / Paid
- **Status:** Verified / Community / Experimental / Deprecated
- **Freshness:** Updated < 30 days / < 6 months / Stale
- **Language:** Python / TypeScript / Go / Rust / N-A

---

## 4. Data model

One file per skill. Human readable. Git tracked. Reviewable in a pull request.

`content/skills/<slug>.md`

```yaml
---
slug: "token-budget-advisor"
name: "Token Budget Advisor"
tagline: "Cuts context waste by 40% before the model ever sees it."
category: "token-cost"
type: "skill"
tags: ["context", "cost", "claude-code"]
platforms: ["claude-code"]
difficulty: "intermediate"
price: "free"
status: "verified"

author:
  name: "Jane Doe"
  url: "https://github.com/janedoe"

links:
  source: "https://github.com/janedoe/token-budget-advisor"
  docs: "https://example.com/docs"
  install: "npx skillhub add token-budget-advisor"

media:
  cover: "/covers/token-budget-advisor.png"
  video: "https://youtube.com/watch?v=xxxx"        # demo video
  screenshots: ["/shots/tba-1.png"]

origin:
  linkedinUrl: "https://linkedin.com/posts/xxxx"   # the original post
  postedAt: "2026-08-14"

metrics:                # auto-filled by a nightly job
  githubStars: 0
  lastCommit: null

addedAt: "2026-08-15"
updatedAt: "2026-08-15"
featured: false
---
```

Below the front matter comes the markdown body: the problem it solves, how it
works, install steps, an example of the output, and the gotchas.

**Why files and not a database:**

- Git gives free history, review, and rollback.
- Others can contribute by pull request, like an "awesome" list.
- The site builds to static pages, so it is fast and almost free to host.
- We can add a database later for votes only, without moving the content.

---

## 5. Tech stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 16 (App Router)** | Static pages, great SEO, easy OG images |
| Language | **TypeScript** | Type-safe front matter |
| Styling | **Tailwind CSS v4 + shadcn/ui** | Fast, clean, dark mode built in |
| Content | **Markdown + YAML front matter** | Safe for public PRs: plain Markdown cannot run code at build time (MDX can) |
| Validation | **Zod** | Bad front matter fails the build, not the site |
| Search | **Fuse.js** (client side) | Zero cost up to about 2,000 skills |
| Icons | **Lucide** | Consistent |
| Hosting | **Vercel** | Free tier, preview deploy for every PR |
| Analytics | **Umami** or **Plausible** | Privacy friendly, no cookie banner |
| Later: votes and auth | **Supabase** | Only when we need it |

Upgrade path: when search gets slow, move to Meilisearch or Algolia.
Nothing else changes.

---

## 6. Pages

| Route | Purpose |
|-------|---------|
| `/` | Hero, trending, featured, category grid |
| `/skills` | The main browse page: search, filters, sort, cards |
| `/skills/[slug]` | Full skill page: description, demo video, install, links |
| `/categories/[key]` | One category, pre-filtered |
| `/tags/[tag]` | One tag |
| `/collections/[slug]` | Curated bundles, e.g. "Video editor starter kit" |
| `/submit` | Form that opens a pre-filled GitHub pull request |
| `/about` | What this is, how to contribute |
| `/api/skills.json` | Public JSON feed |
| `/rss.xml` | RSS feed of new skills |

### Browse page layout

```
+--------------------------------------------------------------+
|  Search ...                            [Sort: Newest v]       |
+---------------+----------------------------------------------+
| CATEGORY      |  +--------+ +--------+ +--------+             |
| [ ] Agent Opt |  |  card  | |  card  | |  card  |             |
| [ ] Token/Cost|  +--------+ +--------+ +--------+             |
| [ ] Coding    |  +--------+ +--------+ +--------+             |
| ...           |  |  card  | |  card  | |  card  |             |
|               |  +--------+ +--------+ +--------+             |
| PLATFORM      |                                               |
| TYPE          |                                               |
| DIFFICULTY    |                                               |
| PRICE         |                                               |
+---------------+----------------------------------------------+
```

Filters live in the URL, for example `/skills?category=coding&platform=claude-code`.
This makes every filtered view shareable and indexable by search engines.

### A skill card shows

Cover image, name, tagline, category chip, platform chips, GitHub stars,
and a freshness dot.

---

## 7. Phases

Each phase ends with something you can show people.

### Phase 0 — Setup (0.5 day)

- [x] Working name: **SkillHub** (rename in one place: `src/lib/site.ts`)
- [ ] Buy the domain (see D1)
- [x] `git init` and MIT licence
- [x] Pushed to GitHub, now at https://github.com/soruslyaiapp-hub/skill-hub (public). CI passes.
- [x] Deployed on Vercel (project `skill-hub` in Verbalyft's projects): https://skill-hub-teal.vercel.app
- [x] `create-next-app`: Next.js 16.3, React 19.2, TypeScript, Tailwind v4
- [x] Add shadcn/ui (Base UI flavour), Lucide, Zod, Vitest
- [ ] Connect the repo to Vercel, confirm the first deploy — needs Ahmed's OK

**Done when:** an empty site is live at a URL.

### Phase 1 — Content model (1 day)

- [x] Write the Zod schema for the skill front matter (`src/lib/content/schema.ts`)
- [x] Write the Markdown loader and the validator (`npm run validate` runs before every build)
- [x] Write the category list (`src/lib/taxonomy.ts`) and filter lists (`src/lib/facets.ts`)
- [x] Add 5 real seed skills, checked against GitHub (swap in your LinkedIn picks any time)
- [x] Add `npm run new-skill`, a question-based file generator that never overwrites

**Done when:** `npm run build` fails if any skill file is wrong.

### Phase 2 — MVP site (3 days)

- [x] Skill card component (category tint, stars, platforms, freshness dot)
- [x] `/skills` browse page with URL-driven filters and live counts per option
- [x] Client-side search with Fuse.js (press / to focus)
- [x] Sort by newest, stars, recently updated and name (plus best match while searching)
- [x] `/skills/[slug]` detail page with a video embed, an install block with copy, and related skills
- [x] `/categories`, `/categories/[key]` and `/tags/[tag]` pages
- [x] Empty states, dark mode and the mobile layout (checked at 375 px)

**Done when:** you can find any of the 5 seed skills in under 15 seconds on a phone.

### Phase 3 — Content push (2 days, in parallel)

- [x] Backfill to 47 skills, each checked against its GitHub repo and README
- [x] `npm run import -- file.yaml` for bulk adds, and `npm run sync:github` to refresh stars, last commit, licence and archived state
- [x] Write a short, honest body for each one, not marketing copy (what it does, why, how, watch out for)
- [x] Covers: generated from the category colour and icon, so no image files are needed (real screenshots go in `media.screenshots`)
- [ ] Swap in Ahmed's own LinkedIn picks, add `origin.linkedinUrl`, and mark tested ones `status: verified`

**Done when:** every category has at least 2 skills. This is the launch bar.

### Phase 4 — Polish and SEO (2 days)

- [x] Design pass: card names wrap to two lines, active menu link, focus rings on cards, light and dark mode checked
- [x] Auto-generated OG images for the site and for every skill (made at build time)
- [x] LinkedIn Share button and Copy link on every skill page
- [x] `sitemap.xml`, `robots.txt`, schema.org `SoftwareApplication` JSON-LD (plus breadcrumbs and a site search action)
- [x] Lighthouse pass: accessibility, best practices and SEO all 100 (home on desktop, /skills on mobile). Speed: LCP 0.26 s on desktop, 2.0 s on a throttled phone (good is under 2.5 s), layout shift 0
- [x] 404 page and loading skeletons
- [x] Add analytics: Plausible or Umami, off until an env var is set (see `.env.example`)

**Done when:** pasting a skill URL into LinkedIn shows a good preview card.

### Phase 5 — Contribution flow (2 days)

- [x] `/submit` form that builds a pre-filled GitHub PR link (live checks with the same rules as the build, plus a "suggest in an issue" fallback)
- [x] `/about` page, and Submit + About in the menu
- [x] `CONTRIBUTING.md`, a PR template and a "Suggest a skill" issue form
- [x] GitHub Action (CI): validate, test, lint, type check and build on every PR
- [x] Nightly Action: refresh GitHub stars, last commit, licence and archived state, then commit
- [x] Weekly Action: check every link and open an issue if any are broken (`npm run check:links`)

**Done when:** a stranger can add a skill without your help.

### Phase 6 — Growth (ongoing)

- [x] `/api/skills.json` (open to other sites) and `/rss.xml` (newest 50)
- [x] 6 collections, and a "Skill of the week" that rotates through featured skills
- [x] Newsletter signup (off until `NEXT_PUBLIC_NEWSLETTER_ACTION` is set) and `npm run digest` for the weekly email
- [x] Compare view: two skills side by side, picks kept in the link
- [x] Bookmarks in `localStorage` (Save button, /bookmarks page)
- [x] Upvotes with Supabase and GitHub login: code and SQL ready, off until the Supabase project exists
- [ ] Create the Supabase project and run the SQL — needs Ahmed's OK (it changes a real database)
- [x] A `skillhub` CLI in `packages/cli` (search, info, add with a yes/no check)
- [ ] Publish the CLI to npm — needs Ahmed's OK (it is public)
- [x] `npm run linkedin -- <slug>`: a LinkedIn post draft that links back to the page (idea from section 8)

---

## 8. LinkedIn workflow

Today the post dies. Here is the new loop:

```
research a skill
      |
      v
run  npm run new-skill      ->  creates content/skills/<slug>.mdx
      |
      v
fill the file, open a PR, merge
      |
      +--> the site auto-deploys; the page is live and searchable forever
      |
      v
post on LinkedIn WITH the SkillHub link
      |
      v
readers click through -> the site grows -> SEO grows
```

Extra idea: a script that turns a merged skill file into a ready-to-paste
LinkedIn post draft. One source, two outputs.

---

## 9. Ideas that make it better than a plain list

Ranked by value against effort.

**High value, low effort**

1. **Auto OG images.** Every skill link looks designed when shared. Big reach win.
2. **Freshness dot.** Green, amber, or grey by last-commit date. Instant trust signal.
3. **Copy-install button.** One click to copy the install command.
4. **URL-driven filters.** Every filtered view is a shareable, indexable link.
5. **Public JSON API.** Other people build on your data and link back to you.

**High value, medium effort**

6. **Collections / stacks.** "Starter kit for video editors", "Cut your token bill".
   These are the pages people bookmark and share.
7. **Compare two skills.** Nobody else does this well today.
8. **Weekly digest email.** Turns visitors into a returning audience.
9. **Verified badge.** You personally tested it. This is your moat, not the list.

**Later**

10. Upvotes and comments. Only after you have real traffic.
11. Contributor profile pages.
12. A "works with" matrix across platforms.
13. Playground or live demo embeds.

**Please avoid early:** user accounts, payments, and a custom CMS.
They add work and add no value before you have an audience.

---

## 10. Risks

| Risk | Effect | What we do |
|------|--------|------------|
| Content dries up | The site looks dead | Batch-write 30 skills before launch |
| Links rot | Broken pages | Nightly link-checker Action |
| Categories overlap | Confused users | One primary category, many tags |
| Spam pull requests | Wasted time | PR template plus schema validation in CI |
| Scope creep | It never ships | Do phases 0 to 4 only, then launch |

---

## 11. Naming ideas

| Name | Domain idea |
|------|-------------|
| SkillHub | skillhub.dev |
| SkillStack | skillstack.ai |
| The Skill Index | skillindex.dev |
| SkillForge | skillforge.dev |
| AgentSkills | agentskills.dev |

Check the trademark and the domain before you commit to a name.

---

## 12. Open decisions

- [ ] **D1 — Name and domain.** This blocks Phase 0.
- [x] **D2 — Content in Git files, or in Supabase?** Decided: Git files.
      Recommendation: **Git files.** Free, reviewable, and it fits your workflow.
      Move to a database only if non-technical people must add skills by form.
- [x] **D3 — Size of the seed set.** Done: 47 skills.

---

## 13. Progress log

| Date | Phase | Note |
|------|-------|------|
| 2026-09-02 | 0 | Plan written. |
| 2026-09-15 | 0 | Repo created. Next.js 16 + Tailwind v4 + shadcn/ui scaffold builds. Push and deploy wait for Ahmed. |
| 2026-09-15 | 1 | Content model: schema, loader, validator, generator, 5 seeds, unit tests. Switched MDX to plain Markdown for PR safety. |
| 2026-09-15 | 2 | MVP site: home, browse with search + filters in the URL, detail, category and tag pages. All pages are static. |
| 2026-09-15 | 3 | 47 real skills across all 12 categories. GitHub stats filled by the new sync script. |
| 2026-09-15 | 4 | OG images, sitemap, robots, JSON-LD, 404, skeletons, analytics hook, LinkedIn share. Lighthouse 100 on accessibility, best practices and SEO. |
| 2026-09-15 | 5 | Submit form to PR, about page, CI, nightly stats, weekly link check, CONTRIBUTING, templates, full README. All 92 links OK. |
| 2026-09-15 | 6 | JSON API, RSS, collections, skill of the week, compare, bookmarks, newsletter, upvotes (off), CLI, digest and LinkedIn scripts. 63+ tests. |
| 2026-09-15 | Launch | Repo created and pushed to GitHub; CI green. Vercel needs Ahmed to sign in and press Deploy. |
