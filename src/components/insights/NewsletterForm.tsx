"use client";

import { useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import styles from "./Newsletter.module.css";

type Status = { kind: "idle" | "sending" | "success" | "error"; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Email signup → POST /api/contact { type: "newsletter", email }. */
export function NewsletterForm() {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const validate = (value: string) => {
    const v = value.trim();
    if (!v) return "Please enter your email address.";
    if (!EMAIL_RE.test(v)) return "Please enter a valid email address, like name@company.com.";
    return null;
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "sending") return;
    const err = validate(email);
    setFieldError(err);
    if (err) {
      setStatus({ kind: "idle" });
      inputRef.current?.focus();
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", email: email.trim() }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
      if (res.ok && data?.ok !== false) {
        setStatus({ kind: "success", message: data?.message || "Thanks for subscribing. New articles will arrive in your inbox." });
        setEmail("");
        return;
      }
      if (res.status === 503) {
        setStatus({ kind: "error", message: data?.message || "Signups are temporarily unavailable. Please try again later." });
      } else if (res.status >= 400 && res.status < 500) {
        setFieldError(data?.message || "Please check your email address and try again.");
        setStatus({ kind: "idle" });
        inputRef.current?.focus();
      } else {
        setStatus({ kind: "error", message: data?.message || "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ kind: "error", message: "We couldn't reach the server. Check your connection and try again." });
    }
  }

  const errorId = `${id}-error`;
  const statusId = `${id}-status`;

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor={`${id}-email`} className="sr-only">
            Email address
          </label>
          <input
            ref={inputRef}
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="Your email address"
            className={styles.input}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (fieldError) setFieldError(validate(e.target.value));
              if (status.kind !== "idle" && status.kind !== "sending") setStatus({ kind: "idle" });
            }}
            onBlur={() => email && setFieldError(validate(email))}
            aria-invalid={fieldError ? true : undefined}
            aria-describedby={fieldError ? errorId : undefined}
            disabled={status.kind === "sending"}
          />
        </div>
        <Button type="submit" disabled={status.kind === "sending"} aria-busy={status.kind === "sending"}>
          {status.kind === "sending" ? "Subscribing…" : "Subscribe"}
        </Button>
      </div>
      {fieldError && (
        <p id={errorId} className={styles.error}>
          {fieldError}
        </p>
      )}
      <p id={statusId} role="status" aria-live="polite" className={`${styles.status} ${status.kind === "error" ? styles.statusError : ""}`}>
        {status.kind === "success" && (
          <>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className={styles.tick}>
              <path d="M3.5 9.5 7.5 13l7-8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {status.message}
          </>
        )}
        {status.kind === "error" && status.message}
      </p>
      <p className={styles.note}>One email when we publish. No spam, unsubscribe any time.</p>
    </form>
  );
}
