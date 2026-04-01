import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCustomerAuth } from "@/lib/context/CustomerAuthContext";
import { getMyOrders, Order } from "@/lib/api/orders";
import { 
  ShoppingBag, Package, ChevronRight, 
  Clock, CheckCircle2, Truck, AlertCircle,
  ArrowLeft, Search, Calendar, CreditCard,
  Loader2, ExternalLink
} from "lucide-react";

export default function MyOrdersPage() {
  const { isAuthenticated, isLoading: authLoading } = useCustomerAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/shop/login?redirect=/shop/orders");
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) return;
      try {
        setLoading(true);
        const response = await getMyOrders();
        setOrders(response.data || []);
      } catch (err: any) {
        setError(err.message || "Failed to load your orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [isAuthenticated]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED': return 'bg-green-100 text-green-700 border-green-200';
      case 'CANCELLED': return 'bg-red-100 text-red-700 border-red-200';
      case 'PENDING': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'SHIPPED': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DELIVERED': return <CheckCircle2 className="w-4 h-4" />;
      case 'SHIPPED': return <Truck className="w-4 h-4" />;
      case 'PENDING': return <Clock className="w-4 h-4" />;
      case 'CANCELLED': return <AlertCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-[#1A1045] animate-spin" />
          <p className="font-serif italic text-[#1A1045]/60 animate-pulse">Retrieving your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Link to="/shop" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1A1045]/40 hover:text-[#1A1045] transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to Boutique
            </Link>
            <h1 className="font-serif text-5xl text-[#1A1045] tracking-tighter">My Orders.</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1045]/20" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="bg-white border border-[#1A1045]/5 rounded-2xl py-3 pl-12 pr-6 outline-none focus:border-[#3B82F6] transition-all font-serif italic text-sm w-full md:w-64 shadow-sm"
            />
          </div>
        </div>

        {error ? (
          <div className="bg-red-50 border border-red-100 rounded-[30px] p-12 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="font-serif text-xl text-red-700">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-6 text-[#1A1045] font-bold uppercase tracking-widest text-xs underline">Try Again</button>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-[40px] p-20 text-center shadow-xl border border-[#1A1045]/5">
            <div className="w-24 h-24 bg-[#F8FAFC] rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="w-10 h-10 text-[#1A1045]/10" />
            </div>
            <h2 className="font-serif text-3xl text-[#1A1045] mb-4">No orders yet.</h2>
            <p className="text-[#1A1045]/60 font-serif italic mb-10 max-w-sm mx-auto">
              Explore our boutique and find something special for your little star's journey.
            </p>
            <Link to="/shop" className="bg-[#1A1045] text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-[#3B82F6] transition-all shadow-xl">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="group bg-white rounded-[40px] overflow-hidden shadow-lg border border-[#1A1045]/5 hover:shadow-2xl transition-all duration-500">
                <div className="p-8 md:p-10">
                  <div className="flex flex-wrap items-center justify-between gap-6 mb-8 pb-8 border-b border-[#1A1045]/5">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-[#F8FAFC] flex items-center justify-center text-[#1A1045]">
                        <ShoppingBag className="w-8 h-8 opacity-20" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/40 mb-1">Order Number</p>
                        <h3 className="font-serif text-2xl text-[#1A1045]">{order.orderNumber}</h3>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4">
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] font-bold uppercase tracking-widest ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F8FAFC] border border-[#1A1045]/5 text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/60">
                        <Calendar className="w-3 h-3" />
                        {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-12 gap-10">
                    <div className="md:col-span-7 space-y-6">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-start gap-6 group/item">
                          <div className="w-20 h-24 rounded-2xl overflow-hidden shadow-inner bg-[#F8FAFC] shrink-0 border border-[#1A1045]/5">
                            <img 
                              src={(item.product?.images && item.product.images[0]) || "/images/placeholder-product.png"} 
                              alt={item.productName} 
                              className="w-full h-full object-cover transition-transform group-hover/item:scale-105" 
                            />
                          </div>
                          <div className="flex-1 pt-2">
                            <h4 className="font-serif text-lg text-[#1A1045] group-hover/item:text-[#3B82F6] transition-colors">{item.productName}</h4>
                            <div className="flex items-center gap-4 mt-2">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/40">Qty: {item.quantity}</p>
                              {item.variantName && item.variantName !== 'Default' && (
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#3B82F6]">Variant: {item.variantName}</p>
                              )}
                            </div>
                            <p className="text-sm text-[#1A1045]/60 font-serif italic mt-3">₦{parseFloat(item.unitPrice).toLocaleString()} each</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="md:col-span-5 bg-[#F8FAFC] p-8 rounded-[30px] border border-[#1A1045]/5 h-fit">
                      <div className="space-y-4 mb-8">
                        <div className="flex justify-between text-[#1A1045]/60 items-center">
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            <span className="font-serif italic">Total Amount</span>
                          </div>
                          <span className="font-bold">₦{parseFloat(order.total).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[#1A1045]/60 items-center">
                          <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4" />
                            <span className="font-serif italic">Shipping</span>
                          </div>
                          <span className="font-bold text-green-600">Free</span>
                        </div>
                      </div>
                      
                      <Link 
                        to={`/shop/orders/${order.id}`}
                        className="w-full bg-[#1A1045] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#3B82F6] transition-all shadow-lg flex items-center justify-center gap-2 group"
                      >
                        <span>Order Details</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-20 p-12 rounded-[40px] bg-[#1A1045] text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6] rounded-full blur-[100px] opacity-20 pointer-events-none" />
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="text-center md:text-left">
               <h3 className="font-serif text-3xl mb-2">Need assistance?</h3>
               <p className="text-white/60 font-serif italic">Our support team is always here for you and your little one.</p>
             </div>
             <Link to="/contact" className="bg-white text-[#1A1045] px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-[#DBEAFE] transition-all flex items-center gap-3">
               <span>Contact Support</span>
               <ExternalLink className="w-4 h-4" />
             </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
