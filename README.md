# Apex Aerial Survey: Drone Surveying Landing Page

A fast, mobile-first, static landing page for a drone surveying company, built
with **Vite + React + TypeScript + Tailwind CSS** and deployed to **GitHub
Pages** via GitHub Actions.

> Demo content (company name, contact details, stats) is placeholder copy;
> edit [`src/data.ts`](src/data.ts) to make it yours.

## Highlights

- **Mobile-first** layout with ≥44px touch targets and a slide-down mobile nav.
- **Accessible**: semantic HTML, ARIA labels, visible focus rings, a skip link,
  AA-contrast text, and `prefers-reduced-motion` support.
- **No backend**: the contact form builds a pre-filled `mailto:` link, so it
  works on a purely static host. (Swap in Formspree easily; see below.)
- **Optimized assets**: inline SVG icons, compressed/width-capped Unsplash hero
  image, system + Google fonts with `preconnect`.

## Local development

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build locally
```

## Deployment (GitHub Pages)

1. Push to the `main` branch of `https://github.com/JPvdBerg/drone-surveying`.
2. In the repo: **Settings → Pages → Build and deployment → Source → GitHub
   Actions**. (One-time setup.)
3. The [`deploy.yml`](.github/workflows/deploy.yml) workflow builds and publishes
   `dist/` on every push to `main`.

The site is served from a sub-path, so [`vite.config.ts`](vite.config.ts) sets
`base: '/drone-surveying/'`. Live URL:
`https://JPvdBerg.github.io/drone-surveying/`.

## Swapping the contact form to Formspree

The form field names (`name`, `email`, `company`, `service`, `message`) already
match a typical handler. To POST to [Formspree](https://formspree.io) instead of
opening a mail client, replace `handleSubmit` in
[`src/components/Contact.tsx`](src/components/Contact.tsx) with a `fetch` POST to
your form endpoint, or set `action="https://formspree.io/f/XXXX"` and
`method="POST"` on the `<form>`.
