import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProofStrip from "@/components/sections/ProofStrip";
import CollectionGrid from "@/components/sections/CollectionGrid";
import MillSection from "@/components/sections/MillSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
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
        <CollectionGrid />
        <MillSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
