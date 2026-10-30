/**
 * Case studies: used on the home page, /work, /case-studies and /case-studies/[slug].
 *
 * The narrative copy (challenge, goals, approach, features, outcomes) is editable copy written from
 * the Figma case-study list and what is visible on each live store (checked October 2026). Facts about
 * a brand (customer counts, units sold, nutrition) are the brand's own public claims, not our results.
 * Platform: all six run on Shopify; only Glo shows a Shopify Plus feature publicly (B2B checkout with
 * company accounts), so the others say "Shopify". Change any to "Shopify Plus" if you know otherwise.
 * No performance figures are claimed for our work. Add real, client-approved numbers to `results`
 * and a real quote to `testimonial` when available; both render automatically when present.
 */
export type CaseStep = { title: string; text: string };

/** A close-up of one section of the live store (1200×750 capture), with caption. */
export type DetailShot = { src: string; caption: string };

export type Project = {
  slug: string;
  name: string;
  domain: string;
  /** Desktop home page screenshot, 1905×914. */
  image: string;
  imageSize: { width: number; height: number };
  /** Mobile home page screenshot, 780×1688 (390px at 2x). */
  mobileImage: string;
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

const SCREEN = { width: 1905, height: 914 };
const shots = (slug: string, captions: [string, string, string]): DetailShot[] =>
  captions.map((caption, i) => ({ src: `/images/work/${slug}-detail-${i + 1}.jpg`, caption }));

export const projects: Project[] = [
  {
    slug: "the-thermolab",
    name: "The ThermoLab",
    domain: "thethermolab.com",
    image: "/images/work/the-thermolab.jpg",
    imageSize: SCREEN,
    mobileImage: "/images/work/the-thermolab-mobile.jpg",
    industry: "Fitness & Recovery",
    market: "United Kingdom",
    platform: "Shopify",
    timeline: "6 weeks",
    tags: ["Shopify", "6 weeks", "Fitness"],
    text: "An enterprise-grade, technically optimized platform that turns complex red light and sauna technology into a professional, lead-generating experience.",
    summary:
      "ThermoLab sells red light therapy panels, portable steam saunas and PEMF mats, designed in Britain. The store needed to explain serious technology without slowing shoppers down, and turn high-consideration visits into orders and expert enquiries.",
    headline: "Turning lab-grade engineering into a store that *converts.*",
    scope: ["Custom Shopify theme", "Product education pages", "Expert-consultation lead flow", "Performance & Core Web Vitals"],
    services: [SHOPIFY_DEV, CRO],
    challenge: [
      "ThermoLab's range runs from a £9.99 essential oil to professional red light panels close to £1,900. Buyers want to understand wavelengths, wattage and the science before they spend, and many want to talk to someone first.",
      "Technical detail, trust signals and offers had to live on one storefront without turning it into a spec sheet, across more than twenty products in the A Series, S Series, Aura and sauna ranges.",
    ],
    goals: [
      "Explain complex products clearly without overwhelming shoppers",
      "Put trust signals (reviews, delivery, warranty, returns) in front of every visitor",
      "Create a clear path to speak with an expert",
      "Raise order value with bundles that make sense",
    ],
    approach: [
      { title: "Research", text: "We mapped the questions buyers ask before buying recovery equipment and where they dropped out of the old journey." },
      { title: "Information design", text: "Product pages were restructured around benefits, specifications and proof, in the order shoppers need them." },
      { title: "Build", text: "A custom Shopify theme with reusable sections, so ThermoLab's team can publish new products and campaigns themselves." },
      { title: "Launch & tune", text: "We launched, then refined page speed, trust messaging and the consultation flow based on how visitors used it." },
    ],
    features: [
      { title: "Benefit-led hero", text: "A clear promise backed by social proof in the first screen: trusted by 35,000+ UK customers." },
      { title: "Trust bar", text: "Rating, free UK delivery, up to 3-year warranty and 30-day returns, visible on every key page." },
      { title: "Expert consultation", text: "'Speak to our experts' sits in the main navigation, with a reply promised within 24 hours." },
      { title: "Bundle & save", text: "Sauna and red light pairings priced as bundles, with the saving shown up front and added to basket in one click." },
      { title: "Product finder quiz", text: "'Find your perfect ThermoLab' asks what you want to improve and recommends the right device." },
      { title: "Campaign system", text: "Seasonal offers and limited-time banners the team can schedule without a developer." },
    ],
    details: shots("the-thermolab", [
      "Bundle & save: pairings with the saving shown up front",
      "Clinical evaluation and professional endorsements as proof",
      "Product finder: three questions, one recommendation",
    ]),
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
    image: "/images/work/heybuddy.jpg",
    imageSize: SCREEN,
    mobileImage: "/images/work/heybuddy-mobile.jpg",
    industry: "Pet Care",
    market: "United States",
    platform: "Shopify",
    timeline: "6 weeks",
    tags: ["Shopify", "6 weeks", "Petcare"],
    text: "A premium, high-converting web experience for HeyBuddy built to explain the product clearly and turn curious pet parents into customers.",
    summary:
      "HeyBuddy's QR code smart pet tag links to an online pet profile: anyone who finds a lost pet scans the tag (no app needed) and the owner gets an instant alert with the pet's location. The storefront had to make a new product category feel simple, trustworthy and worth buying in a few scrolls.",
    headline: "Making a brand-new product category feel *simple.*",
    scope: ["Brand-led storefront design", "App + hardware storytelling", "Bundles and add-ons", "Mobile-first product pages"],
    services: [SHOPIFY_DEV, CRO, MARKETING],
    challenge: [
      "A smart pet tag is a new idea for most shoppers. Visitors needed to understand what the tag does, how the app works with it and why it beats a regular engraved tag, all before their attention moved on.",
      "Most traffic came from social ads on mobile, and the range had grown to more than twenty designs across the Standard, Slide and Silicone styles, so choosing had to stay easy on a small screen.",
    ],
    goals: [
      "Explain the tag and the app together in one glance",
      "Make the brand feel friendly, premium and trustworthy",
      "Design mobile-first for social traffic",
      "Raise order value with bundles, engraving and accessories",
    ],
    approach: [
      { title: "Positioning", text: "We distilled the product into one idea, the world's smartest pet tag, and built every section around proving it." },
      { title: "Design", text: "A bright, playful system with real app screens and happy pets, so the product feels tangible before purchase." },
      { title: "Build", text: "Mobile-first Shopify templates with lightweight animation and fast-loading product imagery." },
      { title: "Optimise", text: "Bundles, add-ons and clear shipping messaging were tested and refined after launch." },
    ],
    features: [
      { title: "One-glance hero", text: "Headline, social proof and app screens together, so the tag and app make sense instantly." },
      { title: "App storytelling", text: "Instant phone alerts, the lost pet network, medical reminders and pet advice, each shown with real app UI." },
      { title: "Choose your style", text: "Standard, Slide and Silicone tags compared side by side, so shoppers pick a style before a design." },
      { title: "How it works", text: "Order, register, attach: three illustrated steps that remove the 'is this complicated?' doubt." },
      { title: "Bundles & engraving", text: "Combo packs, free name engraving and backup tags presented at the right moment to lift order value." },
      { title: "Proof at scale", text: "Community numbers and customer photos placed where they reassure first-time buyers." },
    ],
    details: shots("heybuddy", [
      "App features: alerts, digital profiles, reminders and advice",
      "Choose your style: Slide, Silicone and Standard tags",
      "How it works in three illustrated steps",
    ]),
    outcomes: [
      "A new product category explained in a single scroll",
      "A storefront designed for the mobile, social-first shoppers who actually arrive",
      "Bundles, engraving and add-ons built into the buying journey",
      "A brand system the team reuses across ads, email and the app",
    ],
    accent: "#5b5ef5",
  },
  {
    slug: "peak-motion",
    name: "Peak Motion",
    domain: "peakmotion.fit",
    image: "/images/work/peak-motion.jpg",
    imageSize: SCREEN,
    mobileImage: "/images/work/peak-motion-mobile.jpg",
    industry: "Fitness Wear",
    market: "Europe",
    platform: "Shopify",
    timeline: "6 weeks",
    tags: ["Shopify", "6 weeks", "Fitness Wear"],
    text: "A premium e-commerce storefront built to match the brand's high-performance energy with a smooth, high-converting shopping experience.",
    summary:
      "Peak Motion launches training apparel in limited editions, from the Silent Motion collection to the heavier Titan Lines. The store had to feel like a drop: bold, fast and editorial, while keeping sizing, shipping and checkout friction-free across Europe.",
    headline: "A storefront that feels like a *limited drop.*",
    scope: ["Editorial lookbook layouts", "Limited-edition launch pages", "Collection storytelling", "Multi-language checkout"],
    services: [SHOPIFY_DEV, MARKETING],
    challenge: [
      "Peak Motion sells performance apparel in small, limited runs. The brand lives on discipline and scarcity (\"built for the unseen hours\"), but a generic theme made each release look like any other online shop.",
      "Customers order from several European countries, so language, shipping and euro pricing had to feel local, and each collection needed its own story without slowing the store down.",
    ],
    goals: [
      "Give every collection launch an editorial, campaign-like feel",
      "Communicate scarcity honestly without dark patterns",
      "Tell each collection's story (Silent Motion, Titan Lines, Essentials)",
      "Make European checkout feel local",
    ],
    approach: [
      { title: "Art direction", text: "A dark, high-contrast system with oversized type, built to frame campaign photography." },
      { title: "Launch mechanics", text: "Drop pages and announcement messaging designed around each edition, like Silent Motion's First Edition." },
      { title: "Build", text: "Shopify templates for lookbooks, collections and products, plus language and currency support." },
      { title: "Refine", text: "Collection pages, waitlist capture and shipping messaging were tuned after launch." },
    ],
    features: [
      { title: "Editorial hero", text: "Full-bleed campaign imagery with bold type: 'The last of the first'." },
      { title: "Drop messaging", text: "Edition-specific announcement bar with free shipping on the remaining pieces." },
      { title: "Collection stories", text: "Silent Motion for quiet discipline, Titan Lines for heavy sessions, Essentials for every day." },
      { title: "Scarcity, honestly", text: "'Stock is running out' panels tied to real final pieces, not countdown tricks." },
      { title: "Waitlist capture", text: "'Join our waitlist' turns sold-out interest into an audience for the next drop." },
      { title: "Minimal navigation", text: "Lookbook, Shop, About, FAQ and Contact: everything one click away, nothing more." },
    ],
    details: shots("peak-motion", [
      "Unlock your potential: collection story beside a final-pieces panel",
      "Top of the game: the bestsellers grid",
      "Waitlist capture for the next drop",
    ]),
    outcomes: [
      "Every release now launches with a campaign-quality page",
      "Scarcity communicated clearly and honestly",
      "A waitlist that carries demand from one drop to the next",
      "A store that feels local to customers across Europe",
    ],
    accent: "#e9e9e9",
  },
  {
    slug: "dermalyft",
    name: "Dermalyft",
    domain: "dermalyft.com",
    image: "/images/work/dermalyft.jpg",
    imageSize: SCREEN,
    mobileImage: "/images/work/dermalyft-mobile.jpg",
    industry: "Skincare & Beauty Tech",
    market: "United States & international",
    platform: "Shopify",
    timeline: "6 weeks",
    tags: ["Shopify", "6 weeks", "Skincare"],
    text: "A luxury skincare storefront that pairs science-led products with an elegant, editorial shopping experience built for confidence and trust.",
    summary:
      "Dermalyft sells luxury skincare and at-home beauty technology: patches, skincare solutions, micro-infusion, LED light therapy and shower filters. The store had to feel premium and calm, make results believable, and give hesitant buyers a person to talk to.",
    headline: "Luxury skincare, made to feel *effortless.*",
    scope: ["Luxury storefront design", "Collection architecture", "Before-and-after storytelling", "Guarantee & trust messaging"],
    services: [SHOPIFY_DEV, CRO],
    challenge: [
      "Skincare buyers are sceptical: they have seen bold promises before. Dermalyft needed a storefront that felt luxurious and quiet, while proving that its products deliver visible results.",
      "The range spans six collections, from eye patches to LED devices and shower filters, sold in the US and shipped to more than twenty-five countries, so navigation, shipping and guarantees had to be clear from the first visit.",
    ],
    goals: [
      "Create a premium, editorial look that matches the price point",
      "Make results believable with real before-and-after proof",
      "Organise six collections so shoppers find their routine quickly",
      "Reduce risk with a visible guarantee and expert guidance",
    ],
    approach: [
      { title: "Brand direction", text: "A soft sage palette, serif-italic accents and generous whitespace to signal calm, considered luxury." },
      { title: "Architecture", text: "Collections organised by concern and device, so every product sits in a routine rather than a list." },
      { title: "Build", text: "Shopify templates for collections, products and the brand story, with reviews and subscriptions built in." },
      { title: "Trust layer", text: "Guarantee, shipping, support and specialist contact woven through the journey, not hidden in the footer." },
    ],
    features: [
      { title: "Editorial hero", text: "'Luxury skincare, redefined by science and nature', with one clear call to explore the collections." },
      { title: "Press & offers strip", text: "'Featured in' logos beside 'save up to 55% on exclusive bundles' right under the hero." },
      { title: "Before & after slider", text: "'Beauty that speaks for itself': an interactive comparison that lets results do the talking." },
      { title: "Brand promise", text: "Free shipping on orders $50+, money-back guarantee, 24/7 support and quality assurance in one band." },
      { title: "Specialist guidance", text: "'Connect with our skincare specialists' gives hesitant buyers a person to ask before they order." },
      { title: "90-day glow assurance", text: "A guarantee on every collection page, with an exchange or tailored solution if results disappoint." },
    ],
    details: shots("dermalyft", [
      "The brand story: 'Your skin's journey to radiance starts here'",
      "An interactive before-and-after slider",
      "Skincare specialists on hand for personalised guidance",
    ]),
    outcomes: [
      "A storefront that looks and feels as premium as the products",
      "Proof (press, reviews, before-and-after) placed where doubt appears",
      "Six collections organised into clear routines",
      "Guarantee and specialist support lowering the risk of a first order",
    ],
    accent: "#7fa391",
  },
  {
    slug: "glo",
    name: "Glo",
    domain: "glo.co",
    image: "/images/work/glo.jpg",
    imageSize: SCREEN,
    mobileImage: "/images/work/glo-mobile.jpg",
    industry: "Sensory Toys & Fulfillment",
    market: "United States, 60+ countries",
    platform: "Shopify Plus",
    timeline: "6 weeks",
    tags: ["Shopify Plus", "6 weeks", "Sensory Toys"],
    text: "A bright, story-driven home for The Glo Companies, bringing five sensory-play brands, wholesale and fulfillment together on one Shopify site.",
    summary:
      "The Glo Companies started as a Mississippi State classroom project and grew into a family of brands (Glo Pals, Glo Cubes, Light-Up Library, MEAVIA and Glo Fulfillment) that, by the brand's own count, has sold more than 10 million products in 60+ countries. The site had to tell that story and serve wholesale partners at the same time.",
    headline: "Five brands, one family, one *joyful* home.",
    scope: ["Multi-brand corporate site", "Brand hub pages", "Wholesale portal entry", "Story-led content system"],
    services: [SHOPIFY_DEV, MARKETING],
    challenge: [
      "Glo is far more than a toy company: it designs sensory products, runs a 50,000 sq ft fulfillment operation and builds software for B2B partners. Visitors arrive as parents, retailers, distributors, press or job seekers, and each needs a different door.",
      "Every brand has its own personality, from glowing bath-time Pals to light-up drink cubes, but they had to sit together under one recognisable Glo identity, with wholesale buyers one click from their login.",
    ],
    goals: [
      "Tell the Glo story, from classroom patent to global family of brands",
      "Give each brand its own space without fragmenting the identity",
      "Route wholesale partners straight to ordering",
      "Make press, impact and careers easy to find",
    ],
    approach: [
      { title: "Discovery", text: "We mapped every audience (families, retailers, distributors, press, candidates) and what each needs from the site." },
      { title: "Identity system", text: "Glo's playful colours, rounded type and oversized headings turned into reusable, brand-tinted sections." },
      { title: "Build", text: "A Shopify Plus site with brand hub pages, a wholesale login and a 169-product catalogue behind it." },
      { title: "Content engine", text: "Press, stats and process sections the team updates themselves as the company grows." },
    ],
    features: [
      { title: "Rotating hero", text: "'We design wonder. We keep joy moving. We deliver happiness.' Each message paired with real footage." },
      { title: "Our brands", text: "Colour-coded cards for Glo Pals, Glo Cubes, MEAVIA, Glo Fulfillment and GloSoft, each linking to its own hub." },
      { title: "Wholesale login", text: "A persistent 'Wholesale login' button puts B2B partners one click from ordering." },
      { title: "Our process", text: "Four colour-blocked steps, from 'driven by curiosity' to 'we elevate the ordinary'." },
      { title: "Proof in numbers", text: "Five brands, 40+ patents and trademarks, 10M+ units sold and 60+ countries, presented as brand facts." },
      { title: "In the press", text: "A rolling press carousel with Fast Company, Inc. 5000 and Series A coverage." },
    ],
    details: shots("glo", [
      "Our brands: colour-coded cards for each Glo brand",
      "Our process, told in four colour-blocked steps",
      "The brand's own numbers alongside real moments of play",
    ]),
    outcomes: [
      "One home for five brands that still feels unmistakably Glo",
      "A clear door for every audience: families, retailers, press and candidates",
      "Wholesale partners one click from ordering",
      "A content system the team grows without developer help",
    ],
    accent: "#f28c28",
  },
  {
    slug: "moodup",
    name: "Moo'd Up",
    domain: "moodupmilk.com",
    image: "/images/work/moodup.jpg",
    imageSize: SCREEN,
    mobileImage: "/images/work/moodup-mobile.jpg",
    industry: "Food & Beverage",
    market: "United States",
    platform: "Shopify",
    timeline: "6 weeks",
    tags: ["Shopify", "6 weeks", "Chocolate Milk"],
    text: "A playful, high-energy storefront for Moo'd Up's better-for-you chocolate milk mix, built to make nutrition feel fun and subscriptions effortless.",
    summary:
      "Moo'd Up is a dairy-free chocolate milk mix with 10g of protein and just 3g of sugar per serving, made for kids and grown-ups alike. The store had to make the nutrition story instantly clear, feel as fun as the brand, and turn a first bag into a habit.",
    headline: "The chocolate milk you wish you had *as a kid.*",
    scope: ["Brand-led storefront", "Single-product funnel", "Subscription & bundles", "UGC-driven social proof"],
    services: [SHOPIFY_DEV, CRO, MARKETING],
    challenge: [
      "'Healthy chocolate milk' sounds too good to be true. Moo'd Up needed shoppers to believe the numbers (10g protein, 3g sugar, 15+ vitamins and minerals) and still feel the nostalgia of a childhood treat.",
      "With a small range (chocolate, strawberry and a new hot cocoa, plus merch), every visit had to lead to one confident purchase, and repeat orders had to happen without effort.",
    ],
    goals: [
      "Make the nutrition story clear in a single glance",
      "Keep the brand fun, bold and unmistakably Moo'd Up",
      "Build one focused path to purchase",
      "Encourage subscriptions and bundles for repeat orders",
    ],
    approach: [
      { title: "Story", text: "We framed the product as chocolate milk, all grown up: nostalgic taste with real benefits." },
      { title: "Design", text: "A purple, character-led system with big type, floating product shots and playful motion." },
      { title: "Build", text: "Shopify templates for a focused bundle funnel, subscriptions, reviews and a store locator." },
      { title: "Optimise", text: "Comparison, guarantee and customer stories placed to answer doubts right before checkout." },
    ],
    features: [
      { title: "Launch hero", text: "'Hot cocoa with marshmallows is here!' New flavours get a hero of their own, with nutrition up front." },
      { title: "Leveled-up benefits", text: "Real protein, junk-free, smarter satisfaction and a daily wellness boost, in four clear claims." },
      { title: "How it stacks up", text: "A comparison against regular flavoured milk and protein drinks on the product page." },
      { title: "Happiness guarantee", text: "Try it risk-free for 30 days: if you don't love your first bag, it's refunded." },
      { title: "Loved by all ages", text: "A customer-photo carousel, from kids at the kitchen table to grown-ups on the go." },
      { title: "Subscribe & save", text: "Bundles and subscriptions built into the product page, so the next bag arrives on its own." },
    ],
    details: shots("moodup", [
      "Chocolate milk, leveled up: four clear benefits",
      "Chocolate milk, upgraded: the nutrition story at a glance",
      "Real customers, real kitchens: 'loved by all ages'",
    ]),
    outcomes: [
      "A nutrition story shoppers understand in seconds",
      "A brand that feels as fun online as it tastes",
      "One focused path from first visit to first bag",
      "Subscriptions and bundles that turn a trial into a habit",
    ],
    accent: "#a259c4",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const caseStudyPath = (slug: string) => `/case-studies/${slug}`;

/** The next case study in the list (wraps around), for the "Next case study" link. */
export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
