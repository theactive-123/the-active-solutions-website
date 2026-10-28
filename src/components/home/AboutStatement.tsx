import { Eyebrow } from "@/components/ui/Eyebrow";
import { CurvedGallery } from "./CurvedGallery";
import styles from "./AboutStatement.module.css";

export function AboutStatement() {
  return (
    <section className={`section theme-paper ${styles.section}`} aria-labelledby="about-title">
      <div className="container">
        <Eyebrow>ABOUT</Eyebrow>
        <div className={styles.body}>
          <h2 id="about-title" className="sr-only">
            About The Active Solutions
          </h2>
          <p className={styles.statement} data-scrub-words>
            We help DTC founders and e-commerce owners turn their Shopify store into a <em>growth engine</em> design,
            development, CRO, paid media and retention, under one team.
          </p>
          <p className={styles.note} data-reveal="fade">
            [ BASED IN KARACHI. BUILT FOR BRANDS WORLDWIDE. ]
          </p>
        </div>
      </div>
      <CurvedGallery />
    </section>
  );
}
