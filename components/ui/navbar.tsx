import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, ChevronDown, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./logo";
import { useCart } from "@/components/providers/cart-provider";
import { useCustomerAuth } from "@/lib/context/CustomerAuthContext";

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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { pathname } = useLocation();
  const { isCartOpen, setIsCartOpen, cartCount } = useCart();
  const { isAuthenticated, logout } = useCustomerAuth();

  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Logo className="w-8 h-8 text-[#FF6B35]" />
            <span className="font-serif font-bold text-lg md:text-xl text-gray-900">
              Tender Cradle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || link.children?.some(child => pathname === child.href);
              const hasDropdown = link.children && link.children.length > 0;
              
              return (
                <div 
                  key={link.name}
                  className="relative group"
                >
                  <Link
                    to={link.href}
                    className={`flex items-center gap-1 text-sm font-semibold uppercase tracking-wide transition-colors py-2 ${
                      isActive ? "text-[#FF6B35]" : "text-gray-700 hover:text-[#FF6B35]"
                    }`}
                  >
                    {link.name}
                    {hasDropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${
                        openDropdown === link.name ? "rotate-180" : ""
                      }`} />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {hasDropdown && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                        {link.children!.map((child) => {
                          const isChildActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              to={child.href}
                              className={`block px-4 py-2 text-sm font-medium transition-colors ${
                                isChildActive 
                                  ? "text-[#FF6B35] bg-orange-50" 
                                  : "text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              {child.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            {pathname !== "/" && (
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6B35] text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* Auth */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/shop/orders" 
                    className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4" />
                    <span>Orders</span>
                  </Link>
                  <button 
                    onClick={logout}
                    className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <Link 
                  to="/shop/login" 
                  className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 top-16 md:top-20 bg-white z-40 overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-8">
              <div className="space-y-2">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href || link.children?.some(child => pathname === child.href);
                  const hasDropdown = link.children && link.children.length > 0;
                  const isExpanded = openDropdown === link.name;
                  
                  return (
                    <motion.div 
                      key={link.name}
                      initial={{ opacity: 0, y: -20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ 
                        delay: idx * 0.08,
                        type: "spring",
                        stiffness: 300,
                        damping: 15
                      }}
                    >
                      {hasDropdown ? (
                        <>
                          <button
                            onClick={() => setOpenDropdown(isExpanded ? null : link.name)}
                            className={`w-full flex items-center justify-between px-4 py-4 text-2xl md:text-3xl font-serif font-bold rounded-lg transition-colors ${
                              isActive ? "text-[#FF6B35]" : "text-gray-900 hover:text-[#FF6B35]"
                            }`}
                          >
                            {link.name}
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                              <ChevronDown className="w-6 h-6" />
                            </motion.div>
                          </button>
                          
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="overflow-hidden ml-6 space-y-1"
                              >
                                {link.children!.map((child, childIdx) => {
                                  const isChildActive = pathname === child.href;
                                  return (
                                    <motion.div
                                      key={child.href}
                                      initial={{ opacity: 0, x: -10, scale: 0.9 }}
                                      animate={{ opacity: 1, x: 0, scale: 1 }}
                                      transition={{ 
                                        delay: childIdx * 0.05,
                                        type: "spring",
                                        stiffness: 250,
                                        damping: 18
                                      }}
                                    >
                                      <Link
                                        to={child.href}
                                        className={`block px-4 py-3 text-lg font-medium rounded-lg transition-colors ${
                                          isChildActive 
                                            ? "text-[#FF6B35] bg-orange-50" 
                                            : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                      >
                                        {child.name}
                                      </Link>
                                    </motion.div>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          to={link.href}
                          className={`block px-4 py-4 text-2xl md:text-3xl font-serif font-bold rounded-lg transition-colors ${
                            isActive ? "text-[#FF6B35]" : "text-gray-900 hover:text-[#FF6B35]"
                          }`}
                        >
                          {link.name}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile Auth & Cart */}
              <motion.div 
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: navLinks.length * 0.08,
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }}
                className="mt-8 pt-6 border-t border-gray-200 space-y-3"
              >
                <button 
                  onClick={() => {
                    setIsCartOpen(!isCartOpen);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-6 h-6 text-[#FF6B35]" />
                    <span className="text-lg font-semibold text-gray-900">Shopping Cart</span>
                  </div>
                  {cartCount > 0 && (
                    <span className="w-8 h-8 bg-[#FF6B35] text-white text-sm font-bold rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>

                {isAuthenticated ? (
                  <>
                    <Link 
                      to="/shop/orders"
                      onClick={() => setIsOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                    >
                      <User className="w-6 h-6 text-blue-600" />
                      <span className="text-lg font-semibold text-gray-900">My Orders</span>
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
                    >
                      <LogOut className="w-6 h-6 text-red-600" />
                      <span className="text-lg font-semibold text-gray-900">Logout</span>
                    </button>
                  </>
                ) : (
                  <Link 
                    to="/shop/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center gap-3 px-4 py-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    <User className="w-6 h-6 text-blue-600" />
                    <span className="text-lg font-semibold text-gray-900">Login</span>
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
