"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./Laptop.module.css";

/**
 * Slim laptop mockup drawn in CSS around a store screenshot. On scroll the lid
 * "opens" toward the viewer and the screenshot drifts inside the screen.
 */
export function Laptop({ src, alt, width, height }: { src: string; alt: string; width: number; height: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-lid]",
        { rotationX: -28, opacity: 0.5 },
        { rotationX: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 95%", end: "top 45%", scrub: 0.6 } },
      );
      gsap.fromTo(
        "[data-shot]",
        { scale: 1.12, yPercent: 4 },
        { scale: 1, yPercent: 0, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
      gsap.fromTo(
        "[data-glow]",
        { opacity: 0, scaleX: 0.6 },
        { opacity: 1, scaleX: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 90%", end: "top 40%", scrub: true } },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={styles.laptop}>
      <span className={styles.glow} data-glow aria-hidden="true" />
      <div className={styles.lid} data-lid>
        <div className={styles.screen}>
          <div className={styles.shot} data-shot>
            <Image src={src} alt={alt} width={width} height={height} sizes="(min-width: 1024px) 45vw, 92vw" className={styles.img} />
          </div>
        </div>
      </div>
      <div className={styles.base} aria-hidden="true">
        <span className={styles.notch} />
      </div>
    </div>
  );
}
