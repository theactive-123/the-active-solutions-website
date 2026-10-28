"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./Process.module.css";

const OFFSETS = [0, 0, 75, 191];

export type ProcessStep = { title: string; text: string };

/**
 * Four-step timeline on a descending "staircase". When the section scrolls into view the
 * progress line draws across, and as it reaches each dot the dot pops and its step rises
 * into place, one after another.
 */
export function Process({ steps, theme = "light" }: { steps: ProcessStep[]; theme?: "light" | "dark" | "red" }) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const active = theme === "red" ? "#0b0b0c" : "#ea2229";
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-step]");
        const dots = gsap.utils.toArray<HTMLElement>("[data-track-dot]");
        const per = 0.42; // seconds between steps
        gsap.set(items, { opacity: 0, y: 90 });
        gsap.set(dots, { scale: 0.4, opacity: 0.5 });

        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: "expo.out" },
        });
        tl.fromTo("[data-progress]", { scaleX: 0 }, { scaleX: 1, duration: per * items.length + 0.4, ease: "power2.inOut" }, 0);
        items.forEach((item, i) => {
          const at = 0.1 + i * per;
          tl.to(dots[i], { scale: 1, opacity: 1, backgroundColor: active, duration: 0.5, ease: "back.out(3)" }, at);
          tl.to(item, { opacity: 1, y: 0, duration: 1.1, ease: "back.out(1.3)" }, at + 0.05);
          tl.from(item.querySelector("[data-num]"), { yPercent: 40, duration: 1.1 }, at + 0.05);
        });

        const st = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top 62%",
            once: true,
            onEnter: () => tl.play(),
            onLeave: () => tl.play(),
            // Reloaded mid-page past this section: still show the steps.
            onRefresh: (self) => {
              if (self.progress > 0) tl.play();
            },
          },
        });
        return () => {
          st.kill();
          tl.kill();
        };
      });

      mm.add("(max-width: 899px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-step]").forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 1, ease: "back.out(1.3)", scrollTrigger: { trigger: item, start: "top 88%", once: true } },
          );
        });
        gsap.fromTo(
          "[data-progress]",
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 70%", scrub: 0.6 } },
        );
      });
    },
    { scope: ref, dependencies: [theme] },
  );

  return (
    <ol ref={ref} className={`${styles.process} ${styles[theme]}`} role="list">
      <span className={styles.track} aria-hidden="true">
        <span className={styles.progress} data-progress />
        {steps.map((step, i) => (
          <span key={step.title} className={styles.trackDot} data-track-dot style={{ "--i": i } as React.CSSProperties} />
        ))}
      </span>
      {steps.map((step, i) => (
        <li key={step.title} className={styles.step} data-step style={{ "--off": OFFSETS[i] ?? 0 } as React.CSSProperties}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.numWrap} aria-hidden="true">
            <span className={styles.num} data-num>
              {String(i + 1).padStart(2, "0")}
            </span>
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
