# How to deploy this site — full instructions

This is the complete, step-by-step guide to put the site live at
**https://ipd02.github.io** and to update it later.

Read this once, top to bottom. Everything you need is here.

---

## 0. What this is

- A **static Astro site** (no backend, no database, no server to run).
- Deployed to **GitHub Pages** — free hosting for a public repo.
- Published automatically by a **GitHub Actions** workflow: you push your code,
  GitHub builds it and puts it online. You never build/upload manually.

Because it's a GitHub **user site**, the repository **must** be named exactly
`ipd02.github.io` and live under the `ipd02` GitHub account.

---

## 1. Prerequisites (one time)

Do the deploy on a machine set up for your **personal `ipd02` GitHub account**
(not a work account).

You need:

- **Git** — check with `git --version`
- **GitHub CLI** (`gh`) — optional but easiest; check with `gh --version`
  (install: https://cli.github.com). If you don't want it, there's a manual
  path in step 3.
- Node.js and pnpm are **not** required on this machine — GitHub builds the site
  for you. (You only need them if you want to preview locally; see section 7.)

Make sure `gh`/git are authenticated as `ipd02`:

```sh
gh auth status        # should show the ipd02 account
git config user.email # should be your personal email, not the work one
```

If git shows the wrong identity, set it **for this repo only** after step 3:

```sh
git config user.name  "Ignacio Pineda"
git config user.email "your-personal-email@example.com"
```

---

## 2. Get the project onto that machine

Copy the entire `site/` folder (this folder) to the personal machine — e.g. via
AirDrop, a USB drive, or a zip. Then open a terminal **inside** the copied
folder.

> Do **not** copy the `node_modules/`, `dist/`, or `.astro/` folders if they
> exist — they're regenerated automatically and are already gitignored.

---

## 3. Create the GitHub repository

The repo name **must** be exactly `ipd02.github.io`.

**Option A — GitHub CLI (recommended), from inside the folder:**

```sh
gh repo create ipd02.github.io --public --source=. --remote=origin
```

**Option B — manually:**

1. Go to https://github.com/new
2. Repository name: `ipd02.github.io`
3. Visibility: **Public**
4. Do **not** add a README/.gitignore/license (this folder already has them)
5. Create the repo, then link it:

```sh
git remote add origin git@github.com:ipd02/ipd02.github.io.git
# or, with HTTPS:
# git remote add origin https://github.com/ipd02/ipd02.github.io.git
```

---

## 4. Commit and push

```sh
git init
git branch -M main
git add .
git commit -m "feat: initial site"
git push -u origin main
```

---

## 5. Turn on GitHub Pages

On github.com, in the `ipd02.github.io` repo:

1. **Settings** → **Pages**
2. Under **Build and deployment → Source**, choose **GitHub Actions**

That's the only setting to change. The workflow at
`.github/workflows/deploy.yml` handles the rest.

---

## 6. Wait, then verify

- Push to `main` (already done in step 4) triggers the deploy automatically.
- Open the repo's **Actions** tab. The **"Deploy to GitHub Pages"** run should
  go green in ~1–2 minutes.
- Visit **https://ipd02.github.io** — the site is live.

If the Actions run is red, see **Troubleshooting** below.

---

## 7. (Optional) Preview locally before pushing

Only if you want to see changes before they go live. Requires **Node 22+** and
**pnpm 11+** (install pnpm: https://pnpm.io/installation).

```sh
pnpm install
pnpm dev        # live preview at http://127.0.0.1:4321
pnpm build      # production build into dist/
pnpm preview    # serve the built site at http://127.0.0.1:4321
```

---

## 8. Updating the site later

Any change — new post, edited text, new photo — goes live by pushing to `main`:

```sh
git add .
git commit -m "content: add post about X"
git push
```

The workflow rebuilds and redeploys automatically. No other steps.

### Add a new writing post

Create a file `src/content/writing/<slug>.md` with this frontmatter:

```md
---
title: "Post title"
description: "One-line summary."
pubDate: 2026-01-31
tags: ["tag-one", "tag-two"]
---

Your post body in Markdown.
```

It appears automatically at `/writing/<slug>`, in the writing index, and in the
RSS feed. (The "Writing" nav link only shows once at least one post exists.)

### Swap the photo or CV

- Photo: replace `public/photo.jpg` (keep the same filename).
- CV: replace `public/cv/Ignacio_Pineda_CV.pdf` (keep the same filename), or
  update the link in `src/pages/experience.astro` if you rename it.

---

## 9. (Optional, later) Custom domain

To serve the site from your own domain (e.g. `ignaciopineda.com`):

1. Repo **Settings → Pages → Custom domain** → enter the domain, save.
2. Add a file `public/CNAME` containing only the domain, e.g.:
   ```
   ignaciopineda.com
   ```
   (This keeps the domain set after every rebuild.)
3. Update `site:` in `astro.config.mjs` to the new URL, e.g.
   `site: 'https://ignaciopineda.com'`.
4. Configure DNS with your registrar (a `CNAME` record pointing to
   `ipd02.github.io`, or GitHub's A/AAAA records — see
   https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site).
5. Back in **Settings → Pages**, tick **Enforce HTTPS**.
6. Commit and push.

---

## 10. Troubleshooting

**Actions run fails at "Install dependencies"**
The committed `pnpm-lock.yaml` must match `package.json`. If you changed
dependencies, run `pnpm install` locally and commit the updated lockfile.

**Site shows 404 after a green deploy**
Give it a minute (first deploy can lag). Confirm **Settings → Pages → Source**
is set to **GitHub Actions**, and the repo is named exactly `ipd02.github.io`.

**Pushed but nothing happened**
Make sure you pushed to the `main` branch (the workflow only runs on `main`).

**Wrong git account committed**
If a commit went out under the work account, fix identity with the
`git config user.email` command in section 1 and amend/re-commit before pushing.

**CSS/links look broken only on the live site**
Confirm `site:` in `astro.config.mjs` matches the real URL
(`https://ipd02.github.io`), then push again.

---

## Reference: project layout

```
public/                 Static files served as-is (photo, og image, cv, robots.txt)
src/
  components/           Nav, Footer, PostMeta, EmailObfuscated
  content/writing/      Blog posts (Markdown / MDX)
  layouts/              Base (site shell), PostLayout
  pages/                index, experience, contact, now, 404,
                        writing/ (index + [...slug]), rss.xml.ts
  styles/global.css     Design tokens + base styles
  content.config.ts     Content collection schema
astro.config.mjs        Site config + Content-Security-Policy
.github/workflows/      GitHub Pages deploy workflow
```
