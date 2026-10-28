import styles from "./Eyebrow.module.css";

/** "[ LABEL ]" section kicker with the full-width rule that draws in on scroll. */
export function Eyebrow({ children, line = true, className }: { children: React.ReactNode; line?: boolean; className?: string }) {
  return (
    <div className={[styles.eyebrow, className].filter(Boolean).join(" ")}>
      <p className={styles.label} data-reveal="fade">
        [ {children} ]
      </p>
      {line && <span className={styles.line} data-reveal="line" aria-hidden="true" />}
    </div>
  );
}
