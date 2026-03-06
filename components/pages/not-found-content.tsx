"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import Image from "next/image";

export const NotFoundContent = () => {
  return (
    <div className="bg-background selection:bg-foreground selection:text-background flex-1 flex flex-col relative overflow-hidden">
      
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

      {/* Main 404 Content */}
      <div className="flex-1 flex items-center justify-center pt-32 pb-24 relative z-10 w-full min-h-[80vh]">
        <div className="container mx-auto px-6 md:px-12 flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[300px] md:max-w-[400px] aspect-square rounded-full overflow-hidden mb-12 shadow-2xl"
          >
            {/* Using a playful but elegant image for the 404 */}
            <Image 
              src="/images/gallery-2.png" 
              alt="Lost page indicator" 
              fill 
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-foreground/20 mix-blend-overlay" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-[150px] md:text-[200px] text-background opacity-80 leading-none mix-blend-overlay">
                404
              </span>
            </div>
          </motion.div>

          <SplitText
            text="Wandering off the path."
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-foreground tracking-tighter mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-foreground/60 font-serif italic max-w-xl leading-relaxed mb-12"
          >
            It seems the page you&apos;re looking for has moved, been softly misplaced, or simply no longer exists in our sanctuary.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Link 
              href="/"
              className="group inline-flex items-center gap-6"
            >
              <div className="w-16 h-16 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-500 shrink-0">
                <Home className="w-6 h-6" />
              </div>
              <span className="font-serif text-3xl md:text-4xl group-hover:text-primary transition-colors border-b border-transparent group-hover:border-primary pb-1">
                Return Home
              </span>
            </Link>
          </motion.div>

        </div>
      </div>
{/* Background Atmospheric Elements */}
      <div className="absolute top-1/4 -left-[20vw] w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-[20vw] w-[60vw] h-[60vw] bg-foreground/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};
