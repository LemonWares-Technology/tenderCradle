"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/components/providers/cart-provider";
import Link from "next/link";

export const CartSidebar = () => {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, cartTotal } = useCart();

  // Helper to format currency
  const formatPrice = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-100"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-background text-foreground z-101 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="px-8 py-8 md:py-10 border-b border-foreground/10 flex items-center justify-between">
              <h2 className="font-serif text-3xl tracking-tighter">Your Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-8">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
                  <div className="w-24 h-24 border border-current rounded-full flex items-center justify-center mb-6">
                    <span className="font-serif italic text-3xl">0</span>
                  </div>
                  <p className="font-serif text-xl">Your cart is elegantly empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    <div className="relative w-24 h-32 rounded-[16px] overflow-hidden bg-foreground/5 shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover"  />
                    </div>
                    <div className="flex flex-col flex-1 justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="font-serif text-xl leading-tight pr-4">{item.name}</h3>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="opacity-0 group-hover:opacity-50 hover:opacity-100! transition-opacity p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-foreground/60 font-serif italic text-lg mt-1">{formatPrice(item.price)}</p>
                      </div>
                      
                      {/* Quantity & Controls */}
                      <div className="flex items-center gap-4 border border-foreground/10 rounded-full w-fit px-3 py-1.5 mt-4">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="hover:text-primary transition-colors disabled:opacity-30"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-sans font-bold text-sm w-4 text-center select-none">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="hover:text-primary transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-8 border-t border-foreground/10 bg-background">
                <div className="flex items-end justify-between mb-8">
                  <span className="text-sm font-bold uppercase tracking-widest text-foreground/50">Subtotal</span>
                  <span className="font-serif text-3xl">{formatPrice(cartTotal)}</span>
                </div>
                <Link 
                  href="/checkout" // Placeholder route
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-foreground text-background flex items-center justify-center rounded-full py-5 text-sm font-bold uppercase tracking-widest hover:bg-primary transition-colors duration-500"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
