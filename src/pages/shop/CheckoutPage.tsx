import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/components/providers/cart-provider";
import { useCustomerAuth } from "@/lib/context/CustomerAuthContext";
import { checkout, CheckoutData } from "@/lib/api/orders";
import { 
  ArrowLeft, CreditCard, Truck, ShieldCheck, 
  MapPin, ShoppingBag, Loader2, CheckCircle2,
  ChevronRight, AlertCircle, Sparkles
} from "lucide-react";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const { customer, isAuthenticated, isLoading: authLoading } = useCustomerAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Nigeria",
    notes: ""
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/shop/login?redirect=/shop/checkout");
    }
    if (customer) {
      setFormData(prev => ({
        ...prev,
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        email: customer.email || "",
        phone: customer.phone || ""
      }));
    }
  }, [isAuthenticated, authLoading, navigate, customer]);

  useEffect(() => {
    if (items.length === 0 && !isSuccess) {
      navigate("/shop");
    }
  }, [items, navigate, isSuccess]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    const checkoutData: CheckoutData = {
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      billingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      notes: formData.notes
    };

    try {
      const order = await checkout(checkoutData);
      setOrderNumber(order.orderNumber);
      setIsSuccess(true);
      clearCart();
      window.scrollTo(0, 0);
    } catch (err: any) {
      if (err.errors) {
        const newFieldErrors: Record<string, string> = {};
        err.errors.forEach((e: any) => {
          const path = e.path.startsWith('body.') ? e.path.replace('body.', '') : e.path;
          if (newFieldErrors[path]) {
            newFieldErrors[path] = `${newFieldErrors[path]} ${e.message}`;
          } else {
            newFieldErrors[path] = e.message;
          }
        });
        setFieldErrors(newFieldErrors);
        setError(err.message || "Please check the form for errors.");
      } else {
        setError(err.message || "Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#1A1045] animate-spin" />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-[40px] p-12 text-center shadow-2xl border border-[#1A1045]/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#3B82F6] via-[#BE185D] to-[#F59E0B]" />
          
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="font-serif text-5xl text-[#1A1045] mb-4 tracking-tighter">Order Confirmed!</h1>
          <p className="text-xl text-[#1A1045]/60 font-serif italic mb-8">
            Thank you for shopping with Tender Cradle. Your little star's package will be ready soon!
          </p>
          
          <div className="bg-[#F8FAFC] rounded-2xl p-6 mb-10 border border-[#1A1045]/5">
            <p className="text-sm font-bold uppercase tracking-widest text-[#1A1045]/40 mb-2">Order Number</p>
            <p className="text-3xl font-serif text-[#1A1045]">{orderNumber}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="bg-[#1A1045] text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-[#3B82F6] transition-all shadow-xl">
              Back to Boutique
            </Link>
            <Link to="/shop/orders" className="bg-white text-[#1A1045] border-2 border-[#1A1045]/10 px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:border-[#1A1045] transition-all">
              Track Order
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center gap-4 mb-12">
          <Link to="/shop" className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-all text-[#1A1045]">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1A1045] tracking-tighter">Checkout.</h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Form Section */}
          <div className="lg:col-span-7">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl border border-[#1A1045]/5">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] flex items-center justify-center text-[#1D4ED8]">
                    <Truck className="w-6 h-6" />
                  </div>
                  <h2 className="font-serif text-2xl text-[#1A1045]">Shipping Details</h2>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-8 flex items-start gap-4 text-red-700">
                    <AlertCircle className="w-6 h-6 shrink-0" />
                    <p className="font-serif italic">{error}</p>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/50 ml-2">First Name</label>
                    <input 
                      type="text" name="firstName" required
                      value={formData.firstName} onChange={handleInputChange}
                      className={`w-full bg-[#F8FAFC] rounded-2xl py-4 px-6 border ${fieldErrors.firstName ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#3B82F6] focus:bg-white outline-none transition-all font-serif`}
                    />
                    {fieldErrors.firstName && <p className="text-xs text-red-500 font-bold ml-2">{fieldErrors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/50 ml-2">Last Name</label>
                    <input 
                      type="text" name="lastName" required
                      value={formData.lastName} onChange={handleInputChange}
                      className={`w-full bg-[#F8FAFC] rounded-2xl py-4 px-6 border ${fieldErrors.lastName ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#3B82F6] focus:bg-white outline-none transition-all font-serif`}
                    />
                    {fieldErrors.lastName && <p className="text-xs text-red-500 font-bold ml-2">{fieldErrors.lastName}</p>}
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/50 ml-2">Email Address</label>
                    <input 
                      type="email" name="email" required
                      value={formData.email} onChange={handleInputChange}
                      className={`w-full bg-[#F8FAFC] rounded-2xl py-4 px-6 border ${fieldErrors.email ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#3B82F6] focus:bg-white outline-none transition-all font-serif`}
                    />
                    {fieldErrors.email && <p className="text-xs text-red-500 font-bold ml-2">{fieldErrors.email}</p>}
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/50 ml-2">Phone Number</label>
                    <input 
                      type="tel" name="phone" required
                      value={formData.phone} onChange={handleInputChange}
                      className={`w-full bg-[#F8FAFC] rounded-2xl py-4 px-6 border ${fieldErrors.phone ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#3B82F6] focus:bg-white outline-none transition-all font-serif`}
                    />
                    {fieldErrors.phone && <p className="text-xs text-red-500 font-bold ml-2">{fieldErrors.phone}</p>}
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/50 ml-2">Delivery Address</label>
                    <input 
                      type="text" name="address" required placeholder="Street address, apartment, suite, etc."
                      value={formData.address} onChange={handleInputChange}
                      className={`w-full bg-[#F8FAFC] rounded-2xl py-4 px-6 border ${fieldErrors.address ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#3B82F6] focus:bg-white outline-none transition-all font-serif`}
                    />
                    {fieldErrors.address && <p className="text-xs text-red-500 font-bold ml-2">{fieldErrors.address}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/50 ml-2">City</label>
                    <input 
                      type="text" name="city" required
                      value={formData.city} onChange={handleInputChange}
                      className={`w-full bg-[#F8FAFC] rounded-2xl py-4 px-6 border ${fieldErrors.city ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#3B82F6] focus:bg-white outline-none transition-all font-serif`}
                    />
                    {fieldErrors.city && <p className="text-xs text-red-500 font-bold ml-2">{fieldErrors.city}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/50 ml-2">State</label>
                    <input 
                      type="text" name="state" required
                      value={formData.state} onChange={handleInputChange}
                      className={`w-full bg-[#F8FAFC] rounded-2xl py-4 px-6 border ${fieldErrors.state ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#3B82F6] focus:bg-white outline-none transition-all font-serif`}
                    />
                    {fieldErrors.state && <p className="text-xs text-red-500 font-bold ml-2">{fieldErrors.state}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/50 ml-2">Postal Code</label>
                    <input 
                      type="text" name="postalCode" required
                      value={formData.postalCode} onChange={handleInputChange}
                      className={`w-full bg-[#F8FAFC] rounded-2xl py-4 px-6 border ${fieldErrors.postalCode ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#3B82F6] focus:bg-white outline-none transition-all font-serif`}
                    />
                    {fieldErrors.postalCode && <p className="text-xs text-red-500 font-bold ml-2">{fieldErrors.postalCode}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/50 ml-2">Country</label>
                    <select 
                      name="country" required
                      value={formData.country} onChange={handleInputChange}
                      className={`w-full bg-[#F8FAFC] rounded-2xl py-4 px-6 border ${fieldErrors.country ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#3B82F6] focus:bg-white outline-none transition-all font-serif appearance-none`}
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ghana">Ghana</option>
                      <option value="South Africa">South Africa</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                    </select>
                    {fieldErrors.country && <p className="text-xs text-red-500 font-bold ml-2">{fieldErrors.country}</p>}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl border border-[#1A1045]/5">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#FEF9C3] flex items-center justify-center text-[#B45309]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h2 className="font-serif text-2xl text-[#1A1045]">Order Notes (Optional)</h2>
                </div>
                <textarea 
                  name="notes" rows={4} placeholder="Special instructions for delivery, e.g. 'Leave at the gate' or 'Gift wrap please!'"
                  value={formData.notes} onChange={handleInputChange}
                  className="w-full bg-[#F8FAFC] rounded-2xl py-4 px-6 border border-[#1A1045]/10 focus:border-[#F59E0B] focus:bg-white outline-none transition-all font-serif resize-none"
                />
              </div>

              {/* Payment Section - Simplified for Demo */}
              <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl border border-[#1A1045]/5">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] flex items-center justify-center text-[#15803D]">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h2 className="font-serif text-2xl text-[#1A1045]">Payment Method</h2>
                </div>
                <div className="p-6 bg-green-50 rounded-3xl border border-green-100 flex items-center gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <img src="/images/paystack.png" alt="Paystack" className="w-10 grayscale hover:grayscale-0 transition-all opacity-40" />
                  </div>
                  <div>
                    <p className="text-[#1A1045] font-serif font-bold">Secure Online Payment</p>
                    <p className="text-sm text-[#1A1045]/60 font-serif italic">Payment will be processed via Paystack (Coming Soon)</p>
                  </div>
                </div>
                <div className="mt-8 flex items-center gap-3 text-xs text-[#1A1045]/40 font-bold uppercase tracking-widest pl-4">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  Secure SSL Encrypted Checkout
                </div>
              </div>
            </form>
          </div>

          {/* Summary Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-xl border border-[#1A1045]/5 sticky top-32">
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#1A1045]/5">
                <div className="w-12 h-12 rounded-2xl bg-[#FCE7F3] flex items-center justify-center text-[#BE185D]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h2 className="font-serif text-2xl text-[#1A1045]">Order Summary</h2>
              </div>

              <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item: any) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-24 rounded-2xl overflow-hidden shadow-inner bg-[#F8FAFC] shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif text-[#1A1045] truncate">{item.name}</h4>
                      <p className="text-sm text-[#1A1045]/40 font-bold uppercase tracking-widest mt-1">Qty: {item.quantity}</p>
                      <p className="text-[#1A1045] font-bold mt-2">₦{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-8 border-t border-[#1A1045]/5">
                <div className="flex justify-between text-[#1A1045]/60">
                  <span className="font-serif italic text-lg">Subtotal</span>
                  <span className="font-bold">₦{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#1A1045]/60">
                  <span className="font-serif italic text-lg">Shipping</span>
                  <span className="font-bold">Free</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t-2 border-dashed border-[#1A1045]/10">
                  <span className="font-serif text-2xl text-[#1A1045]">Total</span>
                  <div className="text-right">
                    <span className="text-3xl font-serif text-[#BE185D] block">₦{cartTotal.toLocaleString()}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/40 mt-1 block">Incl. VAT</span>
                  </div>
                </div>
              </div>

              <button 
                form="checkout-form"
                type="submit"
                disabled={isLoading}
                className="w-full mt-10 bg-[#1A1045] hover:bg-[#BE185D] text-white py-6 rounded-3xl font-bold uppercase tracking-widest text-sm transition-all duration-300 shadow-2xl disabled:opacity-50 flex items-center justify-center gap-4 group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Purchase</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {/* Support Box */}
            <div className="bg-[#E8F0FE] rounded-[30px] p-6 border border-[#1A73E8]/10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#1A73E8]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-sm text-[#1A73E8] font-serif italic">
                Need help? <Link to="/contact" className="underline font-bold">Contact Support</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
