import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { ArticleBody } from "@/components/insights/ArticleBody";
import { ArticleHero } from "@/components/insights/ArticleHero";
import { ArticleToc } from "@/components/insights/ArticleToc";
import { AuthorCard } from "@/components/insights/AuthorCard";
import { InsightCard } from "@/components/insights/InsightCard";
import { ReadingProgress } from "@/components/insights/ReadingProgress";
import { SectionLabel } from "@/components/insights/SectionLabel";
import { ShareLinks } from "@/components/insights/ShareLinks";
import styles from "@/components/insights/Article.module.css";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { getInsight, insights, readingTime, relatedInsights, tableOfContents } from "@/content/insights";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return insights.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) return {};
  const path = `/insights/${article.slug}`;
  const base = pageMetadata({ title: article.title, description: article.description, path, type: "article", publishedTime: article.date });
  const image = { url: article.cover.src, width: article.cover.width, height: article.cover.height, alt: article.cover.alt };
  return {
    ...base,
    authors: [{ name: article.author.name }],
    openGraph: {
      type: "article",
      url: `${site.url}${path}`,
      title: article.title,
      description: article.description,
      siteName: site.name,
      locale: site.locale,
      images: [image],
      publishedTime: article.date,
      authors: [article.author.name],
      section: article.category,
    },
    twitter: { ...base.twitter, images: [article.cover.src] },
  };
}

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const article = getInsight(slug);
  if (!article) notFound();

  const path = `/insights/${article.slug}`;
  const url = `${site.url}${path}`;
  const toc = tableOfContents(article);
  const related = relatedInsights(article, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.description,
    image: [`${site.url}${article.cover.src}`],
    datePublished: article.date,
    dateModified: article.date,
    articleSection: article.category,
    timeRequired: `PT${readingTime(article)}M`,
    inLanguage: "en",
    author: { "@type": "Person", name: article.author.name, jobTitle: article.author.role, url: `${site.url}/about` },
    publisher: { "@id": `${site.url}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isPartOf: { "@id": `${site.url}/insights#blog` },
  };

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd,
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: article.title, path },
          ]),
        ]}
      />
      <ReadingProgress />
      <ArticleHero article={article} />

      <section className={`theme-paper ${styles.section}`} aria-label="Article">
        <div className="container">
          <figure className={styles.cover} data-reveal="clip">
            <Image src={article.cover.src} alt={article.cover.alt} width={article.cover.width} height={article.cover.height} sizes="(min-width: 1920px) 1620px, 92vw" priority className={styles.coverImg} />
          </figure>
          <div className={styles.layout}>
            <div className={styles.stick}>
              <ArticleToc items={toc} />
            </div>
            <article id="article-body" className={styles.main} aria-labelledby="page-title">
              <ArticleBody blocks={article.body} />
            </article>
            <aside className={styles.aside} aria-label="Share and author">
              <ShareLinks url={url} title={article.title} />
              <AuthorCard author={article.author} />
            </aside>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section theme-sand" aria-labelledby="related-title">
          <div className="container">
            <SectionLabel id="related-title">KEEP READING</SectionLabel>
            <ul role="list" className={styles.related} data-reveal-stagger="0.12">
              {related.map((a) => (
                <li key={a.slug}>
                  <InsightCard article={a} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBanner
        title={
          <>
            Ready to Build a <em>Better Shopify</em> Store?
          </>
        }
        text="Tell us about your store, your current challenges and what you want to achieve. We'll discuss the requirements and prepare a clear project scope."
        primary={{ label: "Discuss Your Shopify Project", href: "/contact" }}
        visual={<Image src="/images/insights/cube-3d.png" alt="" width={622} height={622} className="figma-crop" sizes="(min-width: 1024px) 30vw, 70vw" />}
      />
      <MotionEngine />
    </>
  );
}
