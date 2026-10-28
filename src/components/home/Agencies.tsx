import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Team } from "./Team";
import styles from "./Agencies.module.css";

export function Agencies() {
  return (
    <section className="section theme-paper" aria-labelledby="agencies-title">
      <div className="container">
        <Eyebrow>FOR AGENCIES</Eyebrow>
        <div className={styles.center}>
          <h2 id="agencies-title" className="h2" data-split>
            The partner <em>you call</em>
          </h2>
          <p className="body" data-reveal>
            Agencies bring us in as their Shopify delivery team. White-label development, design, paid media and email
            support, shipped under your brand and on your timeline, from Karachi to clients worldwide.
          </p>
          <div data-reveal data-delay="0.1">
            <Button href="/partners" variant="outline-dark">
              Lets Talk
            </Button>
          </div>
        </div>
        <Team />
      </div>
    </section>
  );
}
