import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/sections/footer";
import { EnrollmentPageContent } from "@/components/pages/enrollment-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enrollment & Admissions — Tender Cradle",
  description: "Join the Tender Cradle family. Learn about our simple 4-step enrollment process and required documentation.",
};

export default function EnrollmentPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <EnrollmentPageContent />
      <Footer />
    </main>
  );
}
