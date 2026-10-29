"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "./gsap";
import { introPending, releaseIntro } from "./intro";
import styles from "./Preloader.module.css";

/** Shortest and longest time the preloader stays up (ms). */
const MIN_TIME = 1900;
const MIN_TIME_REDUCED = 500;
const MAX_TIME = 7000;

const RING = 2 * Math.PI * 52;
const WORDS = ["Design", "Build", "Grow"];
const SCROLL_KEYS = new Set(["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "]);

/**
 * First-load preloader. It is server-rendered (so nothing flashes before it) and shown while
 * <html> has `is-preloading`. Progress follows real loading (fonts, first-screen images,
 * window load), never runs faster than MIN_TIME and never waits longer than MAX_TIME.
 * On exit the dark panel and a red curtain lift; hero animations start as they pass.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !introPending()) return;

    const q = <T extends Element = HTMLElement>(sel: string) => el.querySelector<T>(sel)!;
    const panel = q("[data-pl-panel]");
    const back = q("[data-pl-back]");
    const count = q("[data-pl-count]");
    const ring = q<SVGCircleElement>("[data-pl-ring]");
    const mark = q("[data-pl-mark]");
    const words = el.querySelectorAll<HTMLElement>("[data-pl-word]");
    const reduced = prefersReducedMotion();
    const minTime = reduced ? MIN_TIME_REDUCED : MIN_TIME;

    // Block scrolling without hiding the scrollbar (hiding it would shift the layout on exit).
    const block = (e: Event) => {
      if (e instanceof KeyboardEvent && !SCROLL_KEYS.has(e.key)) return;
      e.preventDefault();
      e.stopPropagation();
    };
    const opts = { capture: true, passive: false } as const;
    window.addEventListener("wheel", block, opts);
    window.addEventListener("touchmove", block, opts);
    window.addEventListener("keydown", block, opts);
    const unblock = () => {
      window.removeEventListener("wheel", block, opts);
      window.removeEventListener("touchmove", block, opts);
      window.removeEventListener("keydown", block, opts);
    };

    // Real loading tasks: fonts, images visible in the first screen, window load.
    let total = 2;
    let done = 0;
    const finishTask = () => done++;
    if (document.fonts) document.fonts.ready.then(finishTask, finishTask);
    else finishTask();
    if (document.readyState === "complete") finishTask();
    else window.addEventListener("load", finishTask, { once: true });
    const pending: HTMLImageElement[] = [];
    const settled = new Set<EventTarget>();
    function imageDone(e: { currentTarget: EventTarget | null }) {
      if (!e.currentTarget || settled.has(e.currentTarget)) return;
      settled.add(e.currentTarget);
      finishTask();
    }
    for (const img of Array.from(document.images)) {
      // Only images rendered in the first screen; hidden lazy images (menus) never load.
      const r = img.getBoundingClientRect();
      const onScreen = r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;
      if (el.contains(img) || img.complete || !onScreen) continue;
      total++;
      pending.push(img);
      img.addEventListener("load", imageDone, { once: true });
      img.addEventListener("error", imageDone, { once: true });
    }
    // A single slow image never holds the page back for long.
    const imageCap = window.setTimeout(() => pending.forEach((img) => imageDone({ currentTarget: img })), 3500);

    const start = performance.now();
    let shown = 0;
    let lastInt = -1;
    let leaving = false;
    const tl = gsap.timeline({ paused: true });

    const render = () => {
      const int = Math.round(shown);
      if (int === lastInt) return;
      lastInt = int;
      count.textContent = String(int).padStart(3, "0");
      ring.style.strokeDashoffset = String(RING * (1 - shown / 100));
      words.forEach((w, i) => w.toggleAttribute("data-on", shown >= (i * 100) / WORDS.length + 4));
    };

    const tick = (_time: number, deltaMs: number) => {
      const elapsed = performance.now() - start;
      const loaded = Math.min(1, done / total);
      // Loading drives the target; a slow creep keeps the counter alive while a large image
      // loads (it never passes 90% before everything has loaded), and time keeps it from
      // finishing in a blink.
      const creep = 90 * (1 - Math.exp(-elapsed / 2600));
      let goal = Math.min(Math.max(12 + loaded * 88, loaded < 1 ? creep : 100), (elapsed / minTime) * 100);
      if (elapsed > MAX_TIME) goal = 100;
      const ease = 1 - Math.pow(1 - 0.09, deltaMs / 16.67);
      shown += (goal - shown) * ease;
      if (goal >= 100 && shown > 99.6) shown = 100;
      render();
      if (shown === 100 && !leaving) {
        leaving = true;
        gsap.ticker.remove(tick);
        tl.play();
      }
    };

    // Exit
    tl.call(() => el.setAttribute("data-state", "leaving"));
    if (reduced) {
      tl.call(() => {
        unblock();
        releaseIntro();
      }).to(el, { opacity: 0, duration: 0.5, ease: "power1.out" });
    } else {
      tl.to(mark, { scale: 1.12, duration: 0.35, ease: "power2.inOut" })
        .to(el.querySelectorAll("[data-pl-out]"), { yPercent: -60, opacity: 0, duration: 0.5, ease: "power3.in", stagger: 0.04 }, "-=0.2")
        .to(panel, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "-=0.3")
        .to(back, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "<0.14")
        // Start the hero as the curtain uncovers it.
        .call(
          () => {
            unblock();
            releaseIntro();
          },
          undefined,
          "<0.35",
        );
    }
    tl.call(() => el.setAttribute("data-state", "done"));

    // Interactive: the glow follows the pointer and the mark leans towards it.
    let move: ((e: PointerEvent) => void) | null = null;
    if (!reduced && isFinePointer()) {
      const gx = gsap.quickTo(panel, "--gx", { duration: 1.2, ease: "power3.out" });
      const gy = gsap.quickTo(panel, "--gy", { duration: 1.2, ease: "power3.out" });
      const rx = gsap.quickTo(mark, "rotationX", { duration: 0.9, ease: "power3.out" });
      const ry = gsap.quickTo(mark, "rotationY", { duration: 0.9, ease: "power3.out" });
      move = (e) => {
        const nx = e.clientX / window.innerWidth;
        const ny = e.clientY / window.innerHeight;
        gx(nx * 100);
        gy(ny * 100);
        ry((nx - 0.5) * 30);
        rx(-(ny - 0.5) * 24);
      };
      window.addEventListener("pointermove", move);
    }

    render();
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      tl.kill();
      unblock();
      if (move) window.removeEventListener("pointermove", move);
      window.removeEventListener("load", finishTask);
      window.clearTimeout(imageCap);
      pending.forEach((img) => {
        img.removeEventListener("load", imageDone);
        img.removeEventListener("error", imageDone);
      });
    };
  }, []);

  return (
    <div ref={root} className={styles.preloader} data-state="loading" aria-hidden="true">
      <div className={styles.back} data-pl-back />
      <div className={styles.panel} data-pl-panel>
        <div className={styles.glow} />
        <div className={styles.top}>
          <span data-pl-out>The Active Solutions</span>
          <span data-pl-out>[ SHOPIFY &amp; DTC GROWTH ]</span>
        </div>

        <div className={styles.center}>
          <div className={styles.mark} data-pl-mark>
            <svg className={styles.ring} viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" className={styles.track} />
              <circle cx="60" cy="60" r="52" className={styles.progress} data-pl-ring strokeDasharray={RING} strokeDashoffset={RING} />
            </svg>
            <Image src="/images/brand/logo-mark.png" alt="" width={78} height={72} priority className={styles.logo} />
          </div>
        </div>

        <div className={styles.bottom}>
          <ul role="list" className={styles.words} data-pl-out>
            {WORDS.map((w) => (
              <li key={w} data-pl-word>
                {w === "Grow" ? <em>{w}.</em> : `${w}.`}
              </li>
            ))}
          </ul>
          <p className={styles.count} data-pl-out>
            <span data-pl-count>000</span>
            <span className={styles.pct}>%</span>
          </p>
        </div>
      </div>
    </div>
  );
}
