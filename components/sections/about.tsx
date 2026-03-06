"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import Image from "next/image";

export const AboutSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  // Track scroll over a 200vh section to allow sticky pinning
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Crossfade between two images as user scrolls through the sticky section
  const opacityImg1 = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 1, 0]);
  const opacityImg2 = useTransform(scrollYProgress, [0.4, 0.6, 1], [0, 1, 1]);
  const scaleImg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section 
      id="about" 
      ref={containerRef} 
      className="relative w-full h-[200vh] bg-background"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center">
        <div className="container mx-auto px-6 md:px-12 w-full">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            
            {/* Left: Sticky Typography */}
            <div className="lg:col-span-5 z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-12"
              >
                <div className="h-px w-16 bg-primary" />
                <span className="text-sm font-bold uppercase tracking-widest text-primary">Our Philosophy</span>
              </motion.div>

              <SplitText 
                text="A sanctuary for early years."
                className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground mb-8 text-balance"
              />

              <div className="space-y-6 text-xl text-foreground/70 font-serif italic max-w-lg mb-12 leading-relaxed">
                <p>
                  Tender Cradle goes beyond supervision to intentionally support each child&apos;s holistic growth.
                </p>
                <p>
                  We are guided by the belief that children thrive best in environments where safety is assured, and care is delivered with pure warmth.
                </p>
              </div>

              <motion.a
                href="/about"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="group relative inline-flex items-center gap-6 text-foreground font-bold tracking-widest uppercase text-sm"
              >
                <span>Read the full story</span>
                <span className="relative w-12 h-px bg-foreground/30 transition-all duration-300 group-hover:w-24 group-hover:bg-foreground">
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t border-r border-current rotate-45" />
                </span>
              </motion.a>
            </div>

            {/* Right: The Cinematic Mask */}
            <div className="lg:col-span-7 relative h-[40vh] md:h-[60vh] lg:h-[80vh] w-full mt-8 lg:mt-0 rounded-[40px] md:rounded-[80px] overflow-hidden">
              <motion.div 
                style={{ scale: scaleImg }}
                className="w-full h-full"
              >
                {/* Image 1 (Fades out) */}
                <motion.div 
                  style={{ opacity: opacityImg1 }} 
                  className="absolute inset-0"
                >
                  <Image 
                    src="/images/about-1.png"
                    alt="Caregiver reading"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/10 mix-blend-overlay" />
                </motion.div>

                {/* Image 2 (Fades in) */}
                <motion.div 
                  style={{ opacity: opacityImg2 }} 
                  className="absolute inset-0"
                >
                  <Image 
                    src="/images/about-2.png"
                    alt="Outdoor play"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/10 mix-blend-overlay" />
                </motion.div>
              </motion.div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};
