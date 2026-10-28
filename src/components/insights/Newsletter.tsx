import Image from "next/image";
import { Glow } from "@/components/motion/Glow";
import { TiltVisual } from "@/components/motion/TiltVisual";
import { NewsletterForm } from "./NewsletterForm";
import styles from "./Newsletter.module.css";

/** "[ STAY IN THE LOOP ] Get new insights in your inbox." — dark signup band with the orb. */
export function Newsletter() {
  return (
    <section id="subscribe" className={`${styles.section} theme-dark`} aria-labelledby="subscribe-title">
      <Glow position="right" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow} data-reveal="fade">
            [ STAY IN THE LOOP ]
          </p>
          <h2 id="subscribe-title" className="display" data-split>
            Get <em>new insights</em> in your inbox.
          </h2>
          <div data-reveal data-delay="0.1">
            <NewsletterForm />
          </div>
        </div>
        <TiltVisual className={`${styles.visual} figma-crop`}>
          <Image src="/images/insights/orb-3d.png" alt="" width={600} height={600} sizes="(min-width: 1024px) 30vw, 60vw" />
        </TiltVisual>
      </div>
    </section>
  );
}
