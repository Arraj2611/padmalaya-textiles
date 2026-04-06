/**
 * Safe PostHog capture helper.
 * No-ops when PostHog is not initialised (placeholder key, SSR, or not yet loaded).
 */
export function capture(event: string, properties?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    // posthog-js attaches itself to window.__ph__ after init; check via the module
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ph = (window as any).__posthog_instance__;
    if (ph && typeof ph.capture === "function") {
      ph.capture(event, properties);
    }
  } catch {
    // swallow — analytics must never break the app
  }
}
