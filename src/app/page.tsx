import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProofStrip from "@/components/sections/ProofStrip";
import CollectionGrid from "@/components/sections/CollectionGrid";
import MillSection from "@/components/sections/MillSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ContactSection from "@/components/sections/ContactSection";
import type { Product } from "@/lib/supabase-types";

async function getProducts(): Promise<Product[]> {
  // Only attempt Supabase fetch when env vars are present
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return [];

  try {
    const { createClient } = await import("@supabase/supabase-js");
    const client = createClient(url, key);
    const { data, error } = await client
      .from("products")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data) return [];
    return data as Product[];
  } catch {
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div
      className="silk-drift"
      style={{
        fontFamily: "var(--font-outfit), sans-serif",
        color: "#14221e",
        minHeight: "100vh",
      }}
    >
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
