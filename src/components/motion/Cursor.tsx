"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "./gsap";
import styles from "./Cursor.module.css";

/**
 * A soft follower that trails the native cursor (which stays visible for accessibility).
 * It grows over links/buttons, and shows a label over elements with data-cursor="Label".
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const el = ref.current;
    if (!el || !isFinePointer() || prefersReducedMotion()) return;
    el.dataset.enabled = "true";
    el.dataset.hidden = "true"; // stay hidden until the first pointer move

    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      if (el.dataset.hidden === "true") {
        gsap.set(el, { x: e.clientX, y: e.clientY });
        el.dataset.hidden = "false";
      }
      xTo(e.clientX);
      yTo(e.clientY);
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, [role='button'], summary, input, textarea, select");
      const text = target?.dataset.cursor;
      if (text && label.current) label.current.textContent = text;
      el.dataset.state = text ? "label" : target ? (target.matches("input, textarea, select") ? "text" : "hover") : "";
      el.dataset.dark = (e.target as HTMLElement).closest(".theme-dark, .theme-red") ? "true" : "false";
    };
    const down = () => (el.dataset.down = "true");
    const up = () => (el.dataset.down = "false");
    const leave = () => (el.dataset.hidden = "true");
    const enter = () => (el.dataset.hidden = "false");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
    };
  }, []);

  useEffect(() => {
    if (ref.current) ref.current.dataset.state = "";
  }, [pathname]);

  return (
    <div ref={ref} className={styles.cursor} aria-hidden="true">
      <span className={styles.dot} />
      <span ref={label} className={styles.label} />
    </div>
  );
}
