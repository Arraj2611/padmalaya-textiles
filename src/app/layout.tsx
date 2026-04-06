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
  title: {
    default: "Padmalaya Textiles — Premium Terry Towel Manufacturer | Solapur, India",
    template: "%s | Padmalaya Textiles",
  },
  description:
    "Premium terry towel manufacturer in Solapur, India. Bath towels, hand towels, face towels & spa wraps for hospitality, retail & export. OEKO-TEX certified, 25+ years.",
  keywords: [
    "terry towels", "bath towels", "hotel towels", "towel manufacturer",
    "Solapur", "India", "hospitality textiles", "OEKO-TEX", "cotton towels", "export",
  ],
  openGraph: {
    title: "Padmalaya Textiles — Premium Terry Towel Manufacturer",
    description:
      "Premium terry towels for hospitality & retail. Made in Solapur, India. 25+ years of weaving excellence.",
    url: "https://padmalayatextiles.com",
    siteName: "Padmalaya Textiles",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Padmalaya Textiles — Premium Terry Towels",
    description: "Premium terry towels for hospitality & retail from Solapur, India.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
