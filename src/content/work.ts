/**
 * Case studies shown on the home page and /work.
 * `summary`, `challenge`, `approach` and `scope` are editable copy based on the Figma descriptions;
 * no performance figures are claimed here. Add real, client-approved results to `results` when available.
 */
export type Project = {
  slug: string;
  name: string;
  domain: string;
  image: string;
  industry: string;
  market: string;
  platform: string;
  timeline: string;
  tags: string[];
  text: string;
  summary: string;
  scope: string[];
  /** Brand accent used for the card glow on /work. */
  accent: string;
  results?: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    slug: "the-thermolab",
    name: "The ThermoLab",
    domain: "thethermolab.com",
    image: "/images/work/thermolab.png",
    industry: "Fitness & Recovery",
    market: "United Kingdom",
    platform: "Shopify Plus",
    timeline: "6 weeks",
    tags: ["Shopify Plus", "6 weeks", "Fitness"],
    text: "An enterprise-grade, technically optimized platform that turns complex lab engineering and thermal testing into a professional, lead-generating experience.",
    summary:
      "ThermoLab sells premium recovery equipment backed by serious engineering. The store needed to explain that depth without slowing shoppers down, and to turn high-consideration visits into qualified enquiries.",
    scope: ["Custom Shopify Plus theme", "Product education pages", "Expert-consultation lead flow", "Performance & Core Web Vitals"],
    accent: "#ff4b1f",
  },
  {
    slug: "heybuddy",
    name: "HeyBuddy",
    domain: "heybuddy.io",
    image: "/images/work/heybuddy.png",
    industry: "Pet Care",
    market: "United States",
    platform: "Shopify Plus",
    timeline: "6 weeks",
    tags: ["Shopify Plus", "6 weeks", "Petcare"],
    text: "A premium, high-converting web experience for HeyBuddy built to explain the product clearly and turn curious pet parents into customers.",
    summary:
      "HeyBuddy's smart pet tag pairs hardware with an app. The storefront had to make a new product category feel simple, trustworthy and worth buying in a few scrolls.",
    scope: ["Brand-led storefront design", "App + hardware storytelling", "Bundles and add-ons", "Mobile-first product pages"],
    accent: "#5b5ef5",
  },
  {
    slug: "peak-motion",
    name: "Peak Motion",
    domain: "peakmotion.fit",
    image: "/images/work/peak-motion.png",
    industry: "Fitness Wear",
    market: "Worldwide",
    platform: "Shopify Plus",
    timeline: "6 weeks",
    tags: ["Shopify Plus", "6 weeks", "Fitness Wear"],
    text: "A premium e-commerce storefront built to match the brand's high-performance energy with a smooth, high-converting shopping experience.",
    summary:
      "Peak Motion launches apparel in limited editions. The store had to feel like a drop: bold, fast and editorial, while keeping sizing, shipping and checkout friction-free.",
    scope: ["Editorial lookbook layouts", "Limited-edition launch pages", "Size & fit guidance", "Multi-currency checkout"],
    accent: "#e9e9e9",
  },
];
