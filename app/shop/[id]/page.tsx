import { Footer } from "@/components/sections/footer";
import { ProductPageContent } from "@/components/pages/product-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Details — Tender Cradle",
  description: "View details of our curated early years essentials.",
};

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // Await the Next.js 15 route promise
  const resolvedParams = await params;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <ProductPageContent productId={resolvedParams.id} />
      <Footer />
    </main>
  );
}
