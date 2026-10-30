"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "./gsap";
import { introPending, releaseIntro } from "./intro";
import { createPreloaderScene, type PreloaderScene } from "./preloaderScene";
import styles from "./Preloader.module.css";

/** Shortest and longest time the preloader stays up (ms). */
const MIN_TIME = 1900;
/** Small screens skip the 3D logo, so there is less to show and the page appears sooner. */
const MIN_TIME_SMALL = 1300;
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
    const canvas = q<HTMLCanvasElement>("[data-pl-canvas]");
    const reduced = prefersReducedMotion();
    // three.js particle logo on larger screens only; phones keep the ring + mark (lighter, faster).
    const large = window.matchMedia("(min-width: 1024px)").matches;
    const minTime = reduced ? MIN_TIME_REDUCED : large ? MIN_TIME : MIN_TIME_SMALL;

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
    let cancelled = false;
    let tl: gsap.core.Timeline | null = null;

    // three.js particle logo (loaded on demand). Until it is ready, the ring + mark show progress.
    let scene: PreloaderScene | null = null;
    if (!reduced && large) {
      import("three")
        .then((THREE) => createPreloaderScene(THREE, canvas))
        .then((s) => {
          if (!s) return;
          if (cancelled || leaving) return s.destroy();
          scene = s;
          s.setProgress(shown / 100);
          gsap.to(canvas, { opacity: 1, duration: 0.9, ease: "power2.out" });
          gsap.to(mark, { opacity: 0, scale: 0.8, duration: 0.6, ease: "power2.in" });
        })
        .catch(() => {});
    }

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
      scene?.setProgress(shown / 100);
      if (shown === 100 && !leaving) {
        leaving = true;
        gsap.ticker.remove(tick);
        tl = exit();
      }
    };

    const release = () => {
      unblock();
      releaseIntro();
    };

    // Exit: with the particle logo, it bursts and the site opens through a portal with a red rim;
    // otherwise the dark panel and red curtain lift.
    const exit = () => {
      const t = gsap.timeline();
      t.call(() => el.setAttribute("data-state", "leaving"));
      const outs = el.querySelectorAll("[data-pl-out]");
      if (reduced) {
        t.call(release).to(el, { opacity: 0, duration: 0.5, ease: "power1.out" });
      } else if (scene) {
        const s = scene;
        const max = Math.hypot(window.innerWidth, window.innerHeight) / 2 + 40;
        const hole = { front: 0, back: 0 };
        const mask = (node: HTMLElement, r: number) => {
          const img = `radial-gradient(circle at 50% 50%, transparent ${r}px, #000 ${r + 2}px)`;
          node.style.maskImage = img;
          node.style.setProperty("-webkit-mask-image", img);
        };
        t.to(s.uniforms.uGather, { value: 1, duration: 0.5, ease: "power2.inOut" })
          .to(outs, { yPercent: -60, opacity: 0, duration: 0.5, ease: "power3.in", stagger: 0.04 }, "<")
          .to(s.uniforms.uBurst, { value: 1, duration: 1.3, ease: "power2.in" }, ">-0.1")
          .to(hole, { front: max, duration: 1.15, ease: "expo.inOut", onUpdate: () => mask(panel, hole.front) }, "<0.4")
          .to(hole, { back: max, duration: 1.15, ease: "expo.inOut", onUpdate: () => mask(back, hole.back) }, "<0.12")
          .call(release, undefined, "<0.3");
      } else {
        t.to(mark, { scale: 1.12, duration: 0.35, ease: "power2.inOut" })
          .to(outs, { yPercent: -60, opacity: 0, duration: 0.5, ease: "power3.in", stagger: 0.04 }, "-=0.2")
          .to(panel, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "-=0.3")
          .to(back, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "<0.14")
          // Start the hero as the curtain uncovers it.
          .call(release, undefined, "<0.35");
      }
      t.call(() => {
        el.setAttribute("data-state", "done");
        scene?.destroy();
        scene = null;
      });
      return t;
    };

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
        scene?.setPointer(nx * 2 - 1, ny * 2 - 1);
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
      cancelled = true;
      gsap.ticker.remove(tick);
      tl?.kill();
      scene?.destroy();
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
        <canvas className={styles.canvas} data-pl-canvas />
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
            <Image src="/images/brand/logo-mark.png" alt="" width={78} height={72} loading="eager" fetchPriority="high" className={styles.logo} />
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
