import sanitizeHtml from "sanitize-html";
import { headingId, insightPath, type TocItem } from "@/content/insights";
import { WORDPRESS_ORIGIN } from "./api";

const NAMED: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", hellip: "…", ndash: "–", mdash: "—", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”" };

/** Decodes the HTML entities WordPress puts in titles and excerpts ("&#8217;" → "’"). */
export function decodeEntities(text: string) {
  return text.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, code: string) => {
    if (code[0] !== "#") return NAMED[code.toLowerCase()] ?? m;
    const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
    return Number.isFinite(n) ? String.fromCodePoint(n) : m;
  });
}

/** Plain text from an HTML fragment, whitespace collapsed. */
export const htmlToText = (html: string) =>
  decodeEntities(sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }))
    .replace(/[​-‍﻿]/g, "")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Media URLs sometimes still point at the host the posts were written on (e.g. a temporary
 * hostingersite.com domain). Any /wp-content/uploads/ URL is moved to the live WordPress origin.
 */
const fixUploadUrl = (url: string) => url.replace(/^https?:\/\/[^/]+(?=\/wp-content\/uploads\/)/i, WORDPRESS_ORIGIN);

/** Links to a post on the WordPress site ("https://blogs…/my-post/") become "/insights/my-post". */
function localiseHref(href: string) {
  try {
    const url = new URL(href, WORDPRESS_ORIGIN);
    if (url.origin !== WORDPRESS_ORIGIN) return href;
    const slug = url.pathname.match(/^\/([a-z0-9-]+)\/?$/i)?.[1];
    return slug ? insightPath(slug) + url.hash : url.href;
  } catch {
    return href;
  }
}

const isExternal = (href: string) => /^https?:\/\//i.test(href);

const SANITIZE: sanitizeHtml.IOptions = {
  allowedTags: ["h2", "h3", "h4", "p", "a", "ul", "ol", "li", "strong", "b", "em", "i", "u", "s", "del", "mark", "sub", "sup", "small", "code", "pre", "kbd", "blockquote", "cite", "figure", "figcaption", "img", "br", "hr", "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption", "iframe"],
  allowedAttributes: {
    a: ["href", "title", "target", "rel"],
    img: ["src", "srcset", "sizes", "alt", "width", "height", "loading", "decoding"],
    ol: ["start", "reversed"],
    th: ["colspan", "rowspan", "scope"],
    td: ["colspan", "rowspan"],
    iframe: ["src", "title", "allow", "allowfullscreen", "loading", "width", "height"],
  },
  allowedSchemes: ["http", "https", "mailto", "tel"],
  allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com", "player.vimeo.com", "www.loom.com"],
  transformTags: {
    // The page already has the H1; demote any heading level that would compete with it.
    h1: "h2",
    h5: "h4",
    h6: "h4",
    a: (tagName, attribs) => {
      const href = attribs.href ? localiseHref(attribs.href) : undefined;
      const external = !!href && isExternal(href);
      return {
        tagName,
        attribs: {
          ...(href && { href }),
          ...(attribs.title && { title: attribs.title }),
          ...(external && { target: "_blank", rel: "noopener noreferrer" }),
        },
      };
    },
    img: (tagName, attribs) => ({
      tagName,
      attribs: {
        ...attribs,
        src: fixUploadUrl(attribs.src ?? ""),
        ...(attribs.srcset && { srcset: attribs.srcset.split(",").map((s) => fixUploadUrl(s.trim())).join(", ") }),
        // WordPress's "auto, …" sizes keyword only works with loading=lazy, which is always set here.
        loading: "lazy",
        decoding: "async",
        alt: attribs.alt ?? "",
      },
    }),
    iframe: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: "lazy" } }),
  },
  // Drops the empty spacer paragraphs page builders leave behind (often just a zero-width joiner).
  exclusiveFilter: (frame) => frame.tag === "p" && !frame.mediaChildren.length && !frame.text.replace(/[\s ​-‍﻿]/g, ""),
};

/**
 * Sanitizes a post's HTML and prepares it for the article layout:
 * headings get unique ids (bold wrappers removed), h2s feed the table of contents
 * (h3s are used when a post has fewer than two h2s).
 */
export function prepareArticleHtml(raw: string): { html: string; toc: TocItem[] } {
  const clean = sanitizeHtml(raw, SANITIZE);
  const used = new Map<string, number>();
  const headings: { level: string; id: string; text: string }[] = [];

  const html = clean.replace(/<(h[234])>([\s\S]*?)<\/\1>/g, (_, level: string, inner: string) => {
    const content = inner.replace(/<\/?(strong|b)>/g, "").trim();
    const text = htmlToText(content);
    if (!text) return "";
    const base = headingId(text);
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    const id = n ? `${base}-${n + 1}` : base;
    headings.push({ level, id, text });
    const extra = level === "h2" ? " data-toc-heading data-split" : "";
    return `<${level} id="${id}"${extra}>${content}</${level}>`;
  });

  const h2s = headings.filter((h) => h.level === "h2");
  const tocLevel = h2s.length >= 2 ? h2s : headings.filter((h) => h.level === "h3");
  return { html, toc: tocLevel.map(({ id, text }) => ({ id, text })) };
}
