"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./Marquee.module.css";

/**
 * Infinite ticker band. Speeds up with scroll velocity and reverses direction
 * when scrolling up.
 */
export function Marquee({
  items,
  className,
  speed = 40,
  separator = "/",
  label,
}: {
  items: string[];
  className?: string;
  speed?: number;
  separator?: string;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const track = ref.current?.querySelector<HTMLElement>("[data-track]");
      if (!track) return;
      const loop = gsap.to(track, { xPercent: -50, ease: "none", duration: speed, repeat: -1 });
      let dir = 1;
      const st = ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          dir = self.direction;
          const boost = Math.min(Math.abs(self.getVelocity()) / 250, 6);
          gsap.to(loop, { timeScale: dir * (1 + boost), duration: 0.3, overwrite: true });
          gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.3, overwrite: false });
        },
      });
      return () => st.kill();
    },
    { scope: ref },
  );

  const row = items.map((item, i) => (
    <span key={i} className={styles.item}>
      <span className={styles.sep}>{i % 2 === 0 ? separator : `${separator}${separator}`}</span>
      {item}
    </span>
  ));

  return (
    <div ref={ref} className={[styles.marquee, className].filter(Boolean).join(" ")} role={label ? "region" : undefined} aria-label={label}>
      <div className={styles.track} data-track aria-hidden="true">
        <div className={styles.group}>{row}</div>
        <div className={styles.group}>{row}</div>
      </div>
      {label && <p className="sr-only">{items.join(", ")}</p>}
    </div>
  );
}
