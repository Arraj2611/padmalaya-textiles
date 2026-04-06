import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { QuoteProvider } from "@/context/QuoteContext";
import QuoteIndicator from "@/components/ui/QuoteIndicator";
import PostHogProvider from "@/components/providers/PostHogProvider";

// ClerkProvider is conditionally rendered: if real keys are present it wraps the app,
// otherwise we fall back to rendering children directly so the site works without Clerk credentials.
const hasClerkKeys =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.includes("placeholder");

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Padmalaya Textiles — Premium Terry Towel Manufacturer",
  description:
    "Padmalaya Textiles is a leading terry towel manufacturer offering premium bath towels, hand towels, face towels, and spa wraps for hospitality and retail.",
};

async function WithClerk({ children }: { children: React.ReactNode }) {
  if (!hasClerkKeys) return <>{children}</>;
  const { ClerkProvider } = await import("@clerk/nextjs");
  return <ClerkProvider>{children}</ClerkProvider>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <WithClerk>
          <QuoteProvider>
            <PostHogProvider>
              {children}
              <QuoteIndicator />
            </PostHogProvider>
          </QuoteProvider>
        </WithClerk>
      </body>
    </html>
  );
}
