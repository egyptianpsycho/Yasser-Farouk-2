# Yasser Farouk — Portfolio (Next.js)

A cinematic director / photographer portfolio built with **Next.js (App Router)** in
plain **JavaScript** (no TypeScript). Ported from the original TanStack project with
SEO optimization, `next/image`, self-hosted fonts via `next/font`, and a responsive,
Formspree-ready contact form.

## Requirements

- Node.js 18.18+ (Node 20+ recommended)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |

## Project structure

```text
app/
  layout.jsx      # <html>, fonts, global metadata + JSON-LD
  page.jsx        # home page (renders the client composition)
  globals.css     # theme tokens + Tailwind v4
  sitemap.js      # /sitemap.xml
  robots.js       # /robots.txt
components/
  OptimizedImage.jsx   # next/image wrapper (fill + responsive sizes)
  HomeClient.jsx       # interactive page composition
  Cursor / SmoothScroll / ScrollTextReveal / VideoPlayer ...
  sections/            # Nav, Hero, Reel, Videography, Photography,
                       # PhotoProjects, Logos, ContactFooter, viewers
  ui/MediaCarousel.jsx
hooks/            # use-in-view, use-mobile, gsap reveal helpers
lib/              # constants (all content/data), gsap, placeholders, utils
public/assets/    # local BTS images
```

## Editing content

All copy, images, videos and project data live in **`lib/constants.js`** — edit there
to swap thumbnails, reels, project galleries, etc.

## Contact form (Formspree)

The contact form in `components/sections/ContactFooter.jsx` is a real, validated
`<form>`. To make it send messages:

1. Create a form at https://formspree.io and copy its form ID (e.g. `xrgkabcd`).
2. Open `components/sections/ContactFooter.jsx` and set:

   ```js
   const FORMSPREE_ID = "your-form-id"; // <- paste your Formspree ID here
   ```

Until an ID is set, the form validates input and shows the success state without
actually sending (handy for local development).

## SEO

- Rich metadata, Open Graph and Twitter tags in `app/layout.jsx`
- `Person` + `WebSite` JSON-LD structured data
- `sitemap.xml` and `robots.txt` generated from `app/sitemap.js` / `app/robots.js`
- Semantic HTML, single `<h1>`, descriptive `alt` text, lazy-loaded `next/image`

Set your production domain so canonical URLs, sitemap and robots resolve correctly —
either edit `SITE_URL` in `app/layout.jsx`, `app/sitemap.js`, `app/robots.js`, or set
an env var:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Images

Remote image hosts (Unsplash, Mux thumbnails, Cloudinary) are whitelisted in
`next.config.mjs` under `images.remotePatterns`. Add new hosts there if you reference
images from other domains.

## Deploy

Deploys cleanly to **Vercel** (zero config) or any Node host:

```bash
npm run build && npm run start
```
