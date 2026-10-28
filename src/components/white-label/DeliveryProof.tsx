import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/home/TiltCard";
import styles from "./DeliveryProof.module.css";

const HANDOVER = [
  {
    step: "Scope & confidentiality agreed",
    note: "NDA, deliverables, timeline",
  },
  { step: "Built in your workspace", note: "Your tools, your review process" },
  {
    step: "QA against your checklist",
    note: "Devices, speed, content, tracking",
  },
  { step: "Handover under your brand", note: "Your templates, your name" },
  { step: "Ongoing support on call", note: "Capacity agreed in advance" },
];

/**
 * Red "proof" band. The design had a placeholder testimonial and an empty image slot;
 * until a verified agency quote is approved it shows our white-label commitment and a
 * coded "branded handover" checklist as the process visual.
 */
export function DeliveryProof() {
  return (
    <section className="section theme-red" aria-labelledby="proof-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <Eyebrow line={false}>HOW WE DELIVER</Eyebrow>
          <h2 id="proof-title" className="h2" data-split>
            A <em>Delivery Partner</em> Agencies Can Work With
          </h2>
          <figure className={styles.quote}>
            <blockquote>
              <p data-reveal>
                &ldquo;We work behind your brand, inside your workflow, and your
                client relationships stay yours from the first brief to the
                final handover.&rdquo;
              </p>
            </blockquote>
            <figcaption className={styles.author} data-reveal data-delay="0.1">
              <span className={styles.avatar}>
                <Image
                  src="/images/brand/logo-mark.png"
                  alt=""
                  width={44}
                  height={44}
                />
              </span>
              <span>
                <b>The Active Solutions</b>
                <small>[ white-label delivery team ]</small>
              </span>
            </figcaption>
          </figure>
          <div data-reveal data-delay="0.15">
            <Button href="/contact?type=partner" variant="white">
              Discuss a White-Label Partnership
            </Button>
          </div>
        </div>

        <div className={styles.visual} data-reveal="scale">
          <TiltCard className={styles.card}>
            <div className={styles.cardHead}>
              <span className={styles.badge}>Your agency</span>
              <span className={styles.cardTitle}>Project handover</span>
            </div>
            <ol role="list" className={styles.list} data-reveal-stagger="0.09">
              {HANDOVER.map((h, i) => (
                <li key={h.step} className={styles.row}>
                  <span className={styles.num} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.rowText}>
                    <b>{h.step}</b>
                    <small>{h.note}</small>
                  </span>
                  <svg
                    className={styles.tick}
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    aria-hidden="true"
                  >
                    <circle
                      cx="13"
                      cy="13"
                      r="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 13.4l3.3 3.3L18.2 9.6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </li>
              ))}
            </ol>
            <p className={styles.foot}>
              <span className={styles.pulse} aria-hidden="true" />
              Delivered under your brand
            </p>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
