import { after } from "next/server";
import nodemailer from "nodemailer";
import { CONTACT_EMAIL } from "@/lib/contact-email";
import { crmConfig, sendCrmLead } from "@/lib/crm";
import { renderConfirmation, type Confirmation } from "@/lib/email/confirmation";
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
 * Validates all website forms and saves leads to CRM before acknowledging success.
 * Emails (a notification to the team and a branded thank-you to the visitor) are optional,
 * sent after the response (so a slow mail server never delays the visitor) and cannot turn
 * a saved lead into a failed submission.
 * Route handlers run on Node.js by default; a `runtime` export is not allowed with Cache Components.
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
    // dateStyle/timeStyle can't be combined with timeZoneName (it throws), so list the fields.
    return new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone,
      timeZoneName: "short",
    }).format(instant);
  } catch {
    return new Date(instant).toISOString();
  }
}

function smtpConfig() {
  return {
    host: process.env.SMTP_HOST?.trim(),
    user: process.env.SMTP_USER?.trim(),
    password: process.env.SMTP_PASSWORD,
    port: Number(process.env.SMTP_PORT?.trim() || 465),
  };
}

const smtpReady = () => {
  const { host, user, password, port } = smtpConfig();
  return !!(host && user && password && Number.isInteger(port) && port > 0 && port < 65536);
};

/** Admin inbox(es): ADMIN_EMAIL, then CONTACT_TO_EMAIL, then the public address. */
const teamInboxes = () =>
  (process.env.ADMIN_EMAIL || process.env.CONTACT_TO_EMAIL || CONTACT_EMAIL)
    .split(",")
    .map((address) => address.trim())
    .filter(Boolean);

type Mail = { to: string | string[]; replyTo: string; subject: string; html: string; text: string };

/** Sends the team notification and the visitor's thank-you over one SMTP connection. */
async function sendEmails(mails: { label: string; mail: Mail }[]) {
  if (!smtpReady()) {
    console.error("[api/contact] Emails skipped: missing or invalid SMTP configuration");
    return;
  }
  const { host, user, password, port } = smtpConfig();
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user, pass: password },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || { name: site.name, address: user! };
  // Each email is independent: a failed thank-you never blocks the team notification.
  const results = await Promise.allSettled(
    mails.map(({ mail }) => transporter.sendMail({ from, ...mail, disableFileAccess: true, disableUrlAccess: true })),
  );
  results.forEach((r, i) => {
    const label = mails[i].label;
    if (r.status === "rejected") console.error(`[api/contact] ${label} email failed:`, r.reason instanceof Error ? r.reason.message : r.reason);
    else if (!r.value.accepted.length || r.value.rejected.length) console.error(`[api/contact] ${label} email was not accepted by all recipients`);
  });
  transporter.close();
}

// Messages shown on the site never spell out the address; the forms offer it via click-to-reveal.
const UNAVAILABLE = "Our form isn't connected right now. Please email us instead and we'll reply within one business day.";

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

  let crmForm: "contact" | "partner" | "schedule" | "newsletter";
  let crmFields: Record<string, unknown>;
  let subject: string;
  let replyTo: string;
  let title: string;
  let rows: Row[];
  let success: string;
  let confirmation: Confirmation;

  switch (body.type) {
    case "contact": {
      const { data, errors } = validateContact(body);
      if (Object.keys(errors).length) return json({ ok: false, message: "Please check the highlighted fields.", errors }, 422);
      const partner = data.kind === "partner";
      crmForm = partner ? "partner" : "contact";
      crmFields = { ...data, website: normalizeUrl(data.website) || "" };
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
      confirmation = { kind: partner ? "partner" : "project", name: data.name, services: data.services, budget: data.budget };
      break;
    }
    case "meeting": {
      const { data, errors } = validateMeeting(body);
      if (Object.keys(errors).length) return json({ ok: false, message: errors.datetime ?? "Please check the highlighted fields.", errors }, 422);
      crmForm = "schedule";
      crmFields = { ...data, storeUrl: normalizeUrl(data.storeUrl) || "" };
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
      confirmation = data.timeZone
        ? { kind: "meeting", name: data.name, when: formatInZone(instant, data.timeZone), timeZone: data.timeZone }
        : { kind: "meeting", name: data.name, when: office };
      break;
    }
    case "newsletter": {
      const { data, errors } = validateNewsletter(body);
      if (Object.keys(errors).length) return json({ ok: false, message: errors.email, errors }, 422);
      crmForm = "newsletter";
      crmFields = { ...data };
      subject = oneLine(`Newsletter signup: ${data.email}`);
      replyTo = data.email;
      title = "New newsletter signup";
      rows = [
        ["Email", data.email],
        ["Name", data.name],
        ["Signed up from", data.source],
      ];
      success = "You're on the list. Look out for our next issue.";
      confirmation = { kind: "newsletter", name: data.name };
      break;
    }
    default:
      return json({ ok: false, message: "Unknown form type." }, 400);
  }

  if (!crmConfig().configured) {
    console.error("[api/contact] CRM_BASE_URL and/or CRM_SITE_API_KEY are not set on the server");
    return json({ ok: false, code: "not_configured", message: UNAVAILABLE }, 503);
  }

  const saved = await sendCrmLead(crmForm, crmFields, req);
  if (!saved) {
    return json({ ok: false, message: "We couldn't save your submission just now. Please try again in a moment." }, 502);
  }

  const { html, text } = renderEmail(title, rows);
  const thanks = renderConfirmation(confirmation);
  const team = teamInboxes();
  after(async () => {
    try {
      await sendEmails([
        { label: "Team notification", mail: { to: team, replyTo, subject, html, text } },
        // Replies to the thank-you go to the team inbox.
        { label: "Visitor thank-you", mail: { to: replyTo, replyTo: team[0] ?? CONTACT_EMAIL, ...thanks } },
      ]);
    } catch (error) {
      console.error("[api/contact] Emails failed; lead remains saved in CRM:", error instanceof Error ? error.message : error);
    }
  });
  const note = smtpReady() ? " We've sent a confirmation to your inbox." : "";
  return json({ ok: true, message: success + note });
}

/**
 * Health check: GET /api/contact shows whether the server can see its form settings
 * (true/false only, never the values).
 */
export function GET() {
  const crm = crmConfig();
  const smtp = smtpConfig();
  return Response.json(
    {
      crm: { baseUrl: crm.baseUrlValid, apiKey: crm.apiKeyValid },
      smtp: { host: !!smtp.host, port: Number.isInteger(smtp.port) && smtp.port > 0 && smtp.port < 65536, user: !!smtp.user, password: !!smtp.password },
      adminEmail: !!(process.env.ADMIN_EMAIL || process.env.CONTACT_TO_EMAIL),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}