// @ts-check

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const wordpressHost = new URL(process.env.WORDPRESS_API_URL || "https://blogs.theactivesolutions.com/wp-json/wp/v2").hostname;

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  experimental: {
    // Styles ship inside the HTML (<style>) instead of render-blocking <link> requests.
    // The site's CSS is small (~32 KB gzipped), so first visits paint sooner.
    inlineCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    // Featured images of WordPress posts (see src/lib/wordpress).
    remotePatterns: [{ protocol: "https", hostname: wordpressHost, pathname: "/wp-content/uploads/**" }],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
  // `npm run dev` uses Turbopack; this empty entry lets it start alongside the webpack hook below
  // (production builds run `next build --webpack`).
  turbopack: {},
  webpack(config, { isServer, dev }) {
    if (isServer && !dev) {
      // Avoid export resolution failures for next/og with Hostinger's SWC WASM fallback.
      config.optimization.concatenateModules = false;
    }
    return config;
  },
};

export default nextConfig;
