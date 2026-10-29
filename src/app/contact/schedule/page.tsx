import Script from "next/script";
import { JsonLd } from "@/components/JsonLd";
import { Glow } from "@/components/motion/Glow";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import styles from "@/components/contact/ContactPage.module.css";

const DESCRIPTION =
  "Book a free 30-minute online meeting with The Active Solutions. We'll review your Shopify store, marketing and customer journey and map practical next steps.";

export const metadata = pageMetadata({ title: "Schedule a Meeting", description: DESCRIPTION, path: "/contact/schedule" });

/** Booking calendar hosted in our CRM (embedded below the hero). */
const BOOKING_URL = "https://crm.theactivesolutions.com/book/49eb424a-2e4a-4e3d-9fd6-3254d2160933";

const COVER = [
  "Your Shopify store",
  "Your marketing today",
  "Your tracking & numbers",
  "The customer journey",
  "The biggest opportunities",
  "A practical path forward",
];

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Schedule a meeting",
  description: DESCRIPTION,
  url: `${site.url}/contact/schedule`,
  about: { "@id": `${site.url}/#organization` },
  potentialAction: {
    "@type": "ScheduleAction",
    name: "Book a 30-minute online meeting",
    target: `${site.url}/contact/schedule#book`,
  },
};

function Tick() {
  return (
    <svg className={styles.tick} width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="currentColor" />
      <path d="M7 12.3l3.2 3.2 6.6-6.9" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SchedulePage() {
  return (
    <>
      <section className={`${styles.hero} ${styles.schedule} theme-dark`} aria-labelledby="page-title">
        <Glow className={styles.glowLeft} />
        <div className={`container ${styles.inner}`}>
          <div className={styles.copy}>
            <h1 id="page-title" className={`display ${styles.title}`} data-split data-immediate>
              Schedule a <em>meeting</em>
            </h1>
            <p className={`body ${styles.lead}`} data-reveal data-immediate data-delay="0.35">
              Let&apos;s look at your Shopify store, marketing and customer journey, find the biggest opportunities and map a
              practical path to more customers and sustainable growth.
            </p>
            <ul role="list" className={styles.pills} aria-label="Meeting format" data-reveal-stagger="0.08">
              <li className={styles.pill}>
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M7 3.8V7l2.2 1.4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
                30 minutes
              </li>
              <li className={styles.pill}>
                <svg width="16" height="12" viewBox="0 0 16 12" aria-hidden="true">
                  <rect x="1" y="1" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M11 5l4-2.5v7L11 7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                </svg>
                Online meeting
              </li>
            </ul>

            <div className={styles.heroActions} data-reveal data-immediate data-delay="0.55">
              <Button href="#book">Pick a time</Button>
              <a className={styles.mailLink} href={`mailto:${site.email}`}>
                Prefer email? {site.email}
              </a>
            </div>
          </div>

          <aside className={styles.coverCard} aria-labelledby="cover-title" data-reveal="up" data-immediate data-delay="0.3">
            <h2 id="cover-title" className={styles.kicker}>
              [ What we&apos;ll cover ]
            </h2>
            <p className={styles.coverLead}>
              In 30 minutes we look at your store end to end and leave you with <em>clear next steps.</em>
            </p>
            <ol role="list" className={styles.coverGrid} data-reveal-stagger="0.07">
              {COVER.map((item, i) => (
                <li key={item} className={styles.coverItem}>
                  <span className={styles.coverNum} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item}
                  <Tick />
                </li>
              ))}
            </ol>
            <p className={styles.coverNote}>Free, no obligation.</p>
          </aside>
        </div>
      </section>

      <section id="book" className={`section theme-paper ${styles.bookSection}`} aria-labelledby="book-title">
        <div className="container">
          <SectionHeader
            eyebrow="PICK A TIME"
            title={
              <span id="book-title">
                Choose a time that <em>works for you.</em>
              </span>
            }
            text={<p>Pick a day and time below to book your free 30-minute online call with our team.</p>}
          />
          <div className={styles.bookFrame} data-reveal>
            <iframe src={BOOKING_URL} title="Meeting booking" width="100%" height="800" loading="lazy" className={styles.bookIframe} />
          </div>
          <p className={styles.bookFallback}>
            Calendar not loading?{" "}
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              Open the booking page in a new tab
            </a>{" "}
            or email <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </section>
      <Script src="https://crm.theactivesolutions.com/crm-source.js" strategy="afterInteractive" />

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
            { name: "Schedule a meeting", path: "/contact/schedule" },
          ]),
          pageJsonLd,
        ]}
      />
      <MotionEngine />
    </>
  );
}
