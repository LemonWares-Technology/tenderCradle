import { Footer } from "@/components/sections/footer";
import { PrivacyPageContent } from "@/components/pages/privacy-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Tender Cradle",
  description: "Read the Privacy Policy of Tender Cradle to learn how we protect and manage your data.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <PrivacyPageContent />
      <Footer />
    </main>
  );
}
