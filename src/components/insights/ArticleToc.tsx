"use client";

import { useEffect, useState } from "react";
import styles from "./Article.module.css";

/**
 * "[ IN THIS ARTICLE ]" — sticky table of contents. The entry for the heading that was
 * last scrolled past the upper third of the viewport is highlighted (aria-current).
 */
export function ArticleToc({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const headings = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => !!el);
    if (!headings.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let current = headings[0].id;
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= line) current = h.id;
        else break;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  if (!items.length) return null;

  return (
    <nav className={styles.toc} aria-labelledby="toc-title">
      <h2 id="toc-title" className={styles.asideLabel}>
        [ IN THIS ARTICLE ]
      </h2>
      <ol role="list" className={styles.tocList}>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className={styles.tocLink} aria-current={active === item.id ? "location" : undefined}>
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
