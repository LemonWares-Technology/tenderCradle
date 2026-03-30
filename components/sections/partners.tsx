
import { motion } from "framer-motion";
import { ShieldCheck, Star, Award, Heart } from "lucide-react";

const partners = [
  { name: "Montessori", abbr: "AMI",   bg: "#DBEAFE", color: "#1D4ED8", icon: Award },
  { name: "UNICEF",    abbr: "UNICEF", bg: "#DCFCE7", color: "#15803D", icon: Heart },
  { name: "NERDC",     abbr: "NERDC",  bg: "#FEF9C3", color: "#D97706", icon: Star },
  { name: "MOE Lagos", abbr: "MOE",    bg: "#FFE4E6", color: "#BE123C", icon: ShieldCheck },
  { name: "NAEYC",     abbr: "NAEYC",  bg: "#EDE9FE", color: "#7C3AED", icon: Award },
  { name: "WHO",       abbr: "WHO",    bg: "#E0F2FE", color: "#0369A1", icon: Heart },
];

export const PartnersSection = () => {
  return (
    <section className="relative w-full py-20 bg-white overflow-hidden">
      
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1A1045 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Label and Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
          >
            <ShieldCheck className="w-4 h-4" />
            Trusted & Accredited
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl text-[#1A1045] max-w-2xl mx-auto tracking-tight"
          >
            Partnering with the world&apos;s leading{" "}
            <span className="relative inline-block text-blue-500">
              educators
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 10" fill="none">
                <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#DBEAFE" strokeWidth="6" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
            .
          </motion.h2>
        </div>

        {/* Partners Sticker Wall */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
          {partners.map((partner, idx) => (
            <motion.div
              key={partner.abbr}
              initial={{ opacity: 0, scale: 0.8, rotate: idx % 2 === 0 ? -5 : 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: idx % 2 === 0 ? -5 : 5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: 0, y: -5 }}
              transition={{ duration: 0.5, delay: idx * 0.05, type: "spring", stiffness: 200 }}
              className="group relative cursor-default"
            >
              {/* Sticker Content */}
              <div 
                className="w-24 h-24 md:w-32 md:h-32 rounded-[32px] md:rounded-[40px] shadow-lg flex flex-col items-center justify-center p-4 border-4 border-white transition-all duration-300"
                style={{ backgroundColor: partner.bg }}
              >
                <partner.icon className="w-5 h-5 md:w-8 md:h-8 mb-2 opacity-80" style={{ color: partner.color }} />
                <span className="font-serif font-bold text-sm md:text-lg leading-none" style={{ color: partner.color }}>
                  {partner.abbr}
                </span>
                
                {/* Glossy overlay effect */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/30 to-transparent pointer-events-none rounded-[32px] md:rounded-[40px]" />
              </div>
              
              {/* Full name tooltip on hover */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-[#1A1045] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none shadow-xl">
                {partner.name}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-[#1A1045]/30 text-xs md:text-sm font-serif italic mt-16 max-w-lg mx-auto leading-relaxed"
        >
          Active accreditation status with each of these global families.
        </motion.p>
      </div>
    </section>
  );
};
