import Image from "next/image";
import styles from "./Logo.module.css";

/** Brand lockup: red mark + "The Active Solutions" wordmark (inherits text colour). */
export function Logo({ className, size = "md" }: { className?: string; size?: "md" | "lg" }) {
  return (
    <span className={[styles.logo, styles[size], className].filter(Boolean).join(" ")}>
      <Image src="/images/brand/logo-mark.png" alt="" width={78} height={72} className={styles.mark} loading="eager" />
      <span className={styles.word}>
        The <b>Active</b> Solutions
      </span>
    </span>
  );
}
