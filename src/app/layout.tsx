import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { QuoteProvider } from "@/context/QuoteContext";
import QuoteIndicator from "@/components/ui/QuoteIndicator";

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
        <QuoteProvider>
          {children}
          <QuoteIndicator />
        </QuoteProvider>
      </body>
    </html>
  );
}
