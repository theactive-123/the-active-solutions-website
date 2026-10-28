import { formatInsightDate, readingTime, type Insight } from "@/content/insights";

/** "[ 03 / Nov / 2026 ]  [ 6 mins Read Time ]" */
export function InsightMeta({ article, className, author = false }: { article: Insight; className?: string; author?: boolean }) {
  const mins = readingTime(article);
  return (
    <p className={className}>
      {author && <span>[ AUTHOR {article.author.name} ]</span>}
      <span>
        [ <time dateTime={article.date}>{formatInsightDate(article.date)}</time> ]
      </span>
      <span>[ {mins} min{mins === 1 ? "" : "s"} Read Time ]</span>
    </p>
  );
}
