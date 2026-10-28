import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./Industries.module.css";

const INDUSTRIES = [
  { name: "Beauty & Skincare", count: "18" },
  { name: "Sustainable Apparel", count: "12" },
  { name: "Home & Lifestyle", count: "09" },
  { name: "Food & Beverage", count: "09" },
];

const MARKETS = ["US", "UK", "UAE", "KSA", "PK"];

export function Industries() {
  return (
    <section className="section theme-sand" aria-labelledby="industries-title">
      <div className="container">
        <SectionHeader
          title={
            <span id="industries-title">
              Built for ambitious <em>DTC brands.</em>
            </span>
          }
          text={<p>From skincare to supplements, we have shipped Shopify stores across the categories DTC shoppers love most.</p>}
        />

        <ul role="list" className={styles.tiles} data-reveal-stagger="0.1">
          {INDUSTRIES.map((ind, i) => (
            <li key={ind.name} className={styles.tile}>
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <svg className={styles.arrow} width="38" height="10" viewBox="0 0 38 10" aria-hidden="true">
                <path d="M0 5h36M32 1l4 4-4 4" stroke="currentColor" fill="none" strokeWidth="1.2" />
              </svg>
              <h3 className={styles.name}>{ind.name}</h3>
              <p className={styles.stat}>
                <span className={styles.count} data-count>
                  {ind.count}
                </span>
                <span className={styles.unit}>
                  Brands
                  <br />
                  shipped
                </span>
              </p>
            </li>
          ))}
        </ul>

        <div className={styles.karachi}>
          <h2 className="h2" data-split>
            Built in Karachi.
            <br /> Working <em>everywhere.</em>
          </h2>
          <p className="body" data-reveal>
            We&apos;re based in Karachi, Pakistan, but our work is built for brands selling internationally.
          </p>
          <ul role="list" className={styles.markets} aria-label="Markets we work in" data-reveal-stagger="0.06">
            {MARKETS.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
