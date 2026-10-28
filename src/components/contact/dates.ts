import {
  BOOKING_WINDOW_DAYS,
  SLOT_HOURS,
  isBookableInstant,
  officeDateParts,
  slotInstant,
} from "./validation";

/** Calendar days are Karachi (office) dates, keyed "YYYY-MM-DD" and computed with UTC maths. */
export type DayKey = string;
export type Month = { y: number; m: number };

const pad = (n: number) => String(n).padStart(2, "0");

export const toKey = (y: number, m: number, d: number): DayKey => {
  const t = new Date(Date.UTC(y, m, d));
  return `${t.getUTCFullYear()}-${pad(t.getUTCMonth() + 1)}-${pad(t.getUTCDate())}`;
};

export const parseKey = (k: DayKey) => {
  const [y, m, d] = k.split("-").map(Number);
  return { y, m: m - 1, d };
};

export const addDays = (k: DayKey, n: number) => {
  const { y, m, d } = parseKey(k);
  return toKey(y, m, d + n);
};

export const weekdayOf = (k: DayKey) => {
  const { y, m, d } = parseKey(k);
  return new Date(Date.UTC(y, m, d)).getUTCDay();
};

export const daysInMonth = ({ y, m }: Month) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();

export const monthOf = (k: DayKey): Month => {
  const { y, m } = parseKey(k);
  return { y, m };
};

export const monthIndex = ({ y, m }: Month) => y * 12 + m;

export const addMonths = ({ y, m }: Month, n: number): Month => {
  const i = y * 12 + m + n;
  return { y: Math.floor(i / 12), m: ((i % 12) + 12) % 12 };
};

/** Same day-of-month in another month, clamped to that month's length. */
export const shiftMonth = (k: DayKey, n: number) => {
  const { d } = parseKey(k);
  const target = addMonths(monthOf(k), n);
  return toKey(target.y, target.m, Math.min(d, daysInMonth(target)));
};

export function todayKey(now: number) {
  const p = officeDateParts(now);
  return toKey(p.y, p.m, p.d);
}

export const lastBookableKey = (now: number) => addDays(todayKey(now), BOOKING_WINDOW_DAYS);

/** Bookable slot instants (ms) on an office day. */
export function slotsFor(k: DayKey, now: number): number[] {
  const { y, m, d } = parseKey(k);
  return SLOT_HOURS.map((h) => slotInstant(y, m, d, h)).filter((t) => isBookableInstant(t, now));
}

export function firstAvailableKey(now: number): DayKey | null {
  let k = todayKey(now);
  const last = lastBookableKey(now);
  while (k <= last) {
    if (slotsFor(k, now).length) return k;
    k = addDays(k, 1);
  }
  return null;
}

/** Formats an office day for display ("Thursday, Nov 5"). */
export function formatDay(k: DayKey, opts: Intl.DateTimeFormatOptions) {
  const { y, m, d } = parseKey(k);
  return new Intl.DateTimeFormat("en-US", { ...opts, timeZone: "UTC" }).format(Date.UTC(y, m, d, 12));
}

export function formatMonth({ y, m }: Month) {
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(Date.UTC(y, m, 15));
}
