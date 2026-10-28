import { Process } from "@/components/sections/Process";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TiltVisual } from "@/components/motion/TiltVisual";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { JsonLd } from "@/components/JsonLd";
import { OrbitDiagram } from "@/components/marketing/OrbitDiagram";
import { CreativeFormats } from "@/components/marketing/CreativeFormats";
import { ReportingDashboard } from "@/components/marketing/ReportingDashboard";
import { Faq } from "@/components/sections/Faq";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import styles from "./page.module.css";

const PATH = "/services/ecommerce-marketing";
const DESCRIPTION =
  "Ecommerce marketing for Shopify brands: Meta, Google and TikTok ads, creative production and Klaviyo email and SMS, run as one strategy with clear reporting.";

export const metadata = pageMetadata({
  title: "Ecommerce Marketing Agency for Growth & Retention",
  description: DESCRIPTION,
  path: PATH,
});

const SERVICES = [
  {
    title: "Meta Ads & Paid Social",
    tags: ["Facebook Ads", "Instagram Ads", "Audience Targeting", "Retargeting", "Creative Testing", "Campaign Optimization"],
  },
  {
    title: "Google & TikTok Ads",
    tags: ["Google Shopping", "Video Creatives", "ROAS Optimization", "Performance Max", "Search Ads", "TikTok Ads"],
  },
  {
    title: "Klaviyo Email & SMS Marketing",
    tags: ["Email Campaigns", "Customer Segmentation", "Retention Automation", "Klaviyo Flows", "SMS Marketing", "Cart Recovery"],
  },
  {
    title: "Shopify Ecommerce Growth",
    tags: ["Shopify Marketing", "Lifecycle Marketing", "Revenue Growth", "Conversion Optimization", "Landing Pages", "Customer Retention"],
  },
];

const REPORTING = [
  {
    title: "Campaign Reporting",
    text: "Review key campaign metrics, spending, audience performance and creative results to understand what is working and what needs improvement.",
  },
  {
    title: "Ecommerce Performance Dashboard",
    text: "Where the appropriate tools and integrations are available, use a shared dashboard to review channel performance, revenue trends and new versus returning customer activity.",
  },
  {
    title: "Strategy Reviews",
    text: "Review the results, discuss channel priorities and agree on the next set of tests or optimizations.",
  },
  {
    title: "Clear Communication",
    text: "Receive regular updates on completed work, campaign changes, key findings and upcoming priorities through the agreed communication channels.",
  },
];

const STEPS = [
  {
    title: "Account and Business Review",
    text: "We review your products, customer segments, advertising accounts, existing email flows and commercial objectives.",
  },
  {
    title: "Strategy and Priorities",
    text: "We agree on campaign objectives, channel priorities, creative requirements and the retention opportunities worth addressing first.",
  },
  {
    title: "Campaign Execution and Testing",
    text: "We launch or refine agreed campaigns, develop creative variations and implement relevant lifecycle communications. Work is carried out within the approved scope.",
  },
  {
    title: "Reporting and Optimization",
    text: "We review performance, document findings and prioritize the next actions based on available data and business goals.",
  },
];

const FAQS = [
  {
    question: "What does an ecommerce marketing agency do?",
    answer:
      "An ecommerce marketing agency helps online retailers attract customers and improve marketing performance through services such as paid advertising, creative development, email marketing and customer retention.",
  },
  {
    question: "Do you work with Shopify brands?",
    answer:
      "Yes. Most of our marketing clients sell on Shopify or Shopify Plus, so tracking, campaigns and Klaviyo flows are set up around how Shopify stores work, and our development team can fix on-site issues that hold campaigns back.",
  },
  {
    question: "Do you provide Klaviyo email marketing services?",
    answer:
      "Yes. We plan, build and manage Klaviyo email and SMS: welcome, browse and cart recovery flows, post-purchase journeys, segmentation and regular campaigns, reviewed against revenue and retention goals.",
  },
  {
    question: "Can you take over existing advertising accounts?",
    answer:
      "Yes. We start with an audit of your existing Meta, Google or TikTok accounts, keep what is working, and agree on a transition plan so account history and learning are not lost.",
  },
  {
    question: "How do you measure marketing performance?",
    answer:
      "We agree on the metrics that matter for your business, such as revenue, ROAS, customer acquisition cost and repeat purchase rate, and review them in regular reports alongside the actions planned next.",
  },
];

export default function EcommerceMarketingPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ name: "Ecommerce Marketing", description: DESCRIPTION, path: PATH }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Ecommerce Marketing", path: PATH },
          ]),
        ]}
      />
      <PageHero
        title={
          <>
            Ecommerce Marketing for <em>Growth</em> &amp; <em>Retention</em>
          </>
        }
        text={
          <p>
            Acquiring a customer is only part of growing an ecommerce brand. Your advertising, creative, email and retention activity need to
            work together.
          </p>
        }
        primary={{ label: "Discuss Your Growth Goals", href: "/contact" }}
        secondary={{ label: "Explore Our Services", href: "#services" }}
        tagline="META ADS · GOOGLE ADS · TIKTOK · KLAVIYO · SMS · RETENTION"
        visual={{ src: "/images/marketing/orb-hero.png", width: 580, height: 580, className: "figma-crop" }}
      />

      <section className={`section theme-paper ${styles.connected}`} aria-labelledby="connected-title">
        <div className="container">
          <Eyebrow>CONNECTED GROWTH</Eyebrow>
          <div className={styles.split}>
            <div className={styles.copy}>
              <h2 id="connected-title" className="h2" data-split>
                One Ecommerce <em>Marketing Strategy</em> Across Every Channel
              </h2>
              <div className={`body ${styles.paras}`} data-reveal>
                <p>
                  We bring paid acquisition and retention into one working strategy. Campaign performance informs creative decisions, customer
                  behavior informs segmentation, and retention activity helps shape future acquisition priorities.
                </p>
                <p>
                  This connected approach helps your team evaluate the complete customer journey rather than treating each channel as an isolated
                  project.
                </p>
              </div>
            </div>
            <OrbitDiagram />
          </div>
        </div>
      </section>

      <section id="services" className="section theme-dark" aria-labelledby="services-title">
        <div className="container">
          <SectionHeader
            eyebrow="MARKETING SERVICES"
            title={
              <span id="services-title">
                Paid Media and <em>Ecommerce Marketing</em> Services
              </span>
            }
            text={
              <p>
                We plan, launch and manage paid media and lifecycle marketing for Shopify brands. Every channel is measured against the same
                revenue goals, so budget and effort go where they make the biggest difference.
              </p>
            }
          />
          <ServiceGrid items={SERVICES} />
        </div>
      </section>

      <section className="section theme-sand" aria-labelledby="creative-title">
        <div className="container">
          <SectionHeader
            eyebrow="CREATIVE PRODUCTION"
            title={
              <span id="creative-title">
                Creative Production That Supports <em>Campaign Performance</em>
              </span>
            }
            text={
              <p>
                Creative is an important part of paid media performance. We develop and test assets that communicate the product&apos;s value,
                support the offer and give campaigns suitable variations to evaluate.
              </p>
            }
          />
          <CreativeFormats />
        </div>
      </section>

      <section className="section theme-paper" aria-labelledby="reporting-title">
        <div className="container">
          <SectionHeader
            eyebrow="REPORTING"
            title={
              <span id="reporting-title">
                Reporting That Connects Marketing Activity to <em>Business Results</em>
              </span>
            }
            text={
              <p>
                We help you understand how campaigns and retention activity are performing, what has changed and which actions deserve attention
                next.
              </p>
            }
          />
          <div className={styles.reporting}>
            <div data-reveal="scale">
              <ReportingDashboard />
            </div>
            <ol role="list" className={styles.rows} data-reveal-stagger="0.1">
              {REPORTING.map((r, i) => (
                <li key={r.title} className={styles.row}>
                  <span className={styles.rowNum} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className={styles.rowTitle}>{r.title}</h3>
                    <p className={styles.rowText}>{r.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section theme-red" aria-labelledby="how-title">
        <div className="container">
          <SectionHeader
            eyebrow="HOW WE WORK"
            title={
              <span id="how-title">
                A Structured Approach to Ecommerce <em>Growth Marketing</em>
              </span>
            }
          />
          <Process theme="red" steps={STEPS} />
        </div>
      </section>

      <Faq
        items={FAQS}
        title={
          <>
            Marketing
            <br /> <em>questions?</em>
          </>
        }
        text="Straight answers before you reach out."
      />

      <CtaBanner
        title={
          <>
            Ready to <em>Connect</em> Your <em>Paid Media</em> and Retention Strategy?
          </>
        }
        text="Tell us about your store, current marketing activity and growth priorities. We'll review your requirements and discuss how paid media, creative and lifecycle marketing can work together."
        primary={{ label: "Discuss Your Growth Strategy", href: "/contact" }}
        visual={
          <TiltVisual className="figma-crop">
            <Image src="/images/marketing/orb-cta.png" alt="" width={580} height={580} sizes="(min-width: 1024px) 30vw, 70vw" />
          </TiltVisual>
        }
      />
      <MotionEngine />
    </>
  );
}
