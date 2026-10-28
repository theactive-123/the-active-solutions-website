// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  webpack(config, { isServer, dev }) {
    if (isServer && !dev) {
      // Avoid export resolution failures for next/og with Hostinger's SWC WASM fallback.
      config.optimization.concatenateModules = false;
    }
    return config;
  },
};

export default nextConfig;
