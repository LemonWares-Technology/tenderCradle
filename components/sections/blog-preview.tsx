
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Sparkles, 
  Pencil, 
  Lightbulb, 
  Brain, 
  Star,
  Loader2
} from "lucide-react";
import { getBlogs, Blog } from "@/lib/api/blog";

// Different colors for each card's accent
const cardThemes = [
  { 
    bg: "#DBEAFE", 
    color: "#2563EB", 
    border: "#93C5FD", 
    sticker: "#60A5FA",
    rotation: -1.5 
  },
  { 
    bg: "#FEF9C3", 
    color: "#CA8A04", 
    border: "#FDE047", 
    sticker: "#FACC15",
    rotation: 2 
  },
  { 
    bg: "#DCFCE7", 
    color: "#16A34A", 
    border: "#86EFAC", 
    sticker: "#4ADE80",
    rotation: -2.5 
  },
];

export const BlogPreviewSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data.slice(0, 3));
      } catch (err: any) {
        setError(err.message || "Failed to load blog posts");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (isLoading && blogs.length === 0) {
    return (
      <section className="py-24 bg-[#F5F3FF] flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
      </section>
    );
  }

  return (
    <section className="relative w-full py-24 md:py-40 bg-[#F5F3FF] text-[#1A1045] overflow-hidden">
      
      {/* Decorative Floating "Stickers" */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 left-[5%] text-blue-400/20 pointer-events-none"
      >
        <BookOpen size={90} strokeWidth={1} />
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-40 right-[8%] text-amber-400/20 pointer-events-none"
      >
        <Pencil size={80} strokeWidth={1} />
      </motion.div>
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-40 left-[10%] text-emerald-400/20 pointer-events-none"
      >
        <Lightbulb size={100} strokeWidth={1} />
      </motion.div>
      <motion.div 
        animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-20 right-[15%] text-purple-400/20 pointer-events-none"
      >
        <Brain size={70} strokeWidth={1} />
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 md:mb-32">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 bg-white px-5 py-2 rounded-full mb-8 border-4 border-[#7C3AED] shadow-[4px_4px_0px_#7C3AED]"
            >
              <BookOpen className="w-5 h-5 text-[#7C3AED]" />
              <span className="text-sm font-black uppercase tracking-widest text-[#7C3AED]">Learning Hub</span>
            </motion.div>
            
            <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl leading-[0.8] tracking-tighter text-[#1A1045] mb-6">
              From our{" "}
              <span className="relative inline-block text-purple-600">
                Experts
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 12" fill="none">
                  <path d="M2 8 Q25 2 50 8 Q75 14 98 8" stroke="#DDD6FE" strokeWidth="8" strokeLinecap="round"/>
                </svg>
              </span>
              .
            </h2>
          </div>
          <Link to="/blog"
            className="group relative inline-flex items-center gap-4 bg-purple-600 text-white px-10 py-5 rounded-[24px] font-black uppercase tracking-widest text-sm hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_0px_#5B21B6] hover:shadow-[0_14px_0px_#5B21B6]"
          >
            <span className="font-serif italic capitalize text-lg">See All Posts</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 text-red-600 p-8 rounded-[40px] text-center mb-16 border border-red-100">
            {error}
          </div>
        )}

        {/* Article Grid - Kiddidy Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {blogs.map((article, idx) => {
            const theme = cardThemes[idx % 3];
            const date = new Date(article.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
            const wordsPerMinute = 200;
            const words = article.content ? article.content.split(/\s+/).length : 0;
            const readTime = `${Math.ceil(words / wordsPerMinute)} min read`;
            const category = article.tags && article.tags.length > 0 ? article.tags[0] : "Education";

            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1, type: "spring", bounce: 0.4 }}
                className="group relative h-full"
                style={{ rotate: `${theme.rotation}deg` }}
              >
                {/* Thick "Sticker" Shadow Effect */}
                <div className="absolute inset-0 rounded-[50px] bg-white border-[12px] border-white shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]" />
                
                <Link to={`/blog/${article.id}`} className="relative h-full flex flex-col p-2 z-10">
                  <div 
                    className="relative rounded-[40px] h-full flex flex-col p-8 border-4 transition-colors duration-500"
                    style={{ backgroundColor: theme.bg, borderColor: theme.border }}
                  >
                    
                    {/* Thumbnail "Sticker" */}
                    <div className="w-full aspect-[4/3] rounded-[30px] overflow-hidden relative mb-8 border-4 border-white shadow-lg">
                      <img 
                        src={article.image}
                        alt={article.title}
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      
                      {/* Category Tag Sticker */}
                      <div 
                        className="absolute top-4 left-4 text-white px-4 py-2 rounded-xl z-20 font-black uppercase tracking-tighter text-[10px] border-4 border-white shadow-md rotate-[-6deg]"
                        style={{ backgroundColor: theme.sticker }}
                      >
                        {category}
                        <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-white" />
                      </div>

                      {/* Read More Bubble */}
                      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-transparent group-hover:border-purple-500 transition-all duration-500 z-30 group-hover:scale-110">
                        <ArrowRight className="w-8 h-8 text-purple-600 group-hover:rotate-45 transition-transform" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-[#1A1045]/40">{date}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
                        <span className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-[#1A1045]/40">{readTime}</span>
                      </div>

                      <h3 className="font-serif text-3xl font-black mb-4 text-[#1A1045] leading-none uppercase line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-base md:text-lg text-[#1A1045]/70 leading-snug font-serif italic line-clamp-3 mb-8">
                        {article.excerpt}
                      </p>

                      <div className="mt-auto flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm border-2"
                          style={{ borderColor: theme.border }}
                        >
                          <Star className="w-5 h-5" style={{ color: theme.color }} />
                        </div>
                        <span className="text-xs md:text-sm font-black uppercase tracking-widest text-[#1A1045]/60 hover:text-purple-600 transition-colors">
                          Open Treasure
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
