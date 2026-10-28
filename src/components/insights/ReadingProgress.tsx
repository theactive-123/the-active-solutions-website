"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/components/motion/gsap";
import styles from "./Article.module.css";

/** Thin red bar at the top of the viewport that fills as the article (`#article-body`) is read. */
export function ReadingProgress({ target = "#article-body" }: { target?: string }) {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = document.querySelector(target);
    if (!el || !bar.current) return;
    gsap.fromTo(
      bar.current,
      { scaleX: 0 },
      { scaleX: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 30%", end: "bottom 70%", scrub: true } },
    );
  }, [target]);

  return (
    <div className={styles.progress} aria-hidden="true">
      <div ref={bar} className={styles.progressBar} />
    </div>
  );
}
