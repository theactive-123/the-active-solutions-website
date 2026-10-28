export const site = {
  name: "The Active Solutions",
  shortName: "Active Solutions",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.theactivesolutions.com").replace(/\/$/, ""),
  description:
    "Shopify & DTC growth agency in Karachi, working worldwide. We design, build and grow Shopify brands: development, CRO, paid media and retention under one roof.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@theactivesolutions.com",
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

export const services: (NavLink & { short: string })[] = [
  {
    label: "Shopify Development",
    short: "Shopify Services",
    href: "/services/shopify-development",
    description: "Custom builds, Shopify Plus, themes and migrations.",
  },
  {
    label: "Conversion Rate Optimization",
    short: "Conversion Optimization",
    href: "/services/conversion-rate-optimization",
    description: "CRO audits, A/B testing and checkout fixes.",
  },
  {
    label: "Ecommerce Marketing",
    short: "Ecommerce Marketing Agency",
    href: "/services/ecommerce-marketing",
    description: "Paid media, creative and Klaviyo retention.",
  },
  {
    label: "White Label Shopify",
    short: "White Label Shopify Development",
    href: "/services/white-label-shopify",
    description: "Delivery capacity for agencies, under your brand.",
  },
];

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "For Agencies", href: "/partners" },
];

export const companyNav: NavLink[] = [
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
