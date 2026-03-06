import { Footer } from "@/components/sections/footer";
import { ShopPageContent } from "@/components/pages/shop-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Boutique — Tender Cradle",
  description: "Browse curated essentials, uniforms, and developmental tools from Tender Cradle.",
};

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <ShopPageContent />
      <Footer />
    </main>
  );
}
