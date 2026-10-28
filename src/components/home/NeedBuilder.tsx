"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Arrow } from "@/components/ui/Button";
import { Flip, gsap, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./NeedBuilder.module.css";

const OPTIONS = [
  "Shopify Store",
  "Performance Marketing",
  "DTC Growth Strategy",
  "Ecommerce Marketing",
  "Conversion Rate Optimization",
  "Retention Marketing",
];

/**
 * "Tell us what you need." Visitors tap needs into the "I need a …" bar, then continue
 * to the contact form with their picks pre-filled (?need=…).
 */
export function NeedBuilder() {
  const router = useRouter();
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (opt: string) => {
    const state = prefersReducedMotion() ? null : Flip.getState("[data-flip]");
    setPicked((p) => (p.includes(opt) ? p.filter((x) => x !== opt) : [...p, opt]));
    if (state) {
      requestAnimationFrame(() => Flip.from(state, { duration: 0.6, ease: "expo.out", absolute: true, nested: true, targets: "[data-flip]" }));
    }
  };

  const next = () => {
    if (!picked.length) return;
    router.push(`/contact?need=${encodeURIComponent(picked.join(","))}`);
  };

  const shake = () => {
    if (prefersReducedMotion()) return;
    gsap.fromTo("[data-bar]", { x: -8 }, { x: 0, duration: 0.6, ease: "elastic.out(1.2, 0.3)" });
  };

  return (
    <section className={`section theme-paper ${styles.section}`} aria-labelledby="need-title">
      <div className="container">
        <h2 id="need-title" className={`display ${styles.title}`} data-split>
          Tell us what <em>you need.</em>
        </h2>

        <div className={styles.bar} data-bar data-reveal>
          <span className={styles.prefix}>I need a</span>
          <ul role="list" className={styles.picked} aria-live="polite" aria-label="Selected needs">
            {picked.length === 0 && (
              <li className={styles.plusBox} aria-hidden="true">
                <span />
                <span />
              </li>
            )}
            {picked.map((p) => (
              <li key={p} data-flip={`opt-${p}`}>
                <button type="button" className={styles.chipOn} onClick={() => toggle(p)} aria-label={`Remove ${p}`}>
                  {p}
                  <span aria-hidden="true">×</span>
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className={styles.next}
            data-ready={picked.length > 0}
            aria-disabled={picked.length === 0}
            onClick={() => (picked.length ? next() : shake())}
          >
            Next
            <Arrow className={styles.nextArrow} />
          </button>
        </div>

        <ul role="list" className={styles.options} data-reveal-stagger="0.05" aria-label="Choose what you need">
          {OPTIONS.filter((o) => !picked.includes(o)).map((opt) => (
            <li key={opt} data-flip={`opt-${opt}`}>
              <button type="button" className={styles.option} onClick={() => toggle(opt)}>
                <span className={styles.plus} aria-hidden="true">
                  +
                </span>
                {opt}
                <Arrow className={styles.optArrow} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
