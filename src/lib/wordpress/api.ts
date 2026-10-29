/**
 * Minimal WordPress REST client (no caching here, so the proxy can use it too).
 *
 * Published posts are public, so no credentials are needed. If the REST API is ever locked
 * down, set WORDPRESS_USERNAME + WORDPRESS_APP_PASSWORD (a WordPress application password)
 * and requests are sent with Basic auth. Never commit these values.
 */

export const WORDPRESS_API_URL = (process.env.WORDPRESS_API_URL || "https://blogs.theactivesolutions.com/wp-json/wp/v2").replace(/\/+$/, "");

/** Origin of the WordPress site, e.g. "https://blogs.theactivesolutions.com". */
export const WORDPRESS_ORIGIN = new URL(WORDPRESS_API_URL).origin;

function headers(): HeadersInit {
  const user = process.env.WORDPRESS_USERNAME;
  const password = process.env.WORDPRESS_APP_PASSWORD;
  const h: Record<string, string> = { Accept: "application/json" };
  if (user && password) h.Authorization = `Basic ${btoa(`${user}:${password.replace(/\s+/g, "")}`)}`;
  return h;
}

/** GETs every page of a collection endpoint (e.g. "posts?_embed=1"). Throws on network/HTTP errors. */
export async function wpFetchAll<T>(path: string): Promise<T[]> {
  const items: T[] = [];
  const sep = path.includes("?") ? "&" : "?";
  for (let page = 1, pages = 1; page <= pages; page++) {
    const res = await fetch(`${WORDPRESS_API_URL}/${path}${sep}per_page=100&page=${page}`, {
      headers: headers(),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) throw new Error(`WordPress ${path} responded ${res.status}`);
    pages = Number(res.headers.get("x-wp-totalpages")) || 1;
    items.push(...((await res.json()) as T[]));
  }
  return items;
}

/** Slugs of all published posts (used by the proxy to send real 404s for unknown articles). */
export async function fetchPostSlugs() {
  const posts = await wpFetchAll<{ slug: string }>("posts?_fields=slug");
  return posts.map((p) => p.slug);
}
