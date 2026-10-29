"use client";

import { useEffect, useRef } from "react";
import type * as Three from "three";
import { gsap, isFinePointer, prefersReducedMotion } from "@/components/motion/gsap";
import { whenIntro } from "@/components/motion/intro";
import styles from "./HomeHero.module.css";

type ThreeModule = typeof Three;
type Scene = { destroy: () => void };

/**
 * Home hero WebGL layer (three.js, loaded on demand), behind the hero content:
 *
 * - Background: a slow field of dots in the lower part of the hero, cresting brand red,
 *   with a soft ripple and a little camera parallax that follow the pointer.
 * - Headline: the real H1 is sampled glyph by glyph into particles. After the preloader they
 *   stream out of the 3D logo and assemble the headline, then the crisp text fades in over them.
 *   On desktop, hovering the headline turns the letters under the cursor back into particles
 *   that drift aside and settle when the cursor moves on.
 *
 * The H1 stays real text throughout (SEO, selection, screen readers). Without WebGL it simply
 * fades in; with reduced motion the text is shown as is and the dots hold still.
 */
export function HeroScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const hero = canvas?.parentElement;
    const title = hero?.querySelector<HTMLElement>("[data-hero-title]");
    if (!canvas || !hero || !title) return;

    let scene: Scene | null = null;
    let cancelled = false;
    let stopWaiting = () => {};
    const fallback = () => {
      stopWaiting = whenIntro(() => gsap.to(title, { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: 0.2 }));
    };

    import("three")
      .then(async (THREE) => {
        await document.fonts?.ready;
        if (cancelled) return;
        scene = createScene(THREE, canvas, hero, title);
        if (!scene) fallback();
      })
      .catch(fallback);

    return () => {
      cancelled = true;
      stopWaiting();
      scene?.destroy();
    };
  }, []);

  return <canvas ref={ref} className={styles.scene} aria-hidden="true" />;
}

/** Overall brightness of the background dot field. */
const WAVE_STRENGTH = 1.7;

/* ------------------------------------------------------------------ shaders */

const POINT_FRAGMENT = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.12, d) * vAlpha;
  if (a < 0.003) discard;
  gl_FragColor = vec4(vColor * a, a);
}`;

const WAVE_VERTEX = /* glsl */ `
uniform float uTime;
uniform float uDpr;
uniform float uFade;
uniform vec2 uMouse;
uniform float uMouseOn;
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec3 p = position;
  float t = uTime;
  float w = sin(p.x * 0.32 + t * 0.55) * 0.42
          + sin(p.z * 0.42 - t * 0.8) * 0.5
          + sin((p.x + p.z) * 0.2 + t * 0.35) * 0.55;
  float md = distance(p.xz, uMouse);
  w += uMouseOn * 0.55 * exp(-md * md * 0.06) * sin(md * 1.3 - t * 2.4);
  p.y = w;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float crest = smoothstep(0.35, 1.35, w);
  gl_PointSize = uDpr * (2.6 + crest * 2.4) * (11.0 / -mv.z);
  float depth = smoothstep(25.0, 10.0, -mv.z) * smoothstep(1.5, 4.0, -mv.z);
  float edge = smoothstep(17.0, 8.0, abs(p.x));
  vColor = mix(vec3(0.5, 0.47, 0.47), vec3(1.15, 0.16, 0.2), crest);
  vAlpha = depth * edge * uFade * (0.5 + crest * 0.5);
}`;

const TEXT_VERTEX = /* glsl */ `
uniform float uIntro;     // seconds since the assembly started
uniform float uDur;       // flight time of one particle
uniform float uIntroVis;  // 1 while assembling, fades to 0 as the real text appears
uniform float uTime;
uniform vec2 uPointer;    // hero px
uniform float uLens;      // hover radius in px (0 = off)
uniform float uDpr;
attribute vec2 aHome;
attribute vec2 aStart;
attribute vec3 aColor;
attribute float aDelay;
attribute float aSeed;
attribute float aSize;
varying vec3 vColor;
varying float vAlpha;

void main() {
  // Assembly: a curved flight from the 3D logo to the glyph, easing out.
  float k = clamp((uIntro - aDelay) / uDur, 0.0, 1.0);
  float e = 1.0 - pow(1.0 - k, 4.0);
  vec2 ctrl = mix(aStart, aHome, 0.5) + vec2(sin(aSeed * 6.283) * 140.0, -90.0 - abs(cos(aSeed * 9.1)) * 180.0);
  vec2 p = mix(mix(aStart, ctrl, e), mix(ctrl, aHome, e), e);
  p += vec2(sin(uIntro * 3.1 + aSeed * 21.0), cos(uIntro * 2.6 + aSeed * 17.0)) * 10.0 * (1.0 - e);

  // Hover: letters under the cursor dissolve and drift outward, then settle.
  vec2 d = aHome - uPointer;
  float dist = length(d);
  float lens = max(uLens, 0.001);
  float inLens = uLens > 0.5 ? 1.0 - clamp((dist - 0.55 * lens) / (0.45 * lens), 0.0, 1.0) : 0.0;
  float push = uLens > 0.5 ? pow(max(0.0, 1.0 - dist / lens), 2.0) : 0.0;
  vec2 dir = dist > 0.001 ? d / dist : vec2(0.0);
  p += dir * push * lens * 0.42;
  p += vec2(-dir.y, dir.x) * push * 12.0 * sin(uTime * 1.4 + aSeed * 12.0);
  p += vec2(sin(uTime * 1.9 + aSeed * 30.0), cos(uTime * 2.2 + aSeed * 25.0)) * 1.4 * inLens;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(p.x, -p.y, 0.0, 1.0);
  gl_PointSize = aSize * uDpr * (1.0 + (1.0 - e) * 0.9 + push * 0.7);
  float flight = smoothstep(0.0, 0.12, k);
  vAlpha = max(flight * uIntroVis, inLens * (1.0 - uIntroVis));
  vColor = mix(aColor, vec3(1.0, 0.36, 0.3), max(push, (1.0 - e) * 0.5));
}`;

/* ------------------------------------------------------------------ sampling */

type Glyphs = { home: Float32Array; color: Float32Array; count: number; step: number };

/**
 * Draws the headline's characters at their exact on-screen positions (Range rects), with each
 * character's own font and colour, then samples the ink into particles (hero px coordinates).
 */
function sampleTitle(title: HTMLElement, hero: HTMLElement, maxCount: number): Glyphs | null {
  const hb = hero.getBoundingClientRect();
  const tb = title.getBoundingClientRect();
  const pad = 6;
  const w = Math.ceil(tb.width) + pad * 2;
  const h = Math.ceil(tb.height) + pad * 2;
  if (w < 10 || h < 10) return null;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  const range = document.createRange();
  const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
  ctx.textBaseline = "alphabetic";
  for (let node = walker.nextNode() as Text | null; node; node = walker.nextNode() as Text | null) {
    const cs = getComputedStyle(node.parentElement ?? title);
    ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    ctx.fillStyle = cs.color;
    const text = node.data;
    for (let i = 0; i < text.length; i++) {
      if (/\s/.test(text[i])) continue;
      range.setStart(node, i);
      range.setEnd(node, i + 1);
      const r = range.getClientRects()[0];
      if (!r) continue;
      const m = ctx.measureText(text[i]);
      const ascent = m.fontBoundingBoxAscent;
      const y = r.top - tb.top + pad + (r.height - (ascent + m.fontBoundingBoxDescent)) / 2 + ascent;
      ctx.fillText(text[i], r.left - tb.left + pad, y);
    }
  }

  const data = ctx.getImageData(0, 0, w, h).data;
  let ink = 0;
  for (let i = 3; i < data.length; i += 4) if (data[i] > 128) ink++;
  const step = Math.max(1.5, Math.sqrt(ink / maxCount));
  const homes: number[] = [];
  const colors: number[] = [];
  const ox = tb.left - hb.left - pad;
  const oy = tb.top - hb.top - pad;
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const jx = x + (Math.random() - 0.5) * step * 0.6;
      const jy = y + (Math.random() - 0.5) * step * 0.6;
      const idx = (Math.min(h - 1, Math.max(0, Math.round(jy))) * w + Math.min(w - 1, Math.max(0, Math.round(jx)))) * 4;
      if (data[idx + 3] <= 128) continue;
      homes.push(ox + jx, oy + jy);
      colors.push(data[idx] / 255, data[idx + 1] / 255, data[idx + 2] / 255);
    }
  }
  return { home: new Float32Array(homes), color: new Float32Array(colors), count: homes.length / 2, step };
}

/* ------------------------------------------------------------------ scene */

function createScene(THREE: ThreeModule, canvas: HTMLCanvasElement, hero: HTMLElement, title: HTMLElement): Scene | null {
  let renderer: Three.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "high-performance" });
  } catch {
    return null;
  }
  const reduced = prefersReducedMotion();
  const fine = isFinePointer();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);
  renderer.autoClear = false;

  const additive = (vertexShader: string, uniforms: Record<string, Three.IUniform>) =>
    new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader: POINT_FRAGMENT,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

  /* Background dots */
  const waveScene = new THREE.Scene();
  const waveCamera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
  const cols = 150;
  const rows = 70;
  const wavePos = new Float32Array(cols * rows * 3);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = (r * cols + c) * 3;
      wavePos[i] = (c / (cols - 1) - 0.5) * 34;
      wavePos[i + 2] = -26 + (r / (rows - 1)) * 28;
    }
  }
  const waveGeo = new THREE.BufferGeometry();
  waveGeo.setAttribute("position", new THREE.BufferAttribute(wavePos, 3));
  const waveU = {
    uTime: { value: 0 },
    uDpr: { value: dpr },
    uFade: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, -40) },
    uMouseOn: { value: 0 },
  };
  const waveMat = additive(WAVE_VERTEX, waveU);
  waveScene.add(new THREE.Points(waveGeo, waveMat));

  /* Headline particles */
  const textScene = new THREE.Scene();
  const textCamera = new THREE.OrthographicCamera(0, 1, 0, -1, -10, 10);
  const textU = {
    uIntro: { value: 0 },
    uDur: { value: 1.35 },
    uIntroVis: { value: 0 },
    uTime: { value: 0 },
    uPointer: { value: new THREE.Vector2(-1e4, -1e4) },
    uLens: { value: 0 },
    uDpr: { value: dpr },
  };
  const textMat = additive(TEXT_VERTEX, textU);
  let textGeo: Three.BufferGeometry | null = null;
  let textPoints: Three.Points | null = null;
  let introEnd = 0;

  const origin = hero.querySelector<HTMLElement>("[data-particle-origin]")?.firstElementChild as HTMLElement | null;
  const maxParticles = () => (window.innerWidth < 768 ? 6000 : 14000);

  const buildText = () => {
    const glyphs = sampleTitle(title, hero, maxParticles());
    if (textPoints) {
      textScene.remove(textPoints);
      textGeo?.dispose();
    }
    if (!glyphs || !glyphs.count) return;
    const hb = hero.getBoundingClientRect();
    const ob = origin?.getBoundingClientRect();
    const from = ob && ob.width ? { x: ob.left - hb.left, y: ob.top - hb.top, w: ob.width, h: ob.height } : { x: hb.width * 0.7, y: hb.height * 0.3, w: 300, h: 300 };
    const n = glyphs.count;
    const start = new Float32Array(n * 2);
    const delay = new Float32Array(n);
    const seed = new Float32Array(n);
    const size = new Float32Array(n);
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    for (let i = 0; i < n; i++) {
      minX = Math.min(minX, glyphs.home[i * 2]);
      maxX = Math.max(maxX, glyphs.home[i * 2]);
      minY = Math.min(minY, glyphs.home[i * 2 + 1]);
      maxY = Math.max(maxY, glyphs.home[i * 2 + 1]);
    }
    const spanX = Math.max(1, maxX - minX);
    const spanY = Math.max(1, maxY - minY);
    let lastDelay = 0;
    for (let i = 0; i < n; i++) {
      start[i * 2] = from.x + from.w * (0.25 + Math.random() * 0.5);
      start[i * 2 + 1] = from.y + from.h * (0.2 + Math.random() * 0.6);
      // Reading order: line by line, left to right.
      delay[i] = ((glyphs.home[i * 2 + 1] - minY) / spanY) * 0.45 + ((glyphs.home[i * 2] - minX) / spanX) * 0.75 + Math.random() * 0.3;
      lastDelay = Math.max(lastDelay, delay[i]);
      seed[i] = Math.random();
      size[i] = glyphs.step * (1.05 + Math.random() * 0.35);
    }
    introEnd = lastDelay + textU.uDur.value;
    textGeo = new THREE.BufferGeometry();
    textGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    textGeo.setAttribute("aHome", new THREE.BufferAttribute(glyphs.home, 2));
    textGeo.setAttribute("aStart", new THREE.BufferAttribute(start, 2));
    textGeo.setAttribute("aColor", new THREE.BufferAttribute(glyphs.color, 3));
    textGeo.setAttribute("aDelay", new THREE.BufferAttribute(delay, 1));
    textGeo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    textGeo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    textPoints = new THREE.Points(textGeo, textMat);
    textPoints.frustumCulled = false;
    textScene.add(textPoints);
  };

  /* Size */
  let width = 0;
  let height = 0;
  let lensSize = 100;
  const resize = () => {
    lensSize = Math.min(150, Math.max(80, (parseFloat(getComputedStyle(title).fontSize) || 80) * 1.25));
    const box = hero.getBoundingClientRect();
    width = box.width;
    height = box.height;
    renderer.setSize(width, height, false);
    waveCamera.aspect = width / height;
    // Keep the dot field low in the frame on every aspect ratio.
    waveCamera.fov = width / height < 1 ? 62 : 42;
    waveCamera.updateProjectionMatrix();
    textCamera.right = width;
    textCamera.bottom = -height;
    textCamera.updateProjectionMatrix();
  };

  /* Pointer */
  const pointer = { x: -1e4, y: -1e4, nx: 0, ny: 0, over: false, inside: false };
  const smooth = { x: -1e4, y: -1e4, lens: 0, nx: 0, ny: 0, mouseOn: 0 };
  const onMove = (e: PointerEvent) => {
    const hb = hero.getBoundingClientRect();
    pointer.x = e.clientX - hb.left;
    pointer.y = e.clientY - hb.top;
    pointer.nx = (pointer.x / hb.width) * 2 - 1;
    pointer.ny = (pointer.y / hb.height) * 2 - 1;
    pointer.inside = true;
    const tb = title.getBoundingClientRect();
    pointer.over = e.clientX > tb.left - 30 && e.clientX < tb.right + 30 && e.clientY > tb.top - 20 && e.clientY < tb.bottom + 20;
    if (smooth.x < -1e3) {
      smooth.x = pointer.x;
      smooth.y = pointer.y;
    }
  };
  const onLeave = () => {
    pointer.over = false;
    pointer.inside = false;
  };

  /* Intro + loop */
  let phase: "waiting" | "assembling" | "done" = reduced ? "done" : "waiting";
  let introStart = 0;
  let raf = 0;
  let visible = true;
  let last = performance.now();
  const ray = new THREE.Raycaster();
  const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const hit = new THREE.Vector3();
  const ndc = new THREE.Vector2();

  let lastMask = "";
  const showTitle = () => {
    if (phase === "done") return;
    phase = "done";
    gsap.to(title, { opacity: 1, duration: 0.55, ease: "power2.out" });
    gsap.to(textU.uIntroVis, { value: 0, duration: 0.7, ease: "power2.out" });
  };

  const render = (now: number) => {
    raf = 0;
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    const t = now / 1000;
    const lerp = (rate: number) => 1 - Math.pow(1 - rate, dt * 60);

    // Background
    waveU.uTime.value = t;
    const hb = hero.getBoundingClientRect();
    const scrollFade = Math.min(1, Math.max(0, 1 + hb.top / (hb.height * 0.9)));
    waveU.uFade.value += ((phase === "waiting" ? 0 : WAVE_STRENGTH * scrollFade) - waveU.uFade.value) * lerp(0.03);
    smooth.nx += (pointer.nx - smooth.nx) * lerp(0.04);
    smooth.ny += (pointer.ny - smooth.ny) * lerp(0.04);
    waveCamera.position.set(smooth.nx * 0.9, 3.1 - smooth.ny * 0.35, 9);
    waveCamera.lookAt(smooth.nx * 0.4, 0.2, -6);
    if (pointer.inside && fine) {
      ndc.set(pointer.nx, -pointer.ny);
      ray.setFromCamera(ndc, waveCamera);
      if (ray.ray.intersectPlane(ground, hit)) waveU.uMouse.value.lerp(new THREE.Vector2(hit.x, hit.z), lerp(0.08));
    }
    smooth.mouseOn += ((pointer.inside && fine ? 1 : 0) - smooth.mouseOn) * lerp(0.04);
    waveU.uMouseOn.value = smooth.mouseOn;

    // Headline
    textU.uTime.value = t;
    if (phase === "assembling") {
      textU.uIntro.value = (now - introStart) / 1000;
      if (textU.uIntro.value > introEnd - 0.3) showTitle();
    }
    if (fine && phase === "done") {
      smooth.x += (pointer.x - smooth.x) * lerp(0.2);
      smooth.y += (pointer.y - smooth.y) * lerp(0.2);
      const target = pointer.over ? lensSize : 0;
      smooth.lens += (target - smooth.lens) * lerp(pointer.over ? 0.12 : 0.08);
      if (smooth.lens < 0.5 && !pointer.over) smooth.lens = 0;
      textU.uPointer.value.set(smooth.x, smooth.y);
      textU.uLens.value = smooth.lens;
      // Hide the real letters inside the lens; the particles take their place there.
      const tb = title.getBoundingClientRect();
      const mask =
        smooth.lens > 0.5
          ? `radial-gradient(circle at ${smooth.x - (tb.left - hb.left)}px ${smooth.y - (tb.top - hb.top)}px, transparent ${smooth.lens * 0.55}px, #000 ${smooth.lens}px)`
          : "";
      if (mask !== lastMask) {
        lastMask = mask;
        title.style.maskImage = mask;
        title.style.setProperty("-webkit-mask-image", mask);
      }
    }

    renderer.clear();
    renderer.render(waveScene, waveCamera);
    if (textPoints && (textU.uIntroVis.value > 0.001 || textU.uLens.value > 0.5)) renderer.render(textScene, textCamera);
    if (!reduced) schedule();
  };
  const schedule = () => {
    if (!raf && visible && phase !== "waiting") raf = requestAnimationFrame(render);
  };

  /* Observers */
  let resizeTimer = 0;
  let sizeKey = "";
  const ro = new ResizeObserver(() => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      const hb = hero.getBoundingClientRect();
      const tb = title.getBoundingClientRect();
      const key = [hb.width, hb.height, tb.width, tb.height, tb.left - hb.left, tb.top - hb.top].map(Math.round).join();
      if (key === sizeKey) return;
      sizeKey = key;
      resize();
      buildText();
      if (phase === "assembling") showTitle();
      if (reduced) render(performance.now());
    }, 120);
  });
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    schedule();
  });

  resize();
  if (!reduced) buildText();
  {
    const hb = hero.getBoundingClientRect();
    const tb = title.getBoundingClientRect();
    sizeKey = [hb.width, hb.height, tb.width, tb.height, tb.left - hb.left, tb.top - hb.top].map(Math.round).join();
  }
  ro.observe(hero);
  io.observe(hero);
  renderer.compile(waveScene, waveCamera);
  renderer.compile(textScene, textCamera);

  hero.addEventListener("pointermove", onMove);
  hero.addEventListener("pointerleave", onLeave);

  let failsafe = 0;
  const stopWaiting = whenIntro(() => {
    if (reduced) {
      waveU.uFade.value = WAVE_STRENGTH;
      render(performance.now());
      return;
    }
    phase = "assembling";
    introStart = performance.now() + 150;
    textU.uIntroVis.value = 1;
    last = performance.now();
    schedule();
    // Never leave the headline hidden.
    failsafe = window.setTimeout(showTitle, 6000);
  });
  if (reduced) {
    waveU.uFade.value = WAVE_STRENGTH;
    render(performance.now());
  }

  return {
    destroy() {
      stopWaiting();
      window.clearTimeout(failsafe);
      window.clearTimeout(resizeTimer);
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      gsap.killTweensOf(textU.uIntroVis);
      title.style.maskImage = "";
      title.style.removeProperty("-webkit-mask-image");
      waveGeo.dispose();
      waveMat.dispose();
      textGeo?.dispose();
      textMat.dispose();
      renderer.dispose();
    },
  };
}
