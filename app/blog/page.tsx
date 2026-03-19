"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock, Calendar, Sparkles } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

const publishedPosts = blogPosts.filter((p) => p.status === "Published");
const featuredPost = publishedPosts[0];
const restPosts = publishedPosts.slice(1);

export default function BlogPage() {
  return (
    <div className="bg-[#F8FAFC] text-foreground min-h-screen pb-32">

      {/* Elegant navigation */}
      <nav className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-10 z-50 pointer-events-none">
        <Link href="/" className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-[#1A1045]/5 pointer-events-auto hover:-translate-y-1 transition-all group">
          <div className="w-8 h-8 rounded-full bg-[#FCE7F3] flex items-center justify-center group-hover:bg-[#FBCFE8] transition-colors">
            <ArrowLeft className="w-4 h-4 text-[#BE185D]" />
          </div>
          <span className="font-bold text-[#1A1045] uppercase tracking-widest text-xs hidden md:inline-block">Return Home</span>
        </Link>
      </nav>

      {/* Hero Header */}
      <section className="pt-36 pb-16 md:pt-48 md:pb-24 container mx-auto px-6 md:px-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center relative">
          
          {/* Subtle Background Blobs */}
          <div className="absolute top-0 right-[20%] w-72 h-72 bg-[#FCE7F3] rounded-full opacity-60 blur-3xl pointer-events-none -translate-y-1/2" />
          <div className="absolute top-1/2 left-[20%] w-64 h-64 bg-[#DBEAFE] rounded-full opacity-50 blur-2xl pointer-events-none" />

          <div className="flex justify-center items-center gap-3 mb-8 relative z-10">
            <div className="h-px w-12 bg-[#BE185D]/30" />
            <span className="inline-block px-4 py-2 bg-white text-[#BE185D] font-bold uppercase tracking-widest text-[10px] rounded-full border border-[#1A1045]/5 shadow-sm">
              Resources & Insights
            </span>
            <div className="h-px w-12 bg-[#BE185D]/30" />
          </div>
          <h1 className="relative z-10 font-serif text-5xl md:text-7xl lg:text-[8rem] leading-[0.9] tracking-tighter text-[#1A1045] mb-6">
            The Tender <span className="text-[#BE185D] relative inline-block">Journal
               <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                  <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#FCE7F3" strokeWidth="6" fill="none" strokeLinecap="round"/>
                </svg>
            </span>.
          </h1>
          <p className="relative z-10 text-xl text-[#1A1045]/60 font-serif italic max-w-2xl mx-auto">
            Reflections on early childhood, parenting tips, and magical moments from our classrooms.
          </p>
        </motion.div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="container mx-auto px-6 md:px-12 mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <Link href={`/blog/${featuredPost.id}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center bg-white p-6 md:p-8 rounded-[40px] shadow-2xl border border-[#1A1045]/5 hover:shadow-3xl transition-shadow duration-500">
              {/* Image */}
              <div className="relative w-full aspect-[4/3] rounded-[30px] overflow-hidden bg-[#F8FAFC]">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                  priority
                />
                <div className="absolute inset-0 bg-[#1A1045]/5 group-hover:bg-transparent transition-colors duration-500" />
                
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1A1045] shadow-sm">
                  {featuredPost.category}
                </div>
                <div className="absolute top-6 right-6 bg-[#BE185D] text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Featured
                </div>
              </div>
              
              {/* Content */}
              <div className="flex flex-col justify-center gap-6 lg:pr-8 lg:py-8">
                <div className="flex items-center gap-4 text-[10px] text-[#1A1045]/60 uppercase tracking-widest font-bold bg-[#F8FAFC] self-start px-4 py-2 rounded-full border border-[#1A1045]/5">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{featuredPost.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featuredPost.readTime}</span>
                </div>
                
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tighter text-[#1A1045] group-hover:text-[#BE185D] transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-[#1A1045]/70 leading-relaxed font-serif italic text-lg md:text-xl">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#1A1045]/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#DBEAFE] flex items-center justify-center text-[#1D4ED8] font-serif text-xl overflow-hidden shadow-inner">
                      {featuredPost.author.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#1A1045]">{featuredPost.author.name}</p>
                      <p className="text-[10px] text-[#1A1045]/50 font-bold tracking-widest uppercase">{featuredPost.author.role}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-white border border-[#1A1045]/10 text-[#1A1045] rounded-full flex items-center justify-center shadow-sm group-hover:bg-[#1A1045] group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </section>
      )}

      {/* All Articles Grid */}
      <section className="w-full bg-white py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1045] tracking-tighter relative inline-block">
              More Stories
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {restPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/blog/${post.id}`} className="group block bg-[#F8FAFC] p-4 rounded-[40px] shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col border border-[#1A1045]/5">
                  <div className="relative w-full aspect-[4/3] rounded-[30px] overflow-hidden bg-white mb-6">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-[#1A1045]/5 group-hover:bg-transparent transition-colors duration-500" />
                    
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest text-[#1A1045] shadow-sm">
                      {post.category}
                    </div>
                  </div>
                  
                  <div className="px-4 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-[9px] text-[#1A1045]/50 uppercase tracking-widest font-bold mb-4">
                      <span>{post.date}</span>
                      <span className="text-[#1A1045]/20">|</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="font-serif text-2xl leading-snug mb-4 group-hover:text-[#3B82F6] transition-colors text-[#1A1045] tracking-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-[#1A1045]/60 text-sm leading-relaxed font-serif italic line-clamp-3 mb-6 flex-grow">
                      {post.excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between w-full pt-4 border-t border-[#1A1045]/10">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/50 group-hover:text-[#1A1045] transition-colors">Read Article</span>
                      <ArrowUpRight className="w-4 h-4 text-[#1A1045]/30 group-hover:text-[#1A1045] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
