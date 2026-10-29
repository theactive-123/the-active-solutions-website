import Image from "next/image";
import Link from "next/link";
import { caseStudyPath, type Project } from "@/content/work";
import styles from "./NextCase.module.css";

/** Full-width "Next case study" link: big name, with the store screenshot sliding up on hover. */
export function NextCase({ project }: { project: Project }) {
  return (
    <section className={`${styles.next} theme-dark`} aria-label="Next case study">
      <Link href={caseStudyPath(project.slug)} className={styles.link} data-cursor="Next">
        <span className={`container ${styles.inner}`}>
          <span className={styles.kicker}>[ NEXT CASE STUDY ]</span>
          <span className={styles.row}>
            <span className={styles.name}>{project.name}</span>
            <span className={styles.go} aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 22 22">
                <path d="M5 17L17 5M8 5h9v9" stroke="currentColor" strokeWidth="1.6" fill="none" />
              </svg>
            </span>
          </span>
          <span className={styles.meta}>
            {project.industry} · {project.platform} · {project.market}
          </span>
        </span>
        <span className={styles.media} aria-hidden="true">
          <Image src={project.image} alt="" fill sizes="60vw" />
        </span>
      </Link>
    </section>
  );
}
