import Image from "next/image";
import Link from "next/link";
import { caseStudyPath, type Project } from "@/content/work";
import styles from "./CaseCard.module.css";

/** Case study card: screenshot with zoom-on-hover, industry chips, summary and a link that covers the card. */
export function CaseCard({ project, index, headingLevel = "h3" }: { project: Project; index: number; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <article className={styles.card} style={{ "--accent": project.accent } as React.CSSProperties}>
      <div className={styles.media}>
        <Image src={project.image} alt={`${project.name} storefront`} fill sizes="(min-width: 1100px) 32vw, (min-width: 700px) 48vw, 92vw" className={styles.img} />
        <span className={styles.badge}>{String(index + 1).padStart(2, "0")}</span>
        <span className={styles.view} aria-hidden="true">
          View case study
        </span>
      </div>
      <div className={styles.body}>
        <ul role="list" className={styles.chips}>
          <li>{project.industry}</li>
          <li>{project.platform}</li>
          <li>{project.timeline}</li>
        </ul>
        <H className={styles.title}>
          <Link href={caseStudyPath(project.slug)} className={styles.link}>
            {project.name}
          </Link>
        </H>
        <p className={styles.text}>{project.text}</p>
        <span className={styles.more} aria-hidden="true">
          Read case study
          <svg width="40" height="10" viewBox="0 0 40 10" fill="none">
            <path d="M0 5h38M34 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </span>
      </div>
    </article>
  );
}
