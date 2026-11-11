import Link from "next/link";
import { CaseCard } from "@/components/case-studies/CaseCard";
import { CardGrid } from "@/components/sections/CardGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { callWindows } from "@/content/locations";
import { projects } from "@/content/work";
import { services } from "@/lib/site";
import styles from "./Locations.module.css";

/** Visible breadcrumb trail for location heroes (JSON-LD is emitted by the page). */
export function Crumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.crumbs} data-reveal="fade" data-immediate>
      <ol>
        {items.map((c) => (
          <li key={c.name} aria-current={c.href ? undefined : "page"}>
            {c.href ? <Link href={c.href}>{c.name}</Link> : c.name}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Our four services, phrased for the place, each linking to its service page. */
export function PlaceServices({ place }: { place: string }) {
  const copy: Record<string, string> = {
    "/services/shopify-development": `Custom Shopify and Shopify Plus builds, theme work and migrations for ${place} brands, built so your team can run the store day to day.`,
    "/services/conversion-rate-optimization": `CRO audits, A/B tests and checkout fixes that turn more of your ${place} traffic into orders.`,
    "/services/ecommerce-marketing": `Paid social, search and Klaviyo email & SMS planned around how ${place} shoppers find and buy.`,
    "/services/white-label-shopify": `Shopify delivery capacity for ${place} agencies, shipped under your brand and on your timeline.`,
  };
  return (
    <CardGrid
      columns={2}
      tone="dark"
      items={services.map((s) => ({ title: s.label, text: copy[s.href] ?? s.description, href: s.href }))}
    />
  );
}

/** "How we work together" with the live-call windows in the visitor's local time. */
export function WorkingTogether({ text, timeZone, place }: { text: string; timeZone: string; place: string }) {
  const windows = callWindows(timeZone);
  return (
    <div className={styles.together}>
      <p className={styles.togetherText} data-reveal>
        {text}
      </p>
      <div className={styles.hours} data-reveal data-delay="0.1">
        <p className={styles.hoursLabel}>Live call times, {place} time (Mon–Fri)</p>
        <p className={styles.hoursValue}>{windows.label}</p>
        {windows.seasonal && <p className={styles.hoursNote}>{windows.seasonal}</p>}
        <p className={styles.hoursNote}>Written updates every working day, with a shared project board you can check any time.</p>
        <Link href="/contact/schedule" className={styles.hoursLink}>
          Book a call in your time zone
        </Link>
      </div>
    </div>
  );
}

/** Case studies relevant to a country (skipped when none). */
export function RelatedWork({ slugs, place }: { slugs: string[]; place: string }) {
  const list = slugs.map((s) => projects.find((p) => p.slug === s)).filter((p): p is (typeof projects)[number] => !!p);
  if (!list.length) return null;
  return (
    <section className="section theme-sand" aria-labelledby="work-title">
      <div className="container">
        <SectionHeader
          eyebrow="RELATED WORK"
          title={
            <span id="work-title">
              Stores we&apos;ve <em>built.</em>
            </span>
          }
          text={<p>Shopify projects for brands selling to customers in {place} and beyond.</p>}
        />
        <ul role="list" className={styles.caseGrid} data-count={list.length} data-reveal-stagger="0.1">
          {list.map((p, i) => (
            <li key={p.slug}>
              <CaseCard project={p} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
