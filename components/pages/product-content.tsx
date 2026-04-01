import { motion, AnimatePresence } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, Minus, ShoppingBag, Check, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useCart } from "@/components/providers/cart-provider";
import { getProduct, Product } from "@/lib/api/products";

export const ProductPageContent = ({ productId }: { productId: string }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
  const { addItem, cartCount, setIsCartOpen } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching product with slug:", productId);
        // productId is actually the slug from the URL
        const data = await getProduct(productId);
        console.log("Product data received:", data);
        setProduct(data);
        // Set first variant as default if variants exist
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      } catch (err: any) {
        console.error("Failed to load product:", err);
        console.error("Error details:", { message: err.message, status: err.status, errors: err.errors });
        setError(err.message || "Failed to load product");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#3B82F6] animate-spin mx-auto mb-4" />
          <p className="text-[#1A1045]/60 font-serif italic">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return <Navigate to="/404" replace />;
  }

  const formatPrice = (price: number | string | undefined) => {
    if (!price) return "₦0";
    const num = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num).replace('NGN', '₦');
  };

  const currentPrice = selectedVariant?.price 
    ? (typeof selectedVariant.price === 'string' ? parseFloat(selectedVariant.price) : selectedVariant.price)
    : product.lowestPrice || 0;
  const currentImage = product.images && product.images.length > 0 ? product.images[0] : "/images/placeholder-product.png";

  const handleAddToCart = () => {
    // Ensure we have a valid variant - use first variant if none selected
    const variant = selectedVariant || (product.variants && product.variants[0]);
    
    if (!variant) {
      console.error("No variant available for product:", product);
      return;
    }

    console.log("Adding to cart:", {
      productId: product.id,
      variantId: variant.id,
      name: `${product.name}${variant.name !== 'Default' ? ` - ${variant.name}` : ''}`,
      price: typeof variant.price === 'string' ? parseFloat(variant.price) : variant.price,
      quantity: quantity
    });

    addItem({
      productId: product.id,
      variantId: variant.id,
      name: `${product.name}${variant.name !== 'Default' ? ` - ${variant.name}` : ''}`,
      price: typeof variant.price === 'string' ? parseFloat(variant.price) : variant.price,
      image: currentImage,
      quantity: quantity
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-32 pt-32">

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start relative">
          
          {/* Left: Product Images */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-32 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full aspect-[4/5] rounded-[40px] overflow-hidden bg-white shadow-xl border border-[#1A1045]/5 group"
            >
              <img 
                src={currentImage} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-[#1A1045]/5 mix-blend-overlay pointer-events-none" />
            </motion.div>
          </div>

          {/* Right: Product Details & Typography */}
          <div className="w-full lg:w-1/2 flex flex-col pt-4 lg:pt-8 pb-16">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/60 bg-white border border-[#1A1045]/10 px-4 py-2 rounded-full shadow-sm">
                {product.category?.name || "Product"}
              </span>
            </motion.div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1045] tracking-tighter mb-6 leading-[1.1]">
              {product.name}
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl text-[#1A1045]/80 font-serif italic mb-8"
            >
              {formatPrice(currentPrice)}
            </motion.p>

            {/* Variant Selector */}
            {product.variants && product.variants.length > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="mb-8"
              >
                <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-3">
                  Select Option
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant: any) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-6 py-3 rounded-full border-2 transition-all ${
                        selectedVariant?.id === variant.id
                          ? 'border-[#3B82F6] bg-[#3B82F6] text-white'
                          : 'border-[#1A1045]/10 bg-white text-[#1A1045] hover:border-[#3B82F6]/50'
                      }`}
                    >
                      <span className="font-bold text-sm">{variant.name}</span>
                      {variant.stock <= 0 && (
                        <span className="ml-2 text-xs opacity-60">(Out of Stock)</span>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
            
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
                disabled={isAdded || (selectedVariant && selectedVariant.stock <= 0)}
                className={`flex-1 flex items-center justify-center gap-3 rounded-full py-4 px-8 text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-lg ${
                  isAdded 
                    ? 'bg-[#10B981] text-white' 
                    : selectedVariant && selectedVariant.stock <= 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#1A1045] text-white hover:bg-[#3B82F6] hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added!</span>
                  </>
                ) : selectedVariant && selectedVariant.stock <= 0 ? (
                  <span>Out of Stock</span>
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
              {/* Product Details */}
              <div className="border-b border-[#1A1045]/10">
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === 0 ? null : 0)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="font-serif text-2xl text-[#1A1045] group-hover:text-[#3B82F6] transition-colors">
                    Product Details
                  </span>
                  <span className="text-[#1A1045]/40 group-hover:text-[#3B82F6] transition-colors">
                    {activeAccordion === 0 ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                  </span>
                </button>
                <AnimatePresence>
                  {activeAccordion === 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 space-y-3">
                        {product.tags && product.tags.length > 0 && (
                          <p className="text-[#1A1045]/70 leading-relaxed font-serif italic text-lg">
                            <span className="font-bold not-italic">Tags:</span> {product.tags.join(', ')}
                          </p>
                        )}
                        {selectedVariant && (
                          <p className="text-[#1A1045]/70 leading-relaxed font-serif italic text-lg">
                            <span className="font-bold not-italic">Stock:</span> {selectedVariant.stock} available
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Shipping */}
              <div className="border-b border-[#1A1045]/10">
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === 1 ? null : 1)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <span className="font-serif text-2xl text-[#1A1045] group-hover:text-[#3B82F6] transition-colors">
                    Shipping & Returns
                  </span>
                  <span className="text-[#1A1045]/40 group-hover:text-[#3B82F6] transition-colors">
                    {activeAccordion === 1 ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                  </span>
                </button>
                <AnimatePresence>
                  {activeAccordion === 1 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-[#1A1045]/70 leading-relaxed font-serif italic text-lg">
                        Free standard shipping on orders over ₦50,000. Returns accepted within 14 days of delivery.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            
          </div>
        </div>
      </div>
    </div>
  );
};
