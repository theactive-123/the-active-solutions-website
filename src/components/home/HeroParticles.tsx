"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/components/motion/gsap";
import { whenIntro } from "@/components/motion/intro";
import styles from "./HomeHero.module.css";

/**
 * Interactive particle type for the home hero (desktop only, ≥1024px).
 *
 * The words are drawn in the site's display font, sampled into ~4k particles (bright outlines,
 * a dim fill) and rendered with WebGL as soft additive points. After the preloader the
 * particles fly out of the 3D logo and settle into the words. The pointer pushes them away
 * (they glow brand red as they move); pressing and holding over the words blasts them apart,
 * and they reform on release. Text is placed in the hero's empty `[data-particle-slot]`.
 */
export function HeroParticles({ text }: { text: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const hero = canvas?.parentElement;
    if (!canvas || !hero) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    let engine: Engine | null = null;
    const sync = () => {
      if (desktop.matches && !engine) engine = createEngine(canvas, hero, text);
      else if (!desktop.matches && engine) {
        engine.destroy();
        engine = null;
      }
    };
    sync();
    desktop.addEventListener("change", sync);
    return () => {
      desktop.removeEventListener("change", sync);
      engine?.destroy();
    };
  }, [text]);

  return <canvas ref={ref} className={styles.particles} aria-hidden="true" />;
}

/* ------------------------------------------------------------------ engine */

type Engine = { destroy: () => void };

const MAX_EDGE = 2800;
const MAX_FILL = 1300;
const STRIDE = 7; // x, y, r, g, b, size, alpha

const VERTEX = `
attribute vec2 aPos;
attribute vec3 aColor;
attribute vec2 aMeta;
uniform vec2 uRes;
uniform float uDpr;
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec2 clip = aPos / uRes * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = aMeta.x * uDpr;
  vColor = aColor;
  vAlpha = aMeta.y;
}`;

const FRAGMENT = `
precision mediump float;
varying vec3 vColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.12, d);
  a = a * sqrt(a) * vAlpha;
  gl_FragColor = vec4(vColor * a, a);
}`;

// Brand colours (linear-ish, 0–1)
const WHITE = [1, 0.96, 0.94];
const RED = [0.92, 0.13, 0.16];
const EMBER = [1, 0.5, 0.26];

const smooth = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

function compile(gl: WebGLRenderingContext) {
  const shader = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  };
  const program = gl.createProgram()!;
  gl.attachShader(program, shader(gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(program, shader(gl.FRAGMENT_SHADER, FRAGMENT));
  gl.linkProgram(program);
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
}

type Target = { x: number; y: number; size: number; alpha: number };

/** Seeded random numbers: every rebuild picks the same points, so a resize only nudges them. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Layout = { lines: string[]; size: number; left: number; top: number };
const LINE_HEIGHT = 0.9;

/** Largest font size at which the words fit the box; text is left-aligned and vertically centred. */
function fitText(text: string, box: DOMRect, font: string, ctx: CanvasRenderingContext2D): Layout {
  const lines = text.toUpperCase().split("\n");
  ctx.font = `600 100px ${font}`;
  const widest = Math.max(...lines.map((l) => ctx.measureText(l).width));
  const size = Math.min((box.width * 0.98) / (widest / 100), box.height / (lines.length * LINE_HEIGHT), 300);
  return { lines, size, left: box.left, top: box.top + (box.height - size * LINE_HEIGHT * lines.length) / 2 };
}

/** Samples the words into outline points (bright) and an interior grid (dim). */
function sampleText(layout: Layout, box: DOMRect, font: string, ctx: CanvasRenderingContext2D): Target[] {
  const w = Math.max(1, Math.floor(box.width));
  const h = Math.max(1, Math.floor(box.height));
  ctx.canvas.width = w;
  ctx.canvas.height = h;
  const { lines, size } = layout;
  const top = layout.top - box.top;
  ctx.font = `600 ${size}px ${font}`;
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#fff";
  lines.forEach((line, i) => ctx.fillText(line, 0, top + size * LINE_HEIGHT * (i + 0.5)));

  const data = ctx.getImageData(0, 0, w, h).data;
  const random = seeded(7);
  const filled = (x: number, y: number) => x >= 0 && y >= 0 && x < w && y < h && data[(y * w + x) * 4 + 3] > 140;

  const edges: Target[] = [];
  const fill: Target[] = [];
  const gap = Math.max(6, Math.round(size / 26));
  for (let y = 0; y < h; y += 2) {
    for (let x = 0; x < w; x += 2) {
      if (!filled(x, y)) continue;
      const edge = !filled(x - 2, y) || !filled(x + 2, y) || !filled(x, y - 2) || !filled(x, y + 2);
      if (edge) edges.push({ x: box.left + x, y: box.top + y, size: 2.8 + random() * 1.6, alpha: 1 });
      else if (x % gap === 0 && y % gap === 0) fill.push({ x: box.left + x, y: box.top + y, size: 2.2, alpha: 0.42 });
    }
  }
  const pick = (list: Target[], max: number) => {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list.slice(0, max);
  };
  return [...pick(edges, MAX_EDGE), ...pick(fill, MAX_FILL)];
}

function createEngine(canvas: HTMLCanvasElement, hero: HTMLElement, text: string): Engine | null {
  const gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: true });
  const program = gl && compile(gl);
  const slot = hero.querySelector<HTMLElement>("[data-particle-slot]");
  if (!gl || !program || !slot) return null;

  const reduced = prefersReducedMotion();
  const origin = hero.querySelector<HTMLElement>("[data-particle-origin]")?.firstElementChild as HTMLElement | null;

  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  const bytes = STRIDE * 4;
  const attr = (name: string, size: number, offset: number) => {
    const loc = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, bytes, offset * 4);
  };
  attr("aPos", 2, 0);
  attr("aColor", 3, 2);
  attr("aMeta", 2, 5);
  const uRes = gl.getUniformLocation(program, "uRes");
  const uDpr = gl.getUniformLocation(program, "uDpr");
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE); // additive glow
  gl.clearColor(0, 0, 0, 0);

  // Particle state
  let n = 0;
  let px = new Float32Array(0), py = px, vx = px, vy = px, hx = px, hy = px, size = px, alpha = px, phase = px, delay = px;
  let out = new Float32Array(0);
  let width = 0;
  let height = 0;
  let dpr = 1;

  let started = false;
  let startAt = 0;
  const pointer = { x: -1e4, y: -1e4, down: false };
  let raf = 0;
  let visible = true;

  const rectIn = (el: Element) => {
    const r = el.getBoundingClientRect();
    const h = hero.getBoundingClientRect();
    return new DOMRect(r.left - h.left, r.top - h.top, r.width, r.height);
  };

  const measure = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  if (!measure) return null;
  let layout: Layout | null = null;
  let sizeKey = "";
  const build = () => {
    const box = hero.getBoundingClientRect();
    const slotBox = slot.getBoundingClientRect();
    sizeKey = [box.width, box.height, slotBox.width, slotBox.height, slotBox.top - box.top].map(Math.round).join();
    width = box.width;
    height = box.height;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, width, height);
    gl.uniform1f(uDpr, dpr);

    const font = getComputedStyle(hero.querySelector("h1") ?? hero).fontFamily;
    const slotRect = rectIn(slot);
    const next = fitText(text, slotRect, font, measure);

    if (layout && n) {
      // Resize: scale the existing word to its new size and place, so particles glide there
      // instead of being reshuffled.
      const k = next.size / layout.size;
      for (let i = 0; i < n; i++) {
        hx[i] = next.left + (hx[i] - layout.left) * k;
        hy[i] = next.top + (hy[i] - layout.top) * k;
        if (reduced) {
          px[i] = hx[i];
          py[i] = hy[i];
        }
      }
      layout = next;
      return;
    }

    layout = next;
    const targets = sampleText(next, slotRect, font, measure);
    const from = origin ? rectIn(origin) : new DOMRect(width * 0.75, height * 0.3, 200, 200);

    n = targets.length;
    px = new Float32Array(n);
    py = new Float32Array(n);
    vx = new Float32Array(n);
    vy = new Float32Array(n);
    hx = new Float32Array(n);
    hy = new Float32Array(n);
    size = new Float32Array(n);
    alpha = new Float32Array(n);
    phase = new Float32Array(n);
    delay = new Float32Array(n);
    out = new Float32Array(n * STRIDE);

    const left = Math.min(...targets.map((t) => t.x));
    const span = Math.max(1, Math.max(...targets.map((t) => t.x)) - left);
    targets.forEach((t, i) => {
      hx[i] = t.x;
      hy[i] = t.y;
      size[i] = t.size;
      alpha[i] = t.alpha;
      phase[i] = Math.random() * Math.PI * 2;
      if (reduced) {
        px[i] = t.x;
        py[i] = t.y;
      } else {
        // Start inside the 3D logo; leave left to right so the words write themselves.
        px[i] = from.left + from.width * (0.2 + Math.random() * 0.6);
        py[i] = from.top + from.height * (0.15 + Math.random() * 0.7);
        vx[i] = (Math.random() - 0.5) * 6;
        vy[i] = (Math.random() - 0.5) * 6;
        delay[i] = ((t.x - left) / span) * 900 + Math.random() * 300;
      }
    });
    gl.bufferData(gl.ARRAY_BUFFER, out.byteLength, gl.DYNAMIC_DRAW);
  };

  let last = 0;
  const frame = (now: number) => {
    raf = 0;
    // Physics runs in sub-steps of at most one 60fps frame, so particles settle in the same
    // real time on slower screens (down to ~15fps).
    const elapsed = last ? Math.min((now - last) / 16.67, 4) : 1;
    const steps = Math.max(1, Math.ceil(elapsed));
    const f = elapsed / steps;
    last = now;
    const t = now - startAt;
    const R = pointer.down ? 240 : 115;
    const R2 = R * R;
    const push = pointer.down ? 5.5 : 2.4;
    const damp = Math.pow(pointer.down ? 0.9 : 0.86, f);
    const K = pointer.down ? 0.012 : 0.032;

    for (let i = 0; i < n; i++) {
      const life = reduced ? 1 : Math.min(1, Math.max(0, (t - delay[i]) / 500));
      if (life > 0 && !reduced) {
        for (let step = 0; step < steps; step++) {
          let ax = (hx[i] - px[i]) * K;
          let ay = (hy[i] - py[i]) * K;
          const dx = px[i] - pointer.x;
          const dy = py[i] - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const k = (1 - d / R) ** 2 * push;
            ax += (dx / d) * k;
            ay += (dy / d) * k;
          }
          vx[i] = (vx[i] + ax * f) * damp;
          vy[i] = (vy[i] + ay * f) * damp;
          px[i] += vx[i] * f;
          py[i] += vy[i] * f;
        }
      }

      const ox = px[i] - hx[i];
      const oy = py[i] - hy[i];
      const disp = Math.sqrt(ox * ox + oy * oy);
      const toRed = smooth(2, 28, disp);
      const toEmber = smooth(70, 200, disp);
      // A soft highlight sweeps across the words.
      const shine = reduced ? 1 : 0.8 + 0.2 * Math.sin(hx[i] * 0.011 - now * 0.0014);
      const settle = 1 - smooth(0, 6, disp);
      const o = i * STRIDE;
      out[o] = px[i] + (reduced ? 0 : Math.sin(now * 0.0011 + phase[i]) * 0.6 * settle);
      out[o + 1] = py[i] + (reduced ? 0 : Math.cos(now * 0.0013 + phase[i]) * 0.6 * settle);
      for (let c = 0; c < 3; c++) {
        const base = WHITE[c] + (RED[c] - WHITE[c]) * toRed;
        out[o + 2 + c] = base + (EMBER[c] - base) * toEmber;
      }
      out[o + 5] = size[i] * (1 + Math.min(disp / 45, 0.7));
      out[o + 6] = Math.min(1, alpha[i] * shine + toRed * 0.35) * life;
    }

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, out);
    gl.drawArrays(gl.POINTS, 0, n);
    if (!reduced) schedule();
  };
  const schedule = () => {
    if (!raf && started && visible) raf = requestAnimationFrame(frame);
  };

  // Pointer (relative to the hero)
  const onMove = (e: PointerEvent) => {
    const r = hero.getBoundingClientRect();
    pointer.x = e.clientX - r.left;
    pointer.y = e.clientY - r.top;
  };
  const onLeave = () => {
    pointer.x = pointer.y = -1e4;
    pointer.down = false;
  };
  const onDown = (e: PointerEvent) => {
    if (e.button !== 0 || !(e.target as Element).closest?.("[data-particle-slot]")) return;
    e.preventDefault(); // no text selection while holding
    onMove(e);
    pointer.down = true;
  };
  const onUp = () => (pointer.down = false);

  let resizeTimer = 0;
  const ro = new ResizeObserver(() => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      const box = hero.getBoundingClientRect();
      const box2 = slot.getBoundingClientRect();
      const key = [box.width, box.height, box2.width, box2.height, box2.top - box.top].map(Math.round).join();
      if (key === sizeKey) return;
      build();
      if (reduced) frame(performance.now());
    }, 150);
  });
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    schedule();
  });

  let stopWaiting = () => {};
  let destroyed = false;
  const onLost = (e: Event) => {
    e.preventDefault();
    destroy();
  };

  (document.fonts?.ready ?? Promise.resolve()).then(() => {
    if (destroyed) return;
    build();
    ro.observe(hero);
    io.observe(hero);
    if (reduced) {
      started = true;
      frame(performance.now());
      return;
    }
    slot.dataset.cursor = "Hold";
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    hero.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    stopWaiting = whenIntro(() => {
      startAt = performance.now() + 450;
      started = true;
      schedule();
    });
  });
  canvas.addEventListener("webglcontextlost", onLost);

  function destroy() {
    if (destroyed) return;
    destroyed = true;
    stopWaiting();
    cancelAnimationFrame(raf);
    window.clearTimeout(resizeTimer);
    ro.disconnect();
    io.disconnect();
    hero.removeEventListener("pointermove", onMove);
    hero.removeEventListener("pointerleave", onLeave);
    hero.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onUp);
    canvas.removeEventListener("webglcontextlost", onLost);
    delete slot!.dataset.cursor;
    if (!gl!.isContextLost()) {
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.deleteBuffer(buffer);
      gl!.deleteProgram(program);
    }
  }

  return { destroy };
}
