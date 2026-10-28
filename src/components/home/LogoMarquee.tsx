import Image from "next/image";
import styles from "./LogoMarquee.module.css";

const LOGOS = [
  { src: "/images/clients/dermalyft.png", alt: "DermaLyft", w: 126, h: 30 },
  { src: "/images/clients/bain-de-soleil.png", alt: "Bain De Soleil", w: 124, h: 16 },
  { src: "/images/clients/peak-motion.png", alt: "Peak Motion", w: 137, h: 17 },
  { src: "/images/clients/thermolab.png", alt: "ThermoLab", w: 160, h: 19 },
  { src: "/images/clients/heybuddy.png", alt: "HeyBuddy", w: 57, h: 32 },
];

/** Client logos drifting right-to-left with faded edges; pauses on hover. */
export function LogoMarquee() {
  const row = (hidden: boolean) => (
    <ul role="list" className={styles.row} aria-hidden={hidden || undefined}>
      {LOGOS.map((l) => (
        <li key={l.alt}>
          <Image src={l.src} alt={hidden ? "" : l.alt} width={l.w} height={l.h} className={styles.logo} />
        </li>
      ))}
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
