import type { Country } from "./types";

export const canada: Country = {
  slug: "canada",
  name: "Canada",
  code: "CA",
  currency: "CAD",
  metaTitle: "Shopify Agency Canada for DTC Brands | The Active Solutions",
  metaDescription:
    "Shopify development, CRO and growth marketing for Canadian DTC brands: GST/HST and QST setup, French storefronts, CASL-ready email and US cross-border selling.",
  headline: "A Shopify agency for *Canadian* DTC brands",
  lead: "Shopify developers, CRO and growth marketing for Canadian brands that sell coast to coast, into Quebec in French and across the border into the US.",
  intro: [
    "Canada is Shopify's home market: the platform was founded in Ottawa in 2006 and is still headquartered there. That also means Canadian shoppers know a good Shopify checkout when they see one, and they notice when a store treats them as an afterthought to the US. Prices in CAD, landed costs that don't surprise anyone at the door, and a storefront that works in French as well as English are the baseline, not extras.",
    "The hard parts of selling in Canada are rarely the theme. They are tax that changes by province, a country where shipping a parcel across it can cost more than the product margin, a Quebec market with its own language and privacy rules, and a US border that stopped being duty-free for low-value parcels in 2025. Each of those touches the store build, the checkout and the marketing stack.",
    "We work with Canadian DTC brands remotely, from Pakistan. We build and migrate Shopify and Shopify Plus stores, run conversion work on checkout and product pages, and run paid media and Klaviyo email and SMS programmes that respect Canada's anti-spam law. The city pages below cover what differs between Toronto, Vancouver, Montreal, Calgary and Ottawa; this page covers what applies everywhere.",
  ],
  essentials: [
    {
      title: "GST/HST, PST and QST by province",
      text: "Canada layers federal and provincial sales tax. HST provinces such as Ontario (13%) charge one harmonized rate; Alberta charges only the 5% GST; British Columbia adds a 7% PST and Quebec a 9.975% QST on top of GST. You must register for GST/HST once taxable sales pass $30,000 over four consecutive calendar quarters (or in a single quarter). BC and Quebec also have their own registration rules for out-of-province sellers. We configure Shopify's tax settings to match your registrations.",
    },
    {
      title: "Payments Canadians expect",
      text: "Shopify Payments in Canada takes Visa, Mastercard, American Express and Discover, plus Shop Pay, Apple Pay and Google Pay. Interac is Canada's debit network and dominant in store; online, Interac debit and e-Transfer usually come through a third-party provider, so check before promising it. For instalments, Shop Pay Installments (powered by Affirm) launched for Canadian merchants in 2025, and Afterpay, Klarna and Sezzle all operate in Canada.",
    },
    {
      title: "Shipping across a big, sparse country",
      text: "Canada Post reaches every address, including rural and northern routes couriers skip, but labour disruptions in 2024 and 2025 pushed many brands to keep Purolator, UPS, Canpar or a 3PL as a second carrier. Domestic shipping is expensive relative to the US, so free-shipping thresholds, regional rates and delivery estimates need modelling, not guessing. We build shipping profiles and checkout messaging around real carrier costs.",
    },
    {
      title: "Selling into the US",
      text: "The US suspended its US$800 de minimis duty-free exemption for all countries in August 2025, and it remains suspended; Congress has also legislated its repeal from July 2027. Canadian parcels to US customers now need formal clearance and duties, CUSMA-originating goods aside. Showing duties at checkout (DDP) through Shopify Markets or a cross-border partner avoids refused parcels and surprise fees.",
    },
    {
      title: "CASL, PIPEDA and Quebec Law 25",
      text: "Canada's Anti-Spam Legislation applies to marketing email and SMS: you need express or implied consent (implied lasts two years after a purchase), clear sender identification and an unsubscribe honoured within 10 business days, and the burden of proof is yours. PIPEDA governs personal data federally, while Quebec's Law 25 adds stricter consent rules, including tracking technologies that must be off until a visitor agrees.",
    },
    {
      title: "Bilingual labels and French in Quebec",
      text: "The federal Consumer Packaging and Labelling Act requires mandatory label information on prepackaged consumer products in English and French. Quebec's Charter of the French Language, strengthened by Bill 96 with new rules from June 2025, expects product information, commercial websites and advertising aimed at Quebec to be available in French, with French at least as prominent. Shopify Markets and translation apps make a proper French storefront practical.",
    },
  ],
  workingTogether:
    "Our team works in Pakistan time (UTC+5), and we're honest about what that means for Canada. Our fixed meeting slots, 10:00 to 12:00 and 14:00 to 16:00 Pakistan time on weekdays, fall overnight in Canada. In Toronto, Montreal and Ottawa the afternoon slot lands at roughly 4 to 6 a.m. in winter (5 to 7 a.m. in summer). Further west the morning slot is the usable one, in the late evening the day before: about 9 to 11 p.m. in Vancouver and 10 p.m. to midnight in Calgary in winter, an hour later in summer. In practice most of the work runs asynchronously. We build while you sleep, and written updates, staging links and recorded walkthroughs are waiting at the start of your day; you reply during your working hours and we pick it up the next morning our time. Live calls are booked into those slots for kick-offs, reviews and launches.",
  caseStudies: ["dermalyft", "glo", "heybuddy", "moodup"],
  faqs: [
    {
      question: "Do I need to charge GST/HST on my Shopify store?",
      answer:
        "Once your worldwide taxable sales pass $30,000 over four consecutive calendar quarters, or in a single quarter, you are no longer a small supplier and must register and charge GST/HST. The rate then depends on where the customer is, not where you are. Quebec QST and BC PST have their own rules for sellers outside those provinces. We set up Shopify's tax settings; your accountant confirms the registrations.",
    },
    {
      question: "Does my store need a French version?",
      answer:
        "If you actively sell to customers in Quebec, yes. The Charter of the French Language expects commercial websites, product information and advertising aimed at Quebec to be in French, and Bill 96 tightened enforcement from June 2025. Outside Quebec it is optional, but a French storefront also helps in Ottawa, New Brunswick and other bilingual regions. We build it with Shopify Markets so prices, URLs and content stay in sync.",
    },
    {
      question: "How do I ship to US customers now that de minimis is gone?",
      answer:
        "Low-value parcels from Canada no longer enter the US duty-free, so every shipment needs customs data and duties paid by someone. The cleanest option is to collect duties and taxes at checkout (delivered duty paid) so your US customer is never asked to pay on the doorstep. We set this up through Shopify Markets or a cross-border logistics partner, and update product HS codes and countries of origin.",
    },
    {
      question: "Can you set up Klaviyo email and SMS that complies with CASL?",
      answer:
        "Yes. We build signup forms with unticked consent boxes and clear wording, record where and when each subscriber consented, and keep purchase-based implied consent separate so it can expire after two years. Every message identifies your business and carries a working unsubscribe link. For Quebec subscribers we also review cookie and tracking consent under Law 25. Final legal sign-off stays with your counsel.",
    },
    {
      question: "Do you have an office in Canada?",
      answer:
        "No. We are a remote team based in Pakistan and work with brands worldwide, including in Canada, over Slack, email and video calls. Our meeting slots fall in the very early morning in Eastern Canada and the late evening on the West Coast, so we lean on detailed asynchronous updates that are ready when your day begins. Everything we build is delivered to your own Shopify account.",
    },
  ],
  cities: [
    {
      slug: "toronto",
      name: "Toronto",
      region: "Ontario",
      timeZone: "America/Toronto",
      metaTitle: "Shopify Agency in Toronto, Ontario | The Active Solutions",
      metaDescription:
        "Shopify agency in Toronto for DTC brands: Shopify Plus builds, CRO and paid media for a multicultural GTA market where same-day delivery is the bar to beat.",
      headline: "Shopify Agency in Toronto for *ambitious* DTC brands",
      lead: "Shopify developers and growth marketers for Toronto DTC brands competing in Canada's largest and most crowded online market, working remotely on your schedule.",
      intro: [
        "Toronto is Canada's largest city and the centre of its retail, banking and media industries, which makes it the most competitive place in the country to sell online. Many of Canada's best-known DTC brands are based in and around the city, and Toronto shoppers have usually bought from them. A Toronto brand isn't only competing with the shop down the street; it is competing with the polish of national retailers and US brands shipping into Ontario.",
        "It is also one of the most diverse cities anywhere. In the 2021 Census nearly half of Toronto residents (46.6%) were immigrants, and that shows up in what sells, which languages ad creative can use, and which holidays matter: Lunar New Year, Diwali and Eid can be as important to a calendar as Black Friday and Boxing Day.",
        "Delivery expectations are set by retailers that offer same-day and next-day service across the GTA. For a Shopify agency in Toronto, that means local delivery and pickup options, accurate delivery dates at checkout and a fast mobile experience for commuters shopping on the go. We work with Toronto brands remotely on Shopify and Shopify Plus builds, checkout optimization and paid media that can stand up in a crowded auction.",
      ],
      industries: [
        {
          title: "Fashion and apparel",
          text: "Toronto's fashion brands sell to a style-conscious, varied audience. Size guides, fit reviews, fast exchanges and strong lookbook-style collection pages do more for conversion here than discounting.",
        },
        {
          title: "Beauty and personal care",
          text: "A multicultural customer base means shade ranges, hair types and ingredient questions vary widely. Product pages need rich filtering, honest imagery across skin tones and bundles that make a first order easy.",
        },
        {
          title: "Food, coffee and specialty grocery",
          text: "Toronto's food scene produces many DTC sauces, coffees and snacks. Subscriptions, local delivery zones and gift bundles around holidays turn one-off purchases into repeat orders.",
        },
        {
          title: "Home and furniture",
          text: "Condo living shapes demand for compact, design-led home goods. Dimension details, room-scale imagery and clear freight delivery options cut returns on bulky items.",
        },
      ],
      local: [
        {
          title: "Same-day and local delivery across the GTA",
          text: "Shopify's local delivery and pickup settings let you draw delivery zones by postal code and promise same-day or next-day delivery inside the GTA while shipping normally beyond it. We set the zones, cut-off times and checkout messaging.",
        },
        {
          title: "Paid media costs in a crowded market",
          text: "Toronto is where national brands concentrate their Meta and Google spend, so auctions are expensive. Creative testing, tight audience exclusions and strong retention flows in Klaviyo matter more than raising budgets.",
        },
        {
          title: "Multilingual creative and cultural calendars",
          text: "Ad creative and email campaigns in Cantonese, Mandarin, Punjabi, Tagalog or other languages spoken across the GTA can outperform English-only campaigns for the right products. Plan campaigns around Lunar New Year, Diwali and Eid, not only Black Friday.",
        },
        {
          title: "Ontario's 13% HST in your pricing",
          text: "Ontario customers pay 13% HST at checkout, the highest combined rate many Toronto shoppers see. Decide whether prices display tax-inclusive or not, and test free-shipping thresholds with HST in mind.",
        },
      ],
      faqs: [
        {
          question: "Do you meet Toronto clients in person?",
          answer:
            "No. We are a remote team based in Pakistan and work with Toronto brands over video calls, Slack and email. Our meeting slots fall early in the Toronto morning, roughly 4 to 6 a.m. in winter and 5 to 7 a.m. in summer, so most updates are asynchronous: written summaries, staging links and recorded walkthroughs waiting for you when your day begins.",
        },
        {
          question: "Can you set up same-day delivery for GTA customers?",
          answer:
            "Yes. Shopify's local delivery settings let us define delivery zones by postal code or radius around your warehouse, set minimum order values and cut-off times, and show customers which delivery options apply at checkout. Customers outside the GTA see your standard shipping rates. If you use a courier or delivery app, we connect it and make sure order tags and notifications line up.",
        },
        {
          question: "How do Toronto DTC brands compete with bigger retailers?",
          answer:
            "Rarely on price or delivery speed alone. The brands that do well in Toronto win on a clear story, better product pages, reviews and user content, and a retention programme that brings customers back without discounting. We focus on conversion rate optimization and Klaviyo email and SMS, so every dollar spent on Meta, Google or TikTok in an expensive market works harder.",
        },
        {
          question: "Should a Toronto store show prices with HST included?",
          answer:
            "Canadian shoppers are used to seeing tax added at checkout, so tax-exclusive pricing is normal. Some brands test tax-inclusive pricing to avoid the jump at checkout, especially for gifts. Because HST rates differ by province, inclusive pricing needs careful setup in Shopify Markets. We can configure either approach and A/B test which converts better for your catalogue.",
        },
      ],
      sources: [
        {
          title: "City of Toronto: 2021 Census backgrounder, immigration and ethnocultural diversity",
          url: "https://www.toronto.ca/wp-content/uploads/2022/11/8f69-2021-Census-Backgrounder-Immigration-Ethnoracial-Mobility-Migration-Religion-FINAL.pdf",
        },
        {
          title: "Statistics Canada: 2021 Census population and dwelling counts",
          url: "https://www150.statcan.gc.ca/n1/daily-quotidien/221026/t001a-eng.htm",
        },
        {
          title: "CRA: GST/HST calculator and rates",
          url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/calculator.html",
        },
      ],
    },
    {
      slug: "vancouver",
      name: "Vancouver",
      region: "British Columbia",
      timeZone: "America/Vancouver",
      metaTitle: "Shopify Agency in Vancouver, BC | The Active Solutions",
      metaDescription:
        "Shopify agency for Vancouver DTC brands in activewear, outdoor and wellness: Shopify Plus builds, BC PST setup, CRO and paid media, delivered remotely.",
      headline: "Shopify Agency in Vancouver for *active* lifestyle brands",
      lead: "Shopify development, CRO and growth marketing for Vancouver brands in activewear, outdoor gear and wellness, selling across Canada and out to the world.",
      intro: [
        "Vancouver has a habit of producing performance brands. Lululemon was founded here in 1998 and Arc'teryx designs its technical outerwear in North Vancouver. Their success set the bar for what an active lifestyle brand looks like online: technical product detail, strong photography, community and a customer who will pay for quality if the store explains why.",
        "The city is also Canada's gateway to Asia-Pacific. The Port of Vancouver is the country's largest port by volume, which is why many brands that manufacture in Asia land inventory here and run fulfilment from the Lower Mainland. Shipping east across the Rockies to Ontario and Quebec costs more and takes longer than shipping within BC, so delivery promises need to vary by region.",
        "Health and wellness is the other strong current: supplements, natural skincare, plant-based food and outdoor experiences sold to an audience that reads labels and ingredient lists. Vancouver brands working with us get Shopify and Shopify Plus builds, subscription setups, and paid media and Klaviyo retention aimed at customers who buy for performance and values, not just price. We work with them remotely, with updates ready by morning.",
      ],
      industries: [
        {
          title: "Activewear and athleisure",
          text: "Customers compare fabric, fit and function in detail. Size advice, fabric tech explainers, fit reviews and easy exchanges carry more weight than discount codes.",
        },
        {
          title: "Outdoor gear and apparel",
          text: "Ski, hike, bike and paddle gear is technical and seasonal. Comparison tables, spec filters and seasonal merchandising timed to the North Shore and Whistler seasons help shoppers decide.",
        },
        {
          title: "Wellness, supplements and natural skincare",
          text: "An ingredient-literate audience expects transparency. Clear ingredient lists, sourcing stories, subscription options and compliant claims build the trust that drives repeat orders.",
        },
        {
          title: "Brands importing through the Pacific",
          text: "Many Vancouver brands manufacture in Asia and receive goods through the port. Inventory, pre-order and back-in-stock flows in Shopify matter when shipments arrive in large, irregular batches.",
        },
      ],
      local: [
        {
          title: "BC PST on top of GST",
          text: "BC customers pay 5% GST plus 7% PST. Sellers based outside BC who deliver goods into the province and pass $10,000 in BC sales must register for PST too, so Vancouver brands often compete with out-of-province stores on equal tax footing.",
        },
        {
          title: "Shipping east costs more",
          text: "Delivery to Ontario, Quebec and the Atlantic provinces takes longer and costs more than within BC. Regional shipping rates, delivery date estimates at checkout and a second fulfilment location are worth modelling.",
        },
        {
          title: "Rainy-season and ski-season peaks",
          text: "Wet-weather gear sells through the long rainy season, and ski and snowboard products peak with the winter mountain season. Plan creative and inventory around Vancouver's weather rather than a generic national calendar.",
        },
        {
          title: "A multilingual Pacific audience",
          text: "Metro Vancouver has a large Chinese-speaking community, and many brands sell into Asian markets too. Chinese-language creative and international storefronts through Shopify Markets can open demand both locally and abroad.",
        },
      ],
      faqs: [
        {
          question: "When can Vancouver teams meet with you?",
          answer:
            "Our weekday slots run 10:00 to 12:00 and 14:00 to 16:00 Pakistan time. In Vancouver that is about 9 to 11 p.m. the previous evening in winter and 10 p.m. to midnight in summer, with the second slot in the middle of your night. Most Vancouver work therefore runs asynchronously, with written updates and recordings ready when you start your day.",
        },
        {
          question: "Can you build a Shopify store for a technical outdoor brand?",
          answer:
            "Yes. Technical gear needs structured product data: specs as metafields, filterable collections by activity and conditions, comparison tables, size and fit guidance, and imagery that shows the product in use. We build these on Shopify or Shopify Plus with themes your team can update, and connect reviews and Q&A so customers can ask how gear performs in coastal rain or alpine cold.",
        },
        {
          question: "Do I charge PST on orders shipped outside BC?",
          answer:
            "BC PST applies to taxable goods delivered to customers in British Columbia, so orders shipped to other provinces normally carry their own GST, HST or QST instead. Shopify can apply provincial rules automatically once your registrations are entered. Confirm product-level exemptions, such as some children's clothing, with your accountant. We configure the tax settings and product overrides to match their advice.",
        },
        {
          question: "How should a Vancouver wellness brand set up subscriptions?",
          answer:
            "Start with a subscription app that works natively with Shopify checkout, then make the offer clear on product pages: frequency options, savings and how to pause or cancel. We build Klaviyo flows for welcome, replenishment reminders and win-back, keeping marketing consent separate under CASL. Then we run A/B tests on subscribe-and-save messaging so the programme grows without unnecessary discounting.",
        },
      ],
      sources: [
        {
          title: "South China Morning Post: Lululemon to Arc'teryx, Vancouver brands built on the city's active spirit",
          url: "https://m.scmp.com/lifestyle/fashion-beauty/article/3022544/lululemon-arcteryx-five-vancouver-brands-built-citys",
        },
        {
          title: "Transport Canada: Transportation in Canada 2020, Western Canada",
          url: "https://tc.canada.ca/en/corporate-services/reports/western-canada",
        },
        {
          title: "BC Government: PST registration for out-of-province sellers (2021)",
          url: "https://news.gov.bc.ca/releases/2021FIN0019-000407",
        },
        {
          title: "Miller Thomson: Expansion to BC PST registration rules, April 1, 2021",
          url: "https://www.millerthomson.com/en/insights/corporate-tax/expansion-to-bc-pst-registration-and-collection-rules-effective-april-1-2021/",
        },
        {
          title: "CensusMapper: Immigrant share by metro area, 2021 Census",
          url: "https://censusmapper.ca/maps/3606",
        },
      ],
    },
    {
      slug: "montreal",
      name: "Montreal",
      region: "Quebec",
      timeZone: "America/Toronto",
      metaTitle: "Shopify Agency in Montreal, Quebec | The Active Solutions",
      metaDescription:
        "Shopify agency for Montreal DTC brands: French-first storefronts, Bill 96 and Law 25 compliance, QST setup, Shopify Plus builds, CRO and fashion ecommerce.",
      headline: "Shopify Agency in Montreal for *French-first* commerce",
      lead: "Bilingual Shopify stores, CRO and growth marketing for Montreal brands, built French-first for Quebec shoppers and ready for the rest of Canada.",
      intro: [
        "Montreal is the one major Canadian market where French comes first. Most shoppers browse, search and buy in French, and Quebec law expects them to be able to. Since Bill 96's rules took effect in June 2025, French must be markedly predominant on commercial signage, and the Charter's French requirements cover commercial websites, product information and advertising. A store that tacks a machine translation onto an English site is both a legal risk and a conversion problem.",
        "Quebec also has Canada's strictest privacy regime. Law 25 requires consent for tracking technologies, privacy by default and a named person responsible for personal information. For a Shopify store that means a real consent banner, analytics and ad pixels that respect it, and Klaviyo forms that collect consent properly in both languages.",
        "Fashion is the city's commercial heritage. Montreal ranks as North America's third-largest clothing manufacturing centre after New York and Los Angeles, and the Chabanel district is still home to hundreds of apparel companies. That makes it a natural base for DTC fashion and accessories brands. We work with Montreal brands remotely, as Shopify developers and growth marketers who build French-first stores rather than translating as an afterthought.",
      ],
      industries: [
        {
          title: "Fashion and apparel",
          text: "Montreal's apparel makers are moving from wholesale to direct sales. They need bilingual collection pages, size and fit guidance in French, and clean wholesale and B2B options on Shopify Plus.",
        },
        {
          title: "Specialty food and drink",
          text: "Quebec's food culture produces strong DTC products, from maple to coffee to prepared foods. French-first labelling, local delivery and gift bundles around the holidays drive repeat orders.",
        },
        {
          title: "Beauty and cosmetics",
          text: "Cosmetics must carry bilingual labels federally, and Quebec shoppers expect French product information online too. Ingredient and usage detail in both languages builds trust and reduces support questions.",
        },
        {
          title: "Design-led home goods",
          text: "Montreal's design community supports furniture, ceramics and home brands. Strong editorial content in French, room-scale imagery and clear delivery terms help these higher-value orders convert.",
        },
      ],
      local: [
        {
          title: "French-first storefront, not just a translation",
          text: "Build with Shopify Markets so the French version has its own URLs, metadata and navigation, translate product data and policies properly, and default Quebec visitors to French. Search ads and Meta creative need French versions too.",
        },
        {
          title: "Law 25 consent for pixels and analytics",
          text: "Under Law 25, tracking technologies that identify or profile visitors should be off until consent. We configure Shopify's customer privacy settings or a consent app so Meta, Google and TikTok pixels respect visitors' choices.",
        },
        {
          title: "QST registration and invoicing",
          text: "Quebec customers pay 5% GST plus 9.975% QST, administered by Revenu Québec rather than the CRA. Your Shopify tax settings, invoices and order emails need both registration numbers and a French version.",
        },
        {
          title: "Moving Day and the holiday season",
          text: "Quebec's traditional July 1 moving day concentrates home and furniture demand into early summer, while the holiday season peaks as everywhere. Plan delivery capacity and promotions around both.",
        },
      ],
      faqs: [
        {
          question: "Does my Montreal store need to be in French?",
          answer:
            "If you sell to Quebec consumers, French is expected on your commercial website, product information and advertising, and Bill 96 tightened the rules from June 2025. You can still offer English, but French should be at least as available and prominent. We build French-first Shopify stores with Shopify Markets so both languages stay in sync. Confirm the details with Quebec counsel.",
        },
        {
          question: "What does Law 25 change for my Shopify store?",
          answer:
            "Law 25 requires a privacy policy in clear terms, a named person responsible for personal information and consent before tracking technologies that identify or profile visitors run. Practically, that means a consent banner, pixels and analytics that respect refusals, and signup forms that record consent. We set these up in Shopify and Klaviyo so marketing data still flows from visitors who accept.",
        },
        {
          question: "Can you write French content, or only build the store?",
          answer:
            "We build the store, structure and translation workflow, and set up French templates, navigation, SEO metadata and Klaviyo flows. For marketing copy we recommend native Quebec French writing or review rather than relying on automated translation, because tone and vocabulary differ from European French. We work alongside your writer or translator and make sure every string in the theme can be translated.",
        },
        {
          question: "How do meetings work from Montreal?",
          answer:
            "Montreal is on Eastern time, so our weekday meeting slots fall early in the morning, roughly 4 to 6 a.m. in winter and 5 to 7 a.m. in summer. Most work runs asynchronously: written updates, staging links and recorded walkthroughs ready when you start your day. We work remotely from Pakistan and have no Montreal office.",
        },
      ],
      sources: [
        {
          title: "DLA Piper: Quebec's language laws changed this week (June 2025)",
          url: "https://www.dlapiper.com/en/insights/publications/2025/06/quebecs-language-laws-changed-this-week",
        },
        {
          title: "Mondaq: The Charter of the French Language, new obligations as of June 2025",
          url: "https://www.mondaq.com/canada/industry-updates-analysis/1632010/the-charter-of-the-french-language-new-obligations-as-of-june-2025",
        },
        {
          title: "McCarthy Tétrault: Quebec's Law 25 and cookies",
          url: "https://www.mccarthy.ca/en/insights/blogs/techlex/quebecs-law-25-and-cookies-not-so-cookie-cutter",
        },
        {
          title: "Montréal International: Fashion industry profile 2019",
          url: "https://www.montrealinternational.com/app/uploads/2019/04/industry_profile_fashion_2019.pdf",
        },
        {
          title: "Chambre de commerce du Montréal métropolitain: Fashion, a booming sector in Montréal",
          url: "https://www.ccmm.ca/en/news/blog_fashion_a_booming_sector_in_montreal/",
        },
        {
          title: "Revenu Québec: QST registration for suppliers outside Québec",
          url: "https://www.revenuquebec.ca/en/businesses/consumption-taxes/gsthst-and-qst/special-cases-gsthst-and-qst/suppliers-outside-quebec/qst-registration-for-suppliers-outside-quebec/registration-under-the-general-system-suppliers-outside-quebec-who-store-or-deliver-property-in-quebec/",
        },
      ],
    },
    {
      slug: "calgary",
      name: "Calgary",
      region: "Alberta",
      timeZone: "America/Edmonton",
      metaTitle: "Shopify Agency in Calgary, Alberta | The Active Solutions",
      metaDescription:
        "Shopify agency for Calgary DTC brands: Shopify Plus builds, CRO and paid media for outdoor, western and lifestyle brands selling from GST-only Alberta.",
      headline: "Shopify Agency in Calgary for *growing* Alberta brands",
      lead: "Shopify developers and growth marketers for Calgary brands in outdoor, western and lifestyle categories, selling from Alberta to customers across Canada.",
      intro: [
        "Calgary's economy has long run on energy, and oil and gas still account for a large share of the city's output. That cycle shapes local spending: when commodity prices move, so does consumer confidence. Alongside it, the city has spent the last decade building a tech and startup community, and a growing number of Calgary founders are launching consumer brands rather than service businesses.",
        "Alberta is also the only province with no provincial sales tax. Customers in Alberta pay just the 5% federal GST, which makes the final price at checkout lower than in Ontario, BC or Quebec. For a Calgary brand selling nationally, that gap matters: Alberta customers see one price, while customers in HST and PST provinces see a bigger total, so tax display and free-shipping thresholds should be tested by province.",
        "Then there is the setting. Banff and the Rockies are about an hour and a half away, so outdoor, ski and camping brands have an engaged home audience, while the Calgary Stampede each July drives a western wear and events season of its own. We work with Calgary brands remotely, building on Shopify and Shopify Plus and running CRO and paid media tuned to these seasonal swings.",
      ],
      industries: [
        {
          title: "Outdoor, ski and camping",
          text: "With the Rockies close by, outdoor brands sell to customers who use their gear hard. Specs, durability stories, warranty information and seasonal merchandising timed to ski and summer seasons drive conversion.",
        },
        {
          title: "Western wear and Stampede season",
          text: "Western boots, hats and apparel peak ahead of the Stampede each July. Pre-orders, size guidance and fast shipping cut-offs protect a short, high-stakes selling window.",
        },
        {
          title: "Workwear and rugged goods",
          text: "Energy and trades workers buy durable boots, workwear and tools. Clear safety ratings, fit details and business accounts or B2B pricing on Shopify Plus suit this audience.",
        },
        {
          title: "Home, pets and family products",
          text: "Calgary's suburbs house many young families. Bundles, subscriptions for consumables and a smooth mobile checkout matter for busy parents buying pet, home and kids' products.",
        },
      ],
      local: [
        {
          title: "GST-only pricing and messaging",
          text: "With only 5% GST in Alberta, Calgary customers see a lower checkout total than most Canadians. If you sell nationally, test how tax is displayed by province so out-of-province customers aren't surprised.",
        },
        {
          title: "Winter weather and delivery times",
          text: "Cold snaps and snowstorms slow deliveries and affect what ships well. Show delivery estimates that allow for winter conditions, and protect temperature-sensitive products from freezing in transit.",
        },
        {
          title: "Stampede and seasonal peaks",
          text: "The Stampede in July and the ski season from late fall create two strong peaks for Calgary brands. Inventory, ad budgets and email calendars should follow these, not only Black Friday.",
        },
        {
          title: "Shipping from the Prairies",
          text: "Calgary sits between the West Coast and central Canada, so ground delivery to Vancouver and to Toronto both take time. Regional rates and clear delivery dates at checkout reduce support tickets.",
        },
      ],
      faqs: [
        {
          question: "Do Calgary customers pay less tax on my store?",
          answer:
            "Yes. Alberta has no provincial sales tax, so customers there pay only the 5% GST, compared with 13% HST in Ontario or GST plus PST or QST elsewhere. The rate depends on the delivery address, not where your business is. Shopify applies these automatically once your registrations are set up, and we can test tax-inclusive or tax-exclusive pricing by market.",
        },
        {
          question: "Can you help us prepare for Stampede season?",
          answer:
            "Yes. For western wear and event products we plan a few months ahead: landing pages and collections for Stampede, pre-orders for stock still in transit, size guidance to reduce exchanges, and clear shipping cut-offs. We also schedule Meta and Google campaigns and Klaviyo emails so spend peaks in the weeks before the event rather than after it.",
        },
        {
          question: "When are you available for calls from Calgary?",
          answer:
            "Our weekday slots are 10:00 to 12:00 and 14:00 to 16:00 Pakistan time. In Calgary that is about 10 p.m. to midnight the previous evening in winter, and 11 p.m. to 1 a.m. in summer; the second slot falls overnight. Most work happens asynchronously, with updates ready when your day starts and replies picked up the next morning our time.",
        },
        {
          question: "Do you work with B2B and wholesale for Alberta brands?",
          answer:
            "Yes. Many Calgary brands sell to retailers, contractors or companies as well as consumers. On Shopify Plus we can set up B2B with company accounts, price lists, payment terms and quantity rules alongside your DTC store, or a separate wholesale storefront on standard Shopify. The aim is one inventory and one admin, without separate systems to reconcile.",
        },
      ],
      sources: [
        {
          title: "Borden Ladner Gervais: Calgary is open for business (2025)",
          url: "https://www.blg.com/en/insights/2025/09/calgary-is-open-for-business",
        },
        {
          title: "Government of Alberta: Alberta economic quick facts",
          url: "https://open.alberta.ca/dataset/e61b7101-bcbe-46c6-84a9-377c4e5956e9/resource/bdb7841a-608a-46f8-b631-69863a04bd0b/download/sp-eh-albertaeconomicquickfacts.pdf",
        },
        {
          title: "CBRE: Calgary's tech momentum fortifies Alberta's economy",
          url: "https://www.cbre.com/insights/articles/calgarys-tech-momentum-fortifies-albertas-economy",
        },
        {
          title: "Calgary Stampede",
          url: "https://www.calgarystampede.com/",
        },
        {
          title: "CRA: Charge and collect the tax, which rate to charge",
          url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-gst/charge-gst-hst.html",
        },
      ],
    },
    {
      slug: "ottawa",
      name: "Ottawa",
      region: "Ontario",
      timeZone: "America/Toronto",
      metaTitle: "Shopify Agency in Ottawa, Ontario | The Active Solutions",
      metaDescription:
        "Shopify agency for Ottawa DTC brands in Shopify's hometown: bilingual storefronts for the capital region, Shopify Plus builds, CRO and growth marketing.",
      headline: "Shopify Agency in Ottawa, *Shopify's* hometown",
      lead: "Shopify development, CRO and marketing for Ottawa brands that sell across a bilingual capital region and beyond, from a remote team that works while you sleep.",
      intro: [
        "Ottawa is where Shopify started. The company launched in Ottawa in 2006 and is still headquartered there, and the city's tech community has been shaped by it. Ottawa founders tend to know the platform well, which means a Shopify partner here is judged on substance: clean builds, sensible apps, and growth work you can measure. To be clear, we are an independent agency with no connection to Shopify beyond building on it.",
        "The capital region straddles two provinces. Ottawa is in Ontario, but Gatineau sits across the river in Quebec, and around 37% of people in the Ottawa-Gatineau area speak both English and French. An Ottawa brand's local market therefore includes Quebec customers, with Quebec's tax, French-language and privacy rules, a short drive from the store.",
        "The federal government is the region's largest employer, alongside a strong tech sector. That gives Ottawa a stable, educated customer base with steady spending and high expectations for accessibility and clear information. We work with Ottawa brands remotely as Shopify developers and growth marketers, on Shopify and Shopify Plus builds, conversion work and paid and retention marketing.",
      ],
      industries: [
        {
          title: "Tech-enabled consumer brands",
          text: "Ottawa's tech talent produces founders who launch hardware, gadgets and app-connected products. These need detailed specs, comparison content, setup guides and support flows on the store.",
        },
        {
          title: "Specialty food and local makers",
          text: "From coffee roasters to bakeries and makers, local brands grow from markets into DTC. Local delivery, pickup and subscriptions on Shopify help them scale beyond the ByWard Market crowd.",
        },
        {
          title: "Winter sports and outdoor living",
          text: "Long winters and the Rideau Canal skateway shape demand for cold-weather apparel and gear. Seasonal merchandising and warmth ratings help customers choose with confidence.",
        },
        {
          title: "Books, education and gifts",
          text: "A highly educated, government-heavy population supports education, books and thoughtful gift brands. Gift guides, bundles and corporate gifting options suit the market.",
        },
      ],
      local: [
        {
          title: "Selling across the Ontario-Quebec border",
          text: "Orders to Gatineau carry GST plus QST, not Ontario HST, and Quebec's French-language and Law 25 rules apply to marketing aimed there. Shopify Markets can serve a French storefront to Quebec visitors without a separate store.",
        },
        {
          title: "Accessibility expectations",
          text: "Ottawa's public-sector influence brings high expectations for accessible websites, and Ontario's accessibility law covers many organizations. We build themes to WCAG standards, with keyboard navigation, contrast and alt text in place.",
        },
        {
          title: "Bilingual email and SMS",
          text: "Ask subscribers for a language preference at signup and send campaigns in English or French accordingly. Klaviyo segments by language keep CASL consent records and preferences in one place.",
        },
        {
          title: "Winterlude and long winters",
          text: "Ottawa's winter festival season in February and long cold months shift demand to winter gear, comfort products and indoor gifts. Plan promotions around winter rather than a short holiday spike.",
        },
      ],
      faqs: [
        {
          question: "Are you connected to Shopify in Ottawa?",
          answer:
            "No. Shopify is headquartered in Ottawa, but we are an independent agency that builds stores on Shopify and Shopify Plus for brands worldwide. We work remotely from Pakistan and have no Ottawa office or staff. What we offer Ottawa brands is hands-on Shopify development, conversion rate optimization and ecommerce marketing, with updates delivered asynchronously.",
        },
        {
          question: "Should an Ottawa store be bilingual?",
          answer:
            "Usually, yes. Your local market includes Gatineau and other Quebec communities, where French is expected for commercial websites and product information, and many Ottawa shoppers prefer French too. We set up a French storefront with Shopify Markets, a language selector, French SEO metadata and bilingual Klaviyo flows, so you serve both audiences from one store and one inventory.",
        },
        {
          question: "How do you charge tax on orders to Gatineau?",
          answer:
            "Sales tax follows the delivery address. Orders delivered in Gatineau carry 5% GST plus 9.975% QST, while Ottawa orders carry 13% Ontario HST. Shopify applies the right rate once your registrations are entered. Whether you also need to register with Revenu Québec depends on your Quebec sales, so confirm that with your accountant before we configure it.",
        },
        {
          question: "When can Ottawa teams meet with you?",
          answer:
            "Ottawa is on Eastern time, so our weekday slots of 10:00 to 12:00 and 14:00 to 16:00 Pakistan time fall at roughly 4 to 6 a.m. in winter and 5 to 7 a.m. in summer. Most collaboration happens asynchronously: written updates, staging links and recorded walkthroughs ready at the start of your day, with your feedback picked up overnight.",
        },
      ],
      sources: [
        {
          title: "Wikipedia: Shopify",
          url: "https://en.wikipedia.org/wiki/Shopify",
        },
        {
          title: "Bulldog Ottawa: Shopify changed how Ottawa works",
          url: "https://bulldogottawa.com/?p=1026019",
        },
        {
          title: "Wikipedia: National Capital Region (Canada), languages",
          url: "https://wikipedia.com/wiki/Ottawa-Hull",
        },
        {
          title: "ICRML: Capital languages, English and French in Ottawa and Gatineau",
          url: "https://icrml.ca/en/research-and-publications/references/item/80477-capital-languages-differences-in-knowledge-and-use-of-english-and-french-in-ottawa-and-gatineau",
        },
        {
          title: "Revenu Québec: QST registration for suppliers outside Québec",
          url: "https://www.revenuquebec.ca/en/questionnaire-regarding-the-obligation-to-register-for-the-qst-using-the-registration-service-reserved-for-suppliers-outside-quebec-5/",
        },
      ],
    },
  ],
  sources: [
    { title: "CRA: When to register for and start charging the GST/HST", url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/when-register-charge" },
    { title: "CRA: GST/HST calculator and rates", url: "https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/gst-hst-businesses/charge-collect-which-rate/calculator.html" },
    { title: "TaxTips.ca: Sales tax rates 2025", url: "https://www.taxtips.ca/salestaxes/sales-tax-rates-2025.htm" },
    { title: "Revenu Québec: QST registration for suppliers outside Québec", url: "https://www.revenuquebec.ca/en/businesses/consumption-taxes/gsthst-and-qst/special-cases-gsthst-and-qst/suppliers-outside-quebec/qst-registration-for-suppliers-outside-quebec/registration-under-the-specified-system-suppliers-outside-quebec-who-are-registered-under-the-general-gsthst-system/" },
    { title: "Miller Thomson: BC PST registration for out-of-province sellers", url: "https://www.millerthomson.com/en/insights/corporate-tax/expansion-to-bc-pst-registration-and-collection-rules-effective-april-1-2021/" },
    { title: "Shopify Help Center: Shopify Payments for Canada", url: "https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries/canada" },
    { title: "Shopify Help Center: Accepting payments with Shopify Payments in Canada", url: "https://help.shopify.com/en/manual/payments/shopify-payments/supported-countries/canada/accepting-payments" },
    { title: "Business Wire: Affirm and Shopify accelerate global expansion of Shop Pay Installments", url: "https://www.businesswire.com/news/home/20250409748875/en" },
    { title: "Fintech.ca: Shopify brings Shop Pay Installments to Canada with Affirm", url: "https://www.fintech.ca/2025/04/09/shopify-brings-shop-pay-installments-to-canada-in-global-expansion-with-affirm/" },
    { title: "Newswire: Sezzle exceeds one thousand Canadian retail partners", url: "https://newswire.ca/news-releases/sezzle-exceeds-one-thousand-canadian-retail-partners-827245308.html" },
    { title: "PR Newswire: Afterpay expands into Canada", url: "https://www.prnewswire.co.uk/news-releases/afterpay-expands-into-canada-with-american-eagle-huda-beauty-roots-native-shoes-among-many-others-821614314" },
    { title: "Shopify Changelog: Accept Interac chip and PIN at Canadian retail stores", url: "https://changelog.shopify.com/posts/accept-interac-chip-pin-at-canadian-retail-stores" },
    { title: "Global News: Purolator, UPS pause shipments during Canada Post strike", url: "https://globalnews.ca/news/10904994/purolator-ups-pause-shipments-canada-post-strike" },
    { title: "Easyship: Canada Post strike 2025, dates and alternatives", url: "https://www.easyship.com/blog/canada-post-strike-dates-durations-alternatives" },
    { title: "EDC: De minimis rule suspended, impact on Canadian exporters", url: "https://www.edc.ca/en/article/de-minimis-rule-suspended-impact-on-canadian-exporters.html" },
    { title: "Canada Post: Shipping to the US duty updates FAQ", url: "https://www.canadapost-postescanada.ca/cpc/en/support/campaign/shipping-to-us-duty-updates/faq.page" },
    { title: "Alvarez & Marsal: USCIT upholds IEEPA suspension of de minimis treatment (Aug 2026)", url: "https://www.alvarezandmarsal.com/thought-leadership/uscit-upholds-ieepa-suspension-of-de-minimis-treatment-in-axle-of-dearborn" },
    { title: "Axios: Court keeps cheap imports subject to tariffs (Aug 2026)", url: "https://axios.com/2026/08/13/trump-de-minimis-tariff-court" },
    { title: "CRTC: CASL guidance on implied consent", url: "https://crtc.gc.ca/eng/com500/guide.htm" },
    { title: "Government of Canada: Getting consent to send email (CASL)", url: "https://www.fightspam.gc.ca/eic/site/030.nsf/eng/00008.html" },
    { title: "Office of the Privacy Commissioner of Canada: PIPEDA in brief", url: "https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/pipeda_brief/" },
    { title: "McCarthy Tétrault: Quebec's Law 25 and cookies", url: "https://www.mccarthy.ca/en/insights/blogs/techlex/quebecs-law-25-and-cookies-not-so-cookie-cutter" },
    { title: "Justice Laws: Consumer Packaging and Labelling Regulations", url: "https://laws-lois.justice.gc.ca/eng/regulations/c.r.c.,_c._417/page-1.html" },
    { title: "DLA Piper: Quebec's language laws changed this week (June 2025)", url: "https://www.dlapiper.com/en/insights/publications/2025/06/quebecs-language-laws-changed-this-week" },
    { title: "Wikipedia: Shopify", url: "https://en.wikipedia.org/wiki/Shopify" },
  ],
};
