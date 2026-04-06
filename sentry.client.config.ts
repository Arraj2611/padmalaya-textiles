import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const isReal = dsn && !dsn.includes("placeholder");

if (isReal) {
  Sentry.init({
    dsn,
    // Replay 10% of sessions, 100% of sessions with errors
    integrations: [
      Sentry.replayIntegration(),
    ],
    tracesSampleRate: 0.2,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}
