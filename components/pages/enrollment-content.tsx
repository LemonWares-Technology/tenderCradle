"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Download, CheckCircle2, Sparkles } from "lucide-react";
import Image from "next/image";

const enrollmentSteps = [
  {
    title: "1. Virtual or In-Person Tour",
    description: "Experience the Tender Cradle environment first-hand. Meet our educators and see our safe, nurturing spaces in action.",
    image: "/images/hero-1.png",
    accent: "#1D4ED8",
    bg: "#DBEAFE",
  },
  {
    title: "2. Application & Assessment",
    description: "Submit your application form. We'll review your child's needs and schedule a brief meeting to ensure we're the perfect fit.",
    image: "/images/about-2.png",
    accent: "#BE185D",
    bg: "#FCE7F3",
  },
  {
    title: "3. Registration & Deposit",
    description: "Once accepted, complete the registration package and secure your child's spot with a placement deposit.",
    image: "/images/gallery-1.png",
    accent: "#B45309",
    bg: "#FEF9C3",
  },
  {
    title: "4. Welcome & Orientation",
    description: "Join our community! We'll provide a full orientation for both parents and child to ensure a smooth transition.",
    image: "/images/about-1.png",
    accent: "#15803D",
    bg: "#DCFCE7",
  },
];

const checklistItems = [
  "Completed Enrollment Form",
  "Child's Immunization Records",
  "Birth Certificate Copy",
  "Emergency Contact Information",
  "Medical/Allergy Assessments",
  "Parent/Guardian ID Photos",
];

export const EnrollmentPageContent = () => {
  return (
    <div className="bg-background text-foreground overflow-hidden">
      {/* Elegant navigation */}
      <nav className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-10 z-50 pointer-events-none">
        <Link 
          href="/"
          className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-[#1A1045]/5 pointer-events-auto hover:-translate-y-1 transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-[#FEF9C3] flex items-center justify-center group-hover:bg-[#FDE68A] transition-colors">
            <ArrowLeft className="w-4 h-4 text-[#B45309]" />
          </div>
          <span className="font-bold text-[#1A1045] uppercase tracking-widest text-xs">Back Home</span>
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-center pb-24 overflow-hidden pt-32 bg-[#FEF9C3]">
        {/* Soft Background Blobs */}
        <div className="absolute top-[20%] right-0 w-96 h-96 bg-[#FFFBEB] rounded-full opacity-60 pointer-events-none translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-[10%] left-[10%] w-72 h-72 bg-[#FDE68A] rounded-full opacity-40 pointer-events-none" />

        {/* Disney Butterfly */}
        <motion.div
          className="absolute top-[25%] left-[40%] w-24 h-24 pointer-events-none z-10 opacity-70 mix-blend-multiply hidden md:block"
          animate={{ y: [0, -15, 0], rotate: [-5, -10, -5] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <Image src="/images/disney-butterfly.png" alt="Magical butterfly" fill className="object-contain" />
        </motion.div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
              <div className="h-px w-16 bg-[#B45309]" />
              <span className="text-sm font-bold uppercase tracking-widest text-[#B45309]">Admissions</span>
            </motion.div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] leading-[0.9] text-[#1A1045] max-w-5xl tracking-tighter">
              Come <br />Grow <span className="text-[#D97706] relative inline-block">With
                 <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                    <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#FDE68A" strokeWidth="6" fill="none" strokeLinecap="round"/>
                  </svg>
              </span> <br />
              Us.
            </h1>
          </div>
        </div>
      </section>

      {/* Enrollment Process - Elegant Cards */}
      <section className="w-full py-32 bg-[#F8FAFC]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="font-serif text-4xl md:text-6xl tracking-tighter text-[#1A1045] mb-6">Our Process.</h2>
            </div>
            <p className="text-xl md:text-2xl text-[#1A1045]/60 font-serif italic max-w-xl leading-relaxed">
              A gentle, step-by-step path to joining the Tender Cradle family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {enrollmentSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group bg-white p-6 rounded-[40px] shadow-xl border border-[#1A1045]/5 hover:-translate-y-2 transition-all duration-300 relative"
              >
                <div className="relative aspect-[4/5] rounded-[30px] overflow-hidden mb-8 shadow-inner">
                  <Image 
                    src={step.image} 
                    alt={step.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                  />
                  {/* Elegant Number Badge */}
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center font-serif text-xl font-bold shadow-lg backdrop-blur-md" style={{ backgroundColor: step.bg, color: step.accent }}>
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-serif text-2xl mb-4 tracking-tighter text-[#1A1045] leading-tight px-2">{step.title.substring(3)}</h3>
                <p className="text-[#1A1045]/60 leading-relaxed font-serif italic px-2 pb-4">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist & Documentation */}
      <section className="w-full py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Elegant Checklist */}
            <div className="bg-[#F8FAFC] p-12 md:p-16 rounded-[40px] shadow-xl border border-[#1A1045]/5 relative">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8 bg-green-100">
                <CheckCircle2 className="w-4 h-4 text-green-700" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-800">Checklist</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tighter mb-12 text-[#1A1045]">Required Docs.</h2>
              <div className="grid gap-4">
                {checklistItems.map((item, index) => (
                  <motion.div 
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-6 py-4 border-b border-[#1A1045]/5"
                  >
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-[#1A1045]/5">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    </div>
                    <span className="text-lg md:text-xl font-serif text-[#1A1045]/80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Elegant Download Card */}
            <div className="bg-[#1A1045] p-12 md:p-16 rounded-[40px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6] rounded-full blur-[80px] opacity-20 pointer-events-none translate-x-1/2 -translate-y-1/2" />
              
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8 bg-white/10 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-[#60A5FA]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Resources</span>
              </div>
              
              <h3 className="font-serif text-4xl md:text-5xl tracking-tighter text-white mb-8">Parent Handbook.</h3>
              <p className="text-white/70 mb-12 text-xl font-serif italic leading-relaxed">
                Download our comprehensive guide covering our philosophy, daily schedules, safety protocols, and tuition details.
              </p>
              
              <button className="group inline-flex items-center gap-4 bg-white/10 hover:bg-white/20 text-white px-8 py-5 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 backdrop-blur-md border border-white/20">
                <span>Download PDF (2.4MB)</span>
                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 bg-[#F8FAFC]">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <Link href="/contact" className="group inline-flex flex-col items-center">
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8 bg-white shadow-sm border border-[#1A1045]/5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B45309]">Ready to Begin?</span>
            </span>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <span className="font-serif text-5xl md:text-7xl lg:text-[7rem] tracking-tighter text-[#1A1045] group-hover:text-[#B45309] transition-colors leading-[0.9]">
                Start<br/> App<span className="text-[#F59E0B]">lication</span>.
              </span>
              <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-[#1A1045] flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#B45309] transition-all duration-500 shrink-0">
                <ArrowRight className="w-10 h-10 md:w-12 md:h-12 text-white group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};
