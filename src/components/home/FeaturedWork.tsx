import { Marquee } from "@/components/sections/Marquee";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Tags } from "@/components/ui/Tags";
import { BrowserFrame } from "./BrowserFrame";
import styles from "./FeaturedWork.module.css";

export const projects = [
  {
    name: "The ThermoLab",
    domain: "thethermolab.com",
    image: "/images/work/thermolab.png",
    tags: ["Shopify Plus", "6 weeks", "Fitness"],
    text: "An enterprise-grade, technically optimized platform that turns complex lab engineering and thermal testing into a professional, lead-generating experience.",
  },
  {
    name: "HeyBuddy",
    domain: "heybuddy.io",
    image: "/images/work/heybuddy.png",
    tags: ["Shopify Plus", "6 weeks", "Petcare"],
    text: "A premium, high-converting web experience for HeyBuddy built to explain the product clearly and turn curious pet parents into customers.",
  },
  {
    name: "Peak Motion",
    domain: "peakmotion.fit",
    image: "/images/work/peak-motion.png",
    tags: ["Shopify Plus", "6 weeks", "Fitness Wear"],
    text: "A premium e-commerce storefront built to match the brand's high-performance energy with a smooth, high-converting shopping experience.",
  },
];

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
              <Button href="/contact" variant="outline-light">
                Start your project
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
