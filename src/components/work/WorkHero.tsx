import { Glow } from "@/components/motion/Glow";
import { Button } from "@/components/ui/Button";
import { projects } from "@/content/work";
import { site } from "@/lib/site";
import { FanStack } from "./FanStack";
import styles from "./WorkHero.module.css";

const STATS = [
  { value: "48", label: "Brands shipped" },
  { value: "04", label: "Core DTC industries" },
  { value: String(site.markets.length).padStart(2, "0"), label: "Markets served" },
];

export function WorkHero() {
  return (
    <section className={`${styles.hero} theme-dark`} aria-labelledby="page-title">
      <Glow />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.kicker} data-reveal="fade" data-immediate>
            [ SELECTED WORK ]
          </p>
          <h1 id="page-title" className="display" data-split data-immediate>
            Shopify stores we built <em>to grow.</em>
          </h1>
          <p className={`body ${styles.text}`} data-reveal data-immediate data-delay="0.35">
            Storefronts for DTC brands in fitness, pet care and fashion, designed and developed by our team in Karachi for
            customers worldwide.
          </p>
          <div className={styles.actions} data-reveal data-immediate data-delay="0.5">
            <Button href="#case-studies">View case studies</Button>
            <Button href="/contact" variant="outline-light">
              Start your project
            </Button>
          </div>
        </div>
        <FanStack images={projects.map((p) => ({ src: p.image, alt: `${p.name} storefront` }))} />
      </div>

      <div className={`container ${styles.statsWrap}`}>
        <span className={styles.rule} data-reveal="line" data-immediate data-delay="0.4" aria-hidden="true" />
        <dl className={styles.stats} data-reveal-stagger="0.1" data-immediate>
          {STATS.map((s) => (
            <div key={s.label} className={styles.stat}>
              <dt>{s.label}</dt>
              <dd data-count>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
