import { NextResponse, type NextRequest } from "next/server";
import { countries } from "@/content/locations";
import { projects } from "@/content/work";
import { fetchPostSlugs } from "@/lib/wordpress/api";

const caseStudies = new Set(projects.map((p) => p.slug));
const locations = new Set(countries.flatMap((c) => [c.slug, ...c.cities.map((city) => `${c.slug}/${city.slug}`)]));

/** Published WordPress slugs, refreshed at most once a minute when an unknown slug is requested. */
let posts = { slugs: new Set<string>(), fetchedAt: 0 };

async function isPublishedPost(slug: string) {
  if (posts.slugs.has(slug)) return true;
  if (Date.now() - posts.fetchedAt < 60_000) return false;
  try {
    posts = { slugs: new Set(await fetchPostSlugs()), fetchedAt: Date.now() };
    return posts.slugs.has(slug);
  } catch {
    return true; // WordPress unreachable: let the page decide.
  }
}

/**
 * With Cache Components, `dynamicParams = false` isn't available, so unknown article,
 * case-study or location slugs would render the not-found UI with a 200 status (a "soft 404"). Rewriting them
 * to a path that doesn't exist makes Next serve the 404 page with a real 404 status.
 */
export async function proxy(request: NextRequest) {
  const [, section, raw, rawCity] = request.nextUrl.pathname.split("/");
  if (!raw) return NextResponse.next();
  if (section === "locations") {
    const key = decodeURIComponent(rawCity ? `${raw}/${rawCity}` : raw);
    return locations.has(key) ? NextResponse.next() : NextResponse.rewrite(new URL("/__not-found", request.url));
  }
  const slug = decodeURIComponent(raw);
  const known = section === "case-studies" ? caseStudies.has(slug) : await isPublishedPost(slug);
  return known ? NextResponse.next() : NextResponse.rewrite(new URL("/__not-found", request.url));
}

export const config = {
  matcher: ["/insights/:slug", "/case-studies/:slug", "/locations/:country", "/locations/:country/:city"],
};
