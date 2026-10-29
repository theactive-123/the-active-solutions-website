import styles from "./Article.module.css";

/**
 * Article body from WordPress. The HTML is sanitized in `lib/wordpress/html` (allow-listed tags
 * and attributes only), and styled here with the same typography as the rest of the site.
 */
export function ArticleBody({ html }: { html: string }) {
  return <div className={styles.prose} dangerouslySetInnerHTML={{ __html: html }} />;
}
