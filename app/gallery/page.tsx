import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/sections/footer";
import { GalleryPageContent } from "@/components/pages/gallery-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facility Gallery — Tender Cradle",
  description: "Take a visual tour of Tender Cradle. Explore our safe, nurturing environments, from high-tech classrooms to our organic home garden.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <GalleryPageContent />
      <Footer />
    </main>
  );
}
