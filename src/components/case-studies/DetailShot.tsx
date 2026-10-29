import Image from "next/image";
import type { DetailShot as Shot } from "@/content/work";
import styles from "./DetailShot.module.css";

/** A zoomed close-up of part of the store screenshot, with caption. Zooms further on hover. */
export function DetailShot({ src, shot, alt }: { src: string; shot: Shot; alt: string }) {
  return (
    <figure className={styles.shot}>
      <div className={styles.frame} data-reveal="clip">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 900px) 32vw, 92vw"
          className={styles.img}
          style={
            {
              objectPosition: `${shot.x}% ${shot.y}%`,
              transformOrigin: `${shot.x}% ${shot.y}%`,
              "--zoom": shot.zoom,
            } as React.CSSProperties
          }
        />
      </div>
      <figcaption className={styles.caption}>{shot.caption}</figcaption>
    </figure>
  );
}
