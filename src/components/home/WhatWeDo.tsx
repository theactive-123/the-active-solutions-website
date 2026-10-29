import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Arrow } from "@/components/ui/Button";
import { TiltCard } from "./TiltCard";
import styles from "./WhatWeDo.module.css";

const PILLARS = [
  {
    title: "Build.",
    tagline: "A store worth experiencing.",
    text: "We design and develop Shopify storefronts that bring your brand to life and give customers a smooth path from discovery to checkout.",
    tags: ["Shopify + Shopify Plus", "Custom themes", "Migrations", "Headless", "Integrations"],
    cta: "Explore Shopify",
    href: "/services/shopify-development",
    icon: "/images/icons/sparkle.svg",
    tone: "dark",
  },
  {
    title: "Optimize.",
    tagline: "Make every click count.",
    text: "We find the friction in your shopping experience and fix what influences conversion, order value and customer experience.",
    tags: ["CRO audits", "A/B testing", "Funnel fixes", "Checkout", "Bundles + subscriptions"],
    cta: "Explore CRO",
    href: "/services/conversion-rate-optimization",
    icon: "/images/icons/atom.svg",
    tone: "sand",
  },
  {
    title: "Grow.",
    tagline: "Reach them. Keep them.",
    text: "We connect paid acquisition and retention to help ecommerce brands reach the right audience and keep them coming back.",
    tags: ["Meta Ads", "TikTok Ads", "Google Ads", "Email + SMS", "Klaviyo", "Lifecycle"],
    cta: "Explore Paid Media + Retention",
    href: "/services/ecommerce-marketing",
    icon: "/images/icons/infinity.svg",
    tone: "red",
  },
] as const;

export function WhatWeDo() {
  return (
    <section className="section theme-paper" aria-labelledby="wwd-title">
      <div className="container">
        <SectionHeader
          eyebrow="WHAT WE DO"
          title={
            <span id="wwd-title">
              One team.
              <br /> Three <em>superpowers.</em>
            </span>
          }
          text={<p>No five-agency juggling act. Your store, your traffic and your customers all get looked after by the same crew.</p>}
        />
        <ul role="list" className={styles.cards} data-reveal-stagger="0.12">
          {PILLARS.map((p, i) => (
            <li key={p.title} className={styles.item}>
              <TiltCard className={`${styles.card} ${styles[p.tone]}`}>
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.tagline}>{p.tagline}</p>
                <div className={styles.icon} aria-hidden="true">
                  <Image src={p.icon} alt="" width={300} height={300} />
                </div>
                <p className={styles.text}>{p.text}</p>
                <ul role="list" className={styles.tags}>
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <Link href={p.href} className={styles.link}>
                  {p.cta}
                  <Arrow className={styles.arrow} />
                </Link>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
