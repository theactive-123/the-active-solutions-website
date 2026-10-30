import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { JsonLd } from "@/components/JsonLd";
import { ArticleBody } from "@/components/insights/ArticleBody";
import { ArticleHero } from "@/components/insights/ArticleHero";
import { ArticleToc } from "@/components/insights/ArticleToc";
import { ArticleSkeleton } from "@/components/insights/ArticleSkeleton";
import { AuthorCard } from "@/components/insights/AuthorCard";
import { InsightCard } from "@/components/insights/InsightCard";
import { ReadingProgress } from "@/components/insights/ReadingProgress";
import { SectionLabel } from "@/components/insights/SectionLabel";
import { ShareLinks } from "@/components/insights/ShareLinks";
import styles from "@/components/insights/Article.module.css";
import { MotionEngine } from "@/components/motion/MotionEngine";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { insightPath, relatedInsights } from "@/content/insights";
import { absoluteImage, getInsight, getInsights } from "@/lib/wordpress";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateStaticParams() {
  const articles = await getInsights();
  // Cache Components needs at least one entry; a placeholder simply prerenders the 404.
  return articles.length ? articles.map((a) => ({ slug: a.slug })) : [{ slug: "no-articles-yet" }];
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const article = await getInsight(slug);
  if (!article) notFound();
  const path = insightPath(article.slug);
  const base = pageMetadata({ title: article.title, description: article.description, path, type: "article", publishedTime: article.date });
  const image = { url: absoluteImage(article.cover.src), width: article.cover.width, height: article.cover.height, alt: article.cover.alt };
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
      modifiedTime: article.modified,
      authors: [article.author.name],
      section: article.category,
    },
    twitter: { ...base.twitter, images: [absoluteImage(article.cover.src)] },
  };
}

/**
 * Every known slug is prerendered by generateStaticParams. The params are read inside
 * <Suspense> so the route also has an instant static shell (Partial Prefetching) and
 * unknown slugs stream a 404 instead of blocking.
 */
export default function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <InsightArticle params={params} />
    </Suspense>
  );
}

async function InsightArticle({ params }: { params: PageProps<"/insights/[slug]">["params"] }) {
  const { slug } = await params;
  const all = await getInsights();
  const article = all.find((a) => a.slug === slug);
  if (!article) notFound();

  const path = insightPath(article.slug);
  const url = `${site.url}${path}`;
  const related = relatedInsights(all, article, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.description,
    image: [absoluteImage(article.cover.src)],
    datePublished: article.date,
    dateModified: article.modified,
    articleSection: article.category,
    timeRequired: `PT${article.readingMinutes}M`,
    inLanguage: "en",
    author: article.author.team
      ? { "@id": `${site.url}/#organization` }
      : { "@type": "Person", name: article.author.name, jobTitle: article.author.role, url: `${site.url}/about` },
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
            <Image src={article.cover.src} alt={article.cover.alt} width={article.cover.width} height={article.cover.height} sizes="(min-width: 1920px) 1620px, 92vw" loading="eager" fetchPriority="high" className={styles.coverImg} />
          </figure>
          <div className={styles.layout}>
            <div className={styles.stick}>
              <ArticleToc items={article.toc} />
            </div>
            <article id="article-body" className={styles.main} aria-labelledby="page-title">
              <ArticleBody html={article.html} />
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
