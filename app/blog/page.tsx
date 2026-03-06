"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock, Calendar } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

const publishedPosts = blogPosts.filter((p) => p.status === "Published");
const featuredPost = publishedPosts[0];
const restPosts = publishedPosts.slice(1);

export default function BlogPage() {
  return (
    <div className="bg-background text-foreground min-h-screen pb-32 selection:bg-foreground selection:text-background">

      {/* Nav */}
      <nav className="fixed top-0 left-0 w-full px-6 py-5 md:px-12 md:py-7 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/5 flex justify-between items-center">
        <Link href="/" className="inline-flex items-center gap-4 text-foreground hover:opacity-70 transition-opacity">
          <div className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="font-serif text-lg tracking-widest uppercase hidden md:inline-block">Return Home</span>
        </Link>
        <span className="font-serif italic text-xl text-foreground/60">The Tender Journal</span>
      </nav>

      {/* Hero Header */}
      <section className="pt-36 pb-16 md:pt-48 md:pb-24 container mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-16 bg-primary" />
            <span className="text-sm font-bold uppercase tracking-widest text-primary">Resources & Insights</span>
          </div>
          <h1 className="font-serif text-6xl md:text-8xl lg:text-[9rem] leading-[0.88] tracking-tighter text-foreground max-w-5xl">
            The Tender Journal.
          </h1>
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
            <Link href={`/blog/${featuredPost.id}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center border-t border-foreground/10 pt-12">
              {/* Image */}
              <div className="relative w-full aspect-4/3 rounded-[24px] md:rounded-[40px] overflow-hidden bg-foreground/5">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
                <div className="absolute top-5 left-5 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                  {featuredPost.category}
                </div>
                <div className="absolute top-5 right-5 bg-primary/90 text-background px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  Featured
                </div>
              </div>
              {/* Content */}
              <div className="flex flex-col justify-center gap-6">
                <div className="flex items-center gap-4 text-xs text-foreground/40 uppercase tracking-widest font-bold">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{featuredPost.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featuredPost.readTime}</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-foreground/50 leading-relaxed font-light text-lg">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-background font-serif font-bold">
                    {featuredPost.author.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{featuredPost.author.name}</p>
                    <p className="text-xs text-foreground/40">{featuredPost.author.role}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground/40 group-hover:text-primary transition-colors">
                    Read <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </section>
      )}

      {/* All Articles Grid */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="border-t border-foreground/10 pt-12 mb-12">
          <h2 className="font-serif text-2xl text-foreground/50 tracking-tight">More Articles</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {blogPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/blog/${post.id}`} className="group block">
                <div className="relative w-full aspect-4/3 rounded-[20px] overflow-hidden bg-foreground/5 mb-5">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    {post.category}
                  </div>
                  {post.status === "Draft" && (
                    <div className="absolute top-4 right-4 bg-foreground/80 text-background px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      Draft
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-foreground/40 uppercase tracking-widest font-bold mb-3">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl leading-snug mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-foreground/50 text-sm leading-relaxed font-light line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground/30 group-hover:text-primary transition-colors">
                  Read Article <ArrowUpRight className="w-3 h-3" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
