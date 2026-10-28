import Link from "next/link";
import { Fragment } from "react";
import { headingId, type InsightBlock } from "@/content/insights";
import styles from "./Article.module.css";

/** Turns "see our [guide](/insights/x)" into text + links. */
function inline(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!m) return <Fragment key={i}>{part}</Fragment>;
    const [, label, href] = m;
    return href.startsWith("/") ? (
      <Link key={i} href={href} className={styles.inlineLink}>
        {label}
      </Link>
    ) : (
      <a key={i} href={href} className={styles.inlineLink} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  });
}

/** Structured article body: headings, paragraphs, lists and pull quotes. */
export function ArticleBody({ blocks }: { blocks: InsightBlock[] }) {
  return (
    <div className={styles.prose}>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} id={headingId(b.text)} className={styles.h2} data-toc-heading data-split>
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className={styles.h3}>
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className={styles.p}>
                {inline(b.text)}
              </p>
            );
          case "ul":
          case "ol": {
            const List = b.type;
            return (
              <List key={i} className={`${styles.list} ${b.type === "ol" ? styles.ordered : ""}`}>
                {b.items.map((item, j) => (
                  <li key={j}>{inline(item)}</li>
                ))}
              </List>
            );
          }
          case "quote":
            return (
              <figure key={i} className={styles.quote} data-reveal>
                <blockquote>
                  <p>&ldquo;{b.text}&rdquo;</p>
                </blockquote>
                {b.cite && <figcaption>{b.cite}</figcaption>}
              </figure>
            );
        }
      })}
    </div>
  );
}
