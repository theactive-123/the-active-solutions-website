import type { Project } from "@/content/work";
import styles from "./Outcomes.module.css";

/** Outcome statements as large numbered rows; shows client-approved stats and quote when provided. */
export function Outcomes({ project }: { project: Project }) {
  return (
    <div className={styles.wrap}>
      {project.results && project.results.length > 0 && (
        <dl className={styles.results} data-reveal-stagger="0.08">
          {project.results.map((r) => (
            <div key={r.label}>
              <dd data-count>{r.value}</dd>
              <dt>{r.label}</dt>
            </div>
          ))}
        </dl>
      )}
      <ol role="list" className={styles.list} data-reveal-stagger="0.08">
        {project.outcomes.map((o, i) => (
          <li key={o} className={styles.item}>
            <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.text}>{o}</span>
          </li>
        ))}
      </ol>
      {project.testimonial && (
        <figure className={styles.quote} data-reveal>
          <blockquote>
            <p>&ldquo;{project.testimonial.quote}&rdquo;</p>
          </blockquote>
          <figcaption>
            <b>{project.testimonial.name}</b>, {project.testimonial.role}
          </figcaption>
        </figure>
      )}
    </div>
  );
}
