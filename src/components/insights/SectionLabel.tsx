import styles from "./SectionLabel.module.css";

/** "[ LABEL ]" kicker + drawn rule, rendered as a real heading so sections are labelled. */
export function SectionLabel({ id, children, as: Tag = "h2", tone = "light" }: { id?: string; children: React.ReactNode; as?: "h2" | "p"; tone?: "light" | "dark" }) {
  return (
    <div className={`${styles.wrap} ${tone === "dark" ? styles.dark : ""}`}>
      <Tag id={id} className={styles.label} data-reveal="fade">
        [ {children} ]
      </Tag>
      <span className={styles.line} data-reveal="line" aria-hidden="true" />
    </div>
  );
}
