"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./CurvedGallery.module.css";

const SLIDES = [
  { src: "/images/work/thermolab.png", alt: "ThermoLab Shopify store homepage" },
  { src: "/images/work/heybuddy.png", alt: "HeyBuddy Shopify store homepage" },
  { src: "/images/work/peak-motion.png", alt: "Peak Motion Shopify store homepage" },
  { src: "/images/team/team-feature.png", alt: "The Active Solutions team at work in Karachi" },
];

/**
 * The curved "panorama" strip from the design (four bowed panels). The bend is done with
 * a 3D cylinder: panels rotate around a shared centre and the ring turns as you scroll.
 */
export function CurvedGallery() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-ring]",
        { rotateY: 14 },
        { rotateY: -14, ease: "none", scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: 0.6 } },
      );
      gsap.from("[data-panel]", {
        opacity: 0,
        z: -300,
        stagger: 0.08,
        duration: 1.4,
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
    },
    { scope: ref },
  );

  // Six panels: the four visible in the design plus one either side that rotates in on scroll.
  const slides = [SLIDES[3], ...SLIDES, SLIDES[0]];
  return (
    <div ref={ref} className={styles.stage}>
      <div className={styles.ring} data-ring>
        {slides.map((s, i) => (
          <figure
            key={i}
            className={styles.panel}
            data-panel
            style={{ "--i": i - (slides.length - 1) / 2 } as React.CSSProperties}
            aria-hidden={i === 0 || i === slides.length - 1 || undefined}
          >
            <Image src={s.src} alt={i === 0 || i === slides.length - 1 ? "" : s.alt} fill sizes="(min-width: 1024px) 24vw, 60vw" className={styles.img} />
          </figure>
        ))}
      </div>
    </div>
  );
}
