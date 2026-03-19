"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import Link from "next/link";
import { ArrowLeft, FileText, Download, Bookmark, Calendar, Phone, Sparkles } from "lucide-react";

const resources = [
  {
    category: "Guides & Manuals",
    accent: "text-[#1D4ED8] bg-[#DBEAFE] border-[#BFDBFE]",
    items: [
      { name: "Parent Handbook 2026", size: "2.4MB", type: "PDF" },
      { name: "Educational Philosophy", size: "1.1MB", type: "PDF" },
    ],
  },
  {
    category: "Health & Safety",
    accent: "text-[#15803D] bg-[#DCFCE7] border-[#BBF7D0]",
    items: [
      { name: "Immunization Requirements", size: "800KB", type: "PDF" },
      { name: "Illness Policy Guide", size: "1.2MB", type: "PDF" },
      { name: "Emergency Response Plan", size: "1.5MB", type: "PDF" },
    ],
  },
  {
    category: "Forms & Registration",
    accent: "text-[#BE185D] bg-[#FCE7F3] border-[#FBCFE8]",
    items: [
      { name: "Change of Details Form", size: "400KB", type: "PDF" },
      { name: "Medication Authorization", size: "350KB", type: "PDF" },
      { name: "Vacation Notice Form", size: "300KB", type: "PDF" },
    ],
  },
];

export const ParentResourcesContent = () => {
  return (
    <div className="bg-[#F8FAFC] text-foreground pb-32 overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-10 z-50 pointer-events-none">
        <Link 
          href="/"
          className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-[#1A1045]/5 pointer-events-auto hover:-translate-y-1 transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-[#E0F2FE] flex items-center justify-center group-hover:bg-[#BAE6FD] transition-colors">
            <ArrowLeft className="w-4 h-4 text-[#0284C7]" />
          </div>
          <span className="font-bold text-[#1A1045] uppercase tracking-widest text-xs hidden sm:inline-block">Back to Home</span>
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative w-full min-h-[50vh] flex items-center pb-16 overflow-hidden pt-40 bg-white">
        <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-[#E0F2FE] rounded-full opacity-40 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[0%] left-[5%] w-[400px] h-[400px] bg-[#FEF9C3] rounded-full opacity-40 blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center items-center gap-4 mb-8">
             <div className="h-px w-16 bg-[#0284C7]" />
             <span className="text-sm font-bold uppercase tracking-widest text-[#0284C7]">Parent Resources</span>
             <div className="h-px w-16 bg-[#0284C7]" />
          </motion.div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-[8rem] leading-[0.9] text-[#1A1045] max-w-5xl mx-auto tracking-tighter mb-6 relative">
             Everything you <br className="hidden md:block" />
             need, <span className="text-[#3B82F6] relative inline-block">all in one
               <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                  <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#BAE6FD" strokeWidth="6" fill="none" strokeLinecap="round"/>
                </svg>
             </span> place.
          </h1>
        </div>
      </section>

      {/* Resource Sections */}
      <section className="w-full py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-3 gap-16 lg:gap-12">
            {resources.map((section, idx) => (
              <motion.div
                key={section.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 md:p-10 rounded-[40px] shadow-xl border border-[#1A1045]/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-10 pb-6 border-b border-[#1A1045]/10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${section.accent}`}>
                    <Bookmark className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl tracking-tighter text-[#1A1045]">{section.category}</h3>
                </div>
                
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <div 
                      key={item.name}
                      className="group p-5 rounded-3xl border border-[#1A1045]/5 bg-[#F8FAFC] hover:bg-[#1A1045] hover:text-white transition-all duration-500 cursor-pointer shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-[#1A1045] border border-[#1A1045]/5 group-hover:border-white/20 transition-all">
                             <FileText className="w-4 h-4 text-[#1A1045]/40 group-hover:text-white" />
                          </div>
                          <div>
                            <p className="font-serif font-bold mb-1 text-[#1A1045] group-hover:text-white text-lg transition-colors">{item.name}</p>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-[#1A1045]/40 group-hover:text-white/60 transition-colors">{item.size} • {item.type}</span>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-[#1A1045]/10 flex items-center justify-center shrink-0 group-hover:border-transparent group-hover:bg-[#3B82F6] transition-all duration-500">
                           <Download className="w-4 h-4 text-[#1A1045]/40 group-hover:text-white group-hover:rotate-12 transition-all duration-500" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/events" className="p-8 md:p-10 bg-[#FEF9C3] border border-[#FDE68A] text-[#B45309] rounded-[40px] shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                 <Calendar className="w-6 h-6 text-[#B45309]" />
              </div>
              <h4 className="font-serif text-3xl tracking-tighter mb-4 text-[#B45309]">School <br />Calendar</h4>
              <p className="text-sm text-[#B45309]/80 font-serif italic leading-relaxed">Term dates, holidays, and special events for 2026.</p>
            </Link>
            
            <Link href="/contact" className="p-8 md:p-10 bg-[#DCFCE7] border border-[#BBF7D0] text-[#15803D] rounded-[40px] shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                 <Phone className="w-6 h-6 text-[#15803D]" />
              </div>
              <h4 className="font-serif text-3xl tracking-tighter mb-4 text-[#15803D]">Quick <br />Contact</h4>
              <p className="text-sm text-[#15803D]/80 font-serif italic leading-relaxed">Direct line to the Head Teacher and reception.</p>
            </Link>

            <div className="p-10 bg-gradient-to-br from-[#1A1045] to-[#31226E] rounded-[40px] shadow-xl lg:col-span-2 text-white relative flex flex-col justify-center overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#BE185D] rounded-full opacity-20 blur-[50px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
              <Sparkles className="w-8 h-8 text-[#FDE68A] mb-6" />
              <h4 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-8 italic drop-shadow-md">
                "Communication is at the heart of our community. We ensure parents are always informed, engaged, and supported."
              </h4>
              <div className="w-16 h-px bg-white/30 mb-6" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50 block">The Tender Cradle Admins</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParentResourcesContent;
