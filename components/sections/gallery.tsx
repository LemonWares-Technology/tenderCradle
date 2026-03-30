
import { motion } from "framer-motion";

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
    <section id="gallery" className="relative w-full py-24 md:py-40 bg-[#F5F3FF] overflow-hidden">
      
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-60 translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 md:px-12 mb-16 md:mb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-16 bg-[#7C3AED]" />
            <span className="text-sm font-bold uppercase tracking-widest text-[#7C3AED]">Gallery</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter text-[#1A1045] mb-6">
            Scenes of{" "}
            <span className="relative inline-block text-[#7C3AED]">
              Joy
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#DDD6FE" strokeWidth="8" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
            .
          </h2>
          <p className="text-xl text-[#1A1045]/60 font-serif italic max-w-lg">
            A peek into the magical world where our little ones play, learn, and grow every day.
          </p>
        </motion.div>
      </div>

      {/* Marquee row 1 — tilted scrapbook style */}
      <div className="relative w-full flex overflow-hidden mb-8 md:mb-12">
        <motion.div
          className="flex gap-6 md:gap-10 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
        >
          {[...marqueeImages, ...marqueeImages].map((src, index) => (
            <div
              key={`row1-${src}-${index}`}
              className={`relative w-[70vw] sm:w-[50vw] md:w-[35vw] lg:w-[25vw] aspect-4/3 rounded-[32px] overflow-hidden shrink-0 group border-8 border-white shadow-xl
                ${index % 2 === 0 ? "rotate-2" : "-rotate-2"} hover:rotate-0 hover:scale-105 transition-all duration-500`}
            >
              <img 
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Marquee row 2 — reversed and smaller tiles */}
      <div className="relative w-full flex overflow-hidden py-4">
        <motion.div
          className="flex gap-6 md:gap-10 px-4"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 50 }}
        >
          {[...[...marqueeImages].reverse(), ...[...marqueeImages].reverse()].map((src, index) => (
            <div
              key={`row2-${src}-${index}`}
              className={`relative w-[50vw] sm:w-[40vw] md:w-[30vw] lg:w-[20vw] aspect-square rounded-[32px] overflow-hidden shrink-0 group border-8 border-white shadow-xl
                ${index % 2 === 0 ? "-rotate-3" : "rotate-3"} hover:rotate-0 hover:scale-105 transition-all duration-500`}
            >
              <img 
                src={src}
                alt={`Gallery image ${index + 1}`}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
