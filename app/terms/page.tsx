import { Footer } from "@/components/sections/footer";
import { TermsPageContent } from "@/components/pages/terms-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Tender Cradle",
  description: "Read the Terms of Service for Tender Cradle childcare programs.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <TermsPageContent />
      <Footer />
    </main>
  );
}
