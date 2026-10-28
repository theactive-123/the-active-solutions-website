"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { mainNav, services, site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MegaMenu } from "./MegaMenu";
import { useLenis } from "@/components/motion/SmoothScroll";
import { gsap, prefersReducedMotion } from "@/components/motion/gsap";
import styles from "./Header.module.css";

/** Is the area under the header dark? Sections opt in via .theme-dark / .theme-red. */
function isDarkBehind(header: HTMLElement) {
  const y = header.getBoundingClientRect().top + header.offsetHeight / 2;
  for (const el of document.elementsFromPoint(window.innerWidth / 2, y)) {
    if (header.contains(el)) continue;
    const themed = el.closest(".theme-dark, .theme-red, .theme-paper, .theme-sand, [data-header-theme]");
    if (themed) {
      const forced = themed.getAttribute("data-header-theme");
      if (forced) return forced === "dark";
      return themed.matches(".theme-dark, .theme-red");
    }
  }
  return false;
}

export function Header() {
  const pathname = usePathname();
  const lenis = useLenis();
  const ref = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [dark, setDark] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuId = useId();
  const servicesId = useId();

  // Theme + hide-on-scroll
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      if (ref.current) setDark(isDarkBehind(ref.current));
      setScrolled(y > 40);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240);
        last = y;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close the services menu on a click/tap outside the header
  useEffect(() => {
    if (!servicesOpen) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [servicesOpen]);

  // Close menus on navigation
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset UI when the route changes
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Mobile menu: lock scroll, animate, trap focus, close on Escape
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    if (menuOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      if (!prefersReducedMotion()) {
        gsap.fromTo(menu.querySelectorAll("[data-menu-item]"), { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.05, duration: 0.9, delay: 0.15 });
      }
      menu.querySelector<HTMLElement>("a, button")?.focus();
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setServicesOpen(false);
      }
      if (e.key === "Tab" && menuOpen) {
        const focusables = menu.querySelectorAll<HTMLElement>("a, button");
        const first = focusables[0];
        const lastEl = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, lenis]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));

  return (
    <>
      <div className={styles.scrim} data-open={servicesOpen} aria-hidden="true" />
      <header
        ref={ref}
        className={styles.header}
        data-dark={dark || menuOpen}
        data-hidden={hidden && !menuOpen && !servicesOpen}
        data-scrolled={scrolled}
      >
        <div className={styles.bar}>
          <Link href="/" className={styles.brand} aria-label={`${site.name}, home`}>
            <Logo />
          </Link>

          <nav className={styles.nav} aria-label="Main">
            <ul role="list" className={styles.navList}>
              {mainNav.slice(0, 1).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.navLink} aria-current={isActive(l.href) ? "page" : undefined}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li
                className={styles.hasMenu}
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setServicesOpen(false);
                }}
              >
                <button
                  type="button"
                  className={styles.navLink}
                  aria-expanded={servicesOpen}
                  aria-controls={servicesId}
                  data-active={pathname.startsWith("/services")}
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  Services
                  <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true" className={styles.chev}>
                    <path d="M1 1l4 4 4-4" stroke="currentColor" fill="none" strokeWidth="1.4" />
                  </svg>
                </button>
                <MegaMenu id={servicesId} open={servicesOpen} pathname={pathname} />
              </li>
              {mainNav.slice(1).map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={styles.navLink} aria-current={isActive(l.href) ? "page" : undefined}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Button href="/contact" size="sm" className={styles.cta}>
            Lets Talk
          </Button>

          <button
            type="button"
            className={styles.burger}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span className={styles.burgerLines} data-open={menuOpen} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <div
        ref={menuRef}
        id={menuId}
        className={styles.menu}
        data-open={menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        hidden={!menuOpen}
      >
        <nav aria-label="Mobile" className={styles.menuInner}>
          <ul role="list" className={styles.menuList}>
            {[mainNav[0], ...mainNav.slice(1), { label: "Contact", href: "/contact" }].map((l) => (
              <li key={l.href} className={styles.menuRow}>
                <Link href={l.href} className={styles.menuLink} data-menu-item onClick={closeMenu}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className={styles.menuLabel} data-menu-item>
            [ SERVICES ]
          </p>
          <ul role="list" className={styles.menuServices}>
            {services.map((s) => (
              <li key={s.href} className={styles.menuRow}>
                <Link href={s.href} data-menu-item onClick={closeMenu}>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
          <div data-menu-item className={styles.menuCta}>
            <Button href="/contact/schedule" onClick={closeMenu}>
              Book a growth call
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
}
