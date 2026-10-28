import { Eyebrow } from "@/components/ui/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { breadcrumbJsonLd } from "@/lib/seo";
import styles from "./LegalPage.module.css";

export type LegalSection = { heading: string; body: React.ReactNode };

export function LegalPage({
  title,
  path,
  updated,
  intro,
  sections,
}: {
  title: string;
  path: string;
  updated: string;
  intro: React.ReactNode;
  sections: LegalSection[];
}) {
  return (
    <>
      <section className={`${styles.hero} theme-dark`} aria-labelledby="legal-title">
        <div className="container">
          <Eyebrow line={false}>LEGAL</Eyebrow>
          <h1 id="legal-title" className="display" data-split data-immediate>
            {title}
          </h1>
          <p className={styles.updated} data-reveal="fade" data-immediate data-delay="0.3">
            Last updated <time dateTime={updated}>{new Date(updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
          </p>
        </div>
      </section>
      <section className="section theme-paper">
        <div className={`container ${styles.layout}`}>
          <nav className={styles.toc} aria-label="On this page">
            <ol>
              {sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#section-${i + 1}`}>{s.heading}</a>
                </li>
              ))}
            </ol>
          </nav>
          <div className={styles.content}>
            <div className={styles.intro} data-reveal>
              {intro}
            </div>
            {sections.map((s, i) => (
              <section key={s.heading} id={`section-${i + 1}`} className={styles.block} aria-labelledby={`section-${i + 1}-title`}>
                <h2 id={`section-${i + 1}-title`} className="h4">
                  {i + 1}. {s.heading}
                </h2>
                <div className={styles.text}>{s.body}</div>
              </section>
            ))}
          </div>
        </div>
      </section>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: title, path }])} />
      <MotionEngine />
    </>
  );
}
