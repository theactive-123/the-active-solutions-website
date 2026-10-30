"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/sections/CheckList";
import Link from "next/link";
import { caseStudyPath, type Project } from "@/content/work";
import styles from "./ProjectStack.module.css";

/**
 * Case-study cards that pin and stack as you scroll (desktop). Each card parks fully visible
 * for a stretch of scroll (the "hold", see CSS) so its buttons are easy to use; then the next
 * card slides over it while it recedes slightly. Inside each card the screenshot drifts with scroll.
 */
export function ProjectStack({ projects, total = projects.length }: { projects: Project[]; total?: number }) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>("[data-stack-card]");
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px)", () => {
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (next) {
            // Recede only while the next card is actually covering this one.
            // From full brightness explicitly: tweening from "none" would start at brightness(0).
            gsap.fromTo(
              card.querySelector("[data-card-body]"),
              { scale: 1, filter: "brightness(1)" },
              {
                scale: 0.94,
                // Darken rather than fade: a translucent card would let the one beneath show through.
                filter: "brightness(0.55)",
                ease: "none",
                scrollTrigger: { trigger: next, start: "top 70%", end: "top 20%", scrub: true },
              },
            );
          }
          gsap.fromTo(
            card.querySelector("[data-shot]"),
            { yPercent: -8 },
            { yPercent: 0, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });
      });

      cards.forEach((card) => {
        gsap.from(card.querySelectorAll("[data-card-reveal]"), {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          scrollTrigger: { trigger: card, start: "top 70%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} role="list" className={styles.stack}>
      {projects.map((p, i) => (
        <li
          key={p.slug}
          id={p.slug}
          className={styles.card}
          data-stack-card
          style={{ "--i": i, "--accent": p.accent } as React.CSSProperties}
        >
          <article className={styles.body} data-card-body aria-labelledby={`${p.slug}-title`}>
            <Link href={caseStudyPath(p.slug)} className={styles.media} data-cursor="View" tabIndex={-1} aria-hidden="true">
              <span className={styles.bar}>
                <span className={styles.dots}>
                  <i />
                  <i />
                  <i />
                </span>
                <span className={styles.url}>{p.domain}</span>
              </span>
              <span className={styles.viewport}>
                <span className={styles.shot} data-shot>
                  <Image src={p.image} alt="" fill sizes="(min-width: 900px) 52vw, 92vw" className={styles.img} />
                </span>
              </span>
            </Link>

            <div className={styles.info}>
              <p className={styles.count} data-card-reveal>
                <b>{String(i + 1).padStart(2, "0")}</b> / {String(total).padStart(2, "0")}
              </p>
              <h3 id={`${p.slug}-title`} className={`h2 ${styles.name}`} data-card-reveal>
                {p.name}
              </h3>
              <dl className={styles.meta} data-card-reveal>
                {[
                  ["Industry", p.industry],
                  ["Market", p.market],
                  ["Platform", p.platform],
                  ["Timeline", p.timeline],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className={styles.summary} data-card-reveal>
                {p.summary}
              </p>
              <ul role="list" className={styles.scope} aria-label="What we delivered" data-card-reveal>
                {p.scope.map((s) => (
                  <li key={s}>
                    <CheckIcon />
                    {s}
                  </li>
                ))}
              </ul>
              <div className={styles.actions} data-card-reveal>
                <Button href={caseStudyPath(p.slug)}>
                  View case study<span className="sr-only">: {p.name}</span>
                </Button>
                <Button href={`https://${p.domain}`} target="_blank" rel="noopener noreferrer" variant="outline-light">
                  Visit live store<span className="sr-only"> (opens in a new tab)</span>
                </Button>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
