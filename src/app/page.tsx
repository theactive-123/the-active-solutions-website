import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { AboutStatement } from "@/components/home/AboutStatement";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { Silos } from "@/components/home/Silos";
import { Industries } from "@/components/home/Industries";
import { Agencies } from "@/components/home/Agencies";
import { NeedBuilder } from "@/components/home/NeedBuilder";
import { CloudLogo } from "@/components/home/CloudLogo";
import { Process } from "@/components/sections/Process";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${site.name} | Shopify & DTC Growth Agency`,
    description:
      "Shopify stores built to grow brands. A Karachi-based Shopify & DTC growth agency for brands worldwide: Shopify development, CRO, paid media and retention under one team.",
    path: "/",
  }),
  title: { absolute: `${site.name} | Shopify & DTC Growth Agency` },
};

const FAQS = [
  {
    question: "What is a Shopify agency for DTC brands?",
    answer:
      "A Shopify agency helps direct-to-consumer brands build, improve and grow their Shopify stores, from development and store optimization to marketing, conversion optimization and retention.",
  },
  {
    question: "Do you specialize in Shopify for DTC brands?",
    answer:
      "Yes. Shopify and Shopify Plus are our core platform, and most of our clients are DTC brands in beauty, apparel, home, wellness and food & beverage selling in the US, UK and the Gulf.",
  },
  {
    question: "Can you help improve my existing Shopify store?",
    answer:
      "Absolutely. Many projects start with an audit of an existing store. We review speed, UX, product pages, checkout and tracking, then prioritise the fixes and tests most likely to lift revenue.",
  },
  {
    question: "Do you build Shopify stores from scratch?",
    answer:
      "Yes. We design and develop custom Shopify and Shopify Plus storefronts, from information architecture and Figma design through Liquid development, integrations, QA and launch.",
  },
  {
    question: "Can you improve my Shopify conversion rate?",
    answer:
      "We run structured CRO programmes: research, a prioritised test backlog, A/B tests and implementation. We can't promise a specific number, but every change is measured against a shared baseline.",
  },
  {
    question: "Will working with a Pakistan-based team be difficult?",
    answer:
      "No. We overlap with UK and Gulf working hours, keep US-friendly check-ins, and communicate in English on Slack, email and calls. You get weekly updates and one senior point of contact.",
  },
];

const STEPS = [
  {
    title: "Discover",
    text: "We learn about your brand, customers, products, Shopify store, current marketing and growth goals.",
  },
  {
    title: "Plan",
    text: "We turn what we learn into one roadmap across store, CRO, paid media and retention, with clear priorities and owners.",
  },
  {
    title: "Build & launch",
    text: "We design, develop and launch in focused sprints, with progress you can review every week.",
  },
  {
    title: "Grow",
    text: "We measure, test and iterate against one shared scoreboard so every channel compounds.",
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <AboutStatement />
      <FeaturedWork />
      <WhatWeDo />
      <Silos />
      <section className="section theme-paper" aria-labelledby="how-title">
        <div className="container">
          <SectionHeader
            eyebrow="HOW WE WORK"
            title={
              <span id="how-title">
                No complicated process. No <em>endless meetings.</em>
              </span>
            }
            text={<p>You&apos;ve already got a product people want. We build the system that turns traffic and ad spend into growth.</p>}
          />
          <Process steps={STEPS} />
        </div>
      </section>
      <Industries />
      <Agencies />
      <NeedBuilder />
      <Faq items={FAQS} />
      <CtaBanner
        title={
          <>
            Ready to <em>grow</em> your store?
          </>
        }
        text="Let's look at your Shopify store, marketing and customer journey, find the biggest opportunities and map a practical path to more customers and sustainable growth."
        primary={{ label: "Book a Shopify Growth Strategy Call", href: "/contact/schedule" }}
        secondary={{ label: "Explore our work", href: "/work" }}
        visual={<CloudLogo />}
      />
      <MotionEngine />
    </>
  );
}
