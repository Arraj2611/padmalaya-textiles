"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "";
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com";

const isReal = key && !key.includes("placeholder");

if (isReal && typeof window !== "undefined") {
  posthog.init(key, {
    api_host: "/ingest",
    ui_host: host,
    defaults: "2026-01-30",
    capture_pageview: false, // captured manually in PostHogPageview
    capture_pageleave: true,
    capture_exceptions: true,
    debug: process.env.NODE_ENV === "development",
  });
  // Expose instance for the safe capture() helper
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__posthog_instance__ = posthog;
}

/** Captures a pageview on every route change — must be inside Suspense for useSearchParams */
function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isReal) return;
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  if (!isReal) return <>{children}</>;

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageview />
      </Suspense>
      {children}
    </PHProvider>
  );
}
