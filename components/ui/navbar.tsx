
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import { Logo } from "./logo";
import { useCart } from "@/components/providers/cart-provider";
import { useCustomerAuth } from "@/lib/context/CustomerAuthContext";
import { User, LogOut } from "lucide-react";

type NavLink = {
  name: string;
  href: string;
  children?: { name: string; href: string }[];
};

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { 
    name: "About", 
    href: "/about",
    children: [
      { name: "Our Story", href: "/about" },
      { name: "Our Team", href: "/staff" },
    ]
  },
  { 
    name: "Programs", 
    href: "/programs",
    children: [
      { name: "Overview", href: "/programs" },
      { name: "Curriculum", href: "/curriculum" },
      { name: "Daily Life", href: "/programs/daily-life" },
    ]
  },
  { 
    name: "Admissions", 
    href: "/enrollment",
    children: [
      { name: "Enrollment Info", href: "/enrollment" },
      { name: "Apply Now", href: "/enrollment/apply" },
      { name: "Health & Safety", href: "/health-safety" },
      { name: "Parent Resources", href: "/parent-resources" },
    ]
  },
  { 
    name: "Community", 
    href: "/events",
    children: [
      { name: "Events", href: "/events" },
      { name: "Gallery", href: "/gallery" },
    ]
  },
  { name: "Shop", href: "/shop" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { pathname } = useLocation();
  const { isCartOpen, setIsCartOpen, cartCount } = useCart();
  const { isAuthenticated, logout } = useCustomerAuth();

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

  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-[110] transition-all duration-500 ${
        scrolled ? "py-4 bg-white/95 backdrop-blur-xl border-b border-[#1D4ED8]/10 shadow-sm" : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group relative z-[120]">
          <Logo className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-serif text-xl font-bold tracking-tighter text-foreground group-hover:text-primary transition-colors">
            Tender Cradle
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || link.children?.some(child => pathname === child.href);
            const hasDropdown = link.children && link.children.length > 0;
            
            return (
              <div 
                key={link.name}
                className="relative group"
                onMouseEnter={() => hasDropdown && setOpenDropdown(link.name)}
                onMouseLeave={() => hasDropdown && setOpenDropdown(null)}
              >
                <Link
                  to={link.href}
                  className="relative py-2 flex items-center gap-1"
                >
                  <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                    isActive ? "text-[#FF6B35]" : "text-[#1A1045]/60 group-hover:text-[#1A1045]"
                  }`}>
                    {link.name}
                  </span>
                  {hasDropdown && (
                    <ChevronDown className={`w-3 h-3 transition-all ${
                      isActive ? "text-[#FF6B35]" : "text-[#1A1045]/60 group-hover:text-[#1A1045]"
                    } ${openDropdown === link.name ? "rotate-180" : ""}`} />
                  )}
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FF6B35]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Hover Indicator */}
                  {!isActive && (
                    <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground/20 group-hover:w-full transition-all duration-300" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {hasDropdown && (
                  <AnimatePresence>
                    {openDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 min-w-[200px] bg-white rounded-2xl shadow-xl border border-[#1A1045]/10 py-2 z-[120]"
                      >
                        {link.children!.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              to={child.href}
                              className={`block px-6 py-3 text-sm font-medium transition-colors ${
                                isChildActive 
                                  ? "text-[#FF6B35] bg-[#FF6B35]/5" 
                                  : "text-[#1A1045]/70 hover:text-[#1A1045] hover:bg-[#1A1045]/5"
                              }`}
                            >
                              {child.name}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 relative z-[120]">
          {/* Cart Trigger — hidden on landing page */}
          {pathname !== "/" && (
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="p-2 relative hover:bg-[#FF6B35]/10 rounded-full transition-colors group"
              aria-label="Toggle shopping cart"
            >
              <ShoppingCart className="w-5 h-5 text-[#1A1045] group-hover:text-[#FF6B35] transition-colors" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 w-4 h-4 bg-[#FF6B35] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          )}

          {/* Customer Auth Actions */}
          <div className="hidden md:flex items-center gap-2 border-l border-[#1A1045]/10 ml-2 pl-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/shop/orders" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1A1045]/60 hover:text-[#1A1045] transition-colors">
                  <User className="w-4 h-4" />
                  <span className="hidden xl:inline">My Orders</span>
                </Link>
                <button 
                  onClick={logout}
                  className="p-2 text-[#1A1045]/60 hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link to="/shop/login" className="text-xs font-bold uppercase tracking-widest text-[#1A1045]/60 hover:text-[#1A1045] transition-colors flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

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
            className="fixed inset-0 bg-white z-[100] lg:hidden overflow-y-auto"
          >
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col gap-6 relative z-10 pt-32 pb-12 px-6 min-h-full">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href || link.children?.some(child => pathname === child.href);
                const hasDropdown = link.children && link.children.length > 0;
                const isExpanded = openDropdown === link.name;
                
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    {hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setOpenDropdown(isExpanded ? null : link.name)}
                          className={`w-full flex items-center justify-between text-3xl font-serif tracking-tighter transition-all ${
                            isActive ? "text-primary pl-4" : "text-foreground hover:text-primary hover:pl-4"
                          }`}
                        >
                          <span>{link.name}</span>
                          <ChevronDown className={`w-6 h-6 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                        
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 ml-8 space-y-3">
                                {link.children!.map((child) => {
                                  const isChildActive = pathname === child.href;
                                  return (
                                    <Link
                                      key={child.href}
                                      to={child.href}
                                      className={`block text-xl font-medium transition-colors ${
                                        isChildActive 
                                          ? "text-[#FF6B35]" 
                                          : "text-[#1A1045]/60 hover:text-[#1A1045]"
                                      }`}
                                    >
                                      {child.name}
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link to={link.href}
                        className={`text-3xl font-serif tracking-tighter transition-all ${
                          isActive ? "text-primary pl-4" : "text-foreground hover:text-primary hover:pl-4"
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-auto space-y-6 relative z-10 px-6 pb-12">
              <div className="h-px w-full bg-foreground/10" />
              
              {/* Mobile Cart & Auth */}
              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => {
                    setIsCartOpen(!isCartOpen);
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-between p-4 bg-[#FF6B35]/10 rounded-2xl hover:bg-[#FF6B35]/20 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-5 h-5 text-[#FF6B35]" />
                    <span className="font-bold text-[#1A1045]">Shopping Cart</span>
                  </div>
                  {cartCount > 0 && (
                    <span className="w-6 h-6 bg-[#FF6B35] text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>

                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/shop/orders"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors"
                    >
                      <User className="w-5 h-5 text-blue-600" />
                      <span className="font-bold text-[#1A1045]">My Orders</span>
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="flex items-center gap-3 p-4 bg-red-50 rounded-2xl hover:bg-red-100 transition-colors"
                    >
                      <LogOut className="w-5 h-5 text-red-600" />
                      <span className="font-bold text-[#1A1045]">Logout</span>
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/shop/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors"
                  >
                    <User className="w-5 h-5 text-blue-600" />
                    <span className="font-bold text-[#1A1045]">Login / Register</span>
                  </Link>
                )}
              </div>

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
