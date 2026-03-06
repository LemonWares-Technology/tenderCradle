"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const ContactPageContent = () => {
  return (
    <div className="bg-background selection:bg-foreground selection:text-background min-h-screen flex flex-col">
      {/* Refined Navigation */}
      <nav className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/5">
        <Link 
          href="/"
          className="inline-flex items-center gap-4 text-foreground hover:opacity-70 transition-opacity"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-foreground/20 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <span className="font-serif text-lg md:text-xl tracking-widest uppercase">Back to Home</span>
        </Link>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-40 pb-32">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left: Massive Typography Context */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <span className="inline-block text-primary text-sm font-bold uppercase tracking-widest mb-12">
                    03 — Connect
                  </span>
                </motion.div>

                <SplitText
                  text="Let's shape their future together."
                  className="font-serif text-5xl md:text-7xl lg:text-7xl leading-[0.9] text-foreground tracking-tighter mb-12"
                />

                <p className="text-xl md:text-2xl text-foreground/60 font-serif italic max-w-sm leading-relaxed mb-16">
                  Tender Cradle partners with parents and communities to raise confident, well-rounded children. Reach out anytime.
                </p>
              </div>

              {/* Direct Info */}
              <div className="space-y-8">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Location</h4>
                  <p className="text-xl font-serif text-foreground">Lagos, Nigeria</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Email</h4>
                  <a href="mailto:hello@tendercradle.com" className="text-xl font-serif text-foreground hover:text-primary transition-colors">hello@tendercradle.com</a>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Phone</h4>
                  <a href="tel:+2348000000000" className="text-xl font-serif text-foreground hover:text-primary transition-colors">+234 800 000 0000</a>
                </div>
              </div>
            </div>

            {/* Right: Editorial Form */}
            <div className="lg:col-span-7">
              <motion.form 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                onSubmit={(e) => e.preventDefault()}
                className="bg-card rounded-[40px] p-8 md:p-16 border border-border/50"
              >
                <div className="space-y-12">
                  
                  {/* Floating Label Inputs for Editorial Look */}
                  <div className="relative border-b border-foreground/20 focus-within:border-foreground transition-colors pb-4">
                    <label className="block text-xs font-bold uppercase tracking-widest text-foreground/40 mb-4">What is your name?</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe"
                      className="w-full bg-transparent text-2xl font-serif placeholder:text-foreground/20 focus:outline-none"
                    />
                  </div>

                  <div className="relative border-b border-foreground/20 focus-within:border-foreground transition-colors pb-4">
                    <label className="block text-xs font-bold uppercase tracking-widest text-foreground/40 mb-4">What is your email?</label>
                    <input 
                      type="email" 
                      placeholder="jane@example.com"
                      className="w-full bg-transparent text-2xl font-serif placeholder:text-foreground/20 focus:outline-none"
                    />
                  </div>

                  <div className="relative border-b border-foreground/20 focus-within:border-foreground transition-colors pb-4">
                    <label className="block text-xs font-bold uppercase tracking-widest text-foreground/40 mb-4">Program of Interest</label>
                    <select className="w-full bg-transparent text-2xl font-serif text-foreground focus:outline-none cursor-pointer appearance-none">
                      <option value="childcare">Childcare & After-School</option>
                      <option value="play">Structured Play & Creativity</option>
                      <option value="development">Emotional Development</option>
                      <option value="general">General Enquiry</option>
                    </select>
                  </div>

                  <div className="relative border-b border-foreground/20 focus-within:border-foreground transition-colors pb-4">
                    <label className="block text-xs font-bold uppercase tracking-widest text-foreground/40 mb-4">Tell us about your child...</label>
                    <textarea 
                      rows={4}
                      placeholder="We're moving to the area and looking for..."
                      className="w-full bg-transparent text-2xl font-serif placeholder:text-foreground/20 focus:outline-none resize-none pt-2"
                    />
                  </div>

                  <div className="pt-8">
                    <button 
                      type="submit"
                      className="group inline-flex items-center gap-6"
                    >
                      <span className="font-serif text-4xl md:text-5xl group-hover:text-primary transition-colors">Send Inquiry</span>
                      <div className="w-16 h-16 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-500 shrink-0">
                        <ArrowUpRight className="w-6 h-6" />
                      </div>
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
