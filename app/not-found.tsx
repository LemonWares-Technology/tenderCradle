import { Footer } from "@/components/sections/footer";
import { NotFoundContent } from "@/components/pages/not-found-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Not Found — Tender Cradle",
  description: "The page you are looking for does not exist.",
};

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <div className="flex-1 flex flex-col">
        <NotFoundContent />
      </div>
      <Footer />
    </main>
  );
}
