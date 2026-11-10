import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JsonLd } from "@/components/JsonLd";
import { withAccent } from "@/components/case-studies/accent";
import { Crumbs, PlaceServices, RelatedWork, WorkingTogether } from "@/components/locations/LocationParts";
import styles from "@/components/locations/Locations.module.css";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { CardGrid } from "@/components/sections/CardGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LOCATIONS_PATH, cityPath, countries, countryPath, getCity } from "@/content/locations";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return countries.flatMap((c) => c.cities.map((city) => ({ country: c.slug, city: city.slug })));
}

export async function generateMetadata({ params }: PageProps<"/locations/[country]/[city]">): Promise<Metadata> {
  const { country, city } = await params;
  const found = getCity(country, city);
  if (!found) notFound();
  return {
    ...pageMetadata({ title: found.city.metaTitle, description: found.city.metaDescription, path: cityPath(country, city) }),
    title: { absolute: found.city.metaTitle },
  };
}

/**
 * Prerendered for every city by generateStaticParams; params are read inside <Suspense>
 * (required with Cache Components). Unknown slugs get a real 404 from src/proxy.ts.
 */
export default function CityPage({ params }: PageProps<"/locations/[country]/[city]">) {
  return (
    <Suspense fallback={<section className="theme-dark" style={{ minHeight: "100svh" }} aria-busy="true" />}>
      <CityContent params={params} />
    </Suspense>
  );
}

async function CityContent({ params }: { params: PageProps<"/locations/[country]/[city]">["params"] }) {
  const { country: countrySlug, city: citySlug } = await params;
  const found = getCity(countrySlug, citySlug);
  if (!found) notFound();
  const { country, city } = found;
  const path = cityPath(country.slug, city.slug);
  const others = country.cities.filter((c) => c.slug !== city.slug);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}${path}#service`,
    name: `Shopify agency services in ${city.name}`,
    serviceType: "Shopify development, conversion rate optimization and ecommerce marketing",
    description: city.metaDescription,
    url: `${site.url}${path}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: { "@type": "AdministrativeArea", name: city.region, containedInPlace: { "@type": "Country", name: country.name } },
    },
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Locations", path: LOCATIONS_PATH },
            { name: country.name, path: countryPath(country.slug) },
            { name: city.name, path },
          ]),
          serviceJsonLd,
        ]}
      />
      <PageHero
        before={
          <Crumbs
            items={[
              { name: "Locations", href: LOCATIONS_PATH },
              { name: country.name, href: countryPath(country.slug) },
              { name: city.name },
            ]}
          />
        }
        title={withAccent(city.headline)}
        text={<p>{city.lead}</p>}
        primary={{ label: "Book a growth call", href: "/contact/schedule" }}
        secondary={{ label: "See our work", href: "/work" }}
        tagline={`SHOPIFY AGENCY · ${city.name} · ${city.region} · ${country.name}`.toUpperCase()}
      />

      <section className="section theme-paper" aria-labelledby="market-title">
        <div className="container">
          <SectionHeader
            eyebrow={`ECOMMERCE IN ${city.name.toUpperCase()}`}
            title={
              <span id="market-title">
                Selling online in <em>{city.name}</em>
              </span>
            }
          />
          <div className={styles.prose} data-reveal>
            {city.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <dl className={styles.facts} data-reveal-stagger="0.06">
            <div>
              <dt>Location</dt>
              <dd>
                {city.region}, {country.name}
              </dd>
            </div>
            <div>
              <dt>Currency</dt>
              <dd>{country.currency}</dd>
            </div>
            <div>
              <dt>Platform</dt>
              <dd>Shopify &amp; Shopify Plus</dd>
            </div>
            <div>
              <dt>How we work</dt>
              <dd>Remote, with live calls</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section theme-sand" aria-labelledby="industries-title">
        <div className="container">
          <SectionHeader
            eyebrow="KEY SECTORS"
            title={
              <span id="industries-title">
                Who we build for in <em>{city.name}</em>
              </span>
            }
          />
          <CardGrid items={city.industries} columns={city.industries.length === 4 ? 2 : 3} />
        </div>
      </section>

      <section className="section theme-dark" aria-labelledby="services-title">
        <div className="container">
          <SectionHeader
            eyebrow="SERVICES"
            title={
              <span id="services-title">
                Shopify services for <em>{city.name}</em> brands
              </span>
            }
            text={<p>One team for the build, the conversion work and the marketing that brings shoppers back.</p>}
          />
          <PlaceServices place={city.name} />
        </div>
      </section>

      <section className="section theme-paper" aria-labelledby="local-title">
        <div className="container">
          <SectionHeader
            eyebrow="WHAT WE PLAN FOR"
            title={
              <span id="local-title">
                What a <em>{city.name}</em> store needs
              </span>
            }
            text={
              <p>
                Country-wide rules on tax, payments and shipping are covered on our{" "}
                <Link href={countryPath(country.slug)}>{country.name} page</Link>. These are the details specific to {city.name}.
              </p>
            }
          />
          <CardGrid items={city.local} columns={2} />
        </div>
      </section>

      <section className="section theme-dark" aria-labelledby="together-title">
        <div className="container">
          <SectionHeader
            eyebrow="WORKING TOGETHER"
            title={
              <span id="together-title">
                Remote team, <em>{city.name}</em> hours
              </span>
            }
          />
          <WorkingTogether text={country.workingTogether} timeZone={city.timeZone} place={city.name} />
        </div>
      </section>

      <RelatedWork slugs={country.caseStudies} place={country.name} />

      <section className="section theme-paper" aria-labelledby="nearby-title">
        <div className="container">
          <SectionHeader
            eyebrow={`MORE IN ${country.name.toUpperCase()}`}
            title={
              <span id="nearby-title">
                Other <em>{country.name}</em> cities
              </span>
            }
          />
          <ul role="list" className={styles.places} data-reveal-stagger="0.06">
            {others.map((c) => (
              <li key={c.slug}>
                <Link href={cityPath(country.slug, c.slug)} className={styles.place}>
                  <span className={styles.placeRegion}>{c.region}</span>
                  <span className={styles.placeName}>Shopify agency in {c.name}</span>
                  <span className={styles.placeGo}>Explore {c.name} →</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href={countryPath(country.slug)} className={styles.place}>
                <span className={styles.placeRegion}>{country.code}</span>
                <span className={styles.placeName}>All of {country.name}</span>
                <span className={styles.placeGo}>Tax, payments &amp; shipping →</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <Faq
        items={city.faqs}
        theme="sand"
        title={
          <>
            {city.name} <em>questions</em>
          </>
        }
        text={`What ${city.name} brands ask us before starting a Shopify project.`}
      />

      <CtaBanner
        title={
          <>
            Ready to grow your <em>{city.name}</em> brand?
          </>
        }
        text="Tell us about your store, your customers and where you want it to go. We'll come back with clear next steps and a project scope."
        primary={{ label: "Start your project", href: "/contact" }}
        secondary={{ label: "Book a call", href: "/contact/schedule" }}
      />
      <MotionEngine />
    </>
  );
}
