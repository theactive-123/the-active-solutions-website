"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./Footer.module.css";

const WORDS = ["The", "Active", "Solutions"];

/** Giant brand wordmark; letters rise in a wave as the footer scrolls into view and react to hover. */
export function FooterWordmark() {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Scrubbed (tied to scroll position) rather than a one-shot trigger, so the reveal can never
      // get stuck hidden after route changes or on very long pages.
      gsap.fromTo(
        "[data-char]",
        { yPercent: 115, rotate: 8, opacity: 0 },
        {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom 98%",
            scrub: 0.8,
          },
        },
      );
    },
    { scope: ref },
  );

  return (
    <p ref={ref} className={styles.wordmark} aria-label="The Active Solutions">
      {WORDS.map((word, w) => (
        <span key={word} className={styles.word} data-strong={w === 1} aria-hidden="true">
          {word.split("").map((ch, i) => (
            <span key={i} className={styles.charWrap}>
              <span data-char className={styles.char}>
                {ch}
              </span>
            </span>
          ))}
        </span>
      ))}
    </p>
  );
}
