"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const programs = [
  {
    title: "Childcare & After-School Care",
    description: "Reliable childcare, after-school, and out-of-school care services supporting working families. We provide a safe, supervised environment where your child can learn and grow while you work with peace of mind.",
    image: "/images/hero-1.png",
  },
  {
    title: "Structured Play & Creativity",
    description: "Structured play, learning, and creative activities that promote age-appropriate development. From arts and crafts to music and movement, every activity is designed to spark joy and curiosity.",
    image: "/images/gallery-1.png",
  },
  {
    title: "Emotional & Social Development",
    description: "Emotional, social, and value-based development support that helps children build character, empathy, and strong interpersonal skills in a nurturing environment.",
    image: "/images/about-2.png",
  },
];

export const ProgramsPageContent = () => {
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
      <section className="relative w-full min-h-[70vh] flex items-end pb-24 overflow-hidden pt-40">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-primary text-sm font-bold uppercase tracking-widest mb-12">
              02 — Programs
            </span>
          </motion.div>

          <SplitText
            text="Curated experiences for early development."
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-foreground max-w-5xl tracking-tighter"
          />
        </div>
      </section>

      {/* Programs List - Editorial Style */}
      <section className="w-full">
        <div className="container mx-auto px-6 md:px-12">
          <div className="border-t border-foreground/10">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid lg:grid-cols-12 gap-8 lg:gap-16 py-16 md:py-24 border-b border-foreground/10"
              >
                {/* Index & Title */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <span className="font-serif text-3xl text-foreground/30 mb-8 lg:mb-0">
                    0{index + 1}
                  </span>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] pr-8">
                    {program.title}
                  </h2>
                </div>

                {/* Description & Image */}
                <div className="lg:col-span-7 flex flex-col gap-12">
                  <p className="text-xl md:text-2xl text-foreground/70 font-serif italic leading-relaxed">
                    {program.description}
                  </p>
                  <div className="relative w-full aspect-video rounded-[24px] overflow-hidden group">
                    <Image 
                      src={program.image} 
                      alt={program.title} 
                      fill 
                      className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 text-center">
            <Link 
              href="/contact"
              className="group inline-flex items-center gap-6"
            >
              <span className="font-serif text-5xl md:text-7xl group-hover:text-primary transition-colors">Apply Now</span>
              <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-500 shrink-0">
                <ArrowUpRight className="w-8 h-8 md:w-10 md:h-10" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
