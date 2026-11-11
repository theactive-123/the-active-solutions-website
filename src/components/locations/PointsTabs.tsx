"use client";

import { useId, useRef, useState } from "react";
import styles from "./Variants.module.css";

type Point = { title: string; text: string };

/**
 * Points as tabs: titles in a vertical tab list, one panel shown. Every panel is in the HTML
 * (inactive ones carry `hidden`), so all the copy is still there for search engines.
 * Arrow keys, Home and End move between tabs (WAI-ARIA tabs pattern).
 */
export function PointsTabs({ items }: { items: Point[] }) {
  const [active, setActive] = useState(0);
  const base = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent) => {
    const last = items.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? active === last
          ? 0
          : active + 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? active === 0
            ? last
            : active - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className={styles.tabs} data-reveal>
      <div role="tablist" aria-orientation="vertical" className={styles.tabList} onKeyDown={onKey}>
        {items.map((p, i) => (
          <button
            key={p.title}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${base}-t${i}`}
            aria-selected={active === i}
            aria-controls={`${base}-p${i}`}
            tabIndex={active === i ? 0 : -1}
            className={styles.tab}
            onClick={() => setActive(i)}
          >
            <span className={styles.tabNum} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            {p.title}
          </button>
        ))}
      </div>
      {items.map((p, i) => (
        <div key={p.title} role="tabpanel" id={`${base}-p${i}`} aria-labelledby={`${base}-t${i}`} hidden={active !== i} className={styles.tabPanel} tabIndex={0}>
          <h3 className={styles.tabPanelTitle}>{p.title}</h3>
          <p className={styles.tabPanelText}>{p.text}</p>
        </div>
      ))}
    </div>
  );
}
