import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const sentryEnabled = Boolean(dsn && !dsn.includes("placeholder"));

// Only wrap with Sentry when a real DSN is configured —
// avoids upload errors and warnings during local/CI builds with placeholder keys.
export default sentryEnabled
  ? withSentryConfig(nextConfig, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      silent: true,
    })
  : nextConfig;
