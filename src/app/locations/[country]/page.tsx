import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JsonLd } from "@/components/JsonLd";
import { withAccent } from "@/components/case-studies/accent";
import { LocationHero } from "@/components/locations/Heroes";
import { Crumbs, RelatedWork } from "@/components/locations/LocationParts";
import { countryRecipe } from "@/components/locations/recipes";
import { Block, FaqCards, Intro, Places, Points, Services, Together } from "@/components/locations/Variants";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { LOCATIONS_PATH, callWindows, cityPath, countries, countryPath, getCountry, zoneName } from "@/content/locations";
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
  const r = countryRecipe(country.slug);

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
      <LocationHero
        kind={r.hero}
        crumbs={<Crumbs items={[{ name: "Locations", href: LOCATIONS_PATH }, { name: country.name }]} />}
        title={withAccent(country.headline)}
        lead={country.lead}
        place={country.name}
        names={country.cities.map((c) => c.name)}
        facts={[
          { label: "Cities", value: country.cities.map((c) => c.name).join(", ") },
          { label: "Currency", value: country.currency },
          { label: `Call times (${zoneName(mainZone)})`, value: callWindows(mainZone).label },
          { label: "Platform", value: "Shopify & Shopify Plus" },
        ]}
        primary={{ label: "Book a growth call", href: "/contact/schedule" }}
        secondary={{ label: "See our work", href: "/work" }}
      />

      <Block
        id="market-title"
        theme={r.themes.intro}
        layout={r.layout}
        eyebrow={`ECOMMERCE IN ${country.name.toUpperCase()}`}
        title={
          <>
            Growing a Shopify brand in <em>{country.name}</em>
          </>
        }
      >
        <Intro
          kind={r.intro}
          paragraphs={country.intro}
          facts={[
            { label: "Market", value: country.name },
            { label: "Currency", value: country.currency },
            { label: "Platform", value: "Shopify & Shopify Plus" },
            { label: "How we work", value: "Remote, with live calls" },
          ]}
        />
      </Block>

      <Block
        id="essentials-title"
        theme={r.themes.a}
        layout={r.layout}
        eyebrow="SHOPIFY ESSENTIALS"
        title={
          <>
            What every <em>{country.name}</em> store must get right
          </>
        }
        text={<p>Payments, tax, shipping and the rules that shape checkout, set up correctly from day one.</p>}
      >
        <Points items={country.essentials} kind={r.pointsA} theme={r.themes.a} />
      </Block>

      <Block
        id="services-title"
        theme={r.themes.services}
        layout={r.layout}
        eyebrow="SERVICES"
        title={
          <>
            Shopify services across <em>{country.name}</em>
          </>
        }
      >
        <Services place={country.name} kind={r.services} theme={r.themes.services} />
      </Block>

      <Block
        id="cities-title"
        theme={r.themes.b}
        layout={r.layout}
        eyebrow="CITIES"
        title={
          <>
            Shopify agency by <em>city</em>
          </>
        }
        text={<p>What&apos;s different about selling in each of these {country.name} markets.</p>}
      >
        <Places
          kind={r.places}
          items={country.cities.map((c) => ({
            href: cityPath(country.slug, c.slug),
            name: c.name,
            region: c.region,
            text: r.places === "chips" ? undefined : c.lead,
            go: `Shopify agency in ${c.name}`,
          }))}
        />
      </Block>

      <Block
        id="together-title"
        theme="dark"
        layout={r.layout === "sticky" ? "stack" : r.layout}
        eyebrow="WORKING TOGETHER"
        title={
          <>
            A remote team that fits <em>your day</em>
          </>
        }
      >
        <Together kind={r.together} text={country.workingTogether} timeZone={mainZone} place={country.cities[0].name} />
      </Block>

      <RelatedWork slugs={country.caseStudies} place={country.name} />

      {r.faq === "cards" ? (
        <FaqCards
          items={country.faqs}
          theme={r.themes.faq === "sand" ? "paper" : r.themes.faq}
          title={
            <>
              {country.name} <em>questions</em>
            </>
          }
          text={`What ${country.name} brands ask us before starting a Shopify project.`}
        />
      ) : (
        <Faq
          items={country.faqs}
          theme="paper"
          title={
            <>
              {country.name} <em>questions</em>
            </>
          }
          text={`What ${country.name} brands ask us before starting a Shopify project.`}
        />
      )}

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
