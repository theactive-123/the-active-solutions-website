import Image from "next/image";
import styles from "./LogoMarquee.module.css";

const LOGOS = [
  { src: "/images/clients/dermalyft.png", alt: "DermaLyft", w: 126, h: 30, size: "md" },
  { src: "/images/clients/bain-de-soleil.png", alt: "Bain De Soleil", w: 124, h: 16, size: "sm" },
  { src: "/images/clients/peak-motion.png", alt: "Peak Motion", w: 137, h: 17, size: "sm" },
  { src: "/images/clients/thermolab.png", alt: "ThermoLab", w: 160, h: 19, size: "sm" },
  { src: "/images/clients/heybuddy.png", alt: "HeyBuddy", w: 57, h: 32, size: "lg" },
] as const;

/** Logo sets per half of the loop. One half must be wider than the visible strip, otherwise
 *  the end of each cycle shows empty space before the loop resets. */
const REPEAT = 3;

/** Client logos drifting right-to-left in a seamless loop with faded edges; pauses on hover. */
export function LogoMarquee() {
  const row = (hidden: boolean) => (
    <ul role="list" className={styles.row} aria-hidden={hidden || undefined}>
      {Array.from({ length: REPEAT }, (_, r) =>
        LOGOS.map((l) => {
          // Only the first set of the first half is announced; the rest are visual repeats.
          const decorative = hidden || r > 0;
          return (
            <li key={`${r}-${l.alt}`} aria-hidden={!hidden && r > 0 ? true : undefined}>
              <Image src={l.src} alt={decorative ? "" : l.alt} width={l.w} height={l.h} className={`${styles.logo} ${styles[l.size]}`} />
            </li>
          );
        }),
      )}
    </ul>
  );
  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
