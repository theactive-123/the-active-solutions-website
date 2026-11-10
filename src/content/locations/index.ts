import { SLOT_HOURS, OFFICE_TIME_ZONE } from "@/components/contact/validation";
import { australia } from "./australia";
import { canada } from "./canada";
import { saudiArabia } from "./saudi-arabia";
import type { City, Country } from "./types";
import { unitedArabEmirates } from "./united-arab-emirates";
import { unitedKingdom } from "./united-kingdom";
import { unitedStates } from "./united-states";

export type { City, Country, Faq, Point } from "./types";

/** Order shown on /locations and in the footer. */
export const countries: Country[] = [unitedStates, unitedKingdom, canada, australia, unitedArabEmirates, saudiArabia];

export const LOCATIONS_PATH = "/locations";
export const countryPath = (country: string) => `${LOCATIONS_PATH}/${country}`;
export const cityPath = (country: string, city: string) => `${LOCATIONS_PATH}/${country}/${city}`;

export const getCountry = (slug: string) => countries.find((c) => c.slug === slug);
export function getCity(countrySlug: string, citySlug: string): { country: Country; city: City } | undefined {
  const country = getCountry(countrySlug);
  const city = country?.cities.find((c) => c.slug === citySlug);
  return country && city ? { country, city } : undefined;
}

/* ------------------------------------------------------------------ time-zone overlap */

/** Minutes east of UTC for a zone on a given date. */
function offsetMinutes(timeZone: string, at: Date) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" }).formatToParts(at);
  const m = (parts.find((p) => p.type === "timeZoneName")?.value ?? "GMT").match(/GMT([+-])(\d{2}):?(\d{2})?/);
  return m ? (m[1] === "-" ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3] ?? 0)) : 0;
}

const fmt = (minutes: number) => {
  const m = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  const ampm = h < 12 ? "am" : "pm";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}${mm ? `:${String(mm).padStart(2, "0")}` : ""}${ampm}`;
};

/** Call start-time ranges in office time, e.g. [[10,12],[14,16]] from SLOT_HOURS 10,11,12,14,15,16. */
const OFFICE_BLOCKS: [number, number][] = SLOT_HOURS.reduce<[number, number][]>((blocks, h) => {
  const last = blocks[blocks.length - 1];
  if (last && last[1] + 1 === h) last[1] = h;
  else blocks.push([h, h]);
  return blocks;
}, []);

/**
 * Our live-call start times (the booking slots) in a city's local time, e.g. "5am–7am & 9am–11am".
 * Computed for mid-January and mid-July: when daylight saving changes the result, both are given.
 */
export function callWindows(timeZone: string): { label: string; seasonal?: string } {
  const at = (month: number) => {
    const d = new Date(Date.UTC(2026, month, 15, 12));
    const diff = offsetMinutes(timeZone, d) - offsetMinutes(OFFICE_TIME_ZONE, d);
    return OFFICE_BLOCKS.map(([a, b]) => `${fmt(a * 60 + diff)}–${fmt(b * 60 + diff)}`).join(" & ");
  };
  const winter = at(0);
  const summer = at(6);
  if (winter === summer) return { label: winter };
  // Northern-hemisphere zones observe DST in July; southern ones in January.
  const southern = offsetMinutes(timeZone, new Date(Date.UTC(2026, 0, 15))) > offsetMinutes(timeZone, new Date(Date.UTC(2026, 6, 15)));
  return southern ? { label: summer, seasonal: `${winter} in daylight saving time` } : { label: winter, seasonal: `${summer} in daylight saving time` };
}
