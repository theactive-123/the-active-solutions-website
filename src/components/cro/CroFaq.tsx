import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { FaqList } from "@/components/sections/FaqList";
import type { FaqItem } from "@/components/sections/Faq";
import { faqJsonLd } from "@/lib/seo";
import styles from "@/components/sections/Faq.module.css";

/**
 * Local variant of the shared Faq section: the CRO frame uses its own heading
 * ("CRO questions?") and intro line, which the shared component hard-codes.
 */
export function CroFaq({ items }: { items: FaqItem[] }) {
  return (
    <section className="section theme-paper" aria-labelledby="faq-title">
      <div className="container">
        <Eyebrow>FAQ</Eyebrow>
        <div className={styles.grid}>
          <div className={styles.intro}>
            <h2 id="faq-title" className="h2" data-split>
              CRO <em>questions?</em>
            </h2>
            <p className="body" data-reveal>
              Straight answers before you reach out.
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
