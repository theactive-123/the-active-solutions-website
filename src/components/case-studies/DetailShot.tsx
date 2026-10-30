import Image from "next/image";
import type { DetailShot as Shot } from "@/content/work";
import styles from "./DetailShot.module.css";

/** A close-up of one section of the live store, with caption. Zooms in slightly on hover. */
export function DetailShot({ shot, alt }: { shot: Shot; alt: string }) {
  return (
    <figure className={styles.shot}>
      <div className={styles.frame} data-reveal="clip">
        <Image src={shot.src} alt={alt} fill sizes="(min-width: 900px) 32vw, 92vw" className={styles.img} />
      </div>
      <figcaption className={styles.caption}>{shot.caption}</figcaption>
    </figure>
  );
}
