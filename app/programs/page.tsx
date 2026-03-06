import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/sections/footer";
import { ProgramsPageContent } from "@/components/pages/programs-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Programs — Tender Cradle",
  description: "Explore Tender Cradle's comprehensive childcare programs including after-school care, structured play, and holistic child development.",
};

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ProgramsPageContent />
      <Footer />
    </main>
  );
}
