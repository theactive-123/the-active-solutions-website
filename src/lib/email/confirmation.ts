import { site } from "@/lib/site";

/**
 * Branded "thank you" email sent to the visitor after a form submission.
 *
 * Email clients need table layout, inline styles and web-safe fonts. Only safe, validated details
 * are echoed back (first name, chosen services, the requested meeting time); free text such as the
 * message, company or URL is never repeated, so the form cannot be used to send arbitrary content
 * to someone else's inbox.
 */

export type Confirmation =
  | { kind: "project" | "partner"; name: string; services: string[]; budget?: string }
  | { kind: "meeting"; name: string; when: string; timeZone?: string }
  | { kind: "newsletter"; name?: string };

const RED = "#ea2229";
const INK = "#0b0b0c";
const PAPER = "#f4f2ee";
const MUTED = "#5f5f63";
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

const escapeHtml = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** First name only, letters/spaces/hyphens/apostrophes, max 40 characters. */
export function firstName(name = "") {
  const first = name.trim().split(/\s+/)[0] ?? "";
  return first.replace(/[^\p{L}\p{M}'’-]/gu, "").slice(0, 40);
}

type Copy = {
  subject: string;
  preheader: string;
  title: string;
  accent: string;
  intro: string;
  summary: [string, string][];
  steps: [string, string][];
  cta: { label: string; href: string };
};

function copyFor(c: Confirmation): Copy {
  const name = firstName(c.name);
  const hi = name ? `, ${name}` : "";
  switch (c.kind) {
    case "project":
      return {
        subject: `Thanks${hi}, we've got your enquiry`,
        preheader: "Your message reached our team. A senior team member will reply within one business day.",
        title: `Thanks${hi}.`,
        accent: "Your enquiry is in.",
        intro: "Thank you for telling us about your store. A senior member of our team reads every enquiry personally, and you'll hear back from us within one business day.",
        summary: [
          ["Services", c.services.join(", ")],
          ["Budget", c.budget ?? ""],
        ],
        steps: [
          ["We review your store", "We look at your storefront, goals and the details you shared."],
          ["We reply within one business day", "With first thoughts and any questions we have."],
          ["We scope it together", "A short call, then a clear project scope and timeline."],
        ],
        cta: { label: "See our work", href: `${site.url}/work` },
      };
    case "partner":
      return {
        subject: `Thanks${hi}, we've got your partner enquiry`,
        preheader: "Your white-label partnership enquiry reached our team. We'll reply within one business day.",
        title: `Thanks${hi}.`,
        accent: "Let's build together.",
        intro: "Thank you for your interest in partnering with us. We'll review your delivery requirements and come back within one business day to discuss a practical white-label arrangement.",
        summary: [
          ["Support with", c.services.join(", ")],
          ["Budget", c.budget ?? ""],
        ],
        steps: [
          ["We review your requirements", "Services, volumes, timelines and how your team works."],
          ["We reply within one business day", "With questions and a suggested way of working."],
          ["We agree the setup", "Process, communication and a first project to start with."],
        ],
        cta: { label: "How partnerships work", href: `${site.url}/partners` },
      };
    case "meeting":
      return {
        subject: `Thanks${hi}, your meeting request is in`,
        preheader: "We've received your meeting request and will confirm it with a meeting link within one business day.",
        title: `Thanks${hi}.`,
        accent: "Let's talk soon.",
        intro: "We've received your request for a 30-minute online call. We'll confirm the time by email with a meeting link within one business day. If the time doesn't work for us, we'll suggest the closest alternative.",
        summary: [
          ["Requested time", c.when + (c.timeZone ? ` (${c.timeZone})` : "")],
          ["Format", "30-minute online call"],
        ],
        steps: [
          ["We check the time", "Against our calendar in Karachi (PKT)."],
          ["You get a confirmation", "With a calendar invite and meeting link."],
          ["We talk about your store", "Bring your goals; we'll bring ideas."],
        ],
        cta: { label: "Read our case studies", href: `${site.url}/case-studies` },
      };
    case "newsletter":
      return {
        subject: "You're on the list",
        preheader: "Thanks for subscribing to The Active Solutions insights.",
        title: `Welcome${hi}.`,
        accent: "You're on the list.",
        intro: "Thanks for subscribing. We'll send practical articles on Shopify, conversion optimization, paid media and retention when we publish them. No spam, and you can unsubscribe any time.",
        summary: [],
        steps: [],
        cta: { label: "Read the latest insights", href: `${site.url}/insights` },
      };
  }
}

export function renderConfirmation(c: Confirmation) {
  const copy = copyFor(c);
  const rows = copy.summary.filter(([, v]) => v);
  const logo = `${site.url}/images/brand/logo-mark.png`;
  const address = `${site.address.street}, ${site.address.city} ${site.address.postalCode}, ${site.address.countryName}`;

  const summaryHtml = rows.length
    ? `<tr><td style="padding:8px 40px 0" class="px">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};border-radius:14px">
    ${rows
      .map(
        ([k, v], i) => `<tr><td style="padding:${i ? "0" : "18px"} 22px 18px">
      <div style="font:600 11px/1.4 ${SANS};letter-spacing:.08em;text-transform:uppercase;color:${MUTED}">${escapeHtml(k)}</div>
      <div style="font:500 15px/1.5 ${SANS};color:${INK};margin-top:4px">${escapeHtml(v)}</div>
    </td></tr>`,
      )
      .join("")}
  </table>
</td></tr>`
    : "";

  const stepsHtml = copy.steps.length
    ? `<tr><td style="padding:32px 40px 0" class="px">
  <div style="font:600 12px/1.4 ${SANS};letter-spacing:.08em;text-transform:uppercase;color:${MUTED};padding-bottom:6px">[ What happens next ]</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    ${copy.steps
      .map(
        ([t, d], i) => `<tr>
      <td width="44" valign="top" style="padding:14px 0 0"><div style="width:30px;height:30px;border-radius:15px;background:${i === 0 ? RED : INK};color:#ffffff;font:600 13px/30px ${SANS};text-align:center">${String(i + 1).padStart(2, "0")}</div></td>
      <td valign="top" style="padding:14px 0 0;border-bottom:${i < copy.steps.length - 1 ? "1px solid #e7e4de" : "0"}">
        <div style="font:600 15px/1.4 ${SANS};color:${INK}">${escapeHtml(t)}</div>
        <div style="font:400 14px/1.55 ${SANS};color:${MUTED};padding:2px 0 14px">${escapeHtml(d)}</div>
      </td>
    </tr>`,
      )
      .join("")}
  </table>
</td></tr>`
    : "";

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${escapeHtml(copy.subject)}</title>
<style>
  @media (max-width: 620px) {
    .card { border-radius: 0 !important; }
    .px { padding-left: 24px !important; padding-right: 24px !important; }
    .title { font-size: 32px !important; }
    .tagline { display: none !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${PAPER};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${escapeHtml(copy.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER}">
<tr><td align="center" style="padding:32px 12px">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" class="card" style="width:100%;max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden">

    <tr><td style="background:${INK};padding:26px 40px" class="px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td valign="middle" style="white-space:nowrap"><a href="${site.url}" style="text-decoration:none;white-space:nowrap">
          <img src="${logo}" width="34" height="31" alt="" style="display:inline-block;vertical-align:middle;border:0">
          <span style="display:inline-block;vertical-align:middle;margin-left:10px;font:400 17px/1 ${SANS};color:#ffffff">The <b style="font-weight:700">Active</b> Solutions</span>
        </a></td>
        <td align="right" valign="middle" class="tagline" style="font:500 11px/1.4 ${SANS};letter-spacing:.08em;color:rgba(255,255,255,.6);text-transform:uppercase">Shopify &amp; DTC growth</td>
      </tr></table>
    </td></tr>
    <tr><td style="height:4px;line-height:4px;font-size:0;background:${RED}">&nbsp;</td></tr>

    <tr><td style="padding:40px 40px 0" class="px">
      <div class="title" style="font:700 38px/1.1 ${SANS};letter-spacing:-.02em;color:${INK}">${escapeHtml(copy.title)}</div>
      <div class="title" style="font:italic 600 38px/1.15 ${SERIF};color:${RED};margin-top:2px">${escapeHtml(copy.accent)}</div>
      <p style="font:400 16px/1.65 ${SANS};color:#3a3a3e;margin:20px 0 22px">${escapeHtml(copy.intro)}</p>
    </td></tr>

    ${summaryHtml}
    ${stepsHtml}

    <tr><td style="padding:32px 40px 40px" class="px">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="border-radius:40px;background:${RED}">
          <a href="${copy.cta.href}" style="display:inline-block;padding:14px 28px;font:600 15px/1 ${SANS};color:#ffffff;text-decoration:none;border-radius:40px">${escapeHtml(copy.cta.label)} &rarr;</a>
        </td>
      </tr></table>
      <p style="font:400 14px/1.6 ${SANS};color:${MUTED};margin:24px 0 0">Have something to add? Just reply to this email, it comes straight to our team.</p>
      <p style="font:400 15px/1.6 ${SANS};color:${INK};margin:18px 0 0">The Active Solutions team</p>
    </td></tr>

    <tr><td style="background:${INK};padding:28px 40px" class="px">
      <div style="font:400 13px/1.7 ${SANS};color:rgba(255,255,255,.7)">
        <a href="${site.url}" style="color:#ffffff;text-decoration:none">theactivesolutions.com</a>
        &nbsp;·&nbsp; <a href="mailto:${site.email}" style="color:#ffffff;text-decoration:none">${site.email}</a><br>
        ${escapeHtml(address)}
      </div>
      <div style="font:400 12px/1.6 ${SANS};color:rgba(255,255,255,.45);margin-top:14px">You're receiving this email because this address was used on a form at theactivesolutions.com.${
        c.kind === "newsletter" ? " To unsubscribe, reply with &ldquo;unsubscribe&rdquo;." : " If that wasn't you, you can ignore it."
      }</div>
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>`;

  const text = [
    `${copy.title} ${copy.accent}`,
    "",
    copy.intro,
    ...(rows.length ? ["", ...rows.map(([k, v]) => `${k}: ${v}`)] : []),
    ...(copy.steps.length ? ["", "What happens next:", ...copy.steps.map(([t, d], i) => `${i + 1}. ${t}: ${d}`)] : []),
    "",
    `${copy.cta.label}: ${copy.cta.href}`,
    "",
    "Have something to add? Just reply to this email.",
    "",
    "The Active Solutions team",
    `${site.url} · ${site.email}`,
    address,
  ].join("\n");

  return { subject: copy.subject.replace(/[\r\n]+/g, " ").slice(0, 150), html, text };
}
