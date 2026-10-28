import Image from "next/image";
import { ShapeIcon } from "@/components/ui/ShapeIcon";
import styles from "./CreativeFormats.module.css";

/** Static ad mock: two ad variants that fan out on hover (an A/B test in miniature). */
function StaticAdVisual() {
  return (
    <div className={styles.adStage} aria-hidden="true">
      <div className={`${styles.ad} ${styles.adB}`}>
        <span className={styles.adTag}>Variant B</span>
        <span className={styles.adHead}>
          Free shipping
          <br />
          this week
        </span>
        <span className={styles.adCta}>Shop now</span>
      </div>
      <div className={`${styles.ad} ${styles.adA}`}>
        <span className={styles.adTag}>Variant A</span>
        <Image src="/images/marketing/orb-hero.png" alt="" width={290} height={290} className={styles.adOrb} sizes="160px" />
        <span className={styles.adHead}>
          The glow
          <br />
          that lasts
        </span>
        <span className={styles.adCta}>Shop now</span>
      </div>
    </div>
  );
}

/** UGC video mock: a vertical phone frame with a pulsing play button and live captions. */
function UgcVisual() {
  return (
    <div className={styles.ugcStage} aria-hidden="true">
      <div className={styles.phone}>
        <div className={styles.screen}>
          <span className={styles.creator}>
            <span className={styles.avatar}>AK</span>
            <span>@ayesha.reviews</span>
          </span>
          <span className={styles.play}>
            <svg width="22" height="24" viewBox="0 0 22 24">
              <path d="M21 12 1 23V1z" fill="currentColor" />
            </svg>
          </span>
          <span className={styles.captions}>
            <span>&ldquo;Honestly didn&rsquo;t expect</span>
            <span>this to work so fast&rdquo;</span>
          </span>
          <span className={styles.progress}>
            <span />
          </span>
        </div>
      </div>
      <span className={`${styles.chip} ${styles.chip1}`}>Hook 0–3s</span>
      <span className={`${styles.chip} ${styles.chip2}`}>9:16</span>
    </div>
  );
}

/** Motion graphics mock: brand shapes animating along a little timeline. */
function MotionVisual() {
  return (
    <div className={styles.motionStage} aria-hidden="true">
      <div className={styles.shapes}>
        <ShapeIcon shape="pinwheel" className={styles.s1} />
        <ShapeIcon shape="petals" className={styles.s2} />
        <ShapeIcon shape="cross" className={styles.s3} />
      </div>
      <div className={styles.timeline}>
        <span className={styles.keys}>
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className={styles.playhead} />
      </div>
    </div>
  );
}

const FORMATS = [
  {
    title: "Static Ad Creative",
    text: "Product-focused and lifestyle static ads designed around your brand identity, campaign message and placement requirements.",
    Visual: StaticAdVisual,
  },
  {
    title: "UGC-Style Video",
    text: "Video concepts that use a natural, creator-led style where appropriate. Production may involve sourcing suitable creators, directing content or preparing scripts for internal production.",
    Visual: UgcVisual,
  },
  {
    title: "Motion Graphics and Animation",
    text: "Animated product demonstrations, benefit-led visuals and motion assets designed for relevant advertising placements.",
    Visual: MotionVisual,
  },
];

export function CreativeFormats() {
  return (
    <ul role="list" className={styles.grid} data-reveal-stagger="0.12">
      {FORMATS.map(({ title, text, Visual }) => (
        <li key={title} className={styles.card}>
          <div className={styles.media}>
            <Visual />
          </div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.text}>{text}</p>
        </li>
      ))}
    </ul>
  );
}
