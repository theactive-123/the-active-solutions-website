import { revalidateTag } from "next/cache";
import { WORDPRESS_TAG } from "@/lib/wordpress";

/**
 * Refreshes the blog right after a WordPress change (otherwise it refreshes within 5 minutes).
 * Call POST /api/revalidate?secret=WORDPRESS_REVALIDATE_SECRET from a WordPress webhook
 * (e.g. the "WP Webhooks" plugin on post publish/update/delete).
 */
export async function POST(request: Request) {
  const secret = process.env.WORDPRESS_REVALIDATE_SECRET;
  const given = new URL(request.url).searchParams.get("secret") ?? request.headers.get("x-revalidate-secret");
  if (!secret || given !== secret) {
    return Response.json({ ok: false, error: "Invalid secret" }, { status: 401 });
  }
  revalidateTag(WORDPRESS_TAG, { expire: 0 });
  return Response.json({ ok: true, revalidated: WORDPRESS_TAG });
}
