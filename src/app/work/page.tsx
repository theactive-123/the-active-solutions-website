import { WorkHero } from "@/components/work/WorkHero";
import { ProjectStack } from "@/components/work/ProjectStack";
import { Industries } from "@/components/home/Industries";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { CloudLogo } from "@/components/home/CloudLogo";
import { CardGrid } from "@/components/sections/CardGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Marquee } from "@/components/sections/Marquee";
import { Process } from "@/components/sections/Process";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { JsonLd } from "@/components/JsonLd";
import { projects } from "@/content/work";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Our Work: Shopify Case Studies",
  description:
    "Shopify and Shopify Plus stores we designed and built for DTC brands in fitness, pet care and fashion: ThermoLab, HeyBuddy and Peak Motion.",
  path: "/work",
});

const DELIVERED = [
  {
    title: "Storefront design",
    text: "Brand-led layouts designed in Figma, built around how your customers actually shop.",
    href: "/services/shopify-development",
  },
  {
    title: "Shopify & Shopify Plus builds",
    text: "Custom themes in Liquid, sections your team can edit, and the integrations you rely on.",
    href: "/services/shopify-development",
  },
  {
    title: "Conversion optimization",
    text: "Product pages, cart and checkout tuned with research and A/B tests, not guesswork.",
    href: "/services/conversion-rate-optimization",
  },
  {
    title: "Paid media & retention",
    text: "Meta, Google and TikTok campaigns connected to Klaviyo email and SMS flows.",
    href: "/services/ecommerce-marketing",
  },
  {
    title: "Migrations",
    text: "Moves from Magento, WooCommerce or BigCommerce with redirects and SEO preserved.",
    href: "/services/shopify-development",
  },
  {
    title: "White-label delivery",
    text: "Shopify builds delivered under your agency's brand, on your timeline.",
    href: "/services/white-label-shopify",
  },
];

const STEPS = [
  { title: "Discover", text: "We learn your brand, customers, catalogue and goals, and audit what you have today." },
  { title: "Design", text: "Key templates designed in Figma and reviewed with you before a line of code is written." },
  { title: "Build", text: "Liquid development, integrations and QA in weekly sprints you can follow along with." },
  { title: "Launch & grow", text: "A careful launch, then testing and campaigns that keep the store improving." },
];

export default function WorkPage() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${site.name} case studies`,
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: `${p.name} Shopify store`,
        url: `https://${p.domain}`,
        image: `${site.url}${p.image}`,
        description: p.text,
        creator: { "@id": `${site.url}/#organization` },
      },
    })),
  };

  return (
    <>
      <WorkHero />

      <section id="case-studies" className="section theme-dark" aria-labelledby="cases-title">
        <div className="container">
          <SectionHeader
            eyebrow="CASE STUDIES"
            title={
              <span id="cases-title">
                Real stores. Real <em>growth.</em>
              </span>
            }
            text={<p>Each build starts with the customer journey and ends with a store the brand&apos;s own team can run.</p>}
            aside={
              <Button href="/case-studies" variant="outline-light">
                All case studies
              </Button>
            }
          />
          <ProjectStack projects={projects} />
        </div>
      </section>

      <Marquee items={Array.from({ length: 8 }, (_, i) => (i % 2 ? "Built in Karachi" : "Shipped worldwide"))} label="Built in Karachi, shipped worldwide" />

      <section className="section theme-paper" aria-labelledby="delivered-title">
        <div className="container">
          <SectionHeader
            eyebrow="WHAT GOES INTO A BUILD"
            title={
              <span id="delivered-title">
                Everything a growing store <em>needs.</em>
              </span>
            }
            text={<p>Design, development and growth under one team, so nothing gets lost between agencies.</p>}
          />
          <CardGrid items={DELIVERED} columns={3} minHeight="clamp(200px, 14vw, 260px)" />
        </div>
      </section>

      <Industries />

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

      <section className="section theme-red" aria-labelledby="build-process-title">
        <div className="container">
          <SectionHeader
            eyebrow="HOW A BUILD RUNS"
            title={
              <span id="build-process-title">
                From first call to <em>launch day.</em>
              </span>
            }
          />
          <Process theme="red" steps={STEPS} />
        </div>
      </section>

      <CtaBanner
        title={
          <>
            Your store could be <em>next.</em>
          </>
        }
        text="Tell us about your brand and where the store is holding you back. We'll come back with a clear plan and scope."
        primary={{ label: "Start your project", href: "/contact" }}
        secondary={{ label: "Book a 30-min call", href: "/contact/schedule" }}
        visual={<CloudLogo />}
      />

      <JsonLd data={[breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }]), itemList]} />
      <MotionEngine />
    </>
  );
}
