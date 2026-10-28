import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { CardGrid } from "@/components/sections/CardGrid";
import { Process } from "@/components/sections/Process";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TiltVisual } from "@/components/motion/TiltVisual";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { DeliveryProof } from "@/components/white-label/DeliveryProof";
import { JsonLd } from "@/components/JsonLd";
import styles from "@/components/white-label/WhiteLabel.module.css";
import { breadcrumbJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

const PATH = "/services/white-label-shopify";
const DESCRIPTION =
  "White-label Shopify development, web design, PPC and email marketing for agencies. Add delivery capacity under your brand without growing your in-house team.";

export const metadata = pageMetadata({
  title: "White Label Shopify Development for Agencies",
  description: DESCRIPTION,
  path: PATH,
});

const SERVICES = [
  {
    title: "White-Label Shopify Development",
    tags: ["Custom Builds", "Storefront Development", "Theme Customization", "API Integrations", "Liquid Development", "Checkout Optimization"],
  },
  {
    title: "White-Label Web Design Services",
    tags: ["UI/UX Design", "Responsive Design", "Integration", "Figma Files", "Layout Design", "Web Development"],
  },
  {
    title: "White-Label PPC Services",
    tags: ["Paid Media", "Performance Tracking", "Campaign Reporting", "Campaign Setup", "Ad Optimization", "Creative Production"],
  },
  {
    title: "White-Label Email Marketing",
    tags: ["Email Campaigns", "Email Copywriting", "Performance Reporting", "Marketing Automation", "Audience Segmentation", "List Management"],
  },
];

const STEPS = [
  {
    title: "Confidentiality and Scope",
    text: "We establish the required confidentiality arrangements and discuss the project requirements, deliverables, timeline and communication process before work begins.",
  },
  {
    title: "Integration With Your Workflow",
    text: "We agree on the project management tools, communication channels, review process and reporting format. Where appropriate, our team can work within your existing workspace.",
  },
  {
    title: "Branded Delivery",
    text: "Deliverables are prepared for handover under your agency's branding, subject to the agreed scope and confidentiality arrangements. We follow the delivery standards and review process established for the engagement.",
  },
  {
    title: "Review and Ongoing Support",
    text: "You review the work before presenting it to your client. For ongoing engagements, we can coordinate priorities and delivery schedules according to agreed capacity and project requirements.",
  },
];

const CONFIDENTIALITY = [
  {
    title: "Client Confidentiality",
    text: "We follow agreed confidentiality requirements and do not disclose client identities or project details outside the authorized engagement. Any exceptions must be agreed in writing.",
  },
  {
    title: "Project and Brand Assets",
    text: "Project briefs, brand materials, designs and other client information are handled according to the agreed access and confidentiality arrangements.",
  },
  {
    title: "Account Access",
    text: "Access to Shopify stores, advertising accounts and email platforms is established according to the project requirements. We work within the permissions provided for the engagement.",
  },
  {
    title: "No Unauthorized Client Contact",
    text: "We respect your agency's ownership of the client relationship. Direct client communication is handled only when authorized and agreed as part of the project workflow.",
  },
];

const BENEFITS = [
  {
    title: "Flexible Project Support",
    text: "Discuss support for individual projects or ongoing delivery requirements, with scope and capacity agreed in advance.",
  },
  {
    title: "Your Agency's Brand Comes First",
    text: "Deliverables follow the agreed branding and handover process so the client experience remains consistent with your agency.",
  },
  {
    title: "A Defined Delivery Process",
    text: "Clear requirements, milestones, communication and review stages help keep projects organized and reduce avoidable confusion.",
  },
  {
    title: "A Practical Extension of Your Team",
    text: "Work with a delivery partner that can fit into your established workflow, with responsibilities and project ownership agreed at the beginning.",
    href: "/partners",
  },
];

const FAQS = [
  {
    question: "What is white-label Shopify development?",
    answer:
      "It is Shopify design and development delivered by our team and handed over under your agency's brand. You own the client relationship and present the work as your own; we stay behind the scenes.",
  },
  {
    question: "Which white-label services can we outsource to you?",
    answer:
      "Shopify and Shopify Plus development, web design in Figma, PPC campaign management and Klaviyo email marketing. Each engagement defines the channels, deliverables, account access and reporting responsibilities.",
  },
  {
    question: "Will you ever contact our clients directly?",
    answer:
      "No, not unless you authorize it. By default we communicate only with your team. Direct client contact happens only when it is agreed in writing as part of the project workflow.",
  },
  {
    question: "Can you sign an NDA before we share project details?",
    answer:
      "Yes. We are happy to sign your NDA, or use ours, before you share client names, briefs, store access or brand materials.",
  },
  {
    question: "How is a white-label project priced?",
    answer:
      "Single projects are quoted against an agreed scope. Ongoing support can run on a reserved monthly capacity. Rates, timelines and deliverables are confirmed in writing before work starts.",
  },
];

export default function WhiteLabelShopifyPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({ name: "White Label Shopify Development", description: DESCRIPTION, path: PATH }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "White Label Shopify", path: PATH },
          ]),
        ]}
      />
      <PageHero
        title={
          <>
            White Label Shopify for <em>Growing Agencies</em>
          </>
        }
        text={
          <p>
            The Active Solutions provides white-label Shopify development and ecommerce delivery support for agencies that need
            additional capacity without the cost and complexity of expanding their internal team.
          </p>
        }
        primary={{ label: "Become a Partner", href: "/contact?type=partner" }}
        secondary={{ label: "Discuss a White-Label Project", href: "/contact" }}
        tagline="SHOPIFY DEVELOPMENT · WEB DESIGN · PPC · EMAIL · ECOMMERCE DEV"
        visual={{ src: "/images/white-label/atom-3d.png", width: 700, height: 620, className: "figma-crop" }}
      />

      <section className="section theme-paper" aria-labelledby="wl-services-title">
        <div className="container">
          <SectionHeader
            titleClassName={styles.wide}
            eyebrow="WHITE-LABEL SERVICES"
            title={
              <span id="wl-services-title">
                White-Label Ecommerce Services for <em>Agency Partners</em>
              </span>
            }
            text={
              <p>
                Whether you need help delivering a single project or additional capacity for ongoing client work, we can discuss a
                scope that fits your agency&apos;s requirements.
              </p>
            }
          />
          <ServiceGrid items={SERVICES} tone="light" />
        </div>
      </section>

      <section className="section theme-dark" aria-labelledby="wl-process-title">
        <div className="container">
          <SectionHeader
            titleClassName={styles.wide}
            eyebrow="PARTNERSHIP PROCESS"
            title={
              <span id="wl-process-title">
                A White-Label Partnership That <em>Fits Your Workflow</em>
              </span>
            }
          />
          <Process steps={STEPS} theme="dark" />
        </div>
      </section>

      <section className="section theme-sand" aria-labelledby="wl-confidentiality-title">
        <div className="container">
          <SectionHeader
            titleClassName={styles.wide}
            eyebrow="CONFIDENTIALITY"
            title={
              <span id="wl-confidentiality-title">
                Protect Your <em>Client Relationships</em> and Project Information
              </span>
            }
            text={
              <p>
                White-label work requires trust, clear responsibilities and careful handling of client information. We establish
                these expectations at the start of the engagement.
              </p>
            }
          />
          <CardGrid items={CONFIDENTIALITY} columns={4} minHeight="clamp(220px, 15.9vw, 306px)" />
        </div>
      </section>

      <section className="section theme-paper" aria-labelledby="wl-benefits-title">
        <div className="container">
          <SectionHeader
            titleClassName={styles.wider}
            eyebrow="AGENCY BENEFITS"
            title={
              <span id="wl-benefits-title">
                Add <em>Delivery Capacity</em> Without Building a Larger In-House Team
              </span>
            }
          />
          <CardGrid items={BENEFITS} columns={2} minHeight="clamp(200px, 13.9vw, 266px)" className={styles.bottomCards} />
        </div>
      </section>

      <DeliveryProof />

      <Faq items={FAQS} />

      <CtaBanner
        title={
          <>
            Need <em>More Agency</em> Capacity?
          </>
        }
        text="Tell us about your agency, the services you need support with and your expected delivery requirements. We'll review the details and discuss a practical white-label arrangement."
        primary={{ label: "Become a Partner", href: "/contact?type=partner" }}
        secondary={{ label: "Schedule a meeting", href: "/contact/schedule" }}
        visual={
          <TiltVisual className="figma-crop">
            <Image src="/images/white-label/atom-3d.png" alt="" width={700} height={620} sizes="(min-width: 1024px) 30vw, 80vw" />
          </TiltVisual>
        }
      />
      <MotionEngine />
    </>
  );
}
