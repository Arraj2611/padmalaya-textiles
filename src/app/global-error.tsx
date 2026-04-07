"use client";

import * as Sentry from "@sentry/nextjs";
import posthog from "posthog-js";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
    posthog.captureException(error);
  }, [error]);

  return (
    <html>
      <body
        style={{
          backgroundColor: "#F3F6F4",
          fontFamily: "sans-serif",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          color: "#14221e",
          gap: 16,
          margin: 0,
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>Something went wrong</h2>
        <p style={{ fontSize: 14, color: "#2d4a42", margin: 0 }}>
          The error has been reported. Please try again.
        </p>
        <button
          onClick={reset}
          style={{
            background: "#0d281f",
            color: "#fff",
            border: "none",
            padding: "12px 28px",
            borderRadius: 50,
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
