"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const PrivacyPageContent = () => {
  return (
    <div className="bg-background selection:bg-foreground selection:text-background pb-32">
      {/* Refined Navigation */}
      <nav className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/5">
        <Link 
          href="/"
          className="inline-flex items-center gap-4 text-foreground hover:opacity-70 transition-opacity"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-foreground/20 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <span className="font-serif text-lg md:text-xl tracking-widest uppercase">Back to Home</span>
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative w-full min-h-[50vh] flex items-end pb-16 overflow-hidden pt-40">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-primary text-sm font-bold uppercase tracking-widest mb-8">
              Legal
            </span>
          </motion.div>

          <SplitText
            text="Privacy Policy."
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-foreground max-w-4xl tracking-tighter"
          />
        </div>
      </section>

      {/* Content */}
      <section className="w-full">
        <div className="container mx-auto px-6 md:px-12">
          <div className="border-t border-foreground/10 pt-16 md:pt-24 max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="prose prose-lg md:prose-xl font-serif text-foreground/80"
            >
              <p className="text-xl md:text-2xl font-serif italic text-foreground mb-12 leading-relaxed">
                At Tender Cradle, we take your privacy and the security of your family’s information seriously. This policy outlines how we collect, use, and protect your data.
              </p>

              <h3 className="font-serif text-3xl font-bold text-foreground mt-12 mb-6">1. Information We Collect</h3>
              <p className="mb-6">
                We may collect personal information such as names, contact details, emergency contacts, and relevant medical information necessary for your child&apos;s enrollment and safety during our programs.
              </p>

              <h3 className="font-serif text-3xl font-bold text-foreground mt-12 mb-6">2. How We Use Your Information</h3>
              <p className="mb-6">
                The information we collect is used strictly to provide safe and structured care for your child, communicate with parents and guardians, and comply with childcare regulatory requirements.
              </p>

              <h3 className="font-serif text-3xl font-bold text-foreground mt-12 mb-6">3. Data Security</h3>
              <p className="mb-6">
                We implement robust security practices to protect your information against unauthorized access, alteration, disclosure, or destruction. Access is restricted to authorized personnel who need the information to perform their duties.
              </p>

              <h3 className="font-serif text-3xl font-bold text-foreground mt-12 mb-6">4. Contact Us</h3>
              <p>
                If you have any questions or concerns about this privacy policy or our data practices, please contact us at <a href="mailto:privacy@tendercradle.com" className="text-primary hover:underline">privacy@tendercradle.com</a>.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
