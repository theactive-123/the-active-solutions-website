/**
 * Shared contract + validation for POST /api/contact. Imported by the API route and by the
 * client forms (contact, meeting booking, newsletter) so both sides apply the same rules.
 */

export type ContactRequestType = "contact" | "meeting" | "newsletter";

/** Response body of POST /api/contact. */
/** `code: "not_configured"` marks the 503 the API sends when the form backend isn't set up. */
export type ApiResponse = { ok: boolean; message?: string; errors?: Record<string, string>; code?: "not_configured" };

/** Hidden honeypot field. Real visitors never fill it; the API answers 200 and drops the request. */
export const HONEYPOT_FIELD = "botcheck";

export const BUDGETS = ["Under $5k", "$5k – $15k", "$15k – $40k", "$40k+", "Not sure yet"] as const;

/** Services offered as chips on the contact form. Brand values match the landing "Tell us what you need" picks. */
export const PROJECT_SERVICES = [
  "Shopify Store",
  "Conversion Rate Optimization",
  "Performance Marketing",
  "Ecommerce Marketing",
  "Retention Marketing",
  "DTC Growth Strategy",
  "Something else",
] as const;

export const PARTNER_SERVICES = [
  "Shopify development",
  "Web design",
  "PPC",
  "Email marketing",
  "Conversion optimization",
  "White label",
  "Ecommerce development",
  "Something else",
] as const;

/** Meeting availability is defined in Karachi time (PKT, UTC+5, no daylight saving). */
export const OFFICE_UTC_OFFSET = 5;
export const OFFICE_TIME_ZONE = "Asia/Karachi";
export const SLOT_HOURS = [10, 11, 12, 14, 15, 16] as const;
/** Earliest bookable slot is this many hours from now; latest is BOOKING_WINDOW_DAYS ahead. */
export const MIN_NOTICE_HOURS = 3;
export const BOOKING_WINDOW_DAYS = 60;

type Errors = Record<string, string>;
type Input = Record<string, unknown>;

const EMAIL_RE = /^[^\s@<>()[\],;:"]+@[^\s@<>()[\],;:"]+\.[^\s@<>()[\],;:"]{2,}$/;

const str = (v: unknown, max = 5000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export function emailError(email: string): string | undefined {
  if (!email) return "Please enter your email address.";
  if (email.length > 254 || !EMAIL_RE.test(email)) return "Please enter a valid email address, like name@company.com.";
}

export function nameError(name: string): string | undefined {
  if (!name) return "Please tell us your name.";
  if (name.length < 2) return "Please enter your full name.";
  if (name.length > 100) return "Please keep your name under 100 characters.";
}

/** Accepts "mystore.com" or a full URL. Returns the normalised https URL, or null when invalid. */
export function normalizeUrl(value: string): string | null {
  const v = value.trim();
  if (!v) return "";
  try {
    const url = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`);
    if (!/^https?:$/.test(url.protocol) || !url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function urlError(value: string): string | undefined {
  if (value && normalizeUrl(value) === null) return "Please enter a valid web address, like yourstore.com.";
}

/* ------------------------------------------------------------------ contact */

export type ContactPayload = {
  kind: "project" | "partner";
  name: string;
  email: string;
  company: string;
  website: string;
  budget: string;
  services: string[];
  message: string;
  consent: boolean;
};

export function validateContact(input: Input): { data: ContactPayload; errors: Errors } {
  const kind = input.kind === "partner" ? "partner" : "project";
  const allowed: readonly string[] = kind === "partner" ? PARTNER_SERVICES : PROJECT_SERVICES;
  const data: ContactPayload = {
    kind,
    name: str(input.name, 120),
    email: str(input.email, 300),
    company: str(input.company, 160),
    website: str(input.website, 300),
    budget: str(input.budget, 40),
    services: Array.isArray(input.services)
      ? input.services.filter((s): s is string => typeof s === "string" && allowed.includes(s)).slice(0, allowed.length)
      : [],
    message: str(input.message, 5000),
    consent: input.consent === true,
  };
  const errors: Errors = {};
  const set = (k: string, e?: string) => e && (errors[k] = e);
  set("name", nameError(data.name));
  set("email", emailError(data.email));
  set("website", urlError(data.website));
  if (data.company.length > 150) errors.company = "Please keep this under 150 characters.";
  if (data.budget && !(BUDGETS as readonly string[]).includes(data.budget)) errors.budget = "Please choose a budget from the list.";
  if (!data.message) errors.message = "Please tell us a little about what you need.";
  else if (data.message.length < 10) errors.message = "Please add a few more details (at least 10 characters).";
  if (!data.consent) errors.consent = "Please agree so we can reply to your enquiry.";
  return { data, errors };
}

/* ------------------------------------------------------------------ meeting */

export type MeetingPayload = {
  name: string;
  email: string;
  storeUrl: string;
  notes: string;
  datetime: string;
  timeZone: string;
};

/** Calendar date in Karachi for an instant, as UTC-based y/m/d/weekday. */
export function officeDateParts(instant: number) {
  const d = new Date(instant + OFFICE_UTC_OFFSET * 3_600_000);
  return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate(), weekday: d.getUTCDay(), hour: d.getUTCHours(), minute: d.getUTCMinutes() };
}

/** UTC instant of a slot: Karachi date (y, m, d) at `hour`:00 PKT. */
export function slotInstant(y: number, m: number, d: number, hour: number) {
  return Date.UTC(y, m, d, hour - OFFICE_UTC_OFFSET);
}

export function isBookableInstant(instant: number, now: number): boolean {
  const p = officeDateParts(instant);
  if (p.weekday === 0 || p.weekday === 6) return false;
  if (p.minute !== 0 || !(SLOT_HOURS as readonly number[]).includes(p.hour)) return false;
  if (instant < now + MIN_NOTICE_HOURS * 3_600_000 - 15 * 60_000) return false; // 15 min grace for slow submits
  return instant <= now + (BOOKING_WINDOW_DAYS + 1) * 86_400_000;
}

export function validateMeeting(input: Input, now = Date.now()): { data: MeetingPayload; errors: Errors } {
  const data: MeetingPayload = {
    name: str(input.name, 120),
    email: str(input.email, 300),
    storeUrl: str(input.storeUrl, 300),
    notes: str(input.notes, 3000),
    datetime: str(input.datetime, 40),
    timeZone: str(input.timeZone, 64),
  };
  const errors: Errors = {};
  const set = (k: string, e?: string) => e && (errors[k] = e);
  set("name", nameError(data.name));
  set("email", emailError(data.email));
  set("storeUrl", urlError(data.storeUrl));
  if (data.notes.length > 2000) errors.notes = "Please keep notes under 2,000 characters.";
  const instant = Date.parse(data.datetime);
  if (!data.datetime) errors.datetime = "Please pick a date and time.";
  else if (Number.isNaN(instant) || !isBookableInstant(instant, now))
    errors.datetime = "That time is no longer available. Please pick another slot.";
  if (data.timeZone && !/^[A-Za-z0-9_+\-/]+$/.test(data.timeZone)) data.timeZone = "";
  return { data, errors };
}

/* --------------------------------------------------------------- newsletter */

export type NewsletterPayload = { email: string; name: string; source: string };

export function validateNewsletter(input: Input): { data: NewsletterPayload; errors: Errors } {
  const data: NewsletterPayload = { email: str(input.email, 300), name: str(input.name, 120), source: str(input.source, 120) };
  const errors: Errors = {};
  const e = emailError(data.email);
  if (e) errors.email = e;
  return { data, errors };
}

/* ------------------------------------------------------------------- client */

/**
 * POSTs to /api/contact and always resolves to an ApiResponse plus the HTTP status
 * (0 when the network request itself failed). Usable by any form on the site, e.g. the
 * /insights newsletter: `submitContact({ type: "newsletter", email, source: "insights" })`.
 */
export async function submitContact(
  body: { type: ContactRequestType } & Record<string, unknown>,
): Promise<ApiResponse & { status: number }> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });
    const json = (await res.json().catch(() => ({}))) as ApiResponse;
    const ok = res.ok && json.ok !== false;
    // Only our own "not configured" answer means the forms are switched off. Any other 503
    // (e.g. the host's gateway while the app restarts) is a temporary error worth retrying.
    const status = res.status === 503 && json.code !== "not_configured" ? 502 : res.status;
    const message = json.message ?? (ok ? undefined : "Something went wrong on our side. Please try again in a moment.");
    return { ok, message, errors: json.errors, status };
  } catch {
    return { ok: false, status: 0, message: "We couldn't reach the server. Please check your connection and try again." };
  }
}
