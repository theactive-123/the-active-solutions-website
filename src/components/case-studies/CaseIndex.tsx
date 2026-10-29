"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, useGSAP, isFinePointer, prefersReducedMotion } from "@/components/motion/gsap";
import { caseStudyPath, type Project } from "@/content/work";
import styles from "./CaseIndex.module.css";

/**
 * Index of case studies as large rows. On desktop a preview of the hovered store floats with
 * the cursor (and swaps as you move between rows); on touch screens each row shows a thumbnail.
 */
export function CaseIndex({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const movers = useRef<{ x: (v: number) => void; y: (v: number) => void; r: (v: number) => void } | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-index-row]", {
        y: 60,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: "expo.out",
        delay: 0.5,
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
      });
      if (!isFinePointer() || !preview.current) return;
      movers.current = {
        x: gsap.quickTo(preview.current, "x", { duration: 0.6, ease: "power3.out" }),
        y: gsap.quickTo(preview.current, "y", { duration: 0.6, ease: "power3.out" }),
        r: gsap.quickTo(preview.current, "rotate", { duration: 0.8, ease: "power3.out" }),
      };
    },
    { scope: ref },
  );

  const onMove = (e: React.PointerEvent) => {
    const m = movers.current;
    const box = ref.current?.getBoundingClientRect();
    if (!m || !box) return;
    m.x(e.clientX - box.left);
    m.y(e.clientY - box.top);
    m.r((e.movementX || 0) * 0.6);
  };

  return (
    <div ref={ref} className={styles.wrap} onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
      <ol role="list" className={styles.list}>
        {projects.map((p, i) => (
          <li key={p.slug} data-index-row>
            <Link
              href={caseStudyPath(p.slug)}
              className={styles.row}
              data-active={active === i}
              data-dim={active !== null && active !== i}
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
            >
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <span className={styles.name}>{p.name}</span>
              <span className={styles.meta}>
                <span>{p.industry}</span>
                <span>{p.platform}</span>
              </span>
              <span className={styles.thumb} aria-hidden="true">
                <Image src={p.image} alt="" fill sizes="160px" />
              </span>
              <span className={styles.go} aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 22 22">
                  <path d="M5 17L17 5M8 5h9v9" stroke="currentColor" strokeWidth="1.6" fill="none" />
                </svg>
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div ref={preview} className={styles.preview} data-show={active !== null} aria-hidden="true">
        {projects.map((p, i) => (
          <div key={p.slug} className={styles.previewImg} data-active={active === i}>
            <Image src={p.image} alt="" fill sizes="420px" />
          </div>
        ))}
        <span className={styles.previewLabel}>View case study</span>
      </div>
    </div>
  );
}
