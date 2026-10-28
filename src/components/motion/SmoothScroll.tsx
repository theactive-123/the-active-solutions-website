"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

/** Scrolls to a target with Lenis when active, falling back to native scrolling. */
export function scrollToTarget(lenis: Lenis | null, target: string | HTMLElement | number) {
  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === "number" ? 0 : -24, duration: 1.4 });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target });
  else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView();
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const instance = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1, anchors: false });
    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the instance only exists after mount
    setLenis(instance);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  // Route change: jump to the hash target or the top of the new page.
  useEffect(() => {
    const hash = window.location.hash;
    const target = hash ? document.querySelector<HTMLElement>(hash) : null;
    if (target) {
      requestAnimationFrame(() => scrollToTarget(lenis, target));
    } else {
      lenis?.scrollTo(0, { immediate: true, force: true });
    }
  }, [pathname, lenis]);

  // Smooth in-page anchor links (e.g. "/#work" while already on "/").
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>("a[href*='#']");
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      const url = new URL(a.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.querySelector<HTMLElement>(url.hash);
      if (!target) return;
      e.preventDefault();
      history.pushState(null, "", url.hash);
      scrollToTarget(lenis, target);
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [lenis]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
