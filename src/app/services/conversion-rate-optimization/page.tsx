import { Process } from "@/components/sections/Process";
import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { CardGrid } from "@/components/sections/CardGrid";
import { CheckList } from "@/components/sections/CheckList";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { JsonLd } from "@/components/JsonLd";
import { Faq } from "@/components/sections/Faq";
import { CroFunnel } from "@/components/cro/CroFunnel";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import styles from "./page.module.css";

const PATH = "/services/conversion-rate-optimization";
const DESCRIPTION =
  "Shopify conversion rate optimization: CRO audits, A/B testing and product page, checkout and landing page fixes that turn more of your traffic into sales.";

export const metadata: Metadata = pageMetadata({
  title: "Conversion Rate Optimization Services",
  description: DESCRIPTION,
  path: PATH,
});

const PROBLEMS = [
  "Product pages that do not answer important buying questions",
  "Unclear shipping, returns or product information",
  "Unnecessary friction in cart and checkout",
  "Limited testing of product-page layouts and offers",
  "Missed opportunities for relevant bundles and cross-sells",
  "Analytics that are collected but not translated into action",
];

const CHANGES = [
  "Product pages organized around customer questions and objections",
  "Checkout journeys reviewed for avoidable friction",
  "Test ideas prioritized by evidence and expected impact",
  "Landing pages aligned with advertising messages",
  "Relevant upsell and cross-sell opportunities evaluated",
  "Results documented to inform future decisions",
];

/* The Figma grid repeated the Shopify Development cards; these follow this page's own copy. */
const SERVICES = [
  {
    title: "CRO Audits & Research",
    tags: ["CRO Audit", "Analytics Review", "Funnel Analysis", "Session Recordings", "Customer Journey", "Prioritized Roadmap"],
  },
  {
    title: "A/B Testing & Experimentation",
    tags: ["A/B Testing", "Test Hypotheses", "Test Prioritization", "Variant Development", "Results Analysis", "Iteration"],
  },
  {
    title: "Product Page & Checkout Optimization",
    tags: ["Product Page UX", "Cart Optimization", "Checkout Friction", "Mobile UX", "Trust Signals", "Shopify CRO"],
  },
  {
    title: "Landing Pages & AOV Growth",
    tags: ["Landing Pages", "Message Match", "Bundles", "Upsells & Cross-sells", "Quantity Discounts", "Post-Purchase Offers"],
  },
];

const AREAS = [
  {
    title: "Product Detail Pages",
    text: "Make product pages easier to understand and act on. We review product information, imagery, variant selection, customer reviews, delivery details and the placement of important purchase actions.",
  },
  {
    title: "Cart and Checkout",
    text: "Review the path between adding a product to the cart and completing the purchase. We look for unnecessary steps, unclear costs, confusing form fields and opportunities to make the checkout experience easier.",
  },
  {
    title: "Average Order Value",
    text: "Assess bundles, complementary products, quantity discounts and other relevant offers. Any proposed changes should support customer needs as well as commercial objectives.",
  },
  {
    title: "Post-Purchase Experience",
    text: "Evaluate relevant confirmation-page offers, product recommendations and follow-up opportunities. Where appropriate, we identify ways to improve the customer experience after an order is placed.",
  },
  {
    title: "Collection Pages",
    text: "Review product sorting, filters, category descriptions, product cards and navigation. We help shoppers find suitable products without making the catalog unnecessarily complicated.",
  },
  {
    title: "Paid Landing Pages",
    text: "Build landing-page experiences around the audience, offer and message of each campaign. We work to maintain consistency between the advertisement and the page the customer reaches.",
  },
];

const STEPS = [
  {
    title: "Audit and Research",
    text: "We review analytics, available session recordings, key funnels and the customer journey. The output is a prioritized list of potential improvements and test opportunities.",
  },
  {
    title: "Hypothesis and Test Planning",
    text: "We select suitable experiments, define the expected outcome and establish how results will be measured. Test selection depends on the potential impact, implementation effort and available traffic.",
  },
  {
    title: "Implementation and Testing",
    text: "We design and implement approved variants, check their functionality and run tests using suitable tools. Where controlled testing is not practical, we may recommend qualitative research or evidence-based usability improvements.",
  },
  {
    title: "Analysis and Iteration",
    text: "We review the results, document what was learned and decide whether to adopt, revise or retest a change. The findings inform the next set of improvements.",
  },
];

const MORE = [
  {
    title: "Shopify Development",
    text: "Custom builds, Shopify Plus, theme work and migrations that put your improvements live.",
    href: "/services/shopify-development",
  },
  {
    title: "Ecommerce Marketing Agency",
    text: "Paid media, creative and Klaviyo retention that bring the right traffic to optimized pages.",
    href: "/services/ecommerce-marketing",
  },
  {
    title: "White Label Shopify Development",
    text: "Add delivery capacity for your agency, with Shopify work delivered under your brand.",
    href: "/services/white-label-shopify",
  },
];

const FAQS = [
  {
    question: "What do conversion optimization services include?",
    answer:
      "They can include CRO audits, funnel analysis, customer-journey reviews, A/B testing, landing-page optimization and implementation of approved improvements. The scope depends on your store and goals.",
  },
  {
    question: "How much traffic does my store need for CRO?",
    answer:
      "Reliable A/B tests need enough orders to reach a clear result in a reasonable time. Lower-traffic stores still benefit from CRO: we use analytics, session recordings, usability reviews and best-practice fixes instead of formal split tests.",
  },
  {
    question: "What is included in a CRO audit?",
    answer:
      "We review analytics and funnels, product, collection, cart and checkout pages, mobile UX, page speed and messaging. You receive a prioritized list of issues and test ideas ranked by expected impact and effort.",
  },
  {
    question: "Do you offer Shopify CRO services?",
    answer:
      "Yes. Shopify and Shopify Plus are our core platform, so we can audit, design, build and test improvements directly in your theme, apps and checkout settings rather than handing over recommendations alone.",
  },
  {
    question: "Can CRO work alongside paid media?",
    answer:
      "Yes, and it usually should. Aligning landing pages with ad messages and improving conversion rates makes every visit you pay for more valuable. We can work with your media team or our own ecommerce marketing team.",
  },
];

export default function ConversionRateOptimizationPage() {
  return (
    <>
      <PageHero
        title={
          <>
            Conversion Optimization That <em>Drives Sales</em>
          </>
        }
        text={<p>Your store may already be attracting visitors, but how many are completing a purchase?</p>}
        primary={{ label: "Discuss Your CRO Goals", href: "/contact" }}
        secondary={{ label: "Explore Our Approach", href: `${PATH}#cro-process` }}
        tagline="CRO AUDITS · A/B TESTING · SHOPIFY CRO · LANDING PAGES · AOV"
        visual={{ src: "/images/cro/hero-funnel.png", width: 553, height: 533, className: "figma-crop" }}
      />

      <section className="section theme-paper" aria-labelledby="problems-title">
        <div className="container">
          <SectionHeader
            eyebrow="WHERE STORES LOSE SALES"
            title={
              <span id="problems-title">
                Find Out Where Your Store Is <em>Losing Potential</em> Customers
              </span>
            }
            text={
              <p>
                A store can have good products and steady traffic but still struggle to turn visits into orders. Confusing
                navigation, unclear product information, unexpected checkout friction and weak messaging can all affect
                purchasing decisions.
              </p>
            }
          />
          <CheckList
            columns={[
              { label: "Common conversion problems", variant: "cross", items: PROBLEMS },
              { label: "What a structured CRO process changes", items: CHANGES },
            ]}
          />
        </div>
      </section>

      <section className="section theme-dark" aria-labelledby="services-title">
        <div className="container">
          <SectionHeader
            eyebrow="WHAT WE OPTIMIZE"
            title={
              <span id="services-title">
                Ecommerce CRO Services for Every Stage of the <em>Customer Journey</em>
              </span>
            }
            text={
              <p>
                Our CRO work combines research, analysis, experimentation and implementation. The focus is on understanding
                what prevents customers from buying and testing improvements against meaningful outcomes.
              </p>
            }
          />
          <ServiceGrid items={SERVICES} />
        </div>
      </section>

      <section className="section theme-paper" aria-labelledby="areas-title">
        <div className="container">
          <SectionHeader
            eyebrow="SIX AREAS"
            title={
              <span id="areas-title">
                Six Areas We Review to <em>Improve Store</em> Conversions
              </span>
            }
          />
          <CardGrid items={AREAS} />
        </div>
      </section>

      <section id="cro-process" className={`section theme-red ${styles.anchor}`} aria-labelledby="process-title">
        <div className="container">
          <SectionHeader
            eyebrow="CRO PROCESS"
            title={
              <span id="process-title">
                From CRO Audit to <em>Measurable Experiments</em>
              </span>
            }
          />
          <Process theme="red" steps={STEPS} />
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

      <Faq items={FAQS} title={<>CRO <em>questions?</em></>} text="Straight answers before you reach out." />

      <CtaBanner
        title={
          <>
            Turn More of Your Existing Traffic Into <em>Customers</em>
          </>
        }
        text="Tell us about your store, your conversion challenges and the improvements you want to explore. We'll discuss your goals and outline a suitable CRO approach."
        primary={{ label: "Discuss Your CRO Project", href: "/contact" }}
        visual={<CroFunnel />}
      />

      <JsonLd
        data={[
          serviceJsonLd({ name: "Conversion Rate Optimization Services", description: DESCRIPTION, path: PATH }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Conversion Rate Optimization", path: PATH },
          ]),
        ]}
      />
      <MotionEngine />
    </>
  );
}
