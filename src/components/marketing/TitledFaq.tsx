import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/sections/FaqList";
import type { FaqItem } from "@/components/sections/Faq";
import styles from "@/components/sections/Faq.module.css";
import { faqJsonLd } from "@/lib/seo";

/**
 * Same layout as the shared `Faq` section, but with a page-specific heading and intro
 * (the shared one hard-codes "Got questions?").
 */
export function TitledFaq({
  items,
  title,
  text,
  theme = "paper",
}: {
  items: FaqItem[];
  title: React.ReactNode;
  text: string;
  theme?: "paper" | "sand";
}) {
  return (
    <section className={`section theme-${theme}`} aria-labelledby="faq-title">
      <div className="container">
        <Eyebrow>FAQ</Eyebrow>
        <div className={styles.grid}>
          <div className={styles.intro}>
            <h2 id="faq-title" className="h2" data-split>
              {title}
            </h2>
            <p className="body" data-reveal>
              {text}
            </p>
            <div data-reveal data-delay="0.1">
              <Button href="/contact/schedule" variant="dark">
                Book a 30-min call
              </Button>
            </div>
          </div>
          <FaqList items={items} />
        </div>
      </div>
      <JsonLd data={faqJsonLd(items)} />
    </section>
  );
}
