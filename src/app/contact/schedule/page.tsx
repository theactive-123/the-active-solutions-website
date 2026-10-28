import { JsonLd } from "@/components/JsonLd";
import { BookingWidget } from "@/components/contact/BookingWidget";
import { Glow } from "@/components/motion/Glow";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import styles from "@/components/contact/ContactPage.module.css";

const DESCRIPTION =
  "Book a free 30-minute online meeting with The Active Solutions. We'll review your Shopify store, marketing and customer journey and map practical next steps.";

export const metadata = pageMetadata({ title: "Schedule a Meeting", description: DESCRIPTION, path: "/contact/schedule" });

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
    target: `${site.url}/contact/schedule`,
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
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || undefined;

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

            <div className={styles.cover}>
              <h2 id="cover-title" className={styles.kicker} data-reveal="fade">
                [ What we&apos;ll cover ]
              </h2>
              <ul role="list" className={styles.coverList} aria-labelledby="cover-title" data-reveal-stagger="0.07">
                {COVER.map((item) => (
                  <li key={item} className={styles.coverItem}>
                    <Tick />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.formCol} data-reveal="up" data-immediate data-delay="0.3">
            <BookingWidget bookingUrl={bookingUrl} />
          </div>
        </div>
      </section>

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
