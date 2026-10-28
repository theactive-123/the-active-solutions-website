import { Glow } from "@/components/motion/Glow";
import { Button } from "@/components/ui/Button";
import styles from "./CtaBanner.module.css";

type Action = { label: string; href: string };

/** Closing "[ LET'S TALK ] Ready to …" banner on dark with a floating visual. */
export function CtaBanner({
  title,
  text,
  primary,
  secondary,
  visual,
  eyebrow = "LET'S TALK",
}: {
  title: React.ReactNode;
  text: React.ReactNode;
  primary: Action;
  secondary?: Action;
  visual?: React.ReactNode;
  eyebrow?: string;
}) {
  return (
    <section className={`${styles.cta} theme-dark`} aria-labelledby="cta-title">
      <Glow position="right" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow} data-reveal="fade">
            [ {eyebrow} ]
          </p>
          <h2 id="cta-title" className="display" data-split>
            {title}
          </h2>
          <p className={`body ${styles.text}`} data-reveal>
            {text}
          </p>
          <div className={styles.actions} data-reveal data-delay="0.1">
            <Button href={primary.href}>{primary.label}</Button>
            {secondary && (
              <Button href={secondary.href} variant="outline-light">
                {secondary.label}
              </Button>
            )}
          </div>
        </div>
        {visual && <div className={styles.visual}>{visual}</div>}
      </div>
    </section>
  );
}
