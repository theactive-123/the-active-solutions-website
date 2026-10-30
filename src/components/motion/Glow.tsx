"use client";

import { useEffect, useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "./gsap";
import styles from "./Glow.module.css";

/**
 * Dark section backdrop with the design's red radial light. The light drifts slowly
 * on its own and leans towards the pointer on desktop. Only a transform is animated (on an
 * oversized inner layer), so the GPU moves it without repainting the gradient every frame.
 */
export function Glow({ position = "top-right", className }: { position?: "top-right" | "right" | "center"; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const light = lightRef.current;
    const host = el?.parentElement;
    if (!el || !light || !host || prefersReducedMotion()) return;

    let move: ((e: PointerEvent) => void) | null = null;
    const ctx = gsap.context(() => {
      // Drift: a few percent of the section, back and forth.
      const box = host.getBoundingClientRect();
      gsap.to(light, { x: box.width * 0.04, y: box.height * 0.06, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1 });
      if (!isFinePointer()) return;
      // Pointer lean, added on top of the drift (xPercent/yPercent combine with x/y).
      const xTo = gsap.quickTo(light, "xPercent", { duration: 1.4, ease: "power3.out" });
      const yTo = gsap.quickTo(light, "yPercent", { duration: 1.4, ease: "power3.out" });
      move = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        // ±9% of the section, expressed relative to the 1.4x light layer.
        xTo(((e.clientX - r.left) / r.width - 0.5) * (18 / 1.4));
        yTo(((e.clientY - r.top) / r.height - 0.5) * (18 / 1.4));
      };
      host.addEventListener("pointermove", move);
    });
    return () => {
      if (move) host.removeEventListener("pointermove", move);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={ref} className={[styles.glow, styles[position], className].filter(Boolean).join(" ")} aria-hidden="true">
      <div ref={lightRef} className={styles.light} />
    </div>
  );
}
