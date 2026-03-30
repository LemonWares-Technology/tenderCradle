
import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import { Link } from "react-router-dom";
import { ShieldCheck, Waves, Wind, Lock, Stethoscope, HeartPulse, ArrowUpRight } from "lucide-react";

const safetyFeatures = [
  {
    icon: ShieldCheck,
    title: "Eco-Friendly Sanitization",
    description: "We use non-toxic, plant-based cleaning agents that are 100% safe for children while eliminating 99.9% of germs.",
    accent: "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]",
  },
  {
    icon: Lock,
    title: "Secure Access Control",
    description: "Biometric entry and 24/7 CCTV monitoring ensure that only authorized staff and parents can access our facility.",
    accent: "bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE]",
  },
  {
    icon: Wind,
    title: "Air Purification",
    description: "Whole-building HEPA filtration systems that cycle and purify the air every 15 minutes, reducing allergens and airborne pathogens.",
    accent: "bg-[#FEF9C3] text-[#B45309] border-[#FDE68A]",
  },
  {
    icon: Stethoscope,
    title: "On-Site Nurse",
    description: "A qualified paediatric nurse is on-site at all times to monitor health, manage allergies, and respond to minor injuries.",
    accent: "bg-[#FCE7F3] text-[#BE185D] border-[#FBCFE8]",
  },
  {
    icon: Waves,
    title: "Water Filtration",
    description: "Our facility is equipped with medical-grade water filtration for drinking, meal prep, and hygiene.",
    accent: "bg-[#E0E7FF] text-[#4338CA] border-[#C7D2FE]",
  },
  {
    icon: HeartPulse,
    title: "Staff CPR Training",
    description: "Every single member of the Tender Cradle team is certified in Pediatric First Aid and CPR, with bi-annual recertification.",
    accent: "bg-[#FFE4E6] text-[#E11D48] border-[#FECDD3]",
  },
];

export const HealthSafetyPageContent = () => {
  return (
    <div className="bg-[#F8FAFC] text-foreground pb-32 overflow-hidden">

      {/* Hero */}
      <section className="relative w-full min-h-[50vh] flex items-center pb-16 overflow-hidden pt-40 bg-white">
        <div className="absolute top-[10%] right-[5%] w-[600px] h-[600px] bg-[#DCFCE7] rounded-full opacity-40 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[0%] left-[10%] w-[400px] h-[400px] bg-[#DBEAFE] rounded-full opacity-40 blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center items-center gap-4 mb-8">
            <div className="h-px w-16 bg-[#15803D]" />
            <span className="text-sm font-bold uppercase tracking-widest text-[#15803D]">Health & Safety</span>
            <div className="h-px w-16 bg-[#15803D]" />
          </motion.div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-[8rem] leading-[0.9] text-[#1A1045] max-w-5xl mx-auto tracking-tighter mb-6 relative">
             Safety is not <br className="hidden md:block" /> a feature, it's our <span className="text-[#10B981] relative inline-block">Foundation
               <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                  <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#BBF7D0" strokeWidth="6" fill="none" strokeLinecap="round"/>
                </svg>
             </span>.
          </h1>
        </div>
      </section>

      {/* Safety Grid */}
      <section className="w-full py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {safetyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group bg-white p-10 rounded-[40px] shadow-xl border border-[#1A1045]/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative"
              >
                <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center mb-8 border border-white shadow-inner group-hover:scale-110 transition-transform duration-500 ${feature.accent}`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl tracking-tighter mb-4 text-[#1A1045] group-hover:text-[#3B82F6] transition-colors">{feature.title}</h3>
                <p className="text-[#1A1045]/60 leading-relaxed font-serif italic text-lg">{feature.description}</p>
                <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-[#1A1045]/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 bg-white shadow-sm">
                   <ArrowUpRight className="w-5 h-5 text-[#1A1045]/40" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol Block */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="bg-[#1A1045] rounded-[50px] p-8 md:p-16 lg:p-24 shadow-2xl relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#10B981]/20 to-transparent rounded-full blur-[80px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#3B82F6]/20 to-transparent rounded-full blur-[80px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
              <div className="order-2 lg:order-1">
                <h2 className="font-serif text-5xl md:text-7xl tracking-tighter mb-12 text-white italic">Daily <br className="hidden md:block"/> <span className="text-[#60A5FA]">Vigilance.</span></h2>
                <div className="space-y-12 pr-6">
                  <div className="relative pl-8">
                    <div className="absolute top-2 left-0 w-2 h-2 rounded-full bg-[#34D399]" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#34D399] mb-4">Morning Screenings</h4>
                    <p className="text-xl text-white/70 font-serif italic leading-relaxed">Every child receives a gentle temperature and visual wellness check upon arrival to ensure a healthy environment for all.</p>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute top-2 left-0 w-2 h-2 rounded-full bg-[#60A5FA]" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#60A5FA] mb-4">Sanitization Cycles</h4>
                    <p className="text-xl text-white/70 font-serif italic leading-relaxed">Common areas and learning materials are sanitized after every session using hospital-grade, eco-friendly protocols.</p>
                  </div>
                  <div className="relative pl-8">
                    <div className="absolute top-2 left-0 w-2 h-2 rounded-full bg-[#FBBF24]" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#FBBF24] mb-4">Nutrition Safety</h4>
                    <p className="text-xl text-white/70 font-serif italic leading-relaxed">We maintain a strict nut-free facility and follow rigorous cross-contamination protocols for all dietary requirements.</p>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border border-white/10 group">
                   <img 
                      src="/images/gallery-2.png" 
                      alt="Safe environment" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                    />
                  <div className="absolute inset-0 bg-[#0F0928]/20 mix-blend-overlay pointer-events-none" />
                  
                  {/* Floating badge */}
                  <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md px-6 py-4 rounded-[24px] shadow-2xl flex items-center gap-4">
                     <ShieldCheck className="w-8 h-8 text-[#10B981]" />
                     <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/50 mb-1">Status</p>
                        <p className="font-serif text-xl text-[#1A1045] font-bold">100% Certified</p>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="py-40 bg-[#F8FAFC]">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#DCFCE7] rounded-full blur-[80px] pointer-events-none opacity-50" />
          
          <h2 className="relative z-10 font-serif text-5xl md:text-6xl lg:text-7xl tracking-tighter mb-12 text-[#1A1045] mx-auto italic drop-shadow-md">
            Have questions about our <br />safety <span className="text-[#10B981] font-bold not-italic">protocols?</span>
          </h2>
          <Link to="/contact" 
            className="relative z-10 group inline-flex items-center gap-4 bg-[#1A1045] hover:bg-[#10B981] text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all duration-300 shadow-xl"
          >
            <span>Speak with our Health Lead</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};
