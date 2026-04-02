
import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import { Link } from "react-router-dom";
import { BookOpen, Music, Palette, Brain, Microscope, Globe, HeartPulse, Sparkles } from "lucide-react";

const ageGroups = [
  {
    age: "01 — Infants (3–18 Months)",
    title: "Nurturing Foundations.",
    description: "A sensory-rich environment focusing on emotional security and primary motor skills.",
    features: ["Sensory Stimulation", "Tummy Time & Exploration", "Language Immersion", "Personalized Sleep Routines"],
    image: "/images/child_1.jpg",
    bg: "#DBEAFE",
    accent: "#1D4ED8"
  },
  {
    age: "02 — Toddlers (18 Months – 3 Years)",
    title: "Curiosity & Discovery.",
    description: "Developing language, social interaction, and independence through structured play.",
    features: ["Language Development", "Social Interaction", "Fine Motor Skills", "Creative Expression"],
    image: "/images/child_2.jpg",
    bg: "#FEF9C3",
    accent: "#B45309"
  },
  {
    age: "03 — Preschool (3 – 5 Years)",
    title: "Readiness & Beyond.",
    description: "Complex problem-solving, early literacy, and preparing for the formal school transition.",
    features: ["Early Literacy & Math", "Scientific Enquiry", "Collaborative Projects", "Global Citizenship"],
    image: "/images/child_3.jpg",
    bg: "#FCE7F3",
    accent: "#BE185D"
  },
];

const pillars = [
  { icon: Brain, title: "Cognitive", text: "Critical thinking and problem solving through hands-on materials.", color: "#1D4ED8", bg: "#DBEAFE" },
  { icon: HeartPulse, title: "Emotional", text: "Building self-regulation and empathy in a secure group setting.", color: "#BE185D", bg: "#FCE7F3" },
  { icon: Palette, title: "Creative", text: "Unleashing imagination via music, arts, and movement.", color: "#B45309", bg: "#FEF9C3" },
  { icon: Microscope, title: "Scientific", text: "Understanding the natural world through observation and play.", color: "#15803D", bg: "#DCFCE7" },
];

export const CurriculumPageContent = () => {
  return (
    <div className="bg-background text-foreground overflow-hidden">

      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-center pb-24 overflow-hidden pt-32 bg-[#DCFCE7]">
        {/* Soft Background Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#BBF7D0] rounded-full opacity-60 pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-[20%] left-[10%] w-72 h-72 bg-[#DBEAFE] rounded-full opacity-60 pointer-events-none" />

        {/* Disney Character Area */}
        <motion.div
           className="absolute bottom-0 right-[15%] w-64 h-64 pointer-events-none z-10 opacity-90 hidden md:block"
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.4, duration: 1 }}
        >
          <div className="absolute inset-0 bg-white rounded-t-full shadow-2xl opacity-60 mix-blend-soft-light" />
          <img src="/images/disney-child.png" alt="Happy child" className="object-cover object-top mix-blend-multiply drop-shadow-lg" />
        </motion.div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
            <div className="h-px w-16 bg-[#16A34A]" />
            <span className="text-sm font-bold uppercase tracking-widest text-[#15803D]">Our Curriculum</span>
          </motion.div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] leading-[0.9] text-[#1A1045] max-w-5xl tracking-tighter">
            Curious <br />
            <span className="text-[#16A34A] relative inline-block">Minds
               <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                  <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#BBF7D0" strokeWidth="6" fill="none" strokeLinecap="round"/>
                </svg>
            </span> <br />
            at Work.
          </h1>
        </div>
      </section>

      {/* Philosophy Pillars - Playful Kid-Friendly Design */}
      <section className="w-full py-32 bg-white overflow-hidden relative">
        {/* Playful background shapes */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-[#FDE68A] rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-[#BFDBFE] rounded-full opacity-20 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-[#FBCFE8] rounded-full opacity-15 blur-2xl" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-6xl tracking-tighter text-[#1A1045] mb-4">
              How Your Child <span className="text-[#F59E0B]">Grows</span> With Us
            </h2>
            <p className="text-xl md:text-2xl text-[#1A1045]/70 font-serif italic max-w-2xl mx-auto">
              Four magical ways we nurture every little learner
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                className="group relative"
              >
                {/* Colorful background card */}
                <div 
                  className="absolute inset-0 rounded-[50px] transform transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: pillar.bg }}
                />
                
                {/* White content card */}
                <div className="relative bg-white m-2 p-8 md:p-10 rounded-[45px] shadow-lg group-hover:shadow-2xl transition-all duration-300">
                  
                  {/* Icon with playful circle */}
                  <div className="flex items-start gap-6 mb-6">
                    <div 
                      className="relative w-20 h-20 rounded-full flex items-center justify-center shrink-0 shadow-lg transform transition-transform group-hover:rotate-12 group-hover:scale-110 duration-300" 
                      style={{ backgroundColor: pillar.bg }}
                    >
                      <pillar.icon className="w-10 h-10" style={{ color: pillar.color }} />
                      
                      {/* Decorative dots around icon */}
                      <div 
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-4 border-white"
                        style={{ backgroundColor: pillar.color }}
                      />
                    </div>
                    
                    {/* Title */}
                    <div className="flex-1 pt-2">
                      <h3 
                        className="font-serif text-3xl md:text-4xl font-black tracking-tight mb-2"
                        style={{ color: pillar.color }}
                      >
                        {pillar.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-lg md:text-xl text-[#1A1045]/80 leading-relaxed pl-2">
                    {pillar.text}
                  </p>
                  
                  {/* Playful corner decoration */}
                  <div className="absolute bottom-6 right-6 flex gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: pillar.color, opacity: 0.3 }}
                    />
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: pillar.color, opacity: 0.5 }}
                    />
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: pillar.color, opacity: 0.7 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Fun bottom element */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-4 bg-[#DCFCE7] px-10 py-5 rounded-full border-4 border-[#16A34A]/20 shadow-lg">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1D4ED8]" />
                <div className="w-3 h-3 rounded-full bg-[#BE185D]" />
                <div className="w-3 h-3 rounded-full bg-[#B45309]" />
                <div className="w-3 h-3 rounded-full bg-[#15803D]" />
              </div>
              <p className="text-lg md:text-xl font-bold text-[#15803D]">
                Every day is a new adventure in learning!
              </p>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#15803D]" />
                <div className="w-3 h-3 rounded-full bg-[#B45309]" />
                <div className="w-3 h-3 rounded-full bg-[#BE185D]" />
                <div className="w-3 h-3 rounded-full bg-[#1D4ED8]" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Age Groups - Elegant Journey */}
      <section className="w-full py-32 space-y-32 bg-white">
        {ageGroups.map((group, index) => (
          <div key={group.age} className="container mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`grid lg:grid-cols-12 gap-12 lg:gap-24 items-center ${index % 2 === 1 ? 'lg:rtl' : ''}`}
            >
              {/* Image */}
              <div className="lg:col-span-6 lg:ltr relative">
                 <div className="absolute -inset-4 rounded-[50px] opacity-20" style={{ backgroundColor: group.bg }} />
                 <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden group shadow-2xl border-4 border-white z-10">
                  <img 
                    src={group.image} 
                    alt={group.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]" 
                  />
                </div>
                {/* Elegant Tag */}
                <div className="absolute -bottom-6 right-8 bg-white text-[#1A1045] px-6 py-3 rounded-full shadow-lg z-20 font-bold tracking-widest uppercase text-xs border border-[#1A1045]/5">
                  Ages {group.age.match(/\((.*?)\)/)?.[1]}
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-6 lg:ltr bg-white p-10 md:p-14 rounded-[50px] shadow-xl border border-[#1A1045]/5 relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ backgroundColor: group.bg }}>
                  <span className="text-xs font-bold uppercase tracking-widest" style={{ color: group.accent }}>
                    Step 0{index + 1}
                  </span>
                </div>
                
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tighter text-[#1A1045] mb-8 leading-[1.05]">{group.title}</h2>
                <p className="text-lg md:text-xl text-[#1A1045]/70 font-serif italic mb-12 leading-relaxed">
                  {group.description}
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {group.features.map(feature => (
                    <div key={feature} className="flex items-center gap-4 bg-[#F8FAFC] p-4 rounded-2xl border border-[#1A1045]/5 transition-colors hover:border-[#1A1045]/10">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: group.accent }} />
                      <span className="text-xs uppercase tracking-widest font-bold text-[#1A1045]/80">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </section>

      {/* Global Learning Section - Modern Playful Design */}
      <section className="py-32 bg-white overflow-hidden relative">
        {/* Organic blob shapes in background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FEF9C3] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-60 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#DBEAFE] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-50 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-[#FCE7F3] rounded-[50%_50%_50%_50%/60%_40%_60%_40%] opacity-40 blur-3xl transform -translate-x-1/2 -translate-y-1/2" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 bg-[#FEF9C3] px-6 py-3 rounded-full mb-8 border-2 border-[#F59E0B]/20">
              <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              <span className="text-sm font-bold uppercase tracking-widest text-[#B45309]">Global Learning</span>
            </div>
            
            <h2 className="font-serif text-5xl md:text-7xl tracking-tighter text-[#1A1045] mb-6 leading-tight">
              Where Nigerian Roots <br/>
              Meet <span className="text-[#F59E0B] relative inline-block">
                World Wings
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                  <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#FDE68A" strokeWidth="6" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-[#1A1045]/70 font-serif italic max-w-3xl mx-auto leading-relaxed">
              We celebrate local culture while preparing your child for a connected world. Rooted at home, ready for anywhere.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            
            {/* Left: Stats Cards */}
            <div className="space-y-6">
              {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-[#DBEAFE] p-8 rounded-[40px] border-2 border-[#3B82F6]/10 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                    <span className="text-4xl font-serif font-black text-[#1D4ED8]">3+</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#1A1045] mb-2">Languages Spoken</h3>
                    <p className="text-base md:text-lg text-[#1A1045]/70 leading-relaxed">
                      English, Yoruba, Igbo and more. Multilingual minds develop stronger cognitive skills.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-[#FCE7F3] p-8 rounded-[40px] border-2 border-[#EC4899]/10 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                    <span className="text-3xl font-serif font-black text-[#BE185D]">12:1</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#1A1045] mb-2">Teacher-Child Ratio</h3>
                    <p className="text-base md:text-lg text-[#1A1045]/70 leading-relaxed">
                      Small groups ensure every child receives personalized attention and care.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-[#DCFCE7] p-8 rounded-[40px] border-2 border-[#16A34A]/10 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shrink-0 shadow-lg">
                    <svg className="w-10 h-10 text-[#15803D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-[#1A1045] mb-2">Cultural Integration</h3>
                    <p className="text-base md:text-lg text-[#1A1045]/70 leading-relaxed">
                      Nigerian heritage meets international standards in every lesson and activity.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Image Collage */}
            <div className="relative">
              {/* Main large image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl border-8 border-white">
                  <img src="/images/child_4.jpg" className="object-cover w-full h-full" alt="Children learning together" />
                </div>
                
                {/* Floating badge */}
                <div className="absolute -top-6 -right-6 bg-[#F59E0B] text-white px-8 py-4 rounded-full shadow-xl border-4 border-white">
                  <p className="text-sm font-bold uppercase tracking-widest">World Ready</p>
                </div>
              </motion.div>

              {/* Small floating images */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-8 -left-8 w-48 h-48 rounded-[40px] overflow-hidden shadow-2xl border-6 border-white hidden md:block"
              >
                <img src="/images/child_5.jpg" className="object-cover w-full h-full" alt="Happy learning" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -top-8 -left-12 w-40 h-40 rounded-full overflow-hidden shadow-2xl border-6 border-white hidden lg:block"
              >
                <img src="/images/child_11.avif" className="object-cover w-full h-full" alt="Creative play" />
              </motion.div>
            </div>
          </div>

          {/* Bottom Feature Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="bg-[#1A1045] text-white p-10 md:p-12 rounded-[50px] shadow-2xl"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-serif font-black text-[#FDE68A] mb-3">100%</div>
                <p className="text-base md:text-lg text-white/80">Nigerian Heritage Celebrated</p>
              </div>
              <div className="border-l border-r border-white/10 hidden md:block" />
              <div>
                <div className="text-4xl md:text-5xl font-serif font-black text-[#BBF7D0] mb-3">Daily</div>
                <p className="text-base md:text-lg text-white/80">Cultural Activities & Stories</p>
              </div>
              <div className="border-l border-white/10 hidden md:block" />
              <div>
                <div className="text-4xl md:text-5xl font-serif font-black text-[#BFDBFE] mb-3">Global</div>
                <p className="text-base md:text-lg text-white/80">Standards, Local Heart</p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};
