
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Video, 
  BrainCircuit, 
  Stethoscope, 
  DoorOpen, 
  AlertTriangle,
  ArrowRight,
  Heart,
  Star,
  Sparkles,
  Shield,
  Cloud,
  Sun,
  Moon,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

const safetyItems = [
  { 
    icon: Video,         
    title: "24/7 CCTV",           
    text: "Safety eyes everywhere! Keeping our little ones safe while they play.",      
    bg: "#DBEAFE", 
    color: "#2563EB",
    border: "#93C5FD",
    rotation: -2
  },
  { 
    icon: ShieldCheck,   
    title: "Secure Entry",         
    text: "Only best friends (and parents) allowed! Our doors are super locked.", 
    bg: "#FFE4E6", 
    color: "#E11D48",
    border: "#FDA4AF",
    rotation: 3
  },
  { 
    icon: BrainCircuit,  
    title: "CPR Stars",        
    text: "Our teachers are safety superheroes! Trained to help in a heartbeat.",    
    bg: "#FEF9C3", 
    color: "#CA8A04",
    border: "#FDE047",
    rotation: -3
  },
  { 
    icon: Stethoscope,   
    title: "Daily Check",        
    text: "Giving every child a high-five and a health check to start the day.",       
    bg: "#DCFCE7", 
    color: "#16A34A",
    border: "#86EFAC",
    rotation: 2
  },
  { 
    icon: DoorOpen,      
    title: "Soft Spaces",          
    text: "Bump-free and jump-safe! Every corner is built for happy adventures.",       
    bg: "#F3E8FF", 
    color: "#9333EA",
    border: "#D8B4FE",
    rotation: -1
  },
  { 
    icon: AlertTriangle, 
    title: "Safety Drills",      
    text: "Practicing our safe moves like a fun game! Always ready and brave.",       
    bg: "#FFEDD5", 
    color: "#D97706",
    border: "#FDBA8C",
    rotation: 4
  },
];

export const SafetyTeaser = () => {
  return (
    <section className="relative w-full py-24 md:py-48 bg-[#E0F2FE] text-[#1A1045] overflow-hidden">

      {/* Decorative Floating "Stickers" */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[8%] text-[#60A5FA]/30 pointer-events-none"
      >
        <Cloud size={80} strokeWidth={1.5} />
      </motion.div>
      <motion.div 
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 right-[10%] text-[#FBBF24]/40 pointer-events-none"
      >
        <Sun size={120} strokeWidth={1} />
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-40 left-[12%] text-[#A855F7]/25 pointer-events-none"
      >
        <Moon size={90} strokeWidth={1} />
      </motion.div>
      <motion.div 
        animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-60 right-[15%] text-[#F97316]/30 pointer-events-none"
      >
        <Zap size={70} strokeWidth={1.5} />
      </motion.div>

      {/* Wavy top — hand-drawn look */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-24 fill-[#DCFCE7]">
          <path d="M0,0 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Wavy bottom — hand-drawn look */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-24 fill-[#F0FDF4]">
          <path d="M0,0 C240,100 480,0 720,50 C960,100 1200,0 1440,50 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full mb-10 shadow-[8px_8px_0px_#2563EB] border-4 border-[#2563EB]"
          >
            <ShieldCheck className="w-6 h-6 text-[#2563EB]" />
            <span className="text-sm font-black text-[#2563EB] uppercase tracking-widest">Kid Safe Zone!</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-8xl text-[#1A1045] tracking-tighter mb-8 leading-[0.8]"
          >
            Safety First,{" "}
            <span className="relative inline-block text-[#E11D48]">
              Joy Always
              <svg className="absolute -bottom-4 left-0 w-full" viewBox="0 0 200 20" fill="none">
                <path d="M5 15 Q50 5 100 15 Q150 25 195 15" stroke="#FDA4AF" strokeWidth="10" strokeLinecap="round"/>
              </svg>
            </span>
            .
          </motion.h2>

          <p className="text-[#1A1045] text-lg md:text-xl max-w-2xl mx-auto font-serif italic leading-relaxed">
            We look after our little stars like they&apos;re our own. Safety is the blanket that keeps our play warm and worry-free!
          </p>
        </div>

        {/* Safety bubble cards — Organic & Staggered */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16 mb-24">
          {safetyItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8, type: "spring", bounce: 0.4 }}
              className="relative group p-1"
              style={{ rotate: `${item.rotation}deg` }}
            >
              <div 
                className="absolute inset-0 rounded-[60px] bg-white border-8 border-white shadow-2xl transition-transform duration-500 group-hover:scale-105"
                style={{ filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.1))" }}
              />
              <div 
                className="relative rounded-[50px] p-10 h-full flex flex-col items-center text-center border-4"
                style={{ backgroundColor: item.bg, borderColor: item.border }}
              >
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-8 bg-white shadow-lg border-4"
                  style={{ borderColor: item.border }}
                >
                  <item.icon className="w-10 h-10" style={{ color: item.color }} />
                </div>
                <h3 className="font-serif text-3xl text-[#1A1045] mb-4 font-black">{item.title}</h3>
                <p className="text-base md:text-lg text-[#1A1045]/70 leading-snug font-serif italic">{item.text}</p>
                
                {/* Little decoration sparkles */}
                <Sparkles className="absolute top-6 right-6 w-6 h-6 opacity-30" style={{ color: item.color }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center justify-center gap-16"
        >
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 text-center">
            <motion.div whileHover={{ scale: 1.1 }} className="relative group">
              <div className="absolute -inset-4 bg-[#2563EB]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-6xl md:text-8xl font-serif font-black text-[#2563EB]">24/7</p>
              <p className="text-xs uppercase tracking-[0.2em] text-[#1A1045] mt-4 font-black bg-white/50 px-4 py-1 rounded-full">Always Watching</p>
              <Shield className="absolute -top-6 -right-10 w-12 h-12 text-[#2563EB]/20 -rotate-12" />
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} className="relative group">
              <div className="absolute -inset-4 bg-[#E11D48]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-6xl md:text-8xl font-serif font-black text-[#E11D48]">100%</p>
              <p className="text-xs uppercase tracking-[0.2em] text-[#1A1045] mt-4 font-black bg-white/50 px-4 py-1 rounded-full">Superhero Certified</p>
              <Heart className="absolute -bottom-10 -left-10 w-12 h-12 text-[#E11D48]/20 rotate-12" />
            </motion.div>
          </div>

          <Link to="/health-safety"
            className="group relative inline-flex items-center gap-6 bg-[#1A1045] text-white px-12 py-6 rounded-[30px] font-black uppercase tracking-widest text-sm hover:translate-y-[-4px] transition-all duration-300 shadow-[0_15px_30px_rgba(26,16,69,0.3)]"
          >
            <span>Explore All Safety Secrets</span>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </div>
            
            {/* Playful overlay glow */}
            <div className="absolute inset-0 rounded-[30px] border-4 border-white/5 pointer-events-none" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
