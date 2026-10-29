/**
 * Hand-off between the preloader and on-load animations. While <html> has `is-preloading`
 * (set before first paint by the boot script in app/layout), hero animations wait;
 * the preloader calls `releaseIntro()` as its curtain lifts.
 */
const EVENT = "tas:intro";

export const introPending = () => typeof document !== "undefined" && document.documentElement.classList.contains("is-preloading");

/** Runs `cb` now, or when the preloader releases the page. Returns an unsubscribe function. */
export function whenIntro(cb: () => void): () => void {
  if (!introPending()) {
    cb();
    return () => {};
  }
  window.addEventListener(EVENT, cb, { once: true });
  return () => window.removeEventListener(EVENT, cb);
}

export function releaseIntro() {
  if (!introPending()) return;
  document.documentElement.classList.remove("is-preloading");
  window.dispatchEvent(new Event(EVENT));
}
