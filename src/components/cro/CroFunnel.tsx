import Image from "next/image";
import { TiltVisual } from "@/components/motion/TiltVisual";
import styles from "./CroFunnel.module.css";

/** Closing-banner artwork: the floating 3D conversion funnel. */
export function CroFunnel() {
  return (
    <TiltVisual className={`figma-crop ${styles.funnel}`}>
      <Image src="/images/cro/cta-funnel.png" alt="" width={728} height={649} sizes="(min-width: 1024px) 32vw, 80vw" />
    </TiltVisual>
  );
}
