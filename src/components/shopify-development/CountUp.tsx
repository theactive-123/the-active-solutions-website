"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";

/**
 * Counts up to `value` when scrolled into view. Local replacement for the shared
 * `data-count` attribute, whose cleanup can leave the number at "00" after a
 * StrictMode/dev re-run (the context revert re-renders the tween at 0 after the text is restored).
 */
export function CountUp({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = `${value}${suffix}`;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      let alive = true;
      const counter = { v: 0 };
      el.textContent = `0${suffix}`;
      gsap.to(counter, {
        v: value,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          if (alive) el.textContent = `${Math.round(counter.v)}${suffix}`;
        },
      });
      return () => {
        alive = false;
        el.textContent = final;
      };
    },
    { dependencies: [value, suffix] },
  );

  return (
    <span className={className}>
      <span className="sr-only">{final}</span>
      <span ref={ref} aria-hidden="true">
        {final}
      </span>
    </span>
  );
}
