import { cacheLife, cacheTag } from "next/cache";
import type { Insight, InsightAuthor } from "@/content/insights";
import { site } from "@/lib/site";
import { wpFetchAll } from "./api";
import { decodeEntities, htmlToText, prepareArticleHtml } from "./html";

/** Cache tag for everything fetched from WordPress (see /api/revalidate). */
export const WORDPRESS_TAG = "wordpress";

type WpTerm = { id: number; name: string; slug: string; taxonomy: string };
type WpPost = {
  slug: string;
  date: string;
  modified: string;
  sticky: boolean;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  categories: number[];
  yoast_head_json?: { og_description?: string; description?: string };
  _embedded?: {
    author?: { name?: string; description?: string }[];
    "wp:featuredmedia"?: { source_url?: string; alt_text?: string; media_details?: { width?: number; height?: number } }[];
    "wp:term"?: WpTerm[][];
  };
};

/** Shown when a post has no featured image. */
const FALLBACK_COVER = { src: "/images/insights/cover-fallback.jpg", width: 1600, height: 1000, alt: "" };

/** Team members get their photo and role when their name is set as the WordPress display name. */
const TEAM: Record<string, Omit<InsightAuthor, "name">> = {
  "mirza abbas": { role: "CEO, The Active Solutions", photo: "/images/team/mirza-abbas.png" },
  "shahzaib ali": { role: "Co-Founder & Creative Director", photo: "/images/team/shahzaib-ali.png" },
  "m arsalan": { role: "The Active Solutions", photo: "/images/team/m-arsalan.png" },
  "oubaid ahmed": { role: "The Active Solutions", photo: "/images/team/oubaid-ahmed.png" },
};

/** Login-style names ("admin") are not shown publicly; the article is credited to the team. */
const GENERIC_AUTHORS = new Set(["", "admin", "administrator", "editor", "wordpress"]);

function mapAuthor(raw?: { name?: string; description?: string }): InsightAuthor {
  const name = decodeEntities(raw?.name ?? "").trim();
  if (GENERIC_AUTHORS.has(name.toLowerCase())) return { name: `${site.name} team`, role: "Shopify experts", team: true };
  const member = TEAM[name.toLowerCase().replace(/[^a-z ]/g, "").replace(/\s+/g, " ")];
  return { name, role: member?.role ?? (raw?.description ? htmlToText(raw.description) : site.name), photo: member?.photo };
}

/**
 * WordPress titles have no accent markup, so the hero accents the last real word
 * (skipping years and short words): "Add GSAP Animations to your Webflow Project (2025)"
 * → "… Webflow *Project* (2025)".
 */
function accentTitle(title: string) {
  const words = title.replace(/\*/g, "").split(" ");
  for (let i = words.length - 1; i >= 0; i--) {
    const m = words[i].match(/^([^\p{L}]*)(\p{L}[\p{L}\p{N}'’-]*\p{L})([^\p{L}]*)$/u);
    if (m && m[2].length > 2) {
      words[i] = `${m[1]}*${m[2]}*${m[3]}`;
      return words.join(" ");
    }
  }
  return title;
}

const clip = (text: string, max: number) => (text.length <= max ? text : `${text.slice(0, text.lastIndexOf(" ", max - 1))}…`);

function mapPost(post: WpPost, categoryNames: Map<number, string>): Insight {
  const title = htmlToText(post.title.rendered);
  const excerpt = htmlToText(post.excerpt.rendered).replace(/\s*\[(…|&hellip;|\.\.\.)\]\s*$/, "…");
  const categories = post.categories.map((id) => categoryNames.get(id)).filter((c): c is string => !!c);
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const { html, toc } = prepareArticleHtml(post.content.rendered);
  const words = htmlToText(html).split(" ").filter(Boolean).length;
  const seo = post.yoast_head_json?.description || post.yoast_head_json?.og_description;

  return {
    slug: post.slug,
    title,
    heroTitle: accentTitle(title),
    excerpt: clip(excerpt, 220),
    description: clip(htmlToText(seo || excerpt), 160),
    category: categories[0] ?? "Insights",
    categories,
    date: post.date.slice(0, 10),
    modified: post.modified.slice(0, 10),
    author: mapAuthor(post._embedded?.author?.[0]),
    cover:
      media?.source_url && media.media_details?.width && media.media_details.height
        ? { src: media.source_url, width: media.media_details.width, height: media.media_details.height, alt: htmlToText(media.alt_text ?? "") }
        : FALLBACK_COVER,
    featured: post.sticky,
    html,
    toc,
    readingMinutes: Math.max(1, Math.round(words / 220)),
  };
}

/**
 * All published articles, newest first. Cached and refreshed in the background every
 * 5 minutes; /api/revalidate refreshes them immediately after a WordPress edit.
 * If WordPress cannot be reached, an empty list is cached briefly so the site still renders.
 */
export async function getInsights(): Promise<Insight[]> {
  "use cache";
  cacheTag(WORDPRESS_TAG);
  try {
    const [posts, categories] = await Promise.all([
      wpFetchAll<WpPost>("posts?_embed=author,wp:featuredmedia&orderby=date&order=desc"),
      wpFetchAll<WpTerm>("categories?hide_empty=true&_fields=id,name,slug"),
    ]);
    cacheLife({ stale: 300, revalidate: 300, expire: 86_400 });
    const names = new Map(categories.filter((c) => c.slug !== "uncategorized").map((c) => [c.id, decodeEntities(c.name)]));
    return posts.map((p) => mapPost(p, names));
  } catch (error) {
    console.error("[wordpress] Could not load posts:", error);
    cacheLife({ stale: 60, revalidate: 60, expire: 300 });
    return [];
  }
}

export async function getInsight(slug: string) {
  const all = await getInsights();
  return all.find((a) => a.slug === slug);
}

/** Categories that have at least one article, most used first. */
export function insightCategories(articles: Insight[]) {
  const counts = new Map<string, number>();
  for (const a of articles) for (const c of a.categories) counts.set(c, (counts.get(c) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([name]) => name);
}

/** Absolute URL for an image that may be a local path or a WordPress URL. */
export const absoluteImage = (src: string) => (src.startsWith("/") ? `${site.url}${src}` : src);
