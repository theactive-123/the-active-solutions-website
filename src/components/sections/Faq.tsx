import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/seo";
import { FaqList } from "./FaqList";
import styles from "./Faq.module.css";

export type FaqItem = { question: string; answer: string };

/** "Got questions?" section: intro + CTA on the left, accordion on the right. Emits FAQPage JSON-LD. */
export function Faq({
  items,
  theme = "paper",
  title = (
    <>
      Got <em>questions?</em>
    </>
  ),
  text = "Good. We like those.",
  cta = { label: "Book a 30-min call", href: "/contact/schedule" },
}: {
  items: FaqItem[];
  theme?: "paper" | "sand";
  title?: React.ReactNode;
  text?: React.ReactNode;
  cta?: { label: string; href: string };
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
              <Button href={cta.href} variant="dark">
                {cta.label}
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
