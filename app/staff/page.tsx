import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/sections/footer";
import { StaffPageContent } from "@/components/pages/staff-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team — Tender Cradle",
  description: "Meet the dedicated educators and specialists at Tender Cradle. Our team is committed to providing premium childcare and early development.",
};

export default function StaffPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <StaffPageContent />
      <Footer />
    </main>
  );
}
