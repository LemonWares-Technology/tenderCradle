
import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import { Link } from "react-router-dom";
import { ArrowRight, Download, CheckCircle2, Sparkles, CheckCircle } from "lucide-react";

const enrollmentSteps = [
  {
    title: "1. Virtual or In-Person Tour",
    description: "Experience the Tender Cradle environment first-hand. Meet our educators and see our safe, nurturing spaces in action.",
    image: "/images/hero-1.png",
    accent: "#1D4ED8",
    bg: "#DBEAFE",
  },
  {
    title: "2. Application & Assessment",
    description: "Submit your application form. We'll review your child's needs and schedule a brief meeting to ensure we're the perfect fit.",
    image: "/images/about-2.png",
    accent: "#BE185D",
    bg: "#FCE7F3",
  },
  {
    title: "3. Registration & Deposit",
    description: "Once accepted, complete the registration package and secure your child's spot with a placement deposit.",
    image: "/images/gallery-1.png",
    accent: "#B45309",
    bg: "#FEF9C3",
  },
  {
    title: "4. Welcome & Orientation",
    description: "Join our community! We'll provide a full orientation for both parents and child to ensure a smooth transition.",
    image: "/images/about-1.png",
    accent: "#15803D",
    bg: "#DCFCE7",
  },
];

const checklistItems = [
  "Completed Enrollment Form",
  "Child's Immunization Records",
  "Birth Certificate Copy",
  "Emergency Contact Information",
  "Medical/Allergy Assessments",
  "Parent/Guardian ID Photos",
];

export const EnrollmentPageContent = () => {
  return (
    <div className="bg-background text-foreground overflow-hidden">

      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-center pb-24 overflow-hidden pt-32 bg-[#FEF9C3]">
        {/* Soft Background Blobs */}
        <div className="absolute top-[20%] right-0 w-96 h-96 bg-[#FFFBEB] rounded-full opacity-60 pointer-events-none translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-[10%] left-[10%] w-72 h-72 bg-[#FDE68A] rounded-full opacity-40 pointer-events-none" />

        {/* Disney Butterfly */}
        <motion.div
          className="absolute top-[25%] left-[40%] w-24 h-24 pointer-events-none z-10 opacity-70 mix-blend-multiply hidden md:block"
          animate={{ y: [0, -15, 0], rotate: [-5, -10, -5] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <img src="/images/disney-butterfly.png" alt="Magical butterfly" className="object-contain" />
        </motion.div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
              <div className="h-px w-16 bg-[#B45309]" />
              <span className="text-sm font-bold uppercase tracking-widest text-[#B45309]">Admissions</span>
            </motion.div>

            <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] leading-[0.9] text-[#1A1045] max-w-5xl tracking-tighter">
              Come <br />Grow <span className="text-[#D97706] relative inline-block">With
                 <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                    <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#FDE68A" strokeWidth="6" fill="none" strokeLinecap="round"/>
                  </svg>
              </span> <br />
              Us.
            </h1>
          </div>
        </div>
      </section>

      {/* Quick Apply Section - NEW */}
      <section className="w-full py-16 bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30"
            >
              <Sparkles className="w-4 h-4 text-[#FEF08A]" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">Ready to Begin?</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tighter"
            >
              Start Your Application Today
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-white/90 font-serif italic mb-10 max-w-2xl mx-auto"
            >
              Our simple 6-step application takes just 10 minutes. Secure your child's spot in our nurturing environment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/enrollment/apply"
                className="group inline-flex items-center gap-3 bg-white text-[#1D4ED8] px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#FEF08A] hover:text-[#1A1045] transition-all duration-300 shadow-2xl hover:shadow-[#FEF08A]/50 hover:scale-105"
              >
                <CheckCircle2 className="w-5 h-5" />
                Begin Application
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a
                href="#process"
                className="text-white/90 hover:text-white font-bold uppercase tracking-widest text-sm border-b-2 border-white/40 hover:border-white pb-1 transition-all duration-300"
              >
                Learn About Our Process
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#FEF08A]" />
                <span>Takes 10 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#FEF08A]" />
                <span>Save & continue later</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#FEF08A]" />
                <span>Instant confirmation</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enrollment Process - Playful Winding Path Design */}
      <section id="process" className="w-full py-32 bg-[#FEF9C3] relative overflow-hidden">
        {/* Playful Background Decorations */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-[#FECDD3] rounded-full opacity-30 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-[#BFDBFE] rounded-full opacity-30 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-[#BBF7D0] rounded-full opacity-25 blur-2xl" />
        
        {/* Floating Decorative Elements */}
        <motion.div
          className="absolute top-20 right-[10%] w-16 h-16 pointer-events-none opacity-50 mix-blend-multiply hidden lg:block"
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <img src="/images/disney-butterfly.png" alt="Butterfly" className="object-contain" />
        </motion.div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          {/* Header */}
          <div className="mb-20 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-8 bg-white shadow-xl border-4 border-[#F59E0B] transform -rotate-2"
            >
              <Sparkles className="w-5 h-5 text-[#F59E0B]" />
              <span className="text-sm font-black uppercase tracking-widest text-[#B45309]">Easy as 1-2-3-4!</span>
            </motion.div>
            
            <h2 className="font-serif text-5xl md:text-7xl tracking-tighter text-[#1A1045] mb-6">
              Your Journey to <br/>
              <span className="text-[#F59E0B] relative inline-block">
                Tender Cradle
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                  <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#FDE68A" strokeWidth="8" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            <p className="text-2xl text-[#1A1045]/60 font-serif italic max-w-2xl mx-auto">
              Follow the fun path to join our family!
            </p>
          </div>

          {/* Winding Path with Steps */}
          <div className="relative max-w-7xl mx-auto">
            {/* Decorative Winding Path Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" viewBox="0 0 1200 1000" preserveAspectRatio="none">
              <path 
                d="M 150 200 Q 400 100 600 250 T 1050 400 Q 900 600 600 650 T 150 800" 
                stroke="#FDE68A" 
                strokeWidth="20" 
                fill="none" 
                strokeDasharray="40,20"
                strokeLinecap="round"
                opacity="0.4"
              />
            </svg>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-20 relative">
              {enrollmentSteps.map((step, index) => {
                const isEven = index % 2 === 0;
                
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: isEven ? -50 : 50, rotate: isEven ? -5 : 5 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.7, delay: index * 0.2, type: "spring" }}
                    className="relative"
                    style={{ marginTop: index === 0 ? '0' : index === 1 ? '80px' : index === 2 ? '160px' : '240px' }}
                  >
                    {/* Connecting Arrow (Mobile) */}
                    {index < enrollmentSteps.length - 1 && (
                      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 lg:hidden">
                        <motion.div
                          animate={{ y: [0, 10, 0] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="text-[#F59E0B]"
                        >
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </motion.div>
                      </div>
                    )}

                    {/* Step Card */}
                    <div className="relative group">
                      {/* Giant Playful Number */}
                      <motion.div 
                        className="absolute -top-12 -left-8 z-20 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500"
                        whileHover={{ scale: 1.2, rotate: 15 }}
                      >
                        <div 
                          className="w-28 h-28 rounded-full flex items-center justify-center font-serif text-6xl font-black shadow-2xl border-8 border-white"
                          style={{ backgroundColor: step.bg, color: step.accent }}
                        >
                          {index + 1}
                        </div>
                        {/* Sparkle decoration on number */}
                        <div 
                          className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-lg"
                          style={{ backgroundColor: step.accent }}
                        >
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>

                      {/* Main Card */}
                      <div 
                        className="relative bg-white rounded-[40px] overflow-hidden shadow-2xl border-8 group-hover:scale-105 group-hover:-rotate-1 transition-all duration-500"
                        style={{ borderColor: step.bg }}
                      >
                        {/* Image Section */}
                        <div className="relative aspect-[16/10] overflow-hidden">
                          <img 
                            src={step.image} 
                            alt={step.title} 
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" 
                          />
                          {/* Colorful Overlay Corner */}
                          <div 
                            className="absolute top-0 right-0 w-32 h-32 opacity-60 blur-2xl"
                            style={{ backgroundColor: step.bg }}
                          />
                        </div>

                        {/* Content Section */}
                        <div className="p-8 relative">
                          {/* Decorative Top Border */}
                          <div 
                            className="absolute top-0 left-0 right-0 h-2"
                            style={{ backgroundColor: step.bg }}
                          />
                          
                          <h3 
                            className="font-serif text-3xl font-black tracking-tight leading-tight mb-4 mt-2"
                            style={{ color: step.accent }}
                          >
                            {step.title.substring(3)}
                          </h3>
                          
                          <p className="text-[#1A1045]/70 text-lg leading-relaxed font-serif">
                            {step.description}
                          </p>

                          {/* Fun Icon Badge */}
                          <div 
                            className="absolute bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-xl transform group-hover:rotate-12 transition-transform"
                            style={{ backgroundColor: step.bg }}
                          >
                            <CheckCircle2 className="w-7 h-7" style={{ color: step.accent }} />
                          </div>
                        </div>

                        {/* Playful Bottom Accent with Pattern */}
                        <div 
                          className="h-4"
                          style={{ 
                            backgroundColor: step.bg,
                            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, ${step.accent}20 10px, ${step.accent}20 20px)`
                          }}
                        />
                      </div>

                      {/* Floating Shadow */}
                      <div 
                        className="absolute inset-0 rounded-[40px] -z-10 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"
                        style={{ backgroundColor: step.accent }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Fun Completion Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1, type: "spring" }}
            className="mt-32 text-center"
          >
            <div className="inline-block relative">
              <div className="bg-white rounded-full px-12 py-6 shadow-2xl border-8 border-[#16A34A] transform rotate-2">
                <p className="font-serif text-3xl font-black text-[#16A34A] flex items-center gap-4">
                  <CheckCircle2 className="w-10 h-10" />
                  Welcome to the Family!
                  <Sparkles className="w-8 h-8 text-[#FDE68A]" />
                </p>
              </div>
              {/* Decorative stars */}
              <div className="absolute -top-4 -left-4 text-[#FDE68A] animate-pulse">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="absolute -bottom-4 -right-4 text-[#FDE68A] animate-pulse" style={{ animationDelay: '0.5s' }}>
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Checklist & Documentation */}
      <section className="w-full py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Elegant Checklist */}
            <div className="bg-[#F8FAFC] p-12 md:p-16 rounded-[40px] shadow-xl border border-[#1A1045]/5 relative">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8 bg-green-100">
                <CheckCircle2 className="w-4 h-4 text-green-700" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-800">Checklist</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tighter mb-12 text-[#1A1045]">Required Docs.</h2>
              <div className="grid gap-4">
                {checklistItems.map((item, index) => (
                  <motion.div 
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-6 py-4 border-b border-[#1A1045]/5"
                  >
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-[#1A1045]/5">
                      <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                    </div>
                    <span className="text-lg md:text-xl font-serif text-[#1A1045]/80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Elegant Download Card */}
            <div className="bg-[#1A1045] p-12 md:p-16 rounded-[40px] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6] rounded-full blur-[80px] opacity-20 pointer-events-none translate-x-1/2 -translate-y-1/2" />
              
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8 bg-white/10 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-[#60A5FA]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Resources</span>
              </div>
              
              <h3 className="font-serif text-4xl md:text-5xl tracking-tighter text-white mb-8">Parent Handbook.</h3>
              <p className="text-white/70 mb-12 text-xl font-serif italic leading-relaxed">
                Download our comprehensive guide covering our philosophy, daily schedules, safety protocols, and tuition details.
              </p>
              
              <button className="group inline-flex items-center gap-4 bg-white/10 hover:bg-white/20 text-white px-8 py-5 rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-300 backdrop-blur-md border border-white/20">
                <span>Download PDF (2.4MB)</span>
                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 bg-[#F8FAFC]">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <Link to="/enrollment/apply" className="group inline-flex flex-col items-center">
            <span className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-8 bg-white shadow-sm border border-[#1A1045]/5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B45309]">Ready to Begin?</span>
            </span>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <span className="font-serif text-5xl md:text-7xl lg:text-[7rem] tracking-tighter text-[#1A1045] group-hover:text-[#B45309] transition-colors leading-[0.9]">
                Start<br/> App<span className="text-[#F59E0B]">lication</span>.
              </span>
              <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-[#1A1045] flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#B45309] transition-all duration-500 shrink-0">
                <ArrowRight className="w-10 h-10 md:w-12 md:h-12 text-white group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};
