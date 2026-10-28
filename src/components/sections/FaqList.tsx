"use client";

import { useId, useState } from "react";
import { ScrollTrigger } from "@/components/motion/gsap";
import type { FaqItem } from "./Faq";
import styles from "./Faq.module.css";

export function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <ul role="list" className={styles.list} data-reveal-stagger="0.07">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={item.question} className={styles.item} data-open={isOpen}>
            <h3 className={styles.q}>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                className={styles.trigger}
                onClick={() => {
                  setOpen(isOpen ? null : i);
                  // Page height changes after the transition; keep scroll triggers accurate.
                  window.setTimeout(() => ScrollTrigger.refresh(), 650);
                }}
              >
                <span>{item.question}</span>
                <span className={styles.icon} aria-hidden="true">
                  <span />
                  <span />
                </span>
              </button>
            </h3>
            <div id={`${id}-a${i}`} role="region" aria-labelledby={`${id}-q${i}`} className={styles.panel} inert={!isOpen}>
              <div className={styles.panelInner}>
                <p>{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
