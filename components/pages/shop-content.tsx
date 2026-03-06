"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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
    <div className="bg-background selection:bg-foreground selection:text-background pb-32">
      {/* Refined Navigation */}
      <nav className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/5 flex justify-between items-center">
        <Link 
          href="/"
          className="inline-flex items-center gap-4 text-foreground hover:opacity-70 transition-opacity"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-foreground/20 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <span className="font-serif text-lg md:text-xl tracking-widest uppercase hidden md:inline-block">Return Home</span>
        </Link>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="font-serif italic text-xl md:text-2xl text-foreground/80 hover:text-foreground transition-colors group flex items-center gap-2"
        >
          Cart 
          <span className="w-8 h-8 rounded-full bg-foreground text-background text-sm flex items-center justify-center font-sans not-italic">
            {cartCount}
          </span>
        </button>
      </nav>

      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-end pb-16 overflow-hidden pt-40">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-primary text-sm font-bold uppercase tracking-widest mb-12">
              The Boutique
            </span>
          </motion.div>

          <SplitText
            text="Curated tools for early minds."
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-foreground max-w-5xl tracking-tighter"
          />
        </div>
      </section>

      {/* Product Catalog - Editorial Grid */}
      <section className="w-full">
        <div className="container mx-auto px-6 md:px-12">
          <div className="border-t border-foreground/10 pt-16 md:pt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-20 md:gap-x-16 md:gap-y-32">
              {allProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 2) * 0.1 }}
                  className={`group cursor-pointer block ${index % 2 !== 0 ? 'md:mt-32' : ''}`} // Staggered layout on desktop
                >
                  <div className="group cursor-pointer block w-full relative">
                    <Link href={`/shop/${product.id}`} className="block">
                      <div className="relative w-full aspect-3/4 rounded-[24px] md:rounded-[40px] overflow-hidden bg-foreground/5 mb-8">
                        <Image 
                          src={product.image} 
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute top-6 left-6 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-foreground z-10">
                          {product.category}
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-foreground/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        
                        {/* Hidden View Button that slides up on hover */}
                        <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 bg-background text-foreground px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs translate-y-[150%] group-hover:translate-y-0 transition-transform duration-500 ease-out flex items-center gap-2">
                          View Product <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                    
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <Link href={`/shop/${product.id}`} className="block">
                        <h3 className="font-serif text-3xl md:text-4xl leading-tight group-hover:text-primary transition-colors pr-4">{product.name}</h3>
                      </Link>
                      <span className="text-xl md:text-2xl font-serif italic text-foreground/60 shrink-0">{product.price}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
