import Image from "next/image";
import Link from "next/link";
import type { Insight } from "@/content/insights";
import { InsightMeta } from "./InsightMeta";
import styles from "./InsightCard.module.css";

/** Article card: cover with category pill, title, excerpt and meta. The whole card is one link. */
export function InsightCard({ article, headingLevel = "h3" }: { article: Insight; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className={styles.card}>
      <Link href={`/insights/${article.slug}`} className={styles.link}>
        <div className={styles.media}>
          <Image src={article.cover.src} alt="" width={article.cover.width} height={article.cover.height} sizes="(min-width: 1100px) 28vw, (min-width: 700px) 45vw, 92vw" className={styles.img} />
          <span className={styles.pill}>{article.category}</span>
          <span className={styles.go} aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <Heading className={styles.title}>
          <span className={styles.titleText}>{article.title}</span>
        </Heading>
      </Link>
      <p className={styles.excerpt}>{article.excerpt}</p>
      <InsightMeta article={article} className={styles.meta} />
    </article>
  );
}
