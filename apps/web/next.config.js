/** @type {import('next').NextConfig} */
let withSentryConfig;
try {
  /*
   * Make Sentry optional; avoid wrapping when DSN is not provided or package has issues.
   * This helps prevent runtime jsxDEV errors coming from the Sentry wrapper in certain envs.
   */
  withSentryConfig = require('@sentry/nextjs').withSentryConfig;
} catch (e) {
  withSentryConfig = (config) => config;
}

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_EMBED_URL: process.env.NEXT_PUBLIC_EMBED_URL,
    NEXT_PUBLIC_AMPLITUDE_ID: process.env.NEXT_PUBLIC_AMPLITUDE_ID,
    NEXT_PUBLIC_TAWK_PROPERTY_ID: process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID,
    NEXT_PUBLIC_TAWK_WIDGET_ID: process.env.NEXT_PUBLIC_TAWK_WIDGET_ID,
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID,
    NEXT_PUBLIC_ONBOARDING_TOKEN: process.env.NEXT_PUBLIC_ONBOARDING_TOKEN,
    NEXT_PUBLIC_PAYMENT_GATEWAY_URL: process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_COUPON_ENABLED: process.env.NEXT_PUBLIC_COUPON_ENABLED,
  },
  sentry: {
    hideSourceMaps: true,
  },
};

// Only enable Sentry wrapper if DSN is provided; otherwise export plain config
const useSentry = !!process.env.SENTRY_DSN;
module.exports = useSentry ? withSentryConfig(nextConfig) : nextConfig;
