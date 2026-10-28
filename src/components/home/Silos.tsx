import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Logo } from "@/components/ui/Logo";
import styles from "./Silos.module.css";

const USUAL = ["A dev agency", "A separate ads agency", "A freelancer for email", "Reports that never match"];
const OURS = ["Store", "Paid media", "CRO", "Retention"];

function GiantRow() {
  return (
    <span className={styles.giantRow}>
      {["One team", "One scoreboard", "One team", "One scoreboard"].map((t, i) => (
        <span key={i} className={styles.giantItem}>
          {t}
          <Image src="/images/icons/asterisk.svg" alt="" width={90} height={85} className={styles.star} />
        </span>
      ))}
    </span>
  );
}

export function Silos() {
  return (
    <section className={`section theme-dark ${styles.section}`} aria-labelledby="silos-title">
      <div className="container">
        <Eyebrow line={false}>WHY ONE TEAM</Eyebrow>
        <h2 id="silos-title" className={`h2 ${styles.title}`} data-split>
          Your growth shouldn&apos;t live in <em>silos.</em>
        </h2>
      </div>

      <div className={styles.giant} aria-hidden="true">
        <div className={styles.giantTrack}>
          <GiantRow />
          <GiantRow />
        </div>
      </div>

      <div className={`container ${styles.compare}`}>
        <div className={styles.col}>
          <h3 className={styles.colHead}>THE USUAL WAY</h3>
          <ul role="list" className={styles.list} data-reveal-stagger="0.08">
            {USUAL.map((t) => (
              <li key={t} className={styles.struck}>
                <s>{t}</s>
              </li>
            ))}
          </ul>
          <p className={styles.sum} data-reveal>
            Four vendors. Four priorities. Zero shared view of the customer.
          </p>
        </div>
        <div className={styles.col}>
          <h3 className={styles.colHead}>
            <span className="sr-only">The Active Solutions way</span>
            <Logo />
          </h3>
          <ul role="list" className={styles.list} data-reveal-stagger="0.08">
            {OURS.map((t) => (
              <li key={t} className={styles.ours}>
                <span className={styles.check} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
          <p className={styles.sum} data-reveal>
            One crew, one customer journey, one shared scoreboard.
          </p>
        </div>
      </div>
    </section>
  );
}
