"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, ScrollTrigger, SplitText, isFinePointer, prefersReducedMotion } from "./gsap";
import { introPending, whenIntro } from "./intro";

/**
 * Declarative scroll animations. Server components opt in with data attributes:
 *
 *  data-split            Heading lines rise from a mask. Value: "lines" (default) | "words".
 *  data-reveal           "up" (default) | "fade" | "scale" | "left" | "right" | "clip" | "line". Optional data-delay.
 *  data-reveal-stagger   Children reveal one after another (value = stagger seconds).
 *  data-parallax         Scrubbed vertical drift; value is speed (e.g. "0.15", negative = up).
 *  data-scrub-words      Words brighten from faint to full as the paragraph scrolls through.
 *  data-count            Counts up to the element's numeric text.
 *  data-magnetic         Element follows the pointer slightly on hover.
 *  data-immediate        On split/reveal: play on load instead of on scroll (hero content).
 *
 * Render <MotionEngine /> as the LAST child of every page. Next hydrates each route segment
 * separately, so living inside the page guarantees the DOM it scans is already hydrated.
 */
export function MotionEngine() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready");

    if (prefersReducedMotion()) {
      root.classList.remove("js-motion");
      return;
    }

    const splits: SplitText[] = [];
    const cleanups: (() => void)[] = [];

    // On-load (data-immediate) animations wait for the preloader; they are created paused
    // so their start state hides the content, then restarted (with their delay) on release.
    let released = !introPending();
    const held = new Map<Element, gsap.core.Animation>();
    const hold = <T extends gsap.core.Animation>(el: Element, anim: T) => {
      if (!released && el.hasAttribute("data-immediate")) {
        anim.pause();
        held.set(el, anim);
      }
      return anim;
    };

    const ctx = gsap.context(() => {
      const trigger = (el: Element, start = "top 88%") =>
        el.hasAttribute("data-immediate") ? undefined : { trigger: el, start, once: true };
      const delayOf = (el: Element) => Number(el.getAttribute("data-delay") ?? 0) + (el.hasAttribute("data-immediate") ? 0.25 : 0);

      // Masked line reveals for headings
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const type = el.dataset.split === "words" ? "words" : "lines";
        const split = SplitText.create(el, {
          type: type === "words" ? "words,lines" : "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            gsap.set(el, { visibility: "visible" });
            const targets = type === "words" ? self.words : self.lines;
            return hold(el, gsap.from(targets, {
              yPercent: 115,
              rotate: type === "words" ? 4 : 2,
              transformOrigin: "0% 100%",
              duration: 1.25,
              stagger: type === "words" ? 0.04 : 0.1,
              delay: delayOf(el),
              ease: "expo.out",
              scrollTrigger: trigger(el),
            }));
          },
        });
        splits.push(split);
      });

      // Generic reveals
      const fromVars: Record<string, gsap.TweenVars> = {
        up: { y: 60 },
        fade: {},
        scale: { scale: 0.9, y: 30 },
        left: { x: -60 },
        right: { x: 60 },
        clip: { clipPath: "inset(100% 0% 0% 0%)", scale: 1.08 },
        line: { scaleX: 0, transformOrigin: "0% 50%" },
      };
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const kind = el.dataset.reveal || "up";
        const masked = kind === "clip" || kind === "line";
        hold(el, gsap.fromTo(
          el,
          { opacity: masked ? 1 : 0, ...(fromVars[kind] ?? fromVars.up) },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            ...(kind === "line" && { scaleX: 1 }),
            ...(kind === "clip" && { clipPath: "inset(0% 0% 0% 0%)" }),
            duration: masked ? 1.4 : 1.1,
            delay: delayOf(el),
            ease: masked ? "expo.inOut" : "expo.out",
            scrollTrigger: trigger(el),
          },
        ));
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((el) => {
        hold(el, gsap.fromTo(
          el.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: Number(el.dataset.revealStagger) || 0.1,
            delay: delayOf(el),
            scrollTrigger: trigger(el, "top 85%"),
          },
        ));
      });

      // Parallax drift
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0.15;
        gsap.fromTo(
          el,
          { yPercent: -speed * 100 },
          {
            yPercent: speed * 100,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });

      // Scroll-scrubbed word highlight
      gsap.utils.toArray<HTMLElement>("[data-scrub-words]").forEach((el) => {
        const split = SplitText.create(el, { type: "words" });
        splits.push(split);
        gsap.fromTo(
          split.words,
          { opacity: 0.18 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 50%", scrub: 0.6 },
          },
        );
      });

      // Number counters
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const text = el.textContent ?? "";
        const match = text.match(/\d+/);
        if (!match) return;
        const end = Number(match[0]);
        const pad = match[0].length;
        const counter = { v: 0 };
        el.setAttribute("aria-label", text);
        cleanups.push(() => (el.textContent = text));
        gsap.to(counter, {
          v: end,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = text.replace(match[0], String(Math.round(counter.v)).padStart(pad, "0"));
          },
        });
      });
    });

    // Magnetic hover (desktop pointers only). Added to the context so offsets revert on cleanup.
    if (isFinePointer()) ctx.add(() => {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
        const strength = Number(el.dataset.magnetic) || 0.3;
        const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * strength);
          yTo((e.clientY - (r.top + r.height / 2)) * strength);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      });
    });

    // Recalculate trigger positions once images and fonts have settled.
    // Sort first: pinned sections (e.g. Process) add height, so triggers must be measured top-down.
    const refresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    const t = window.setTimeout(refresh, 600);

    cleanups.push(
      whenIntro(() => {
        released = true;
        held.forEach((anim) => anim.restart(true));
        held.clear();
      }),
    );

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      // Revert tweens first: reverting a counter tween re-renders it at 0, so restore text afterwards.
      ctx.revert();
      splits.forEach((s) => s.revert());
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);

  return null;
}
