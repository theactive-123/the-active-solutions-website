/**
 * Location pages: /locations, /locations/[country], /locations/[country]/[city].
 *
 * Content rules (Google's doorway-page policy): every page must be useful on its own.
 * - Country-wide facts (tax, payments, shipping, compliance) live ONCE on the country hub.
 * - City pages carry only city-specific content: the local market, local buying behaviour,
 *   city-specific operational notes and FAQs. Never the same paragraph with the city swapped.
 * - We work remotely: never imply a local office, local staff or local clients we don't have.
 * - Facts about markets, laws and payment methods must come from the sources listed in `sources`
 *   (not rendered; kept for review). No invented statistics.
 */

export type Source = { title: string; url: string };

/** A short titled point, e.g. one payment method or one local consideration. */
export type Point = { title: string; text: string };

export type Faq = { question: string; answer: string };

export type City = {
  slug: string; // e.g. "new-york"
  name: string; // e.g. "New York"
  /** State / province / emirate / region, e.g. "New York", "England", "Ontario". */
  region: string;
  /** IANA time zone, e.g. "America/New_York". */
  timeZone: string;
  /** <title>, 50–60 characters, e.g. "Shopify Agency in New York for DTC Brands | The Active Solutions". */
  metaTitle: string;
  /** Meta description, 140–160 characters, unique. */
  metaDescription: string;
  /** H1. Keep the main keyword: "Shopify Agency in {City}" plus a short angle; *asterisks* mark the red italic accent. */
  headline: string;
  /** One-sentence hero lead (max ~30 words), specific to this city. */
  lead: string;
  /** 2–3 paragraphs on the city's ecommerce/DTC scene and why it matters for a Shopify store. City-specific facts only. */
  intro: string[];
  /** 3–4 sectors that are genuinely strong in this city, each with why a Shopify brand there should care. */
  industries: Point[];
  /** 3–4 operational notes specific to selling from or into this city (delivery expectations, language mix,
   *  seasonality, local events, competition, logistics). Must not repeat the country hub's essentials. */
  local: Point[];
  /** 4 FAQs specific to this city (not answerable with a generic country answer). Answers 40–80 words. */
  faqs: Faq[];
  sources: Source[];
};

export type Country = {
  slug: string; // e.g. "united-states"
  name: string; // e.g. "United States"
  /** Short code shown in UI, e.g. "US". */
  code: string;
  currency: string; // e.g. "USD"
  metaTitle: string;
  metaDescription: string;
  headline: string; // H1 for the country hub, *asterisks* for the accent
  lead: string;
  /** 2–3 paragraphs on the country's ecommerce market and what DTC brands there need from a Shopify partner. */
  intro: string[];
  /** Country-wide Shopify essentials: 5–6 points covering payments/BNPL, sales tax/VAT/GST, shipping & carriers,
   *  consumer law/returns, privacy & cookies, language/currency. Accurate, sourced, practical. */
  essentials: Point[];
  /** How working with us from a different time zone works for this country (honest; 1 paragraph). */
  workingTogether: string;
  /** Slugs of case studies from src/content/work.ts that are relevant (market or industry). May be empty. */
  caseStudies: string[];
  faqs: Faq[];
  cities: City[];
  sources: Source[];
};
