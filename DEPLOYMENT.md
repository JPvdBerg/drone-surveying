# Deployment & Hardening Runbook

This repo ships hardened by default at the **code/config** level. The remaining
items are **account/DNS actions** that can't live in a repo. This is the
checklist for taking the site from "polished landing page" to "production-grade."

Legend: ✅ done in this repo · ⬜ account/DNS action you perform later.

---

## What's already implemented in the repo

| Area | Item | Where |
| --- | --- | --- |
| ✅ Security | Content Security Policy (meta) | [`index.html`](index.html) |
| ✅ Security | Full header set (HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) | [`public/_headers`](public/_headers) |
| ✅ Security | Referrer policy meta | [`index.html`](index.html) |
| ✅ Pipeline | Dependabot (npm + actions) | [`.github/dependabot.yml`](.github/dependabot.yml) |
| ✅ Pipeline | CI build check on PRs | [`.github/workflows/ci.yml`](.github/workflows/ci.yml) |
| ✅ Perf | Image optimization at build | [`vite.config.ts`](vite.config.ts) |
| ✅ Perf | Resource hints (preconnect + dns-prefetch) | [`index.html`](index.html) |
| ✅ Reliability | Error boundary (Sentry-ready) | [`src/components/ErrorBoundary.tsx`](src/components/ErrorBoundary.tsx) |
| ✅ Reliability | Branded 404 fallback | [`public/404.html`](public/404.html) |
| ✅ SEO | LocalBusiness JSON-LD (Gauteng) | [`index.html`](index.html) |

> **Note on `public/_headers`:** GitHub Pages **ignores** it (Pages can't send
> custom headers). It applies automatically on Cloudflare Pages or Netlify, and
> documents the exact header policy to mirror in a Cloudflare Transform Rule if
> you keep GitHub Pages behind the Cloudflare proxy (below).

---

## Account / DNS actions (do when you set up hosting)

### ⬜ 1. Cloudflare proxy (WAF + DDoS + headers + Brotli + edge cache)
The single highest-impact step. It also unlocks items 2, 5, and 11 from the plan.
1. Add the site's domain to Cloudflare; point the apex/`www` CNAME at
   `jpvdberg.github.io` and set the records to **Proxied** (orange cloud).
2. Add the custom domain in GitHub repo **Settings → Pages → Custom domain**
   (this writes a `CNAME` file) and tick **Enforce HTTPS**.
3. SSL/TLS mode: **Full (strict)**.
4. **Brotli**: Speed → Optimization → enable Brotli (automatic for text assets).
5. **Edge cache (Johannesburg POP)**: Cloudflare auto-serves from the JNB edge.
   Add a Cache Rule: cache `*.jpg,*.css,*.js,*.svg` with **Edge TTL** 1 month.

### ⬜ 2. Security headers via Cloudflare
GitHub Pages can't set headers, so replicate [`public/_headers`](public/_headers)
as a Cloudflare **Transform Rule → Modify Response Header** (or Workers). Set:
`Strict-Transport-Security`, `X-Frame-Options: DENY`, `X-Content-Type-Options:
nosniff`, `Referrer-Policy`, `Permissions-Policy`, and the `Content-Security-Policy`.
Verify with <https://securityheaders.com>.

### ⬜ 3. Cloudflare Turnstile (only once a backend handler exists)
The contact form is currently `mailto:`-based, so there's nothing server-side to
verify a token against yet. When you add a form backend (e.g. a Cloudflare Worker
or Formspree), drop a Turnstile widget in `Contact.tsx` and verify the token on
the handler before accepting the lead.

### ⬜ 4. Branch protection
**Settings → Branches → Add rule** for `main`: require the **CI / build** status
check (from [`ci.yml`](.github/workflows/ci.yml)) to pass before merge. Develop on
feature branches and PR into `main`.

### ⬜ 5. Dependabot alerts & 6. Secret scanning & 7. Push protection
**Settings → Code security**: enable **Dependabot alerts**, **Secret scanning**,
and **Push protection**. (Free on public repos; usually on by default.)

### ⬜ 8. Signed commits
```bash
# SSH signing (simplest if you already push over SSH):
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub
git config --global commit.gpgsign true
```
Then add the key as a **Signing key** in GitHub → Settings → SSH and GPG keys.

### ⬜ 9. Sentry (production error logging)
`npm i @sentry/react`, init in `main.tsx`, then forward the error in
`ErrorBoundary.componentDidCatch` (there's a marked hook line). Use a free Sentry
project DSN; no DSN is committed to the repo.

---

## Before go-live: replace placeholders
- `index.html` JSON-LD: `REPLACE_WITH_STREET_ADDRESS`, `REPLACE_WITH_POSTAL_CODE`,
  and confirm `geo` lat/long for the real base of operations.
- Confirm `src/data.ts` (`COMPANY`, `SERVICE_AREA`) details are current.
