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
  /** The surrounding link style, so the button and the revealed link look like their neighbours. */
  className?: string;
};

/**
 * "Click to reveal" email. The address is not in the page HTML or scripts as text, so simple
 * scrapers can't collect it. The button carries the same class as the links around it (and
 * `data-email-link` for contexts that style plain `a` elements); one click fades in the real
 * mailto link and moves focus to it.
 */
export function RevealEmail({ code, label = "Show email address", subject, body, className }: Props) {
  const [email, setEmail] = useState<string | null>(null);
  const cls = (base: string) => [base, className].filter(Boolean).join(" ");

  if (!email) {
    return (
      <button
        type="button"
        className={cls(styles.reveal)}
        data-email-link
        aria-label={`${label} (hidden to prevent spam)`}
        onClick={() => setEmail(decode(code))}
      >
        {label}
      </button>
    );
  }

  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  const [user, domain] = email.split("@");
  return (
    <a href={`mailto:${email}${query ? `?${query}` : ""}`} className={cls(styles.revealed)} data-email-link ref={(el) => el?.focus()}>
      {user}@
      <wbr />
      {domain}
    </a>
  );
}
