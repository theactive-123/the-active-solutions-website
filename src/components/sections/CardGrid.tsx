import Link from "next/link";
import styles from "./CardGrid.module.css";

export type Card = { title: string; text?: React.ReactNode; href?: string };

/**
 * Bordered grid of numbered cells ("01 / Title / copy"), used for benefits,
 * migration steps, "more ways we help" etc. Cells fill with colour on hover.
 */
export function CardGrid({
  items,
  columns = 3,
  tone = "light",
  headingLevel = "h3",
  minHeight,
  className,
}: {
  items: Card[];
  columns?: 2 | 3 | 4;
  tone?: "light" | "dark" | "red";
  headingLevel?: "h3" | "h4";
  minHeight?: string;
  className?: string;
}) {
  const H = headingLevel;
  return (
    <ul
      role="list"
      className={[styles.grid, styles[`cols${columns}`], styles[tone], className].filter(Boolean).join(" ")}
      style={minHeight ? ({ "--min-h": minHeight } as React.CSSProperties) : undefined}
      data-reveal-stagger="0.08"
    >
      {items.map((item, i) => {
        const content = (
          <>
            <span className={styles.num} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <H className={styles.title}>{item.title}</H>
            {item.text && <div className={styles.text}>{item.text}</div>}
            {item.href && (
              <span className={styles.arrow} aria-hidden="true">
                <svg width="40" height="10" viewBox="0 0 40 10" fill="none">
                  <path d="M0 5h38M34 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </span>
            )}
          </>
        );
        return (
          <li key={item.title} className={styles.cell}>
            {item.href ? (
              <Link href={item.href} className={styles.inner}>
                {content}
              </Link>
            ) : (
              <div className={styles.inner}>{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
