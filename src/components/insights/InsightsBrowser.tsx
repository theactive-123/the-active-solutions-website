"use client";

import { useRef, useState } from "react";
import { Flip, gsap, prefersReducedMotion, useGSAP } from "@/components/motion/gsap";
import type { Insight } from "@/content/insights";
import { InsightCard } from "./InsightCard";
import styles from "./InsightsBrowser.module.css";


/**
 * Category filter + article grid. All cards stay in the DOM; filtered-out cards are hidden
 * with display:none so GSAP Flip can animate the re-layout (moves, enters and exits).
 * Under "All" the featured article is hidden (it is shown above); category filters include it.
 */
export function InsightsBrowser({ articles, categories, featuredSlug }: { articles: Insight[]; categories: string[]; featuredSlug?: string }) {
  const [filter, setFilter] = useState("All");
  const scope = useRef<HTMLDivElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);

  const isVisible = (a: Insight) => (filter === "All" ? a.slug !== featuredSlug : a.categories.includes(filter));
  const count = articles.filter(isVisible).length;

  const choose = (next: string) => {
    if (next === filter) return;
    const cards = scope.current?.querySelectorAll("[data-flip-card]");
    if (cards?.length && !prefersReducedMotion()) flipState.current = Flip.getState(cards, { props: "opacity" });
    setFilter(next);
  };

  useGSAP(
    () => {
      const state = flipState.current;
      if (!state) return;
      flipState.current = null;
      Flip.from(state, {
        duration: 0.8,
        ease: "expo.inOut",
        absolute: true,
        nested: true,
        prune: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.85, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.7, delay: 0.25, ease: "expo.out" }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.4, ease: "power2.in" }),
      });
    },
    { dependencies: [filter], scope },
  );

  return (
    <div ref={scope}>
      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label="Filter articles by category" data-reveal-stagger="0.05">
          {["All", ...categories].map((f) => (
            <button key={f} type="button" className={styles.filter} aria-pressed={filter === f} onClick={() => choose(f)}>
              <span className={styles.filterText}>{f}</span>
            </button>
          ))}
        </div>
        <p className={styles.count} aria-live="polite" aria-atomic="true">
          {filter === "All" ? `${count} more article${count === 1 ? "" : "s"}` : `${count} article${count === 1 ? "" : "s"} in ${filter}`}
        </p>
      </div>

      <ul role="list" className={styles.grid} data-reveal-stagger="0.12">
        {articles.map((a) => (
          <li key={a.slug} data-flip-id={a.slug} data-flip-card className={styles.item} hidden={!isVisible(a)}>
            <InsightCard article={a} />
          </li>
        ))}
      </ul>
      {count === 0 && <p className={styles.empty}>No articles in this category yet.</p>}
    </div>
  );
}
