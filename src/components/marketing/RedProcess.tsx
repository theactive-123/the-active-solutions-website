"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./RedProcess.module.css";

const OFFSETS = [0, 0, 75, 191];

export type Step = { title: string; text: string };

/**
 * Four-step staircase timeline for red sections (the shared `Process` only has light/dark
 * palettes, whose red progress line would vanish on a red background). The ink progress line
 * fills on scroll and each step brightens as the line reaches it.
 */
export function RedProcess({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-step]");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 55%", scrub: 0.8 },
        });
        tl.fromTo("[data-progress]", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: items.length });
        items.forEach((item, i) => {
          tl.fromTo(item, { opacity: 0.3, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, i * 0.95);
          tl.fromTo(
            item.querySelector("[data-dot]"),
            { scale: 1, backgroundColor: "rgba(255,255,255,0.45)" },
            { scale: 1.35, backgroundColor: "#0b0b0c", duration: 0.3 },
            i * 0.95,
          );
        });
      });
      mm.add("(max-width: 899px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((item) => {
          gsap.from(item, { opacity: 0, x: 40, duration: 1, scrollTrigger: { trigger: item, start: "top 85%", once: true } });
        });
        gsap.fromTo(
          "[data-progress]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 70%", end: "bottom 60%", scrub: true } },
        );
      });
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className={styles.process} role="list">
      <span className={styles.track} aria-hidden="true">
        <span className={styles.progress} data-progress />
      </span>
      {steps.map((step, i) => (
        <li key={step.title} className={styles.step} data-step style={{ "--off": OFFSETS[i] ?? 0 } as React.CSSProperties}>
          <span className={styles.dot} data-dot aria-hidden="true" />
          <span className={styles.num} aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className={styles.title}>
            <span className="sr-only">Step {i + 1}: </span>
            {step.title}
          </h3>
          <p className={styles.text}>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
