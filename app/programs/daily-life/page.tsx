import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/sections/footer";
import { DailyLifePageContent } from "@/components/pages/daily-life-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Life — Tender Cradle",
  description: "Explore the daily rhythm and organic nutrition at Tender Cradle. From morning yoga to fresh communal dining, see how we shape your child's day.",
};

export default function DailyLifePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <DailyLifePageContent />
      <Footer />
    </main>
  );
}
