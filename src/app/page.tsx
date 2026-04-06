import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProofStrip from "@/components/sections/ProofStrip";
import CollectionGrid from "@/components/sections/CollectionGrid";
import MillSection from "@/components/sections/MillSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ContactSection from "@/components/sections/ContactSection";
import { getProducts } from "@/lib/supabase";
import type { Product } from "@/lib/supabase-types";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Padmalaya Textiles",
  url: "https://padmalayatextiles.com",
  description: "Premium terry towel manufacturer in Solapur, India. OEKO-TEX certified, 25+ years of weaving excellence.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Solapur",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "exports@padmalayatextiles.com",
  },
};

export default async function Home() {
  const products: Product[] = await getProducts();

  return (
    <div
      style={{
        backgroundColor: "#F3F6F4",
        fontFamily: "var(--font-outfit), sans-serif",
        color: "#14221e",
        minHeight: "100vh",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Navbar />
      <main>
        <HeroSection />
        <ProofStrip />
        {/* Pass Supabase products; CollectionGrid falls back to static data when empty */}
        <CollectionGrid products={products} />
        <MillSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
