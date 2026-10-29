import { NextResponse, type NextRequest } from "next/server";
import { insights } from "@/content/insights";
import { projects } from "@/content/work";

const SLUGS: Record<string, Set<string>> = {
  insights: new Set(insights.map((a) => a.slug)),
  "case-studies": new Set(projects.map((p) => p.slug)),
};

/**
 * With Cache Components, `dynamicParams = false` isn't available, so unknown article or
 * case-study slugs would render the not-found UI with a 200 status (a "soft 404"). Rewriting them
 * to a path that doesn't exist makes Next serve the 404 page with a real 404 status.
 */
export function proxy(request: NextRequest) {
  const [, section, slug] = request.nextUrl.pathname.split("/");
  const known = SLUGS[section];
  if (known && slug && !known.has(decodeURIComponent(slug))) {
    return NextResponse.rewrite(new URL("/__not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/insights/:slug", "/case-studies/:slug"],
};
