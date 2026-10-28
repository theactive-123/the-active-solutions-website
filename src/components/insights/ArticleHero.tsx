import Link from "next/link";
import type { Insight } from "@/content/insights";
import { InsightMeta } from "./InsightMeta";
import { InsightsHero, accented } from "./InsightsHero";
import styles from "./InsightsHero.module.css";

/** Article hero: breadcrumb, headline, author/date/reading-time line and the floating cube. */
export function ArticleHero({ article }: { article: Insight }) {
  return (
    <InsightsHero
      title={accented(article.heroTitle)}
      visual={{ src: "/images/insights/cube-3d.png", width: 622, height: 622 }}
      before={
        <nav aria-label="Breadcrumb" data-reveal="fade" data-immediate>
          <ol role="list" className={styles.crumbs}>
            <li>
              <Link href="/insights">Insights</Link>
            </li>
            <li aria-current="page">{article.category}</li>
          </ol>
        </nav>
      }
    >
      <div data-reveal data-immediate data-delay="0.4">
        <InsightMeta article={article} author className={styles.meta} />
      </div>
    </InsightsHero>
  );
}
