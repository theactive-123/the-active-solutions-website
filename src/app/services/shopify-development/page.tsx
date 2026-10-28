import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { CardGrid } from "@/components/sections/CardGrid";
import { CheckList } from "@/components/sections/CheckList";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { JsonLd } from "@/components/JsonLd";
import { ClientProof } from "@/components/shopify-development/ClientProof";
import { ShopifyCube } from "@/components/shopify-development/ShopifyCube";
import cube from "@/components/shopify-development/ShopifyCube.module.css";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import styles from "./page.module.css";

const PATH = "/services/shopify-development";
const DESCRIPTION =
  "Shopify and Shopify Plus development for growing ecommerce brands: custom storefronts, theme design, integrations and SEO-safe migrations, planned first.";

export const metadata: Metadata = pageMetadata({
  title: "Shopify Development Services",
  description: DESCRIPTION,
  path: PATH,
});

const SERVICES = [
  {
    title: "Custom Shopify Development",
    tags: ["Custom Builds", "Storefront Development", "Custom Sections", "API Integrations", "Liquid Development", "Checkout Optimization"],
  },
  {
    title: "Shopify Plus & Integrations",
    tags: ["Shopify Plus", "ERP Integration", "Scalable Solutions", "Enterprise Ecommerce", "App Integrations", "Workflow Automation"],
  },
  {
    title: "Shopify Theme Design & Customization",
    tags: ["Custom Themes", "Mobile Optimization", "Performance Optimization", "Theme Customization", "Responsive Design", "UI/UX Design"],
  },
  {
    title: "Store Design & Migration",
    tags: ["Store Design", "SEO Preservation", "Store Optimization", "Product Page UX", "Collection Pages", "Platform Migration"],
  },
];

const MIGRATION = [
  {
    title: "Data and Catalog Migration",
    text: "We plan the transfer of agreed product data, collections, customer records and order history, subject to source-platform access and compatibility. We validate the migrated information before launch.",
  },
  {
    title: "SEO-Preserving Redirects",
    text: "We review important existing URLs, map appropriate redirects and preserve relevant metadata where possible. This helps protect the organic visibility your store has already earned during the migration.",
  },
  {
    title: "Store Structure and Cleanup",
    text: "A migration is an opportunity to improve your catalog organization. We review collections, product organization, navigation and other structural elements so your new Shopify store is easier to manage and navigate.",
  },
];

const BUILD_LEFT = [
  "Store architecture and navigation planning",
  "Shopify theme development using Liquid",
  "Cart and eligible checkout customization",
  "Responsive design and performance checks",
];
const BUILD_RIGHT = [
  "Custom storefront design in Figma",
  "Product and collection page customization",
  "App and third-party integrations",
  "Testing, launch preparation and handover",
];

const SPECIALIST = [
  {
    title: "Headless Shopify Development",
    text: "For businesses with specific performance, design or content-delivery requirements, a headless Shopify architecture may be worth considering. We assess whether separating the storefront from Shopify's commerce backend is appropriate for the project before recommending this approach.",
  },
  {
    title: "Shopify Integration Services",
    text: "Connect your storefront with the tools your business depends on. We review integration requirements during discovery and confirm the implementation scope before development begins.",
  },
];

const STEPS = [
  {
    title: "Discovery and Planning",
    text: "We review your current store, product catalog, customer journey and business requirements. You receive an agreed scope and implementation plan.",
  },
  {
    title: "Design and Approval",
    text: "We develop the proposed layouts and key storefront templates. You review the design and provide feedback before development progresses.",
  },
  {
    title: "Development and Integration",
    text: "We implement the approved design, configure agreed integrations and prepare the storefront for testing. You receive progress updates and an opportunity to review the work.",
  },
  {
    title: "Quality Assurance and Launch",
    text: "We test key templates, navigation, product pages, cart functionality, responsive behavior and agreed migration requirements before launch. After handover, we provide the support defined in the project scope.",
  },
];

const MORE = [
  {
    title: "White Label Shopify Development",
    text: "Add delivery capacity for your agency, with Shopify work delivered under your brand.",
    href: "/services/white-label-shopify",
  },
  {
    title: "Conversion Optimization Services",
    text: "CRO audits, A/B testing and practical improvements that turn more visits into sales.",
    href: "/services/conversion-rate-optimization",
  },
  {
    title: "Ecommerce Marketing Agency",
    text: "Paid media, creative and Klaviyo retention working together as one strategy.",
    href: "/services/ecommerce-marketing",
  },
];

const FAQS = [
  {
    question: "What do Shopify development services include?",
    answer:
      "They can include custom storefront design, theme development, Shopify Plus implementation, platform migration, integrations, testing and launch support. The exact scope depends on your store and requirements.",
  },
  {
    question: "Do I need Shopify Plus?",
    answer:
      "Not always. Shopify Plus suits brands with higher order volumes, multiple storefronts, B2B or wholesale needs, or advanced checkout and automation requirements. We review your volume, operations and roadmap and only recommend Plus when the extra features justify the cost.",
  },
  {
    question: "Can you migrate my store from Magento or BigCommerce to Shopify?",
    answer:
      "Yes. We plan migrations from Magento, BigCommerce, WooCommerce and other platforms, moving agreed products, collections, customers and order history where the source platform allows, and mapping redirects to protect existing search visibility.",
  },
  {
    question: "Can you customize an existing Shopify theme?",
    answer:
      "Yes. We can extend your current theme with custom sections, templates and features, improve product and collection pages, and fix performance or mobile issues, without rebuilding the store from scratch when that isn't needed.",
  },
  {
    question: "How long does a Shopify development project take?",
    answer:
      "It depends on scope. Theme customizations can take a few weeks, while custom builds, Shopify Plus projects and migrations typically take several weeks to a few months. You receive a timeline with your agreed scope before work begins.",
  },
];

export default function ShopifyDevelopmentPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Shopify Services That <em>Drive Growth.</em>
          </>
        }
        text={
          <p>
            Your Shopify store should do more than look good. It should make buying easier, support your operations, and give
            your brand room to grow.
          </p>
        }
        primary={{ label: "Discuss Your Shopify Project", href: "/contact" }}
        secondary={{ label: "Explore our work", href: "/#work" }}
        tagline="SHOPIFY · SHOPIFY PLUS · THEMES · MIGRATIONS · INTEGRATIONS"
        visual={{ src: "/images/shopify-development/hero-cube.png", width: 657, height: 657, className: `figma-crop ${cube.hero}` }}
      />

      <ClientProof />

      <section className="section theme-dark" aria-labelledby="build-title">
        <div className="container">
          <SectionHeader
            eyebrow="WHAT WE BUILD"
            title={
              <span id="build-title">
                Shopify Development Services for <em>Growing Ecommerce</em> Brands
              </span>
            }
            text={
              <p>
                We handle the technical and design work required to build, improve and maintain Shopify stores. Every
                engagement starts with your requirements, existing setup and growth plans.
              </p>
            }
          />
          <ServiceGrid items={SERVICES} />
        </div>
      </section>

      <section className="section theme-red" aria-labelledby="migration-title">
        <div className="container">
          <SectionHeader
            eyebrow="MIGRATION"
            title={
              <span id="migration-title">
                Shopify Migration Services Without <em>Unnecessary Disruption</em>
              </span>
            }
            text={
              <p>
                Moving to Shopify involves more than transferring products. Your customer data, order history, URL structure
                and store operations all need careful planning. Our Shopify migration services are designed to make the
                transition structured and manageable.
              </p>
            }
          />
          <CardGrid tone="red" items={MIGRATION} />
          <div className={styles.cta} data-reveal>
            <Button href="/contact" variant="white">
              Plan Your Shopify Migration
            </Button>
          </div>
        </div>
      </section>

      <section className="section theme-paper" aria-labelledby="custom-title">
        <div className="container">
          <SectionHeader
            eyebrow="DESIGN & TECH"
            title={
              <span id="custom-title">
                Custom Shopify Builds, <em>Designed Before</em> Development
              </span>
            }
            text={
              <p>
                Every store has different requirements. We begin by understanding the catalog, customer journey, integrations
                and post-launch goals before deciding how the store should be built.
              </p>
            }
          />
          <h3 className={styles.label} data-reveal="fade">
            Our process can include
          </h3>
          <CheckList columns={[{ items: BUILD_LEFT }, { items: BUILD_RIGHT }]} />
          <CardGrid className={styles.cards} columns={2} items={SPECIALIST} minHeight="clamp(200px, 13.9vw, 266px)" />
        </div>
      </section>

      <section className="section theme-dark" aria-labelledby="process-title">
        <div className="container">
          <SectionHeader
            eyebrow="DEVELOPMENT PROCESS"
            title={
              <span id="process-title">
                From Discovery to Shopify Store <em>Launch</em>
              </span>
            }
          />
          <Process theme="dark" steps={STEPS} />
        </div>
      </section>

      <section className="section theme-sand" aria-labelledby="more-title">
        <div className="container">
          <SectionHeader
            eyebrow="MORE WAYS WE HELP"
            title={
              <span id="more-title">
                One team across your <em>whole store.</em>
              </span>
            }
          />
          <CardGrid items={MORE} />
        </div>
      </section>

      <Faq items={FAQS} />

      <CtaBanner
        title={
          <>
            Ready to Build a <em>Better Shopify</em> Store?
          </>
        }
        text="Tell us about your store, your current challenges and what you want to achieve. We'll discuss the requirements and prepare a clear project scope."
        primary={{ label: "Discuss Your Shopify Project", href: "/contact" }}
        visual={<ShopifyCube />}
      />

      <JsonLd
        data={[
          serviceJsonLd({ name: "Shopify Development Services", description: DESCRIPTION, path: PATH }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Shopify Development", path: PATH },
          ]),
        ]}
      />
      <MotionEngine />
    </>
  );
}
