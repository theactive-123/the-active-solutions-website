"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { Honeypot, SelectField, Spinner, SuccessMark, TextArea, TextField } from "./Fields";
import { BUDGETS, PARTNER_SERVICES, PROJECT_SERVICES, submitContact, validateContact, type ContactPayload } from "./validation";
import styles from "./Form.module.css";

type Kind = ContactPayload["kind"];
type Values = Omit<ContactPayload, "kind">;
type Status = "idle" | "sending" | "success" | "error" | "unavailable";

const COPY = {
  project: {
    company: "Brand / company",
    companyPh: "Your brand",
    website: "Store URL",
    budget: "Estimated budget",
    services: "What do you need help with?",
    message: "Tell us about your store",
    messagePh: "Your goals, current challenges and timeline…",
    submit: "Send enquiry",
  },
  partner: {
    company: "Agency name",
    companyPh: "Agency name",
    website: "Agency website",
    budget: "Monthly budget",
    services: "Services you need support with",
    message: "Expected delivery requirements",
    messagePh: "Tell us about timelines, volume and workflow…",
    submit: "Become a Partner",
  },
} as const;

const servicesFor = (kind: Kind): readonly string[] => (kind === "partner" ? PARTNER_SERVICES : PROJECT_SERVICES);

/** Matches ?need= values (from the landing "Tell us what you need" builder) to chip labels. */
function matchServices(kind: Kind, needs: string[]) {
  const list = servicesFor(kind);
  return needs.map((n) => list.find((s) => s.toLowerCase() === n.trim().toLowerCase())).filter((s): s is string => !!s);
}

const EMPTY: Values = { name: "", email: "", company: "", website: "", budget: "", services: [], message: "", consent: false };

/**
 * Project / partner enquiry form. `initialKind` + `initialNeeds` come from the URL
 * (?type=partner, ?need=Shopify Store,Conversion Rate Optimization) via ContactFormFromParams.
 */
export function ContactForm({ initialKind = "project", initialNeeds = [] }: { initialKind?: Kind; initialNeeds?: string[] }) {
  const uid = useId().replace(/:/g, "");
  const id = (f: string) => `${uid}-${f}`;
  const [kind, setKind] = useState<Kind>(initialKind);
  const [values, setValues] = useState<Values>(() => ({ ...EMPTY, services: matchServices(initialKind, initialNeeds) }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [trap, setTrap] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const copy = COPY[kind];
  // Where focus should go after the next render (set by submit; applied once the DOM is updated).
  const [focusReq, setFocusReq] = useState<{ to: "invalid" | "status" | "success"; n: number } | null>(null);
  const requestFocus = (to: "invalid" | "status" | "success") => setFocusReq((r) => ({ to, n: (r?.n ?? 0) + 1 }));

  useEffect(() => {
    if (!focusReq) return;
    if (focusReq.to === "success") successRef.current?.focus();
    else if (focusReq.to === "status") statusRef.current?.focus();
    else formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
  }, [focusReq]);

  const revalidate = (next: Values, k: Kind, fields: Record<string, boolean>) => {
    const { errors: all } = validateContact({ ...next, kind: k });
    setErrors(Object.fromEntries(Object.entries(all).filter(([f]) => fields[f])));
  };

  const update = <K extends keyof Values>(field: K, value: Values[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field] || errors[field]) revalidate(next, kind, { ...touched, [field]: true });
  };

  const blur = (field: keyof Values) => {
    const t = { ...touched, [field]: true };
    setTouched(t);
    revalidate(values, kind, t);
  };

  const switchKind = (k: Kind) => {
    setKind(k);
    const list = servicesFor(k);
    setValues((v) => ({ ...v, services: v.services.filter((s) => list.includes(s)) }));
  };

  const toggleService = (s: string) =>
    update("services", values.services.includes(s) ? values.services.filter((x) => x !== s) : [...values.services, s]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    const { errors: all } = validateContact({ ...values, kind });
    setErrors(all);
    setTouched(Object.fromEntries(Object.keys(EMPTY).map((k) => [k, true])));
    if (Object.keys(all).length) {
      requestFocus("invalid");
      return;
    }
    setStatus("sending");
    setMessage("");
    const res = await submitContact({ type: "contact", kind, ...values, botcheck: trap });
    if (res.ok) {
      setStatus("success");
      setMessage(res.message ?? "");
      requestFocus("success");
      return;
    }
    if (res.errors && Object.keys(res.errors).length) {
      setErrors(res.errors);
      setStatus("idle");
      requestFocus("invalid");
      return;
    }
    setStatus(res.status === 503 ? "unavailable" : "error");
    setMessage(res.message ?? "Something went wrong. Please try again.");
    requestFocus("status");
  };

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    kind === "partner" ? "Agency partner enquiry" : "Project enquiry",
  )}&body=${encodeURIComponent(
    [
      `Name: ${values.name}`,
      values.company && `${copy.company}: ${values.company}`,
      values.website && `${copy.website}: ${values.website}`,
      values.budget && `Budget: ${values.budget}`,
      values.services.length > 0 && `Services: ${values.services.join(", ")}`,
      `\n${values.message}`,
    ]
      .filter(Boolean)
      .join("\n"),
  )}`;

  if (status === "success") {
    return (
      <div className={styles.card}>
        <div className={styles.success} role="status">
          <SuccessMark />
          <h2 ref={successRef} tabIndex={-1} className={styles.successTitle}>
            Thanks, {values.name.split(" ")[0] || "there"}!
          </h2>
          <p className={styles.successText}>
            {message || "Your message is in."} A senior team member will read it personally and reply to{" "}
            <strong>{values.email}</strong>.
          </p>
          <div className={styles.successActions}>
            <Button href="/contact/schedule" className={styles.submit}>
              Book a 30-min call
            </Button>
            <Button href="/#work" variant="outline-dark">
              See our work
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form
      ref={formRef}
      className={styles.card}
      onSubmit={onSubmit}
      noValidate
      aria-labelledby={id("title")}
      aria-busy={sending || undefined}
    >
      <h2 id={id("title")} className="sr-only">
        {kind === "partner" ? "Agency partner enquiry form" : "Project enquiry form"}
      </h2>
      <div className={styles.grid}>
        <fieldset className={`${styles.fieldset} ${styles.full}`}>
          <legend className="sr-only">I am enquiring as</legend>
          <div className={styles.segment}>
            {(
              [
                ["project", "Brand / store"],
                ["partner", "Agency partner"],
              ] as const
            ).map(([k, label]) => (
              <label key={k}>
                <input type="radio" name={id("kind")} value={k} checked={kind === k} onChange={() => switchKind(k)} />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <TextField
          id={id("name")}
          name="name"
          label="Your name"
          required
          autoComplete="name"
          placeholder="Full name"
          value={values.name}
          error={errors.name}
          onChange={(e) => update("name", e.target.value)}
          onBlur={() => blur("name")}
        />
        <TextField
          id={id("email")}
          name="email"
          type="email"
          inputMode="email"
          label="Work email"
          required
          autoComplete="email"
          placeholder={kind === "partner" ? "name@agency.com" : "name@yourstore.com"}
          value={values.email}
          error={errors.email}
          onChange={(e) => update("email", e.target.value)}
          onBlur={() => blur("email")}
        />
        <TextField
          id={id("company")}
          name="company"
          label={copy.company}
          autoComplete="organization"
          placeholder={copy.companyPh}
          value={values.company}
          error={errors.company}
          onChange={(e) => update("company", e.target.value)}
          onBlur={() => blur("company")}
        />
        <TextField
          id={id("website")}
          name="website"
          type="url"
          inputMode="url"
          label={copy.website}
          autoComplete="url"
          placeholder="https://"
          value={values.website}
          error={errors.website}
          onChange={(e) => update("website", e.target.value)}
          onBlur={() => blur("website")}
        />

        <fieldset className={`${styles.fieldset} ${styles.full}`}>
          <legend className={styles.legend}>
            {copy.services} <span className={styles.optional}>(optional)</span>
          </legend>
          <ul role="list" className={styles.chips}>
            {servicesFor(kind).map((s) => (
              <li key={s}>
                <label className={styles.chip}>
                  <input type="checkbox" name="services" value={s} checked={values.services.includes(s)} onChange={() => toggleService(s)} />
                  <span className={styles.chipTick} aria-hidden="true">
                    <svg width="12" height="10" viewBox="0 0 12 10">
                      <path d="M1 5.2l3.3 3.3L11 1.5" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                    </svg>
                  </span>
                  {s}
                </label>
              </li>
            ))}
          </ul>
        </fieldset>

        <SelectField
          id={id("budget")}
          name="budget"
          label={copy.budget}
          className={styles.full}
          options={BUDGETS}
          placeholder="Select a range"
          value={values.budget}
          error={errors.budget}
          onChange={(e) => update("budget", e.target.value)}
        />

        <TextArea
          id={id("message")}
          name="message"
          label={copy.message}
          required
          className={styles.full}
          placeholder={copy.messagePh}
          rows={5}
          value={values.message}
          error={errors.message}
          onChange={(e) => update("message", e.target.value)}
          onBlur={() => blur("message")}
        />

        <div className={`${styles.field} ${styles.full}`} data-invalid={errors.consent ? "" : undefined}>
          <label className={styles.consent} htmlFor={id("consent")}>
            <span className={styles.box}>
              <input
                id={id("consent")}
                type="checkbox"
                name="consent"
                checked={values.consent}
                aria-invalid={errors.consent ? true : undefined}
                aria-required
                aria-describedby={errors.consent ? `${id("consent")}-error` : undefined}
                onChange={(e) => update("consent", e.target.checked)}
              />
              <svg viewBox="0 0 14 14" aria-hidden="true">
                <path d="M2.5 7.3l2.9 2.9L11.5 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" pathLength={1} />
              </svg>
            </span>
            <span>
              I agree to {site.name} using my details to reply to this enquiry, as described in the{" "}
              <a href="/privacy">Privacy Policy</a>.
            </span>
          </label>
          {errors.consent && (
            <p id={`${id("consent")}-error`} className={styles.error}>
              {errors.consent}
            </p>
          )}
        </div>

        <Honeypot value={trap} onChange={setTrap} />

        {(status === "error" || status === "unavailable") && (
          <div
            ref={statusRef}
            tabIndex={-1}
            role="alert"
            className={`${styles.status} ${styles.full} ${status === "error" ? styles.statusError : styles.statusInfo}`}
          >
            <svg className={styles.statusIcon} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="8" cy="8" r="8" fill="currentColor" opacity="0.9" />
              <path d="M8 4v5M8 11.4v.4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <p>
              {status === "unavailable" ? (
                <>
                  Our online form is taking a break. Your details are still here, so you can{" "}
                  <a href={mailto}>send them by email to {site.email}</a> and we&apos;ll reply within one business day.
                </>
              ) : (
                <>
                  {message} You can also email <a href={mailto}>{site.email}</a>.
                </>
              )}
            </p>
          </div>
        )}

        <div className={`${styles.actions} ${styles.full}`}>
          <Button type="submit" className={styles.submit} disabled={sending} aria-busy={sending}>
            {sending ? (
              <>
                <Spinner />
                Sending…
              </>
            ) : (
              copy.submit
            )}
          </Button>
          <p className={styles.note}>
            <span aria-hidden="true">*</span> Required. We reply within one business day.
          </p>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {sending ? "Sending your message…" : ""}
      </p>
    </form>
  );
}
