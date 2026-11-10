import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import styles from "@/components/locations/Locations.module.css";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LOCATIONS_PATH, cityPath, countries, countryPath } from "@/content/locations";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const TITLE = "Shopify Agency Locations Worldwide";
const DESCRIPTION =
  "Shopify agency for DTC brands in the US, UK, Canada, Australia, UAE and Saudi Arabia. Local market knowledge for 30 cities, delivered by one remote team.";

export const metadata: Metadata = {
  ...pageMetadata({ title: TITLE, description: DESCRIPTION, path: LOCATIONS_PATH }),
  title: { absolute: `${TITLE} | ${site.name}` },
};

export default function LocationsPage() {
  const listJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Shopify agency locations",
    itemListElement: countries.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, url: `${site.url}${countryPath(c.slug)}` })),
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Locations", path: LOCATIONS_PATH },
          ]),
          listJsonLd,
        ]}
      />
      <PageHero
        title={
          <>
            Shopify agency for brands <em>worldwide</em>
          </>
        }
        text={
          <p>
            We build and grow Shopify stores for DTC brands across six markets. Every market has its own payments, tax, shipping and
            shopper habits, so every store starts with them.
          </p>
        }
        primary={{ label: "Book a growth call", href: "/contact/schedule" }}
        secondary={{ label: "See our work", href: "/work" }}
        tagline={countries.map((c) => c.code).join(" · ")}
      />

      <section className="section theme-paper" aria-labelledby="markets-title">
        <div className="container">
          <SectionHeader
            eyebrow="WHERE WE WORK"
            title={
              <span id="markets-title">
                Six markets, <em>thirty cities</em>
              </span>
            }
            text={<p>Pick your market for the local essentials, or your city for what makes selling there different.</p>}
          />
          <div className={styles.countries}>
            {countries.map((c) => (
              <article key={c.slug} className={styles.country} data-reveal>
                <div className={styles.countryHead}>
                  <h3 className={styles.countryName}>
                    <Link href={countryPath(c.slug)}>Shopify agency in {c.name}</Link>
                  </h3>
                  <Link href={countryPath(c.slug)} className={styles.placeGo}>
                    {c.name} overview →
                  </Link>
                </div>
                <p className={styles.countryLead}>{c.lead}</p>
                <ul role="list" className={styles.cityLinks} aria-label={`${c.name} cities`}>
                  {c.cities.map((city) => (
                    <li key={city.slug}>
                      <Link href={cityPath(c.slug, city.slug)}>{city.name}</Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title={
          <>
            Don&apos;t see your city? <em>We still work with you.</em>
          </>
        }
        text="We work remotely with Shopify brands wherever they sell. Tell us about your store and we'll plan around your market."
        primary={{ label: "Start your project", href: "/contact" }}
        secondary={{ label: "Book a call", href: "/contact/schedule" }}
      />
      <MotionEngine />
    </>
  );
}
