import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, Waves, Wind, Lock, Stethoscope, HeartPulse, Sparkles, Heart, Star, Sun } from "lucide-react";

const safetyFeatures = [
  {
    icon: ShieldCheck,
    title: "Super Clean Spaces",
    description: "We use special plant-based cleaners that are safe for kids but tough on germs. Everything sparkles!",
    color: "#10B981",
    bgColor: "#D1FAE5",
    borderColor: "#6EE7B7",
  },
  {
    icon: Lock,
    title: "Safe & Secure",
    description: "Special locks and cameras keep everyone safe. Only moms, dads, and our team can come in!",
    color: "#3B82F6",
    bgColor: "#DBEAFE",
    borderColor: "#93C5FD",
  },
  {
    icon: Wind,
    title: "Fresh Air Always",
    description: "Our special air cleaners work like magic to keep the air fresh and clean all day long!",
    color: "#F59E0B",
    bgColor: "#FEF3C7",
    borderColor: "#FCD34D",
  },
  {
    icon: Stethoscope,
    title: "Nurse on Duty",
    description: "A friendly nurse is always here to help with boo-boos, tummy aches, and to keep everyone healthy!",
    color: "#EC4899",
    bgColor: "#FCE7F3",
    borderColor: "#F9A8D4",
  },
  {
    icon: Waves,
    title: "Clean Water",
    description: "All our water is super filtered and clean - perfect for drinking, cooking, and washing hands!",
    color: "#8B5CF6",
    bgColor: "#EDE9FE",
    borderColor: "#C4B5FD",
  },
  {
    icon: HeartPulse,
    title: "Trained Heroes",
    description: "Every teacher knows how to help in emergencies. They're like superheroes keeping everyone safe!",
    color: "#EF4444",
    bgColor: "#FEE2E2",
    borderColor: "#FCA5A5",
  },
];

const dailyRoutines = [
  { title: "Morning Check", desc: "Friendly hello & health check", icon: Sun, color: "#F59E0B", bgColor: "#FEF3C7" },
  { title: "Clean Hands", desc: "Wash hands before every activity", icon: Sparkles, color: "#3B82F6", bgColor: "#DBEAFE" },
  { title: "Healthy Snacks", desc: "Nutritious food for growing bodies", icon: Heart, color: "#EF4444", bgColor: "#FEE2E2" },
  { title: "Safe Play", desc: "Soft surfaces & careful watching", icon: ShieldCheck, color: "#10B981", bgColor: "#D1FAE5" },
];

export const HealthSafetyPageContent = () => {
  return (
    <div className="bg-white overflow-hidden">

      {/* Hero - Consistent Style */}
      <section className="relative w-full min-h-[70vh] flex items-center pb-16 overflow-hidden pt-40 bg-white">
        {/* Organic blob shapes */}
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-[#D1FAE5] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-50 blur-3xl" />
        <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] bg-[#DBEAFE] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-50 blur-3xl" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center items-center gap-4 mb-8">
            <div className="h-px w-16 bg-[#10B981]" />
            <span className="text-sm font-bold uppercase tracking-widest text-[#10B981]">Health & Safety</span>
            <div className="h-px w-16 bg-[#10B981]" />
          </motion.div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-[8rem] leading-[0.9] text-[#1A1045] max-w-5xl tracking-tighter mb-4 mx-auto">
            Safe, Happy, <br className="hidden md:block" />
            <span className="text-[#10B981] relative inline-block">Healthy
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#6EE7B7" strokeWidth="6" fill="none" strokeLinecap="round"/>
              </svg>
            </span>.
          </h1>
        </div>
      </section>

      {/* Safety Features - Sticker Style Cards */}
      <section className="w-full py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tighter text-[#1A1045] mb-6">
                Our Super <span className="text-[#10B981]">Safety</span> Powers
              </h2>
            </motion.div>
            <p className="text-xl md:text-2xl text-[#1A1045]/60 max-w-2xl mx-auto">
              Six amazing ways we protect every child, every day
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {safetyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -3 : 3 }}
                whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -2 : 2 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 150,
                  damping: 12
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 0,
                  y: -10
                }}
                className="relative group cursor-default"
              >
                {/* Sticker-style card */}
                <div 
                  className="relative p-8 rounded-[40px] shadow-xl border-8 border-white"
                  style={{ backgroundColor: feature.bgColor }}
                >
                  {/* Big icon at top */}
                  <div className="flex justify-center mb-6">
                    <div 
                      className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg border-4 border-white transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300"
                      style={{ backgroundColor: 'white' }}
                    >
                      <feature.icon className="w-12 h-12" style={{ color: feature.color }} />
                    </div>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-center mb-4 tracking-tight" style={{ color: feature.color }}>
                    {feature.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-base md:text-lg text-[#1A1045]/80 leading-relaxed text-center">
                    {feature.description}
                  </p>

                  {/* Corner decoration */}
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 rounded-full border-4 border-white" style={{ backgroundColor: feature.borderColor }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Routines - Adventure Map Style */}
      <section className="w-full py-24 md:py-32 bg-[#FEF3C7] relative overflow-hidden">
        {/* Playful background shapes */}
        <div className="absolute top-10 right-10 w-40 h-40 bg-[#DBEAFE] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-60" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-[#FCE7F3] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-60" />
        <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-[#D1FAE5] rounded-full opacity-60" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tighter text-[#1A1045] mb-6">
              Our Daily <span className="text-[#F59E0B]">Adventure</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#1A1045]/70 max-w-2xl mx-auto">
              Follow the path to a safe and happy day!
            </p>
          </div>

          {/* Adventure path */}
          <div className="relative max-w-6xl mx-auto">
            {/* Dotted path line - desktop only */}
            <svg className="hidden lg:block absolute top-32 left-0 w-full h-32 pointer-events-none" style={{ zIndex: 0 }}>
              <path 
                d="M 100 60 Q 400 20, 700 60 T 1300 60" 
                stroke="#F59E0B" 
                strokeWidth="4" 
                strokeDasharray="10,10" 
                fill="none"
                opacity="0.3"
              />
            </svg>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative" style={{ zIndex: 1 }}>
              {dailyRoutines.map((routine, index) => (
                <motion.div
                  key={routine.title}
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  className="relative group flex flex-col items-center"
                >
                  {/* Step number with arrow */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    className="mb-4"
                  >
                    <div 
                      className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-white font-serif text-2xl font-bold relative"
                      style={{ backgroundColor: routine.color, color: 'white' }}
                    >
                      {index + 1}
                      {/* Arrow pointing down */}
                      <div 
                        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent"
                        style={{ borderTopColor: routine.color }}
                      />
                    </div>
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="relative w-full"
                  >
                    <div 
                      className="relative p-6 rounded-[30px] shadow-xl border-2 border-white min-h-[240px] flex flex-col items-center justify-center"
                      style={{ backgroundColor: routine.bgColor }}
                    >
                      {/* Icon */}
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center mb-4 shadow-lg border-2 border-white group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: 'white' }}
                      >
                        <routine.icon className="w-8 h-8" style={{ color: routine.color }} />
                      </div>
                      
                      {/* Title */}
                      <h3 
                        className="font-serif text-xl md:text-2xl font-bold text-center mb-3 tracking-tight"
                        style={{ color: routine.color }}
                      >
                        {routine.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm md:text-base text-[#1A1045]/80 text-center leading-relaxed">
                        {routine.desc}
                      </p>

                      {/* Small decorative dots */}
                      <div className="absolute bottom-3 right-3 flex gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: routine.color, opacity: 0.6 }} />
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: routine.color, opacity: 0.6 }} />
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: routine.color, opacity: 0.6 }} />
                      </div>
                    </div>
                  </motion.div>

                  {/* Arrow to next step - desktop only */}
                  {index < dailyRoutines.length - 1 && (
                    <div className="hidden lg:block absolute top-8 -right-12 text-4xl opacity-40" style={{ color: routine.color }}>
                      →
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Finish flag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            className="text-center mt-16"
          >
            <div className="inline-block bg-white px-8 py-4 rounded-full shadow-lg border-2 border-[#10B981]">
              <p className="text-lg md:text-xl font-bold text-[#1A1045] flex items-center gap-3">
                <span className="text-3xl">🏁</span>
                Happy, Healthy Day Complete!
                <span className="text-3xl">🏁</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Section with Stats */}
      <section className="w-full py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="/images/child_4.jpg" 
                  alt="Safe and happy children" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating badge */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="absolute -bottom-6 -right-6 bg-[#10B981] text-white p-6 rounded-[30px] shadow-2xl border-4 border-white"
              >
                <div className="flex items-center gap-3">
                  <Star className="w-8 h-8 fill-white" />
                  <div>
                    <p className="text-sm font-bold">100% Safe</p>
                    <p className="text-xs opacity-90">Certified</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-4xl md:text-6xl tracking-tighter text-[#1A1045] mb-8">
                Parents Trust Us
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D1FAE5] flex items-center justify-center shrink-0">
                    <Heart className="w-6 h-6 text-[#10B981] fill-[#10B981]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-[#1A1045] mb-2">Daily Health Checks</h3>
                    <p className="text-lg text-[#1A1045]/70">
                      Every morning, we check each child to make sure everyone is feeling great!
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#DBEAFE] flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6 text-[#3B82F6]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-[#1A1045] mb-2">Super Clean</h3>
                    <p className="text-lg text-[#1A1045]/70">
                      We clean toys and rooms many times a day with special safe cleaners.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FEF3C7] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 text-[#F59E0B]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-[#1A1045] mb-2">Allergy Safe</h3>
                    <p className="text-lg text-[#1A1045]/70">
                      No nuts allowed! We're extra careful with all food allergies.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section - Playful */}
      <section className="py-32 bg-[#FEF3C7] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-[#DBEAFE] rounded-full opacity-50" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#FCE7F3] rounded-full opacity-50" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-[#D1FAE5] rounded-full opacity-50" />
        
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tighter text-[#1A1045] mb-8">
              Want to See <br/>
              <span className="text-[#10B981]">How We Keep Kids Safe?</span>
            </h2>
            
            <p className="text-xl md:text-2xl text-[#1A1045]/70 font-serif italic mb-12">
              Come visit and see our safety features in action!
            </p>
            
            <Link 
              to="/contact"
              className="inline-flex items-center gap-4 bg-[#10B981] text-white px-10 py-6 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#059669] transition-all duration-300 shadow-xl hover:scale-105 border-4 border-white"
            >
              <span>Book a Tour</span>
              <Sparkles className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
