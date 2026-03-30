
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const floatingItems = [
  { emoji: "⭐", x: "left-[6%]",   y: "top-[18%]",    size: "text-4xl", delay: 0,   duration: 3.2 },
  { emoji: "🌈", x: "right-[8%]",  y: "top-[12%]",    size: "text-5xl", delay: 0.5, duration: 4.1 },
  { emoji: "☁️", x: "left-[12%]",  y: "bottom-[25%]", size: "text-5xl", delay: 0.3, duration: 3.6 },
  { emoji: "🦋", x: "right-[6%]",  y: "top-[52%]",    size: "text-3xl", delay: 0.8, duration: 4.5 },
  { emoji: "🌟", x: "left-[28%]",  y: "top-[8%]",     size: "text-3xl", delay: 1.0, duration: 3.0 },
  { emoji: "🎈", x: "right-[22%]", y: "bottom-[18%]", size: "text-4xl", delay: 0.2, duration: 5.0 },
  { emoji: "🌸", x: "left-[4%]",   y: "bottom-[32%]", size: "text-3xl", delay: 1.2, duration: 3.4 },
  { emoji: "✏️", x: "right-[4%]",  y: "bottom-[12%]", size: "text-3xl", delay: 0.6, duration: 4.0 },
  { emoji: "🎨", x: "left-[40%]",  y: "top-[5%]",     size: "text-2xl", delay: 1.5, duration: 3.8 },
];

export const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-[#DBEAFE] overflow-hidden flex items-center">

      {/* Background blobs */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#FEF9C3] rounded-full opacity-60 pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-[#DCFCE7] rounded-full opacity-60 pointer-events-none" />
      <div className="absolute top-[25%] -right-10 w-40 h-40 bg-[#EDE9FE] rounded-full opacity-50 pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-24 h-24 bg-[#FFF1F2] rounded-full opacity-70 pointer-events-none" />

      {/* Floating emoji elements */}
      {floatingItems.map((item, i) => (
        <motion.div
          key={i}
          className={`absolute ${item.x} ${item.y} ${item.size} pointer-events-none select-none z-10`}
          animate={{ y: [0, -18, 0], rotate: [-6, 6, -6] }}
          transition={{
            repeat: Infinity,
            duration: item.duration,
            delay: item.delay,
            ease: "easeInOut",
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Main content */}
      <div className="container mx-auto px-6 md:px-12 relative z-20 pt-24 lg:min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center w-full">

          {/* ── Left: Text ── */}
          <div className="flex flex-col items-start">

            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full shadow-lg shadow-[#1D4ED8]/10 mb-8 border border-white"
            >
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-sm font-bold text-[#1A1045]">🎉 Now Enrolling for 2026!</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.05] tracking-tight text-[#1A1045] mb-6"
            >
              Where Little{" "}
              <span className="relative inline-block text-[#FF6B35]">
                Stars
                {/* Wobbly underline */}
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 160 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8 Q40 2 80 8 Q120 14 158 8"
                    stroke="#FFE66D"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <br />
              Shine Bright ✨
            </motion.h1>

            {/* Body copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-lg md:text-xl text-[#1A1045]/65 leading-relaxed mb-10 max-w-lg"
            >
              A warm, nurturing Montessori childcare where every child&apos;s
              imagination, creativity, and confidence is lovingly developed every
              single day.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <Link to="/enrollment/apply"
                className="group inline-flex items-center gap-3 bg-[#FF6B35] text-white px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#7C3AED] transition-all duration-500 shadow-xl shadow-[#FF6B35]/30 hover:shadow-[#7C3AED]/30 hover:scale-105"
              >
                Enroll Your Child
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/about"
                className="inline-flex items-center gap-2 text-[#1A1045] font-bold uppercase tracking-widest text-sm hover:text-[#FF6B35] transition-colors px-2 py-4"
              >
                Take a Tour →
              </Link>
            </motion.div>


          </div>

          {/* ── Right: Image collage ── */}
          <div className="relative h-[480px] sm:h-[560px] lg:h-[640px]">

            {/* Main image — tilted left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-[2%] top-[4%] w-[62%] aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white"
            >
              <img 
                src="/images/hero-1.png"
                alt="Happy children learning at Tender Cradle"
                className="object-cover"
              />
            </motion.div>

            {/* Secondary image — tilted right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, rotate: 6 }}
              animate={{ opacity: 1, scale: 1, rotate: 5 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-[0%] top-[28%] w-[48%] aspect-square rounded-[32px] overflow-hidden shadow-2xl border-4 border-white"
            >
              <img 
                src="/images/gallery-1.png"
                alt="Children playing"
                className="object-cover"
              />
            </motion.div>

            {/* Purple stat badge — bottom left */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: -4 }}
              transition={{ type: "spring", stiffness: 200, delay: 1.2 }}
              className="absolute bottom-[6%] left-[1%] bg-[#7C3AED] text-white px-5 py-4 rounded-[22px] shadow-2xl shadow-[#7C3AED]/40 border-2 border-white/30"
            >
              <p className="text-3xl font-serif font-bold leading-none">
                12<span className="text-[#FCD34D]">yrs</span>
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mt-1">
                of loving care
              </p>
            </motion.div>

            {/* Green stat badge — top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 6 }}
              transition={{ type: "spring", stiffness: 200, delay: 1.4 }}
              className="absolute top-[2%] right-[3%] bg-[#16A34A] text-white px-4 py-3 rounded-[18px] shadow-2xl shadow-[#16A34A]/30 border-2 border-white/30"
            >
              <p className="text-2xl font-bold leading-none">98%</p>
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/70 mt-0.5">
                Happy Parents
              </p>
            </motion.div>


          </div>
        </div>
      </div>
    </section>
  );
};
