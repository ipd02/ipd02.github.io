# ipd02.github.io

Personal site for Ignacio Pineda — Security Engineer.

Static [Astro](https://astro.build) site. No backend, no cookies, no trackers.
Content-Security-Policy locked. Deployed to GitHub Pages via GitHub Actions.

## Stack

- **Astro 7** (`output: 'static'`) — hand-rolled CSS, no UI framework
- **MDX** content collection for writing/posts
- Self-hosted fonts (`@fontsource-variable/inter`, `jetbrains-mono`)
- RSS feed + sitemap

## Local development

Requires Node 22+ and pnpm 11+.

```sh
pnpm install
pnpm dev        # http://127.0.0.1:4321
pnpm build      # production build into dist/
pnpm preview    # serve the built site at http://127.0.0.1:4321
```

## Project structure

```
public/                 Static assets served as-is
  cv/                   CV PDF
  .well-known/          security.txt
  photo.jpg, og.png, robots.txt
src/
  components/           Nav, Footer, PostMeta, EmailObfuscated
  content/writing/      Blog posts (Markdown / MDX)
  layouts/              Base (site shell), PostLayout
  pages/                Routes: index, experience, contact, now, 404
    writing/            Writing index + [...slug] post route
    rss.xml.ts          RSS feed
  styles/global.css     Design tokens + base styles
  content.config.ts     Content collection schema
astro.config.mjs        Site config + CSP directives
.github/workflows/      GitHub Pages deploy workflow
```

## Adding a post

Create `src/content/writing/<slug>.md` (or `.mdx`) with frontmatter:

```md
---
title: "Post title"
description: "One-line summary."
pubDate: 2026-01-31
tags: ["tag-one", "tag-two"]
---

Post body in Markdown.
```

The post appears automatically at `/writing/<slug>`, in the writing index, and
in the RSS feed. The "Writing" nav link shows once at least one post exists.

## Deployment

Deployment is automatic. Every push to `main` triggers the workflow in
`.github/workflows/deploy.yml`, which builds the site and publishes it to
GitHub Pages.

**Full step-by-step instructions — first-time setup, updating, custom domain,
and troubleshooting — are in [`DEPLOY.md`](./DEPLOY.md).**
