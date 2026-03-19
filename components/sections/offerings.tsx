"use client";

import { motion } from "framer-motion";
import { Baby, Gamepad2, HeartHandshake, Users } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const programs = [
  {
    icon: Baby,
    title: "Childcare & After-School",
    description: "Reliable out-of-school care supporting working families with flexible schedules.",
    bg: "#BFDBFE",
    iconBg: "#DBEAFE",
    iconColor: "#1D4ED8",
    tag: "Ages 0–5",
    tagColor: "#1D4ED8",
  },
  {
    icon: Gamepad2,
    title: "Structured Play",
    description: "Creative activities that promote age-appropriate development and spark endless curiosity.",
    bg: "#FEF08A",
    iconBg: "#FEF9C3",
    iconColor: "#B45309",
    tag: "Daily",
    tagColor: "#B45309",
  },
  {
    icon: HeartHandshake,
    title: "Emotional Growth",
    description: "Social and value-based development promoting strong character formation.",
    bg: "#FECDD3",
    iconBg: "#FFE4E6",
    iconColor: "#BE123C",
    tag: "Ongoing",
    tagColor: "#BE123C",
  },
  {
    icon: Users,
    title: "Parent Partnership",
    description: "Support and guidance resources to help families raise confident children together.",
    bg: "#BBF7D0",
    iconBg: "#DCFCE7",
    iconColor: "#15803D",
    tag: "Monthly",
    tagColor: "#15803D",
  },
];

export const OfferingsSection = () => {
  return (
    <section id="offerings" className="relative w-full py-24 md:py-32 bg-[#DCFCE7] overflow-hidden">

      {/* Wavy top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180" aria-hidden="true">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 fill-[#FEF9C3]">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Wavy bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 fill-[#EDE9FE]">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-white border-2 border-[#16A34A]/30 px-5 py-2 rounded-full mb-6 shadow-sm"
          >
            <div className="w-2 h-2 rounded-full bg-[#16A34A]" />
            <span className="text-sm font-bold text-[#15803D] uppercase tracking-widest">Our Programs</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl md:text-6xl text-[#1A1045] tracking-tighter mb-4"
          >
            Comprehensive{" "}
            <span className="relative text-[#16A34A] inline-block">
              Care
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 10" fill="none">
                <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#BBF7D0" strokeWidth="4" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
            .
          </motion.h2>
          <p className="text-lg text-[#1A1045]/60 max-w-xl mx-auto font-serif italic">
            More than just supervision — we curate experiences that shape futures.
          </p>
        </div>

        {/* Card grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-[28px] p-6 flex flex-col gap-5 border-2 border-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer"
              style={{ backgroundColor: p.bg }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: p.iconBg }}
              >
                <p.icon className="w-6 h-6" style={{ color: p.iconColor }} />
              </div>

              {/* Tag */}
              <span
                className="inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/60"
                style={{ color: p.tagColor }}
              >
                {p.tag}
              </span>

              <h3 className="font-serif text-xl text-[#1A1045] font-bold leading-tight">{p.title}</h3>
              <p className="text-sm text-[#1A1045]/60 leading-relaxed flex-1">{p.description}</p>

              {/* Arrow */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center self-end mt-auto bg-white/60 group-hover:bg-white transition-colors"
              >
                <ArrowRight className="w-4 h-4" style={{ color: p.iconColor }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-14"
        >
          <Link
            href="/programs"
            className="inline-flex items-center gap-3 bg-[#16A34A] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#1A1045] transition-all duration-500 shadow-lg shadow-[#16A34A]/25"
          >
            View All Programs <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
