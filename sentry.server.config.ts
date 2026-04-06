import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const isReal = dsn && !dsn.includes("placeholder");

if (isReal) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0.2,
  });
}
