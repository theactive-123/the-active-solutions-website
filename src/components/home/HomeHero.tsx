import Image from "next/image";
import { Glow } from "@/components/motion/Glow";
import { TiltVisual } from "@/components/motion/TiltVisual";
import { Button } from "@/components/ui/Button";
import { HeroScene } from "./HeroScene";
import { LogoMarquee } from "./LogoMarquee";
import styles from "./HomeHero.module.css";

export function HomeHero() {
  return (
    <section className={`${styles.hero} theme-dark`} aria-labelledby="home-title">
      <Glow />
      <HeroScene />
      <div className={`container ${styles.inner}`}>
        <p className={styles.kicker} data-reveal="fade" data-immediate>
          [ SHOPIFY &amp; DTC GROWTH AGENCY <span>KARACHI</span>, WORLDWIDE ]
        </p>

        <div className={styles.grid}>
          <div className={styles.copy}>
            <div data-reveal="fade" data-immediate data-delay="0.1">
              <Image
                src="/images/brand/shopify-partners.png"
                alt="Shopify Partners"
                width={174}
                height={29}
                className={styles.partner}
                loading="eager"
              />
            </div>
            <h1 id="home-title" className={`display ${styles.title}`} data-hero-title>
              #1 Trusted <em>Shopify Agency</em> for DTC Brands
            </h1>
          </div>

          <div className={styles.side} data-particle-origin>
            <TiltVisual className={styles.visual}>
              <Image
                src="/images/brand/logo-3d.png"
                alt=""
                width={514}
                height={520}
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 27vw, 60vw"
              />
            </TiltVisual>
            <p className={`body ${styles.text}`} data-reveal data-immediate data-delay="0.45">
              We are a Shopify agency for DTC brands in the US, UK and global markets. We help brands build better Shopify
              stores and grow them into stronger revenue channels. From Shopify development and ecommerce optimization to
              paid marketing, CRO and retention, we bring the key pieces of DTC growth together under one team.
            </p>
            <div className={styles.actions} data-reveal data-immediate data-delay="0.6">
              <Button href="/contact/schedule">Book a growth call</Button>
              <Button href="/work" variant="outline-light">
                See our work
              </Button>
            </div>
          </div>
        </div>

        <span className={styles.rule} data-reveal="line" data-immediate data-delay="0.5" aria-hidden="true" />

        <div className={styles.trusted} data-reveal="fade" data-immediate data-delay="0.8">
          <p className={styles.trustedLabel}>[ TRUSTED BY DTC BRANDS ]</p>
          <LogoMarquee />
        </div>
      </div>
    </section>
  );
}
