import styles from "./Tags.module.css";

/** Row of outlined pills ("Shopify Plus", "6 weeks" …). `tone` adapts to the background. */
export function Tags({ items, tone = "dark", className }: { items: string[]; tone?: "dark" | "light" | "glass"; className?: string }) {
  return (
    <ul role="list" className={[styles.tags, styles[tone], className].filter(Boolean).join(" ")}>
      {items.map((t) => (
        <li key={t} className={styles.tag}>
          {t}
        </li>
      ))}
    </ul>
  );
}
