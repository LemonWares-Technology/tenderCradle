"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/components/providers/cart-provider";

const allProducts = [
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
  },
  {
    id: "tc-book-04",
    name: "Sensory Board Book Collection",
    price: "₦18,000",
    image: "/images/shop-books.png",
    category: "Books"
  },
  {
    id: "tc-gear-05",
    name: "Ergonomic Toddler Backpack",
    price: "₦22,000",
    image: "/images/shop-backpack.png",
    category: "Gear"
  },
  {
    id: "tc-toy-06",
    name: "Wooden Sorting Alphabet",
    price: "₦9,500",
    image: "/images/shop-alphabet.png",
    category: "Developmental"
  }
];

export const ShopPageContent = () => {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <div className="bg-background text-foreground overflow-hidden">
      {/* Elegant navigation */}
      <nav className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-10 z-50 pointer-events-none flex justify-between items-center">
        <Link 
          href="/"
          className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border-2 border-[#1A1045]/5 pointer-events-auto hover:-translate-y-1 transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-[#E0F2FE] flex items-center justify-center group-hover:bg-[#BAE6FD] transition-colors">
            <ArrowLeft className="w-4 h-4 text-[#0284C7]" />
          </div>
          <span className="font-bold text-[#1A1045] uppercase tracking-widest text-xs hidden md:inline-block">Return Home</span>
        </Link>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="bg-white/90 backdrop-blur-md text-[#1A1045] px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs pointer-events-auto border-2 border-[#1A1045]/5 shadow-lg hover:-translate-y-1 transition-all flex items-center gap-3"
        >
          Cart
          <span className="w-6 h-6 rounded-full bg-[#3B82F6] text-white flex items-center justify-center text-[10px] font-bold">
            {cartCount}
          </span>
        </button>
      </nav>

      {/* Hero */}
      <section className="relative w-full min-h-[50vh] flex items-center pb-16 overflow-hidden pt-32 bg-[#E0F2FE]">
        {/* Soft Background Blobs */}
        <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-[#BAE6FD] rounded-full opacity-50 pointer-events-none blur-3xl" />
        <div className="absolute bottom-[0%] left-[5%] w-72 h-72 bg-[#DBEAFE] rounded-full opacity-60 pointer-events-none blur-2xl" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center items-center gap-4 mb-8">
            <div className="h-px w-16 bg-[#0284C7]" />
            <span className="text-sm font-bold uppercase tracking-widest text-[#0284C7]">The Boutique</span>
            <div className="h-px w-16 bg-[#0284C7]" />
          </motion.div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] leading-[0.9] text-[#1A1045] max-w-5xl mx-auto tracking-tighter">
            Little <span className="text-[#3B82F6] relative inline-block">Treasures
               <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                  <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#BAE6FD" strokeWidth="6" fill="none" strokeLinecap="round"/>
                </svg>
            </span>.
          </h1>
          <p className="mt-8 text-xl text-[#1A1045]/60 font-serif italic max-w-2xl mx-auto leading-relaxed">
            Curated essentials, magical learning kits, and official Tender Cradle apparel.
          </p>
        </div>
      </section>

      {/* Product Catalog - Elegant Minimal Grid */}
      <section className="w-full bg-[#F8FAFC]">
        <div className="container mx-auto px-6 md:px-12 py-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {allProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.1 }}
                className="group cursor-pointer flex flex-col h-full"
              >
                <Link href={`/shop/${product.id}`} className="block flex-1 flex flex-col h-full">
                  <div className="relative w-full aspect-[4/5] rounded-[30px] overflow-hidden bg-white shadow-lg border border-[#1A1045]/5 group-hover:shadow-2xl transition-all duration-500 mb-6">
                    <Image 
                      src={product.image} 
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                    />
                    
                    {/* Minimal Category Tag */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#1A1045] shadow-sm">
                      {product.category}
                    </div>

                    {/* Elegant View Overlay */}
                    <div className="absolute inset-0 bg-[#1A1045]/5 group-hover:bg-[#1A1045]/0 transition-colors duration-500" />
                    
                    {/* View Button */}
                    <div className="absolute bottom-4 right-4 bg-white text-[#1A1045] w-12 h-12 rounded-full shadow-lg flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col flex-1 justify-between px-2">
                    <h3 className="font-serif text-2xl md:text-3xl leading-[1.15] text-[#1A1045] group-hover:text-[#3B82F6] transition-colors mb-4 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="inline-flex items-center gap-3">
                      <span className="text-xl font-bold text-[#1A1045] tracking-tight">{product.price}</span>
                      <div className="h-4 w-px bg-[#1A1045]/10" />
                      <span className="text-sm font-serif italic text-[#1A1045]/50 group-hover:text-[#3B82F6]/70 transition-colors">
                         View Details <ArrowUpRight className="inline-block w-3 h-3 ml-1" />
                      </span>
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
};
