import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { TeamSection } from "@/components/sections/team";
import { PartnersSection } from "@/components/sections/partners";
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

// New Teaser Sections
import { CurriculumTeaser } from "@/components/sections/curriculum-teaser";
import { SafetyTeaser } from "@/components/sections/safety-teaser";
import { EnrollmentTeaser } from "@/components/sections/enrollment-teaser";
import { EventsTeaser } from "@/components/sections/events-teaser";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CurriculumTeaser />
      <OfferingsSection />
      
      <SafetyTeaser />
      <TeamSection />
      
      <EnrollmentTeaser />
      <TestimonialsSection />
      <PartnersSection />
      
      <EventsTeaser />
      <GallerySection />
      
      <ShopPreviewSection />
      <BlogPreviewSection />
      <FAQSection />
      <CTABannerSection />
      <NewsletterSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
