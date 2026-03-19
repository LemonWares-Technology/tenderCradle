"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import Link from "next/link";
import { ArrowLeft, BookOpen, Music, Palette, Brain, Microscope, Globe, HeartPulse, Sparkles } from "lucide-react";
import Image from "next/image";

const ageGroups = [
  {
    age: "01 — Infants (3–18 Months)",
    title: "Nurturing Foundations.",
    description: "A sensory-rich environment focusing on emotional security and primary motor skills.",
    features: ["Sensory Stimulation", "Tummy Time & Exploration", "Language Immersion", "Personalized Sleep Routines"],
    image: "/images/about-1.png",
    bg: "#DBEAFE",
    accent: "#1D4ED8"
  },
  {
    age: "02 — Toddlers (18 Months – 3 Years)",
    title: "Curiosity & Discovery.",
    description: "Developing language, social interaction, and independence through structured play.",
    features: ["Language Development", "Social Interaction", "Fine Motor Skills", "Creative Expression"],
    image: "/images/gallery-1.png",
    bg: "#FEF9C3",
    accent: "#B45309"
  },
  {
    age: "03 — Preschool (3 – 5 Years)",
    title: "Readiness & Beyond.",
    description: "Complex problem-solving, early literacy, and preparing for the formal school transition.",
    features: ["Early Literacy & Math", "Scientific Enquiry", "Collaborative Projects", "Global Citizenship"],
    image: "/images/hero-2.png",
    bg: "#FCE7F3",
    accent: "#BE185D"
  },
];

const pillars = [
  { icon: Brain, title: "Cognitive", text: "Critical thinking and problem solving through hands-on materials.", color: "#1D4ED8", bg: "#DBEAFE" },
  { icon: HeartPulse, title: "Emotional", text: "Building self-regulation and empathy in a secure group setting.", color: "#BE185D", bg: "#FCE7F3" },
  { icon: Palette, title: "Creative", text: "Unleashing imagination via music, arts, and movement.", color: "#B45309", bg: "#FEF9C3" },
  { icon: Microscope, title: "Scientific", text: "Understanding the natural world through observation and play.", color: "#15803D", bg: "#DCFCE7" },
];

export const CurriculumPageContent = () => {
  return (
    <div className="bg-background text-foreground overflow-hidden">
      {/* Elegant navigation */}
      <nav className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-10 z-50 pointer-events-none">
        <Link 
          href="/"
          className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border-2 border-[#1A1045]/5 pointer-events-auto hover:-translate-y-1 transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-[#DCFCE7] flex items-center justify-center group-hover:bg-[#BBF7D0] transition-colors">
            <ArrowLeft className="w-4 h-4 text-[#16A34A]" />
          </div>
          <span className="font-bold text-[#1A1045] uppercase tracking-widest text-xs">Back Home</span>
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-center pb-24 overflow-hidden pt-32 bg-[#DCFCE7]">
        {/* Soft Background Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#BBF7D0] rounded-full opacity-60 pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-[20%] left-[10%] w-72 h-72 bg-[#DBEAFE] rounded-full opacity-60 pointer-events-none" />

        {/* Disney Character Area */}
        <motion.div
           className="absolute bottom-0 right-[15%] w-64 h-64 pointer-events-none z-10 opacity-90 hidden md:block"
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.4, duration: 1 }}
        >
          <div className="absolute inset-0 bg-white rounded-t-full shadow-2xl opacity-60 mix-blend-soft-light" />
          <Image src="/images/disney-child.png" alt="Happy child" fill className="object-cover object-top mix-blend-multiply drop-shadow-lg" />
        </motion.div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
            <div className="h-px w-16 bg-[#16A34A]" />
            <span className="text-sm font-bold uppercase tracking-widest text-[#15803D]">Our Curriculum</span>
          </motion.div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] leading-[0.9] text-[#1A1045] max-w-5xl tracking-tighter">
            Curious <br />
            <span className="text-[#16A34A] relative inline-block">Minds
               <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                  <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#BBF7D0" strokeWidth="6" fill="none" strokeLinecap="round"/>
                </svg>
            </span> <br />
            at Work.
          </h1>
        </div>
      </section>

      {/* Philosophy Pillars - Elegant Cards */}
      <section className="w-full py-32 bg-[#F8FAFC]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-6xl tracking-tighter text-[#1A1045]">Four Pillars.</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group bg-white p-10 rounded-[40px] shadow-xl hover:-translate-y-2 transition-all duration-300 border border-[#1A1045]/5"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-sm transition-transform group-hover:scale-110" style={{ backgroundColor: pillar.bg }}>
                  <pillar.icon className="w-8 h-8" style={{ color: pillar.color }} />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl mb-4 tracking-tighter text-[#1A1045]">{pillar.title}</h3>
                <p className="text-[#1A1045]/70 leading-relaxed font-serif italic">{pillar.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Groups - Elegant Journey */}
      <section className="w-full py-32 space-y-32 bg-white">
        {ageGroups.map((group, index) => (
          <div key={group.age} className="container mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`grid lg:grid-cols-12 gap-12 lg:gap-24 items-center ${index % 2 === 1 ? 'lg:rtl' : ''}`}
            >
              {/* Image */}
              <div className="lg:col-span-6 lg:ltr relative">
                 <div className="absolute -inset-4 rounded-[50px] opacity-20" style={{ backgroundColor: group.bg }} />
                 <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden group shadow-2xl border-4 border-white z-10">
                  <Image 
                    src={group.image} 
                    alt={group.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]" 
                  />
                </div>
                {/* Elegant Tag */}
                <div className="absolute -bottom-6 right-8 bg-white text-[#1A1045] px-6 py-3 rounded-full shadow-lg z-20 font-bold tracking-widest uppercase text-xs border border-[#1A1045]/5">
                  Ages {group.age.match(/\((.*?)\)/)?.[1]}
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-6 lg:ltr bg-white p-10 md:p-14 rounded-[50px] shadow-xl border border-[#1A1045]/5 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ backgroundColor: group.bg }}>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: group.accent }}>
                    Step 0{index + 1}
                  </span>
                </div>
                
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tighter text-[#1A1045] mb-8 leading-[1.05]">{group.title}</h2>
                <p className="text-lg md:text-xl text-[#1A1045]/70 font-serif italic mb-12 leading-relaxed">
                  {group.description}
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {group.features.map(feature => (
                    <div key={feature} className="flex items-center gap-4 bg-[#F8FAFC] p-4 rounded-2xl border border-[#1A1045]/5 transition-colors hover:border-[#1A1045]/10">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: group.accent }} />
                      <span className="text-xs uppercase tracking-widest font-bold text-[#1A1045]/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </section>

      {/* Global Mindset Section - Elegant Dark */}
      <section className="py-40 bg-[#1A1045] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1E1450] rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
        
        {/* Soft Wavy Top */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180" aria-hidden="true">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 fill-white">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" />
          </svg>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 grid lg:grid-cols-2 gap-24 items-center pt-16">
          <div>
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="h-px w-16 bg-[#FBCFE8]" />
              <span className="text-sm font-bold uppercase tracking-widest text-[#FBCFE8]">Global Vision</span>
            </div>
            
            <h2 className="font-serif text-5xl md:text-7xl tracking-tighter mb-12 leading-[0.95]">Nurturing Citizens <br />of the World.</h2>
            <p className="text-xl md:text-2xl text-white/70 font-serif italic mb-16 leading-relaxed">
              Our curriculum blends vibrant local culture with premier early learning standards. Rooted at home, ready for anywhere.
            </p>
            <div className="flex flex-wrap gap-8 md:gap-16 bg-white/5 p-10 rounded-[40px] border border-white/10 backdrop-blur-md">
              <div>
                <span className="text-5xl lg:text-6xl font-serif text-[#FDE68A] block mb-2 tracking-tighter">12:1</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">Student-Teacher Ratio</span>
              </div>
              <div className="w-px h-16 bg-white/10 hidden md:block self-center" />
              <div>
                <span className="text-5xl lg:text-6xl font-serif text-[#BBF7D0] block mb-2 tracking-tighter">3+</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-white/60">Languages Introduced</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 relative">
            <div className="grid gap-8">
              <div className="aspect-[4/5] bg-white border-4 border-white/10 rounded-[40px] shadow-2xl overflow-hidden relative">
                 <Image src="/images/gallery-2.png" fill className="object-cover" alt="Global citizen" />
              </div>
              <div className="aspect-square bg-white/5 border border-white/10 rounded-[40px] p-8 flex items-center justify-center text-center text-5xl group hover:bg-white/10 transition-colors">🌎</div>
            </div>
            <div className="grid gap-8 mt-16">
              <div className="aspect-square bg-white/5 border border-white/10 rounded-[40px] p-8 flex items-center justify-center text-center text-5xl group hover:bg-white/10 transition-colors">✨</div>
              <div className="aspect-[4/5] bg-white border-4 border-white/10 rounded-[40px] shadow-2xl overflow-hidden relative">
                 <Image src="/images/hero-1.png" fill className="object-cover" alt="Learning" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
