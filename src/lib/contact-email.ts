import "server-only";

/**
 * The public contact address. Server-only on purpose: it is never rendered as plain text or
 * bundled into client JavaScript. Pages show it through <Email /> (click to reveal), which only
 * receives an encoded copy; forms, emails and the API read it from here.
 */
export const CONTACT_EMAIL = (process.env.CONTACT_EMAIL || process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@theactivesolutions.com").trim();

/** Reversed + base64, decoded in the browser by <RevealEmail /> only when the visitor asks for it. */
export const encodeEmail = (email = CONTACT_EMAIL) => Buffer.from([...email].reverse().join(""), "utf8").toString("base64");
