
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/logo";
import { Link } from "react-router-dom";
import { ArrowUpRight, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, Heart, Sparkles } from "lucide-react";
import { useLenis } from "lenis/react";
import { useLocation } from "react-router-dom";

export const Footer = () => {
  const lenis = useLenis();
  const { pathname } = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const target = href.replace("/", "");
      lenis?.scrollTo(target, { offset: 0 });
    }
  };

  return (
    <footer id="contact" className="relative w-full bg-[#2D0057] text-white overflow-hidden">
      
      {/* Playful Layered Wavy Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-24 fill-white">
          <path d="M0,0 C480,100 960,0 1440,50 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Decorative Floating Sparkles */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-40 left-10 text-8xl pointer-events-none select-none text-white/10"
      >
        ✨
      </motion.div>
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-40 right-10 text-7xl pointer-events-none select-none text-white/10"
      >
        🌈
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 pt-48 pb-12 relative z-20">
        
        {/* Massive Playful Exit CTA */}
        <div className="flex flex-col items-center justify-center text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-serif italic text-2xl md:text-3xl text-white/60 mb-6 flex items-center justify-center gap-3">
              Ready to shape their future? <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
            </p>
            
            <Link to="/contact" className="group relative inline-flex items-center gap-6 md:gap-12 hover:scale-105 transition-transform duration-500">
              <h2 className="font-serif text-[12vw] md:text-[8vw] leading-[0.8] tracking-tighter text-white group-hover:text-[#FCD34D] transition-colors duration-500">
                LET&apos;S{" "}
                <span className="relative inline-block">
                  TALK
                  <svg className="absolute -bottom-4 left-0 w-full" viewBox="0 0 100 10" fill="none">
                    <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#FCD34D" strokeWidth="8" fill="none" strokeLinecap="round"/>
                  </svg>
                </span>
              </h2>
              <div className="w-16 h-16 md:w-32 md:h-32 rounded-[40px] border-4 border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-[#FCD34D] group-hover:border-[#FCD34D] group-hover:text-[#2D0057] transition-all duration-500 shrink-0 shadow-2xl">
                <ArrowUpRight className="w-8 h-8 md:w-16 md:h-16 group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Multi-Col Footer Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 border-t border-white/10 pt-20 pb-20">
          
          {/* Brand Col */}
          <div className="md:col-span-5 lg:col-span-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-lg rotate-3">
                <Logo className="w-8 h-8 text-[#2D0057]" />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight">Tender Cradle.</h3>
            </div>
            <p className="text-white/60 text-xl font-serif italic max-w-sm leading-relaxed mb-10">
              A sanctuary for early years. Montessori childcare that truly{" "}
              <span className="text-pink-400">cares.</span>
            </p>
            <div className="flex gap-4">
              {[
                { icon: Instagram, color: "#E1306C" },
                { icon: Linkedin,  color: "#0077B5" },
                { icon: Twitter,   color: "#1DA1F2" }
              ].map((social, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 hover:bg-white transition-all duration-300 group">
                  <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-8">Navigation</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'Admissions', href: '/enrollment' },
                { name: 'Programs', href: '/programs' },
                { name: 'Philosophy', href: '/about' },
                { name: 'Health & Safety', href: '/health-safety' },
                { name: 'Events', href: '/events' },
                { name: 'Shop', href: '/shop' },
              ].map(link => (
                <li key={link.name}>
                  <Link to={link.href} 
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-lg font-serif text-white/70 hover:text-[#FCD34D] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-[#FCD34D] group-hover:w-3 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Inquiries */}
          <div className="md:col-span-4 lg:col-span-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-8">Inquiries</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Email us</p>
                  <a href="mailto:hello@tendercradle.com" className="text-lg font-serif text-white hover:text-[#FCD34D] transition-colors">
                    hello@tendercradle.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Call us</p>
                  <a href="tel:+2348000000000" className="text-lg font-serif text-white hover:text-[#FCD34D] transition-colors">
                    +234 800 000 0000
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-orange-400" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-1">Visit us</p>
                  <p className="text-lg font-serif text-white/80">Lagos, Nigeria</p>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 gap-8">
          <div className="flex items-center gap-6">
            <p>© {new Date().getFullYear()} Tender Cradle.</p>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
          <p className="flex items-center gap-2">
            Made for little stars <Sparkles className="w-3 h-3 text-yellow-400" />
          </p>
        </div>
      </div>
    </footer>
  );
};
