"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./OrbitDiagram.module.css";

const NODES = [
  {
    label: "Paid acquisition",
    angle: -90,
    note: "Paid acquisition brings the right new customers in, and its results tell creative what to make next.",
  },
  {
    label: "Creative",
    angle: 0,
    note: "Creative is tested against campaign data, so every new asset is shaped by what actually converts.",
  },
  {
    label: "Retention",
    angle: 90,
    note: "Retention turns first orders into repeat customers, and its segments sharpen who paid media targets.",
  },
  {
    label: "Reporting",
    angle: 180,
    note: "Reporting ties every channel back to revenue, so priorities are set from one shared scoreboard.",
  },
] as const;

const DEFAULT_NOTE = "Every channel feeds one plan. Hover or focus a channel to see how it connects.";

/**
 * "One strategy" orbit: three concentric rings with the four channels travelling on the outer
 * ring. Rings draw in on scroll, the centre pulses, nodes orbit slowly (pausing on hover/focus),
 * and the active node lights up with a spoke back to the centre plus a caption.
 */
export function OrbitDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 80%", once: true } });
      tl.fromTo("[data-ring]", { strokeDashoffset: 1.02 }, { strokeDashoffset: 0, duration: 1.6, stagger: 0.18, ease: "expo.inOut" })
        .from("[data-core]", { scale: 0, duration: 1, ease: "back.out(1.6)" }, 0.5)
        .from("[data-pill]", { scale: 0.4, opacity: 0, duration: 0.8, stagger: 0.12, ease: "back.out(1.8)" }, 0.9)
        .from("[data-sat]", { opacity: 0, duration: 0.6 }, 1.2);
    },
    { scope: ref },
  );

  return (
    <figure ref={ref} className={styles.figure}>
      <div className={styles.stage} data-active={active !== null} onMouseLeave={() => setActive(null)}>
        <svg className={styles.rings} viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="41.3" pathLength={1} data-ring />
          <circle cx="50" cy="50" r="25.6" pathLength={1} data-ring />
          <circle cx="50" cy="50" r="11.8" pathLength={1} data-ring className={styles.ringInner} />
        </svg>

        <div className={styles.sats} aria-hidden="true">
          <span className={styles.sat} data-sat />
          <span className={`${styles.sat} ${styles.sat2}`} data-sat />
        </div>

        <div className={styles.core} data-core>
          <span className={styles.pulse} aria-hidden="true" />
          <span className={styles.pulse} aria-hidden="true" />
          <span className={styles.coreLabel}>
            One
            <br />
            strategy
          </span>
        </div>

        <ul role="list" className={styles.orbit} aria-label="Channels connected by one strategy">
          {NODES.map((n, i) => (
            <li key={n.label} className={styles.node} style={{ "--a": `${n.angle}deg` } as React.CSSProperties} data-on={active === i}>
              <span className={styles.spoke} aria-hidden="true" />
              <span className={styles.counter}>
                <button
                  type="button"
                  className={styles.pill}
                  data-pill
                  aria-pressed={active === i}
                  aria-describedby="orbit-note"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(active === i ? null : i)}
                >
                  {n.label}
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <figcaption id="orbit-note" className={styles.note} aria-live="polite">
        {active === null ? DEFAULT_NOTE : NODES[active].note}
      </figcaption>
    </figure>
  );
}
