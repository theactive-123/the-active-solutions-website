import type { HeroKind } from "./Heroes";
import type { BlockLayout, IntroKind, PlacesKind, PointsKind, ServicesKind, Theme, TogetherKind } from "./Variants";

/**
 * Each country has its own page design, used by its hub and its five city pages, so the
 * markets don't look like copies of each other. Cities then vary inside the design (see cityRecipe).
 *
 * Section order on a hub:  intro · points A (essentials) · services · cities (theme B) · together
 * Section order on a city: intro · points A (sectors) · services · points B (local) · together · work · nearby · FAQ
 * Themes are chosen so no two neighbouring sections share a background.
 */
export type Recipe = {
  hero: HeroKind;
  layout: BlockLayout;
  intro: IntroKind;
  pointsA: PointsKind;
  pointsB: PointsKind;
  services: ServicesKind;
  together: TogetherKind;
  places: PlacesKind;
  faq: "accordion" | "cards";
  themes: { intro: Theme; a: Theme; services: Theme; b: Theme; nearby: Theme; faq: Theme };
};

const recipes: Record<string, Recipe> = {
  // Editorial: giant outlined place name, magazine intro, indexed rows
  "united-states": {
    hero: "giant",
    layout: "stack",
    intro: "magazine",
    pointsA: "index",
    pointsB: "accordion",
    services: "rows",
    together: "clock",
    places: "rows",
    faq: "cards",
    themes: { intro: "paper", a: "sand", services: "dark", b: "paper", nearby: "paper", faq: "sand" },
  },
  // Ledger: at-a-glance panel, sticky section titles, tabs and a timeline
  "united-kingdom": {
    hero: "panel",
    layout: "sticky",
    intro: "sidebar",
    pointsA: "tabs",
    pointsB: "timeline",
    services: "tiles",
    together: "card",
    places: "chips",
    faq: "accordion",
    themes: { intro: "paper", a: "dark", services: "paper", b: "sand", nearby: "paper", faq: "sand" },
  },
  // Centred: running band of city names, bento sectors, sideways scroller
  canada: {
    hero: "centered",
    layout: "center",
    intro: "lead",
    pointsA: "bento",
    pointsB: "scroller",
    services: "rows",
    together: "clock",
    places: "cards",
    faq: "accordion",
    themes: { intro: "paper", a: "sand", services: "dark", b: "paper", nearby: "paper", faq: "sand" },
  },
  // Bento: fact tiles in the hero, scroller sectors, coloured service tiles
  australia: {
    hero: "bento",
    layout: "stack",
    intro: "sidebar",
    pointsA: "scroller",
    pointsB: "index",
    services: "tiles",
    together: "clock",
    places: "rows",
    faq: "cards",
    themes: { intro: "sand", a: "paper", services: "dark", b: "sand", nearby: "paper", faq: "dark" },
  },
  // Full-bleed: full-height hero, dark statement intro, accordion and bento
  "united-arab-emirates": {
    hero: "fullbleed",
    layout: "center",
    intro: "lead",
    pointsA: "accordion",
    pointsB: "bento",
    services: "rows",
    together: "card",
    places: "chips",
    faq: "cards",
    themes: { intro: "dark", a: "paper", services: "dark", b: "sand", nearby: "paper", faq: "sand" },
  },
  // Split: boxed lead beside the headline, sticky titles, timeline and tabs
  "saudi-arabia": {
    hero: "split",
    layout: "sticky",
    intro: "magazine",
    pointsA: "timeline",
    pointsB: "tabs",
    services: "cards",
    together: "clock",
    places: "cards",
    faq: "accordion",
    themes: { intro: "paper", a: "sand", services: "dark", b: "paper", nearby: "paper", faq: "sand" },
  },
};

export const countryRecipe = (slug: string): Recipe => recipes[slug] ?? recipes["united-states"];

/**
 * A city's version of its country's design: every other city swaps the two point layouts,
 * the FAQ style alternates, and section titles switch between sticky and stacked, so the five
 * cities of one country differ from each other too.
 */
export function cityRecipe(countrySlug: string, index: number): Recipe {
  const r = countryRecipe(countrySlug);
  const odd = index % 2 === 1;
  return {
    ...r,
    pointsA: odd ? r.pointsB : r.pointsA,
    pointsB: odd ? r.pointsA : r.pointsB,
    faq: index % 3 === 2 ? (r.faq === "cards" ? "accordion" : "cards") : r.faq,
    layout: index === 4 ? (r.layout === "sticky" ? "stack" : "sticky") : r.layout,
  };
}
