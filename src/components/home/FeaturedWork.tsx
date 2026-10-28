import { Marquee } from "@/components/sections/Marquee";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Tags } from "@/components/ui/Tags";
import { BrowserFrame } from "./BrowserFrame";
import { projects } from "@/content/work";
import styles from "./FeaturedWork.module.css";

export function FeaturedWork() {
  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <Marquee
        items={Array.from({ length: 8 }, (_, i) => (i % 2 ? "Featured projects" : "Latest work"))}
        label="Latest work and featured projects"
      />
      <div className="theme-dark section">
        <div className="container">
          <SectionHeader
            eyebrow="FEATURED WORK"
            title={
              <span id="work-title">
                Real stores. Real <em>growth.</em>
              </span>
            }
            text={<p>Built by our team in Karachi for customers worldwide.</p>}
            aside={
              <Button href="/work" variant="outline-light">
                See all work
              </Button>
            }
          />

          <ol role="list" className={styles.list}>
            {projects.map((p, i) => (
              <li key={p.name} className={styles.project}>
                <p className={styles.count} aria-hidden="true">
                  <b>{String(i + 1).padStart(2, "0")}</b> / {String(projects.length).padStart(2, "0")}
                </p>
                <BrowserFrame src={p.image} domain={p.domain} alt={`${p.name} Shopify storefront`} priority={i === 0} />
                <div className={styles.meta}>
                  <h3 className={`h2 ${styles.name}`} data-split>
                    {p.name}
                  </h3>
                  <div className={styles.details} data-reveal>
                    <Tags items={p.tags} tone="glass" />
                    <p className="body">{p.text}</p>
                  </div>
                  <div className={styles.cta} data-reveal data-delay="0.1">
                    <Button href={`https://${p.domain}`} target="_blank" rel="noopener noreferrer">
                      Visit live store<span className="sr-only"> (opens in a new tab)</span>
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
