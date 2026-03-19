import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/sections/footer";
import { CurriculumPageContent } from "@/components/pages/curriculum-content";
import { Metadata } from "metadata";

export const metadata: Metadata = {
  title: "Our Curriculum — Tender Cradle",
  description: "Explore Tender Cradle's holistic curriculum designed for infants, toddlers, and preschoolers. Nurturing global citizens through sensory discovery and scientific enquiry.",
};

export default function CurriculumPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <CurriculumPageContent />
      <Footer />
    </main>
  );
}
