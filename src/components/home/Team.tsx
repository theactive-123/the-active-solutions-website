"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, Draggable, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./Team.module.css";

export const TEAM = [
  { name: "Mirza Abbas", role: "CEO", photo: "/images/team/mirza-abbas.png" },
  { name: "Shahzaib Ali", role: "Co-Founder, Creative Director", photo: "/images/team/shahzaib-ali.png" },
  { name: "M. Arsalan", role: "Co-Founder, Technical Head", photo: "/images/team/m-arsalan.png" },
  { name: "Oubaid Ahmed", role: "Project Manager", photo: "/images/team/oubaid-ahmed.png" },
  { name: "Muzammil", role: "Senior Developer", photo: null },
];

function initials(name: string) {
  return name
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

/**
 * "Meet the team": portrait in the centre with a ribbon of member cards gliding across it.
 * The ribbon loops on its own, can be dragged, and pauses on hover.
 */
export function Team() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const track = ref.current?.querySelector<HTMLElement>("[data-track]");
      if (!track) return;
      const half = track.scrollWidth / 2;
      const wrap = gsap.utils.wrap(-half, 0);
      const loop = gsap.to(track, {
        x: `-=${half}`,
        duration: 36,
        ease: "none",
        repeat: -1,
        modifiers: { x: (x) => `${wrap(parseFloat(x))}px` },
      });
      const pause = () => gsap.to(loop, { timeScale: 0, duration: 0.6 });
      const play = () => gsap.to(loop, { timeScale: 1, duration: 0.8 });
      track.addEventListener("pointerenter", pause);
      track.addEventListener("pointerleave", play);

      const proxy = document.createElement("div");
      let startX = 0;
      const [drag] = Draggable.create(proxy, {
        type: "x",
        trigger: track,
        onPress() {
          loop.pause();
          startX = gsap.getProperty(track, "x") as number;
          gsap.set(proxy, { x: 0 });
        },
        onDrag() {
          gsap.set(track, { x: wrap(startX + this.x) });
        },
        onRelease() {
          const current = gsap.getProperty(track, "x") as number;
          loop.progress(Math.abs(current) / half).play();
        },
      });

      gsap.from("[data-portrait]", {
        clipPath: "inset(30% 30% 30% 30% round 22px)",
        scale: 0.9,
        duration: 1.6,
        ease: "expo.inOut",
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });

      return () => {
        drag.kill();
        track.removeEventListener("pointerenter", pause);
        track.removeEventListener("pointerleave", play);
      };
    },
    { scope: ref },
  );

  const cards = (hidden: boolean) =>
    TEAM.map((m) => (
      <li key={`${m.name}-${hidden}`} className={styles.card} aria-hidden={hidden || undefined}>
        <span className={styles.avatar}>
          {m.photo ? <Image src={m.photo} alt="" width={89} height={89} /> : <span className={styles.initials}>{initials(m.name)}</span>}
        </span>
        <span className={styles.who}>
          <span className={styles.name}>
            <span className={styles.online} aria-hidden="true" />
            {m.name}
          </span>
          <span className={styles.role}>{m.role}</span>
        </span>
      </li>
    ));

  return (
    <div ref={ref} className={styles.team}>
      <h2 className={`h2 ${styles.title}`} data-split>
        Meet the team
      </h2>
      <div className={styles.stage}>
        <div className={styles.portrait} data-portrait>
          <Image
            src="/images/team/team-feature.png"
            alt="Our team planning a Shopify build in the Karachi office"
            fill
            sizes="(min-width: 1024px) 30vw, 80vw"
          />
        </div>
        <div className={styles.ribbon}>
          <ul role="list" className={styles.track} data-track data-cursor="Drag">
            {cards(false)}
            {cards(true)}
          </ul>
        </div>
      </div>
    </div>
  );
}
