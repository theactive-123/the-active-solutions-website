"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./Process.module.css";

export type ProcessStep = { title: string; text: string };

/**
 * Four-step timeline.
 *
 * Desktop/tablet: when the section reaches the screen it pins (stays fixed) and the scroll drives
 * the sequence: the line draws to each dot, the dot pops, and that step rises from the bottom into
 * place, step 1 → 2 → 3 → 4, all ending level along the top. After a short hold the page scrolls on.
 * Mobile: steps are stacked, so each one simply rises in as it scrolls into view.
 */
export function Process({ steps, theme = "light" }: { steps: ProcessStep[]; theme?: "light" | "dark" | "red" }) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const list = ref.current;
      const section = list.closest("section") ?? list;
      const active = theme === "red" ? "#0b0b0c" : "#ea2229";
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-step]", list);
        const dots = gsap.utils.toArray<HTMLElement>("[data-track-dot]", list);
        const progress = list.querySelector("[data-progress]");
        const n = items.length;

        // Content rising from below must not paint over the next section while pinned.
        gsap.set(section, { overflow: "clip" });

        // Every tween states both ends explicitly and never renders early (immediateRender: false).
        // The trigger re-measures on refresh (invalidateOnRefresh), e.g. when you come back to the
        // page already scrolled past the section; plain `to` tweens would then re-record the
        // finished state as their start, and an eager `fromTo` would snap back to its start
        // without the playhead moving. Both left the steps stuck. The starting state is set once here.
        const rise = () => Math.min(window.innerHeight * 0.55, 520);
        const idle = dots.length ? getComputedStyle(dots[0]).backgroundColor : "transparent";
        const nums = items.map((item) => item.querySelector("[data-num]"));
        // Start clean: when Next hides and re-shows this page (back/forward), GSAP's cached
        // transforms can be stale and would add an offset to the numbers.
        gsap.set([...items, ...nums, ...dots, progress], { clearProps: "transform,opacity,backgroundColor" });
        gsap.set(items, { y: rise, opacity: 0 });
        gsap.set(nums, { yPercent: 60 });
        gsap.set(dots, { scale: 0.4 });
        gsap.set(progress, { scaleX: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "none", immediateRender: false },
          scrollTrigger: {
            trigger: section,
            // Pin with the whole section on screen: centred if it fits, otherwise its bottom
            // (where the steps are) aligned to the bottom of the viewport.
            start: () => (section.offsetHeight >= window.innerHeight ? "bottom bottom" : "center center"),
            end: () => `+=${Math.round(window.innerHeight * (0.55 * n + 0.35))}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        items.forEach((item, i) => {
          const at = i;
          // Line travels to this step's dot, the dot pops, then the step rises into place.
          tl.fromTo(progress, { scaleX: i / n }, { scaleX: (i + 1) / n, duration: 0.45, ease: "power1.inOut" }, at);
          tl.fromTo(dots[i], { scale: 0.4, backgroundColor: idle }, { scale: 1.35, backgroundColor: active, duration: 0.2, ease: "back.out(3)" }, at + 0.3);
          tl.fromTo(dots[i], { scale: 1.35 }, { scale: 1, duration: 0.2, ease: "power2.out" }, at + 0.5);
          tl.fromTo(item, { y: rise, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" }, at + 0.15);
          tl.fromTo(nums[i], { yPercent: 60 }, { yPercent: 0, duration: 0.85, ease: "power3.out" }, at + 0.2);
        });
        // Brief hold on the finished state before the page continues.
        tl.to({}, { duration: 0.4 });

        // Pins change the page height: re-measure everything in document order.
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });

      mm.add("(max-width: 899px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-step]", list).forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 70 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 88%", once: true } },
          );
        });
        gsap.fromTo(
          list.querySelector("[data-progress]"),
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: list, start: "top 75%", end: "bottom 70%", scrub: 0.6 } },
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
        <li key={step.title} className={styles.step} data-step>
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
