import { Eyebrow } from "@/components/ui/Eyebrow";
import { CurvedGallery } from "@/components/home/CurvedGallery";
import styles from "./WhoWeAre.module.css";

/** "[ WHO WE ARE ]" scroll-filled statement, then the curved panorama under "Built in Karachi. Working everywhere." */
export function WhoWeAre() {
  return (
    <section className={`section theme-paper ${styles.section}`} aria-labelledby="who-title">
      <div className="container">
        <Eyebrow>WHO WE ARE</Eyebrow>
        <h2 id="who-title" className="sr-only">
          Who we are
        </h2>
        <p className={styles.statement} data-scrub-words>
          We help DTC founders and e-commerce owners turn their Shopify store into a growth engine: design, development, CRO, paid media and
          retention, under one team.
        </p>
        <h3 className={`h2 ${styles.karachi}`} data-split>
          Built in Karachi.
          <br /> Working <em>everywhere.</em>
        </h3>
      </div>
      <CurvedGallery />
    </section>
  );
}
