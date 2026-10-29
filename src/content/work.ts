/**
 * Case studies: used on the home page, /work, /case-studies and /case-studies/[slug].
 *
 * The narrative copy (challenge, goals, approach, features, outcomes) is editable copy written from
 * the Figma descriptions and what is visible on each live store. No performance figures are claimed.
 * Add real, client-approved numbers to `results` and a real quote to `testimonial` when available;
 * both render automatically when present.
 */
export type CaseStep = { title: string; text: string };

export type DetailShot = {
  /** Focal point of the close-up within the screenshot, in percent. */
  x: number;
  y: number;
  zoom: number;
  caption: string;
};

export type Project = {
  slug: string;
  name: string;
  domain: string;
  image: string;
  imageSize: { width: number; height: number };
  industry: string;
  market: string;
  platform: string;
  timeline: string;
  tags: string[];
  /** One-line description (home page, cards). */
  text: string;
  /** Short paragraph (Work page, case study intro). */
  summary: string;
  /** Case study hero headline; *asterisks* mark the red italic accent. */
  headline: string;
  scope: string[];
  services: { label: string; href: string }[];
  challenge: string[];
  goals: string[];
  approach: CaseStep[];
  features: CaseStep[];
  details: DetailShot[];
  outcomes: string[];
  /** Brand accent used for glows and highlights. */
  accent: string;
  results?: { value: string; label: string }[];
  testimonial?: { quote: string; name: string; role: string };
};

const SHOPIFY_DEV = { label: "Shopify Development", href: "/services/shopify-development" };
const CRO = { label: "Conversion Optimization", href: "/services/conversion-rate-optimization" };
const MARKETING = { label: "Ecommerce Marketing", href: "/services/ecommerce-marketing" };

export const projects: Project[] = [
  {
    slug: "the-thermolab",
    name: "The ThermoLab",
    domain: "thethermolab.com",
    image: "/images/work/thermolab.png",
    imageSize: { width: 1905, height: 914 },
    industry: "Fitness & Recovery",
    market: "United Kingdom",
    platform: "Shopify Plus",
    timeline: "6 weeks",
    tags: ["Shopify Plus", "6 weeks", "Fitness"],
    text: "An enterprise-grade, technically optimized platform that turns complex lab engineering and thermal testing into a professional, lead-generating experience.",
    summary:
      "ThermoLab sells premium recovery equipment backed by serious engineering. The store needed to explain that depth without slowing shoppers down, and to turn high-consideration visits into qualified enquiries.",
    headline: "Turning lab-grade engineering into a store that *converts.*",
    scope: ["Custom Shopify Plus theme", "Product education pages", "Expert-consultation lead flow", "Performance & Core Web Vitals"],
    services: [SHOPIFY_DEV, CRO],
    challenge: [
      "ThermoLab's infrared and recovery products are considered purchases. Buyers want to understand the science, compare options and talk to someone before spending, but the previous store treated every product like an impulse buy.",
      "Technical information was buried, trust signals were scattered, and there was no clear route for shoppers who wanted expert advice before ordering.",
    ],
    goals: [
      "Explain complex products clearly without overwhelming shoppers",
      "Put trust signals (reviews, delivery, warranty, returns) in front of every visitor",
      "Create a clear path to speak with an expert",
      "Keep the store fast on mobile despite rich media",
    ],
    approach: [
      { title: "Research", text: "We mapped the questions buyers ask before purchasing recovery equipment and where they dropped out of the old journey." },
      { title: "Information design", text: "Product pages were restructured around benefits, specifications and proof, in the order shoppers need them." },
      { title: "Build", text: "A custom Shopify Plus theme with reusable sections, so ThermoLab's team can publish new products and campaigns themselves." },
      { title: "Launch & tune", text: "We launched, then refined page speed, trust messaging and the consultation flow based on how visitors used it." },
    ],
    features: [
      { title: "Benefit-led hero", text: "A clear promise (recover faster, sleep better) backed by social proof in the first screen." },
      { title: "Trust bar", text: "Rating, free UK delivery, up to 3-year warranty and 30-day returns, visible on every key page." },
      { title: "Expert consultation", text: "'Speak to our experts' sits in the main navigation, turning hesitation into qualified enquiries." },
      { title: "Press & retailer proof", text: "Recognisable media and marketplace logos placed where they reassure first-time visitors." },
      { title: "Offer system", text: "Campaign banners and limited-time offers the team can schedule without a developer." },
      { title: "Performance", text: "Optimised media and lean theme code so a visually rich store still loads quickly on mobile." },
    ],
    details: [
      { x: 0, y: 72, zoom: 1.7, caption: "Benefit-led hero with social proof" },
      { x: 45, y: 100, zoom: 2.1, caption: "Press logos and the trust bar: rating, delivery, warranty, returns" },
      { x: 82, y: 0, zoom: 2.6, caption: "Expert consultation in the main navigation" },
    ],
    outcomes: [
      "A store that explains the technology as confidently as the brand sells it",
      "A clear, always-visible route to expert advice for high-consideration buyers",
      "Trust signals on every key page instead of buried in the footer",
      "An editable section library the in-house team uses for launches and offers",
    ],
    accent: "#ff4b1f",
  },
  {
    slug: "heybuddy",
    name: "HeyBuddy",
    domain: "heybuddy.io",
    image: "/images/work/heybuddy.png",
    imageSize: { width: 1902, height: 911 },
    industry: "Pet Care",
    market: "United States",
    platform: "Shopify Plus",
    timeline: "6 weeks",
    tags: ["Shopify Plus", "6 weeks", "Petcare"],
    text: "A premium, high-converting web experience for HeyBuddy built to explain the product clearly and turn curious pet parents into customers.",
    summary:
      "HeyBuddy's smart pet tag pairs hardware with an app. The storefront had to make a new product category feel simple, trustworthy and worth buying in a few scrolls.",
    headline: "Making a brand-new product category feel *simple.*",
    scope: ["Brand-led storefront design", "App + hardware storytelling", "Bundles and add-ons", "Mobile-first product pages"],
    services: [SHOPIFY_DEV, CRO, MARKETING],
    challenge: [
      "A smart pet tag is a new idea for most shoppers. Visitors needed to understand what the tag does, how the app works with it and why it beats a regular ID tag, all before their attention moved on.",
      "Most traffic came from social ads on mobile, so the story had to land on a small screen in seconds.",
    ],
    goals: [
      "Explain the tag and the app together in one glance",
      "Make the brand feel friendly, premium and trustworthy",
      "Design mobile-first for social traffic",
      "Raise order value with bundles and add-ons",
    ],
    approach: [
      { title: "Positioning", text: "We distilled the product into one idea, the world's smartest pet tag, and built every section around proving it." },
      { title: "Design", text: "A bright, playful system with real app screens and happy pets, so the product feels tangible before purchase." },
      { title: "Build", text: "Mobile-first Shopify Plus templates with lightweight animation and fast-loading product imagery." },
      { title: "Optimise", text: "Bundles, add-ons and clear shipping messaging were tested and refined after launch." },
    ],
    features: [
      { title: "One-glance hero", text: "Headline, social proof and app screens together, so the tag and app make sense instantly." },
      { title: "App storytelling", text: "Real app UI shows pet profiles, tracking and alerts, removing the 'how does it work?' doubt." },
      { title: "Announcement bar", text: "Rotating messages for U.S. shipping and lost-and-found tracking keep key benefits in view." },
      { title: "Bundles & add-ons", text: "Multi-pet bundles and accessories presented at the right moment to lift order value." },
      { title: "Mobile-first templates", text: "Thumb-friendly layouts and sticky purchase actions for shoppers arriving from social." },
      { title: "Brand system", text: "A friendly, bold visual language the team can extend across campaigns and email." },
    ],
    details: [
      { x: 15, y: 50, zoom: 1.9, caption: "World's smartest pet tag: the one-glance hero" },
      { x: 72, y: 55, zoom: 1.8, caption: "Real app screens explain the product" },
      { x: 50, y: 0, zoom: 3.2, caption: "Announcement bar and navigation" },
    ],
    outcomes: [
      "A new product category explained in a single scroll",
      "A storefront designed for the mobile, social-first shoppers who actually arrive",
      "Bundles and add-ons built into the buying journey",
      "A brand system the team reuses across ads, email and the app",
    ],
    accent: "#5b5ef5",
  },
  {
    slug: "peak-motion",
    name: "Peak Motion",
    domain: "peakmotion.fit",
    image: "/images/work/peak-motion.png",
    imageSize: { width: 1902, height: 913 },
    industry: "Fitness Wear",
    market: "Worldwide",
    platform: "Shopify Plus",
    timeline: "6 weeks",
    tags: ["Shopify Plus", "6 weeks", "Fitness Wear"],
    text: "A premium e-commerce storefront built to match the brand's high-performance energy with a smooth, high-converting shopping experience.",
    summary:
      "Peak Motion launches apparel in limited editions. The store had to feel like a drop: bold, fast and editorial, while keeping sizing, shipping and checkout friction-free.",
    headline: "A storefront that feels like a *limited drop.*",
    scope: ["Editorial lookbook layouts", "Limited-edition launch pages", "Size & fit guidance", "Multi-currency checkout"],
    services: [SHOPIFY_DEV, MARKETING],
    challenge: [
      "Peak Motion sells performance apparel in small, limited runs. The brand lives on hype and scarcity, but a generic theme made each release look like any other online shop.",
      "With customers ordering from several countries, sizing questions, shipping costs and currency were the main reasons shoppers hesitated at checkout.",
    ],
    goals: [
      "Give every collection launch an editorial, campaign-like feel",
      "Communicate scarcity honestly without dark patterns",
      "Answer sizing and fit questions on the product page",
      "Make international checkout feel local",
    ],
    approach: [
      { title: "Art direction", text: "A dark, high-contrast system with oversized type, built to frame campaign photography." },
      { title: "Launch mechanics", text: "Drop pages and announcement messaging designed around each edition, like Silent Motion's First Edition." },
      { title: "Build", text: "Shopify Plus templates for lookbooks, collections and products, plus multi-currency and language support." },
      { title: "Refine", text: "Size guidance and shipping messaging were tuned after launch to reduce pre-purchase questions." },
    ],
    features: [
      { title: "Editorial hero", text: "Full-bleed campaign imagery with bold type: 'The last of the first'." },
      { title: "Drop messaging", text: "Edition-specific announcement bar with free shipping on remaining pieces." },
      { title: "Lookbook", text: "A dedicated lookbook template that tells the story behind each collection." },
      { title: "Size & fit", text: "Clear size guidance on every product to reduce returns and hesitation." },
      { title: "International ready", text: "Language and currency selectors so global customers shop in familiar terms." },
      { title: "Minimal navigation", text: "Lookbook, Shop, About, FAQ and Contact: everything one click away, nothing more." },
    ],
    details: [
      { x: 6, y: 66, zoom: 1.45, caption: "Editorial hero for the First Edition drop" },
      { x: 72, y: 72, zoom: 1.7, caption: "Campaign photography, framed full-bleed" },
      { x: 50, y: 0, zoom: 2.2, caption: "Drop announcement, centred logo and minimal navigation" },
    ],
    outcomes: [
      "Every release now launches with a campaign-quality page",
      "Scarcity communicated clearly and honestly",
      "Fewer sizing and shipping questions before purchase",
      "A store that feels local to customers around the world",
    ],
    accent: "#e9e9e9",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const caseStudyPath = (slug: string) => `/case-studies/${slug}`;

/** The next case study in the list (wraps around), for the "Next case study" link. */
export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
