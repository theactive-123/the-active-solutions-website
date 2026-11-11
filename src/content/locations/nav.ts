/**
 * Lightweight list of the locations for the header menu (a client component), so the full
 * location content is not shipped to the browser. Kept in sync with `countries` in ./index.ts,
 * which checks it at build time.
 */
export type NavCountry = { slug: string; name: string; code: string; cities: { slug: string; name: string }[] };

const c = (slug: string, name: string) => ({ slug, name });

export const locationNav: NavCountry[] = [
  { slug: "united-states", name: "United States", code: "US", cities: [c("new-york", "New York"), c("los-angeles", "Los Angeles"), c("miami", "Miami"), c("austin", "Austin"), c("chicago", "Chicago")] },
  { slug: "united-kingdom", name: "United Kingdom", code: "UK", cities: [c("london", "London"), c("manchester", "Manchester"), c("birmingham", "Birmingham"), c("leeds", "Leeds"), c("edinburgh", "Edinburgh")] },
  { slug: "canada", name: "Canada", code: "CA", cities: [c("toronto", "Toronto"), c("vancouver", "Vancouver"), c("montreal", "Montreal"), c("calgary", "Calgary"), c("ottawa", "Ottawa")] },
  { slug: "australia", name: "Australia", code: "AU", cities: [c("sydney", "Sydney"), c("melbourne", "Melbourne"), c("brisbane", "Brisbane"), c("perth", "Perth"), c("adelaide", "Adelaide")] },
  { slug: "united-arab-emirates", name: "United Arab Emirates", code: "UAE", cities: [c("dubai", "Dubai"), c("abu-dhabi", "Abu Dhabi"), c("sharjah", "Sharjah"), c("ajman", "Ajman"), c("ras-al-khaimah", "Ras Al Khaimah")] },
  { slug: "saudi-arabia", name: "Saudi Arabia", code: "KSA", cities: [c("riyadh", "Riyadh"), c("jeddah", "Jeddah"), c("dammam", "Dammam"), c("al-khobar", "Al Khobar"), c("medina", "Medina")] },
];
