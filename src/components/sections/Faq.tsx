import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/seo";
import { FaqList } from "./FaqList";
import styles from "./Faq.module.css";

export type FaqItem = { question: string; answer: string };

/** "Got questions?" section: intro + CTA on the left, accordion on the right. Emits FAQPage JSON-LD. */
export function Faq({ items, theme = "paper" }: { items: FaqItem[]; theme?: "paper" | "sand" }) {
  return (
    <section className={`section theme-${theme}`} aria-labelledby="faq-title">
      <div className="container">
        <Eyebrow>FAQ</Eyebrow>
        <div className={styles.grid}>
          <div className={styles.intro}>
            <h2 id="faq-title" className="h2" data-split>
              Got <em>questions?</em>
            </h2>
            <p className="body" data-reveal>
              Good. We like those.
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
