"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
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

const flipId = (opt: string) => `need-${opt.toLowerCase().replace(/[^a-z]+/g, "-")}`;

/**
 * "Tell us what you need." Visitors tap needs into the "I need a …" bar, then continue
 * to the contact form with their picks pre-filled (?need=…). Chips glide between the bar
 * and the option list with GSAP Flip; the + button nudges the options with a bounce.
 */
export function NeedBuilder() {
  const router = useRouter();
  const [picked, setPicked] = useState<string[]>([]);
  const root = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  // Animate from the captured state once React has committed the new layout.
  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state || !root.current) return;
    flipState.current = null;
    const targets = root.current.querySelectorAll("[data-flip-id]");
    // Chips re-created in the option list never got the scroll-reveal's inline opacity; without
    // this the stagger CSS (`[data-reveal-stagger] > *`) would keep them invisible.
    gsap.set(targets, { opacity: 1 });
    Flip.from(state, {
      targets,
      duration: 0.7,
      ease: "expo.out",
      scale: true,
      nested: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }),
    });
  }, [picked]);

  const toggle = (opt: string) => {
    if (!prefersReducedMotion() && root.current) {
      flipState.current = Flip.getState(root.current.querySelectorAll("[data-flip-id]"));
    }
    setPicked((p) => (p.includes(opt) ? p.filter((x) => x !== opt) : [...p, opt]));
  };

  /** Bounce the available options to show they're clickable. */
  const nudge = () => {
    const opts = root.current?.querySelectorAll<HTMLElement>("[data-option]");
    if (!opts?.length) return;
    if (!prefersReducedMotion()) {
      gsap.fromTo(
        opts,
        { y: 0 },
        {
          keyframes: { y: [0, -14, 0, -6, 0], rotate: [0, -2, 1.5, -0.5, 0] },
          duration: 0.8,
          ease: "power1.inOut",
          stagger: { each: 0.06, from: "center" },
        },
      );
      gsap.fromTo(
        root.current!.querySelectorAll("[data-option-plus]"),
        { rotate: 0, scale: 1 },
        { rotate: 180, scale: 1.5, duration: 0.5, yoyo: true, repeat: 1, ease: "power2.inOut", stagger: 0.05 },
      );
    }
    opts[0].focus({ preventScroll: true });
  };

  const next = () => {
    if (!picked.length) {
      nudge();
      return;
    }
    router.push(`/contact?need=${encodeURIComponent(picked.join(","))}`);
  };

  const available = OPTIONS.filter((o) => !picked.includes(o));

  return (
    <section className={`section theme-paper ${styles.section}`} aria-labelledby="need-title">
      <div ref={root} className="container">
        <h2 id="need-title" className={`display ${styles.title}`} data-split>
          Tell us what <em>you need.</em>
        </h2>

        <div className={styles.bar} data-reveal>
          <span className={styles.prefix}>I need a</span>
          <ul role="list" className={styles.picked} aria-live="polite" aria-label="Selected needs">
            {picked.map((p) => (
              <li key={p} data-flip-id={flipId(p)}>
                <button type="button" className={styles.chipOn} onClick={() => toggle(p)} aria-label={`Remove ${p}`}>
                  {p}
                  <span aria-hidden="true">×</span>
                </button>
              </li>
            ))}
            <li data-flip-id="need-plus">
              <button type="button" className={styles.plusBox} onClick={nudge} aria-label="Add a need: choose from the options below">
                <span />
                <span />
              </button>
            </li>
          </ul>
          <button type="button" className={styles.next} data-ready={picked.length > 0} aria-disabled={picked.length === 0} onClick={next}>
            Next
            <Arrow className={styles.nextArrow} />
          </button>
        </div>

        <ul role="list" className={styles.options} data-reveal-stagger="0.05" aria-label="Choose what you need">
          {available.map((opt) => (
            <li key={opt} data-flip-id={flipId(opt)}>
              <button type="button" className={styles.option} data-option onClick={() => toggle(opt)}>
                <span className={styles.plus} data-option-plus aria-hidden="true">
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
