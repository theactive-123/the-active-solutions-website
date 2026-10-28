"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./Footer.module.css";

const WORDS = ["The", "Active", "Solutions"];

/** Giant brand wordmark; letters rise in sequence as the footer scrolls into view and react to hover. */
export function FooterWordmark() {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-char]", {
        yPercent: 105,
        duration: 1.3,
        ease: "expo.out",
        stagger: 0.035,
        scrollTrigger: { trigger: ref.current, start: "top 95%", once: true },
      });
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
