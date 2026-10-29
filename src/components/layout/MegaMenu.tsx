"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { services } from "@/lib/site";
import { Arrow } from "@/components/ui/Button";
import { gsap, useGSAP, isFinePointer, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./MegaMenu.module.css";

/**
 * Services mega menu. Unfolds below the header bar: the service list staggers in on the left,
 * a live preview (3D object, tags, link) follows the hovered service, and quick links sit on the right.
 */
export function MegaMenu({ id, open, pathname }: { id: string; open: boolean; pathname: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [active, setActive] = useState(0);

  // Build the open/close timeline once.
  useGSAP(
    () => {
      const el = ref.current!;
      if (prefersReducedMotion()) {
        tl.current = gsap
          .timeline({ paused: true })
          .fromTo(el, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 });
        return;
      }
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "expo.out" } })
        .fromTo(
          el,
          { autoAlpha: 0, clipPath: "inset(0% 0% 100% 0% round 28px)", y: -12 },
          { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0% round 28px)", y: 0, duration: 0.75 },
        )
        .fromTo("[data-mega-item]", { y: 34, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.05 }, 0.12)
        .fromTo("[data-mega-preview]", { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9 }, 0.15)
        .fromTo("[data-mega-side]", { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.07 }, 0.2);
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

  // Preview tilts toward the pointer
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(e.currentTarget.querySelector("[data-visuals]"), { rotationY: x * 24, rotationX: -y * 18, x: x * 24, duration: 0.8, ease: "power3.out" });
  };
  const onLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget.querySelector("[data-visuals]"), { rotationY: 0, rotationX: 0, x: 0, duration: 1, ease: "expo.out" });
  };

  const current = services[active];

  return (
    <div ref={ref} id={id} className={styles.mega} data-open={open}>
      <div className={styles.grid}>
        <div className={styles.listCol}>
          <p className={styles.label} data-mega-item>
            [ SERVICES ]
          </p>
          <ul role="list" className={styles.list}>
            {services.map((s, i) => (
              <li key={s.href} data-mega-item>
                <Link
                  href={s.href}
                  className={styles.item}
                  data-active={active === i}
                  aria-current={pathname === s.href ? "page" : undefined}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <span className={styles.num}>0{i + 1}</span>
                  <span className={styles.itemText}>
                    <span className={styles.itemTitle}>{s.label}</span>
                    <span className={styles.itemDesc}>{s.description}</span>
                  </span>
                  <span className={styles.itemArrow} aria-hidden="true">
                    <Arrow />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.preview} data-mega-preview onPointerMove={onMove} onPointerLeave={onLeave} aria-hidden="true">
          <div className={styles.visuals} data-visuals>
            {services.map((s, i) => (
              <div key={s.href} className={styles.visual} data-active={active === i}>
                <Image src={s.visual} alt="" width={420} height={420} sizes="260px" className="figma-crop" />
              </div>
            ))}
          </div>
          <div className={styles.previewText}>
            <p key={current.href} className={styles.previewTitle}>
              {current.label}
            </p>
            <ul role="list" key={`${current.href}-tags`} className={styles.tags}>
              {current.tags.map((t, i) => (
                <li key={t} style={{ "--d": `${i * 50}ms` } as React.CSSProperties}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.side}>
          <Link href="/case-studies" className={styles.sideLink} data-mega-side>
            <span className={styles.sideKicker}>Our work</span>
            <span className={styles.sideTitle}>Read case studies</span>
            <Arrow className={styles.sideArrow} />
          </Link>
          <Link href="/partners" className={styles.sideLink} data-mega-side>
            <span className={styles.sideKicker}>For agencies</span>
            <span className={styles.sideTitle}>Partner with us</span>
            <Arrow className={styles.sideArrow} />
          </Link>
          <Link href="/contact/schedule" className={`${styles.sideLink} ${styles.sideCta}`} data-mega-side>
            <span className={styles.sideKicker}>30 minutes · Online</span>
            <span className={styles.sideTitle}>Book a growth call</span>
            <Arrow className={styles.sideArrow} />
          </Link>
        </div>
      </div>
    </div>
  );
}
