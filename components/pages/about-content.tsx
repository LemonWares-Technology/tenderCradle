"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

export const AboutPageContent = () => {
  return (
    <div className="bg-background selection:bg-foreground selection:text-background">
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
      <section className="relative w-full min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-block text-primary text-sm font-bold uppercase tracking-widest mb-12">
                01 — Philosophy
              </span>
            </motion.div>

            <SplitText
              text="A home-like environment where every child thrives."
              className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-foreground tracking-tighter mb-12"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-3xl text-foreground/60 font-serif italic max-w-3xl leading-relaxed"
            >
              Tender Cradle is a childcare and child-development initiative focused on providing safe, nurturing, and structured care for young children.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story Section - Large Image Mask */}
      <section className="w-full py-32 bg-foreground text-background rounded-t-[40px] md:rounded-t-[80px]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 relative aspect-3/4 md:aspect-4/5 rounded-[24px] overflow-hidden"
            >
              <Image src="/images/about-1.png" alt="Caregiver with children" fill className="object-cover" />
            </motion.div>

            <div className="lg:col-span-5 pt-8 lg:pt-32">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-12">Our Story.</h2>
              <div className="space-y-8 text-background/60 text-lg md:text-xl leading-relaxed">
                <p>
                  We are guided by the belief that children thrive best in environments where safety is assured and care is delivered with warmth, consistency, and intentional development.
                </p>
                <p>
                  Tender Cradle supports working families through thoughtfully designed childcare services, including after-school and out-of-school care programs, delivered within secure, well-supervised environments.
                </p>
                <p>
                  Our programs promote emotional wellbeing, character formation, creativity, and age-appropriate learning. Our care model goes beyond supervision to intentionally support each child&apos;s holistic growth.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
