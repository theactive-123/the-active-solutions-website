import styles from "./InsightsHero.module.css";

/** Static shell shown while an article streams in: the dark hero band, empty. */
export function ArticleSkeleton() {
  return (
    <section className={`${styles.hero} theme-dark`} aria-busy="true" aria-label="Loading article">
      <div className={`container ${styles.bottom}`}>
        <span className={styles.rule} aria-hidden="true" />
      </div>
    </section>
  );
}
