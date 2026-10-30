import { Marquee } from "@/components/sections/Marquee";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { ProjectStack } from "@/components/work/ProjectStack";
import { projects } from "@/content/work";
import styles from "./FeaturedWork.module.css";

export function FeaturedWork() {
  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <Marquee
        items={Array.from({ length: 8 }, (_, i) => (i % 2 ? "Featured projects" : "Latest work"))}
        label="Latest work and featured projects"
      />
      <div className="theme-dark section">
        <div className="container">
          <SectionHeader
            eyebrow="FEATURED WORK"
            title={
              <span id="work-title">
                Real stores. Real <em>growth.</em>
              </span>
            }
            text={<p>Built by our team in Karachi for customers worldwide.</p>}
            aside={
              <Button href="/case-studies" variant="outline-light">
                All case studies
              </Button>
            }
          />

          {/* The latest three; the rest are one click away under "All case studies". */}
          <ProjectStack projects={projects.slice(0, 3)} total={projects.length} />
        </div>
      </div>
    </section>
  );
}
