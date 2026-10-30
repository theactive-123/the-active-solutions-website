"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "@/components/motion/gsap";
import { introPending, whenIntro } from "@/components/motion/intro";
import styles from "./ProjectSlider.module.css";

type Slide = { slug: string; name: string; domain: string; image: string; industry: string; href: string };

const INTERVAL = 4.5; // seconds per slide

/**
 * Work hero showcase: one store at a time in a browser frame. Slides advance every few
 * seconds with a wipe; the bars below show progress and jump to a store. Autoplay pauses on
 * hover/focus, off screen and with the pause button; swipe works on touch screens.
 */
export function ProjectSlider({ slides }: { slides: Slide[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = useRef(0);
  const timer = useRef<gsap.core.Tween | null>(null);
  // Autoplay holds: hover/focus, off screen, the pause button, and the preloader (so the
  // first store is not used up behind it).
  const hold = useRef({ hover: false, offscreen: false, manual: false, intro: true });
  const sync = useCallback(() => {
    const t = timer.current;
    if (!t) return;
    const h = hold.current;
    if (h.hover || h.offscreen || h.manual || h.intro) t.pause();
    else t.resume();
  }, []);

  /** Wipes from the current slide to slide `to`. */
  const go = useCallback(
    (to: number) => {
      const el = root.current;
      const from = current.current;
      if (!el || to === from) return;
      current.current = to;
      setActive(to);
      const shots = el.querySelectorAll<HTMLElement>("[data-shot]");
      const next = shots[to];
      const prev = shots[from];
      const forward = to > from || (from === slides.length - 1 && to === 0);
      gsap.killTweensOf([next, prev]);
      if (prefersReducedMotion()) {
        gsap.set(prev, { clipPath: "inset(0% 0% 0% 100%)", zIndex: 1 });
        gsap.set(next, { clipPath: "inset(0% 0% 0% 0%)", scale: 1, zIndex: 2 });
        return;
      }
      gsap.set(prev, { zIndex: 1 });
      gsap.set(next, { zIndex: 2 });
      gsap.fromTo(
        next,
        { clipPath: forward ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)", scale: 1.08 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.15, ease: "expo.inOut" },
      );
      gsap.to(prev, { scale: 0.96, filter: "brightness(0.45)", duration: 1.15, ease: "expo.inOut", onComplete: () => {
        gsap.set(prev, { clipPath: "inset(0% 0% 0% 100%)", scale: 1, filter: "none" });
      } });
    },
    [slides.length],
  );

  // Autoplay: the active bar fills over INTERVAL, then the next slide comes in.
  useEffect(() => {
    const el = root.current;
    const bar = el?.querySelectorAll<HTMLElement>("[data-fill]")[active];
    if (!el || !bar) return;
    el.querySelectorAll<HTMLElement>("[data-fill]").forEach((b, i) => gsap.set(b, { scaleX: i < active ? 1 : 0 }));
    if (prefersReducedMotion()) {
      gsap.set(bar, { scaleX: 1 });
      return;
    }
    const tween = gsap.to(bar, {
      scaleX: 1,
      duration: INTERVAL,
      ease: "none",
      onComplete: () => go((current.current + 1) % slides.length),
    });
    timer.current = tween;
    sync();
    return () => {
      tween.kill();
      timer.current = null;
    };
  }, [active, go, sync, slides.length]);

  useEffect(() => {
    hold.current.manual = paused;
    sync();
  }, [paused, sync]);

  useEffect(() => {
    hold.current.intro = introPending();
    return whenIntro(() => {
      hold.current.intro = false;
      sync();
    });
  }, [sync]);

  // Pause off screen, on hover and on keyboard focus; swipe on touch; gentle tilt on desktop.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      hold.current.offscreen = !e.isIntersecting;
      sync();
    });
    io.observe(el);
    const enter = () => ((hold.current.hover = true), sync());
    const leave = () => ((hold.current.hover = false), sync());
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("focusin", enter);
    el.addEventListener("focusout", leave);

    let startX = 0;
    const down = (e: PointerEvent) => (startX = e.clientX);
    const up = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 40) go((current.current + (dx < 0 ? 1 : slides.length - 1)) % slides.length);
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointerup", up);

    let tilt: ((e: PointerEvent) => void) | null = null;
    let untilt: (() => void) | null = null;
    const frame = el.querySelector<HTMLElement>("[data-frame]");
    if (frame && isFinePointer() && !prefersReducedMotion()) {
      const rx = gsap.quickTo(frame, "rotationX", { duration: 1, ease: "power3.out" });
      const ry = gsap.quickTo(frame, "rotationY", { duration: 1, ease: "power3.out" });
      tilt = (e) => {
        const r = el.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 8);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 6);
      };
      untilt = () => {
        rx(0);
        ry(0);
      };
      el.addEventListener("pointermove", tilt);
      el.addEventListener("pointerleave", untilt);
    }

    return () => {
      io.disconnect();
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("focusin", enter);
      el.removeEventListener("focusout", leave);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointerup", up);
      if (tilt) el.removeEventListener("pointermove", tilt);
      if (untilt) el.removeEventListener("pointerleave", untilt);
    };
  }, [go, sync, slides.length]);

  const slide = slides[active];

  return (
    <div ref={root} className={styles.slider} role="region" aria-roledescription="carousel" aria-label="Stores we built" data-reveal="scale" data-immediate data-delay="0.3">
      <div className={styles.stage}>
        <div className={styles.frame} data-frame>
          <div className={styles.bar} aria-hidden="true">
            <span className={styles.dots}>
              <i />
              <i />
              <i />
            </span>
            <span className={styles.url}>
              <span key={slide.domain} className={styles.urlText}>
                {slide.domain}
              </span>
            </span>
          </div>
          <div className={styles.viewport}>
            {slides.map((s, i) => (
              <Link
                key={s.slug}
                href={s.href}
                className={styles.shot}
                data-shot
                data-cursor="View"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${slides.length}: ${s.name} case study`}
                aria-hidden={i !== active}
                tabIndex={i === active ? 0 : -1}
                style={{ clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 0% 100%)", zIndex: i === 0 ? 2 : 1 }}
              >
                <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 44vw, 92vw" className={styles.img} loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <p className={styles.caption} aria-live="polite">
          <span className={styles.num}>{String(active + 1).padStart(2, "0")}</span>
          <span key={slide.slug} className={styles.name}>
            {slide.name} <span className={styles.industry}>· {slide.industry}</span>
          </span>
        </p>
        <div className={styles.controls}>
          {slides.map((s, i) => (
            <button
              key={s.slug}
              type="button"
              className={styles.track}
              aria-label={`Show ${s.name}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => go(i)}
            >
              <span className={styles.fill} data-fill />
            </button>
          ))}
          <button type="button" className={styles.pause} onClick={() => setPaused((p) => !p)} aria-label={paused ? "Play slideshow" : "Pause slideshow"}>
            {paused ? (
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M3 1.5v9l7.5-4.5z" fill="currentColor" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M3 1.5h2v9H3zM7 1.5h2v9H7z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
