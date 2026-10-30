"use client";

import { useState } from "react";
import styles from "./RevealEmail.module.css";

const decode = (code: string) => [...new TextDecoder().decode(Uint8Array.from(atob(code), (c) => c.charCodeAt(0)))].reverse().join("");

type Props = {
  /** Encoded address from `encodeEmail()` (server). */
  code: string;
  label?: string;
  subject?: string;
  body?: string;
  className?: string;
};

/**
 * "Click to reveal" email: the address is not in the page HTML or scripts as text, so simple
 * scrapers can't collect it. One click shows it as a normal mailto link.
 */
export function RevealEmail({ code, label = "Click to reveal email", subject, body, className }: Props) {
  const [email, setEmail] = useState<string | null>(null);

  if (!email) {
    return (
      <button type="button" className={[styles.reveal, className].filter(Boolean).join(" ")} onClick={() => setEmail(decode(code))}>
        <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true" className={styles.icon}>
          <rect x="0.75" y="0.75" width="14.5" height="10.5" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M1.5 1.6 8 6.6l6.5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        {label}
      </button>
    );
  }

  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return (
    <a
      href={`mailto:${email}${query ? `?${query}` : ""}`}
      className={[styles.revealed, className].filter(Boolean).join(" ")}
      // Move focus to the revealed link so keyboard users can act on it straight away.
      ref={(el) => el?.focus()}
      aria-live="polite"
    >
      {email.split("@")[0]}@
      <wbr />
      {email.split("@")[1]}
    </a>
  );
}
