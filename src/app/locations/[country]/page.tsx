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
import { LOCATIONS_PATH, cityPath, countries, countryPath, getCountry } from "@/content/locations";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return countries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/locations/[country]">): Promise<Metadata> {
  const { country } = await params;
  const c = getCountry(country);
  if (!c) notFound();
  return {
    ...pageMetadata({ title: c.metaTitle, description: c.metaDescription, path: countryPath(c.slug) }),
    title: { absolute: c.metaTitle },
  };
}

export default function CountryPage({ params }: PageProps<"/locations/[country]">) {
  return (
    <Suspense fallback={<section className="theme-dark" style={{ minHeight: "100svh" }} aria-busy="true" />}>
      <CountryContent params={params} />
    </Suspense>
  );
}

async function CountryContent({ params }: { params: PageProps<"/locations/[country]">["params"] }) {
  const { country: slug } = await params;
  const country = getCountry(slug);
  if (!country) notFound();
  const path = countryPath(country.slug);
  // The capital or largest listed city sets the call-time example.
  const mainZone = country.cities[0].timeZone;

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${site.url}${path}#service`,
    name: `Shopify agency services in ${country.name}`,
    serviceType: "Shopify development, conversion rate optimization and ecommerce marketing",
    description: country.metaDescription,
    url: `${site.url}${path}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: country.name },
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Locations", path: LOCATIONS_PATH },
            { name: country.name, path },
          ]),
          serviceJsonLd,
        ]}
      />
      <PageHero
        before={<Crumbs items={[{ name: "Locations", href: LOCATIONS_PATH }, { name: country.name }]} />}
        title={withAccent(country.headline)}
        text={<p>{country.lead}</p>}
        primary={{ label: "Book a growth call", href: "/contact/schedule" }}
        secondary={{ label: "See our work", href: "/work" }}
        tagline={`SHOPIFY AGENCY · ${country.cities.map((c) => c.name).join(" · ")}`.toUpperCase()}
      />

      <section className="section theme-paper" aria-labelledby="market-title">
        <div className="container">
          <SectionHeader
            eyebrow={`ECOMMERCE IN ${country.name.toUpperCase()}`}
            title={
              <span id="market-title">
                Growing a Shopify brand in <em>{country.name}</em>
              </span>
            }
          />
          <div className={styles.prose} data-reveal>
            {country.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section theme-sand" aria-labelledby="essentials-title">
        <div className="container">
          <SectionHeader
            eyebrow="SHOPIFY ESSENTIALS"
            title={
              <span id="essentials-title">
                What every <em>{country.name}</em> store must get right
              </span>
            }
            text={<p>Payments, tax, shipping and the rules that shape checkout, set up correctly from day one.</p>}
          />
          <CardGrid items={country.essentials} columns={country.essentials.length % 3 === 0 ? 3 : 2} />
        </div>
      </section>

      <section className="section theme-paper" aria-labelledby="cities-title">
        <div className="container">
          <SectionHeader
            eyebrow="CITIES"
            title={
              <span id="cities-title">
                Shopify agency by <em>city</em>
              </span>
            }
            text={<p>What&apos;s different about selling in each of these {country.name} markets.</p>}
          />
          <ul role="list" className={styles.places} data-reveal-stagger="0.06">
            {country.cities.map((c) => (
              <li key={c.slug}>
                <Link href={cityPath(country.slug, c.slug)} className={styles.place}>
                  <span className={styles.placeRegion}>{c.region}</span>
                  <span className={styles.placeName}>{c.name}</span>
                  <span className={styles.placeText}>{c.lead}</span>
                  <span className={styles.placeGo}>Shopify agency in {c.name} →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section theme-dark" aria-labelledby="services-title">
        <div className="container">
          <SectionHeader
            eyebrow="SERVICES"
            title={
              <span id="services-title">
                Shopify services across <em>{country.name}</em>
              </span>
            }
          />
          <PlaceServices place={country.name} />
        </div>
      </section>

      <section className="section theme-dark" aria-labelledby="together-title" style={{ paddingTop: 0 }}>
        <div className="container">
          <SectionHeader
            eyebrow="WORKING TOGETHER"
            title={
              <span id="together-title">
                A remote team that fits <em>your day</em>
              </span>
            }
          />
          <WorkingTogether text={country.workingTogether} timeZone={mainZone} place={country.cities[0].name} />
        </div>
      </section>

      <RelatedWork slugs={country.caseStudies} place={country.name} />

      <Faq
        items={country.faqs}
        title={
          <>
            {country.name} <em>questions</em>
          </>
        }
        text={`What ${country.name} brands ask us before starting a Shopify project.`}
      />

      <CtaBanner
        title={
          <>
            Let&apos;s build your <em>{country.name}</em> store.
          </>
        }
        text="Tell us where your store is today and where you want it to go. We'll come back with clear next steps and a project scope."
        primary={{ label: "Start your project", href: "/contact" }}
        secondary={{ label: "All locations", href: LOCATIONS_PATH }}
      />
      <MotionEngine />
    </>
  );
}
