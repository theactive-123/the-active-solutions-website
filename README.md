# The Active Solutions — website

Marketing site for **The Active Solutions**, a Shopify & DTC growth agency in Karachi working worldwide.
Built from the Figma file "New design" (page **New**: Landing, 5 service pages, About, Insights,
Insight details, Contact, Schedule).

- **Next.js 16** (App Router, TypeScript, React 19, Turbopack, server components by default)
- **GSAP 3** (ScrollTrigger, SplitText, Draggable, Flip) + **Lenis** smooth scrolling
- CSS Modules + design tokens in `src/app/globals.css` (no CSS framework)
- SEO: per-page metadata, canonical URLs, Open Graph image, JSON-LD (Organization, Service,
  FAQPage, Article, BreadcrumbList, ContactPage), `sitemap.xml`, `robots.txt`, web manifest
- Accessibility: semantic landmarks, skip link, keyboard-operable menus/accordions/calendar,
  visible focus, `prefers-reduced-motion` respected everywhere (Lenis and all animations switch off)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run lint
```

Node 20.9+ is required.

## Environment variables

Copy `.env.example` to `.env.local` and fill in what you need:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL used for metadata, sitemap and JSON-LD (default `https://www.theactivesolutions.com`) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public contact email shown on the site |
| `CRM_BASE_URL`, `CRM_SITE_API_KEY` | Required. Every form submission is saved as a lead in the CRM (key: 64 hex characters) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` | Email notification for each submission (port 465 = TLS, 587 = STARTTLS) |
| `ADMIN_EMAIL` | Inbox(es) that receive notifications; comma-separate several (falls back to `CONTACT_TO_EMAIL`) |
| `CONTACT_FROM_EMAIL` | Optional sender override (defaults to `SMTP_USER`) |
| `NEXT_PUBLIC_BOOKING_URL` | Optional Calendly/Cal.com link offered on the schedule page |
| `WORDPRESS_API_URL` | WordPress REST API the blog reads from (default `https://blogs.theactivesolutions.com/wp-json/wp/v2`) |
| `WORDPRESS_USERNAME`, `WORDPRESS_APP_PASSWORD` | Optional. Only needed if the WordPress REST API is locked down; published posts are public |
| `WORDPRESS_REVALIDATE_SECRET` | Optional. Secret for `POST /api/revalidate?secret=…` to refresh the blog instantly |

Forms save the lead to the CRM first, then send two emails in the background (so a slow mail
server never delays the visitor): a notification to your team (`ADMIN_EMAIL`) and a branded
thank-you to the visitor (`src/lib/email/confirmation.ts`; replies go to your team inbox). Without the CRM settings the forms show a friendly
fallback with a `mailto:` link instead of silently dropping messages.

**Check the server's settings:** open `/api/contact` in a browser. It shows `true`/`false` for
each CRM and SMTP setting the running site can see (never the values).

## Blog (WordPress)

`/insights` and `/insights/[slug]` read published posts from WordPress (`src/lib/wordpress`):
title, excerpt, content, featured image, categories, author, date and sticky ("featured") flag.
The HTML is sanitized and styled with the site's own typography; h2 headings build the
"In this article" list. Posts refresh in the background every 5 minutes, or instantly when
WordPress calls `POST /api/revalidate?secret=WORDPRESS_REVALIDATE_SECRET` (e.g. from a webhook
plugin on publish/update).

- **Featured article:** mark a post "Stick to the top of the blog" in WordPress; otherwise the newest is featured.
- **Author:** set the author's *Display name publicly as* to their real name. Team members
  (e.g. "Mirza Abbas") get their photo and role; login names like "admin" are credited to the team.
- **SEO:** canonical URLs point to this site. Set the WordPress site itself to noindex
  (Settings → Reading → "Discourage search engines") so the posts aren't indexed twice.

## Deploying

Zero-config on **Vercel**: import the repo, set the environment variables above, deploy.
Any Node host works too: `npm run build && npm start`.

## Project structure

```
src/
  app/                    routes (page.tsx per route), metadata files, API route
  components/
    motion/               Lenis provider, MotionEngine (data-attribute animations), cursor, glow, tilt
    layout/               header (mega dropdown + mobile menu), footer
    ui/                   Button, Eyebrow, SectionHeader, Tags, Logo, ShapeIcon
    sections/             PageHero, ServiceGrid, CardGrid, CheckList, Process, Faq, CtaBanner, Marquee
    home/ …               page-specific sections
  content/insights.ts     blog types and helpers (articles come from WordPress)
  lib/wordpress/          WordPress REST client, HTML sanitizing, cached getters
  lib/site.ts             site config: nav, services, contact details
  lib/seo.ts              metadata + JSON-LD helpers
docs/IMAGE-SWAP.md        temporary image crops to replace with Figma exports
```

### Animations

Server components opt into motion with data attributes (handled by `components/motion/MotionEngine`,
which every page renders as its last child): `data-split` (masked line reveals), `data-reveal`,
`data-reveal-stagger`, `data-parallax`, `data-scrub-words`, `data-count`, `data-magnetic`.
Bespoke interactions (curved gallery, team ribbon, process timeline, service grid, browser mockups,
need builder, etc.) are small client components using `useGSAP`.

## Design notes

- **Fonts**: Figma uses *Saans* (a commercial font, trial licence in the file). The site uses
  **Geist** as a free stand-in for headings, with **Inter Tight** (body), **Newsreader Italic**
  (accents) and **Jost** (logo wordmark). To use licensed Saans, load it with `next/font/local`
  in `src/app/layout.tsx` under the `--font-heading` variable.
- **Images**: see [`docs/IMAGE-SWAP.md`](docs/IMAGE-SWAP.md).
