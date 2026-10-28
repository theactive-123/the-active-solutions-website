import Image from "next/image";
import { TiltVisual } from "@/components/motion/TiltVisual";
import styles from "./ShopifyCube.module.css";

/** Closing-banner artwork: the same floating 3D cube as the hero. */
export function ShopifyCube() {
  return (
    <TiltVisual className={`figma-crop ${styles.cube}`}>
      <Image src="/images/shopify-development/hero-cube.png" alt="" width={657} height={657} sizes="(min-width: 1024px) 28vw, 70vw" />
    </TiltVisual>
  );
}
