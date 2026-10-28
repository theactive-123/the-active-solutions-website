import Image from "next/image";
import Link from "next/link";
import { Glow } from "@/components/motion/Glow";
import { TiltVisual } from "@/components/motion/TiltVisual";
import type { Insight } from "@/content/insights";
import { InsightMeta } from "./InsightMeta";
import styles from "./ArticleHero.module.css";

/** Renders "Is *Shopify Plus* Right for You?" with the starred part as the red serif accent. */
function accented(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : part,
  );
}

/** Article hero: breadcrumb, headline, author/date/reading-time line and the floating cube. */
export function ArticleHero({ article }: { article: Insight }) {
  return (
    <section className={`${styles.hero} theme-dark`} aria-labelledby="page-title">
      <Glow />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <nav aria-label="Breadcrumb" data-reveal="fade" data-immediate>
            <ol role="list" className={styles.crumbs}>
              <li>
                <Link href="/insights">Insights</Link>
              </li>
              <li aria-current="page">{article.category}</li>
            </ol>
          </nav>
          <h1 id="page-title" className={`display ${styles.title}`} data-split data-immediate>
            {accented(article.heroTitle)}
          </h1>
          <div data-reveal data-immediate data-delay="0.4">
            <InsightMeta article={article} author className={styles.meta} />
          </div>
        </div>
        <TiltVisual className={`${styles.visual} figma-crop`}>
          <Image src="/images/insights/cube-3d.png" alt="" width={622} height={622} priority sizes="(min-width: 1024px) 30vw, 60vw" />
        </TiltVisual>
      </div>
      <div className={`container ${styles.bottom}`}>
        <span className={styles.rule} data-reveal="line" data-immediate data-delay="0.4" aria-hidden="true" />
      </div>
    </section>
  );
}
