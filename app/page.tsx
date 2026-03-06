import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { StatsSection } from "@/components/sections/stats";
// import { TeamSection } from "@/components/sections/team";
// import { PartnersSection } from "@/components/sections/partners";
import { OfferingsSection } from "@/components/sections/offerings";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { ShopPreviewSection } from "@/components/sections/shop-preview";
import { BlogPreviewSection } from "@/components/sections/blog-preview";
import { FAQSection } from "@/components/sections/faq";
import { CTABannerSection } from "@/components/sections/cta-banner";
import { NewsletterSection } from "@/components/sections/newsletter";
import { GallerySection } from "@/components/sections/gallery";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/sections/footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      {/* <TeamSection /> */}
      {/* <PartnersSection /> */}
      <OfferingsSection />
      <TestimonialsSection />
      <ShopPreviewSection />
      <BlogPreviewSection />
      <FAQSection />
      <GallerySection />
      <CTABannerSection />
      <NewsletterSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
