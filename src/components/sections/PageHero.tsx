import Image from "next/image";
import { Glow } from "@/components/motion/Glow";
import { TiltVisual } from "@/components/motion/TiltVisual";
import { Button } from "@/components/ui/Button";
import styles from "./PageHero.module.css";

type Action = { label: string; href: string };

type Props = {
  title: React.ReactNode;
  text: React.ReactNode;
  primary?: Action;
  secondary?: Action;
  /** "[ SHOPIFY · SHOPIFY PLUS · … ]" line under the divider. */
  tagline?: string;
  visual?: { src: string; width: number; height: number; className?: string };
  /** Extra content placed under the buttons (e.g. a partner badge). */
  children?: React.ReactNode;
};

/** Dark hero used by service, about and partner pages: headline, copy, CTAs and a floating 3D object. */
export function PageHero({ title, text, primary, secondary, tagline, visual, children }: Props) {
  return (
    <section className={`${styles.hero} theme-dark`} aria-labelledby="page-title">
      <Glow />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <h1 id="page-title" className="display" data-split data-immediate>
            {title}
          </h1>
          <div className={`body ${styles.text}`} data-reveal data-immediate data-delay="0.35">
            {text}
          </div>
          {(primary || secondary) && (
            <div className={styles.actions} data-reveal data-immediate data-delay="0.5">
              {primary && <Button href={primary.href}>{primary.label}</Button>}
              {secondary && (
                <Button href={secondary.href} variant="outline-light">
                  {secondary.label}
                </Button>
              )}
            </div>
          )}
          {children}
        </div>
        {visual && (
          <TiltVisual className={[styles.visual, visual.className].filter(Boolean).join(" ")}>
            <Image src={visual.src} alt="" width={visual.width} height={visual.height} priority sizes="(min-width: 1024px) 30vw, 60vw" />
          </TiltVisual>
        )}
      </div>
      {tagline && (
        <div className={`container ${styles.bottom}`}>
          <span className={styles.rule} data-reveal="line" data-immediate data-delay="0.4" aria-hidden="true" />
          <p className={styles.tagline} data-reveal="fade" data-immediate data-delay="0.7">
            [ {tagline} ]
          </p>
        </div>
      )}
    </section>
  );
}
