
import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const programs = [
  {
    title: "Childcare & After-School Care",
    description: "Reliable childcare, after-school, and out-of-school care services supporting working families. We provide a safe, supervised environment where your child can learn and grow while you work with peace of mind.",
    image: "/images/child_7.jpg",
    accent: "#1D4ED8",
    bg: "#DBEAFE",
  },
  {
    title: "Structured Play & Creativity",
    description: "Structured play, learning, and creative activities that promote age-appropriate development. From arts and crafts to music and movement, every activity is designed to spark joy and curiosity.",
    image: "/images/child_19.avif",
    accent: "#B45309",
    bg: "#FEF9C3",
  },
  {
    title: "Emotional & Social Development",
    description: "Emotional, social, and value-based development support that helps children build character, empathy, and strong interpersonal skills in a nurturing environment.",
    image: "/images/child_8.jpg",
    accent: "#15803D",
    bg: "#DCFCE7",
  },
];

export const ProgramsPageContent = () => {
  return (
    <div className="bg-background text-foreground overflow-hidden">

      {/* Hero */}
      <section className="relative w-full min-h-[70vh] flex items-center pb-24 overflow-hidden pt-32 bg-[#EDE9FE]">
        {/* Soft Background Blobs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#DCFCE7] rounded-full opacity-50 pointer-events-none" />
        <div className="absolute bottom-[10%] left-[5%] w-64 h-64 bg-[#FFF1F2] rounded-full opacity-60 pointer-events-none" />

        {/* Disney Butterfly */}
        <motion.div
          className="absolute top-[30%] right-[15%] w-24 h-24 pointer-events-none z-10 opacity-70 mix-blend-multiply hidden md:block"
          animate={{ y: [0, -15, 0], rotate: [5, 10, 5] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        >
          <img src="/images/disney-butterfly.png" alt="Magical butterfly" className="object-contain" />
        </motion.div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
            <div className="h-px w-16 bg-[#7C3AED]" />
            <span className="text-sm font-bold uppercase tracking-widest text-[#7C3AED]">Our Programs</span>
          </motion.div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] leading-[0.9] text-[#1A1045] max-w-5xl tracking-tighter">
            Grow, <br />
            <span className="text-[#7C3AED] relative inline-block">Play
               <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                  <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#DDD6FE" strokeWidth="6" fill="none" strokeLinecap="round"/>
                </svg>
            </span> <br />
            & Learn.
          </h1>
        </div>
      </section>

      {/* Programs List - Elegant Floating Cards */}
      <section className="w-full py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="space-y-32">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`grid lg:grid-cols-12 gap-12 lg:gap-24 items-center`}
              >
                {/* Index & Title */}
                <div className={`lg:col-span-5 flex flex-col justify-center ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <div className="inline-flex items-center self-start gap-3 px-4 py-2 rounded-full mb-8 shadow-sm border border-white" style={{ backgroundColor: program.bg }}>
                    <Sparkles className="w-4 h-4" style={{ color: program.accent }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: program.accent }}>Program 0{index + 1}</span>
                  </div>
                  
                  <h2 className="font-serif text-4xl md:text-6xl text-[#1A1045] leading-[1.0] pr-8 tracking-tighter mb-8">
                    {program.title}
                  </h2>
                  <p className="text-lg md:text-xl text-[#1A1045]/70 font-serif italic leading-relaxed">
                    {program.description}
                  </p>
                </div>

                {/* Description & Image */}
                <div className={`lg:col-span-7 flex flex-col gap-12 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                  <div className={`relative w-full aspect-[4/3] rounded-[40px] overflow-hidden group shadow-2xl border-4 border-white`}>
                    <img 
                      src={program.image} 
                      alt={program.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03]" 
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-40 text-center">
            <Link to="/contact"
              className="inline-flex items-center gap-4 bg-[#7C3AED] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#1A1045] transition-all duration-500 shadow-xl shadow-[#7C3AED]/25 hover:scale-105"
            >
              Start the Process
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
