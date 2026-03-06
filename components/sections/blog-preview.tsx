"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

const articles = blogPosts.filter((p) => p.status === "Published").slice(0, 3);

export const BlogPreviewSection = () => {
  return (
    <section className="w-full py-24 md:py-32 bg-background text-foreground border-t border-foreground/10">
      <div className="container mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-px w-16 bg-primary" />
              <span className="text-sm font-bold uppercase tracking-widest text-primary">Resources</span>
            </motion.div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter">
              From our experts.
            </h2>
          </div>
          <Link
            href="/blog"
            className="group hidden md:inline-flex items-center gap-4 pb-4 border-b border-foreground/20 hover:border-foreground transition-colors shrink-0"
          >
            <span className="text-xl font-serif italic text-foreground/80 group-hover:text-foreground transition-colors">All Articles</span>
            <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {articles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/blog/${article.id}`} className="group block">
                {/* Real image */}
                <div className="w-full aspect-4/3 rounded-[20px] bg-foreground/5 mb-6 overflow-hidden relative">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <span className="absolute top-4 left-4 inline-block bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-foreground z-10">
                    {article.category}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-foreground/40 font-sans uppercase tracking-widest mb-4">
                  <span>{article.date}</span>
                  <span>·</span>
                  <span>{article.readTime}</span>
                </div>

                {/* Title + excerpt */}
                <h3 className="font-serif text-2xl md:text-[1.6rem] leading-snug mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-foreground/50 leading-relaxed font-light text-sm line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Read more */}
                <div className="mt-5 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground/40 group-hover:text-primary transition-colors">
                  Read Article <ArrowUpRight className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile link */}
        <div className="mt-12 md:hidden">
          <Link href="/blog" className="group inline-flex items-center gap-3 text-lg font-serif italic text-foreground/70 hover:text-foreground border-b border-foreground/20 pb-4 transition-colors">
            All Articles <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
