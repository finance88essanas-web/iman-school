import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const config: NextConfig = {
  // Stray lockfiles exist in parent folders; anchor tracing to this app.
  outputFileTracingRoot: process.cwd(),
  // This machine runs chronically low on disk; webpack's pack cache alone
  // can exceed the free space and abort builds with ENOSPC.
  webpack: (webpackConfig) => {
    webpackConfig.cache = false;
    return webpackConfig;
  },
  images: {
    // Sanity image CDN + premium placeholder source (dev only — replaced by real photography)
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(config);
