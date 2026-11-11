import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JsonLd } from "@/components/JsonLd";
import { withAccent } from "@/components/case-studies/accent";
import { LocationHero } from "@/components/locations/Heroes";
import { Crumbs, RelatedWork } from "@/components/locations/LocationParts";
import { cityRecipe } from "@/components/locations/recipes";
import { Block, FaqCards, Intro, Places, Points, Services, Together } from "@/components/locations/Variants";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { LOCATIONS_PATH, callWindows, cityPath, countries, countryPath, getCity, zoneName } from "@/content/locations";
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
  const r = cityRecipe(country.slug, country.cities.indexOf(city));

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
      <LocationHero
        kind={r.hero}
        crumbs={
          <Crumbs
            items={[
              { name: "Locations", href: LOCATIONS_PATH },
              { name: country.name, href: countryPath(country.slug) },
              { name: city.name },
            ]}
          />
        }
        title={withAccent(city.headline)}
        lead={city.lead}
        place={city.name}
        names={country.cities.map((c) => c.name)}
        facts={[
          { label: "Region", value: `${city.region}, ${country.name}` },
          { label: "Currency", value: country.currency },
          { label: `Call times (${zoneName(city.timeZone)})`, value: callWindows(city.timeZone).label },
          { label: "Platform", value: "Shopify & Shopify Plus" },
        ]}
        primary={{ label: "Book a growth call", href: "/contact/schedule" }}
        secondary={{ label: "See our work", href: "/work" }}
      />

      <Block
        id="market-title"
        theme={r.themes.intro}
        layout={r.layout}
        eyebrow={`ECOMMERCE IN ${city.name.toUpperCase()}`}
        title={
          <>
            Selling online in <em>{city.name}</em>
          </>
        }
      >
        <Intro
          kind={r.intro}
          paragraphs={city.intro}
          facts={[
            { label: "Location", value: `${city.region}, ${country.name}` },
            { label: "Currency", value: country.currency },
            { label: "Platform", value: "Shopify & Shopify Plus" },
            { label: "How we work", value: "Remote, with live calls" },
          ]}
        />
      </Block>

      <Block
        id="industries-title"
        theme={r.themes.a}
        layout={r.layout}
        eyebrow="KEY SECTORS"
        title={
          <>
            Who we build for in <em>{city.name}</em>
          </>
        }
      >
        <Points items={city.industries} kind={r.pointsA} theme={r.themes.a} />
      </Block>

      <Block
        id="services-title"
        theme={r.themes.services}
        layout={r.layout}
        eyebrow="SERVICES"
        title={
          <>
            Shopify services for <em>{city.name}</em> brands
          </>
        }
        text={<p>One team for the build, the conversion work and the marketing that brings shoppers back.</p>}
      >
        <Services place={city.name} kind={r.services} theme={r.themes.services} />
      </Block>

      <Block
        id="local-title"
        theme={r.themes.b}
        layout={r.layout}
        eyebrow="WHAT WE PLAN FOR"
        title={
          <>
            What a <em>{city.name}</em> store needs
          </>
        }
        text={
          <p>
            Country-wide rules on tax, payments and shipping are covered on our <Link href={countryPath(country.slug)}>{country.name} page</Link>.
            These are the details specific to {city.name}.
          </p>
        }
      >
        <Points items={city.local} kind={r.pointsB} theme={r.themes.b} />
      </Block>

      <Block
        id="together-title"
        theme="dark"
        layout={r.layout === "sticky" ? "stack" : r.layout}
        eyebrow="WORKING TOGETHER"
        title={
          <>
            Remote team, <em>{city.name}</em> hours
          </>
        }
      >
        <Together kind={r.together} text={country.workingTogether} timeZone={city.timeZone} place={city.name} />
      </Block>

      <RelatedWork slugs={country.caseStudies} place={country.name} />

      <Block
        id="nearby-title"
        theme={r.themes.nearby}
        layout={r.layout === "sticky" ? "stack" : r.layout}
        eyebrow={`MORE IN ${country.name.toUpperCase()}`}
        title={
          <>
            Other <em>{country.name}</em> cities
          </>
        }
      >
        <Places
          kind={r.places}
          items={[
            ...others.map((c) => ({
              href: cityPath(country.slug, c.slug),
              name: c.name,
              region: c.region,
              go: `Shopify agency in ${c.name}`,
            })),
            { href: countryPath(country.slug), name: `All of ${country.name}`, region: country.code, go: "Tax, payments & shipping" },
          ]}
        />
      </Block>

      {r.faq === "cards" ? (
        <FaqCards
          items={city.faqs}
          theme={r.themes.faq === r.themes.nearby ? "sand" : r.themes.faq}
          title={
            <>
              {city.name} <em>questions</em>
            </>
          }
          text={`What ${city.name} brands ask us before starting a Shopify project.`}
        />
      ) : (
        <Faq
          items={city.faqs}
          theme={r.themes.nearby === "sand" ? "paper" : "sand"}
          title={
            <>
              {city.name} <em>questions</em>
            </>
          }
          text={`What ${city.name} brands ask us before starting a Shopify project.`}
        />
      )}

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
