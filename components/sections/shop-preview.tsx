"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const previewProducts = [
  {
    id: "tc-unif-01",
    name: "Tender Premium Uniform",
    price: "₦15,000",
    image: "/images/shop-uniform.png",
    category: "Apparel"
  },
  {
    id: "tc-toy-02",
    name: "Montessori Object Permanence Box",
    price: "₦8,500",
    image: "/images/shop-montessori.png",
    category: "Developmental"
  },
  {
    id: "tc-kit-03",
    name: "Early Years Creative Kit",
    price: "₦12,000",
    image: "/images/shop-kit.png",
    category: "Learning"
  }
];

export const ShopPreviewSection = () => {
  return (
    <section id="shop-preview" className="w-full py-24 md:py-32 bg-background text-foreground border-t border-foreground/10">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-px w-16 bg-primary" />
              <span className="text-sm font-bold uppercase tracking-widest text-primary">The Boutique</span>
            </motion.div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter">
              Curated essentials.
            </h2>
          </div>
          
          <Link href="/shop" className="group hidden md:inline-flex items-center gap-4 pb-4 border-b border-foreground/20 hover:border-foreground transition-colors shrink-0">
            <span className="text-xl font-serif italic text-foreground/80 group-hover:text-foreground transition-colors">Explore the Shop</span>
            <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>

        {/* Product Grid - "Editorial Layout" instead of simple squares */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-start">
          
          {/* Main Large Product Feature (Spans 7 cols) */}
          <div className="md:col-span-12 lg:col-span-7 group cursor-pointer block">
            <Link href={`/shop/${previewProducts[0].id}`}>
              <div className="relative w-full aspect-4/5 rounded-[32px] overflow-hidden bg-foreground/5 mb-8">
                <Image 
                  src={previewProducts[0].image} 
                  alt={previewProducts[0].name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-foreground z-10">
                  {previewProducts[0].category}
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-serif text-3xl md:text-4xl group-hover:text-primary transition-colors">{previewProducts[0].name}</h3>
                <span className="text-xl md:text-2xl font-serif italic text-foreground/60">{previewProducts[0].price}</span>
              </div>
            </Link>
          </div>

          {/* Side Stacked Products (Spans 5 cols) */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-12 lg:gap-16 lg:mt-32">
            {previewProducts.slice(1).map((product) => (
              <div key={product.id} className="group cursor-pointer block">
                <Link href={`/shop/${product.id}`}>
                  <div className="relative w-full aspect-square rounded-[24px] overflow-hidden bg-foreground/5 mb-6">
                    <Image 
                      src={product.image} 
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-foreground z-10">
                      {product.category}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-serif text-2xl group-hover:text-primary transition-colors">{product.name}</h3>
                    <span className="text-lg font-serif italic text-foreground/60">{product.price}</span>
                  </div>
                </Link>
              </div>
            ))}
            
            {/* Mobile View All button */}
            <Link href="/shop" className="group md:hidden inline-flex items-center justify-between w-full mt-4 pb-4 border-b border-foreground/20 hover:border-foreground transition-colors">
              <span className="text-2xl font-serif italic text-foreground/80 group-hover:text-foreground transition-colors">Explore the Shop</span>
              <ArrowUpRight className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};
