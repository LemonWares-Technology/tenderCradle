"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Logo } from "./logo";
import { useCart } from "@/components/providers/cart-provider";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Shop", href: "/shop" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isCartOpen, setIsCartOpen, cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "py-4 bg-background/80 backdrop-blur-xl border-b border-foreground/5 shadow-sm" : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group relative z-50">
          <Logo className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-serif text-xl font-bold tracking-tighter text-foreground group-hover:text-primary transition-colors">
            Tender Cradle
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="relative group py-2"
              >
                <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                  isActive ? "text-primary" : "text-foreground/60 group-hover:text-foreground"
                }`}>
                  {link.name}
                </span>
                {/* Active Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {/* Hover Indicator */}
                {!isActive && (
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground/20 group-hover:w-full transition-all duration-300" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 relative z-50">
          {/* Cart Trigger */}
          <button 
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="p-2 relative hover:bg-foreground/5 rounded-full transition-colors group"
            aria-label="Toggle shopping cart"
          >
            <ShoppingCart className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-0 right-0 w-4 h-4 bg-primary text-background text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-background"
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          <Link
            href="/contact"
            className="hidden sm:flex items-center justify-center px-6 py-2.5 bg-foreground text-background text-xs font-bold uppercase tracking-widest rounded-full hover:bg-primary hover:scale-105 transition-all duration-300 shadow-xl shadow-foreground/10"
          >
            Enroll Now
          </Link>

          {/* Mobile Menu Trigger */}
          <button 
            className="lg:hidden p-2 hover:bg-foreground/5 rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background z-40 lg:hidden flex flex-col pt-32 pb-12 px-12"
          >
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col gap-8 relative z-10">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={`text-4xl font-serif tracking-tighter transition-all ${
                        isActive ? "text-primary pl-4" : "text-foreground hover:text-primary hover:pl-4"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-auto space-y-6 relative z-10">
              <div className="h-px w-full bg-foreground/10" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Location</p>
                  <p className="text-sm font-medium">Lagos, Nigeria</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-2">Follow Us</p>
                  <div className="flex gap-4">
                    <span className="text-sm hover:text-primary transition-colors cursor-pointer underline">In</span>
                    <span className="text-sm hover:text-primary transition-colors cursor-pointer underline">Tw</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
