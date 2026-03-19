"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, MapPin, Mail, Phone, Sparkles } from "lucide-react";
import Image from "next/image";

export const ContactPageContent = () => {
  return (
    <div className="bg-[#F8FAFC] text-foreground min-h-screen flex flex-col overflow-hidden">
      {/* Elegant navigation */}
      <nav className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-10 z-50 pointer-events-none">
        <Link 
          href="/"
          className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-[#1A1045]/5 pointer-events-auto hover:-translate-y-1 transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-[#FCE7F3] flex items-center justify-center group-hover:bg-[#FBCFE8] transition-colors">
            <ArrowLeft className="w-4 h-4 text-[#BE185D]" />
          </div>
          <span className="font-bold text-[#1A1045] uppercase tracking-widest text-xs hidden sm:inline-block">Return Home</span>
        </Link>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-32 pb-32 relative">
        
        {/* Soft Background Environments */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FCE7F3] rounded-full opacity-40 blur-[100px] pointer-events-none -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#DBEAFE] rounded-full opacity-40 blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

        {/* Disney Character Area - floating butterfly */}
        <motion.div
           className="absolute top-[20%] left-[5%] w-24 h-24 pointer-events-none z-10 opacity-70 mix-blend-multiply hidden md:block"
           animate={{ y: [0, -15, 0], rotate: [-5, 10, -5] }}
           transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        >
          <Image src="/images/disney-butterfly.png" alt="Magical butterfly" fill className="object-contain" />
        </motion.div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center mt-12">
            
            {/* Left: Elegant Typography Context */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
                  <div className="h-px w-16 bg-[#BE185D]" />
                  <span className="text-sm font-bold uppercase tracking-widest text-[#BE185D]">Connect With Us</span>
                </motion.div>

                <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] text-[#1A1045] tracking-tighter mb-8">
                  Say <span className="text-[#BE185D] relative inline-block">Hello
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                      <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#FCE7F3" strokeWidth="6" fill="none" strokeLinecap="round"/>
                    </svg>
                  </span>!
                </h1>

                <p className="text-xl md:text-2xl text-[#1A1045]/70 font-serif italic max-w-md leading-relaxed mb-16">
                  Tender Cradle partners with parents to raise confident, well-rounded children. Reach out anytime to schedule a visit or ask a question.
                </p>
              </div>

              {/* Direct Info - Clean Cards */}
              <div className="space-y-4">
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-[#1A1045]/5 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow group">
                  <div className="w-14 h-14 bg-[#FEF9C3] rounded-2xl flex items-center justify-center shadow-inner text-[#B45309] group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/50 mb-1">Our Location</h4>
                    <p className="text-lg font-serif text-[#1A1045]">Lagos, Nigeria</p>
                  </div>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-[#1A1045]/5 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow group">
                  <div className="w-14 h-14 bg-[#DCFCE7] rounded-2xl flex items-center justify-center shadow-inner text-[#15803D] group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/50 mb-1">Send an Email</h4>
                    <a href="mailto:hello@tendercradle.com" className="text-lg font-serif text-[#1A1045] hover:text-[#15803D] transition-colors">hello@tender.com</a>
                  </div>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-[#1A1045]/5 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow group">
                  <div className="w-14 h-14 bg-[#DBEAFE] rounded-2xl flex items-center justify-center shadow-inner text-[#1D4ED8] group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/50 mb-1">Give Us A Call</h4>
                    <a href="tel:+2348000000000" className="text-lg font-serif text-[#1A1045] hover:text-[#1D4ED8] transition-colors">+234 800 000 0000</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Elegant Form */}
            <div className="lg:col-span-7 mt-12 lg:mt-0">
              <motion.form 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                onSubmit={(e) => e.preventDefault()}
                className="bg-white rounded-[40px] p-8 md:p-14 border border-[#1A1045]/5 shadow-2xl relative"
              >
                <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-[#FCE7F3] flex items-center justify-center shadow-inner">
                  <Sparkles className="text-[#BE185D] w-5 h-5" />
                </div>

                <div className="space-y-8">
                  
                  {/* Clean Inputs */}
                  <div className="group relative">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2 ml-2">What's your name?</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe"
                      className="w-full bg-[#F8FAFC] text-xl font-serif text-[#1A1045] placeholder:text-[#1A1045]/30 focus:outline-none rounded-2xl py-4 px-6 border border-[#1A1045]/10 focus:border-[#3B82F6] focus:bg-white transition-all shadow-sm"
                    />
                  </div>

                  <div className="group relative">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2 ml-2">Your email address</label>
                    <input 
                      type="email" 
                      placeholder="jane@example.com"
                      className="w-full bg-[#F8FAFC] text-xl font-serif text-[#1A1045] placeholder:text-[#1A1045]/30 focus:outline-none rounded-2xl py-4 px-6 border border-[#1A1045]/10 focus:border-[#BE185D] focus:bg-white transition-all shadow-sm"
                    />
                  </div>

                  <div className="group relative">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2 ml-2">What are you looking for?</label>
                    <div className="relative">
                      <select className="w-full bg-[#F8FAFC] text-lg font-serif text-[#1A1045] focus:outline-none cursor-pointer appearance-none rounded-2xl py-4 px-6 border border-[#1A1045]/10 focus:border-[#B45309] focus:bg-white transition-all shadow-sm">
                        <option value="childcare">Childcare Options</option>
                        <option value="play">Creative Play</option>
                        <option value="development">Emotional Growth</option>
                        <option value="general">Just Saying Hi!</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ArrowLeft className="w-5 h-5 opacity-40 -rotate-90" />
                      </div>
                    </div>
                  </div>

                  <div className="group relative">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2 ml-2">Tell us the details...</label>
                    <textarea 
                      rows={4}
                      placeholder="We love finger painting and..."
                      className="w-full bg-[#F8FAFC] text-lg font-serif italic text-[#1A1045] placeholder:text-[#1A1045]/30 focus:outline-none resize-none py-4 px-6 rounded-2xl border border-[#1A1045]/10 focus:border-[#15803D] focus:bg-white transition-all shadow-sm"
                    />
                  </div>

                  <div className="pt-6">
                    <button 
                      type="submit"
                      className="group relative w-full flex items-center justify-center gap-4 bg-[#1A1045] hover:bg-[#BE185D] text-white px-8 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all duration-300 shadow-xl"
                    >
                      <span>Send Message</span>
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>

                </div>
              </motion.form>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};
