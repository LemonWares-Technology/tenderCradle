"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const marqueeImages = [
  "/images/hero-1.png",
  "/images/gallery-1.png",
  "/images/about-2.png",
  "/images/hero-2.png",
  "/images/gallery-2.png",
  "/images/about-1.png",
];

export const GallerySection = () => {
  return (
    <section id="gallery" className="w-full py-24 md:py-40 bg-background overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-16 md:mb-24 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-16 bg-primary" />
            <span className="text-sm font-bold uppercase tracking-widest text-primary">Gallery</span>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter text-foreground">
            Scenes of Joy.
          </h2>
        </motion.div>
      </div>

      {/* Marquee row 1 — left to right */}
      <div className="relative w-full flex overflow-hidden mb-4 md:mb-6">
        <motion.div
          className="flex gap-4 md:gap-6 px-2 md:px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 38 }}
        >
          {[...marqueeImages, ...marqueeImages].map((src, index) => (
            <div
              key={`row1-${src}-${index}`}
              className="relative w-[70vw] sm:w-[55vw] md:w-[40vw] lg:w-[30vw] aspect-4/3 rounded-[20px] md:rounded-[32px] overflow-hidden shrink-0 group"
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 640px) 70vw, (max-width: 768px) 55vw, (max-width: 1024px) 40vw, 30vw"
              />
              <div className="absolute inset-0 bg-foreground/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee row 2 — right to left (reversed) */}
      <div className="relative w-full flex overflow-hidden">
        <motion.div
          className="flex gap-4 md:gap-6 px-2 md:px-4"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
        >
          {[...[...marqueeImages].reverse(), ...[...marqueeImages].reverse()].map((src, index) => (
            <div
              key={`row2-${src}-${index}`}
              className="relative w-[50vw] sm:w-[38vw] md:w-[28vw] lg:w-[20vw] aspect-square rounded-[20px] md:rounded-[32px] overflow-hidden shrink-0 group"
            >
              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 38vw, (max-width: 1024px) 28vw, 20vw"
              />
              <div className="absolute inset-0 bg-foreground/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
