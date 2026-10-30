import { Suspense } from "react";
import { JsonLd } from "@/components/JsonLd";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactFormFromParams } from "@/components/contact/ContactFormFromParams";
import { ContactMap } from "@/components/contact/ContactMap";
import { Glow } from "@/components/motion/Glow";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { Button } from "@/components/ui/Button";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import styles from "@/components/contact/ContactPage.module.css";
import { Email } from "@/components/ui/Email";
import { encodeEmail } from "@/lib/contact-email";

const DESCRIPTION =
  "Contact The Active Solutions about your Shopify store or agency partnership. Share your goals and we'll reply within one business day with a clear scope.";

export const metadata = pageMetadata({ title: "Contact Us", description: DESCRIPTION, path: "/contact" });

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${site.name}`,
  description: DESCRIPTION,
  url: `${site.url}/contact`,
  mainEntity: {
    "@id": `${site.url}/#organization`,
    "@type": "ProfessionalService",
    name: site.name,
    telephone: site.phone.tel,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: site.phone.tel,
      availableLanguage: ["English", "Urdu"],
      areaServed: ["US", "GB", "AE", "SA", "PK"],
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <section className={`${styles.hero} theme-dark`} aria-labelledby="page-title">
        <Glow />
        <div className={`container ${styles.inner}`}>
          <div className={styles.copy}>
            <h1 id="page-title" className={`display ${styles.title}`} data-split data-immediate>
              Let&apos;s talk about <em>your store.</em>
            </h1>
            <p className={`body ${styles.lead}`} data-reveal data-immediate data-delay="0.35">
              Tell us about your store, your current challenges and what you want to achieve. We&apos;ll discuss the
              requirements and prepare a clear project scope.
            </p>

            <p className={styles.kicker} data-reveal="fade" data-immediate data-delay="0.45">
              [ Visit Us ]
            </p>
            <div data-reveal data-immediate data-delay="0.5">
              <address className={styles.address}>
                Office-403, AG Trade Center,
                <br />
                Block 14 Gulistan-e-Johar,
                <br />
                {site.address.city}, {site.address.postalCode}
              </address>
              <div className={styles.contactLinks}>
                <a className={styles.mailLink} href={`tel:${site.phone.tel}`}>
                  {site.phone.display}
                </a>
                <span className={styles.emailNote}>
                  <Email />
                </span>
              </div>
            </div>

            <aside className={styles.promo} aria-labelledby="promo-title" data-reveal="scale" data-immediate data-delay="0.6">
              <h2 id="promo-title" className={styles.promoTitle}>
                Prefer a conversation?
              </h2>
              <p className={styles.promoText}>Book a 30-minute meeting with the team.</p>
              <div className={styles.promoAction}>
                <Button href="/contact/schedule" variant="dark">
                  Schedule meeting
                </Button>
              </div>
            </aside>
          </div>

          <div className={styles.formCol} data-reveal="up" data-immediate data-delay="0.3">
            <Suspense fallback={<ContactForm emailCode={encodeEmail()} />}>
              <ContactFormFromParams emailCode={encodeEmail()} />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="section theme-paper" aria-labelledby="map-title">
        <div className="container">
          <h2 id="map-title" className={`h2 ${styles.mapTitle}`} data-split>
            Based in <em>Karachi, working</em> worldwide.
          </h2>
          <ContactMap />
        </div>
      </section>

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          contactPageJsonLd,
        ]}
      />
      <MotionEngine />
    </>
  );
}
