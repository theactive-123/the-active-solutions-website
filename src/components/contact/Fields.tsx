import type { ComponentProps, ReactNode } from "react";
import { HONEYPOT_FIELD } from "./validation";
import styles from "./Form.module.css";

type Base = { id: string; label: ReactNode; error?: string; hint?: ReactNode; required?: boolean; className?: string };

function describedBy(id: string, error?: string, hint?: ReactNode) {
  return [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(" ") || undefined;
}

function Shell({ id, label, error, hint, required, className, children }: Base & { children: ReactNode }) {
  return (
    <div className={[styles.field, className].filter(Boolean).join(" ")} data-invalid={error ? "" : undefined}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required ? (
          <span className={styles.req} aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className={styles.optional}> (optional)</span>
        )}
      </label>
      <div className={styles.control}>
        {children}
        <span className={styles.focusLine} aria-hidden="true" />
      </div>
      {hint && (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className={styles.error}>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <circle cx="7" cy="7" r="7" fill="currentColor" />
            <path d="M7 3.5v4M7 9.6v.4" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({ id, label, error, hint, required, className, ...rest }: Base & Omit<ComponentProps<"input">, "id">) {
  return (
    <Shell {...{ id, label, error, hint, required, className }}>
      <input
        id={id}
        className={styles.input}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy(id, error, hint)}
        {...rest}
      />
    </Shell>
  );
}

export function TextArea({ id, label, error, hint, required, className, ...rest }: Base & Omit<ComponentProps<"textarea">, "id">) {
  return (
    <Shell {...{ id, label, error, hint, required, className }}>
      <textarea
        id={id}
        className={`${styles.input} ${styles.textarea}`}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        aria-describedby={describedBy(id, error, hint)}
        data-lenis-prevent
        {...rest}
      />
    </Shell>
  );
}

export function SelectField({
  id,
  label,
  error,
  hint,
  required,
  className,
  options,
  placeholder,
  ...rest
}: Base & Omit<ComponentProps<"select">, "id"> & { options: readonly string[]; placeholder: string }) {
  return (
    <Shell {...{ id, label, error, hint, required, className }}>
      <select
        id={id}
        className={`${styles.input} ${styles.select}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg className={styles.caret} width="14" height="8" viewBox="0 0 14 8" aria-hidden="true">
        <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Shell>
  );
}

/** Off-screen field only bots fill in. Hidden from assistive tech and the tab order. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className={styles.trap} aria-hidden="true">
      <label htmlFor={`${HONEYPOT_FIELD}-input`}>Leave this field empty</label>
      <input
        id={`${HONEYPOT_FIELD}-input`}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

/** Animated check used by the success states. */
export function SuccessMark() {
  return (
    <svg className={styles.mark} width="84" height="84" viewBox="0 0 84 84" aria-hidden="true">
      <circle className={styles.markRing} cx="42" cy="42" r="39" fill="none" stroke="currentColor" strokeWidth="3" pathLength={1} />
      <circle className={styles.markFill} cx="42" cy="42" r="32" fill="currentColor" />
      <path className={styles.markTick} d="M28 43l9.5 9.5L57 33" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
    </svg>
  );
}

export function Spinner() {
  return <span className={styles.spinner} aria-hidden="true" />;
}
