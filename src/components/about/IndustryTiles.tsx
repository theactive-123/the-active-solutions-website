import { SectionHeader } from "@/components/ui/SectionHeader";
import styles from "./IndustryTiles.module.css";

const INDUSTRIES = [
  { name: "Beauty & Skincare", count: 18 },
  { name: "Sustainable Apparel", count: 12 },
  { name: "Home & Lifestyle", count: 9 },
  { name: "Food & Beverage", count: 9 },
];

/** "[ WHO WE WORK WITH ]": four bordered category cells; the first is lit red until another is hovered. */
export function IndustryTiles() {
  return (
    <section className="section theme-paper" aria-labelledby="industries-title">
      <div className="container">
        <SectionHeader
          eyebrow="WHO WE WORK WITH"
          title={
            <span id="industries-title">
              Built for ambitious <em>DTC brands</em>
            </span>
          }
          text={<p>You&apos;ve already got a product people want. We build the system that turns traffic and ad spend into growth.</p>}
        />
        <ul role="list" className={styles.tiles} data-reveal-stagger="0.1">
          {INDUSTRIES.map((ind, i) => (
            <li key={ind.name} className={styles.tile}>
              <span className={styles.num} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.name}>{ind.name}</h3>
              <p className={styles.stat}>
                <span data-count>{ind.count}</span> brands shipped
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
