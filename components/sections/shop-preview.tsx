
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ArrowUpRight, 
  Gift, 
  ShoppingCart, 
  Sparkles, 
  Star, 
  ShoppingBag,
  Heart,
  Loader2
} from "lucide-react";
import { getProducts, Product } from "@/lib/api/products";

export const ShopPreviewSection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data.slice(0, 3)); // Get first 3 products
      } catch (error) {
        console.error("Failed to load products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Fallback products if API returns empty or insufficient products
  const fallbackProducts = [
    {
      id: "fallback-1",
      slug: "tender-premium-uniform",
      name: "Tender Premium Uniform",
      price: 15000,
      images: ["/images/child_11.jpg"],
      image: "/images/child_11.jpg",
      category: "Apparel",
      description: "Premium quality uniform for Tender Cradle students",
      stock: 50,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "fallback-2",
      slug: "montessori-object-box",
      name: "Montessori Object Box",
      price: 8500,
      images: ["/images/child_12.jpg"],
      image: "/images/child_12.jpg",
      category: "Developmental",
      description: "Educational Montessori learning materials",
      stock: 30,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: "fallback-3",
      slug: "creative-learning-kit",
      name: "Creative Learning Kit",
      price: 12000,
      images: ["/images/child_13.avif"],
      image: "/images/child_13.avif",
      category: "Learning",
      description: "Complete creative learning kit for young minds",
      stock: 25,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  if (isLoading) {
    return (
      <section className="relative w-full py-24 md:py-40 bg-[#FEF9C3] overflow-hidden flex items-center justify-center min-h-[600px]">
        <Loader2 className="w-10 h-10 text-[#F59E0B] animate-spin" />
      </section>
    );
  }

  // Combine real products with fallback to ensure we have 3 products
  let displayProducts: Product[] = [];
  if (products.length >= 3) {
    displayProducts = products.slice(0, 3);
  } else if (products.length > 0) {
    // Mix real products with fallback
    displayProducts = [...products];
    const needed = 3 - products.length;
    displayProducts.push(...fallbackProducts.slice(0, needed));
  } else {
    // No real products, use all fallback
    displayProducts = fallbackProducts;
  }

  const previewProducts = displayProducts.map((product, index) => ({
    ...product,
    rotation: index === 0 ? -1.5 : index === 1 ? 2.5 : -2,
    accent: index === 0 ? "#60A5FA" : index === 1 ? "#F472B6" : "#4ADE80"
  }));

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
          
          <Link to="/shop" className="group relative inline-flex items-center gap-4 bg-blue-600 text-white px-8 py-5 rounded-[24px] font-black uppercase tracking-widest text-sm hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_0px_#1E40AF] hover:shadow-[0_14px_0px_#1E40AF]">
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
            <Link to={`/shop/${previewProducts[0].slug}`}>
              <div className="relative w-full aspect-4/5 rounded-[50px] overflow-visible bg-white mb-10 border-[10px] border-white shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
                <div className="absolute inset-0 rounded-[40px] overflow-hidden">
                  <img 
                    src={previewProducts[0].images?.[0] || previewProducts[0].image} 
                    alt={previewProducts[0].name}
                    className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
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
                <span className="text-2xl md:text-3xl font-serif italic text-blue-600/60 font-black">₦{previewProducts[0].price.toLocaleString()}</span>
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
                <Link to={`/shop/${product.slug}`}>
                  <div className="relative w-full aspect-square rounded-[40px] overflow-visible bg-white mb-8 border-[10px] border-white shadow-xl transition-transform duration-500 group-hover:scale-[1.03]">
                    <div className="absolute inset-0 rounded-[30px] overflow-hidden">
                      <img 
                        src={product.images?.[0] || product.image} 
                        alt={product.name}
                        className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Category Tag */}
                    <div className="absolute -top-4 -right-4 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-md rotate-6 z-20 font-black uppercase tracking-tighter text-[10px] border-4 border-white">
                      {product.category}
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 pl-4">
                    <h3 className="font-serif text-3xl font-black group-hover:text-blue-600 transition-colors leading-none uppercase">{product.name}</h3>
                    <span className="text-xl font-serif italic text-blue-600/60 font-black">₦{product.price.toLocaleString()}</span>
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
