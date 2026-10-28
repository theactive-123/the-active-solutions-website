"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, isFinePointer, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./FanStack.module.css";

const REST = [
  { rotate: -9, x: -18, y: 26 },
  { rotate: 4, x: 10, y: 6 },
  { rotate: -2, x: 0, y: -18 },
];
const SPREAD = [
  { rotate: -14, x: -34, y: 30 },
  { rotate: 9, x: 30, y: 4 },
  { rotate: -3, x: 0, y: -30 },
];

/**
 * Three store screenshots dealt like cards. They fan out on load, spread further while the
 * pointer is over them and lean toward it.
 */
export function FanStack({ images }: { images: { src: string; alt: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
      const pose = (set: typeof REST, d = 1) =>
        cards.forEach((c, i) => gsap.to(c, { rotate: set[i].rotate, xPercent: set[i].x, yPercent: set[i].y, duration: d, ease: "expo.out" }));

      if (prefersReducedMotion()) {
        cards.forEach((c, i) => gsap.set(c, { rotate: REST[i].rotate, xPercent: REST[i].x, yPercent: REST[i].y }));
        return;
      }
      gsap.from(cards, { yPercent: 60, rotate: 0, opacity: 0, duration: 1.6, stagger: 0.12, ease: "expo.out", delay: 0.3 });
      cards.forEach((c, i) =>
        gsap.to(c, { rotate: REST[i].rotate, xPercent: REST[i].x, yPercent: REST[i].y, duration: 1.8, ease: "expo.out", delay: 0.45 + i * 0.12 }),
      );
      if (!isFinePointer() || !contextSafe || !ref.current) return;

      const el = ref.current;
      const rx = gsap.quickTo(el, "rotationX", { duration: 1, ease: "power3.out" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 1, ease: "power3.out" });
      const enter = contextSafe(() => pose(SPREAD, 0.9));
      const leave = contextSafe(() => {
        pose(REST, 1.1);
        rx(0);
        ry(0);
      });
      const move = contextSafe((e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 14);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 10);
      });
      el.addEventListener("pointerenter", enter);
      el.addEventListener("pointerleave", leave);
      el.addEventListener("pointermove", move);
      return () => {
        el.removeEventListener("pointerenter", enter);
        el.removeEventListener("pointerleave", leave);
        el.removeEventListener("pointermove", move);
      };
    },
    { scope: ref },
  );

  return (
    <div className={styles.stage} aria-hidden="true">
      <div ref={ref} className={styles.fan}>
        {images.map((img, i) => (
          <div key={img.src} className={styles.card} data-card style={{ zIndex: i + 1 }}>
            <span className={styles.bar}>
              <i />
              <i />
              <i />
            </span>
            <Image src={img.src} alt="" fill sizes="(min-width: 1024px) 34vw, 80vw" className={styles.img} priority={i === images.length - 1} />
          </div>
        ))}
      </div>
    </div>
  );
}
