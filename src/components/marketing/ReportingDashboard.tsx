"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./ReportingDashboard.module.css";

const PANELS = [
  { label: "Revenue trend", bars: [53, 67, 82, 29] },
  { label: "New vs returning", bars: [82, 43, 73, 34] },
  { label: "Channel mix", bars: [43, 88, 64, 40] },
];

const TREND = "M0 166 C40 160 60 150 90 140 S150 108 190 112 S250 96 290 104 S340 120 380 110 S440 80 480 86 S540 70 580 52 S640 30 662 22";
const BASE = "M0 196 C50 188 90 176 130 178 S200 170 240 166 S300 160 340 160 S400 150 440 146 S520 140 560 132 S630 112 662 104";

/** Illustrative reporting dashboard (sample layout, not client data): lines draw and bars grow on scroll. */
export function ReportingDashboard() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 78%", once: true } });
      tl.from("[data-line]", { strokeDashoffset: 1, duration: 2, stagger: 0.25, ease: "power2.inOut" })
        .from("[data-dot]", { scale: 0, transformOrigin: "50% 50%", duration: 0.5, ease: "back.out(2)" }, 1.7)
        .from("[data-panel]", { y: 24, opacity: 0, duration: 0.8, stagger: 0.1, ease: "expo.out" }, 0.4)
        .from("[data-bar]", { scaleY: 0, transformOrigin: "50% 100%", duration: 0.9, stagger: 0.04, ease: "expo.out" }, 0.7);
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={styles.dash} role="img" aria-label="Sample ecommerce performance dashboard showing a rising revenue trend line, new versus returning customers and channel mix">
      <p className={styles.label} aria-hidden="true">
        ECOMMERCE PERFORMANCE — SAMPLE LAYOUT
      </p>
      <svg className={styles.chart} viewBox="0 0 662 217" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="dash-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ea2229" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#ea2229" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[54, 108, 162].map((y) => (
          <line key={y} x1="0" x2="662" y1={y} y2={y} className={styles.grid} />
        ))}
        <path d={`${TREND} L662 217 L0 217 Z`} fill="url(#dash-fill)" className={styles.area} />
        <path d={BASE} pathLength={1} className={styles.base} data-line />
        <path d={TREND} pathLength={1} className={styles.trend} data-line />
        <circle cx="662" cy="22" r="6" className={styles.dot} data-dot />
      </svg>
      <div className={styles.panels} aria-hidden="true">
        {PANELS.map((p) => (
          <div key={p.label} className={styles.panel} data-panel>
            <span className={styles.panelLabel}>{p.label}</span>
            <span className={styles.bars}>
              {p.bars.map((h, i) => (
                <span key={i} className={styles.bar} style={{ height: `${h}%` }} data-bar />
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
