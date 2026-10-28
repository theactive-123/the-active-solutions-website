/**
 * Insights (blog) content. Articles are plain data so they can later be moved to a CMS 1:1.
 *
 * Body blocks are rendered by `components/insights/ArticleBody`. Inline text supports one
 * piece of markup: `[label](/path)` for links (internal paths or https URLs).
 * Every `h2` becomes an entry in the article's "In this article" table of contents.
 */

export const INSIGHT_CATEGORIES = ["Shopify", "CRO", "Paid media", "Email & SMS", "Migrations"] as const;
export type InsightCategory = (typeof INSIGHT_CATEGORIES)[number];

export type InsightBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string };

export type InsightAuthor = { name: string; role: string; photo: string };

export type Insight = {
  slug: string;
  title: string;
  /** Hero headline; text between *asterisks* renders as the red italic serif accent. */
  heroTitle: string;
  excerpt: string;
  /** Meta description (140–160 chars). */
  description: string;
  category: InsightCategory;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  author: InsightAuthor;
  cover: { src: string; width: number; height: number; alt: string };
  featured?: boolean;
  body: InsightBlock[];
};

const MIRZA: InsightAuthor = { name: "Mirza Abbas", role: "CEO, The Active Solutions", photo: "/images/team/mirza-abbas.png" };

const cover = (name: string, alt: string) => ({ src: `/images/insights/cover-${name}.jpg`, width: 1600, height: 1000, alt });

export const insights: Insight[] = [
  {
    slug: "do-you-need-shopify-plus",
    title: "Do you need Shopify Plus? A practical way to decide",
    heroTitle: "Is *Shopify Plus* Right for You?",
    excerpt:
      "Not necessarily. We assess operational complexity, required functionality, checkout needs and growth plans before recommending Shopify Plus or standard Shopify.",
    description:
      "Shopify Plus or standard Shopify? A practical framework covering operational complexity, checkout and functionality needs, and how to plan the move.",
    category: "Shopify",
    date: "2026-10-20",
    author: MIRZA,
    cover: cover("shopify-plus", "A red 3D cube floating in a dark red glow"),
    featured: true,
    body: [
      {
        type: "p",
        text: "Shopify Plus is often treated as the next step once a store reaches a certain size. In practice, revenue alone is a poor reason to upgrade. Plenty of brands run healthy eight-figure businesses on standard Shopify, and some smaller brands need Plus early because of how they sell. The right answer comes from how your business operates, not from a revenue threshold.",
      },
      { type: "h2", text: "Start with operational complexity" },
      {
        type: "p",
        text: "We assess your operational complexity, required functionality, checkout needs and growth plans before recommending Shopify Plus or standard Shopify.",
      },
      {
        type: "p",
        text: "Work with a Shopify Plus development team to support more complex ecommerce requirements. We help brands evaluate platform needs, implement custom storefront experiences and configure suitable integrations for their operations.",
      },
      { type: "quote", text: "Not necessarily. We assess your operational complexity, required functionality, checkout needs and growth plans." },
      {
        type: "p",
        text: "A useful first exercise is to list the things your team does manually every week: editing orders, tagging customers, syncing stock with a warehouse, running wholesale orders through email, or duplicating products for another market. The longer and more expensive that list is, the more likely Plus features will pay for themselves.",
      },
      {
        type: "ul",
        items: [
          "Do you sell to trade or wholesale customers who need their own price lists, payment terms or company accounts?",
          "Do you run, or plan to run, separate storefronts for different regions or brands?",
          "Do you depend on an ERP, 3PL or PIM that needs high-volume, reliable data sync?",
          "Do flash sales or product drops push your store into heavy, short traffic spikes?",
          "Does your team need more staff accounts and granular permissions than your current plan allows?",
        ],
      },
      {
        type: "p",
        text: "If most of your answers are no, standard Shopify, with well-chosen apps and a fast theme, is usually the more efficient option.",
      },
      { type: "h2", text: "Functionality and checkout needs" },
      {
        type: "p",
        text: "When standard functionality does not meet your requirements, we assess suitable apps, integrations and custom development options. The scope depends on your business requirements, technical feasibility and the Shopify plan involved.",
      },
      {
        type: "p",
        text: "Checkout is where the plans differ most. On every plan, checkout is hosted and secured by Shopify. Plus merchants get more control through Checkout Extensibility: custom UI extensions inside the information, shipping and payment steps, and custom logic for discounts, delivery and payment options built with Shopify Functions in custom apps. If your conversion strategy depends on changing what happens inside checkout itself, that is a strong signal for Plus.",
      },
      {
        type: "p",
        text: "Other capabilities worth weighing include native B2B features, additional expansion stores for new markets, scheduled launches and sales with Launchpad, and higher API limits for integrations. Each one is only valuable if you will actually use it, so we map features to concrete workflows rather than to a feature list.",
      },
      { type: "h2", text: "Plan the migration" },
      {
        type: "p",
        text: "We plan the transfer of agreed product data, collections, customer records and order history, subject to source-platform access and compatibility. We validate the migrated information before launch.",
      },
      {
        type: "p",
        text: "Upgrading an existing Shopify store to Plus does not require a rebuild: the store, theme and data stay in place and the plan changes. The work is in configuring the new capabilities, such as checkout extensions, B2B catalogues or expansion stores, and in reviewing which apps can be replaced by native features. If you are moving to Shopify Plus from another platform, the project is a full migration and needs URL redirects, data mapping and SEO checks, which we cover in our [migration guide](/insights/migrating-to-shopify-without-losing-seo).",
      },
      { type: "h2", text: "Next steps" },
      {
        type: "p",
        text: "Start with a short assessment. Write down your manual workflows, the integrations you rely on, your checkout requirements and your plans for the next 18 months. Compare that list against what standard Shopify and Plus offer, and against the total cost of each option including apps and development time.",
      },
      {
        type: "p",
        text: "If you would like a second opinion, our [Shopify development team](/services/shopify-development) can review your store and recommend the plan that fits. Sometimes that is Plus. Often it is a cleaner setup on the plan you already have.",
      },
    ],
  },
  {
    slug: "how-much-traffic-does-your-store-need-for-cro",
    title: "How much traffic does your store need for CRO?",
    heroTitle: "How Much *Traffic* Does Your Store Need for CRO?",
    excerpt: "It depends on your current conversion rate, the size of the improvement being tested and the testing method.",
    description:
      "How many visitors you need to A/B test a Shopify store, how baseline conversion rate and effect size change the maths, and what to do when traffic is low.",
    category: "CRO",
    date: "2026-10-13",
    author: MIRZA,
    cover: cover("cro-traffic", "A glossy red sphere with an orbit ring on a dark background"),
    body: [
      {
        type: "p",
        text: "One of the first questions brands ask before starting conversion rate optimization is whether they have enough traffic. The honest answer is that it depends on three things: your current conversion rate, the size of the improvement you want to detect, and the testing method you use.",
      },
      { type: "h2", text: "Why sample size matters" },
      {
        type: "p",
        text: "An A/B test compares two versions of a page and asks whether the difference in results is real or just noise. With too few visitors, random variation can easily look like a win or a loss. Calling a test early on a small sample is one of the most common reasons CRO programmes ship changes that later turn out to do nothing.",
      },
      {
        type: "p",
        text: "To plan a test properly you choose a confidence level (usually 95%), a statistical power (usually 80%) and a minimum detectable effect: the smallest relative lift that would be worth acting on. A sample size calculator then tells you how many visitors each variant needs.",
      },
      { type: "h2", text: "The numbers in practice" },
      {
        type: "p",
        text: "Take a store converting at 2%. To reliably detect a 10% relative lift, from 2.0% to 2.2%, you need roughly 80,000 visitors per variant, or about 160,000 in total for a simple A/B test. To detect a 20% lift, from 2.0% to 2.4%, you need roughly 21,000 per variant. Halving the effect you want to detect roughly quadruples the traffic required.",
      },
      {
        type: "ul",
        items: [
          "Higher baseline conversion rates need fewer visitors to detect the same relative lift.",
          "Bolder changes produce bigger effects, which are faster to detect than small tweaks.",
          "Testing on high-traffic templates such as product pages reaches significance sooner than testing a single landing page.",
          "Run tests for whole weeks, ideally at least two full business cycles, so weekday and weekend behaviour are both represented.",
        ],
      },
      { type: "h2", text: "What to do when traffic is low" },
      {
        type: "p",
        text: "Low traffic does not mean CRO is off the table. It changes the method. Instead of testing small variations, you lean more on research and implement improvements with strong evidence behind them.",
      },
      {
        type: "ul",
        items: [
          "Use qualitative research: session recordings, heatmaps, on-site polls and customer interviews to find real friction.",
          "Fix clear usability problems directly, such as slow pages, confusing variant pickers or missing shipping information, rather than testing them.",
          "Test fewer, larger changes, such as a new product page layout, instead of button colours.",
          "Track a supporting metric such as add-to-cart rate alongside revenue, while being careful not to optimise for it alone.",
          "Measure before-and-after impact over comparable periods when a controlled test is not feasible, and be honest about the uncertainty.",
        ],
      },
      { type: "h2", text: "A rough guide" },
      {
        type: "p",
        text: "As a rule of thumb, stores with fewer than around 1,000 orders a month get the most value from research-led improvements and occasional large tests. Above that, a regular testing cadence becomes realistic, and with tens of thousands of orders a month you can run several tests in parallel on different templates.",
      },
      {
        type: "p",
        text: "Whatever your traffic, the starting point is the same: a clear baseline in analytics you trust. If you want help working out what is realistic for your store, our [conversion rate optimization team](/services/conversion-rate-optimization) can review your numbers and propose a plan.",
      },
    ],
  },
  {
    slug: "what-a-cro-audit-should-include",
    title: "What a CRO audit should actually include",
    heroTitle: "What a *CRO Audit* Should Actually Include",
    excerpt:
      "Reliable tracking, real customer research and a prioritised backlog of hypotheses, not a long list of design opinions.",
    description:
      "What a useful Shopify CRO audit covers: tracking checks, funnel analysis, customer research, UX review and a prioritised backlog you can act on.",
    category: "CRO",
    date: "2026-10-06",
    author: MIRZA,
    cover: cover("cro-audit", "A red sphere on the right of a dark red gradient with a thin orbit line"),
    body: [
      {
        type: "p",
        text: "A CRO audit should leave you with a clear understanding of where your store loses customers and a prioritised plan to fix it. Too many audits are a slide deck of opinions: make the button bigger, add more reviews, change the hero image. Useful audits are built on data, research and clear reasoning.",
      },
      { type: "h2", text: "1. Check the tracking first" },
      {
        type: "p",
        text: "Every recommendation depends on numbers you can trust. A good audit starts by confirming that analytics records sessions, product views, add-to-carts, checkouts and purchases correctly, that revenue matches Shopify within a reasonable margin, and that consent settings and duplicate tags are not distorting the data.",
      },
      { type: "h2", text: "2. Analyse the funnel" },
      {
        type: "p",
        text: "Next comes a quantitative look at where visitors drop off. Break the funnel down by device, traffic source, landing page and new versus returning customers. A product page that converts well on desktop but poorly on mobile tells you far more than a sitewide average.",
      },
      {
        type: "ul",
        items: [
          "Landing page to product page: are visitors finding relevant products?",
          "Product page to cart: is the page answering buying questions?",
          "Cart to checkout: are shipping costs or delivery times surprising people?",
          "Checkout to purchase: are payment options and form errors causing abandonment?",
        ],
      },
      { type: "h2", text: "3. Listen to customers" },
      {
        type: "p",
        text: "Data shows where people leave; research explains why. Session recordings, heatmaps, on-site polls, post-purchase surveys, support tickets and product reviews reveal the questions and doubts customers have. Often the most valuable insight is a recurring objection, such as sizing or delivery times, that the store never answers.",
      },
      { type: "h2", text: "4. Review the experience" },
      {
        type: "p",
        text: "A structured UX review then looks at navigation, search, collection filtering, product page content, cart, checkout and mobile usability. It should also cover page speed and Core Web Vitals, accessibility issues that block real users, and trust signals such as returns information and reviews.",
      },
      { type: "h2", text: "5. Prioritise the backlog" },
      {
        type: "p",
        text: "The output should not be a list of fifty equally weighted ideas. Each finding becomes a hypothesis that links an observed problem to a proposed change and an expected outcome, and each hypothesis is scored by expected impact, confidence in the evidence and effort to implement.",
      },
      {
        type: "quote",
        text: "Because product page visitors on mobile cannot see delivery times before adding to cart, we believe showing them near the price will increase add-to-cart rate.",
        cite: "Example hypothesis format",
      },
      {
        type: "p",
        text: "Clear bugs and usability problems go straight to implementation. Bigger or riskier changes go into a testing roadmap, sized against the traffic you actually have.",
      },
      { type: "h2", text: "What you should receive" },
      {
        type: "ul",
        items: [
          "A tracking health check with any fixes required.",
          "Funnel and segment analysis with the biggest leaks highlighted.",
          "Research findings in customers' own words.",
          "A prioritised backlog of fixes and test hypotheses.",
          "A realistic testing plan based on your traffic and conversion rate.",
        ],
      },
      {
        type: "p",
        text: "If you are considering an audit, ask to see an example deliverable first. Our [CRO audits](/services/conversion-rate-optimization) follow this structure and end with a working session to agree priorities with your team.",
      },
    ],
  },
  {
    slug: "migrating-to-shopify-without-losing-seo",
    title: "Migrating from Magento or BigCommerce to Shopify without losing SEO",
    heroTitle: "Migrating to *Shopify* Without Losing SEO",
    excerpt:
      "URL mapping, 301 redirects, metadata and content parity: the steps that protect your rankings through a platform move.",
    description:
      "How to migrate from Magento or BigCommerce to Shopify while protecting organic traffic: URL mapping, 301 redirects, metadata, launch checks and monitoring.",
    category: "Migrations",
    date: "2026-09-29",
    author: MIRZA,
    cover: cover("migration-seo", "Two red 3D cubes of different sizes on a dark red gradient"),
    body: [
      {
        type: "p",
        text: "A platform migration is one of the riskiest moments for organic traffic. URLs change, templates change and content gets left behind. The good news is that most ranking losses after a move to Shopify are avoidable with careful planning.",
      },
      { type: "h2", text: "Understand Shopify's URL structure" },
      {
        type: "p",
        text: "Shopify uses fixed URL patterns: products live under /products/, collections under /collections/, content pages under /pages/ and blog posts under /blogs/. Magento and BigCommerce often use flat or nested category paths that cannot be reproduced exactly. That is fine, as long as every important old URL redirects to its closest new equivalent.",
      },
      { type: "h2", text: "Crawl and map every URL" },
      {
        type: "p",
        text: "Before anything moves, crawl the existing site and export the URLs that receive traffic or backlinks from your analytics, Google Search Console and a backlink tool. Then build a redirect map that pairs each old URL with its new Shopify URL.",
      },
      {
        type: "ul",
        items: [
          "Map products to products and categories to the matching collections.",
          "Redirect discontinued products to the most relevant collection, not to the homepage.",
          "Include old blog posts, CMS pages, image URLs with backlinks and any filtered category URLs that rank.",
          "Avoid redirect chains: point each old URL straight to its final destination.",
        ],
      },
      {
        type: "p",
        text: "Shopify's URL redirect manager supports bulk CSV imports, so a large map can be loaded in one step and checked before launch.",
      },
      { type: "h2", text: "Keep content and metadata" },
      {
        type: "p",
        text: "Rankings belong to content, not just URLs. Carry over page titles, meta descriptions, product descriptions, category copy, image alt text and blog content. If the new design removes the introductory text from category pages, collection pages can lose the relevance they had before. Check that structured data for products, reviews and breadcrumbs is present in the new theme.",
      },
      { type: "h2", text: "Launch-day checks" },
      {
        type: "ol",
        items: [
          "Remove any password protection and confirm the store can be indexed.",
          "Test a sample of redirects from every URL type and confirm they return a 301.",
          "Check canonical tags, robots.txt and the Shopify-generated sitemap.",
          "Submit the new sitemap in Google Search Console and keep the old property verified.",
          "Confirm analytics and conversion tracking are firing on the new store.",
        ],
      },
      { type: "h2", text: "Monitor for the first 90 days" },
      {
        type: "p",
        text: "Some fluctuation in the first weeks is normal while search engines recrawl the site. Watch Search Console for crawl errors and 404s, add redirects for any missed URLs, and compare organic landing page traffic against the same period before launch. Most issues show up in the first month and are quick to fix if someone is watching.",
      },
      {
        type: "p",
        text: "A migration also gives you a chance to clean up thin pages, duplicate categories and outdated content. Our [Shopify development team](/services/shopify-development) handles migrations from Magento, BigCommerce, WooCommerce and custom platforms with SEO preservation built into the plan.",
      },
    ],
  },
  {
    slug: "klaviyo-flows-every-shopify-store-should-consider",
    title: "The Klaviyo flows every Shopify store should consider",
    heroTitle: "The *Klaviyo Flows* Every Shopify Store Should Consider",
    excerpt: "Welcome, abandoned cart, browse abandonment, post-purchase and win-back flows, explained.",
    description:
      "The core Klaviyo flows for Shopify stores, what triggers each one, and how to set up welcome, abandonment, post-purchase and win-back emails that convert.",
    category: "Email & SMS",
    date: "2026-09-22",
    author: MIRZA,
    cover: cover("klaviyo-flows", "A large red sphere with an orbit ring rising from a dark gradient"),
    body: [
      {
        type: "p",
        text: "Campaigns get most of the attention, but automated flows often drive a large share of email revenue for Shopify brands. They reach customers at the moments they are most engaged, and once built they keep working in the background. These are the flows we set up first for almost every store.",
      },
      { type: "h2", text: "Welcome series" },
      {
        type: "p",
        text: "Triggered when someone joins your list, usually through a signup form. Use the first email to deliver any promised offer, then spend the next few emails introducing the brand, best sellers, social proof and what makes your products different. Split the flow based on whether the subscriber has purchased so buyers stop receiving the discount reminder.",
      },
      { type: "h2", text: "Abandoned checkout and abandoned cart" },
      {
        type: "p",
        text: "The abandoned checkout flow is triggered by the Started Checkout event and is usually the highest-earning flow. An abandoned cart flow, triggered by Added to Cart through Klaviyo's onsite tracking, catches shoppers earlier. Run both, and filter the cart flow so people who reach checkout move into the checkout flow instead of receiving both.",
      },
      {
        type: "ul",
        items: [
          "Send the first reminder within a few hours, while intent is high.",
          "Show the exact products left behind, with images and a link back to the cart.",
          "Answer common objections such as shipping, returns and sizing before offering a discount.",
          "If you use incentives, save them for the last message in the sequence.",
        ],
      },
      { type: "h2", text: "Browse abandonment" },
      {
        type: "p",
        text: "Triggered when a known subscriber views a product but does not add it to cart. Klaviyo can only attribute browsing to people it can identify, so this flow grows as your list grows. Keep the tone light: a reminder of the product they viewed and a few related items is enough.",
      },
      { type: "h2", text: "Post-purchase" },
      {
        type: "p",
        text: "Triggered by Placed Order. The first job is reassurance: thank the customer, set delivery expectations and explain how to get the most out of the product. Later emails can ask for a review, suggest complementary products and, for consumables, remind customers when they are likely to run out. Split first-time and repeat buyers so the messaging fits.",
      },
      { type: "h2", text: "Win-back" },
      {
        type: "p",
        text: "Triggered when a customer has not purchased for longer than your typical repurchase cycle. Look at your data to set the timing: a skincare brand might wait 60 to 90 days, a furniture brand much longer. Lead with what is new, then consider an offer for customers who still do not return.",
      },
      { type: "h2", text: "Adding SMS" },
      {
        type: "p",
        text: "SMS works well as a complement to email in the most time-sensitive flows, such as abandoned checkout, rather than as a copy of every email. Only message subscribers who have given explicit SMS consent, respect quiet hours, and keep messages short.",
      },
      { type: "h2", text: "Measure and refine" },
      {
        type: "p",
        text: "Review each flow monthly: revenue per recipient, conversion rate, unsubscribe rate and deliverability. Test subject lines, timing and content one change at a time. Our [ecommerce marketing team](/services/ecommerce-marketing) builds and manages Klaviyo flows for Shopify brands as part of a wider retention programme.",
      },
    ],
  },
  {
    slug: "meta-ads-and-email-connected-strategy",
    title: "Meta Ads and email: building one connected strategy",
    heroTitle: "Meta Ads and Email: *One Connected* Strategy",
    excerpt: "How campaign performance informs creative and how customer behavior informs segmentation.",
    description:
      "How to connect Meta Ads and email marketing for a Shopify brand: shared audiences, creative learnings, list growth and one view of customer acquisition cost.",
    category: "Paid media",
    date: "2026-09-15",
    author: MIRZA,
    cover: cover("meta-email", "Two red spheres of different sizes on a dark red gradient"),
    body: [
      {
        type: "p",
        text: "Many brands run Meta Ads and email as separate channels, often with separate teams or agencies. Each reports its own wins, and nobody looks at how they affect each other. Treating them as one system makes both channels cheaper and more effective.",
      },
      { type: "h2", text: "Share what you learn about creative" },
      {
        type: "p",
        text: "Paid social is a fast, large-scale testing ground for messaging. When an ad angle, offer or product consistently earns a strong click-through rate and conversion rate, use it in email subject lines, hero images and campaign themes. The reverse also works: email campaigns that earn high click rates point to messages worth testing in ads.",
      },
      { type: "h2", text: "Use customer data to shape audiences" },
      {
        type: "p",
        text: "Klaviyo segments can sync to Meta as custom audiences. That lets you exclude recent purchasers from prospecting campaigns, build lookalike audiences from your highest-value customers, and retarget engaged subscribers who have not bought yet. With privacy changes limiting pixel data, first-party lists have become one of the most reliable audience signals you have.",
      },
      {
        type: "ul",
        items: [
          "Exclude customers who purchased in the last 30 days from acquisition campaigns.",
          "Seed lookalikes with repeat buyers or high lifetime value customers.",
          "Retarget subscribers who opened or clicked but did not purchase.",
          "Reach lapsed customers on Meta when they stop engaging with email.",
        ],
      },
      { type: "h2", text: "Turn ad traffic into subscribers" },
      {
        type: "p",
        text: "Most paid visitors will not buy on their first visit. A well-designed signup form, with a clear reason to subscribe, captures a share of that traffic so your welcome flow can continue the conversation at no extra media cost. Track list growth from paid traffic as a metric in its own right.",
      },
      { type: "h2", text: "Align the calendar" },
      {
        type: "p",
        text: "Launches, sales and seasonal moments should run across both channels with the same message and timing. Warm up the email list before a launch, use ads to reach new audiences during it, and follow up by email afterwards. Customers notice when the story is consistent.",
      },
      { type: "h2", text: "Measure the system, not the channel" },
      {
        type: "p",
        text: "Platform attribution will always overlap: Meta and Klaviyo can both claim the same order. Instead of arguing over credit, watch blended metrics from Shopify, such as total revenue, new customer revenue, marketing efficiency ratio and customer acquisition cost, alongside channel reports. If paid spend rises and new customer revenue does not, something needs to change, whatever each platform says.",
      },
      {
        type: "quote",
        text: "Paid media finds the customer. Email and SMS keep them. The strategy only works when both teams look at the same numbers.",
      },
      {
        type: "p",
        text: "Our [ecommerce marketing team](/services/ecommerce-marketing) runs paid media and retention together for Shopify brands, with one shared scoreboard.",
      },
    ],
  },
  {
    slug: "custom-theme-or-customization",
    title: "Custom theme or customization? Choosing the practical option",
    heroTitle: "Custom Theme or *Customization*?",
    excerpt: "When adapting an existing theme is more efficient than building a custom one.",
    description:
      "Should your Shopify store use a customized theme or a fully custom build? How to compare cost, speed, flexibility and maintenance before you decide.",
    category: "Shopify",
    date: "2026-09-08",
    author: MIRZA,
    cover: cover("custom-theme", "A red 3D cube and a small red sphere on a dark red gradient"),
    body: [
      {
        type: "p",
        text: "Every Shopify redesign reaches the same decision: start from an existing theme and customise it, or design and build a custom theme from scratch. Both are valid. The right choice depends on how different your store needs to be, your budget and timeline, and who will maintain it.",
      },
      { type: "h2", text: "What modern themes already do well" },
      {
        type: "p",
        text: "Online Store 2.0 themes, including Shopify's free themes and the premium themes in the Theme Store, are fast, accessible and flexible. Merchants can add and reorder sections on any page, create templates for different product types and use app blocks without editing code. For many brands, a good theme covers most of what the store needs.",
      },
      { type: "h2", text: "When customization is the practical option" },
      {
        type: "ul",
        items: [
          "Your requirements are close to an existing theme, with a handful of custom sections or features.",
          "You need to launch quickly or keep the initial budget contained.",
          "Your team wants to manage content in the theme editor without developer help.",
          "You value receiving theme updates from the developer over time.",
        ],
      },
      {
        type: "p",
        text: "A customised theme can still look distinctive. Strong photography, typography, colour and a few bespoke sections go a long way, and the result is usually faster to build and easier to maintain.",
      },
      { type: "h2", text: "When a custom theme makes sense" },
      {
        type: "ul",
        items: [
          "The brand experience is central to how you sell and needs to stand apart from competitors.",
          "You have complex merchandising, such as product builders, bundles or unusual catalogue structures.",
          "You have fought an existing theme for years with layers of workarounds and unused code.",
          "Performance targets require stripping out features you will never use.",
        ],
      },
      {
        type: "p",
        text: "A custom theme gives full control over design, code quality and performance, but it costs more up front and you own its maintenance. It should still be built with sections and blocks, so your team can edit content without developers.",
      },
      { type: "h2", text: "Watch out for heavy customization" },
      {
        type: "p",
        text: "The riskiest path is a purchased theme with extensive custom changes. Once the code has been heavily modified, applying the theme developer's updates becomes difficult and you end up with the costs of a custom theme without its benefits. If your customization list keeps growing, compare it honestly against a custom build.",
      },
      { type: "h2", text: "How we decide with clients" },
      {
        type: "p",
        text: "We list the required templates and features, check them against two or three candidate themes, and estimate the work for each route, including maintenance. The comparison usually makes the decision obvious. If you are planning a redesign, our [Shopify development team](/services/shopify-development) can run that comparison for your store.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ helpers */

export const getInsight = (slug: string) => insights.find((a) => a.slug === slug);

/** Stable anchor id for a heading. */
export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const blockText = (b: InsightBlock) => ("items" in b ? b.items.join(" ") : b.text);

/** Reading time in minutes at ~220 words per minute. */
export function readingTime(article: Insight) {
  const words = article.body.map(blockText).join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export const tableOfContents = (article: Insight) =>
  article.body.filter((b): b is Extract<InsightBlock, { type: "h2" }> => b.type === "h2").map((b) => ({ id: headingId(b.text), text: b.text }));

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-11-03" → "03 / Nov / 2026" (the design's date format). */
export function formatInsightDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d} / ${MONTHS[Number(m) - 1]} / ${y}`;
}

/** Newest first. */
export const sortedInsights = () => [...insights].sort((a, b) => b.date.localeCompare(a.date));

/** Up to `count` other articles, same category first, then newest. */
export function relatedInsights(article: Insight, count = 3) {
  const others = sortedInsights().filter((a) => a.slug !== article.slug);
  return [...others.filter((a) => a.category === article.category), ...others.filter((a) => a.category !== article.category)].slice(0, count);
}
