"use client";

import { useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion } from "@/components/motion/gsap";

/** Card that tilts in 3D toward the pointer and casts a moving highlight (--mx/--my). */
export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !isFinePointer() || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    gsap.to(el, { rotationY: (x - 0.5) * 10, rotationX: (0.5 - y) * 8, duration: 0.8, ease: "power3.out", transformPerspective: 1200 });
  };
  const onLeave = () => {
    if (ref.current) gsap.to(ref.current, { rotationY: 0, rotationX: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" });
  };

  return (
    <div ref={ref} className={className} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </div>
  );
}
