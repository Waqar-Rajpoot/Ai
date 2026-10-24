# AI Tools for Everyday People

A fully static Next.js site: a school, a publisher and a review desk for AI models.
Every page and figure is written by hand, dated and sourced. See `AI_Tools.pdf` (Project Blueprint v3.1).

## Setup

```bash
npm install
npm install -D vitest
cp .env.example .env.local   # then fill in the values
npm run dev
```

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Static export to `out/` |
| `npm run typecheck` | `tsc --noEmit` (add: `"typecheck": "tsc --noEmit"`) |
| `npm test` | Run the `lib/` tests (add: `"test": "vitest run"`) |

## Environment variables

Read only through `lib/config/env.ts`. See `.env.example`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical URLs and sitemap |
| `NEXT_PUBLIC_SITE_NAME` | yes | Logo, titles, footer |
| `NEXT_PUBLIC_CONTACT_EMAIL` | yes | Contact page |
| `NEXT_PUBLIC_NEWSLETTER_ACTION_URL` | no | External newsletter signup form |

## Folder structure

```
app/          Routes only. Pages compose components.
components/   UI: layout/, shared/, home/ (more per feature in later phases)
lib/          Pure, typed logic, data and config. Never imports components/ or app/.
  config/     env.ts (only reader of process.env), siteConfig, navLinks, thresholds
  shared/     levels, breadcrumbs, metadata, sitemap
  pages/      Heading outlines of trust, legal and utility pages
  home/       Home page copy
types/        Shared types
```

Rules: components never hold calculation logic; `lib/` never imports from `components/` or `app/`;
`app/` files import `lib/` only for metadata and static params.

## Naming

Components and component files `PascalCase`; logic files and functions `camelCase`;
constants `UPPER_SNAKE_CASE`; types `PascalCase`; CSS Modules match their component;
routes and content files `kebab-case`.
