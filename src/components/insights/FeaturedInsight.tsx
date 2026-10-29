import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { insightPath, type Insight } from "@/content/insights";
import { InsightMeta } from "./InsightMeta";
import { SectionLabel } from "./SectionLabel";
import styles from "./FeaturedInsight.module.css";

/** "[ FEATURED ]" — large cover on the left, headline, excerpt, meta and "Read article" on the right. */
export function FeaturedInsight({ article }: { article: Insight }) {
  const href = insightPath(article.slug);
  return (
    <section className={`section theme-paper ${styles.section}`} aria-labelledby="featured-title">
      <div className="container">
        <SectionLabel id="featured-title">FEATURED</SectionLabel>
        <article className={styles.feature}>
          <Link href={href} className={styles.media} tabIndex={-1} aria-hidden="true" data-reveal="clip">
            <Image src={article.cover.src} alt="" width={article.cover.width} height={article.cover.height} sizes="(min-width: 900px) 37vw, 92vw" loading="eager" className={styles.img} />
            <span className={styles.pill}>{article.category}</span>
          </Link>
          <div className={styles.copy}>
            <h3 className={`h2 ${styles.title}`} data-split>
              <Link href={href} className={styles.titleLink}>
                {article.title}
              </Link>
            </h3>
            <p className={`body ${styles.excerpt}`} data-reveal>
              {article.excerpt}
            </p>
            <div data-reveal data-delay="0.08">
              <InsightMeta article={article} className={styles.meta} />
            </div>
            <div className={styles.action} data-reveal data-delay="0.16">
              <Button href={href} variant="dark" aria-label={`Read article: ${article.title}`}>
                Read article
              </Button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
