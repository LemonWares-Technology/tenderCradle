import { Footer } from "@/components/sections/footer";
import { ContactPageContent } from "@/components/pages/contact-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Tender Cradle",
  description: "Get in touch with Tender Cradle to enroll your child or learn more about our childcare services.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ContactPageContent />
      <Footer />
    </main>
  );
}
