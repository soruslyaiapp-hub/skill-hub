# SkillHub

The open directory of AI skills, agents, MCP servers and tools, sorted by the job they do.

**Live site: https://skill-hub-teal.vercel.app**

Good skills get shared on LinkedIn and then sink in the feed. SkillHub keeps them. Every entry gets a permanent, searchable page with a plain-English write-up, the install command and a link to the source.

## Features

- 47 checked entries in 12 categories, with filters for type, platform, difficulty, price, activity, status and language
- Fuzzy search (press `/`), five sorts, and every filtered view lives in the URL, so it can be shared
- A page per skill: install command with copy, demo video, related skills, LinkedIn share button
- Share images made for every skill, plus sitemap, robots.txt and schema.org data
- Nightly GitHub stats (stars, last commit, licence) and a weekly broken-link check
- A submit form that builds the file and opens a pull request
- Collections (hand-picked stacks), a skill of the week, and a compare page
- Saved skills in the browser, a public JSON API (`/api/skills.json`) and an RSS feed (`/rss.xml`)
- Optional upvotes with GitHub sign-in (Supabase) and a newsletter signup
- A small CLI, plus scripts that draft a LinkedIn post or the weekly digest email
- Light and dark mode. Lighthouse 100 for accessibility, best practices and SEO

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Add a skill

See [CONTRIBUTING.md](CONTRIBUTING.md). The short version: use `/submit` on the site, or run `npm run new-skill`.

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Validate content, then make the production build |
| `npm start` | Serve the production build |
| `npm run validate` | Check every skill file against the schema |
| `npm test` | Unit tests (Vitest) |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run new-skill` | Create a skill file by answering questions |
| `npm run import -- file.yaml` | Add many skills at once from a YAML list |
| `npm run sync:github` | Refresh stars, last commit and licence from GitHub |
| `npm run check:links` | Check every link in the skill files |
| `npm run linkedin -- <slug>` | Draft a LinkedIn post that links to the skill page |
| `npm run digest` | Draft the weekly digest email (Markdown) |

## Configuration

Copy `.env.example` to `.env.local`. All variables are optional.

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SITE_URL` | Public URL, used in the sitemap and share links. Vercel sets a default. |
| `NEXT_PUBLIC_GITHUB_REPO` | `owner/name`. Turns on the pull request button, "Suggest an edit" and GitHub links. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Turns on Plausible analytics. |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | Turns on Umami analytics (`NEXT_PUBLIC_UMAMI_SRC` for self-hosted). |
| `NEXT_PUBLIC_NEWSLETTER_ACTION` | Form action URL of your newsletter provider. Shows the signup box. |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Turn on upvotes (see below). |
| `GITHUB_TOKEN` | For `npm run sync:github` locally: 5,000 requests per hour instead of 60. |

## Deploy

1. Push the repo to GitHub.
2. Import it on [Vercel](https://vercel.com/new). The defaults work.
3. Set `NEXT_PUBLIC_GITHUB_REPO`, and `NEXT_PUBLIC_SITE_URL` if you use your own domain.

Every push to `main` deploys. Three GitHub Actions run on their own:

- **CI** on every pull request: validate, test, lint, type check, build.
- **Refresh GitHub stats** every night. It commits to `main`, which triggers a new deploy. If `main` is protected, allow the Actions bot to push.
- **Check links** every Monday. It opens an issue when links break.

## Upvotes (optional)

1. Create a Supabase project.
2. Run `supabase/migrations/20260915000000_skill_votes.sql` in the Supabase SQL editor (or with `supabase db push`).
3. In Supabase Auth, turn on the GitHub provider and add your site URL to the redirect URLs.
4. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`. A vote button then appears on every skill page.

Counts are public. Who voted is private (row-level security). Without the variables, no Supabase code is loaded.

## CLI

```bash
node packages/cli/bin/skillhub.mjs search token
```

See [packages/cli/README.md](packages/cli/README.md).

## Project structure

```
content/skills/     one Markdown file per skill
content/collections/ curated stacks of skills
packages/cli/       the skillhub CLI (no dependencies)
supabase/           SQL for the optional upvotes
scripts/            validate, new-skill, import, sync-github, check-links
src/app/            pages, share images, sitemap, robots
src/components/     UI (cards, browser, submit form)
src/lib/            content loader, schema, filters, search, helpers (with tests)
PLAN.md             roadmap and progress log
```

## Licence

Code: MIT, see [LICENSE](LICENSE). Each listed project belongs to its authors.
