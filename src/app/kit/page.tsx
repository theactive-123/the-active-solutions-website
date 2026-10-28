import { PageHero } from "@/components/sections/PageHero";
import { CardGrid } from "@/components/sections/CardGrid";
import { CheckList } from "@/components/sections/CheckList";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { Process } from "@/components/sections/Process";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { Button } from "@/components/ui/Button";

const steps = [1, 2, 3, 4].map((n) => ({ title: `Step ${n} title`, text: "We review your current store, product catalog, customer journey and business requirements." }));

export default function Kit() {
  return (
    <>
      <PageHero
        title={<>Shopify Services That <em>Drive Growth.</em></>}
        text={<p>Your Shopify store should do more than look good. It should make buying easier, support your operations, and give your brand room to grow.</p>}
        primary={{ label: "Discuss Your Shopify Project", href: "/contact" }}
        secondary={{ label: "Explore our work", href: "/#work" }}
        tagline="SHOPIFY · SHOPIFY PLUS · THEMES · MIGRATIONS · INTEGRATIONS"
        visual={{ src: "/images/brand/logo-3d.png", width: 514, height: 520 }}
      />
      <section className="section theme-dark">
        <div className="container">
          <SectionHeader eyebrow="WHAT WE BUILD" title={<>Shopify Development Services for <em>Growing Ecommerce</em> Brands</>} text={<p>We handle the technical and design work required to build, improve and maintain Shopify stores.</p>} />
          <ServiceGrid items={[
            { title: "Custom Shopify Development", tags: ["Custom Builds", "Storefront Development", "Custom Sections", "API Integrations", "Liquid Development", "Checkout Optimization"] },
            { title: "Shopify Plus & Integrations", tags: ["Shopify Plus", "ERP Integration", "Scalable Solutions", "Enterprise Ecommerce", "App Integrations", "Workflow Automation"] },
            { title: "Shopify Theme Design & Customization", tags: ["Custom Themes", "Mobile Optimization", "Performance Optimization"] },
            { title: "Store Design & Migration", tags: ["Store Design", "SEO Preservation", "Platform Migration"] },
          ]} />
        </div>
      </section>
      <section className="section theme-red">
        <div className="container">
          <SectionHeader eyebrow="MIGRATION" title={<>Shopify Migration Services Without <em>Unnecessary Disruption</em></>} text={<p>Moving to Shopify involves more than transferring products.</p>} />
          <CardGrid tone="red" items={[{ title: "Data and Catalog Migration", text: "We plan the transfer of agreed product data." }, { title: "SEO-Preserving Redirects", text: "We review important existing URLs." }, { title: "Store Structure and Cleanup", text: "A migration is an opportunity." }]} />
          <div style={{ marginTop: 40 }}><Button href="/contact" variant="white">Plan Your Shopify Migration</Button></div>
        </div>
      </section>
      <section className="section theme-paper">
        <div className="container">
          <CheckList columns={[{ label: "COMMON CONVERSION PROBLEMS", variant: "cross", items: ["Product pages that do not answer important buying questions", "Unclear shipping, returns or product information"] }, { label: "WHAT A STRUCTURED CRO PROCESS CHANGES", items: ["Product pages organized around customer questions and objections", "Checkout journeys reviewed for avoidable friction"] }]} />
          <div style={{ marginTop: 60 }}><CardGrid columns={4} items={[{ title: "Flexible Project Support", text: "Discuss support for individual projects." }, { title: "Your Agency's Brand Comes First", text: "Deliverables follow the agreed branding." }, { title: "A Defined Delivery Process", text: "Clear requirements." }, { title: "A Practical Extension of Your Team", text: "Work with a delivery partner.", href: "/partners" }]} /></div>
        </div>
      </section>
      <section className="section theme-dark"><div className="container"><Process theme="dark" steps={steps} /></div></section>
      <CtaBanner title={<>Ready to Build a <em>Better Shopify</em> Store?</>} text="Tell us about your store." primary={{ label: "Discuss Your Shopify Project", href: "/contact" }} />
      <MotionEngine />
    </>
  );
}
