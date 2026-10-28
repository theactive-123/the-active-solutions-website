import { site } from "@/lib/site";
import {
  HONEYPOT_FIELD,
  OFFICE_TIME_ZONE,
  normalizeUrl,
  validateContact,
  validateMeeting,
  validateNewsletter,
  type ApiResponse,
} from "@/components/contact/validation";

/**
 * POST /api/contact — JSON body `{ type: "contact" | "meeting" | "newsletter", …fields }`.
 * Responds `{ ok, message?, errors? }`. Mail goes out through Resend's REST API when
 * RESEND_API_KEY is set (see .env.example); without it the route answers 503 so the UI can
 * fall back to a mailto: link.
 */

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now = Date.now()) {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Keep the map from growing without bound on a long-lived server.
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
  }
  return recent.length > RATE_LIMIT;
}

function clientIp(req: Request) {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown").trim();
}

const json = (body: ApiResponse, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

const escapeHtml = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Strips CR/LF so user input can never inject extra lines into a subject header. */
const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ").slice(0, 150);

type Row = [label: string, value: string];

function renderEmail(title: string, rows: Row[]) {
  const filled = rows.filter(([, v]) => v);
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f4f2ee;font-family:Arial,Helvetica,sans-serif;color:#0b0b0c">
<table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:#fff;border-radius:16px;padding:28px" cellpadding="0" cellspacing="0">
<tr><td style="padding-bottom:16px;font-size:20px;font-weight:bold;border-bottom:2px solid #ea2229">${escapeHtml(title)}</td></tr>
${filled
  .map(
    ([k, v]) =>
      `<tr><td style="padding:14px 0 0"><div style="font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#6b6b6b">${escapeHtml(
        k,
      )}</div><div style="font-size:15px;line-height:1.55;white-space:pre-wrap">${escapeHtml(v)}</div></td></tr>`,
  )
  .join("\n")}
</table></body></html>`;
  const text = `${title}\n\n${filled.map(([k, v]) => `${k}:\n${v}`).join("\n\n")}\n`;
  return { html, text };
}

function formatInZone(instant: number, timeZone: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", { dateStyle: "full", timeStyle: "short", timeZone, timeZoneName: "short" }).format(instant);
  } catch {
    return new Date(instant).toISOString();
  }
}

async function sendEmail(apiKey: string, mail: { subject: string; replyTo: string; html: string; text: string }) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "The Active Solutions <onboarding@resend.dev>",
      to: (process.env.CONTACT_TO_EMAIL || site.email)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      reply_to: mail.replyTo,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) {
    console.error("[api/contact] Resend error", res.status, await res.text().catch(() => ""));
    return false;
  }
  return true;
}

const UNAVAILABLE = `Our form isn't connected right now. Please email us at ${site.email} and we'll reply within one business day.`;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await req.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400);
  }

  // Honeypot: pretend everything worked so bots learn nothing.
  const trap = body[HONEYPOT_FIELD];
  if (typeof trap === "string" && trap.trim() !== "") return json({ ok: true, message: "Thanks, we'll be in touch." });

  if (rateLimited(clientIp(req))) {
    return json({ ok: false, message: "Too many requests. Please wait a minute and try again." }, 429);
  }

  let subject: string;
  let replyTo: string;
  let title: string;
  let rows: Row[];
  let success: string;

  switch (body.type) {
    case "contact": {
      const { data, errors } = validateContact(body);
      if (Object.keys(errors).length) return json({ ok: false, message: "Please check the highlighted fields.", errors }, 422);
      const partner = data.kind === "partner";
      subject = oneLine(`${partner ? "Partner enquiry" : "New enquiry"}: ${data.name}${data.company ? ` (${data.company})` : ""}`);
      replyTo = data.email;
      title = partner ? "New agency partner enquiry" : "New project enquiry";
      rows = [
        ["Name", data.name],
        ["Email", data.email],
        [partner ? "Agency" : "Company / brand", data.company],
        [partner ? "Agency website" : "Store URL", normalizeUrl(data.website) || ""],
        ["Budget", data.budget],
        ["Services", data.services.join(", ")],
        [partner ? "Delivery requirements" : "Message", data.message],
      ];
      success = "Thanks! Your message is in. We'll reply within one business day.";
      break;
    }
    case "meeting": {
      const { data, errors } = validateMeeting(body);
      if (Object.keys(errors).length) return json({ ok: false, message: errors.datetime ?? "Please check the highlighted fields.", errors }, 422);
      const instant = Date.parse(data.datetime);
      const office = formatInZone(instant, OFFICE_TIME_ZONE);
      subject = oneLine(`Meeting request: ${data.name}, ${office}`);
      replyTo = data.email;
      title = "New meeting request (30 min, online)";
      rows = [
        ["Requested time (Karachi)", office],
        ["Visitor's time", data.timeZone ? `${formatInZone(instant, data.timeZone)} (${data.timeZone})` : ""],
        ["ISO datetime", new Date(instant).toISOString()],
        ["Name", data.name],
        ["Email", data.email],
        ["Store URL", normalizeUrl(data.storeUrl) || ""],
        ["Notes", data.notes],
      ];
      success = "Request received. We'll confirm by email with a meeting link within one business day.";
      break;
    }
    case "newsletter": {
      const { data, errors } = validateNewsletter(body);
      if (Object.keys(errors).length) return json({ ok: false, message: errors.email, errors }, 422);
      subject = oneLine(`Newsletter signup: ${data.email}`);
      replyTo = data.email;
      title = "New newsletter signup";
      rows = [
        ["Email", data.email],
        ["Name", data.name],
        ["Signed up from", data.source],
      ];
      success = "You're on the list. Look out for our next issue.";
      break;
    }
    default:
      return json({ ok: false, message: "Unknown form type." }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return json({ ok: false, message: UNAVAILABLE }, 503);

  const { html, text } = renderEmail(title, rows);
  let sent = false;
  try {
    sent = await sendEmail(apiKey, { subject, replyTo, html, text });
  } catch (err) {
    console.error("[api/contact] send failed", err);
  }
  if (!sent) {
    return json({ ok: false, message: `We couldn't send your message just now. Please try again or email us at ${site.email}.` }, 502);
  }
  return json({ ok: true, message: success });
}
