import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { FeaturedInsight } from "@/components/insights/FeaturedInsight";
import { InsightsBrowser } from "@/components/insights/InsightsBrowser";
import { Newsletter } from "@/components/insights/Newsletter";
import { SectionLabel } from "@/components/insights/SectionLabel";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { PageHero } from "@/components/sections/PageHero";
import { sortedInsights } from "@/content/insights";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Shopify & Ecommerce Insights",
  description:
    "Practical articles on Shopify development, conversion rate optimization, paid media, Klaviyo email & SMS and platform migrations from The Active Solutions team.",
  path: "/insights",
});

export default function InsightsPage() {
  const articles = sortedInsights();
  const featured = articles.find((a) => a.featured) ?? articles[0];

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/insights#blog`,
    name: `${site.name} Insights`,
    url: `${site.url}/insights`,
    publisher: { "@id": `${site.url}/#organization` },
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      url: `${site.url}/insights/${a.slug}`,
      datePublished: a.date,
      image: `${site.url}${a.cover.src}`,
      author: { "@type": "Person", name: a.author.name },
    })),
  };

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
          ]),
          blogJsonLd,
        ]}
      />
      <PageHero
        title={
          <>
            <em>Shopify</em> &amp; <em>Ecommerce</em> Insights
          </>
        }
        text={
          <p>
            Practical thinking from the team building and growing Shopify stores: development, conversion optimization, paid media and
            retention.
          </p>
        }
        primary={{ label: "Subscribe for new articles", href: "/insights#subscribe" }}
        tagline="SHOPIFY · CRO · PAID MEDIA · EMAIL & SMS · MIGRATIONS"
        visual={{ src: "/images/insights/orb-3d.png", width: 600, height: 600, className: "figma-crop" }}
      />

      <FeaturedInsight article={featured} />

      <section className="section theme-sand" aria-labelledby="all-articles-title">
        <div className="container">
          <SectionLabel id="all-articles-title">ALL ARTICLES</SectionLabel>
          <InsightsBrowser articles={articles} featuredSlug={featured.slug} />
        </div>
      </section>

      <Newsletter />
      <MotionEngine />
    </>
  );
}
