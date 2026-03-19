"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ClipboardList, MessageSquare, UserCheck } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Fill the Form",
    text: "Complete our simple online application — takes less than 5 minutes.",
    number: "01",
    bg: "#BFDBFE",
    iconColor: "#1D4ED8",
    numColor: "#1D4ED8",
  },
  {
    icon: MessageSquare,
    title: "Meet & Greet",
    text: "Book a tour and meet our wonderful caregivers in person.",
    number: "02",
    bg: "#FEF08A",
    iconColor: "#B45309",
    numColor: "#B45309",
  },
  {
    icon: UserCheck,
    title: "You're In!",
    text: "Confirm your spot and we&apos;ll handle everything from here.",
    number: "03",
    bg: "#BBF7D0",
    iconColor: "#15803D",
    numColor: "#15803D",
  },
];

export const EnrollmentTeaser = () => {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#FFF1F2] text-[#1A1045] overflow-hidden">

      {/* Wavy top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180" aria-hidden="true">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 fill-[#2563EB]">
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
            className="inline-flex items-center gap-3 bg-[#FECDD3] border-2 border-[#F43F5E]/20 px-5 py-2 rounded-full mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-[#F43F5E]" />
            <span className="text-sm font-bold text-[#BE123C] uppercase tracking-widest">Join Our Family</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl md:text-6xl text-[#1A1045] tracking-tighter mb-4"
          >
            Enrolling is{" "}
            <span className="relative inline-block text-[#F43F5E]">
              easy
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 80 10" fill="none">
                <path d="M2 7 Q20 1 40 7 Q60 13 78 7" stroke="#FECDD3" strokeWidth="4" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
            !
          </motion.h2>
          <p className="text-lg text-[#1A1045]/60 max-w-md mx-auto font-serif italic">
            A seamless transition designed for your peace of mind.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 relative">

          {/* Dotted connector line */}
          <div className="hidden md:block absolute top-14 left-[20%] right-[20%] h-0.5 border-t-2 border-dashed border-[#F43F5E]/30 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center relative z-10"
            >
              {/* Number + icon circle */}
              <div
                className="relative w-28 h-28 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-xl"
                style={{ backgroundColor: step.bg }}
              >
                <step.icon className="w-10 h-10" style={{ color: step.iconColor }} />
                {/* Step number badge */}
                <div
                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center text-xs font-bold shadow-md"
                  style={{ color: step.numColor, borderColor: step.bg }}
                >
                  {step.number}
                </div>
              </div>

              <h3 className="font-serif text-2xl mb-3 font-bold text-[#1A1045]">{step.title}</h3>
              <p className="text-sm text-[#1A1045]/55 leading-relaxed max-w-xs"
                dangerouslySetInnerHTML={{ __html: step.text }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <Link
            href="/enrollment"
            className="group inline-flex items-center gap-4 bg-[#F43F5E] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#1A1045] transition-all duration-500 shadow-xl shadow-[#F43F5E]/25 hover:scale-105"
          >
            Start the Process
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
