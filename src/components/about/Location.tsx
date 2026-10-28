import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { site } from "@/lib/site";
import styles from "./Location.module.css";

const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=AG+Trade+Center+Gulistan-e-Johar+Karachi";

/** "[ WHERE WE ARE ]": office map + dark "Visit us" card with the markets we serve. */
export function Location() {
  return (
    <section className="section theme-paper" aria-labelledby="where-title">
      <div className="container">
        <SectionHeader
          eyebrow="WHERE WE ARE"
          titleClassName={styles.title}
          title={
            <span id="where-title">
              Based in <em>Karachi</em>, built for brands selling <em>internationally</em>
            </span>
          }
        />
        <div className={styles.grid}>
          <a href={MAPS_URL} className={styles.map} target="_blank" rel="noopener noreferrer" data-reveal="clip">
            <Image
              src="/images/about/karachi-map.jpg"
              alt="Map of Gulistan-e-Johar, Karachi, with AG Trade Center marked"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={styles.mapImg}
            />
            <span className={styles.pin} aria-hidden="true" />
            <span className={styles.open}>
              Open in Google Maps <span className="sr-only">(opens in a new tab)</span>
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2 10 10 2M4 2h6v6" stroke="currentColor" strokeWidth="1.4" fill="none" />
              </svg>
            </span>
          </a>
          <div className={`${styles.card} theme-dark`} data-reveal data-delay="0.1">
            <p className={styles.label}>[ VISIT US ]</p>
            <address className={styles.address}>
              Office-403, AG Trade Center,
              <br /> Block 14 Gulistan-e-Johar,
              <br /> {site.address.city}, {site.address.postalCode}
            </address>
            <ul role="list" className={styles.markets} aria-label="Markets we serve" data-reveal-stagger="0.06">
              {site.markets.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <p className={styles.note}>We&apos;re based in Karachi, Pakistan, but our work is built for brands selling internationally.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
