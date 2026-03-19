"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import Link from "next/link";
import { ArrowLeft, Mail, Linkedin, GraduationCap, Award } from "lucide-react";

const team = [
  {
    name: "Amaka Osei-Bonsu",
    role: "Lead Montessori Guide",
    bio: "Certified by the Association Montessori Internationale with 9 years of practice. Amaka's calm approach transforms even the most hesitant child into a confident learner.",
    initials: "AO",
    accent: "bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE]",
    education: "B.Ed. Early Childhood Education, AMI Certification",
    expertise: ["Montessori Philosophy", "Sensory Development", "Child Psychology"],
  },
  {
    name: "Dr. Emeka Nwosu",
    role: "Paediatric Development Consultant",
    bio: "A developmental paediatrician with a doctorate from the University of Lagos. He advises the Tender Cradle curriculum and conducts quarterly developmental screenings.",
    initials: "EN",
    accent: "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]",
    education: "MBBS, Ph.D. Paediatrics, University of Lagos",
    expertise: ["Neurodevelopment", "Growth Monitoring", "Nutrition Science"],
  },
  {
    name: "Chioma Adeyemi",
    role: "Early Childhood Education Specialist",
    bio: "With a master's in Early Childhood Education from the University of Ibadan, Chioma leads our curriculum design and parent education workshops.",
    initials: "CA",
    accent: "bg-[#FEF9C3] text-[#B45309] border-[#FDE68A]",
    education: "M.Ed. Early Childhood, University of Ibadan",
    expertise: ["Curriculum Design", "Literacy Development", "Parent Coaching"],
  },
  {
    name: "Babatunde Fashola",
    role: "Operations & Family Relations",
    bio: "Babatunde ensures that every family interaction with Tender Cradle is smooth, warm, and memorable — from first enquiry to end-of-term collection.",
    initials: "BF",
    accent: "bg-[#FCE7F3] text-[#BE185D] border-[#FBCFE8]",
    education: "B.Sc. Business Administration, Customer Experience Cert.",
    expertise: ["Family Relations", "Operations Management", "Health & Safety"],
  },
];

export const StaffPageContent = () => {
  return (
    <div className="bg-[#F8FAFC] text-foreground pb-32 overflow-hidden">
      {/* Elegant navigation */}
      <nav className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-10 z-50 pointer-events-none">
        <Link 
          href="/"
          className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-[#1A1045]/5 pointer-events-auto hover:-translate-y-1 transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-[#FEF9C3] flex items-center justify-center group-hover:bg-[#FDE68A] transition-colors">
            <ArrowLeft className="w-4 h-4 text-[#B45309]" />
          </div>
          <span className="font-bold text-[#1A1045] uppercase tracking-widest text-xs hidden sm:inline-block">Back Home</span>
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative w-full min-h-[50vh] flex items-center pb-24 overflow-hidden pt-40 bg-white">
        <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-[#FEF9C3] rounded-full opacity-60 pointer-events-none blur-3xl" />
        <div className="absolute bottom-[0%] left-[5%] w-72 h-72 bg-[#DBEAFE] rounded-full opacity-50 pointer-events-none blur-3xl" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center items-center gap-4 mb-8">
            <div className="h-px w-16 bg-[#B45309]" />
            <span className="text-sm font-bold uppercase tracking-widest text-[#B45309]">Our Superheroes</span>
            <div className="h-px w-16 bg-[#B45309]" />
          </motion.div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-[8rem] leading-[0.9] text-[#1A1045] max-w-5xl tracking-tighter mx-auto">
            The <span className="text-[#D97706] relative inline-block">Hearts
               <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                  <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#FDE68A" strokeWidth="6" fill="none" strokeLinecap="round"/>
                </svg>
            </span> <br />& Minds of us.
          </h1>
        </div>
      </section>

      {/* Staff Directory */}
      <section className="w-full py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid gap-24 md:gap-32">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center bg-white p-6 md:p-12 rounded-[50px] shadow-xl border border-[#1A1045]/5 hover:shadow-2xl transition-shadow duration-500"
              >
                {/* Avatar Column */}
                <div className={`lg:col-span-4 ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
                  <div className={`w-full aspect-square rounded-[40px] flex items-center justify-center relative overflow-hidden ${member.accent} shadow-inner border-2`}>
                    <span className="font-serif text-8xl md:text-[10rem] font-bold opacity-30 select-none">
                      {member.initials}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none mix-blend-overlay" />
                  </div>
                </div>

                {/* Content Column */}
                <div className="lg:col-span-8 flex flex-col justify-center">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-[#1A1045]/10 pb-8">
                    <div>
                      <h2 className="font-serif text-4xl md:text-5xl tracking-tighter text-[#1A1045] mb-4">{member.name}</h2>
                      <div className="inline-block px-4 py-2 bg-[#F8FAFC] rounded-full border border-[#1A1045]/10">
                        <p className="text-[#1A1045]/70 font-bold uppercase tracking-widest text-xs">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button className="w-12 h-12 rounded-full bg-white border border-[#1A1045]/10 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-[#1A1045]/60 hover:text-[#3B82F6]">
                        <Mail className="w-5 h-5" />
                      </button>
                      <button className="w-12 h-12 rounded-full bg-white border border-[#1A1045]/10 flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all text-[#1A1045]/60 hover:text-[#3B82F6]">
                        <Linkedin className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xl md:text-2xl text-[#1A1045]/80 font-serif italic leading-relaxed mb-10">
                    "{member.bio}"
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-[#F8FAFC] p-6 rounded-[30px] border border-[#1A1045]/5 flex items-start gap-4 transition-colors hover:bg-white hover:shadow-lg">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                        <GraduationCap className="w-5 h-5 text-[#1D4ED8]" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/50 mb-1">Education</h4>
                        <p className="font-serif text-lg text-[#1A1045]">{member.education}</p>
                      </div>
                    </div>

                    <div className="bg-[#F8FAFC] p-6 rounded-[30px] border border-[#1A1045]/5 flex items-start gap-4 transition-colors hover:bg-white hover:shadow-lg">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
                        <Award className="w-5 h-5 text-[#B45309]" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/50 mb-2">Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.expertise.map(skill => (
                            <span key={skill} className="px-3 py-1 bg-white border border-[#1A1045]/5 shadow-sm rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/70">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Block */}
      <section className="py-40 bg-[#1A1045] text-white">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-5xl">
          <div className="w-24 h-px bg-[#FCE7F3] mx-auto mb-12 opacity-30" />
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.1] mb-12 italic">
            "We believe the <span className="text-[#60A5FA] font-bold">caregiver</span> is the bridge between the child's potential and their reality."
          </h2>
          <div className="w-24 h-px bg-[#FCE7F3] mx-auto mb-12 opacity-30" />
          <p className="text-white/60 font-bold uppercase tracking-[0.2em] text-sm">
            The Tender Cradle Ethos
          </p>
        </div>
      </section>
    </div>
  );
};
