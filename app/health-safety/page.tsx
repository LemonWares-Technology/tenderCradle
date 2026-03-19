import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/sections/footer";
import { HealthSafetyPageContent } from "@/components/pages/health-safety-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health & Safety — Tender Cradle",
  description: "Discover our rigorous health and safety protocols. From biometric security to HEPA air purification, your child's well-being is our foundation.",
};

export default function HealthSafetyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HealthSafetyPageContent />
      <Footer />
    </main>
  );
}
