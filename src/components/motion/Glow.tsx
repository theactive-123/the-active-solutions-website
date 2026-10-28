"use client";

import { useEffect, useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "./gsap";
import styles from "./Glow.module.css";

/**
 * Dark section backdrop with the design's red radial light. The light drifts slowly
 * on its own and leans towards the pointer on desktop.
 */
export function Glow({ position = "top-right", className }: { position?: "top-right" | "right" | "center"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host || prefersReducedMotion()) return;

    let move: ((e: PointerEvent) => void) | null = null;
    const ctx = gsap.context(() => {
      gsap.to(el, { "--gx": "+=4%", "--gy": "+=6%", duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1 });
      if (!isFinePointer()) return;
      const xTo = gsap.quickTo(el, "--px", { duration: 1.4, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "--py", { duration: 1.4, ease: "power3.out" });
      move = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        xTo(((e.clientX - r.left) / r.width - 0.5) * 18);
        yTo(((e.clientY - r.top) / r.height - 0.5) * 18);
      };
      host.addEventListener("pointermove", move);
    });
    return () => {
      if (move) host.removeEventListener("pointermove", move);
      ctx.revert();
    };
  }, []);

  return <div ref={ref} className={[styles.glow, styles[position], className].filter(Boolean).join(" ")} aria-hidden="true" />;
}
