import { Glow } from "@/components/motion/Glow";
import { Button } from "@/components/ui/Button";
import styles from "./Heroes.module.css";

export type HeroKind = "giant" | "panel" | "centered" | "bento" | "fullbleed" | "split";
export type HeroFact = { label: string; value: string };

type Props = {
  kind: HeroKind;
  crumbs: React.ReactNode;
  title: React.ReactNode;
  lead: string;
  /** The place name, used by the "giant" type and the "centered" name band. */
  place: string;
  /** Short facts (region, currency, call times...) shown by the hero types that have room for them. */
  facts: HeroFact[];
  /** Names shown in the "centered" hero's running band (cities of the country). */
  names?: string[];
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

/**
 * Location page heroes. Each country uses a different one, so its pages don't share
 * the look of the other markets. All are dark, keep one H1 (#page-title) and play on load.
 */
export function LocationHero({ kind, crumbs, title, lead, place, facts, names = [], primary, secondary }: Props) {
  const heading = (
    <h1 id="page-title" className={`display ${styles.title}`} data-split data-immediate>
      {title}
    </h1>
  );
  const actions = (
    <div className={styles.actions} data-reveal data-immediate data-delay="0.5">
      <Button href={primary.href}>{primary.label}</Button>
      <Button href={secondary.href} variant="outline-light">
        {secondary.label}
      </Button>
    </div>
  );
  const leadEl = (
    <p className={`body ${styles.lead}`} data-reveal data-immediate data-delay="0.35">
      {lead}
    </p>
  );
  const factList = (className: string) => (
    <dl className={className} data-reveal-stagger="0.08" data-immediate>
      {facts.map((f) => (
        <div key={f.label}>
          <dt>{f.label}</dt>
          <dd>{f.value}</dd>
        </div>
      ))}
    </dl>
  );

  return (
    <section className={`${styles.hero} ${styles[kind]} theme-dark`} aria-labelledby="page-title">
      <Glow position={kind === "centered" || kind === "fullbleed" ? "center" : "top-right"} />

      {kind === "giant" && (
        <>
          <div className={`container ${styles.inner}`}>
            {crumbs}
            <div className={styles.giantRow}>
              {heading}
              <div>
                {leadEl}
                {actions}
              </div>
            </div>
          </div>
          <p className={styles.giantWord} aria-hidden="true" style={{ "--chars": place.length } as React.CSSProperties} data-reveal="fade" data-immediate data-delay="0.2">
            {place}
          </p>
        </>
      )}

      {kind === "panel" && (
        <div className={`container ${styles.inner} ${styles.panelGrid}`}>
          <div>
            {crumbs}
            {heading}
            {leadEl}
            {actions}
          </div>
          <aside className={styles.panelCard} aria-label={`${place} at a glance`} data-reveal="up" data-immediate data-delay="0.45">
            <p className={styles.panelHead}>
              <span>At a glance</span>
              <span>{place}</span>
            </p>
            {factList(styles.panelList)}
          </aside>
        </div>
      )}

      {kind === "centered" && (
        <>
          <div className={`container ${styles.inner} ${styles.centerCol}`}>
            {crumbs}
            {heading}
            {leadEl}
            {actions}
          </div>
          {names.length > 0 && (
            <div className={styles.band} aria-hidden="true">
              <div className={styles.bandTrack}>
                {[0, 1].map((copy) => (
                  <span key={copy} className={styles.bandSet}>
                    {names.map((n) => (
                      <span key={n} className={n === place ? styles.bandOn : undefined}>
                        {n}
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {kind === "bento" && (
        <div className={`container ${styles.inner} ${styles.bentoGrid}`}>
          <div>
            {crumbs}
            {heading}
            {leadEl}
            {actions}
          </div>
          <dl className={styles.tiles} data-reveal-stagger="0.08" data-immediate>
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {kind === "fullbleed" && (
        <div className={`container ${styles.inner} ${styles.fullCol}`}>
          {crumbs}
          {heading}
          <div className={styles.fullRow}>
            {leadEl}
            {actions}
          </div>
          {factList(styles.fullFacts)}
        </div>
      )}

      {kind === "split" && (
        <div className={`container ${styles.inner}`}>
          {crumbs}
          <div className={styles.splitGrid}>
            {heading}
            <div className={styles.splitBox} data-reveal="left" data-immediate data-delay="0.35">
              <p className={`body ${styles.lead}`}>{lead}</p>
              {actions}
            </div>
          </div>
          {factList(styles.splitFacts)}
        </div>
      )}
    </section>
  );
}
