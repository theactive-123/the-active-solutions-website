import Link from "next/link";
import { Glow } from "@/components/motion/Glow";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { CaseIndex } from "@/components/case-studies/CaseIndex";
import { CaseCard } from "@/components/case-studies/CaseCard";
import { withAccent } from "@/components/case-studies/accent";
import { BrowserFrame } from "@/components/home/BrowserFrame";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { CloudLogo } from "@/components/home/CloudLogo";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/sections/CheckList";
import { JsonLd } from "@/components/JsonLd";
import { caseStudyPath, projects } from "@/content/work";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Case Studies: Shopify Projects & Results",
  description:
    "How we designed and built Shopify stores for DTC brands: ThermoLab, HeyBuddy, Peak Motion, Dermalyft, Glo and Moo'd Up. The challenge, our approach and what changed.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  const [featured] = projects;

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Case studies",
    url: `${site.url}/case-studies`,
    hasPart: projects.map((p) => ({
      "@type": "CreativeWork",
      name: `${p.name} case study`,
      url: `${site.url}${caseStudyPath(p.slug)}`,
      image: `${site.url}${p.image}`,
    })),
  };

  return (
    <>
      <section className={`${styles.hero} theme-dark`} aria-labelledby="page-title">
        <Glow />
        <div className={`container ${styles.heroInner}`}>
          <p className={styles.kicker} data-reveal="fade" data-immediate>
            [ CASE STUDIES ]
          </p>
          <div className={styles.heroRow}>
            <h1 id="page-title" className="display" data-split data-immediate>
              Shopify stores, <em>built to perform.</em>
            </h1>
            <p className="body" data-reveal data-immediate data-delay="0.35">
              The brief, the thinking and the build behind stores we designed and developed for DTC brands in the UK, US and
              worldwide.
            </p>
          </div>
          <CaseIndex projects={projects} />
        </div>
      </section>

      <section className="section theme-paper" aria-labelledby="featured-title">
        <div className="container">
          <SectionHeader
            eyebrow="FEATURED"
            title={<span id="featured-title">{withAccent(featured.headline)}</span>}
            text={<p>{featured.summary}</p>}
          />
          <div className={styles.featured}>
            <Link href={caseStudyPath(featured.slug)} className={styles.featuredMedia} data-cursor="View" aria-label={`${featured.name} case study`}>
              <BrowserFrame src={featured.image} domain={featured.domain} alt="" />
            </Link>
            <div className={styles.featuredInfo}>
              <p className={styles.featuredName} data-reveal>
                {featured.name}
              </p>
              <ul role="list" className={styles.scope} data-reveal-stagger="0.06">
                {featured.scope.map((s) => (
                  <li key={s}>
                    <CheckIcon />
                    {s}
                  </li>
                ))}
              </ul>
              <div data-reveal>
                <Button href={caseStudyPath(featured.slug)} variant="dark">
                  Read the case study
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section theme-sand" aria-labelledby="all-title">
        <div className="container">
          <SectionHeader
            eyebrow="ALL CASE STUDIES"
            title={
              <span id="all-title">
                Every build, <em>start to finish.</em>
              </span>
            }
            text={<p>Each case study covers the challenge, how we approached it, what we built and what changed for the brand.</p>}
          />
          <ul role="list" className={styles.grid} data-reveal-stagger="0.1">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <CaseCard project={p} index={i} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section theme-dark" aria-labelledby="trusted-title">
        <div className="container">
          <SectionHeader
            eyebrow="TRUSTED BY DTC BRANDS"
            title={
              <span id="trusted-title">
                Brands that <em>build with us.</em>
              </span>
            }
          />
          <div data-reveal>
            <LogoMarquee />
          </div>
        </div>
      </section>

      <CtaBanner
        title={
          <>
            Want to be our next <em>case study?</em>
          </>
        }
        text="Tell us about your store and where it's holding you back. We'll come back with a clear plan, scope and timeline."
        primary={{ label: "Start your project", href: "/contact" }}
        secondary={{ label: "Book a 30-min call", href: "/contact/schedule" }}
        visual={<CloudLogo />}
      />

      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Case studies", path: "/case-studies" }]), collection]} />
      <MotionEngine />
    </>
  );
}
