"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ArrowUpRight } from "lucide-react";
import { BlogPost, blogPosts } from "@/lib/blog-data";

// Simple markdown-like renderer for bold text
function renderParagraph(text: string, idx: number) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return (
    <p key={idx} className="text-lg md:text-xl text-foreground/70 leading-relaxed font-light font-sans">
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-foreground">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </p>
  );
}

export const BlogDetailContent = ({ post }: { post: BlogPost }) => {
  const related = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2);
  const fallbackRelated = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);
  const relatedPosts = related.length >= 2 ? related : fallbackRelated;

  return (
    <div className="selection:bg-foreground selection:text-background">
      {/* Sticky Nav */}
      <nav className="fixed top-0 left-0 w-full px-6 py-5 md:px-12 md:py-6 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/5 flex justify-between items-center">
        <Link href="/blog" className="inline-flex items-center gap-3 text-foreground hover:opacity-70 transition-opacity">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-foreground/20 flex items-center justify-center shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="font-serif text-base md:text-lg tracking-widest uppercase hidden sm:inline-block">Back to Journal</span>
        </Link>
        <span className="font-serif italic text-lg md:text-xl text-foreground/50">The Tender Journal</span>
      </nav>

      {/* Hero Image */}
      <div className="relative w-full h-[55vh] md:h-[70vh] lg:h-[80vh] overflow-hidden bg-foreground/5 mt-0">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
        {/* Category badge */}
        <div className="absolute top-24 left-6 md:left-12 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-foreground">
          {post.category}
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="-mt-16 md:-mt-24 relative z-10 mb-12 md:mb-16"
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter text-foreground mb-8">
            {post.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-8 border-b border-foreground/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-background font-serif font-bold text-lg shrink-0">
                {post.author.avatar}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground leading-tight">{post.author.name}</p>
                <p className="text-xs text-foreground/40 leading-tight">{post.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-5 text-xs text-foreground/40 uppercase tracking-widest font-bold sm:ml-auto">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
            </div>
          </div>
        </motion.div>

        {/* Excerpt */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl font-serif italic text-foreground/60 leading-relaxed mb-12 md:mb-16"
        >
          {post.excerpt}
        </motion.p>

        {/* Body Paragraphs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-7"
        >
          {post.body.map((para, idx) => renderParagraph(para, idx))}
        </motion.div>

        {/* End divider */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-foreground/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-foreground/30 mb-1">Written by</p>
            <p className="font-serif text-xl text-foreground">{post.author.name}</p>
            <p className="text-sm text-foreground/40">{post.author.role}</p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-foreground/20 text-sm font-bold uppercase tracking-widest hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
          >
            All Articles <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="container mx-auto px-6 md:px-12 mt-24 md:mt-32 pb-32">
          <div className="border-t border-foreground/10 pt-12 mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-tight">You might also enjoy</h2>
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
                <Link href={`/blog/${related.id}`} className="group block">
                  <div className="relative w-full aspect-4/3 rounded-[20px] overflow-hidden bg-foreground/5 mb-5">
                    <Image src={related.image} alt={related.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {related.category}
                    </div>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl leading-snug group-hover:text-primary transition-colors mb-2">{related.title}</h3>
                  <p className="text-xs text-foreground/40 uppercase tracking-widest font-bold">{related.date} · {related.readTime}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
