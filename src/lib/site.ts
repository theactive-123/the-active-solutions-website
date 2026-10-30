export const site = {
  name: "The Active Solutions",
  shortName: "Active Solutions",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.theactivesolutions.com").replace(/\/$/, ""),
  description:
    "Shopify & DTC growth agency in Karachi, working worldwide. We design, build and grow Shopify brands: development, CRO, paid media and retention under one roof.",
  // The email address is intentionally not here (this config is bundled into client code):
  // see lib/contact-email.ts and <Email /> (click to reveal).
  phone: { display: "+92 314 1047322", tel: "+923141047322" },
  locale: "en_US",
  address: {
    street: "Office-403, AG Trade Center, Block 14 Gulistan-e-Johar",
    city: "Karachi",
    postalCode: "75290",
    country: "PK",
    countryName: "Pakistan",
  },
  markets: ["US", "UK", "UAE", "KSA", "PK"],
} as const;

export type NavLink = { label: string; href: string; description?: string };

export const services: (NavLink & { short: string; visual: string; tags: string[] })[] = [
  {
    label: "Shopify Development",
    short: "Shopify Services",
    href: "/services/shopify-development",
    description: "Custom builds, Shopify Plus, themes and migrations.",
    visual: "/images/shopify-development/hero-cube.png",
    tags: ["Shopify Plus", "Custom themes", "Migrations", "Integrations"],
  },
  {
    label: "Conversion Rate Optimization",
    short: "Conversion Optimization",
    href: "/services/conversion-rate-optimization",
    description: "CRO audits, A/B testing and checkout fixes.",
    visual: "/images/cro/hero-funnel.png",
    tags: ["CRO audits", "A/B testing", "Checkout", "Landing pages"],
  },
  {
    label: "Ecommerce Marketing",
    short: "Ecommerce Marketing Agency",
    href: "/services/ecommerce-marketing",
    description: "Paid media, creative and Klaviyo retention.",
    visual: "/images/marketing/orb-hero.png",
    tags: ["Meta Ads", "Google & TikTok", "Klaviyo", "Creative"],
  },
  {
    label: "White Label Shopify",
    short: "White Label Shopify Development",
    href: "/services/white-label-shopify",
    description: "Delivery capacity for agencies, under your brand.",
    visual: "/images/white-label/atom-3d.png",
    tags: ["Shopify dev", "Web design", "PPC", "Email"],
  },
];

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Case studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "For Agencies", href: "/partners" },
];

export const companyNav: NavLink[] = [
  { label: "Work", href: "/work" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Partnership", href: "/partners" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
  { label: "Schedule meeting", href: "/contact/schedule" },
];

export const legalNav: NavLink[] = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];
