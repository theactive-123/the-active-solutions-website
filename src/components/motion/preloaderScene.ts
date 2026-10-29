import type * as Three from "three";

type ThreeModule = typeof Three;

export type PreloaderScene = {
  /** 0–1 loading progress: the particle sphere gathers into the 3D logo as it rises. */
  setProgress: (p: number) => void;
  setPointer: (nx: number, ny: number) => void;
  /** Animated by the exit timeline: 0 → 1 tightens and brightens, then bursts the logo. */
  uniforms: { uGather: { value: number }; uBurst: { value: number } };
  destroy: () => void;
};

/** Optimised copy of the 3D logo served by next/image (also used by the hero, so it is usually cached). */
const LOGO_URL = "/_next/image?url=%2Fimages%2Fbrand%2Flogo-3d.png&w=384&q=75";

const VERTEX = /* glsl */ `
uniform float uTime;
uniform float uMorph;
uniform float uGather;
uniform float uBurst;
uniform float uDpr;
uniform float uScale;
attribute vec3 aSphere;
attribute vec3 aLogo;
attribute vec3 aColor;
attribute float aSeed;
varying vec3 vColor;
varying float vAlpha;
void main() {
  float m = smoothstep(aSeed * 0.55, aSeed * 0.55 + 0.45, uMorph);
  m = m * m * (3.0 - 2.0 * m);

  vec3 s = aSphere;
  float c = cos(uTime * 0.25);
  float sn = sin(uTime * 0.25);
  s.xz = mat2(c, -sn, sn, c) * s.xz;
  s += 0.16 * vec3(sin(uTime * 1.2 + aSeed * 40.0), cos(uTime * 1.05 + aSeed * 31.0), sin(uTime * 0.9 + aSeed * 23.0));
  vec3 logo = aLogo + 0.018 * vec3(sin(uTime * 2.0 + aSeed * 50.0), cos(uTime * 1.7 + aSeed * 60.0), 0.0);

  vec3 p = mix(s, logo, m) * (1.0 - uGather * 0.06);
  vec3 dir = normalize(vec3(p.xy, 0.0) + vec3(sin(aSeed * 91.0), cos(aSeed * 53.0), 0.0) * 0.35 + vec3(0.0, 0.0, 0.8));
  p += dir * uBurst * uBurst * (6.0 + aSeed * 14.0);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = min(40.0, uDpr * uScale * (2.3 + m * 0.7) * (8.0 / -mv.z));
  vColor = mix(vec3(0.78, 0.74, 0.74), aColor, m) * (1.0 + uGather * 0.6);
  vAlpha = mix(0.42, 1.0, m) * (1.0 - smoothstep(0.55, 1.0, uBurst));
}`;

const FRAGMENT = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.1, d) * vAlpha;
  if (a < 0.003) discard;
  gl_FragColor = vec4(vColor * a, a);
}`;

/** Samples the 3D logo render: position from the pixel, colour from its shading, depth from its brightness. */
async function sampleLogo(count: number) {
  const img = new Image();
  img.src = LOGO_URL;
  await img.decode();
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("2d context");
  ctx.drawImage(img, 0, 0);
  const data = ctx.getImageData(0, 0, w, h).data;

  const solid: number[] = [];
  for (let i = 0; i < w * h; i++) if (data[i * 4 + 3] > 90) solid.push(i);
  const scale = 2.5 / h;
  const logo = new Float32Array(count * 3);
  const color = new Float32Array(count * 3);
  for (let k = 0; k < count; k++) {
    const i = solid[Math.floor(Math.random() * solid.length)];
    const x = (i % w) + Math.random() - 0.5;
    const y = Math.floor(i / w) + Math.random() - 0.5;
    const r = data[i * 4] / 255;
    const g = data[i * 4 + 1] / 255;
    const b = data[i * 4 + 2] / 255;
    const lum = 0.3 * r + 0.59 * g + 0.11 * b;
    logo[k * 3] = (x - w / 2) * scale;
    logo[k * 3 + 1] = -(y - h / 2) * scale;
    logo[k * 3 + 2] = (lum - 0.35) * 0.9;
    // Lift the dark bevels so every particle reads on black.
    color[k * 3] = Math.min(1.2, r * 1.35 + 0.08);
    color[k * 3 + 1] = Math.min(1.2, g * 1.35 + 0.03);
    color[k * 3 + 2] = Math.min(1.2, b * 1.35 + 0.04);
  }
  return { logo, color };
}

export async function createPreloaderScene(THREE: ThreeModule, canvas: HTMLCanvasElement): Promise<PreloaderScene | null> {
  const count = window.innerWidth < 768 ? 3600 : 7000;
  const { logo, color } = await sampleLogo(count);

  let renderer: Three.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: "high-performance" });
  } catch {
    return null;
  }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
  camera.position.z = 8;

  // Start shape: a softly noisy sphere (Fibonacci distribution).
  const sphere = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const a = golden * i;
    const radius = 2.1 * (0.88 + Math.random() * 0.24);
    sphere[i * 3] = Math.cos(a) * r * radius;
    sphere[i * 3 + 1] = y * radius;
    sphere[i * 3 + 2] = Math.sin(a) * r * radius;
    seed[i] = Math.random();
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  geo.setAttribute("aSphere", new THREE.BufferAttribute(sphere, 3));
  geo.setAttribute("aLogo", new THREE.BufferAttribute(logo, 3));
  geo.setAttribute("aColor", new THREE.BufferAttribute(color, 3));
  geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
  const uniforms = {
    uTime: { value: 0 },
    uMorph: { value: 0 },
    uGather: { value: 0 },
    uBurst: { value: 0 },
    uDpr: { value: dpr },
    uScale: { value: 1 },
  };
  const mat = new THREE.ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    uniforms,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  const group = new THREE.Group();
  group.add(points);
  scene.add(group);

  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // Narrow screens: shrink so the sphere/logo fits the width.
    const visibleWidth = 2 * 8 * Math.tan((35 * Math.PI) / 360) * camera.aspect;
    const s = Math.min(1, (visibleWidth * 0.78) / 4.6);
    group.scale.setScalar(s);
    uniforms.uScale.value = Math.max(0.7, s);
  };
  resize();
  window.addEventListener("resize", resize);

  let progress = 0;
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
  let raf = 0;
  let last = performance.now();
  const frame = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    const k = 1 - Math.pow(1 - 0.06, dt * 60);
    uniforms.uTime.value = now / 1000;
    uniforms.uMorph.value += (progress - uniforms.uMorph.value) * k;
    pointer.sx += (pointer.x - pointer.sx) * k;
    pointer.sy += (pointer.y - pointer.sy) * k;
    group.rotation.y = Math.sin(now / 2000) * 0.22 + pointer.sx * 0.45;
    group.rotation.x = pointer.sy * 0.3;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  };
  renderer.compile(scene, camera);
  raf = requestAnimationFrame(frame);

  return {
    setProgress: (p) => (progress = Math.min(1, Math.max(0, p))),
    setPointer: (nx, ny) => {
      pointer.x = nx;
      pointer.y = ny;
    },
    uniforms,
    destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}
