
import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import { Link } from "react-router-dom";
import { Play, Maximize2, Sparkles } from "lucide-react";

const categories = ["All", "Classrooms", "Outdoor", "Activities", "Nutrition"];

const galleryImages = [
  { src: "/images/hero-1.png", category: "Activities", title: "Creative Arts Hour" },
  { src: "/images/gallery-1.png", category: "Outdoor", title: "Nature Discovery" },
  { src: "/images/about-2.png", category: "Activities", title: "Collaborative Play" },
  { src: "/images/hero-2.png", category: "Classrooms", title: "Reading Corner" },
  { src: "/images/gallery-2.png", category: "Activities", title: "Sensory Exploration" },
  { src: "/images/about-1.png", category: "Classrooms", title: "Montessori Workspace" },
];

export const GalleryPageContent = () => {
  return (
    <div className="bg-[#F8FAFC] text-foreground pb-32 overflow-hidden">

      {/* Hero */}
      <section className="relative w-full min-h-[50vh] flex items-center pb-16 overflow-hidden pt-40 bg-white">
        {/* Soft Background Environments */}
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[#E0F2FE] rounded-full opacity-40 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[0%] right-[5%] w-[400px] h-[400px] bg-[#FCE7F3] rounded-full opacity-40 blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center items-center gap-4 mb-8">
            <div className="h-px w-16 bg-[#0284C7]" />
            <span className="text-sm font-bold uppercase tracking-widest text-[#0284C7]">Our Little World</span>
            <div className="h-px w-16 bg-[#0284C7]" />
          </motion.div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-[8rem] leading-[0.9] text-[#1A1045] max-w-5xl tracking-tighter mx-auto mb-6">
            The <span className="text-[#E11D48] relative inline-block">Joy
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#FCE7F3" strokeWidth="6" fill="none" strokeLinecap="round"/>
              </svg>
            </span> <br />in Every Frame.
          </h1>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-[80px] md:top-[120px] left-0 w-full z-40 bg-white/80 backdrop-blur-md border-y border-[#1A1045]/5 py-4 overflow-x-auto no-scrollbar shadow-sm transition-all duration-300">
        <div className="container mx-auto px-6 md:px-12 flex justify-start md:justify-center gap-3 md:gap-4 whitespace-nowrap">
          {categories.map((cat, idx) => (
            <button 
              key={cat}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${idx === 0 ? 'bg-[#1A1045] text-white shadow-md -translate-y-0.5' : 'bg-[#F8FAFC] text-[#1A1045]/60 hover:bg-[#E0F2FE] hover:text-[#0284C7] hover:-translate-y-0.5'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <section className="w-full py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {galleryImages.map((img, index) => (
              <motion.div
                key={`${img.src}-${index}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative flex flex-col bg-white rounded-[40px] border border-[#1A1045]/5 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="relative aspect-[4/5] rounded-t-[40px] overflow-hidden">
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]" 
                  />
                  <div className="absolute inset-0 bg-[#1A1045]/5 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                  
                  {/* Action Icons */}
                  <div className="absolute top-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-[#1A1045]/5 flex items-center justify-center text-[#1A1045] shadow-lg hover:bg-[#3B82F6] hover:text-white transition-all">
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="px-8 pb-8 pt-6">
                  <span className="inline-block px-3 py-1 bg-[#FCE7F3] text-[#BE185D] rounded-full text-[10px] font-bold uppercase tracking-widest mb-3 border border-[#FBCFE8] shadow-sm">{img.category}</span>
                  <h3 className="font-serif text-2xl tracking-tighter text-[#1A1045] leading-none group-hover:text-[#3B82F6] transition-colors">{img.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour Teaser */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-[40px] overflow-hidden group shadow-2xl border border-[#1A1045]/5">
            <img 
              src="/images/hero-1.png" 
              alt="Virtual Tour" 
              className="object-cover transition-transform duration-[2000ms] group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1045]/80 via-[#1A1045]/30 to-transparent transition-all duration-1000 group-hover:opacity-80" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center mb-8 shadow-2xl border border-white/40 cursor-pointer group-hover:bg-[#FCE7F3] group-hover:text-[#BE185D] group-hover:border-transparent transition-all duration-500"
              >
                <Play className="w-8 h-8 md:w-12 md:h-12 fill-current translate-x-1" />
              </motion.div>
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tighter text-white mb-6 drop-shadow-md">
                Virtual Tour <br/>
                <span className="text-[#FCE7F3] italic font-bold">2026.</span>
              </h2>
              <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full shadow-sm">
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#1A1045] flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-[#BE185D]" />
                  Opening soon — Stay tuned
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
