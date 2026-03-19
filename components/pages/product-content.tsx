"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import Link from "next/link";
import { ArrowLeft, Plus, Minus, ShoppingBag, Check } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { notFound } from "next/navigation";
import { useCart } from "@/components/providers/cart-provider";

const allProducts = [
  {
    id: "tc-unif-01",
    name: "Tender Premium Uniform",
    price: "₦15,000",
    image: "/images/shop-uniform.png",
    category: "Apparel",
    description: "Tailored for comfort and durability. This premium uniform is woven from breathable, organic cotton blends to ensure your child remains comfortable throughout active learning days. Double-stitched seams and a stain-resistant finish make it a lasting staple.",
    details: [
      { title: "Material", content: "80% Organic Cotton, 20% Recycled Polyester." },
      { title: "Care", content: "Machine wash cold with like colors. Tumble dry low." },
      { title: "Shipping", content: "Free standard shipping on orders over ₦50,000." },
    ]
  },
  {
    id: "tc-toy-02",
    name: "Montessori Object Permanence Box",
    price: "₦8,500",
    image: "/images/shop-montessori.png",
    category: "Developmental",
    description: "A classic Montessori tool designed to help infants understand that objects continue to exist even when unseen. Crafted from smooth, sustainably sourced beechwood and finished with non-toxic, child-safe oils.",
    details: [
      { title: "Age Recommendation", content: "6 to 12 months." },
      { title: "Material", content: "Sustainably sourced beechwood." },
      { title: "Benefits", content: "Develops hand-eye coordination and fine motor skills." },
    ]
  },
  {
    id: "tc-kit-03",
    name: "Early Years Creative Kit",
    price: "₦12,000",
    image: "/images/shop-kit.png",
    category: "Learning",
    description: "An all-in-one kit featuring non-toxic finger paints, thick easy-grip crayons, and heavy-weight textured paper. Perfect for sparking early creative expression and sensory exploration.",
    details: [
      { title: "Contents", content: "4 large finger paints, 8 easy-grip crayons, 1 pad of textured paper." },
      { title: "Safety", content: "100% non-toxic and easily washable from skin and clothes." },
    ]
  },
  {
    id: "default",
    name: "Premium Development Tool",
    price: "₦10,000",
    image: "/images/shop-backpack.png",
    category: "Gear",
    description: "An essential component for your child's developmental journey. Built to last and designed beautifully.",
    details: [
      { title: "Material", content: "Premium materials." },
      { title: "Shipping", content: "Standard rates apply." },
    ]
  }
];

export const ProductPageContent = ({ productId }: { productId: string }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const { addItem, cartCount, setIsCartOpen } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const product = allProducts.find(p => p.id === productId) || allProducts.find(p => p.id === "default");

  if (!product) return notFound();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: parseInt(product.price.replace(/[^\d]/g, '')),
      image: product.image,
      quantity: quantity
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-32">
      
      {/* Elegant Navigation */}
      <nav className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-8 z-50 bg-white/80 backdrop-blur-md border-b border-[#1A1045]/5 flex justify-between items-center transition-all">
        <Link 
          href="/shop"
          className="inline-flex items-center gap-3 text-[#1A1045] hover:text-[#0284C7] transition-colors group"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#1A1045]/10 flex items-center justify-center group-hover:border-[#0284C7]/30 group-hover:bg-[#E0F2FE]">
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="font-bold text-xs uppercase tracking-widest hidden md:inline-block">Back to Shop</span>
        </Link>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="bg-white text-[#1A1045] px-6 py-3 rounded-full font-bold uppercase tracking-widest text-xs pointer-events-auto border-2 border-[#1A1045]/5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-center gap-3"
        >
          Cart
          <span className="w-6 h-6 rounded-full bg-[#3B82F6] text-white flex items-center justify-center text-[10px] font-bold">
            {cartCount}
          </span>
        </button>
      </nav>

      <div className="container mx-auto px-6 md:px-12 pt-32 md:pt-40">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start relative">
          
          {/* Left: Product Images */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-32 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/5] rounded-[40px] overflow-hidden bg-white shadow-xl border border-[#1A1045]/5 group"
            >
              <Image 
                src={product.image} 
                alt={product.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                priority
              />
              <div className="absolute inset-0 bg-[#1A1045]/5 mix-blend-overlay pointer-events-none" />
            </motion.div>
          </div>

          {/* Right: Product Details & Typography */}
          <div className="w-full lg:w-1/2 flex flex-col pt-4 lg:pt-8 pb-16">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/60 bg-white border border-[#1A1045]/10 px-4 py-2 rounded-full shadow-sm">
                {product.category}
              </span>
            </motion.div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1045] tracking-tighter mb-6 leading-[1.1]">
              {product.name}
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl text-[#1A1045]/80 font-serif italic mb-8"
            >
              {product.price}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="w-full border-t border-[#1A1045]/10 pt-8 mb-10"
            >
              <p className="text-lg md:text-xl text-[#1A1045]/70 leading-relaxed font-serif italic">
                {product.description}
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
              className="flex flex-col md:flex-row gap-6 mb-16"
            >
              {/* Quantity Selector */}
              <div className="flex items-center justify-between bg-white border border-[#1A1045]/10 shadow-sm rounded-full px-6 py-4 w-full md:w-auto md:min-w-[160px]">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-[#1A1045]/50 hover:text-[#1A1045] transition-colors p-1"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="font-bold text-lg select-none text-[#1A1045]">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-[#1A1045]/50 hover:text-[#1A1045] transition-colors p-1"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 flex items-center justify-center gap-3 rounded-full py-4 px-8 text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-lg ${isAdded ? 'bg-[#10B981] text-white' : 'bg-[#1A1045] text-white hover:bg-[#3B82F6] hover:shadow-xl hover:-translate-y-1'}`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Details Accordion */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="border-t border-[#1A1045]/10"
            >
              {product.details.map((detail, idx) => (
                <div key={idx} className="border-b border-[#1A1045]/10">
                  <button 
                    onClick={() => setActiveAccordion(activeAccordion === idx ? null : idx)}
                    className="w-full flex items-center justify-between py-6 text-left group"
                  >
                    <span className="font-serif text-2xl text-[#1A1045] group-hover:text-[#3B82F6] transition-colors">
                      {detail.title}
                    </span>
                    <span className="text-[#1A1045]/40 group-hover:text-[#3B82F6] transition-colors">
                      {activeAccordion === idx ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {activeAccordion === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-[#1A1045]/70 leading-relaxed font-serif italic text-lg">
                          {detail.content}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
