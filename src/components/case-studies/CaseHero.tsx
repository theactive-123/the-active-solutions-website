import Link from "next/link";
import { Glow } from "@/components/motion/Glow";
import { Button } from "@/components/ui/Button";
import { BrowserFrame } from "@/components/home/BrowserFrame";
import type { Project } from "@/content/work";
import { withAccent } from "./accent";
import styles from "./CaseHero.module.css";

/** Case study hero: breadcrumb, headline, summary, project facts and the store in a browser frame. */
export function CaseHero({ project }: { project: Project }) {
  const facts: [string, React.ReactNode][] = [
    ["Client", project.name],
    ["Industry", project.industry],
    ["Market", project.market],
    ["Platform", project.platform],
    ["Timeline", project.timeline],
    [
      "Services",
      project.services.map((s, i) => (
        <span key={s.href}>
          {i > 0 && ", "}
          <Link href={s.href} className={styles.factLink}>
            {s.label}
          </Link>
        </span>
      )),
    ],
  ];

  return (
    <section className={`${styles.hero} theme-dark`} aria-labelledby="page-title" style={{ "--accent": project.accent } as React.CSSProperties}>
      <Glow />
      <div className={`container ${styles.inner}`}>
        <nav aria-label="Breadcrumb" className={styles.crumbs} data-reveal="fade" data-immediate>
          <ol role="list">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/case-studies">Case studies</Link>
            </li>
            <li aria-current="page">{project.name}</li>
          </ol>
        </nav>

        <p className={styles.kicker} data-reveal="fade" data-immediate data-delay="0.1">
          [ CASE STUDY · {project.industry.toUpperCase()} ]
        </p>
        <h1 id="page-title" className={`display ${styles.title}`} data-split data-immediate>
          {withAccent(project.headline)}
        </h1>

        <div className={styles.row}>
          <p className={`body ${styles.summary}`} data-reveal data-immediate data-delay="0.35">
            {project.summary}
          </p>
          <div className={styles.actions} data-reveal data-immediate data-delay="0.5">
            <Button href={`https://${project.domain}`} target="_blank" rel="noopener noreferrer">
              Visit live store<span className="sr-only"> (opens in a new tab)</span>
            </Button>
            <Button href="/contact" variant="outline-light">
              Start a project
            </Button>
          </div>
        </div>

        <dl className={styles.facts} data-reveal-stagger="0.06" data-immediate>
          {facts.map(([k, v]) => (
            <div key={k} className={styles.fact}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.showcase}>
          <BrowserFrame src={project.image} domain={project.domain} alt={`${project.name} Shopify storefront home page`} priority />
        </div>
      </div>
    </section>
  );
}
