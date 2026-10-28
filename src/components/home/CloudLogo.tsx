import Image from "next/image";
import { TiltVisual } from "@/components/motion/TiltVisual";
import styles from "./CloudLogo.module.css";

/** 3D brand mark rising out of a drifting cloud (closing CTA artwork). */
export function CloudLogo() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <TiltVisual className={styles.logo}>
        <Image src="/images/brand/logo-3d.png" alt="" width={400} height={405} sizes="(min-width: 1024px) 20vw, 50vw" />
      </TiltVisual>
      <Image src="/images/home/cloud.png" alt="" width={900} height={600} className={styles.cloud} sizes="(min-width: 1024px) 40vw, 90vw" />
      <Image src="/images/home/cloud.png" alt="" width={900} height={600} className={`${styles.cloud} ${styles.cloud2}`} sizes="(min-width: 1024px) 40vw, 90vw" />
    </div>
  );
}
