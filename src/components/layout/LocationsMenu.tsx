"use client";

import Link from "next/link";
import { useRef } from "react";
import { locationNav } from "@/content/locations/nav";
import { Arrow } from "@/components/ui/Button";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import mega from "./MegaMenu.module.css";
import styles from "./LocationsMenu.module.css";

/** "Locations we serve" dropdown: the six markets, each with its city pages, plus quick links. */
export function LocationsMenu({ id, open, pathname }: { id: string; open: boolean; pathname: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      if (prefersReducedMotion()) {
        tl.current = gsap.timeline({ paused: true }).fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 });
        return;
      }
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.out" } })
        .fromTo(
          el,
          { autoAlpha: 0, clipPath: "inset(0% 0% 100% 0% round 28px)", y: -12 },
          { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0% round 28px)", y: 0, duration: 0.75 },
        )
        .fromTo("[data-loc-item]", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.04 }, 0.12)
        .fromTo("[data-loc-side]", { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.07 }, 0.2);
    },
    { scope: ref },
  );

  useGSAP(
    () => {
      const t = tl.current;
      if (!t) return;
      if (open) t.timeScale(1).play();
      else t.timeScale(1.8).reverse();
    },
    { dependencies: [open] },
  );

  return (
    <div ref={ref} id={id} className={mega.mega} data-open={open}>
      <div className={styles.grid}>
        <div className={styles.main}>
          <p className={mega.label} data-loc-item>
            [ LOCATIONS WE SERVE ]
          </p>
          <ul role="list" className={styles.countries}>
            {locationNav.map((c) => {
              const href = `/locations/${c.slug}`;
              return (
                <li key={c.slug} className={styles.country} data-loc-item>
                  <Link href={href} className={styles.countryLink} aria-current={pathname === href ? "page" : undefined}>
                    <span className={styles.code}>{c.code}</span>
                    <span className={styles.countryName}>{c.name}</span>
                  </Link>
                  <ul role="list" className={styles.cities}>
                    {c.cities.map((city) => {
                      const cityHref = `${href}/${city.slug}`;
                      return (
                        <li key={city.slug}>
                          <Link href={cityHref} className={styles.city} aria-current={pathname === cityHref ? "page" : undefined}>
                            {city.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>

        <div className={mega.side}>
          <Link href="/locations" className={mega.sideLink} data-loc-side aria-current={pathname === "/locations" ? "page" : undefined}>
            <span className={mega.sideKicker}>6 countries · 30 cities</span>
            <span className={mega.sideTitle}>All locations</span>
            <Arrow className={mega.sideArrow} />
          </Link>
          <Link href="/contact/schedule" className={`${mega.sideLink} ${mega.sideCta}`} data-loc-side>
            <span className={mega.sideKicker}>30 minutes · Online</span>
            <span className={mega.sideTitle}>Book a growth call</span>
            <Arrow className={mega.sideArrow} />
          </Link>
        </div>
      </div>
    </div>
  );
}
