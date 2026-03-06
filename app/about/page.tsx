import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/sections/footer";
import { AboutPageContent } from "@/components/pages/about-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Tender Cradle",
  description: "Learn about Tender Cradle's mission to provide safe, nurturing, and structured childcare for young children.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <AboutPageContent />
      <Footer />
    </main>
  );
}
