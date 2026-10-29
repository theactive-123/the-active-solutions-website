import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Laptop } from "./Laptop";
import { CountUp } from "./CountUp";
import styles from "./ClientProof.module.css";

/*
 * PLACEHOLDER TESTIMONIAL: the quote and name were empty grey boxes in Figma.
 * Replace with a real, approved client quote before launch.
 */
const TESTIMONIAL = {
  quote:
    "They rebuilt our Shopify store around how our customers actually buy. Enquiries picked up within weeks, and the site is far easier for our team to run.",
  name: "Founder",
  company: "The ThermoLab",
  initials: "TL",
};

function Star() {
  return (
    <svg width="22" height="21" viewBox="0 0 22 21" aria-hidden="true">
      <path
        d="M11 0.8l3.06 6.2 6.84 1-4.95 4.82 1.17 6.8L11 16.4l-6.12 3.22 1.17-6.8L1.1 8l6.84-1z"
        fill="currentColor"
      />
    </svg>
  );
}

/** "[ CLIENT PROOF ]" — laptop case study, big count-up stat and a client testimonial. */
export function ClientProof() {
  return (
    <section className="section theme-paper" aria-labelledby="proof-title">
      <div className="container">
        <SectionHeader
          eyebrow="CLIENT PROOF"
          title={
            <span id="proof-title">
              Shopify Projects Built Around <em>Real Business Needs</em>
            </span>
          }
          text={
            <p>
              We work with ecommerce brands to turn complex requirements into practical, scalable Shopify experiences. From
              custom storefronts to platform migrations, our focus is on building solutions that support the way your business
              operates and grows.
            </p>
          }
        />
        <div className={styles.grid}>
          <div className={styles.media}>
            <Laptop
              src="/images/work/thermolab.png"
              width={1905}
              height={914}
              alt="The ThermoLab Shopify storefront home page shown on a laptop"
            />
          </div>
          <div className={styles.side}>
            <p className={styles.stat}>
              <CountUp className={styles.num} value={57} suffix="%" />
              <span className={styles.label} data-reveal>
                higher lead generation
              </span>
            </p>
            <figure className={styles.card} data-reveal data-delay="0.1">
              <div className={styles.stars} role="img" aria-label="Rated 5 out of 5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} />
                ))}
              </div>
              <blockquote className={styles.quote}>
                <p>&ldquo;{TESTIMONIAL.quote}&rdquo;</p>
              </blockquote>
              <figcaption className={styles.author}>
                <span className={styles.avatar} aria-hidden="true">
                  {TESTIMONIAL.initials}
                </span>
                <span>
                  <b>{TESTIMONIAL.name}</b>, {TESTIMONIAL.company}
                </span>
              </figcaption>
            </figure>
            <div className={styles.ctas} data-reveal data-delay="0.15">
              <Button href="/contact" variant="dark">
                Discuss Your Shopify Project
              </Button>
              <Button href="/case-studies/the-thermolab" variant="outline-dark">
                Read the ThermoLab case study
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
