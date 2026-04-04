
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, ArrowUpRight } from "lucide-react";
import { BlogPost, blogPosts } from "@/lib/blog-data";

export const BlogDetailContent = ({ post }: { post: BlogPost }) => {
  const related = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);
  const fallbackRelated = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);
  const relatedPosts = related.length >= 3 ? related : fallbackRelated;

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Back Button - Fixed */}
      <div className="fixed top-24 left-6 md:left-12 z-50">
        <Link to="/blog" className="inline-flex items-center gap-3 text-[#1A1045] hover:text-[#BE185D] transition-colors group bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-[#1A1045]/10">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-xs uppercase tracking-widest hidden sm:inline-block">Back</span>
        </Link>
      </div>

      {/* Hero Section - Consistent Style */}
      <section className="relative w-full min-h-[70vh] flex items-center pb-16 overflow-hidden pt-40 bg-white">
        {/* Organic blob shapes */}
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-[#FCE7F3] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-50 blur-3xl" />
        <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] bg-[#DBEAFE] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-50 blur-3xl" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center items-center gap-4 mb-8">
            <div className="h-px w-16 bg-[#BE185D]" />
            <span className="text-sm font-bold uppercase tracking-widest text-[#BE185D]">{post.category}</span>
            <div className="h-px w-16 bg-[#BE185D]" />
          </motion.div>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tighter text-[#1A1045] mb-8">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center justify-center gap-6 text-xs text-[#1A1045]/60 uppercase tracking-widest font-bold mb-8">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" />{post.date}</span>
            <span>·</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" />{post.readTime}</span>
          </div>

          {/* Author */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#1D4ED8] font-serif text-xl shadow-inner">
              {post.author.avatar}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-[#1A1045]">{post.author.name}</p>
              <p className="text-xs text-[#1A1045]/50 font-bold tracking-widest uppercase">{post.author.role}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="container mx-auto px-6 md:px-12 max-w-5xl -mt-16 relative z-20 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full aspect-[16/9] rounded-[40px] overflow-hidden shadow-2xl border-8 border-white"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </section>

      {/* Article Content */}
      <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-20 bg-white py-16 rounded-[40px] shadow-xl mb-16">
        {/* Excerpt */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-serif italic text-[#1A1045] leading-relaxed mb-12 border-l-4 border-[#BE185D] pl-8 py-2"
        >
          "{post.excerpt}"
        </motion.p>

        {/* Body Paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8 text-lg font-serif italic md:text-xl text-[#1A1045]/80 leading-relaxed"
        >
          {post.body && Array.isArray(post.body) ? (
            post.body.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))
          ) : (
            <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
          )}
        </motion.div>

        {/* Author Bio at End */}
        <div className="mt-16 pt-12 border-t border-[#1A1045]/10 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#1D4ED8] font-serif text-2xl shadow-inner">
              {post.author.avatar}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#1A1045]/40 mb-1">Written by</p>
              <p className="font-serif text-2xl text-[#1A1045]">{post.author.name}</p>
            </div>
          </div>
          <Link
            to="/blog"
            className="group inline-flex items-center gap-3 bg-[#F8FAFC] text-[#1A1045] px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-colors hover:bg-[#1A1045] hover:text-white border border-[#1A1045]/10"
          >
            <span>All Articles</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Related Articles - Using Blog Page Card Style */}
      {relatedPosts.length > 0 && (
        <section className="w-full bg-white py-24 md:py-32">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tighter text-[#1A1045] mb-4">
                Keep <span className="text-[#BE185D]">Reading</span>
              </h2>
              <p className="text-xl text-[#1A1045]/60 font-serif italic">
                More stories from our journal
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto">
              {relatedPosts.map((related, idx) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link 
                    to={`/blog/${related.id}`} 
                    className="group block bg-[#F8FAFC] p-4 rounded-[40px] shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col border border-[#1A1045]/5"
                  >
                    <div className="relative w-full aspect-[4/3] rounded-[30px] overflow-hidden bg-white mb-6">
                      <img 
                        src={related.image} 
                        alt={related.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.05]" 
                      />
                      <div className="absolute inset-0 bg-[#1A1045]/5 group-hover:bg-transparent transition-colors duration-500" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-[#1A1045] shadow-sm">
                        {related.category}
                      </div>
                    </div>
                    <div className="px-4 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-[9px] text-[#1A1045]/50 uppercase tracking-widest font-bold mb-4">
                        <span>{related.date}</span>
                        <span className="text-[#1A1045]/20">|</span>
                        <span>{related.readTime}</span>
                      </div>
                      <h3 className="font-serif text-2xl leading-snug mb-4 group-hover:text-[#3B82F6] transition-colors text-[#1A1045] tracking-tight">
                        {related.title}
                      </h3>
                      <p className="text-[#1A1045]/60 text-sm leading-relaxed font-serif italic line-clamp-3 mb-6 flex-grow">
                        {related.excerpt}
                      </p>
                      <div className="mt-auto flex items-center justify-between w-full pt-4 border-t border-[#1A1045]/10">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/50 group-hover:text-[#1A1045] transition-colors">
                          Read Article
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-[#1A1045]/30 group-hover:text-[#1A1045] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
