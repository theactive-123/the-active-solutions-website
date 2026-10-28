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
| `RESEND_API_KEY` | Enables email delivery of contact, meeting and newsletter forms via [Resend](https://resend.com) |
| `CONTACT_TO_EMAIL` | Inbox that receives form submissions |
| `CONTACT_FROM_EMAIL` | Verified sender, e.g. `The Active Solutions <hello@yourdomain.com>` |
| `NEXT_PUBLIC_BOOKING_URL` | Optional Calendly/Cal.com link offered on the schedule page |

Without `RESEND_API_KEY` the forms show a friendly fallback with a `mailto:` link instead of
silently dropping messages.

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
  content/insights.ts     blog articles
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
