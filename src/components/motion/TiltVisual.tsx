"use client";

import { useEffect, useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "./gsap";
import { introPending, whenIntro } from "./intro";
import styles from "./TiltVisual.module.css";

/**
 * Wraps a hero object (3D render) so it floats gently, tilts toward the pointer
 * and enters with a soft scale-in.
 */
export function TiltVisual({ children, className, float = true }: { children: React.ReactNode; className?: string; float?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const body = inner.current;
    if (!el || !body || prefersReducedMotion()) return;

    const host = el.closest("section") ?? el;
    let move: ((e: Event) => void) | null = null;
    let stopWaiting = () => {};

    const ctx = gsap.context(() => {
      // Enters once the preloader lifts (or right away when there is none).
      const enter = gsap.from(body, { opacity: 0, scale: 0.82, rotate: -8, y: 40, duration: 1.8, ease: "expo.out", delay: 0.3, paused: introPending() });
      if (enter.paused()) stopWaiting = whenIntro(() => enter.restart(true));
      if (float) gsap.to(el, { y: -18, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
      if (!isFinePointer()) return;

      const rx = gsap.quickTo(body, "rotationX", { duration: 1, ease: "power3.out" });
      const ry = gsap.quickTo(body, "rotationY", { duration: 1, ease: "power3.out" });
      const tx = gsap.quickTo(body, "x", { duration: 1.2, ease: "power3.out" });
      move = (e: Event) => {
        const p = e as PointerEvent;
        const r = host.getBoundingClientRect();
        const nx = (p.clientX - r.left) / r.width - 0.5;
        const ny = (p.clientY - r.top) / r.height - 0.5;
        ry(nx * 22);
        rx(-ny * 16);
        tx(nx * 30);
      };
      host.addEventListener("pointermove", move);
    });

    return () => {
      stopWaiting();
      if (move) host.removeEventListener("pointermove", move);
      ctx.revert();
    };
  }, [float]);

  return (
    <div ref={ref} className={[styles.wrap, className].filter(Boolean).join(" ")} aria-hidden="true">
      <div ref={inner} className={styles.inner}>
        {children}
      </div>
    </div>
  );
}
