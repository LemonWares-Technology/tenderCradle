"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const programs = [
  {
    title: "Childcare & After-School",
    description: "Reliable out-of-school care services supporting working families with flexible schedules.",
    image: "/images/hero-1.png",
  },
  {
    title: "Structured Play",
    description: "Creative activities that promote age-appropriate development and spark endless curiosity.",
    image: "/images/gallery-1.png",
  },
  {
    title: "Emotional Growth",
    description: "Social and value-based development support promoting strong character formation.",
    image: "/images/about-2.png",
  },
  {
    title: "Parent Partnership",
    description: "Support and guidance resources to help families raise confident children together.",
    image: "/images/about-1.png",
  },
];

export const OfferingsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);

  return (
    <section id="offerings" className="relative w-full min-h-screen bg-background text-foreground overflow-hidden py-32">
      
      {/* Dynamic Background Image based on hover state */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="wait">
          {hoveredIndex !== null && (
            <motion.div
              key={hoveredIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.15, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image 
                src={programs[hoveredIndex].image}
                alt="Program background"
                fill
                className="object-cover grayscale"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24">
          <SplitText 
            text="Comprehensive Care."
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter"
          />
          <p className="text-xl max-w-sm font-serif italic text-foreground/70">
            More than just supervision. We curate experiences that shape futures.
          </p>
        </div>

        {/* The Interactive List */}
        <div className="w-full border-t border-foreground/10">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              onHoverStart={() => setHoveredIndex(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group border-b border-foreground/10 py-10 md:py-16 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-8 hover:bg-foreground/2 transition-colors"
            >
              <div className="flex items-center gap-8 md:gap-16">
                <span className="font-serif text-2xl text-primary/50 group-hover:text-primary transition-colors">
                  0{index + 1}
                </span>
                <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground group-hover:translate-x-4 transition-transform duration-500">
                  {program.title}
                </h3>
              </div>
              
              <div className="flex items-center gap-8 md:gap-16 ml-14 md:ml-0">
                <p className="max-w-xs text-base md:text-lg text-foreground/60 group-hover:text-foreground transition-colors">
                  {program.description}
                </p>
                <div className="w-16 h-16 rounded-full border border-foreground/20 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-500 -rotate-45 group-hover:rotate-0">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
