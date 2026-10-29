import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { CaseHero } from "@/components/case-studies/CaseHero";
import { DetailShot } from "@/components/case-studies/DetailShot";
import { NextCase } from "@/components/case-studies/NextCase";
import { Outcomes } from "@/components/case-studies/Outcomes";
import { CardGrid } from "@/components/sections/CardGrid";
import { CheckList } from "@/components/sections/CheckList";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Process } from "@/components/sections/Process";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { JsonLd } from "@/components/JsonLd";
import { caseStudyPath, getProject, nextProject, projects } from "@/content/work";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { services, site } from "@/lib/site";
import styles from "./page.module.css";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return pageMetadata({
    title: `${project.name} Case Study: ${project.platform} for ${project.industry}`,
    description: `${project.summary.slice(0, 120).replace(/\s+\S*$/, "")}… How we designed and built the ${project.name} Shopify store.`,
    path: caseStudyPath(project.slug),
    image: project.image,
    type: "article",
  });
}

/** Static shell shown while the case study streams in. */
function CaseSkeleton() {
  return <section className={`${styles.skeleton} theme-dark`} aria-busy="true" aria-label="Loading case study" />;
}

/**
 * Every known slug is prerendered by generateStaticParams; params are read inside <Suspense>
 * (required with Cache Components). Unknown slugs get a real 404 from src/proxy.ts.
 */
export default function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  return (
    <Suspense fallback={<CaseSkeleton />}>
      <CaseStudy params={params} />
    </Suspense>
  );
}

async function CaseStudy({ params }: { params: PageProps<"/case-studies/[slug]">["params"] }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = nextProject(project.slug);
  const url = `${site.url}${caseStudyPath(project.slug)}`;
  const usedServices = project.services.map((s) => ({
    title: s.label,
    text: services.find((x) => x.href === s.href)?.description,
    href: s.href,
  }));

  const caseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#case-study`,
    headline: `${project.name} case study`,
    description: project.summary,
    image: `${site.url}${project.image}`,
    url,
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    about: { "@type": "WebSite", name: project.name, url: `https://${project.domain}` },
    keywords: [project.platform, project.industry, ...project.scope].join(", "),
  };

  return (
    <>
      <CaseHero project={project} />

      <section className="section theme-paper" aria-labelledby="challenge-title">
        <div className="container">
          <SectionHeader
            eyebrow="THE CHALLENGE"
            title={
              <span id="challenge-title">
                What needed <em>solving.</em>
              </span>
            }
          />
          <div className={styles.challenge}>
            <div className={styles.prose} data-reveal>
              {project.challenge.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <CheckList columns={[{ label: "THE GOALS", items: project.goals }]} />
          </div>
        </div>
      </section>

      <section className="section theme-dark" aria-labelledby="approach-title">
        <div className="container">
          <SectionHeader
            eyebrow="OUR APPROACH"
            title={
              <span id="approach-title">
                How we <em>built it.</em>
              </span>
            }
            text={<p>Four focused phases over {project.timeline}, with work you could review every week.</p>}
          />
          <Process theme="dark" steps={project.approach} />
        </div>
      </section>

      <section className="section theme-paper" aria-labelledby="built-title">
        <div className="container">
          <SectionHeader
            eyebrow="WHAT WE BUILT"
            title={
              <span id="built-title">
                Inside the <em>{project.name}</em> store
              </span>
            }
            text={<p>The parts of the storefront that do the heavy lifting, from the first screen to checkout.</p>}
          />
          <CardGrid items={project.features} columns={3} minHeight="clamp(190px, 13vw, 240px)" />
          <div className={styles.details}>
            {project.details.map((d) => (
              <DetailShot key={d.caption} src={project.image} shot={d} alt={`${project.name}: ${d.caption}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="section theme-red" aria-labelledby="outcomes-title">
        <div className="container">
          <SectionHeader
            eyebrow="THE OUTCOME"
            title={
              <span id="outcomes-title">
                What <em>changed.</em>
              </span>
            }
          />
          <Outcomes project={project} />
        </div>
      </section>

      <section className="section theme-sand" aria-labelledby="services-title">
        <div className="container">
          <SectionHeader
            eyebrow="SERVICES USED"
            title={
              <span id="services-title">
                The team behind <em>this build.</em>
              </span>
            }
            text={<p>Want the same for your store? Explore the services that went into this project.</p>}
          />
          <CardGrid items={usedServices} columns={3} />
        </div>
      </section>

      <NextCase project={next} />

      <CtaBanner
        title={
          <>
            Let&apos;s build your <em>next chapter.</em>
          </>
        }
        text={`Planning a ${project.platform} build, redesign or migration? Tell us where your store is today and where you want it to go.`}
        primary={{ label: "Start your project", href: "/contact" }}
        secondary={{ label: "All case studies", href: "/case-studies" }}
      />

      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Case studies", path: "/case-studies" },
            { name: project.name, path: caseStudyPath(project.slug) },
          ]),
          caseJsonLd,
        ]}
      />
      <MotionEngine />
    </>
  );
}
