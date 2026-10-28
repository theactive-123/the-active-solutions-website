import Link from "next/link";
import { companyNav, legalNav, services, site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { FooterWordmark } from "./FooterWordmark";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={`${styles.footer} theme-dark`}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.about}>
            <Link href="/" aria-label={`${site.name}, home`} className={styles.logo}>
              <Logo size="lg" />
            </Link>
            <p className={styles.blurb}>
              Digital products built in Karachi for companies worldwide. Shopify, Webflow and custom apps delivered by the
              senior team you meet in the proposal.
            </p>
          </div>

          <nav className={styles.col} aria-labelledby="footer-services">
            <h2 id="footer-services" className={styles.colTitle}>
              Services
            </h2>
            <ul role="list">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className={styles.link}>
                    {s.short}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className={styles.col} aria-labelledby="footer-company">
            <h2 id="footer-company" className={styles.colTitle}>
              Company
            </h2>
            <ul role="list">
              {companyNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.col}>
            <h2 className={styles.colTitle}>Office</h2>
            <address className={styles.address}>
              {site.address.street},
              <br />
              {site.address.city}, {site.address.postalCode}
              <br />
              <a href={`mailto:${site.email}`} className={styles.link}>
                {site.email}
              </a>
            </address>
          </div>
        </div>

        <FooterWordmark />

        <div className={styles.bottom}>
          <p>© {site.name} 2026. All rights reserved</p>
          <ul role="list" className={styles.legal}>
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={styles.link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
