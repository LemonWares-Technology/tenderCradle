"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";

export const Footer = () => {
  const lenis = useLenis();
  const pathname = usePathname();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const target = href.replace("/", "");
      lenis?.scrollTo(target, { offset: 0 });
    }
  };

  return (
    <footer id="contact" className="w-full bg-foreground text-background pt-32 pb-8 rounded-t-[40px] md:rounded-t-[80px] -mt-10 relative z-20">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Massive Exit CTA */}
        <div className="flex flex-col items-center justify-center text-center mb-32 group cursor-pointer relative">
          <Link href="/contact" className="absolute inset-0 z-10" aria-label="Let's talk" />
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <p className="font-serif italic text-xl md:text-2xl text-background/60 mb-6">
              Ready to shape their future?
            </p>
            
            <div className="flex items-center gap-4 md:gap-8">
              <h2 className="font-serif text-[11vw] md:text-[8vw] lg:text-[10vw] leading-[0.8] tracking-tighter whitespace-nowrap group-hover:text-primary transition-colors duration-500">
                LET&apos;S TALK
              </h2>
              <div className="w-16 h-16 md:w-32 md:h-32 rounded-full border-2 border-background/20 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 shrink-0 -rotate-45 group-hover:rotate-0">
                <ArrowUpRight className="w-8 h-8 md:w-16 md:h-16" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Refined Lower Footer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 border-t border-background/10 pt-12 pb-24">
          
          {/* Brand Col */}
          <div className="md:col-span-5 lg:col-span-6 pr-8">
            <div className="flex items-center gap-4 mb-6">
              <Logo className="w-10 h-10 text-primary" />
              <h3 className="font-serif text-3xl md:text-4xl font-bold">Tender Cradle.</h3>
            </div>
            <p className="text-background/60 text-lg md:text-xl font-serif italic max-w-sm leading-relaxed mb-8">
              A sanctuary for early years. Childcare that truly cares.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'LinkedIn', 'Twitter'].map(social => (
                <a key={social} href="#" className="text-sm font-bold tracking-widest uppercase text-background/40 hover:text-background transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Nav Col */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-background/40 mb-6">Navigation</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Philosophy', href: '/#about' },
                { name: 'Programs', href: '/#offerings' },
                { name: 'Gallery', href: '/#gallery' },
              ].map(link => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-lg md:text-xl font-serif text-background/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div className="md:col-span-4 lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-background/40 mb-6">Inquiries</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:hello@tendercradle.com" className="text-lg md:text-xl font-serif text-background/80 hover:text-primary transition-colors">
                  hello@tendercradle.com
                </a>
              </li>
              <li>
                <a href="tel:+2348000000000" className="text-lg md:text-xl font-serif text-background/80 hover:text-primary transition-colors">
                  +234 800 000 0000
                </a>
              </li>
              <li className="text-lg md:text-xl font-serif text-background/60 mt-4">
                Lagos, Nigeria
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-background/10 text-xs font-bold uppercase tracking-widest text-background/30 gap-4">
          <p>© {new Date().getFullYear()} Tender Cradle.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-background transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-background transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
