import type { Metadata } from "next";
import { Glow } from "@/components/motion/Glow";
import { Button } from "@/components/ui/Button";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className={`${styles.wrap} theme-dark`} aria-labelledby="nf-title">
      <Glow position="center" />
      <div className={`container ${styles.inner}`}>
        <p className={styles.code} aria-hidden="true">
          404
        </p>
        <h1 id="nf-title" className="display">
          This page took a <em>wrong turn.</em>
        </h1>
        <p className="body">The link may be broken or the page may have moved. Let&apos;s get you back on track.</p>
        <div className={styles.actions}>
          <Button href="/">Back to home</Button>
          <Button href="/contact" variant="outline-light">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
