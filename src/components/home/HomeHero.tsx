import Image from "next/image";
import { Glow } from "@/components/motion/Glow";
import { TiltVisual } from "@/components/motion/TiltVisual";
import { Button } from "@/components/ui/Button";
import { HeroParticles } from "./HeroParticles";
import { LogoMarquee } from "./LogoMarquee";
import styles from "./HomeHero.module.css";

export function HomeHero() {
  return (
    <section className={`${styles.hero} theme-dark`} aria-labelledby="home-title">
      <Glow />
      <HeroParticles text={"SHOPIFY\nGROWTH"} />
      <div className={`container ${styles.inner}`}>
        <p className={styles.kicker} data-reveal="fade" data-immediate>
          [ SHOPIFY &amp; DTC GROWTH AGENCY <span>KARACHI</span>, WORLDWIDE ]
        </p>

        <div className={styles.grid}>
          <div className={styles.copy}>
            {/* Empty space the particle words fill on desktop (see HeroParticles). */}
            <div className={styles.slot} data-particle-slot aria-hidden="true" />
            <div data-reveal="fade" data-immediate data-delay="0.1">
              <Image
                src="/images/brand/shopify-partners.png"
                alt="Shopify Partners"
                width={174}
                height={29}
                className={styles.partner}
                priority
              />
            </div>
            <h1 id="home-title" className={`display ${styles.title}`} data-split data-immediate>
              Shopify stores built to <em>grow</em> brands.
            </h1>
          </div>

          <div className={styles.side} data-particle-origin>
            <TiltVisual className={styles.visual}>
              <Image
                src="/images/brand/logo-3d.png"
                alt=""
                width={514}
                height={520}
                priority
                sizes="(min-width: 1024px) 27vw, 60vw"
              />
            </TiltVisual>
            <p className={`body ${styles.text}`} data-reveal data-immediate data-delay="0.45">
              We design, build and grow Shopify brands: development, CRO, paid media and retention, under one roof.
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
