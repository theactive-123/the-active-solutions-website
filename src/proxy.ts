import { NextResponse, type NextRequest } from "next/server";
import { insights } from "@/content/insights";

const SLUGS = new Set(insights.map((a) => a.slug));

/**
 * With Cache Components, `dynamicParams = false` isn't available, so unknown article
 * slugs would render the not-found UI with a 200 status (a "soft 404"). Rewriting them
 * to a path that doesn't exist makes Next serve the 404 page with a real 404 status.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !SLUGS.has(decodeURIComponent(slug))) {
    return NextResponse.rewrite(new URL("/__not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/insights/:slug",
};
