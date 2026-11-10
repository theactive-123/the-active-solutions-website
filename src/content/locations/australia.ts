import type { Country } from "./types";

export const australia: Country = {
  slug: "australia",
  name: "Australia",
  code: "AU",
  currency: "AUD",
  metaTitle: "Shopify Agency in Australia for DTC | The Active Solutions",
  metaDescription:
    "Shopify developers, Shopify Plus builds, CRO and Klaviyo retention for Australian DTC brands, set up for GST, Afterpay, Australia Post and consumer law.",
  headline: "A Shopify agency for *Australian* DTC brands",
  lead: "Shopify development, conversion work and retention marketing for Australian brands, built around GST-inclusive pricing, BNPL-savvy shoppers and a continent-sized delivery map.",
  intro: [
    "Australians spent $82.6 billion online in 2025, up 14% on the year before, and 9.8 million households bought something online, according to Australia Post's 2026 eCommerce Report. Marketplaces took close to a quarter of that spend. For DTC brands, that means the competition is no longer only other boutiques: it's global marketplaces and the big national retailers, all one tab away.",
    "Selling well here has its own rules. Prices are shown GST-inclusive, buy now pay later is expected rather than novel (Afterpay and Zip both started in Sydney), delivery promises have to survive a 3,000-kilometre gap between Perth and the east coast, and the Australian Consumer Law gives shoppers refund rights you can't write away in your returns policy. A store designed for the US and simply switched to AUD tends to trip over all four.",
    "We're a remote team of Shopify developers, CRO specialists and retention marketers working with brands worldwide from Pakistan. We don't have an office in Australia, and we won't pretend otherwise. What we bring is focused Shopify and Shopify Plus delivery, a testing habit, and Klaviyo email and SMS programs that respect the Spam Act, with meeting times that land in the Australian afternoon.",
  ],
  essentials: [
    {
      title: "Payments and buy now pay later",
      text: "Offer cards, Apple Pay and Google Pay through Shopify Payments, plus PayPal and the BNPL options Australian shoppers look for: Afterpay (installed as a separate app), Zip, Klarna and Shop Pay Installments, which in Australia covers orders from $50 to $30,000 AUD on debit cards. Since 10 June 2025 BNPL contracts sit under the National Credit Code and providers need a credit licence, so describe instalment terms accurately on product pages.",
    },
    {
      title: "GST at 10%",
      text: "GST is 10%, and a business must register within 21 days of its GST turnover reaching $75,000. Overseas sellers are caught too: since July 2018, sellers of low-value goods (customs value of A$1,000 or less) to Australian consumers must register once their Australian sales reach $75,000 and collect GST at checkout. Shopify's tax settings handle this, but they need setting up properly.",
    },
    {
      title: "Shipping and carriers",
      text: "Australia Post covers most DTC parcels, with Parcel Post typically taking two to six business days between capital cities and Express Post's next-day network limited to capital cities and some major centres (Perth delivery into the CBD only). StarTrack is Australia Post's express freight arm. Sendle stopped taking bookings in January 2026, so any checkout still quoting it needs new rates.",
    },
    {
      title: "Australian Consumer Law",
      text: "Consumer guarantees apply automatically: if a product has a major failure, the customer chooses a refund or replacement, and \"no refunds\" wording is unlawful (you can say no refunds for change of mind). Unfair terms in standard-form contracts now attract penalties of up to $50 million or more. Drip pricing is already enforced by the ACCC, and a broader ban on unfair trading practices and hidden fees starts on 1 July 2027.",
    },
    {
      title: "Privacy and marketing consent",
      text: "The Spam Act 2003 requires consent before you email or text marketing, clear sender identification and an unsubscribe honoured within five working days. The Privacy Act reforms of December 2024 added a statutory tort for serious invasions of privacy (from June 2025), new OAIC penalty powers and, from 10 December 2026, privacy-policy disclosures about automated decisions. Most small businesses under $3 million turnover remain exempt, with exceptions.",
    },
    {
      title: "Pricing, currency and language",
      text: "Show a single total price in AUD that includes GST, rather than adding tax at checkout, and write in Australian English: colour, optimise, favourite. If you also sell to New Zealand, Shopify Markets can run NZD pricing and separate duties and shipping rules from the same store, without a second theme to maintain.",
    },
  ],
  workingTogether:
    "Our team works on Pakistan time (PKT, UTC+5), and our meeting slots are 10:00–12:00 and 14:00–16:00 PKT, Monday to Friday. In Australia those land in the afternoon and evening. Perth (AWST, no daylight saving) gets the easiest fit: 1–3pm and 5–7pm all year. Brisbane sees 3–5pm and 7–9pm year-round. Sydney and Melbourne get 3–5pm and 7–9pm in winter, moving to 4–6pm and 8–10pm under daylight saving from October to April, and Adelaide sits half an hour behind them (2:30–4:30pm and 6:30–8:30pm in winter, 3:30–5:30pm and 7:30–9:30pm in summer). Most projects use the earlier slot for calls and leave the rest to async updates, Loom walkthroughs and a shared board, so work moves while you're asleep and is waiting for review the next morning.",
  caseStudies: ["heybuddy", "dermalyft", "glo"],
  faqs: [
    {
      question: "Do you have an office or team in Australia?",
      answer:
        "No. We're a remote team based in Pakistan working with brands in several countries, and we don't have Australian staff or an Australian office. We work in AUD-aware, GST-aware Shopify setups and meet with Australian clients in the afternoon, Australian time. Several of the brands in our case studies ship to Australia, which is where most of our local experience comes from.",
    },
    {
      question: "Can you set up Afterpay, Zip and Shop Pay Installments on our Shopify store?",
      answer:
        "Yes. Afterpay and Zip install as their own payment apps, Klarna can run through Shopify Payments, and Shop Pay Installments covers Australian orders between $50 and $30,000 AUD on debit cards. We'll also add instalment messaging to product and cart pages where it helps, and test it, because too many BNPL badges can clutter a page as easily as they lift conversion.",
    },
    {
      question: "Does our Shopify store need to charge GST?",
      answer:
        "If your GST turnover reaches $75,000, you must register within 21 days and charge 10% GST, shown inside your prices. Overseas brands selling low-value goods to Australian consumers face the same $75,000 test and collect GST at the point of sale. We configure Shopify's tax settings and price display, but your accountant or the ATO should confirm your registration position.",
    },
    {
      question: "What should our returns policy say under Australian Consumer Law?",
      answer:
        "It should explain your change-of-mind policy, if you offer one, without suggesting customers lose their consumer guarantee rights. For a major failure, the customer chooses a refund or replacement, and wording like \"no refunds on sale items\" is unlawful. We build returns pages, order-status flows and Klaviyo messages around that, then you have the wording checked by your own legal adviser.",
    },
    {
      question: "Can you migrate our store to Shopify or Shopify Plus from another platform?",
      answer:
        "Yes. We migrate products, customers, order history and URLs from platforms like WooCommerce, Magento and BigCommerce, keep redirects in place to protect search rankings, and rebuild payment, GST and shipping settings for Australia. Larger brands moving to Shopify Plus also get checkout extensibility, B2B features and automation through Shopify Flow. We plan the cutover around your trading calendar, away from EOFY sales and Black Friday.",
    },
  ],
  cities: [
    {
      slug: "sydney",
      name: "Sydney",
      region: "New South Wales",
      timeZone: "Australia/Sydney",
      metaTitle: "Shopify Agency in Sydney, NSW | The Active Solutions",
      metaDescription:
        "A Shopify agency for Sydney DTC brands and international labels entering Australia: Shopify Plus builds, CRO and paid media that hold up in a crowded market.",
      headline: "Shopify Agency in Sydney for brands that need to *stand out*",
      lead: "Sydney is Australia's largest and most contested market, and the city where Afterpay and Zip began. Your Shopify store has to earn attention against every serious competitor.",
      intro: [
        "Greater Sydney had about 5.64 million residents at June 2025, the largest population of any Australian city, according to the ABS. That size cuts both ways. There are more customers within next-day reach than anywhere else in the country, and there is more competition for each of them: national retailers, global marketplaces and a steady stream of overseas labels that choose Sydney as the place to open their Australian account.",
        "It's also where Australian BNPL was invented. Afterpay was founded in Sydney in 2014 and Zip in 2013, so Sydney shoppers have been paying in instalments for a decade and judge a checkout partly on whether it offers the option they already use. Fashion, beauty and wellness brands feel this most, because those categories grew up alongside BNPL and their customers compare stores side by side on mobile.",
        "For a DTC brand, working with a Shopify agency in Sydney's market means designing for comparison shopping. Speed, clear delivery cut-offs, honest stock signals and product pages that answer questions without a support ticket matter more here than a clever homepage. Our Shopify developers build for that, and our CRO team tests the details that decide which tab the shopper keeps open.",
      ],
      industries: [
        {
          title: "Fashion and apparel",
          text: "Sydney's fashion brands sell into a market where shoppers browse several labels at once. Fast collection pages, accurate size guides and BNPL messaging on product pages carry real weight, and returns flows need to be clear enough that buying two sizes doesn't feel like a risk.",
        },
        {
          title: "Beauty and skincare",
          text: "Beauty buyers research ingredients, reviews and before-and-after results before buying. Shopify stores here need structured product content, routine bundles and Klaviyo replenishment flows that bring customers back when a product is likely to be running out.",
        },
        {
          title: "International brands entering Australia",
          text: "Overseas DTC brands often test Australia through Sydney first. They need AUD pricing with GST included, local payment methods, realistic delivery promises and a returns path that doesn't involve shipping parcels back overseas, ideally on their existing Shopify Plus setup through Shopify Markets.",
        },
        {
          title: "Fintech-friendly checkout",
          text: "With Afterpay and Zip both founded in the city, Sydney shoppers are comfortable with payment choice at checkout. That makes checkout layout, the order of payment options and the clarity of instalment terms worth testing rather than guessing.",
        },
      ],
      local: [
        {
          title: "Daylight saving and send times",
          text: "Sydney runs on AEDT (UTC+11) from early October to early April and AEST (UTC+10) the rest of the year. Klaviyo campaigns and launch timers scheduled in another time zone drift by an hour twice a year unless they're set to the store's local time.",
        },
        {
          title: "Peak trading on a crowded calendar",
          text: "Click Frenzy, Black Friday, Boxing Day and the end of financial year all bring discount-heavy competition. Sydney brands that plan creative, stock and site changes weeks ahead tend to avoid launching a new theme in the middle of their busiest month.",
        },
        {
          title: "Metro delivery expectations",
          text: "Metro Sydney is inside Australia Post's Express Post network, so local shoppers are used to quick delivery from big retailers. Show a clear dispatch cut-off and an honest estimate on product and cart pages rather than a vague range at checkout.",
        },
        {
          title: "Meeting overlap",
          text: "Our slots fall at 3–5pm and 7–9pm Sydney time in winter and 4–6pm and 8–10pm under daylight saving. A weekly call in the first slot, with async updates in between, works well for most Sydney teams.",
        },
      ],
      faqs: [
        {
          question: "We're an overseas brand launching in Australia through Sydney. Where do we start?",
          answer:
            "Start with the basics shoppers notice: AUD prices with GST included, Afterpay or another familiar BNPL option, delivery estimates that reflect where your stock actually sits, and a local returns address. On Shopify Plus that can usually run from your existing store through Shopify Markets. We then test landing pages and paid social creative for Australian audiences before you commit a bigger budget.",
        },
        {
          question: "Sydney shoppers know Afterpay well. Should BNPL appear on every product page?",
          answer:
            "Not automatically. Instalment messaging helps on higher-priced products and for shoppers new to your brand, but stacked badges can bury the price and the add-to-cart button. We usually test where the message sits, how it's worded and which providers appear, then keep what improves completed orders, not just clicks on the payment logos.",
        },
        {
          question: "What meeting times work for a Sydney team?",
          answer:
            "Our slots are 10:00–12:00 and 14:00–16:00 Pakistan time, which is 3–5pm and 7–9pm in Sydney during winter, and 4–6pm and 8–10pm when daylight saving runs from October to April. The earlier window suits a weekly call, with async updates in between, so reviews don't wait for a meeting.",
        },
        {
          question: "How can a smaller Sydney DTC brand compete with marketplaces and big retailers?",
          answer:
            "By doing what they can't: a sharper product story, bundles and subscriptions built around your range, and a post-purchase experience that makes a second order likely. We focus on site speed and product page clarity first, then build Klaviyo flows for welcome, browse abandonment and replenishment, so you aren't relying on paid media for every sale.",
        },
      ],
      sources: [
        { title: "ABS: Regional population, 2024-25", url: "https://www.abs.gov.au/statistics/people/population/regional-population/latest-release" },
        { title: "Afterpay (founding, Sydney 2014)", url: "https://en.wikipedia.org/wiki/Afterpay" },
        { title: "Zip Co (founding, Sydney 2013)", url: "https://en.wikipedia.org/wiki/Zip_Co" },
        { title: "Australia Post: Delivery speeds and coverage", url: "https://auspost.com.au/business/shipping/speeds-and-coverage" },
        { title: "Australia Post: Click Frenzy sales strategies", url: "https://auspost.com.au/business/business-ideas/selling-online/click-frenzy" },
      ],
    },
    {
      slug: "melbourne",
      name: "Melbourne",
      region: "Victoria",
      timeZone: "Australia/Melbourne",
      metaTitle: "Shopify Agency in Melbourne, VIC | The Active Solutions",
      metaDescription:
        "Shopify developers for Melbourne fashion, design, coffee and purpose-led DTC brands: Shopify Plus builds, subscriptions, CRO and Klaviyo retention programs.",
      headline: "Shopify Agency in Melbourne for *design-led* DTC brands",
      lead: "Melbourne's DTC scene runs on fashion, design, coffee culture and purpose-led brands. Your Shopify store should look the part and still convert.",
      intro: [
        "Melbourne added more people than any other Australian city in 2024–25, about 105,000, taking Greater Melbourne to roughly 5.44 million residents according to the ABS. It also has a long-standing claim to being the country's fashion capital: the City of Melbourne owns and runs Melbourne Fashion Week to position the city that way, and Victoria's creative industries are a significant part of the state economy.",
        "The city's DTC story often starts small and specific. Frank Body was founded in Melbourne in 2013 after café customers asked for used coffee grounds to take home, and Who Gives A Crap began in Melbourne as a toilet paper brand with a social mission. Both show the pattern well: a strong idea, a distinctive voice and a direct relationship with customers, built online rather than through department store shelves.",
        "That shapes what a Melbourne brand needs from a Shopify agency. Design matters, because the audience notices. But the store also has to handle the less glamorous work: subscriptions that don't frustrate people, wholesale alongside retail, seasonal drops that don't break inventory, and email that sounds like the brand. Our Shopify developers and retention team build for both sides, on Shopify or Shopify Plus.",
      ],
      industries: [
        {
          title: "Fashion and independent labels",
          text: "Melbourne's labels work in drops and seasons, often with limited runs. Shopify stores need pre-order and waitlist logic, collection pages that update cleanly, and Klaviyo back-in-stock flows that turn a sold-out product into a list of ready buyers.",
        },
        {
          title: "Coffee, food and pantry",
          text: "Coffee roasters and specialty food brands live on repeat orders. Subscriptions with easy skip and pause, bundles that suit gifting, and clear delivery cut-offs for freshness-sensitive products matter more than an elaborate homepage.",
        },
        {
          title: "Purpose-led and subscription brands",
          text: "Brands built on a mission need storytelling that sits close to the product, not hidden on an About page, and subscription programs that are simple to manage and to cancel. That last point gets stricter when Australia's ban on subscription traps starts in July 2027.",
        },
        {
          title: "Homewares and design objects",
          text: "Higher-priced design pieces need excellent photography, dimensions and materials up front, BNPL messaging where it helps, and freight options for bulky items that are explained before checkout rather than discovered at it.",
        },
      ],
      local: [
        {
          title: "Weather and wardrobe timing",
          text: "Melbourne's cooler winters and changeable spring mean outerwear and knitwear sell for longer than in Brisbane or Perth. National brands headquartered here should avoid assuming the whole country is in the same season of buying.",
        },
        {
          title: "Fashion Week and event-led launches",
          text: "Local events like Melbourne Fashion Week give labels a natural moment for launches and collaborations. Plan site changes, pre-orders and email sends ahead, so the store can absorb a traffic spike without a last-minute theme edit.",
        },
        {
          title: "Wholesale next to DTC",
          text: "Many Melbourne brands supply cafés, boutiques and stockists as well as selling online. Shopify's B2B features, fullest on Shopify Plus, let wholesale customers order at their own prices and terms from the same store and inventory.",
        },
        {
          title: "Working with local creative studios",
          text: "Melbourne brands often already have a design or branding studio they trust. We can sit behind that studio as the Shopify development team, or work directly with the brand alongside them.",
        },
      ],
      faqs: [
        {
          question: "We're a Melbourne fashion label that releases in drops. Can Shopify handle that well?",
          answer:
            "Yes, with the right setup. We build pre-order and waitlist options, scheduled collection launches, and inventory rules that stop overselling when a drop sells fast. Klaviyo back-in-stock and early-access flows reward your list, and on Shopify Plus we can add checkout rules for launch day, such as limiting quantities per customer to keep stock with real buyers.",
        },
        {
          question: "Our brand supplies cafés and stockists as well as selling online. Can one Shopify store do both?",
          answer:
            "Usually, yes. Shopify's B2B features, fullest on Shopify Plus, give wholesale customers their own price lists, payment terms and minimum quantities while retail shoppers see standard pricing. Inventory stays in one place, so a café order and a website order draw from the same stock. We set up the company accounts, catalogues and ordering pages around how your stockists actually buy.",
        },
        {
          question: "How should we run subscriptions without frustrating customers?",
          answer:
            "Make them easy to change: skip, pause, swap and cancel from the customer account, with clear reminders before each charge. That builds trust, and it also lines up with Australia's ban on subscription traps, which takes effect on 1 July 2027. We set up the subscription app, the portal and Klaviyo flows that win back lapsed subscribers.",
        },
        {
          question: "We already work with a Melbourne design studio. Can you build the Shopify side with them?",
          answer:
            "Yes. Through our white label Shopify development service we can work behind your studio as their build team, or collaborate openly with the brand and the studio together. Either way we take the approved designs into a fast, maintainable Shopify theme and handle the apps, integrations and testing, so the studio can keep its focus on the creative work.",
        },
      ],
      sources: [
        { title: "ABS: Capital city growth slows (2024-25)", url: "https://www.abs.gov.au/media-centre/media-releases/capital-city-growth-slows" },
        { title: "City of Melbourne: Melbourne Fashion Week", url: "https://www.melbourne.vic.gov.au/arts-and-culture/events-partnerships/melbourne-fashion-week/Pages/melbourne-fashion-week.aspx" },
        { title: "Creative Victoria: Latest fashion news", url: "https://creative.vic.gov.au/news/2023/the-latest-fashion-news" },
        { title: "The New Daily: Frank Body founders", url: "https://www.thenewdaily.com.au/life/2016/06/04/frank-body-founders" },
        { title: "Who Gives A Crap: About us", url: "https://au.wholesale.whogivesacrap.org/pages/about-us" },
        { title: "Treasury: Banning unfair trading tricks and traps", url: "https://ministers.treasury.gov.au/ministers/andrew-leigh-2025/media-releases/banning-unfair-trading-tricks-and-traps" },
      ],
    },
    {
      slug: "brisbane",
      name: "Brisbane",
      region: "Queensland",
      timeZone: "Australia/Brisbane",
      metaTitle: "Shopify Agency in Brisbane, QLD | The Active Solutions",
      metaDescription:
        "Shopify agency for Brisbane and Queensland DTC brands in lifestyle, outdoor and swim: Shopify Plus builds, CRO and paid media for a fast-growing market.",
      headline: "Shopify Agency in Brisbane for a city on the *rise*",
      lead: "Brisbane is growing fast, drawing people from the rest of Australia and preparing for the 2032 Games. Queensland brands selling lifestyle, outdoor and swim need stores that scale with it.",
      intro: [
        "Greater Brisbane grew by 2.1% in 2024–25 to about 2.83 million people, and it was one of only two capital cities, along with Perth, to gain more residents from interstate than it lost, according to the ABS. Many of those new arrivals are building households from scratch, which is good news for DTC brands in homewares, furniture, activewear and outdoor gear.",
        "Then there's 2032. Brisbane was confirmed as host of the Olympic and Paralympic Games in July 2021, with the Olympics scheduled for 23 July to 8 August 2032 across venues in south-east Queensland. The Games are still years away, but the attention on the region, and on sport and active living, is already part of how Queensland brands position themselves.",
        "The lifestyle itself shapes buying. A subtropical climate means swimwear, sun protection and outdoor gear sell across more of the year than in the southern states, and Queensland doesn't use daylight saving, so it's an hour behind Sydney for half the year. A Shopify agency in Brisbane's market should plan campaigns, send times and stock around both. Our Shopify developers, CRO and paid media teams do exactly that, on Shopify and Shopify Plus.",
      ],
      industries: [
        {
          title: "Swim, surf and sun care",
          text: "Queensland's longer warm season stretches the selling window for swim and sun products. Shopify stores need collections and campaigns that can run year-round for Queensland while still matching the seasonal rhythm of shoppers in Melbourne or Hobart.",
        },
        {
          title: "Outdoor, camping and 4WD gear",
          text: "Outdoor brands sell technical, often bulky products to customers who research carefully. Detailed specs, comparison tables, freight estimates for large items and Klaviyo flows timed to school holidays and long weekends all help.",
        },
        {
          title: "Activewear and fitness",
          text: "With sport in the spotlight ahead of 2032, activewear and fitness brands have a strong story to tell. Fit guides, easy exchanges and creative tested across Meta and TikTok help turn interest into orders.",
        },
        {
          title: "Home and furniture",
          text: "New arrivals furnishing a home buy higher-value items, often with BNPL. Clear delivery and assembly information, room-scene imagery and bundles for whole rooms suit this buyer better than single-product pages alone.",
        },
      ],
      local: [
        {
          title: "No daylight saving in Queensland",
          text: "Brisbane stays on AEST (UTC+10) all year. From October to April it's an hour behind Sydney and Melbourne, so national campaigns, flash sales and Klaviyo sends set to Sydney time land an hour early for Queensland customers.",
        },
        {
          title: "A different seasonal calendar",
          text: "Summer stock sells earlier and for longer here than in the south. Queensland brands selling nationally often need market-specific merchandising, such as homepage collections or email segments split by state.",
        },
        {
          title: "Protected Olympic terms",
          text: "Olympic words and symbols are protected under Australian law and through sponsor programs, so Brisbane brands should check before using them in product names, ads or promo codes ahead of 2032.",
        },
        {
          title: "Regional Queensland delivery",
          text: "Queensland is large, and customers in regional and northern towns wait longer than those in south-east Queensland. Show delivery estimates by postcode where possible, rather than one statewide promise.",
        },
      ],
      faqs: [
        {
          question: "Queensland doesn't use daylight saving. How does that affect our store and meetings?",
          answer:
            "From October to April, Brisbane is an hour behind Sydney, so sale start times, countdown timers and Klaviyo sends set to Sydney time hit Queensland early. We set them to your store's time zone or segment by state. For meetings, our slots fall at 3–5pm and 7–9pm Brisbane time all year, with no seasonal shift to remember.",
        },
        {
          question: "Should our Brisbane brand plan marketing around the 2032 Games?",
          answer:
            "Carefully. The interest in sport and active living is real, and activewear, outdoor and wellness brands can lean into it. But Olympic names and symbols are legally protected, so avoid using them in ads, product names or discount codes without permission. We focus on the broader story, like local, active and outdoor, which doesn't depend on the Games' branding.",
        },
        {
          question: "We sell swim and outdoor products nationally from Queensland. How do we handle different seasons?",
          answer:
            "We segment by location. On Shopify that can mean collection order and homepage banners that change by region, and in Klaviyo it means separate sends for Queensland and the southern states, so a Melbourne customer isn't pushed swimwear in a cold snap. Paid campaigns can be split the same way, with budgets following the warm weather.",
        },
        {
          question: "Brisbane is attracting a lot of interstate movers. Does that change how we market?",
          answer:
            "It can. People who've just moved are setting up homes, joining gyms and finding new local favourites, so they're open to new brands. Welcome offers for first orders, bundles for new homes and clear delivery information for new suburbs all help. We test acquisition creative aimed at that audience and measure whether those customers come back for a second order.",
        },
      ],
      sources: [
        { title: "ABS: Regional population, 2024-25", url: "https://www.abs.gov.au/statistics/people/population/regional-population/latest-release" },
        { title: "ABS: Capital city growth slows", url: "https://www.abs.gov.au/media-centre/media-releases/capital-city-growth-slows" },
        { title: "SBS News: Brisbane will host the 2032 Olympic and Paralympic Games", url: "https://www.sbs.com.au/news/article/its-official-brisbane-will-host-the-2032-olympic-and-paralympic-games/0fugjc23z" },
        { title: "CNN via KVIA: Brisbane officially announced as host of 2032 Olympics", url: "https://kvia.com/cnn-sports/2021/07/21/brisbane-officially-announced-as-host-of-2032-olympics/" },
        { title: "Australia Post: Delivery speeds and coverage", url: "https://auspost.com.au/business/shipping/speeds-and-coverage" },
      ],
    },
    {
      slug: "perth",
      name: "Perth",
      region: "Western Australia",
      timeZone: "Australia/Perth",
      metaTitle: "Shopify Agency in Perth, WA | Shopify Plus & DTC Growth",
      metaDescription:
        "Shopify agency for Perth and WA brands: Shopify Plus builds, shipping and fulfilment setups for the east coast and Asia, CRO and Klaviyo retention programs.",
      headline: "Shopify Agency in Perth, built for the *distance*",
      lead: "Perth brands sell from one of the most isolated big cities in the world, in Asia's time zone. That makes shipping, stock location and timing central to the Shopify build.",
      intro: [
        "Perth was Australia's fastest-growing capital in 2024–25, up 2.4% to about 2.45 million people, according to the ABS, and like Brisbane it gained residents from other states. The economy behind it is unusual: mining made up around 45% of Western Australia's gross state product in 2022–23, according to the WA Government, and many customers live and work far from any shopping centre.",
        "Distance is the defining fact for a Perth brand. The east coast, where most Australians live, is more than 3,000 kilometres away. Australia Post's Express Post network reaches Perth's CBD only, and standard parcels between the east coast and Perth take several business days. A Perth store that promises 'fast shipping' to Sydney without a plan behind it will create support tickets, not loyalty.",
        "Time zone is the other. Perth sits on AWST (UTC+8) all year, the same clock as Singapore, Hong Kong and Kuala Lumpur, which makes Asian markets easier to serve and our own meeting slots easier to fit. A Shopify agency for Perth brands should treat shipping logic, stock location and international markets as part of the build. Our Shopify developers do, on Shopify and Shopify Plus.",
      ],
      industries: [
        {
          title: "Workwear, outdoor and mining-adjacent gear",
          text: "WA's resources sector creates steady demand for workwear, boots, safety gear and outdoor equipment. These buyers want specs, sizing and delivery to regional addresses explained clearly, and they reorder when the store makes it easy.",
        },
        {
          title: "Beach, surf and lifestyle",
          text: "Perth's coastline and dry, sunny summers support swim, surf and lifestyle labels. Strong imagery and fit guidance help, but so does honest delivery timing for customers on the other side of the country.",
        },
        {
          title: "Food, wine and WA produce",
          text: "From Margaret River wine to local pantry brands, WA producers sell a sense of place. Gift bundles, subscriptions and a clear explanation of how products travel interstate help them reach customers in other states.",
        },
        {
          title: "Brands selling into Asia",
          text: "Sharing a time zone with much of South-East Asia makes Perth a practical base for selling there. Shopify Markets can handle local currencies, languages and duties from one store.",
        },
      ],
      local: [
        {
          title: "East-coast delivery times",
          text: "Standard parcels from Perth to Sydney or Melbourne take several business days, and next-day Express Post coverage in Perth is limited to the CBD. Show delivery estimates by destination on product and cart pages, not just at checkout.",
        },
        {
          title: "Freight cost and free-shipping thresholds",
          text: "Sending parcels east costs more than shipping within the metro area. Set free-shipping thresholds and rates by zone, and test them, rather than copying an east-coast brand's flat national offer.",
        },
        {
          title: "Splitting stock across locations",
          text: "Growing Perth brands often add an east-coast 3PL. Shopify supports multiple inventory locations and can route orders to the closest one with stock, which shortens delivery times for most of the country.",
        },
        {
          title: "No daylight saving",
          text: "WA stays on AWST all year, so Perth is two hours behind Sydney in winter and three hours behind in summer. National launches and Klaviyo sends need to account for that.",
        },
      ],
      faqs: [
        {
          question: "What meeting times work for a Perth team?",
          answer:
            "Perth gets the best fit of any Australian city. Our slots of 10:00–12:00 and 14:00–16:00 Pakistan time convert to 1–3pm and 5–7pm in Perth, and because WA doesn't use daylight saving, those times stay the same all year. The early-afternoon slot falls well inside the Perth working day, well inside the working day.",
        },
        {
          question: "We ship from Perth. How do we set delivery expectations for east-coast customers?",
          answer:
            "Be specific and show it early. We add estimated delivery by postcode or state to product and cart pages, set a clear dispatch cut-off, and send Klaviyo shipping updates that keep customers informed while the parcel crosses the country. Honest estimates convert better than vague promises that turn into 'where's my order' emails.",
        },
        {
          question: "Should a Perth brand use a 3PL on the east coast?",
          answer:
            "Once a large share of your orders goes east, it's worth testing. Shopify can hold stock at several locations and route each order to the nearest one, so Sydney and Melbourne customers get faster delivery without changing anything for local buyers. We set up the locations, shipping profiles and rates, then check that the split actually shortens delivery.",
        },
        {
          question: "Can you help a Perth brand sell into Singapore and other Asian markets?",
          answer:
            "Yes. Perth shares UTC+8 with Singapore and Hong Kong, so campaign timing is simple. With Shopify Markets we set local currencies, translated content where needed, duties and import taxes, and market-specific shipping from your existing store. We then run paid media tests in each market before you commit stock or a bigger budget.",
        },
      ],
      sources: [
        { title: "ABS: Regional population, 2024-25", url: "https://www.abs.gov.au/statistics/people/population/regional-population/latest-release" },
        { title: "WA Government: Western Australia economic profile (Dec 2023)", url: "https://www.wa.gov.au/system/files/2024-01/waeconomicdec23.docx" },
        { title: "WA Treasury: Structure of the WA economy (Sept 2021)", url: "https://www.wa.gov.au/system/files/2021-10/structure-of-the-economy-september2021.pdf" },
        { title: "Australia Post: Delivery speeds and coverage", url: "https://auspost.com.au/business/shipping/speeds-and-coverage" },
        { title: "Australia Post: Calculate the cost and time to send", url: "https://auspost.com.au/sending/delivery-speeds-and-coverage" },
      ],
    },
    {
      slug: "adelaide",
      name: "Adelaide",
      region: "South Australia",
      timeZone: "Australia/Adelaide",
      metaTitle: "Shopify Agency in Adelaide, SA | The Active Solutions",
      metaDescription:
        "Shopify agency for Adelaide wine, food, beverage and maker brands: Shopify Plus builds, wine club subscriptions, B2B and Klaviyo retention for South Australia.",
      headline: "Shopify Agency in Adelaide for *wine, food* and makers",
      lead: "South Australia produces close to half of the country's wine grapes, and Adelaide's food, drink and manufacturing brands are increasingly selling direct. Their Shopify stores have specific rules to follow.",
      intro: [
        "South Australia crushed 49% of Australia's wine grapes in the 2024 vintage, according to Wine Australia's national vintage report, and Wine Australia describes the state as responsible for almost half the country's annual production. Around Adelaide, the Barossa, McLaren Vale and Adelaide Hills turn that into cellar doors, wine clubs and, more and more, online sales direct to drinkers in other states.",
        "Beverage brands here face a rule most of the country doesn't think about first. South Australia has run a container deposit scheme since 1977, now at 10 cents, and eligible beverage containers must be approved by the SA EPA, with a refund marking, before they're sold in the state. For a drinks brand launching online, packaging approval is part of the go-to-market plan.",
        "Adelaide's economy also leans on advanced manufacturing and defence, with the Osborne shipyard set to build Australia's AUKUS submarines. Many local makers sell to trade and consumers at once. A Shopify agency for Adelaide brands needs to handle age checks, wine club subscriptions, wholesale pricing and freight for heavy or fragile goods. Our Shopify developers and retention team build all of that on Shopify and Shopify Plus.",
      ],
      industries: [
        {
          title: "Wine and wineries",
          text: "Wineries sell through cellar doors, clubs and online. Shopify stores need age confirmation, mixed-case pricing, club subscriptions with member pricing, and Klaviyo flows that follow up after a cellar door visit so a tasting turns into repeat orders.",
        },
        {
          title: "Food, gourmet and pantry",
          text: "South Australian produce and gourmet brands sell well as gifts and hampers. Bundles, gift messaging, corporate ordering and clear dispatch dates around Christmas matter more than a constantly changing product range.",
        },
        {
          title: "Craft beverages",
          text: "Breweries, distilleries and soft drink makers need online stores that respect alcohol rules and South Australia's container deposit requirements, and that can offer limited releases without overselling stock.",
        },
        {
          title: "Makers and manufacturers",
          text: "Adelaide's manufacturing base includes many businesses selling both to trade and to consumers. Shopify's B2B features, fullest on Shopify Plus, let them run wholesale price lists and payment terms beside a retail store.",
        },
      ],
      local: [
        {
          title: "Container deposit approval",
          text: "Eligible beverage containers sold in South Australia need SA EPA approval and a refund marking before sale. Build approval time into launch plans, and keep product images showing the approved label.",
        },
        {
          title: "Half-hour time zone",
          text: "Adelaide runs on ACST (UTC+9:30), switching to ACDT (UTC+10:30) for daylight saving. It's always half an hour behind Sydney, which matters when a national sale or email launches at a fixed time.",
        },
        {
          title: "Fragile and heavy freight",
          text: "Wine cases and bottled drinks are heavy and breakable. Set shipping rates by weight and zone, choose packaging and carriers suited to glass, and explain delivery costs clearly before checkout.",
        },
        {
          title: "Harvest and festival calendar",
          text: "Vintage, new releases and Adelaide's busy festival season in late summer bring visitors and attention. Plan release campaigns and club shipments around them instead of competing with them.",
        },
      ],
      faqs: [
        {
          question: "Can a South Australian winery sell wine online through Shopify?",
          answer:
            "Yes. Shopify handles mixed-case pricing, quantity rules, wine club subscriptions and member-only pricing, and we add age confirmation at entry and checkout. Your liquor licence conditions and delivery rules still apply, so confirm them with your licensing adviser. We then build Klaviyo flows that turn cellar door visitors and club members into regular online customers.",
        },
        {
          question: "What does South Australia's container deposit scheme mean for our online drinks store?",
          answer:
            "If you sell eligible beverage containers into South Australia, they need SA EPA approval and the correct refund marking before sale, whether the order comes from a shop or a website. We can't approve containers, but we build the store around that: launch dates that allow for approval, accurate product images and clear deposit information where it applies.",
        },
        {
          question: "What meeting times work for an Adelaide team?",
          answer:
            "Adelaide's half-hour offset gives slightly different times from the east coast. Our 10:00–12:00 and 14:00–16:00 Pakistan slots are 2:30–4:30pm and 6:30–8:30pm in Adelaide during winter, and 3:30–5:30pm and 7:30–9:30pm under daylight saving. The early-afternoon slot suits a weekly call, with async updates in between.",
        },
        {
          question: "We're an Adelaide manufacturer selling to trade. Should we add a direct-to-consumer store?",
          answer:
            "It can work well if pricing and service are kept separate. Shopify's B2B features, fullest on Shopify Plus, let trade customers log in to their own prices and terms, while consumers see retail pricing on the same store and inventory. We help you plan which products to offer direct, set up both channels, and test whether consumer sales add margin without upsetting your stockists.",
        },
      ],
      sources: [
        { title: "InDaily: SA loses wine market share to eastern states (Wine Australia vintage report)", url: "https://www.indailysa.com.au/news/archive/2024/07/10/sa-loses-wine-market-share-to-eastern-states" },
        { title: "Wine Australia: South Australia wines", url: "https://www.wineaustralia.com/discover-australia-wine/south-australia-wines" },
        { title: "RecycleSA: South Australian deposit history", url: "https://www.recyclesa.com.au/container-deposit-legislation/south-australian-deposit-history/" },
        { title: "ABLIS: Approval of class of container / label (SA)", url: "https://ablis.business.gov.au/service/sa/approval-of-class-of-container-label/518" },
        { title: "Australian Submarine Agency: Construction in South Australia", url: "https://www.asa.gov.au/aukus/construction-south-australia" },
        { title: "Australian Beverages Council: Container deposit schemes, South Australia", url: "https://www.australianbeverages.org/initiatives-advocacy-information/container-deposit-schemes/south-australia/" },
      ],
    },
  ],
  sources: [
    { title: "Australia Post eCommerce Report 2026", url: "https://auspost.com.au/content/dam/auspost_corp/media/documents/ecommerce-reports/annual-ecommerce-reports/ecommerce-report-2026.pdf" },
    { title: "Australia Post: Latest eCommerce trends", url: "https://auspost.com.au/business/marketing-and-communications/access-data-and-insights/ecommerce-trends" },
    { title: "ATO: Registering for GST", url: "https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/registering-for-gst" },
    { title: "ATO: How to charge GST on imported services, digital products and low value imported goods", url: "https://www.ato.gov.au/businesses-and-organisations/international-tax-for-business/gst-for-non-resident-businesses/how-to-charge-gst" },
    { title: "ATO: Non-resident businesses making online sales to Australia", url: "https://ato.gov.au/businesses-and-organisations/international-tax-for-business/gst-on-imported-goods-and-services/what-to-do-as-a-non-resident-business" },
    { title: "ASIC: BNPL providers to apply for a licence under new laws", url: "https://asic.gov.au/about-asic/news-centre/news-items/asic-alerts-buy-now-pay-later-providers-to-apply-for-a-licence-under-new-laws/" },
    { title: "Hall & Wilcox: Buy-now pay-later reform", url: "https://hallandwilcox.com.au/news/buy-now-pay-later-reform-what-you-need-to-know/" },
    { title: "Shopify Help: Shop Pay Installments FAQ", url: "https://help.shopify.com/en/manual/payments/shop-pay-installments/faq" },
    { title: "Shopify Help: Klarna for Shopify Payments", url: "https://help.shopify.com/en/manual/payments/shopify-payments/local-payment-methods/klarna/klarna-shopify-payments" },
    { title: "Afterpay: How can I add Afterpay to my Shopify checkout page?", url: "https://www.afterpay.com/en-AU/help-merchant/43585301143321-How-Can-I-Add-Afterpay-To-My-Shopify-Checkout-Page" },
    { title: "Afterpay (founding)", url: "https://en.wikipedia.org/wiki/Afterpay" },
    { title: "Zip Co (founding)", url: "https://en.wikipedia.org/wiki/Zip_Co" },
    { title: "Australia Post: Delivery speeds and coverage", url: "https://auspost.com.au/business/shipping/speeds-and-coverage" },
    { title: "Australia Post: Calculate the cost and time to send", url: "https://auspost.com.au/sending/delivery-speeds-and-coverage" },
    { title: "StarTrack", url: "https://www.startrack.com.au/" },
    { title: "Power Retail: Sendle suddenly halts operations", url: "https://powerretail.com.au/sendle-suddenly-halts-operations/" },
    { title: "Shippit: Sendle shut down in Australia", url: "https://www.shippit.com/blog/sendle-shut-down-in-australia-shipping-alternatives" },
    { title: "ACCC: Consumer rights and guarantees", url: "https://www.accc.gov.au/consumers/buying-products-and-services/consumer-rights-and-guarantees" },
    { title: "ACCC: Misleading consumers about their rights", url: "https://www.accc.gov.au/publications/advertising-and-selling-guide/advertising-and-selling-guide/consumer-guarantees/misleading-consumers-about-their-rights" },
    { title: "ACCC: Contracts (unfair contract terms)", url: "https://www.accc.gov.au/business/selling-products-and-services/contracts" },
    { title: "ACCC: Businesses urged to remove unfair contract terms ahead of law changes", url: "https://www.accc.gov.au/media-release/businesses-urged-to-remove-unfair-contract-terms-ahead-of-law-changes" },
    { title: "Treasury: Banning unfair trading tricks and traps", url: "https://ministers.treasury.gov.au/ministers/andrew-leigh-2025/media-releases/banning-unfair-trading-tricks-and-traps" },
    { title: "Parliamentary Library: Bills Digest, Unfair Trading Practices Bill 2026", url: "https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/bd/bd2526/26bd058" },
    { title: "King & Wood Mallesons: ACCC and Dendy drip pricing", url: "https://pulse.mallesons.com/in-competition/fee-ling-misled-accc-cracks-down-on-dendy-cinema-drip-pricing/" },
    { title: "ACMA: Avoid sending spam", url: "https://www.acma.gov.au/avoid-sending-spam" },
    { title: "ACMA: Email and SMS unsubscribe rules", url: "https://www.acma.gov.au/sites/default/files/2024-05/Fact%20sheet%20-%20email%20and%20SMS%20unsubscribe%20rules.pdf" },
    { title: "OAIC: Reforms critical to Australia's privacy future", url: "https://www.oaic.gov.au/news/media-centre/oaic-welcomes-reforms-critical-to-australias-privacy-future" },
    { title: "MinterEllison: Privacy and Other Legislation Amendment Act 2024 now in effect", url: "https://www.minterellison.com/articles/privacy-and-other-legislation-amendment-act-2024-now-in-effect" },
    { title: "OAIC: Opting in to the Privacy Act (small business exemption)", url: "https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/opting-in-to-the-privacy-act" },
  ],
};
