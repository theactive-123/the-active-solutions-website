"use client";

import Link from "next/link";
import { useState } from "react";
import { ShapeIcon, type Shape } from "@/components/ui/ShapeIcon";
import styles from "./ServiceGrid.module.css";

export type ServiceCard = { title: string; tags: string[]; shape: Shape; href?: string };

const SHAPES: Shape[] = ["pinwheel", "petals", "cross", "brackets"];

/**
 * 2×2 service cards. One card is "active" (red, with its capability tags); hovering or
 * focusing another card hands the highlight over. On touch screens every card shows its tags.
 */
export function ServiceGrid({ items, tone = "dark" }: { items: Omit<ServiceCard, "shape">[] | ServiceCard[]; tone?: "dark" | "light" }) {
  const [active, setActive] = useState(0);

  return (
    <ul role="list" className={`${styles.grid} ${styles[tone]}`} data-reveal-stagger="0.1" onMouseLeave={() => setActive(0)}>
      {items.map((item, i) => {
        const shape = "shape" in item ? item.shape : SHAPES[i % SHAPES.length];
        const body = (
          <>
            <span className={styles.num} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <ShapeIcon shape={shape} className={styles.icon} />
            <h3 className={styles.title}>{item.title}</h3>
            <ul role="list" className={styles.tags} aria-label={`${item.title} capabilities`}>
              {item.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </>
        );
        return (
          <li
            key={item.title}
            className={styles.card}
            data-active={active === i}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            {item.href ? (
              <Link href={item.href} className={styles.inner}>
                {body}
              </Link>
            ) : (
              <div className={styles.inner} tabIndex={0}>
                {body}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
