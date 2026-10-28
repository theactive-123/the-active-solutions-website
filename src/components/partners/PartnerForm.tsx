"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import styles from "./PartnerForm.module.css";

const SERVICES = ["Shopify development", "Web design", "PPC", "Email marketing", "Ecommerce development"];

/**
 * Partner enquiry card. There is no form backend yet, so a valid submission opens the
 * visitor's email app with the details pre-filled (addressed to the site email).
 */
export function PartnerForm() {
  const id = useId();
  const [services, setServices] = useState<string[]>(["Shopify development", "Email marketing"]);
  const [sent, setSent] = useState(false);

  const toggle = (s: string) => setServices((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const body = [
      `Name: ${d.get("name")}`,
      `Work email: ${d.get("email")}`,
      `Agency: ${d.get("agency") || "-"}`,
      `Website: ${d.get("website") || "-"}`,
      `Services: ${services.join(", ") || "-"}`,
      "",
      "Expected delivery requirements:",
      `${d.get("requirements") || "-"}`,
    ].join("\n");
    const subject = `Partnership enquiry${d.get("agency") ? ` from ${d.get("agency")}` : ""}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
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
        <textarea id={`${id}-req`} name="requirements" rows={5} placeholder="Tell us about timelines, volume and workflow…" />
      </div>

      <div className={styles.submit}>
        <Button type="submit">Become a Partner</Button>
        <p id={`${id}-status`} className={styles.status} role="status">
          {sent
            ? `Thanks! Your email app should open with your details. If it doesn't, write to ${site.email}.`
            : "We'll review the details and get back to you."}
        </p>
      </div>
    </form>
  );
}
