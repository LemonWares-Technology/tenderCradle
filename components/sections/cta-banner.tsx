
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, CheckCircle } from "lucide-react";

const stars = [
  { size: 40, x: "8%",  y: "15%", rotate: 20,  color: "#FEF08A" },
  { size: 28, x: "85%", y: "10%", rotate: -15, color: "#FECDD3" },
  { size: 52, x: "90%", y: "60%", rotate: 10,  color: "#BBF7D0" },
  { size: 22, x: "5%",  y: "70%", rotate: 30,  color: "#BFDBFE" },
  { size: 34, x: "70%", y: "85%", rotate: -20, color: "#FEF08A" },
  { size: 18, x: "50%", y: "5%",  rotate: 45,  color: "#FECDD3" },
];

const trustBadges = [
  "NERDC Approved",
  "Montessori Certified",
  "First Aid Trained",
  "CCTV Secured",
];

export const CTABannerSection = () => {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#F97316] text-white overflow-hidden">

      {/* Wavy top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180" aria-hidden="true">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-14 fill-[#2563EB]">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Wavy bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-14 fill-[#DB2777]">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Decorative stars */}
      {stars.map((s, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          animate={{ rotate: [s.rotate, s.rotate + 20, s.rotate], scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 4 + i, ease: "easeInOut" }}
          className="absolute pointer-events-none"
          style={{ left: s.x, top: s.y }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill={s.color}>
            <polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9" />
          </svg>
        </motion.div>
      ))}

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-white/20 border border-white/30 px-5 py-2 rounded-full mb-8"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-white">Enrollment Open 2026</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight text-white mb-6 max-w-4xl mx-auto"
        >
          Give your child the{" "}
          <span className="relative inline-block">
            best start
            <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 12" fill="none">
              <path d="M2 8 Q50 2 100 8 Q150 14 198 8" stroke="#FEF08A" strokeWidth="5" fill="none" strokeLinecap="round"/>
            </svg>
          </span>
          .
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-white/80 text-lg max-w-xl mx-auto mb-12"
        >
          Spots fill fast. Secure your child&apos;s place in our nurturing Montessori-inspired programme today.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Link to="/contact"
            className="group inline-flex items-center gap-3 bg-white text-[#F97316] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#1A1045] hover:text-white transition-all duration-500 shadow-xl shadow-black/15"
          >
            Enroll Your Child
            <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link to="/about"
            className="text-white/80 hover:text-white font-bold uppercase tracking-widest text-sm border-b-2 border-white/40 hover:border-white pb-1 transition-all duration-300"
          >
            Learn More
          </Link>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {trustBadges.map((b) => (
            <div key={b} className="flex items-center gap-2 text-white/80 text-sm font-bold">
              <CheckCircle className="w-4 h-4 text-[#FEF08A]" />
              {b}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
