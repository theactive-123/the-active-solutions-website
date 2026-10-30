"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { RevealEmail } from "@/components/ui/RevealEmail";
import { HONEYPOT_FIELD, submitContact } from "@/components/contact/validation";
import { site } from "@/lib/site";
import styles from "./PartnerForm.module.css";

const SERVICES = ["Shopify development", "Web design", "PPC", "Email marketing", "Ecommerce development"];

type Status = { state: "idle" | "sending" | "sent" | "error" | "fallback"; message?: string; mailBody?: string };

/**
 * Partner enquiry card. Posts to /api/contact as a partner enquiry. If email delivery isn't
 * configured (503) it offers the visitor's email app with the details pre-filled instead.
 */
/** `emailCode`: encoded contact address (lib/contact-email) for the click-to-reveal fallback. */
export function PartnerForm({ emailCode }: { emailCode: string }) {
  const id = useId();
  const [services, setServices] = useState<string[]>(["Shopify development", "Email marketing"]);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const statusRef = useRef<HTMLParagraphElement>(null);

  const toggle = (s: string) => setServices((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const get = (k: string) => String(d.get(k) ?? "").trim();
    setStatus({ state: "sending" });
    const res = await submitContact({
      type: "contact",
      kind: "partner",
      name: get("name"),
      email: get("email"),
      company: get("agency"),
      website: get("website"),
      services,
      message: get("requirements"),
      consent: d.get("consent") === "on",
      [HONEYPOT_FIELD]: get(HONEYPOT_FIELD),
    });
    if (res.ok) {
      form.reset();
      setStatus({ state: "sent", message: res.message || "Thanks! We'll review the details and reply within one business day." });
    } else if (res.status === 503) {
      const body = [
        `Name: ${get("name")}`,
        `Work email: ${get("email")}`,
        `Agency: ${get("agency") || "-"}`,
        `Website: ${get("website") || "-"}`,
        `Services: ${services.join(", ") || "-"}`,
        "",
        get("requirements"),
      ].join("\n");
      setStatus({ state: "fallback", message: "Online sending isn't available right now. You can email us your details instead:", mailBody: body });
    } else {
      const first = res.errors && Object.values(res.errors)[0];
      setStatus({ state: "error", message: first || res.message || "Something went wrong. Please try again." });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  return (
    <form className={styles.card} onSubmit={onSubmit} aria-describedby={`${id}-status`} data-reveal="up">
      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor={`${id}-name`}>Your name</label>
          <input id={`${id}-name`} name="name" type="text" autoComplete="name" placeholder="Full name" required />
        </div>
        <div className={styles.field}>
          <label htmlFor={`${id}-email`}>Work email</label>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="name@agency.com" required />
        </div>
        <div className={styles.field}>
          <label htmlFor={`${id}-agency`}>Agency name</label>
          <input id={`${id}-agency`} name="agency" type="text" autoComplete="organization" placeholder="Agency name" />
        </div>
        <div className={styles.field}>
          <label htmlFor={`${id}-website`}>Agency website</label>
          <input id={`${id}-website`} name="website" type="url" autoComplete="url" placeholder="https://" />
        </div>
      </div>

      <fieldset className={styles.chips}>
        <legend>Services you need support with</legend>
        <div className={styles.chipRow}>
          {SERVICES.map((s) => (
            <label key={s} className={styles.chip} data-on={services.includes(s)}>
              <input type="checkbox" name="services" value={s} checked={services.includes(s)} onChange={() => toggle(s)} />
              {s}
            </label>
          ))}
        </div>
      </fieldset>

      <div className={styles.field}>
        <label htmlFor={`${id}-req`}>Expected delivery requirements</label>
        <textarea
          id={`${id}-req`}
          name="requirements"
          rows={5}
          minLength={10}
          required
          placeholder="Tell us about timelines, volume and workflow…"
        />
      </div>

      <label className={styles.consent}>
        <input type="checkbox" name="consent" required />
        <span>
          I agree to {site.name} using my details to reply to this enquiry, as described in the <Link href="/privacy">Privacy Policy</Link>.
        </span>
      </label>

      {/* Honeypot: hidden from people, tempting to bots */}
      <div className={styles.hp} aria-hidden="true">
        <label htmlFor={`${id}-hp`}>Leave this empty</label>
        <input id={`${id}-hp`} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.submit}>
        <Button type="submit" disabled={status.state === "sending"} aria-busy={status.state === "sending"}>
          {status.state === "sending" ? "Sending…" : "Become a Partner"}
        </Button>
        <p id={`${id}-status`} ref={statusRef} tabIndex={-1} className={styles.status} role="status" data-state={status.state}>
          {status.message ?? "We'll review the details and get back to you."}
          {status.mailBody !== undefined && (
            <>
              {" "}
              <RevealEmail code={emailCode} label="show our email address" subject="Partnership enquiry" body={status.mailBody} />
            </>
          )}
        </p>
      </div>
    </form>
  );
}
