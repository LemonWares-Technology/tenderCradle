import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/sections/footer";
import { EventsPageContent } from "@/components/pages/events-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events — Tender Cradle",
  description: "Stay up to date with the Tender Cradle community. View our upcoming workshops, showcases, and celebrations.",
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <EventsPageContent />
      <Footer />
    </main>
  );
}
