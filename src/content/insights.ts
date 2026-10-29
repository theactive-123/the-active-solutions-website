/**
 * Insights (blog) types and helpers. The articles themselves come from WordPress
 * (see `lib/wordpress`), mapped into this shape so the components never see WordPress data.
 */

/** `team` marks articles credited to the agency rather than a person. */
export type InsightAuthor = { name: string; role: string; photo?: string; team?: boolean };

export type TocItem = { id: string; text: string };

export type Insight = {
  slug: string;
  title: string;
  /** Hero headline; text between *asterisks* renders as the red italic serif accent. */
  heroTitle: string;
  excerpt: string;
  /** Meta description (≤160 chars). */
  description: string;
  /** Primary category (shown on pills and breadcrumbs). */
  category: string;
  /** Every category, used for filtering and related articles. */
  categories: string[];
  /** ISO date (YYYY-MM-DD). */
  date: string;
  /** ISO date (YYYY-MM-DD) of the last edit. */
  modified: string;
  author: InsightAuthor;
  cover: { src: string; width: number; height: number; alt: string };
  featured: boolean;
  /** Sanitized article HTML; h2/h3 headings carry ids that match `toc`. */
  html: string;
  toc: TocItem[];
  readingMinutes: number;
};

export const insightPath = (slug: string) => `/insights/${slug}`;

/** Stable anchor id for a heading. Ids start with a letter so they are also valid CSS selectors. */
export const headingId = (text: string) => {
  const id = text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return /^[a-z]/.test(id) ? id : `section-${id}`;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-11-03" → "03 / Nov / 2026" (the design's date format). */
export function formatInsightDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d} / ${MONTHS[Number(m) - 1]} / ${y}`;
}

/** Up to `count` other articles: those sharing a category first, then the newest. */
export function relatedInsights(all: Insight[], article: Insight, count = 3) {
  const others = all.filter((a) => a.slug !== article.slug);
  const shares = (a: Insight) => a.categories.some((c) => article.categories.includes(c));
  return [...others.filter(shares), ...others.filter((a) => !shares(a))].slice(0, count);
}
