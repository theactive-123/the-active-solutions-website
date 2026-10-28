import { Eyebrow } from "./Eyebrow";
import styles from "./SectionHeader.module.css";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  /** Short paragraph shown in the right column on desktop. */
  text?: React.ReactNode;
  /** Extra content under the paragraph, e.g. a button. */
  aside?: React.ReactNode;
  as?: "h1" | "h2";
  align?: "split" | "center";
  className?: string;
  titleClassName?: string;
};

/** Eyebrow + large heading with an optional supporting paragraph to the right, as used across the design. */
export function SectionHeader({ eyebrow, title, text, aside, as: Tag = "h2", align = "split", className, titleClassName }: Props) {
  return (
    <div className={[styles.header, styles[align], className].filter(Boolean).join(" ")}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <div className={styles.row}>
        <Tag className={["h2", styles.title, titleClassName].filter(Boolean).join(" ")} data-split>
          {title}
        </Tag>
        {(text || aside) && (
          <div className={styles.aside}>
            {text && (
              <div className={`body ${styles.text}`} data-reveal>
                {text}
              </div>
            )}
            {aside && (
              <div className={styles.actions} data-reveal data-delay="0.1">
                {aside}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
