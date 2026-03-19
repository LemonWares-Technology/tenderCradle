"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Gift, 
  ShoppingCart, 
  Sparkles, 
  Star, 
  ShoppingBag,
  Heart
} from "lucide-react";

const previewProducts = [
  {
    id: "tc-unif-01",
    name: "Tender Premium Uniform",
    price: "₦15,000",
    image: "/images/shop-uniform.png",
    category: "Apparel",
    rotation: -1.5,
    accent: "#60A5FA"
  },
  {
    id: "tc-toy-02",
    name: "Montessori Object Box",
    price: "₦8,500",
    image: "/images/shop-montessori.png",
    category: "Developmental",
    rotation: 2.5,
    accent: "#F472B6"
  },
  {
    id: "tc-kit-03",
    name: "Creative Learning Kit",
    price: "₦12,000",
    image: "/images/shop-kit.png",
    category: "Learning",
    rotation: -2,
    accent: "#4ADE80"
  }
];

export const ShopPreviewSection = () => {
  return (
    <section id="shop-preview" className="relative w-full py-24 md:py-40 bg-[#FEF9C3] text-[#1A1045] overflow-hidden">
      
      {/* Background Decorations (Stickers) */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-20 left-[5%] text-orange-400/20 pointer-events-none"
      >
        <Gift size={100} strokeWidth={1} />
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-40 right-[8%] text-blue-400/20 pointer-events-none"
      >
        <ShoppingBag size={80} strokeWidth={1} />
      </motion.div>
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-40 left-[10%] text-pink-400/20 pointer-events-none"
      >
        <Star size={90} strokeWidth={1} />
      </motion.div>
      <motion.div 
        animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-20 right-[15%] text-emerald-400/20 pointer-events-none"
      >
        <Sparkles size={70} strokeWidth={1} />
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 md:mb-32">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 bg-white px-5 py-2 rounded-full mb-8 border-4 border-[#F59E0B] shadow-[4px_4px_0px_#F59E0B]"
            >
              <Gift className="w-5 h-5 text-[#F59E0B]" />
              <span className="text-sm font-black uppercase tracking-widest text-[#F59E0B]">Little Treasures</span>
            </motion.div>
            
            <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl leading-[0.8] tracking-tighter">
              Curated{" "}
              <span className="relative inline-block text-blue-600">
                essentials
                <svg className="absolute -bottom-2 left-0 w-full font-bold" viewBox="0 0 100 12" fill="none">
                  <path d="M2 8 Q25 2 50 8 Q75 14 98 8" stroke="#BFDBFE" strokeWidth="8" strokeLinecap="round"/>
                </svg>
              </span>
              .
            </h2>
          </div>
          
          <Link href="/shop" className="group relative inline-flex items-center gap-4 bg-blue-600 text-white px-8 py-5 rounded-[24px] font-black uppercase tracking-widest text-sm hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_0px_#1E40AF] hover:shadow-[0_14px_0px_#1E40AF]">
            <span className="font-serif italic capitalize text-lg">Visit the Shop</span>
            <ShoppingCart className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          </Link>
        </div>

        {/* Product Grid - "Kiddidy" Bubble Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 lg:gap-20 items-start">
          
          {/* Main Large Product Feature (Spans 7 cols) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-12 lg:col-span-7 group cursor-pointer block"
            style={{ rotate: `${previewProducts[0].rotation}deg` }}
          >
            <Link href={`/shop/${previewProducts[0].id}`}>
              <div className="relative w-full aspect-4/5 rounded-[50px] overflow-visible bg-white mb-10 border-[10px] border-white shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="absolute inset-0 rounded-[40px] overflow-hidden">
                  <Image 
                    src={previewProducts[0].image} 
                    alt={previewProducts[0].name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                
                {/* Product Badge */}
                <div className="absolute -top-6 -left-6 bg-orange-400 text-white px-6 py-3 rounded-2xl shadow-lg rotate-[-12deg] z-20 flex items-center gap-2 border-4 border-white">
                  <Star className="w-4 h-4 fill-white" />
                  <span className="text-xs font-black uppercase tracking-widest">{previewProducts[0].category}</span>
                </div>

                {/* Floating Heart Decor */}
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }} 
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -bottom-8 -right-8 w-20 h-20 bg-pink-400 rounded-full flex items-center justify-center border-4 border-white shadow-lg rotate-12"
                >
                  <Heart className="w-10 h-10 text-white fill-white" />
                </motion.div>
              </div>
              
              <div className="flex flex-col items-start gap-2 pl-4">
                <h3 className="font-serif text-4xl md:text-5xl font-black group-hover:text-blue-600 transition-colors uppercase leading-none">{previewProducts[0].name}</h3>
                <span className="text-2xl md:text-3xl font-serif italic text-blue-600/60 font-black">{previewProducts[0].price}</span>
              </div>
            </Link>
          </motion.div>

          {/* Side Stacked Products (Spans 5 cols) */}
          <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-20 lg:gap-32 lg:mt-32">
            {previewProducts.slice(1).map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group cursor-pointer block"
                style={{ rotate: `${product.rotation}deg` }}
              >
                <Link href={`/shop/${product.id}`}>
                  <div className="relative w-full aspect-square rounded-[40px] overflow-visible bg-white mb-8 border-[10px] border-white shadow-xl transition-transform duration-500 group-hover:scale-[1.03]">
                    <div className="absolute inset-0 rounded-[30px] overflow-hidden">
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Category Tag */}
                    <div className="absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-md rotate-6 z-20 font-black uppercase tracking-tighter text-[10px] border-4 border-white">
                      {product.category}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 pl-4">
                    <h3 className="font-serif text-3xl font-black group-hover:text-blue-600 transition-colors leading-none uppercase">{product.name}</h3>
                    <span className="text-xl font-serif italic text-blue-600/60 font-black">{product.price}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
