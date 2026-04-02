
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import { Link } from "react-router-dom";
import { Play, Maximize2, Sparkles, Loader2 } from "lucide-react";
import { getGalleryImages, GalleryImage } from "@/lib/api/gallery";

export const GalleryPageContent = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  // Extract unique categories from images
  const categories = ["All", ...Array.from(new Set(images.map(img => img.category).filter(Boolean)))];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const data = await getGalleryImages();
        setImages(data);
      } catch (error) {
        console.error("Failed to load gallery images:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  // Filter images by category
  const filteredImages = selectedCategory === "All" 
    ? images 
    : images.filter(img => img.category === selectedCategory);

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
      {categories.length > 1 && (
        <div className="sticky top-[80px] md:top-[120px] left-0 w-full z-40 bg-white/80 backdrop-blur-md border-y border-[#1A1045]/5 py-4 overflow-x-auto no-scrollbar shadow-sm transition-all duration-300">
          <div className="container mx-auto px-6 md:px-12 flex justify-start md:justify-center gap-3 md:gap-4 whitespace-nowrap">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  selectedCategory === cat 
                    ? 'bg-[#1A1045] text-white shadow-md -translate-y-0.5' 
                    : 'bg-[#F8FAFC] text-[#1A1045]/60 hover:bg-[#E0F2FE] hover:text-[#0284C7] hover:-translate-y-0.5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <section className="w-full py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-6 md:px-12">
          {isLoading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="w-12 h-12 text-[#0284C7] animate-spin" />
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-32">
              <div className="w-24 h-24 rounded-full bg-[#F8FAFC] border-2 border-[#1A1045]/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-12 h-12 text-[#1A1045]/20" />
              </div>
              <h3 className="text-2xl font-serif text-[#1A1045] mb-3">No images yet</h3>
              <p className="text-[#1A1045]/60">Check back soon for beautiful moments from our facility!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
              {filteredImages.map((img, index) => {
                // Alternate border colors for playful look
                const borderColors = [
                  'border-[#FF6B9D]', // Pink
                  'border-[#4ECDC4]', // Turquoise
                  'border-[#FFD93D]', // Yellow
                  'border-[#95E1D3]', // Mint
                  'border-[#F38181]', // Coral
                  'border-[#AA96DA]', // Purple
                ];
                const borderColor = borderColors[index % borderColors.length];
                
                // Alternate slight rotations for playful scattered look
                const rotations = ['rotate-[-2deg]', 'rotate-[1deg]', 'rotate-[-1deg]', 'rotate-[2deg]', 'rotate-[0deg]'];
                const rotation = rotations[index % rotations.length];
                
                return (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    className={`group relative ${rotation} hover:rotate-0 transition-all duration-300`}
                  >
                    {/* Card with thick colorful border */}
                    <div className={`relative bg-white rounded-[32px] border-[6px] ${borderColor} shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.15)] transition-all duration-300 overflow-hidden group-hover:scale-105 group-hover:-translate-y-2`}>
                      
                      {/* Image Container */}
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <img 
                          src={img.image} 
                          alt={img.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        
                        {/* Playful gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Expand button - playful style */}
                        <button 
                          onClick={() => setLightboxImage(img)}
                          className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-[#1A1045] transform translate-y-[-100px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:rotate-12 active:scale-95"
                        >
                          <Maximize2 className="w-5 h-5" />
                        </button>

                        {/* Category badge - sticker style */}
                        {img.category && (
                          <div className="absolute top-4 left-4 transform -rotate-12">
                            <div className="relative">
                              {/* Sticker shadow */}
                              <div className="absolute inset-0 bg-black/20 rounded-full blur-sm translate-y-1" />
                              {/* Sticker */}
                              <span className="relative block px-4 py-2 bg-white rounded-full text-[11px] font-black uppercase tracking-wider text-[#1A1045] shadow-md border-2 border-[#1A1045]/10">
                                {img.category}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content area with playful styling */}
                      <div className="p-6 bg-white relative">
                        {/* Decorative dots */}
                        <div className="absolute top-2 right-6 flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-[#FFD93D]" />
                          <div className="w-2 h-2 rounded-full bg-[#4ECDC4]" />
                          <div className="w-2 h-2 rounded-full bg-[#FF6B9D]" />
                        </div>

                        <h3 className="font-serif text-2xl tracking-tight text-[#1A1045] leading-tight mb-2 group-hover:text-[#FF6B9D] transition-colors">
                          {img.title}
                        </h3>
                        {img.description && (
                          <p className="text-base text-[#1A1045]/70 leading-relaxed line-clamp-2">
                            {img.description}
                          </p>
                        )}

                        {/* Playful bottom decoration */}
                        <div className="mt-4 flex gap-2">
                          <div className="flex-1 h-1 bg-gradient-to-r from-[#FF6B9D] to-transparent rounded-full" />
                          <div className="flex-1 h-1 bg-gradient-to-r from-[#4ECDC4] to-transparent rounded-full" />
                        </div>
                      </div>
                    </div>

                    {/* Floating sparkles on hover */}
                    <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <Sparkles className="w-6 h-6 text-[#FFD93D] animate-pulse" />
                    </div>
                    <div className="absolute -bottom-2 -left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none delay-100">
                      <Sparkles className="w-5 h-5 text-[#4ECDC4] animate-pulse" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Virtual Tour Teaser */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-[40px] overflow-hidden group shadow-2xl border border-[#1A1045]/5">
            <img 
              src="/images/child_11.avif" 
              alt="Virtual Tour" 
              className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105" 
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

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          >
            <Maximize2 className="w-6 h-6" />
          </button>
          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <img 
              src={lightboxImage.image} 
              alt={lightboxImage.title}
              className="w-full h-auto max-h-[85vh] object-contain rounded-2xl"
            />
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-serif text-white mb-2">{lightboxImage.title}</h3>
              {lightboxImage.description && (
                <p className="text-white/70">{lightboxImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
