import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { Team } from "@/components/home/Team";
import { TiltVisual } from "@/components/motion/TiltVisual";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { JsonLd } from "@/components/JsonLd";
import { Process } from "@/components/sections/Process";
import { WhoWeAre } from "@/components/about/WhoWeAre";
import { Location } from "@/components/about/Location";
import { IndustryTiles } from "@/components/about/IndustryTiles";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const PATH = "/about";
const DESCRIPTION =
  "Meet The Active Solutions: a Karachi-based Shopify and DTC growth team building, optimizing and marketing Shopify stores for brands in the US, UK and Gulf.";

export const metadata = pageMetadata({
  title: "About Us: Karachi-Based Shopify Growth Agency",
  description: DESCRIPTION,
  path: PATH,
});

const STEPS = [
  {
    title: "Discover",
    text: "We learn about your brand, customers, products, Shopify store, current marketing and growth goals.",
  },
  {
    title: "Strategize",
    text: "We pick the opportunities most likely to make an impact and shape a focused growth plan.",
  },
  {
    title: "Execute",
    text: "We implement the agreed Shopify, marketing, CRO and retention initiatives.",
  },
  {
    title: "Optimize & Scale",
    text: "We measure what's working, fix what's not, and keep improving your growth engine.",
  },
];

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${site.url}${PATH}#webpage`,
  url: `${site.url}${PATH}`,
  name: `About ${site.name}`,
  description: DESCRIPTION,
  isPartOf: { "@type": "WebSite", url: site.url, name: site.name },
  about: { "@id": `${site.url}/#organization` },
  mainEntity: {
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    foundingLocation: { "@type": "Place", name: `${site.address.city}, ${site.address.countryName}` },
    areaServed: ["United States", "United Kingdom", "United Arab Emirates", "Saudi Arabia", "Pakistan"],
  },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={[
          aboutJsonLd,
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: PATH },
          ]),
        ]}
      />
      <PageHero
        title={
          <>
            Karachi-Based.
            <br /> <em>Globally</em> Focused.
          </>
        }
        text={
          <p>
            Digital products built in Karachi for companies worldwide. Shopify, Webflow and custom apps delivered by the senior team you meet in
            the proposal.
          </p>
        }
        primary={{ label: "Schedule a meeting", href: "/contact/schedule" }}
        secondary={{ label: "See our work", href: "/work" }}
        tagline="KARACHI, PAKISTAN · SERVING BRANDS WORLDWIDE"
        visual={{ src: "/images/about/star-hero.png", width: 633, height: 633, className: "figma-crop" }}
      />
      <WhoWeAre />
      <WhatWeDo />
      <section className="section theme-sand" aria-label="Meet the team">
        <div className="container">
          <Team />
        </div>
      </section>
      <section className="section theme-red" aria-labelledby="how-title">
        <div className="container">
          <SectionHeader
            eyebrow="HOW WE WORK"
            title={
              <span id="how-title">
                No complicated process. <em>No endless meetings.</em>
              </span>
            }
          />
          <Process theme="red" steps={STEPS} />
        </div>
      </section>
      <Location />
      <IndustryTiles />
      <CtaBanner
        title={
          <>
            Let&apos;s <em>grow</em> your store.
          </>
        }
        text="Let's look at your Shopify store, marketing and customer journey, find the biggest opportunities and map a practical path to more customers and sustainable growth."
        primary={{ label: "Book a Shopify Growth Strategy Call", href: "/contact/schedule" }}
        secondary={{ label: "Explore our work", href: "/work" }}
        visual={
          <TiltVisual className="figma-crop">
            <Image src="/images/about/star-cta.png" alt="" width={637} height={637} sizes="(min-width: 1024px) 30vw, 70vw" />
          </TiltVisual>
        }
      />
      <MotionEngine />
    </>
  );
}
