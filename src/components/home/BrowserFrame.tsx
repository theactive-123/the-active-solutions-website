"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./BrowserFrame.module.css";

/**
 * Browser-window mockup (traffic lights + address bar) around a store screenshot.
 * On scroll the window widens from a smaller card and the screenshot drifts inside it.
 */
export function BrowserFrame({ src, domain, alt, priority }: { src: string; domain: string; alt: string; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        ref.current,
        { scale: 0.86, borderRadius: 40, opacity: 0.4 },
        { scale: 1, borderRadius: 22, opacity: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 95%", end: "top 45%", scrub: 0.6 } },
      );
      gsap.fromTo(
        "[data-shot]",
        { yPercent: -6 },
        { yPercent: 0, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={styles.frame}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.url}>{domain}</span>
      </div>
      <div className={styles.viewport}>
        <div className={styles.shot} data-shot>
          <Image src={src} alt={alt} fill sizes="(min-width: 1100px) 55vw, 92vw" priority={priority} className={styles.img} />
        </div>
      </div>
    </div>
  );
}
