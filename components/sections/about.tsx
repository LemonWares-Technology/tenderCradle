"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, Shield, Smile } from "lucide-react";

const features = [
  { icon: Heart,   label: "Warm & Loving",       bg: "#FECDD3", color: "#BE123C" },
  { icon: Star,    label: "Child-Led Learning",   bg: "#FEF08A", color: "#B45309" },
  { icon: Shield,  label: "Safe Environment",     bg: "#BBF7D0", color: "#15803D" },
  { icon: Smile,   label: "Happy & Thriving",     bg: "#BFDBFE", color: "#1D4ED8" },
];

// Decorative dot grid
const dots = Array.from({ length: 30 });

export const AboutSection = () => {
  return (
    <section id="about" className="relative w-full py-24 md:py-32 bg-[#FEF9C3] overflow-hidden">

      {/* Polka dot background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {dots.map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#F59E0B]/15"
            style={{
              width: i % 3 === 0 ? 18 : 10,
              height: i % 3 === 0 ? 18 : 10,
              left: `${(i * 37) % 100}%`,
              top: `${(i * 23 + 10) % 100}%`,
            }}
          />
        ))}
      </div>

      {/* Wavy top border from hero */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180" aria-hidden="true">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 fill-[#DBEAFE]">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Image with fun frame */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Offset color block behind image */}
            <div className="absolute -top-4 -left-4 w-full h-full rounded-[40px] bg-[#FDE68A] z-0" />
            <div className="relative rounded-[40px] overflow-hidden border-4 border-white shadow-2xl z-10 aspect-4/5">
              <Image
                src="/images/about-1.png"
                alt="Caregiver with children"
                fill
                className="object-cover"
              />
            </div>

            {/* Floating badge — top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 12 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 12 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
              className="absolute -top-6 -right-4 bg-[#7C3AED] text-white px-5 py-3 rounded-2xl shadow-xl z-20 border-2 border-white/30"
            >
              <p className="text-2xl font-bold leading-none">12+</p>
              <p className="text-[10px] uppercase tracking-widest text-white/70 mt-0.5">Years of Care</p>
            </motion.div>

            {/* Floating badge — bottom left */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -8 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.8 }}
              className="absolute -bottom-5 -left-4 bg-[#F97316] text-white px-5 py-3 rounded-2xl shadow-xl z-20 border-2 border-white/30"
            >
              <p className="text-2xl font-bold leading-none">450+</p>
              <p className="text-[10px] uppercase tracking-widest text-white/70 mt-0.5">Happy Families</p>
            </motion.div>
          </motion.div>

          {/* Right: Text + features */}
          <div>
            {/* Section badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 bg-[#FDE68A] border-2 border-[#F59E0B] px-5 py-2 rounded-full mb-8 shadow-sm"
            >
              <div className="w-2 h-2 rounded-full bg-[#D97706]" />
              <span className="text-sm font-bold text-[#92400E] uppercase tracking-widest">Our Philosophy</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-[#1A1045] mb-6"
            >
              A sanctuary for{" "}
              <span className="relative inline-block text-[#D97706]">
                early years
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 180 10" fill="none">
                  <path d="M2 7 Q45 1 90 7 Q135 13 178 7" stroke="#FDE68A" strokeWidth="4" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
              .
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-[#1A1045]/65 leading-relaxed mb-10 max-w-lg"
            >
              Tender Cradle goes beyond supervision to intentionally support each child&apos;s holistic growth. We believe children thrive in environments where safety is assured and care is delivered with pure warmth.
            </motion.p>

            {/* Feature pills grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {features.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i + 0.3 }}
                  className="flex items-center gap-3 p-4 rounded-2xl border-2 border-white shadow-sm"
                  style={{ backgroundColor: f.bg }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-white/50">
                    <f.icon className="w-5 h-5" style={{ color: f.color }} />
                  </div>
                  <span className="text-sm font-bold" style={{ color: f.color }}>{f.label}</span>
                </motion.div>
              ))}
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-4 bg-[#1A1045] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#D97706] transition-all duration-500 shadow-lg"
            >
              Read the Full Story
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};
