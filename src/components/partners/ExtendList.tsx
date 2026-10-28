"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./ExtendList.module.css";

export type ExtendItem = { title: string; text: string; href: string };

/**
 * "Five ways we extend your team" rows. One row is highlighted red; hovering or focusing
 * another row hands the highlight over (a red panel wipes in from the left).
 */
export function ExtendList({ items }: { items: ExtendItem[] }) {
  const [active, setActive] = useState(0);

  return (
    <ol role="list" className={styles.list} data-reveal-stagger="0.08" onMouseLeave={() => setActive(0)}>
      {items.map((item, i) => (
        <li key={item.title} className={styles.item} data-active={active === i}>
          <Link
            href={item.href}
            className={styles.row}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <span className={styles.num} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.text}>{item.text}</p>
            <svg className={styles.arrow} width="122" height="14" viewBox="0 0 122 14" fill="none" aria-hidden="true">
              <path d="M0 7h119M113 1l6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </li>
      ))}
    </ol>
  );
}
