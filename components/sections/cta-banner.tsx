"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const trustBadges = [
  "✓ Montessori-Certified Programme",
  "✓ NERDC Aligned Curriculum",
  "✓ Free Introductory Visit",
  "✓ Flexible Term Dates",
];

export const CTABannerSection = () => {
  return (
    <section className="w-full py-20 md:py-28 lg:py-36 bg-primary text-background overflow-hidden relative">
      {/* Watermark text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-serif text-[15vw] font-bold text-background/5 whitespace-nowrap leading-none tracking-tighter">
          Enroll Today
        </span>
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 lg:gap-16">

          {/* Left: headline */}
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-xs md:text-sm font-bold uppercase tracking-widest text-background/60 mb-6 md:mb-8"
            >
              Enrollment Open
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-tighter text-background"
            >
              Give your child the best start.
            </motion.h2>
          </div>

          {/* Right: buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-background text-foreground px-7 py-4 md:px-8 md:py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-foreground hover:text-background transition-all duration-500 group shadow-lg shadow-foreground/20"
            >
              Enroll Your Child
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="text-background/70 hover:text-background transition-colors text-sm font-bold uppercase tracking-widest flex items-center gap-2 px-2 py-4"
            >
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-14 md:mt-20 pt-8 border-t border-background/20 grid grid-cols-2 md:flex md:flex-wrap items-center gap-x-8 gap-y-3 text-background/50 text-xs md:text-sm font-sans"
        >
          {trustBadges.map((badge, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.08 }}
            >
              {badge}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
