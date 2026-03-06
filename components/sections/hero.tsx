"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import Image from "next/image";

export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Track scroll progress through this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax and Scale transforms
  const yTextTop = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const yTextBottom = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[150vh] bg-background selection:bg-foreground selection:text-background"
    >
      {/* Sticky Container holds the view while we scroll through the 150vh */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        
        {/* Massive Typography - Top Half */}
        <motion.div 
          style={{ y: yTextTop, opacity: opacityText }}
          className="absolute top-0 left-0 w-full h-1/2 flex items-end justify-center pb-4 z-20 pointer-events-none"
        >
          <SplitText 
            text="TENDER" 
            className="font-serif text-[18vw] leading-[0.8] tracking-tighter text-foreground"
          />
        </motion.div>

        {/* Central Image Mask */}
        <div className="relative z-10 w-full max-w-[400px] md:max-w-[500px] aspect-3/4 rounded-[200px] overflow-hidden shadow-2xl">
          <motion.div 
            style={{ scale: scaleImage }}
            className="w-full h-full"
          >
            <Image 
              src="/images/hero-1.png"
              alt="Nurturing childcare environment"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-foreground/10 mix-blend-overlay pointer-events-none" />
        </div>

        {/* Massive Typography - Bottom Half */}
        <motion.div 
          style={{ y: yTextBottom, opacity: opacityText }}
          className="absolute bottom-0 left-0 w-full h-1/2 flex items-start justify-center pt-4 z-20 pointer-events-none"
        >
          <SplitText 
            text="CRADLE" 
            className="font-serif text-[18vw] leading-[0.8] tracking-tighter text-foreground"
          />
        </motion.div>

        {/* Floating details - left */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-6 md:left-12 max-w-[200px] hidden md:block"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-foreground/50 mb-2">
            Since 2026
          </p>
          <p className="text-base text-foreground/80 font-serif italic">
            Childcare that truly cares. Safe, nurturing, and structured care for young children.
          </p>
        </motion.div>

        {/* Floating scroll indicator - right */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 right-6 md:right-12 hidden md:flex flex-col items-center gap-4"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-foreground rotate-90 origin-right translate-x-3">
            Scroll
          </span>
          <div className="w-px h-16 bg-foreground/20 overflow-hidden relative">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-full bg-foreground"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
