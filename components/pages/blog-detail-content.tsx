"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ArrowUpRight } from "lucide-react";
import { BlogPost, blogPosts } from "@/lib/blog-data";

export const BlogDetailContent = ({ post }: { post: BlogPost }) => {
  const related = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2);
  const fallbackRelated = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);
  const relatedPosts = related.length >= 2 ? related : fallbackRelated;

  return (
    <div className="bg-white min-h-screen pb-32">
      {/* Elegant Nav */}
      <nav className="fixed top-0 left-0 w-full px-6 py-5 md:px-12 md:py-8 z-50 bg-white/80 backdrop-blur-md border-b border-[#1A1045]/5 flex justify-between items-center transition-all">
        <Link href="/blog" className="inline-flex items-center gap-3 text-[#1A1045] hover:text-[#BE185D] transition-colors group">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#1A1045]/10 flex items-center justify-center group-hover:border-[#FCE7F3] group-hover:bg-[#FCE7F3]">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="font-bold text-xs uppercase tracking-widest hidden sm:inline-block">Back to Journal</span>
        </Link>
      </nav>

      {/* Hero Image */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-[#F8FAFC] mt-0">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1045]/60 to-transparent" />
        <div className="absolute inset-0 bg-[#0F0928]/10 mix-blend-overlay" />
        
        {/* Category badge floating on bottom left of hero */}
        <div className="absolute bottom-12 left-6 md:bottom-16 md:left-12 lg:left-[50%] lg:-translate-x-[50%] lg:w-full lg:max-w-4xl lg:px-6">
          <div className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1A1045] shadow-lg inline-block mb-6">
            {post.category}
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tighter text-white mb-6 md:mb-0 max-w-4xl drop-shadow-lg">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-6 md:px-12 max-w-4xl -mt-6 relative z-20">
        {/* Meta row card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white p-6 md:p-8 rounded-[30px] shadow-xl border border-[#1A1045]/5 flex flex-col sm:flex-row flex-wrap items-center gap-x-12 gap-y-6 justify-between mb-16"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#FCE7F3] flex items-center justify-center text-[#BE185D] font-serif font-black text-xl shadow-inner">
              {post.author.avatar}
            </div>
            <div>
              <p className="text-lg font-bold text-[#1A1045]">{post.author.name}</p>
              <p className="text-[10px] text-[#1A1045]/50 font-bold tracking-widest uppercase">{post.author.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-6 text-[10px] text-[#1A1045]/60 uppercase tracking-widest font-bold">
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#1A1045]/30" />{post.date}</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#1A1045]/30" />{post.readTime}</span>
          </div>
        </motion.div>

        {/* Excerpt */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-serif italic text-[#1A1045] leading-relaxed mb-16 text-center md:text-left border-l-4 border-[#BE185D] pl-8 py-2"
        >
          "{post.excerpt}"
        </motion.p>

        {/* Body Paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8 text-lg font-serif italic md:text-xl text-[#1A1045]/80 leading-relaxed max-w-3xl mx-auto"
        >
          {post.body.map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </motion.div>

        {/* End divider & author bio summary */}
        <div className="max-w-3xl mx-auto mt-24 pt-12 border-t border-[#1A1045]/10 flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left mb-24">
          <div className="flex items-center gap-6">
             <div className="w-16 h-16 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#1D4ED8] font-serif text-2xl shadow-inner">
                {post.author.avatar}
              </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1045]/40 mb-1">Written by</p>
              <p className="font-serif text-2xl text-[#1A1045]">{post.author.name}</p>
            </div>
          </div>
          <Link
             href="/blog"
             className="group inline-flex items-center gap-3 bg-[#F8FAFC] text-[#1A1045] px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs transition-colors hover:bg-[#1A1045] hover:text-white border border-[#1A1045]/10"
           >
             <span>All Articles</span>
             <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
           </Link>
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-[#F8FAFC] py-32 px-6 md:px-12 border-t border-[#1A1045]/5">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-[#1A1045] tracking-tighter">Keep Reading</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {relatedPosts.map((related, idx) => (
                <motion.div
                  key={related.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link href={`/blog/${related.id}`} className="group block bg-white p-4 rounded-[40px] shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-[#1A1045]/5">
                    <div className="relative w-full aspect-[4/3] rounded-[30px] overflow-hidden bg-[#F8FAFC] mb-6">
                      <Image src={related.image} alt={related.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-[1.05]" />
                      <div className="absolute inset-0 bg-[#1A1045]/5 group-hover:bg-transparent transition-colors duration-500" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-[#1A1045] shadow-sm">
                        {related.category}
                      </div>
                    </div>
                    <div className="px-4">
                       <div className="flex items-center gap-3 text-[9px] text-[#1A1045]/50 uppercase tracking-widest font-bold mb-3">
                         <span>{related.date}</span>
                         <span className="text-[#1A1045]/20">|</span>
                         <span>{related.readTime}</span>
                       </div>
                       <h3 className="font-serif text-2xl leading-snug group-hover:text-[#BE185D] transition-colors mb-4 text-[#1A1045] tracking-tight">{related.title}</h3>
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
