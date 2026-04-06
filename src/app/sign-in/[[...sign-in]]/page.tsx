import { SignIn } from "@clerk/nextjs";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SignInPage() {
  return (
    <div
      style={{
        backgroundColor: "#F3F6F4",
        fontFamily: "var(--font-outfit), sans-serif",
        color: "#14221e",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 24px",
        }}
      >
        <SignIn />
      </main>
      <Footer />
    </div>
  );
}
