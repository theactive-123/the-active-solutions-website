import type { Metadata, Viewport } from "next";
import { Geist, Inter_Tight, Jost, Newsreader } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Cursor } from "@/components/motion/Cursor";
import { Preloader } from "@/components/motion/Preloader";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const heading = Geist({ variable: "--font-heading", subsets: ["latin"], display: "swap" });
const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"], display: "swap" });
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400", "600"],
  display: "swap",
});
const jost = Jost({ variable: "--font-jost", subsets: ["latin"], weight: ["300", "400"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Shopify & DTC Growth Agency`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "business",
  keywords: [
    "Shopify agency",
    "Shopify development",
    "Shopify Plus",
    "Shopify CRO",
    "DTC growth agency",
    "ecommerce marketing agency",
    "white label Shopify development",
    "Karachi",
  ],
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: { siteName: site.name, locale: site.locale, type: "website" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0c",
  colorScheme: "light",
};

// Hide reveal targets before first paint only when JS + motion are available. If the motion
// engine has not booted within 4s (script error, slow device) content is shown regardless.
// `is-preloading` shows the preloader from the first paint; if it has not finished within 10s
// it is removed and on-load animations are released anyway.
const motionBoot = `(function(d){var r=d.documentElement;r.classList.add('is-preloading');setTimeout(function(){if(r.classList.contains('is-preloading')){r.classList.remove('is-preloading');window.dispatchEvent(new Event('tas:intro'))}},10000);if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){r.classList.add('js-motion');setTimeout(function(){if(!r.classList.contains('motion-ready'))r.classList.remove('js-motion')},4000)}})(document)`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${interTight.variable} ${newsreader.variable} ${jost.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Preloader />
        <SmoothScroll>
          <Header />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <Cursor />
        </SmoothScroll>
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
