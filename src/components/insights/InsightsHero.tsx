import Image from "next/image";
import { Glow } from "@/components/motion/Glow";
import { TiltVisual } from "@/components/motion/TiltVisual";
import styles from "./InsightsHero.module.css";

/** Renders "Is *Shopify Plus* Right for You?" with the starred part as the red serif accent. */
export function accented(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) => (part.startsWith("*") && part.endsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : part));
}

type Props = {
  title: React.ReactNode;
  /** Rendered above the h1 (e.g. breadcrumb). */
  before?: React.ReactNode;
  /** Rendered under the h1 (copy, meta line, actions). */
  children?: React.ReactNode;
  tagline?: string;
  visual: { src: string; width: number; height: number };
};

/**
 * Dark hero for the Insights pages. Same look as the shared PageHero, but with a wider copy
 * column (the Figma headlines are ~1018px wide at 1920) and optional slots around the h1.
 */
export function InsightsHero({ title, before, children, tagline, visual }: Props) {
  return (
    <section className={`${styles.hero} theme-dark`} aria-labelledby="page-title">
      <Glow />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          {before}
          <h1 id="page-title" className={`display ${styles.title}`} data-split data-immediate>
            {title}
          </h1>
          {children}
        </div>
        <TiltVisual className={`${styles.visual} figma-crop`}>
          <Image src={visual.src} alt="" width={visual.width} height={visual.height} priority sizes="(min-width: 1024px) 30vw, 60vw" />
        </TiltVisual>
      </div>
      <div className={`container ${styles.bottom}`}>
        <span className={styles.rule} data-reveal="line" data-immediate data-delay="0.4" aria-hidden="true" />
        {tagline && (
          <p className={styles.tagline} data-reveal="fade" data-immediate data-delay="0.7">
            [ {tagline} ]
          </p>
        )}
      </div>
    </section>
  );
}
