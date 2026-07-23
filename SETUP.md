# First-time deployment to GitHub Pages

This is a **user site**, so the repository **must** be named exactly
`ipd02.github.io` and owned by the `ipd02` account. It will be served at
`https://ipd02.github.io`.

Do these steps **on a machine whose git/GitHub is configured for the personal
`ipd02` account** (not a work account).

## 1. Create the repository

Using the GitHub CLI (from inside this folder):

```sh
gh repo create ipd02.github.io --public --source=. --remote=origin
```

Or manually: create a public repo named `ipd02.github.io` on github.com, then:

```sh
git remote add origin git@github.com:ipd02/ipd02.github.io.git
```

## 2. Commit and push

```sh
git init
git branch -M main
git add .
git commit -m "feat: initial site"
git push -u origin main
```

## 3. Enable GitHub Pages (Actions source)

In the repo on github.com:

- **Settings → Pages → Build and deployment → Source: “GitHub Actions”**

That's it. The workflow in `.github/workflows/deploy.yml` runs on every push to
`main`: it installs dependencies, runs `pnpm build`, and publishes `dist/` to
Pages. The first run may take 1–2 minutes; the site then goes live at
`https://ipd02.github.io`.

## 4. Verify

- Check **Actions** tab — the “Deploy to GitHub Pages” run should be green.
- Open `https://ipd02.github.io`.

## Updating the site later

Just push to `main`:

```sh
git add .
git commit -m "content: add post about X"
git push
```

The workflow rebuilds and redeploys automatically.

## Custom domain (optional, later)

If you point a custom domain at the site:

1. Settings → Pages → Custom domain → enter the domain.
2. Add a `public/CNAME` file containing just the domain (so it survives rebuilds).
3. Update `site:` in `astro.config.mjs` to the new URL.
4. Configure DNS (CNAME to `ipd02.github.io`, or A/AAAA records per GitHub docs).
5. Enable “Enforce HTTPS”.
