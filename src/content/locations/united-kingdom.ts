import type { Country } from "./types";

export const unitedKingdom: Country = {
  slug: "united-kingdom",
  name: "United Kingdom",
  code: "UK",
  currency: "GBP",
  metaTitle: "Shopify Agency for UK DTC Brands | The Active Solutions",
  metaDescription:
    "Shopify development, CRO and ecommerce marketing for UK DTC brands: VAT, BNPL, Klarna, DMCC Act and UK GDPR handled properly. Remote team, UK-morning calls.",
  headline: "Shopify agency for *UK* DTC brands",
  lead: "Shopify builds, conversion work and retention marketing for UK brands, done by a remote team that knows the rules British shoppers and regulators expect you to follow.",
  intro: [
    "The UK is one of the most mature online retail markets in the world. Shoppers here are used to next-day delivery, free or cheap returns, and paying with a wallet or Klarna in two taps. That raises the floor for every DTC brand: a Shopify store that would pass in a newer market feels slow, unclear or untrustworthy to a British customer who has been buying online for twenty years.",
    "The rules have also moved quickly. Since Brexit, selling into the EU means customs data and the €3 per-item duty on low-value parcels that applies from July 2026. The Digital Markets, Competition and Consumers Act 2024 gave the CMA power to fine directly over fake reviews and hidden fees. Buy now, pay later has been FCA-regulated since 15 July 2026, and the Data (Use and Access) Act 2025 changed cookie consent and raised PECR fines.",
    "We work with UK brands remotely as Shopify developers, CRO specialists and paid media and Klaviyo operators. That means building Shopify and Shopify Plus stores that handle VAT-inclusive pricing, UK carriers and EU shipping cleanly, then improving conversion and retention with testing rather than guesswork.",
  ],
  essentials: [
    {
      title: "VAT: 20% standard, £90,000 threshold",
      text: "UK VAT is 20% at the standard rate, and you must register once taxable turnover passes £90,000 in a rolling 12 months (raised from £85,000 in April 2024). UK shoppers expect VAT-inclusive prices, so we set Shopify's tax settings and Markets so the price on the product page is the price at checkout, with reduced and zero-rated products (such as most children's clothing) tagged correctly.",
    },
    {
      title: "Payments, wallets and regulated BNPL",
      text: "Shopify Payments in the UK supports cards, Apple Pay, Google Pay and Shop Pay, plus Klarna, which is switched off by default and has to be activated. Clearpay and PayPal Pay in 3 run through their own apps. Third-party BNPL (deferred payment credit) has been regulated by the FCA since 15 July 2026, so lenders now run affordability checks and your BNPL messaging on product pages should be clear and not overstate it.",
    },
    {
      title: "Shipping, carriers and Northern Ireland",
      text: "Royal Mail, Evri, DPD, DHL and InPost are the carriers most UK stores combine, and next-day tracked delivery is the expectation for many categories. Parcels from Great Britain to Northern Ireland have run under the Windsor Framework since 1 May 2025, which can mean extra data for carriers and a UK Internal Market Scheme number, so NI shipping rates and checkout need their own set-up.",
    },
    {
      title: "Selling into the EU after Brexit",
      text: "UK stores selling to EU consumers pay EU VAT at import. The Import One Stop Shop (IOSS) covers consignments up to €150, but a UK business needs an EU intermediary to use it. Since 1 July 2026, the EU also charges a temporary €3 customs duty per item on low-value parcels. We configure Shopify Markets, duties and delivered-duty-paid pricing so EU customers are not hit with surprise fees.",
    },
    {
      title: "Consumer law: 14-day cancellation and the DMCC Act",
      text: "Under the Consumer Contracts Regulations, online shoppers can cancel within 14 days of receiving goods and must be refunded within 14 days of returning them. Since 6 April 2025, the DMCC Act has banned fake or undisclosed incentivised reviews and drip pricing, meaning mandatory fees must sit in the headline price. The CMA can now fine up to 10% of global turnover, so review apps and fee displays need checking.",
    },
    {
      title: "UK GDPR, PECR and cookie consent",
      text: "UK GDPR and PECR govern data and marketing. The Data (Use and Access) Act 2025 lets you set some low-risk analytics cookies without prior consent, provided users can opt out, but advertising pixels still need consent, and PECR fines now match UK GDPR levels. Email and SMS marketing need opt-in, or the soft opt-in for existing customers, so we build Klaviyo sign-up forms and consent records to fit.",
    },
  ],
  workingTogether:
    "Our team works from Pakistan (PKT, UTC+5), and live calls happen in the UK morning. Our meeting slots are 10:00–12:00 and 14:00–16:00 Pakistan time, Monday to Friday. In winter (GMT) the second slot is 09:00–11:00 UK time and the first is 05:00–07:00; in summer (BST) they move to 10:00–12:00 and 06:00–08:00. Because we are ahead of you, work requested the day before is usually done by the time your team logs on, and we keep everything else moving through shared boards, Loom walkthroughs and written updates.",
  caseStudies: ["the-thermolab", "peak-motion", "dermalyft"],
  faqs: [
    {
      question: "Do you have a UK office?",
      answer:
        "No. We are a remote team working from Pakistan and we work with UK brands remotely. Calls happen during the UK morning, between 09:00 and 11:00 in winter and 10:00 and 12:00 in summer, and the rest of the work runs through shared project boards, recorded walkthroughs and written updates. We have built and grown Shopify stores for UK brands this way, including The ThermoLab.",
    },
    {
      question: "Can you set up Shopify to handle UK VAT and EU sales?",
      answer:
        "Yes. We configure VAT-inclusive pricing, tax overrides for reduced and zero-rated products, and Shopify Markets for the EU, including duties and delivered-duty-paid pricing where it makes sense. We are not tax advisers, so registration decisions, IOSS intermediaries and filings sit with your accountant, but we make sure the store does exactly what they advise.",
    },
    {
      question: "Should we offer Klarna or Clearpay at checkout?",
      answer:
        "Often, yes, especially for fashion, beauty and higher-priced items, where UK shoppers expect to see it. Klarna can be enabled inside Shopify Payments; Clearpay runs as a separate app. Since BNPL became FCA-regulated in July 2026, lenders carry out affordability checks, so we test BNPL messaging on product pages rather than assuming it lifts conversion, and keep the wording accurate.",
    },
    {
      question: "What does the DMCC Act change for a Shopify store?",
      answer:
        "Two things matter most. First, reviews: you must not post or commission fake reviews, must disclose incentivised ones, and should take reasonable steps to stop fake reviews appearing, so your review app's settings matter. Second, pricing: mandatory fees must be included in the price shown up front. We audit product pages, cart and checkout for both as part of CRO work.",
    },
    {
      question: "Do you work with agencies in the UK as well as brands?",
      answer:
        "Yes. Through our white label Shopify development service, UK agencies use us as extra delivery capacity for theme builds, Shopify Plus work and migrations, under their own brand. Our UK-morning overlap means your team can brief us at the start of the day, and we work to your processes, tools and QA standards.",
    },
  ],
  cities: [
    {
      slug: "london",
      name: "London",
      region: "England",
      timeZone: "Europe/London",
      metaTitle: "Shopify Agency in London for DTC | The Active Solutions",
      metaDescription:
        "A remote Shopify agency for London DTC brands in fashion, beauty and luxury: Shopify Plus builds, international Markets set-up, CRO and Klaviyo retention.",
      headline: "Shopify Agency in London for *ambitious* DTC brands",
      lead: "For London fashion, beauty and luxury brands that sell to the whole world from day one and compete with the best-funded stores in Europe.",
      intro: [
        "London is where many of the UK's best-known DTC brands are launched, funded and marketed. Fashion has London Fashion Week twice a year, beauty and wellness brands crowd the same Instagram feeds, and luxury labels near Mayfair sell to customers who also shop with global houses. If you are looking for a Shopify agency in London, you are usually competing against stores with large creative budgets, so the bar for speed, imagery and checkout is high.",
        "London brands also sell internationally earlier than most. A label with a London address often has customers in the US, the EU and the Gulf within its first year, which turns Shopify Markets, multi-currency pricing, duties and localised content into launch requirements rather than later projects. Shopify Plus is often worth it here for checkout extensibility and running several markets from one store.",
        "We work with London brands remotely, not from a London office. Our Shopify developers handle Plus builds, theme work and migrations, and our CRO and marketing team runs A/B tests, paid media on Meta, Google and TikTok, and Klaviyo flows aimed at the repeat buyer that London brands need to pay back expensive acquisition.",
      ],
      industries: [
        {
          title: "Fashion and accessories",
          text: "London Fashion Week puts collections in front of buyers and press each February and September. Drop-led brands need stores that handle launch traffic, pre-orders, size guidance and a returns flow that does not eat margin.",
        },
        {
          title: "Beauty, skincare and wellness",
          text: "A crowded, content-led category where subscriptions, bundles and ingredient-led product pages matter. Claims and before-and-after imagery need care, and retention through Klaviyo usually decides profitability.",
        },
        {
          title: "Luxury and premium goods",
          text: "Customers compare your site with global luxury houses. That means fast, image-heavy pages that still load quickly, clear duties-paid international pricing, and concierge touches such as appointment booking or click-and-collect.",
        },
        {
          title: "Fintech-adjacent and subscription brands",
          text: "London's fintech scene shapes how shoppers expect to pay: wallets, BNPL and pay-by-bank. Subscription and membership brands need billing, account and cancellation flows that are clear and easy to use.",
        },
      ],
      local: [
        {
          title: "Same-day and nominated-day delivery",
          text: "In London, same-day and evening delivery from local couriers and quick-commerce players set expectations. If you offer it within the M25, Shopify needs postcode-based rates and accurate cut-off messaging on product pages.",
        },
        {
          title: "Overseas shoppers and visitors",
          text: "London attracts shoppers who discover a brand in person and reorder from abroad. Tax-free shopping for visitors ended in January 2021, so clear international shipping and duties-paid pricing matter for that reorder.",
        },
        {
          title: "Pop-ups and showrooms",
          text: "Many London DTC brands test physical retail through pop-ups. Shopify POS keeps inventory, customer profiles and Klaviyo data in one place, so an in-person buyer can be followed up online.",
        },
        {
          title: "Fashion-calendar peaks",
          text: "Fashion Week, summer sale and Black Friday overlap with Christmas gifting. Plan theme changes and tests outside these windows and load-test launches ahead of them.",
        },
      ],
      faqs: [
        {
          question: "Do you meet London clients in person?",
          answer:
            "No. We work with London brands remotely, and we are clear about that from the start. Calls run in your morning, 09:00–11:00 in winter and 10:00–12:00 in summer, and we share recorded walkthroughs so your team can review work when it suits. For busy founders, that is often quicker than travelling across town for a meeting.",
        },
        {
          question: "Is Shopify Plus worth it for a London fashion brand?",
          answer:
            "It depends on volume and complexity. Plus becomes worth the cost when you need checkout customisation, several international storefronts, wholesale on the same platform, or automation for high-traffic drops. Many London brands start on standard Shopify and move to Plus as they expand internationally. We can model the move and handle the migration without disrupting live sales.",
        },
        {
          question: "Can you set up same-day delivery options for London postcodes?",
          answer:
            "Yes. We set up postcode-based shipping rates and delivery promises in Shopify, connect your courier or 3PL, and show clear order cut-off times on product and cart pages. We also make sure out-of-area customers never see an option they cannot get, which avoids complaints and refunds.",
        },
        {
          question: "How do you help London brands selling to the US and EU?",
          answer:
            "We set up Shopify Markets with local currencies, duties and delivered-duty-paid pricing where it suits, translated or adapted content, and market-specific payment methods. We then run tests per market, because a London brand's US shoppers often respond to different offers and product pages than its UK customers.",
        },
      ],
      sources: [
        { title: "British Fashion Council: London Fashion Week", url: "https://www.britishfashioncouncil.co.uk/" },
        { title: "Shopify Help Center: Shopify Payments for the United Kingdom", url: "https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries/united-kingdom" },
        { title: "GOV.UK: Revenue and Customs Brief 21 (2020), withdrawal of tax-free shopping", url: "https://www.gov.uk/government/publications/revenue-and-customs-brief-21-2020-withdrawal-of-the-vat-retail-export-scheme-and-the-tax-free-shopping-concession/revenue-and-customs-brief-21-2020-withdrawal-of-the-vat-retail-export-scheme-and-the-tax-free-shopping-concession" },
      ],
    },
    {
      slug: "manchester",
      name: "Manchester",
      region: "England",
      timeZone: "Europe/London",
      metaTitle: "Shopify Agency in Manchester | The Active Solutions",
      metaDescription:
        "Remote Shopify developers and CRO for Manchester DTC brands: fashion and sportswear stores built for drops, fast-moving catalogues and social-led traffic.",
      headline: "Shopify Agency in Manchester for *fast-moving* brands",
      lead: "For Manchester fashion, sportswear and lifestyle brands born on social media, where trends move weekly and the store has to keep up.",
      intro: [
        "Greater Manchester grew one of the UK's biggest clusters of online fashion businesses. Boohoo started in the city in 2006 and later bought PrettyLittleThing, which built its head office in Ancoats. THG, JD Sports and N Brown are also based in the area. That history left Manchester with a deep pool of ecommerce, buying and social media talent, and a generation of founders who learned fast-fashion playbooks first-hand.",
        "For a DTC brand starting in Manchester, that is both an advantage and a challenge. Shoppers here know what a slick mobile fashion store feels like, and the brands you compete with for attention on TikTok and Instagram launch new products constantly. Your Shopify store needs to handle large, fast-changing catalogues, frequent drops and traffic spikes from creators without slowing down.",
        "We work with Manchester brands remotely. Our Shopify developers build themes for high SKU counts, filters and merchandising, and our team runs paid social, creator content and Klaviyo email and SMS. The goal for most brands is to turn the first social-led purchase into repeat orders, because acquisition costs in fashion rarely pay back on the first order alone.",
      ],
      industries: [
        {
          title: "Fast and trend-led fashion",
          text: "Founders here often come from the large Manchester etailers. They need stores that launch collections weekly, merchandise automatically and keep collection pages fast with hundreds of products.",
        },
        {
          title: "Sportswear and athleisure",
          text: "With JD Sports in Greater Manchester and a strong gym and running culture, activewear brands compete on fit and community. Size guidance, reviews and bundle offers carry much of the conversion work.",
        },
        {
          title: "Music, football and fan merchandise",
          text: "Manchester's music and football culture creates demand for limited-run merchandise. Drops need queue-proof checkout, pre-order logic and stock limits per customer.",
        },
        {
          title: "Lifestyle and home brands",
          text: "Social-native home, candle and gifting brands from the North West rely on gifting seasons, so bundles, gift messaging and delivery cut-offs matter.",
        },
      ],
      local: [
        {
          title: "Social-led traffic spikes",
          text: "Creator posts and TikTok moments send short, sharp traffic spikes. Lightweight themes, fewer apps and well-built landing pages stop the store from slowing at the moment it matters.",
        },
        {
          title: "Returns-heavy categories",
          text: "Fashion carries high return rates. A self-serve returns portal, exchange-first flows and clear size guidance protect margin while keeping the 14-day cancellation rights intact.",
        },
        {
          title: "A competitive local talent market",
          text: "Manchester's big etailers hire many ecommerce specialists, which can make in-house developers costly and hard to keep. An outsourced Shopify team gives smaller brands steady capacity.",
        },
        {
          title: "Northern 3PL access",
          text: "Many North West brands use 3PLs in the region and the Midlands. We integrate warehouse and stock sync with Shopify so sell-outs and back-in-stock alerts stay accurate during drops.",
        },
      ],
      faqs: [
        {
          question: "Can you build a Shopify store that handles weekly fashion drops?",
          answer:
            "Yes. We build themes and collection logic for frequent launches: scheduled publishing, automated collections, pre-order and back-in-stock handling, and pages that stay fast with large catalogues. We also stress-test checkout and app load ahead of big drops, so creator-driven traffic does not slow the store down when you need it most.",
        },
        {
          question: "Do you work with Manchester agencies as a white label partner?",
          answer:
            "Yes. Manchester has a large community of creative and digital agencies, and some need extra Shopify development capacity without hiring. Our white label service lets an agency hand us theme builds, Shopify Plus work or migrations under its own brand, with briefs taken in the UK morning and work progressing while your team is offline.",
        },
        {
          question: "How do you reduce returns for a Manchester fashion brand?",
          answer:
            "We start with the causes: size and fit questions, unclear product imagery and mismatched expectations. Typical fixes include better size guides, fit notes from reviews, exchange-first return flows and post-purchase emails that set expectations. We A/B test these changes where traffic allows, and track return rate alongside conversion so we do not trade one problem for another.",
        },
        {
          question: "Do you have staff in Manchester?",
          answer:
            "No. Our team works remotely from Pakistan, and we work with Manchester brands through scheduled calls in the UK morning, shared project boards and recorded walkthroughs. We do not claim a local office. What we offer is dedicated Shopify, CRO and marketing capacity that keeps pace with a fast-moving fashion or lifestyle brand.",
        },
      ],
      sources: [
        { title: "University of Manchester Careers: fashion businesses based in Greater Manchester", url: "https://www.careers.manchester.ac.uk/playpen/suzanne/creeber-suzanne/newfashiontextiles/" },
        { title: "Retail Gazette: PrettyLittleThing plans to expand Manchester HQ", url: "https://www.retailgazette.co.uk/blog/2020/07/200-new-jobs-as-prettylittlething-submits-plans-to-expand-hq/" },
        { title: "Prolific North: Boohoo.com buys PrettyLittleThing", url: "https://prolificnorth.co.uk/?p=25179" },
        { title: "UKTN: Manchester's Boohoo acquires Nasty Gal", url: "https://www.uktech.news/news/manchesters-boohoo-acquires-american-fashion-retailer-nasty-gal-for-20m-20170209" },
      ],
    },
    {
      slug: "birmingham",
      name: "Birmingham",
      region: "England",
      timeZone: "Europe/London",
      metaTitle: "Shopify Agency in Birmingham | The Active Solutions",
      metaDescription:
        "Remote Shopify developers for Birmingham brands: jewellery, made-in-Britain and maker stores, with Midlands logistics, B2B and DTC on a single Shopify set-up.",
      headline: "Shopify Agency in Birmingham for *makers* and manufacturers",
      lead: "For Birmingham jewellers, manufacturers and Midlands brands moving from trade and wholesale into selling direct to consumers.",
      intro: [
        "Birmingham's ecommerce opportunity is rooted in making things. The Jewellery Quarter is still home to hundreds of jewellery businesses, and the Birmingham Assay Office, founded in 1773, is the world's largest, hallmarking millions of items a year and giving local makers a mark of quality that buyers recognise. Across the wider West Midlands, family manufacturers that sold through trade and retail for decades are now building DTC brands of their own.",
        "Moving from wholesale to DTC brings particular Shopify problems. Jewellers need product pages that explain metals, hallmarks, sizing and personalisation clearly and handle made-to-order lead times. Manufacturers often need B2B price lists, trade accounts and DTC on the same catalogue, which is where Shopify Plus B2B features or carefully chosen apps earn their place.",
        "Birmingham also sits at the edge of the Midlands' 'golden triangle', where many of the UK's largest warehouses and 3PLs are based within a few hours' drive of most of the population. We work with Birmingham brands remotely, connecting Shopify to Midlands fulfilment, building stores that show craft and provenance, and running CRO and paid media that turn heritage into reasons to buy.",
      ],
      industries: [
        {
          title: "Jewellery and precious metals",
          text: "High-consideration purchases where trust decides conversion: clear hallmark and metal information, ring sizing tools, engraving and bespoke enquiry flows, plus secure, insured delivery messaging.",
        },
        {
          title: "Manufacturing turning DTC",
          text: "Midlands manufacturers launching consumer brands need wholesale and retail side by side: trade logins, tiered pricing and DTC storytelling without two separate platforms.",
        },
        {
          title: "Made-in-Britain homeware and leather goods",
          text: "Provenance sells. Product pages that show the workshop, materials and process, backed by honest reviews, help justify premium prices against imported alternatives.",
        },
        {
          title: "Food, drink and confectionery",
          text: "Birmingham has a long confectionery and food-making heritage. Gifting, subscriptions and corporate orders need bundles, delivery-date pickers and seasonal landing pages.",
        },
      ],
      local: [
        {
          title: "Golden-triangle fulfilment",
          text: "Being close to Midlands 3PLs and carrier hubs makes next-day UK delivery realistic. We integrate warehouse systems with Shopify so stock, cut-offs and tracking stay accurate.",
        },
        {
          title: "Hallmarking and product information",
          text: "Precious metal items above legal weight thresholds must be hallmarked, and dealers must display the Dealer's Notice. We build product templates and site notices that present this clearly online.",
        },
        {
          title: "Made-to-order lead times",
          text: "Bespoke and personalised pieces need honest dispatch estimates on product pages, and personalised items fall outside the standard 14-day cancellation right, which should be explained before purchase.",
        },
        {
          title: "Trade and retail on one store",
          text: "Many Birmingham businesses still serve trade buyers. Shopify B2B or wholesale apps let them keep trade pricing private while running a consumer storefront on the same catalogue.",
        },
      ],
      faqs: [
        {
          question: "Can you build a Shopify store for a Jewellery Quarter business?",
          answer:
            "Yes. We build product templates for metal, stone and hallmark details, ring sizing guidance, engraving and personalisation options, and bespoke enquiry or appointment flows. We also set up secure delivery messaging and returns rules that reflect made-to-order items. The aim is to give online buyers the same confidence they would get across the counter in the Quarter.",
        },
        {
          question: "We sell wholesale. Can Shopify handle trade and DTC together?",
          answer:
            "Yes. Shopify Plus includes B2B features such as company accounts, price lists and payment terms, and on standard plans wholesale apps can cover simpler needs. We map your trade terms, decide which route fits, and build one catalogue that serves both, so you are not running two systems or duplicating stock.",
        },
        {
          question: "Can you connect our Shopify store to a Midlands 3PL?",
          answer:
            "Yes. We connect Shopify with your warehouse or 3PL so orders, stock levels and tracking flow automatically, then set realistic delivery promises and cut-off times on the storefront. Many Birmingham brands use fulfilment partners in the golden triangle, which makes next-day delivery promises achievable when the integration is set up properly.",
        },
        {
          question: "Do you have a Birmingham office?",
          answer:
            "No. We are a remote team based in Pakistan, and we work with Birmingham brands through UK-morning calls, shared boards and recorded walkthroughs. Many manufacturing businesses find this works well because it is structured and written down, and there is always a clear record of what was agreed and delivered.",
        },
      ],
      sources: [
        { title: "Jewellery Quarter (Wikipedia, for background on the Quarter and Assay Office)", url: "https://en.wikipedia.org/wiki/Jewellery_Quarter" },
        { title: "Birmingham City University: 10 things about the Jewellery Quarter", url: "https://www.bcu.ac.uk/blog/jewellery/10-things-about-jewellery-quarter" },
        { title: "Birmingham Dispatch: Birmingham and the Golden Logistics Triangle", url: "https://www.birminghamdispatch.co.uk/p/birmingham-is-at-the-centre-of-the" },
        { title: "GOV.UK: Hallmarking, how businesses can comply with the law", url: "https://www.gov.uk/guidance/hallmarking-how-businesses-can-comply-with-the-law" },
        { title: "legislation.gov.uk: Consumer Contracts Regulations 2013", url: "https://www.legislation.gov.uk/uksi/2013/3134/note" },
      ],
    },
    {
      slug: "leeds",
      name: "Leeds",
      region: "England",
      timeZone: "Europe/London",
      metaTitle: "Shopify Agency in Leeds for DTC | The Active Solutions",
      metaDescription:
        "Remote Shopify developers, CRO and marketing for Leeds and Yorkshire DTC brands: retail know-how, subscription and fintech-minded checkout, built to scale.",
      headline: "Shopify Agency in Leeds for *growing* Yorkshire brands",
      lead: "For Leeds and Yorkshire brands with deep retail roots, practical founders and plans to grow beyond the North.",
      intro: [
        "Leeds has retail in its history. Marks & Spencer began as a Penny Bazaar stall in Kirkgate Market in 1884, and Asda's head office is in the city today. Alongside that, Leeds is a major financial, legal and digital centre, and its annual Leeds Digital Festival has grown into one of the UK's larger tech events. Founders here often combine retail experience with a strong commercial, numbers-first approach.",
        "That shapes what a Leeds DTC brand needs from Shopify. Decisions tend to be driven by margin and payback rather than brand awareness alone, so measurement matters: clean analytics, consent-aware tracking and A/B tests that show what actually moved revenue. Subscription and replenishment models suit Yorkshire's food, drink, pet and personal-care brands, and the city's fintech and financial services sector keeps payment expectations high.",
        "We work with Leeds brands remotely. Our Shopify developers build and migrate stores, including Shopify Plus, and our CRO team runs audits and tests with clear reporting. On the marketing side, we manage paid media and Klaviyo retention for brands that want each pound of ad spend accounted for.",
      ],
      industries: [
        {
          title: "Retail brands going direct",
          text: "Leeds has generations of retail experience. Brands moving from stockists to DTC need merchandising, promotions and stock control that behave like a well-run shop.",
        },
        {
          title: "Subscription food, drink and pet",
          text: "Yorkshire producers of coffee, tea, treats and pet food suit repeat models. Subscription apps, flexible delivery dates and win-back flows drive lifetime value.",
        },
        {
          title: "Personal care and health",
          text: "Replenishment products benefit from simple reorder journeys, bundles and Klaviyo flows timed to usage, while health claims need careful, compliant wording.",
        },
        {
          title: "Fintech-minded checkout",
          text: "With a large financial services and fintech community, Leeds founders often care about payment mix: wallets, BNPL and alternative payment methods, tested properly.",
        },
      ],
      local: [
        {
          title: "Measurement-first decisions",
          text: "Commercially minded teams want proof. We set up GA4, server-side tracking where appropriate and consent settings that keep data usable under UK cookie rules.",
        },
        {
          title: "Selling beyond Yorkshire",
          text: "Many Leeds brands have loyal regional customers before they grow nationally. Paid media and landing pages need to explain the brand to people who have never seen it in a local shop.",
        },
        {
          title: "Northern logistics",
          text: "Leeds sits on the M1 and M62 corridors, with access to northern and Midlands 3PLs. That supports next-day promises across much of England when Shopify is integrated properly.",
        },
        {
          title: "Retail calendar alignment",
          text: "Brands with stockists or market stalls need DTC promotions that do not undercut their wholesale partners. We plan pricing, codes and exclusives to keep both channels healthy.",
        },
      ],
      faqs: [
        {
          question: "Do you work with Leeds retail brands that also sell through stockists?",
          answer:
            "Yes. Many Leeds brands sell through shops as well as online. We help structure DTC pricing, exclusive products and discount codes so the online store grows without undercutting stockists, and can set up wholesale ordering on Shopify so trade customers order from the same catalogue.",
        },
        {
          question: "How do you prove CRO work is actually making money?",
          answer:
            "We agree the metrics first, usually conversion rate, revenue per visitor and average order value, then run controlled A/B tests where traffic allows. Each test gets a written hypothesis and a result, including the ones that lose. For lower-traffic stores we use audits and user research instead and are honest about what can and cannot be measured.",
        },
        {
          question: "Can you set up subscriptions for a Yorkshire food or drink brand?",
          answer:
            "Yes. We set up subscription apps with flexible frequencies, skip and pause options, and customer portals, then connect them to Klaviyo for reminders and win-back flows. We keep cancellation simple, which UK consumer law expects and which customers trust. For perishable goods, we also configure delivery-day options so orders arrive fresh.",
        },
        {
          question: "Are you based in Leeds?",
          answer:
            "No. We are a remote team working from Pakistan and we work with Leeds brands remotely, with calls in the UK morning and written updates throughout the week. We do not claim local staff or a local office. What we bring is dedicated Shopify, CRO and marketing capacity without the cost of building that team in-house.",
        },
      ],
      sources: [
        { title: "Marks & Spencer: Our history (Kirkgate Market, 1884)", url: "https://corporate.marksandspencer.com/about-us/our-history" },
        { title: "Yorkshire Post: Asda says its future still lies in Leeds", url: "https://www.yorkshirepost.co.uk/news/asda-says-its-future-still-lies-in-leeds-despite-rumours-that-city-offices-will-close-in-a-year-585067" },
        { title: "BusinessCloud: 2026 Leeds Digital Festival programme revealed", url: "https://businesscloud.co.uk/news/2026-leeds-digital-festival-programme-revealed/" },
        { title: "Tech Nation: Leeds digital tech sector", url: "https://technation.io/wp-content/uploads/2018/09/Leeds-digital-tech-sector-thrives-as-mix-of-corporates-and-startups-collaborate-for-success.pdf" },
      ],
    },
    {
      slug: "edinburgh",
      name: "Edinburgh",
      region: "Scotland",
      timeZone: "Europe/London",
      metaTitle: "Shopify Agency in Edinburgh | The Active Solutions",
      metaDescription:
        "Remote Shopify developers for Edinburgh brands in whisky, food, drink and gifting: age checks, Scottish rules, Highland delivery and international sales.",
      headline: "Shopify Agency in Edinburgh for *Scottish* brands",
      lead: "For Edinburgh food, drink, whisky and gifting brands that sell Scottish provenance to customers across the UK and around the world.",
      intro: [
        "Edinburgh brands trade on Scotland's name. Food and drink is one of the country's best-known exports, and Scotch whisky alone was worth over £5 billion in exports in 2025, according to the Scotch Whisky Association, which is based in the city. Around that sit gin distillers, craft brewers, chocolatiers, smokehouses, knitwear and gifting brands, many of which first meet customers through tourism and then sell online.",
        "Selling from Scotland brings rules and logistics that English stores rarely face. Alcohol sold in Scotland is subject to minimum unit pricing of 65p per unit, and delivery charges cannot be used to reach that minimum. Scotland's deposit return scheme for drinks containers is due to launch alongside England and Northern Ireland's in October 2027. Customers in the Highlands and Islands are sensitive to delivery surcharges, which carriers often add.",
        "We work with Edinburgh brands remotely. Our Shopify developers build stores with age verification, international shipping for drinks where carriers allow it, and gifting features. Our marketing team runs paid media and Klaviyo flows that turn a summer visit to the city into repeat orders all year.",
      ],
      industries: [
        {
          title: "Whisky, gin and spirits",
          text: "Spirits brands need age gates, carrier-compliant shipping rules, limited-release handling and content that tells the distillery's story to collectors and gift buyers.",
        },
        {
          title: "Scottish food and larder",
          text: "Smoked salmon, shortbread, chocolate and preserves sell on provenance and gifting. Chilled delivery windows, hampers and corporate orders need their own Shopify logic.",
        },
        {
          title: "Knitwear, textiles and accessories",
          text: "Cashmere, tweed and tartan brands sell premium, story-led products to UK and overseas shoppers. Strong imagery and international pricing do much of the work.",
        },
        {
          title: "Tourism-led gifting",
          text: "Visitors discover a brand in a shop or at an event and reorder later. Capturing their email in person and following up with Klaviyo turns one visit into lasting revenue.",
        },
      ],
      local: [
        {
          title: "Festival-season peaks",
          text: "August brings the Edinburgh Festival Fringe and a surge of visitors. In-person sales and sign-ups spike, so plan post-visit email flows and stock for the autumn reorders that follow.",
        },
        {
          title: "Minimum unit pricing for alcohol",
          text: "Alcohol sold from Scotland must meet the 65p-per-unit minimum, and delivery charges cannot count towards it. Discounts, bundles and free-gift offers need checking in Shopify so they never break it.",
        },
        {
          title: "Deposit return scheme preparation",
          text: "Scotland's drinks deposit return scheme is due in October 2027. Producers will need to plan for labelling and pricing changes; under amendments made in 2025, online sellers are not required to offer takeback.",
        },
        {
          title: "Highlands and Islands delivery",
          text: "Many Scottish customers face surcharges for remote postcodes. Clear, fair shipping rates for the Highlands and Islands, set up by postcode in Shopify, win trust with customers other retailers penalise.",
        },
      ],
      faqs: [
        {
          question: "Can you build a Shopify store for a whisky or gin brand?",
          answer:
            "Yes. We build age verification into the journey, set shipping rules so alcohol only goes to destinations your carriers and licences allow, and configure limited releases with per-customer limits. We also make sure discounts and bundles respect Scotland's minimum unit pricing. Licensing and duty decisions stay with you and your advisers; we build the store to match them.",
        },
        {
          question: "How should we handle delivery to the Highlands and Islands?",
          answer:
            "We set postcode-based shipping rates in Shopify so remote customers see an accurate, fair price before checkout rather than a surprise. Where your carrier mix allows, we route those orders through services without heavy surcharges. Being upfront about delivery costs to remote Scottish postcodes is a simple way to earn trust and repeat orders.",
        },
        {
          question: "What does the deposit return scheme mean for our online shop?",
          answer:
            "Scotland's scheme is due to launch in October 2027, alongside the scheme for England and Northern Ireland, covering single-use drinks containers. Producers will need to register and plan for deposits and labelling. Amendments in 2025 removed mandatory takeback for online sales. We can update product pages and pricing in Shopify when the details are final.",
        },
        {
          question: "Do you have an office in Edinburgh?",
          answer:
            "No. We are a remote team working from Pakistan, and we work with Edinburgh brands through calls in the UK morning, shared project boards and recorded walkthroughs. We do not claim Scottish staff or a local office. We offer focused Shopify, CRO and marketing capacity for brands that sell Scotland to the world.",
        },
      ],
      sources: [
        { title: "Scotch Whisky Association: 2025 export figures", url: "https://scotch-whisky.org.uk/newsroom/2025-export-figures/" },
        { title: "mygov.scot: Minimum unit pricing for alcohol in Scotland", url: "https://www.mygov.scot/minimum-unit-pricing/" },
        { title: "legislation.gov.uk: Alcohol (Minimum Price per Unit) (Scotland) Amendment Order 2024", url: "https://www.legislation.gov.uk/ssi/2024/128/note/made" },
        { title: "gov.scot: Deposit return scheme", url: "https://www.gov.scot/policies/managing-waste/deposit-return-scheme/" },
        { title: "SEPA: Deposit return scheme", url: "https://www.sepa.gov.uk/regulations/waste/deposit-return-scheme" },
        { title: "gov.scot: Tackling unfair delivery charges", url: "https://www.gov.scot/news/tackling-unfair-delivery-charges/" },
        { title: "Edinburgh Festival Fringe", url: "https://www.edfringe.com/" },
      ],
    },
  ],
  sources: [
    { title: "GOV.UK: Register for VAT", url: "https://www.gov.uk/vat-registration" },
    { title: "GOV.UK: VAT rates", url: "https://www.gov.uk/vat-rates" },
    { title: "Shopify Help Center: Shopify Payments for the United Kingdom", url: "https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries/united-kingdom" },
    { title: "FCA: PS26/1 Regulation of Deferred Payment Credit", url: "https://www.fca.org.uk/publications/policy-statements/ps26-1-regulation-deferred-payment-credit" },
    { title: "FCA: Buy now pay later (consumer page)", url: "https://www.fca.org.uk/consumers/buy-now-pay-later" },
    { title: "GOV.UK: Check if you can register for the VAT Import One Stop Shop scheme", url: "https://www.gov.uk/guidance/check-if-you-can-register-for-the-vat-import-one-stop-shop-scheme" },
    { title: "European Commission: €3 customs duty on low-value parcels", url: "https://commission.europa.eu/news-and-media/news/ensuring-fairness-and-safety-eur3-customs-duty-low-value-parcels-2026-06-29_en" },
    { title: "GOV.UK: Sending parcels from a business in Great Britain to Northern Ireland", url: "https://www.gov.uk/guidance/how-to-send-parcels-from-a-business-in-great-britain-to-a-private-individual-or-a-business-in-northern-ireland" },
    { title: "Royal Mail: Windsor Framework", url: "https://www.royalmail.com/windsor-framework" },
    { title: "House of Lords Library: UK parcel delivery market", url: "https://lordslibrary.parliament.uk/?p=28968" },
    { title: "legislation.gov.uk: Consumer Contracts Regulations 2013", url: "https://www.legislation.gov.uk/uksi/2013/3134/note" },
    { title: "Which?: Consumer Contracts Regulations", url: "https://www.which.co.uk/consumer-rights/regulation/consumer-contracts-regulation" },
    { title: "CMS: DMCC Act consumer elements in force from 6 April 2025", url: "https://cms.law/en/gbr/legal-updates/the-dmcc-act-consumer-elements-come-into-force-from-6-april-2025" },
    { title: "Cooley: New UK consumer law regime comes into force", url: "https://www.cooley.com/news/insight/2025/2025-04-14-new-uk-consumer-law-regime-comes-into-force" },
    { title: "Clifford Chance: ICO updated guidance on new cookie consent exceptions", url: "https://www.cliffordchance.com/insights/resources/blogs/talking-tech/en/articles/2025/09/uk-ico-s-updated-guidance-for-new-exceptions-to-cookie-consents-.html" },
    { title: "Mishcon de Reya: Unlawful cookies, a new avenue for ICO fines", url: "https://www.mishcon.com/news/unlawful-cookies-a-new-avenue-for-the-ico-to-issue-fines" },
    { title: "ICO: Guide to PECR", url: "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/" },
  ],
};
