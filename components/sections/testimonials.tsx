"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Tender Cradle changed our lives. My daughter actually runs to the door every morning — she loves it so much!",
    name: "Amara O.",
    role: "Parent of Zara, age 4",
    avatar: "A",
    rating: 5,
    bg: "#BFDBFE",
    avatarBg: "#1D4ED8",
  },
  {
    quote: "The staff genuinely care about every child. We've seen so much growth in confidence and social skills since joining.",
    name: "Emeka N.",
    role: "Parent of twins, age 3",
    avatar: "E",
    rating: 5,
    bg: "#FECDD3",
    avatarBg: "#DB2777",
  },
  {
    quote: "Safe, warm, and truly Montessori. I can go to work each day knowing my son is in the best possible hands.",
    name: "Chisom A.",
    role: "Parent of Tobenna, age 5",
    avatar: "C",
    rating: 5,
    bg: "#FEF08A",
    avatarBg: "#B45309",
  },
];

export const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const t = testimonials[current];

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="relative w-full py-24 md:py-32 bg-[#2563EB] overflow-hidden">

      {/* Wavy top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180" aria-hidden="true">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 fill-[#FFF1F2]">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Wavy bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 fill-[#F97316]">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Giant decorative quote */}
      <div className="absolute top-12 left-8 text-[180px] font-serif text-white/5 leading-none select-none pointer-events-none" aria-hidden="true">&ldquo;</div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-white/15 border border-white/20 px-5 py-2 rounded-full mb-6"
          >
            <span className="text-sm font-bold text-white uppercase tracking-widest">What Parents Say</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl md:text-6xl text-white tracking-tighter"
          >
            Trusted by{" "}
            <span className="relative inline-block">
              families
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 140 10" fill="none">
                <path d="M2 7 Q35 1 70 7 Q105 13 138 7" stroke="#FEF08A" strokeWidth="4" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
            .
          </motion.h2>
        </div>

        {/* Testimonial card */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="rounded-[40px] p-10 md:p-14 border-4 border-white/20 shadow-2xl"
              style={{ backgroundColor: t.bg }}
            >
              {/* Stars */}
              <div className="flex gap-1.5 mb-8">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>

              <blockquote className="font-serif text-2xl md:text-3xl text-[#1A1045] leading-[1.3] mb-10">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-serif text-xl font-bold shadow-lg"
                  style={{ backgroundColor: t.avatarBg }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-[#1A1045] text-lg">{t.name}</p>
                  <p className="text-sm text-[#1A1045]/55">{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#2563EB] transition-all duration-300"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${i === current ? "w-8 h-3 bg-[#FEF08A]" : "w-3 h-3 bg-white/30"}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-white text-[#2563EB] flex items-center justify-center hover:bg-[#FEF08A] hover:text-[#1A1045] transition-all duration-300"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
