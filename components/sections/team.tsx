"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Heart, Star, Sparkles, Smile } from "lucide-react";
import Link from "next/link";

const team = [
  {
    name: "Amaka Osei-Bonsu",
    role: "Lead Montessori Guide",
    bio: "Certified by the Association Montessori Internationale with 9 years of practice. Amaka's calm approach transforms even the most hesitant child into a confident learner.",
    initials: "AO",
    bg: "#BFDBFE", // Blue
    color: "#1D4ED8",
    icon: Heart,
  },
  {
    name: "Dr. Emeka Nwosu",
    role: "Paediatric Development",
    bio: "A developmental paediatrician with a doctorate from the University of Lagos. He advises the Tender Cradle curriculum and conducts quarterly screenings.",
    initials: "EN",
    bg: "#BBF7D0", // Green
    color: "#15803D",
    icon: Smile,
  },
  {
    name: "Chioma Adeyemi",
    role: "Education Specialist",
    bio: "With a master's in Early Childhood Education from the University of Ibadan, Chioma leads our curriculum design and parent education workshops.",
    initials: "CA",
    bg: "#FEF08A", // Yellow
    color: "#B45309",
    icon: Star,
  },
  {
    name: "Babatunde Fashola",
    role: "Operations & Family",
    bio: "Babatunde ensures that every family interaction with Tender Cradle is smooth, warm, and memorable — from first enquiry to pick-up.",
    initials: "BF",
    bg: "#FECDD3", // Pink
    color: "#BE123C",
    icon: Sparkles,
  },
];

export const TeamSection = () => {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#F0FDF4] overflow-hidden">
      
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl opacity-60 -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-px w-16 bg-[#16A34A]" />
              <span className="text-sm font-bold uppercase tracking-widest text-[#16A34A]">The People</span>
            </motion.div>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tighter text-[#1A1045] mb-6">
              Meet the{" "}
              <span className="relative inline-block text-[#16A34A]">
                Team
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                  <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#BBF7D0" strokeWidth="8" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
              .
            </h2>
          </div>
          <Link
            href="/about"
            className="group flex items-center gap-4 py-4 px-8 bg-white border-2 border-[#16A34A]/20 rounded-full text-[#1A1045] font-bold uppercase tracking-widest text-xs hover:border-[#16A34A] transition-all duration-500 shadow-sm"
          >
            About Tender Cradle
            <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col group p-6 rounded-[40px] bg-white border-2 border-transparent hover:border-[#16A34A]/20 transition-all duration-500 shadow-xl hover:shadow-2xl"
            >
              {/* Avatar Box */}
              <div 
                className={`w-full aspect-square rounded-[32px] mb-8 flex items-center justify-center relative overflow-hidden group-hover:rotate-2 transition-transform duration-700`}
                style={{ backgroundColor: member.bg }}
              >
                <span className="font-serif text-7xl md:text-8xl font-bold select-none" style={{ color: member.color, opacity: 0.15 }}>
                  {member.initials}
                </span>
                
                {/* Dynamic Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <member.icon className="w-20 h-20 opacity-80" style={{ color: member.color }} />
                </div>

                {/* Decorative sparkles bubble */}
                <div className="absolute top-4 right-4 bg-white/40 backdrop-blur-sm p-2 rounded-xl">
                  <Sparkles className="w-4 h-4" style={{ color: member.color }} />
                </div>
              </div>

              {/* Info */}
              <div className="text-center md:text-left">
                <h3 className="font-serif text-2xl leading-tight mb-2 text-[#1A1045]">{member.name}</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-4 inline-block px-3 py-1 rounded-full" style={{ backgroundColor: member.bg, color: member.color }}>{member.role}</p>
                <p className="text-sm text-[#1A1045]/60 leading-relaxed font-serif italic">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
