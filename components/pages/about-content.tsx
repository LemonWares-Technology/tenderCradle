
import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { TeamSection } from "@/components/sections/team";

export const AboutPageContent = () => {
  return (
    <div className="bg-background text-foreground overflow-hidden">

      {/* Hero */}
      <section className="relative w-full min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-[#F0FDF4]">
        {/* Soft Background Blobs */}
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#FEF9C3] rounded-full opacity-60 pointer-events-none" />
        <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-[#DCFCE7] rounded-full opacity-60 pointer-events-none" />

        {/* Disney Butterfly */}
        <motion.div
          className="absolute top-[20%] left-[45%] w-32 h-32 pointer-events-none z-10 opacity-70 mix-blend-multiply"
          animate={{ y: [0, -20, 0], rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <img src="/images/disney-butterfly.png" alt="Magical butterfly" className="object-contain" />
        </motion.div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-lg shadow-[#16A34A]/10 mb-8 border border-white"
            >
              <Sparkles className="w-4 h-4 text-[#16A34A]" />
              <span className="text-sm font-bold text-[#15803D] uppercase tracking-widest">Our Philosophy</span>
            </motion.div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] leading-[0.95] text-[#1A1045] mb-8 tracking-tighter">
              A Home <br />Where Little <span className="text-[#16A34A] relative inline-block">
                Stars
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                  <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#BBF7D0" strokeWidth="6" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
              <br />Thrive.
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl text-[#1A1045]/70 font-serif italic max-w-2xl leading-relaxed"
            >
              Tender Cradle is a childcare and child-development initiative focused on providing safe, nurturing, and structured care for young children.
            </motion.p>
          </div>

          {/* Disney Character Image Space */}
          <div className="flex-1 relative w-full aspect-square max-w-md mx-auto hidden lg:block">
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.5, duration: 1 }}
               className="relative w-full h-full"
            >
                <div className="absolute inset-0 bg-white rounded-full shadow-2xl shadow-[#16A34A]/20 opacity-80" />
                <img src="/images/disney-child.png" alt="Happy child playing" className="object-cover p-8 mix-blend-multiply rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative w-full py-32 bg-white overflow-hidden">
        {/* Soft Wavy Top */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180" aria-hidden="true">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 fill-[#F0FDF4]">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" />
          </svg>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-20 pt-16">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative aspect-[4/5] rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl border-4 border-[#1A1045]/5"
            >
              <img src="/images/about-1.png" alt="Caregiver with children" className="object-cover" />
            </motion.div>

            <div className="lg:col-span-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-16 bg-[#F59E0B]" />
                <span className="text-sm font-bold uppercase tracking-widest text-[#B45309]">Chapter One</span>
              </div>
              <h2 className="font-serif text-5xl md:text-7xl lg:text-7xl mb-10 tracking-tighter text-[#1A1045]">Our Story.</h2>
              <div className="space-y-8 text-[#1A1045]/70 text-lg md:text-xl font-serif italic leading-relaxed">
                <p>
                  We are guided by the belief that children thrive best in environments where safety is assured and care is delivered with warmth, consistency, and intentional development.
                </p>
                <p>
                  Tender Cradle supports working families through thoughtfully designed childcare services, including after-school and out-of-school care programs, delivered within secure, well-supervised environments.
                </p>
                <div className="p-8 bg-[#FEF9C3] rounded-[30px] shadow-sm border border-[#FDE68A]/50 mt-8">
                  <p className="font-medium text-[#B45309] not-italic">
                    Our programs promote emotional wellbeing, character formation, creativity, and age-appropriate learning. Our care model goes beyond supervision to intentionally support each child&apos;s holistic growth.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Team Section */}
      <TeamSection />
    </div>
  );
};
