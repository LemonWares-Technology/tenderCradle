"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const team = [
  {
    name: "Amaka Osei-Bonsu",
    role: "Lead Montessori Guide",
    bio: "Certified by the Association Montessori Internationale with 9 years of practice. Amaka's calm approach transforms even the most hesitant child into a confident learner.",
    initials: "AO",
    accent: "bg-[hsl(220,70%,92%)] text-[hsl(220,55%,35%)]",
  },
  {
    name: "Dr. Emeka Nwosu",
    role: "Paediatric Development Consultant",
    bio: "A developmental paediatrician with a doctorate from the University of Lagos. He advises the Tender Cradle curriculum and conducts quarterly developmental screenings.",
    initials: "EN",
    accent: "bg-[hsl(150,55%,88%)] text-[hsl(150,55%,25%)]",
  },
  {
    name: "Chioma Adeyemi",
    role: "Early Childhood Education Specialist",
    bio: "With a master's in Early Childhood Education from the University of Ibadan, Chioma leads our curriculum design and parent education workshops.",
    initials: "CA",
    accent: "bg-[hsl(35,90%,90%)] text-[hsl(35,60%,30%)]",
  },
  {
    name: "Babatunde Fashola",
    role: "Operations & Family Relations",
    bio: "Babatunde ensures that every family interaction with Tender Cradle is smooth, warm, and memorable — from first enquiry to end-of-term collection.",
    initials: "BF",
    accent: "bg-[hsl(300,35%,90%)] text-[hsl(300,40%,30%)]",
  },
];

export const TeamSection = () => {
  return (
    <section className="w-full py-24 md:py-32 bg-background text-foreground border-t border-foreground/10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-px w-16 bg-primary" />
              <span className="text-sm font-bold uppercase tracking-widest text-primary">The People</span>
            </motion.div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter">
              Meet the team.
            </h2>
          </div>
          <Link
            href="/about"
            className="group hidden md:inline-flex items-center gap-4 pb-4 border-b border-foreground/20 hover:border-foreground transition-colors shrink-0"
          >
            <span className="text-xl font-serif italic text-foreground/80 group-hover:text-foreground transition-colors">About Tender Cradle</span>
            <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col group"
            >
              {/* Avatar */}
              <div className={`w-full aspect-3/4 rounded-[24px] mb-6 flex items-center justify-center relative overflow-hidden ${member.accent} transition-transform duration-700 group-hover:scale-[1.02]`}>
                <span className="font-serif text-7xl md:text-8xl font-bold opacity-30 select-none">
                  {member.initials}
                </span>
                {/* Decorative circle */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full border-[3px] border-current opacity-10" />
                <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full border-2 border-current opacity-10" />
              </div>

              {/* Info */}
              <h3 className="font-serif text-xl md:text-2xl leading-tight mb-1">{member.name}</h3>
              <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">{member.role}</p>
              <p className="text-sm text-foreground/50 leading-relaxed font-light">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
