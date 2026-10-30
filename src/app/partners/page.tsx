import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { CardGrid } from "@/components/sections/CardGrid";
import { CheckList } from "@/components/sections/CheckList";
import { Process } from "@/components/sections/Process";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TiltVisual } from "@/components/motion/TiltVisual";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { ExtendList } from "@/components/partners/ExtendList";
import { PartnerForm } from "@/components/partners/PartnerForm";
import { encodeEmail } from "@/lib/contact-email";
import { Faq } from "@/components/sections/Faq";
import styles from "@/components/partners/Partners.module.css";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Agency Partnerships & White-Label Delivery",
  description:
    "Partner with The Active Solutions: white-label Shopify development, web design, PPC and email marketing delivered under your agency's brand and workflow.",
  path: "/partners",
});

const WHY = [
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
  },
];

const WAYS = [
  {
    title: "White-Label Shopify Development",
    text: "Storefront builds, theme customization, integrations, migrations",
    href: "/services/white-label-shopify",
  },
  {
    title: "White-Label Web Design",
    text: "UI/UX design, responsive layouts, Figma files, design handoff",
    href: "/services/white-label-shopify",
  },
  {
    title: "White-Label PPC",
    text: "Campaign setup, optimization, creative production",
    href: "/services/white-label-shopify",
  },
  {
    title: "White-Label Email Marketing",
    text: "Klaviyo campaigns, lifecycle flows, templates",
    href: "/services/white-label-shopify",
  },
  {
    title: "White-Label Ecommerce Development",
    text: "Storefront development, integrations, implementation",
    href: "/services/shopify-development",
  },
];

const STEPS = [
  {
    title: "Confidentiality and Scope",
    text: "We establish confidentiality arrangements and discuss requirements, deliverables, timeline and communication before work begins.",
  },
  {
    title: "Integration With Your Workflow",
    text: "We agree on tools, channels, review process and reporting format, and can work inside your existing workspace.",
  },
  {
    title: "Branded Delivery",
    text: "Deliverables are prepared for handover under your agency's branding, subject to the agreed scope.",
  },
  {
    title: "Review and Ongoing Support",
    text: "You review the work before presenting it to your client. For ongoing engagements, priorities follow agreed capacity.",
  },
];

const FAQS = [
  {
    question: "Can we start with a single project?",
    answer:
      "A single-project engagement can be discussed as a way to evaluate the workflow and quality before considering ongoing collaboration. The scope, terms and availability are confirmed before work begins.",
  },
  {
    question: "Will you communicate directly with our clients?",
    answer:
      "Only if you ask us to. By default we work behind your agency and communicate with your team. Direct client contact happens only when it is authorized and agreed as part of the project workflow.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Pricing depends on scope. Single projects are quoted against agreed deliverables; ongoing support can run on a reserved monthly capacity. Rates and timelines are confirmed in writing before work starts.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Yes. We can sign your NDA, or provide ours, before you share client names, briefs, store access or brand materials.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Partners", path: "/partners" },
        ])}
      />
      <PageHero
        title={
          <>
            <em>Partner</em> With The Active Solutions
          </>
        }
        text={
          <p>
            We work behind your brand, inside your workflow, with your client relationships staying yours. Shopify development,
            ecommerce marketing and email support delivered by a team you can brief like your own.
          </p>
        }
        primary={{ label: "Become a Partner", href: "/contact?type=partner" }}
        secondary={{ label: "Schedule a meeting", href: "/contact/schedule" }}
        tagline="AGENCY PARTNERSHIPS · WHITE LABEL · KARACHI → WORLDWIDE"
        visual={{ src: "/images/partners/infinity-3d.png", width: 730, height: 545, className: "figma-crop" }}
      />

      <section className="section theme-paper" aria-labelledby="why-title">
        <div className="container">
          <SectionHeader
            titleClassName={styles.wide}
            eyebrow="WHY PARTNER"
            title={
              <span id="why-title">
                A delivery partner that <em>fits your agency</em>
              </span>
            }
          />
          <CardGrid items={WHY} columns={4} minHeight="clamp(220px, 14.5vw, 279px)" />
        </div>
      </section>

      <section className="section theme-dark" aria-labelledby="ways-title">
        <div className="container">
          <SectionHeader
            eyebrow="WHAT WE CAN SUPPORT"
            title={
              <span id="ways-title">
                Five <em>ways we extend</em> your team
              </span>
            }
            text={
              <p>Each engagement defines the included channels, deliverables, account access and reporting responsibilities.</p>
            }
          />
          <ExtendList items={WAYS} />
        </div>
      </section>

      <section className="section theme-red" aria-labelledby="steps-title">
        <div className="container">
          <SectionHeader
            titleClassName={styles.wide}
            eyebrow="HOW A PARTNERSHIP STARTS"
            title={
              <span id="steps-title">
                Four steps from hello to <em>branded delivery</em>
              </span>
            }
          />
          <Process steps={STEPS} theme="red" />
        </div>
      </section>

      <section className="section theme-paper" aria-labelledby="trust-title">
        <div className="container">
          <SectionHeader
            eyebrow="TRUST"
            title={
              <span id="trust-title">
                Your clients stay <em>your clients</em>
              </span>
            }
            text={
              <p>
                White-label work requires trust, clear responsibilities and careful handling of client information. We establish
                these expectations at the start of the engagement.
              </p>
            }
          />
          <CheckList
            columns={[
              { items: ["Client confidentiality", "Account access within provided permissions"] },
              { items: ["Project and brand assets handled as agreed", "No unauthorized client contact"] },
            ]}
          />
        </div>
      </section>

      <section id="partner-form" className="section theme-sand" aria-labelledby="form-title">
        <div className="container">
          <Eyebrow>GET STARTED</Eyebrow>
          <div className={styles.formGrid}>
            <div className={styles.formIntro}>
              <h2 id="form-title" className="h2" data-split>
                Tell us about <em>your agency</em>
              </h2>
              <p className="body" data-reveal>
                Tell us about your agency, the services you need support with and your expected delivery requirements. We&apos;ll
                review the details and discuss a practical white-label arrangement.
              </p>
            </div>
            <PartnerForm emailCode={encodeEmail()} />
          </div>
        </div>
      </section>

      <Faq items={FAQS} title={<>Partner <em>questions?</em></>} text="Straight answers before you reach out." />

      <CtaBanner
        title={
          <>
            Need More <em>Capacity for Your Agency&apos;s</em> Next Project?
          </>
        }
        text="Tell us about your agency, the services you need support with and your expected delivery requirements."
        primary={{ label: "Become a Partner", href: "/contact?type=partner" }}
        secondary={{ label: "Discuss a Project", href: "/contact" }}
        visual={
          <TiltVisual className="figma-crop">
            <Image src="/images/partners/infinity-3d.png" alt="" width={730} height={545} sizes="(min-width: 1024px) 30vw, 80vw" />
          </TiltVisual>
        }
      />
      <MotionEngine />
    </>
  );
}
