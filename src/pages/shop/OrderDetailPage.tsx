import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCustomerAuth } from "@/lib/context/CustomerAuthContext";
import { getMyOrder, Order, cancelOrder } from "@/lib/api/orders";
import { 
  ArrowLeft, Package, MapPin, CreditCard, Calendar,
  CheckCircle2, Clock, Truck, AlertCircle, XCircle,
  Loader2, Phone, Mail, User
} from "lucide-react";

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, isLoading: authLoading } = useCustomerAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/shop/login?redirect=/shop/orders");
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!isAuthenticated || !id) return;
      try {
        setLoading(true);
        const data = await getMyOrder(id);
        setOrder(data);
      } catch (err: any) {
        setError(err.message || "Failed to load order details");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [isAuthenticated, id]);

  const handleCancelOrder = async () => {
    if (!order || !window.confirm("Are you sure you want to cancel this order?")) return;
    
    setIsCancelling(true);
    try {
      const reason = prompt("Please provide a reason for cancellation (optional):");
      await cancelOrder(order.id, reason || undefined);
      // Refresh order data
      const updatedOrder = await getMyOrder(order.id);
      setOrder(updatedOrder);
    } catch (err: any) {
      alert(err.message || "Failed to cancel order");
    } finally {
      setIsCancelling(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED': return 'bg-green-100 text-green-700 border-green-200';
      case 'CANCELLED': return 'bg-red-100 text-red-700 border-red-200';
      case 'PENDING': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'SHIPPED': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'PROCESSING': return 'bg-purple-100 text-purple-700 border-purple-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DELIVERED': return <CheckCircle2 className="w-5 h-5" />;
      case 'SHIPPED': return <Truck className="w-5 h-5" />;
      case 'PENDING': return <Clock className="w-5 h-5" />;
      case 'CANCELLED': return <XCircle className="w-5 h-5" />;
      case 'PROCESSING': return <Package className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'bg-green-100 text-green-700 border-green-200';
      case 'FAILED': return 'bg-red-100 text-red-700 border-red-200';
      case 'PENDING': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-[#1A1045] animate-spin" />
          <p className="font-serif italic text-[#1A1045]/60">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-red-50 border border-red-100 rounded-[40px] p-12 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="font-serif text-3xl text-red-700 mb-4">Order Not Found</h2>
            <p className="text-red-600 mb-8">{error || "This order doesn't exist or you don't have permission to view it."}</p>
            <Link to="/shop/orders" className="inline-flex items-center gap-2 bg-[#1A1045] text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-[#3B82F6] transition-all">
              <ArrowLeft className="w-4 h-4" />
              Back to Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const canCancel = order.status === 'PENDING' && order.paymentStatus !== 'PAID';

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-12">
          <Link to="/shop/orders" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1A1045]/40 hover:text-[#1A1045] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Orders
          </Link>
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h1 className="font-serif text-5xl text-[#1A1045] tracking-tighter mb-2">Order Details.</h1>
              <p className="text-[#1A1045]/60 font-serif italic">Order #{order.orderNumber}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className={`flex items-center gap-2 px-6 py-3 rounded-full border ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                <span className="font-bold text-sm uppercase tracking-widest">{order.status}</span>
              </div>
              <div className={`flex items-center gap-2 px-6 py-3 rounded-full border ${getPaymentStatusColor(order.paymentStatus)}`}>
                <CreditCard className="w-4 h-4" />
                <span className="font-bold text-sm uppercase tracking-widest">{order.paymentStatus}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Items */}
            <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl border border-[#1A1045]/5">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#1A1045]/5">
                <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] flex items-center justify-center">
                  <Package className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <h2 className="font-serif text-2xl text-[#1A1045]">Order Items</h2>
              </div>

              <div className="space-y-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-6 pb-6 border-b border-[#1A1045]/5 last:border-0 last:pb-0">
                    <div className="w-24 h-28 rounded-2xl overflow-hidden shadow-inner bg-[#F8FAFC] shrink-0 border border-[#1A1045]/5">
                      <img 
                        src={(item.product?.images && item.product.images[0]) || "/images/placeholder-product.png"} 
                        alt={item.productName} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl text-[#1A1045] mb-2">{item.productName}</h3>
                      {item.variantName && item.variantName !== 'Default' && (
                        <p className="text-sm text-[#3B82F6] font-bold mb-2">Variant: {item.variantName}</p>
                      )}
                      <p className="text-xs font-bold uppercase tracking-widest text-[#1A1045]/40 mb-3">SKU: {item.sku}</p>
                      <div className="flex items-center gap-6">
                        <p className="text-sm text-[#1A1045]/60">₦{parseFloat(item.unitPrice).toLocaleString()} × {item.quantity}</p>
                        <p className="text-lg font-bold text-[#1A1045]">₦{parseFloat(item.total).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-[40px] p-8 md:p-10 shadow-xl border border-[#1A1045]/5">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#1A1045]/5">
                <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#15803D]" />
                </div>
                <h2 className="font-serif text-2xl text-[#1A1045]">Shipping Address</h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-[#1A1045]/40" />
                  <p className="text-[#1A1045]">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#1A1045]/40 mt-1" />
                  <div>
                    <p className="text-[#1A1045]">{order.shippingAddress.address}</p>
                    <p className="text-[#1A1045]/60">
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
                    </p>
                    <p className="text-[#1A1045]/60">{order.shippingAddress.country}</p>
                  </div>
                </div>
                {order.shippingAddress.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#1A1045]/40" />
                    <p className="text-[#1A1045]">{order.shippingAddress.phone}</p>
                  </div>
                )}
                {order.shippingAddress.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#1A1045]/40" />
                    <p className="text-[#1A1045]">{order.shippingAddress.email}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Notes */}
            {order.notes && (
              <div className="bg-[#FEF9C3] rounded-[40px] p-8 md:p-10 border border-[#F59E0B]/20">
                <h3 className="font-bold text-sm uppercase tracking-widest text-[#B45309] mb-4">Order Notes</h3>
                <p className="text-[#1A1045] font-serif italic">{order.notes}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Order Summary */}
            <div className="bg-white rounded-[40px] p-8 shadow-xl border border-[#1A1045]/5 sticky top-32">
              <h2 className="font-serif text-2xl text-[#1A1045] mb-8 pb-6 border-b border-[#1A1045]/5">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-[#1A1045]/60">
                  <span className="font-serif italic">Subtotal</span>
                  <span className="font-bold">₦{parseFloat(order.subtotal).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#1A1045]/60">
                  <span className="font-serif italic">Tax</span>
                  <span className="font-bold">₦{parseFloat(order.tax).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#1A1045]/60">
                  <span className="font-serif italic">Shipping</span>
                  <span className="font-bold">₦{parseFloat(order.shippingCost).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t-2 border-dashed border-[#1A1045]/10">
                  <span className="font-serif text-xl text-[#1A1045]">Total</span>
                  <span className="text-2xl font-serif text-[#BE185D]">₦{parseFloat(order.total).toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-[#1A1045]/5">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-[#1A1045]/40" />
                  <span className="text-[#1A1045]/60">Ordered on {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                {order.paymentReference && (
                  <div className="flex items-center gap-2 text-sm">
                    <CreditCard className="w-4 h-4 text-[#1A1045]/40" />
                    <span className="text-[#1A1045]/60 text-xs">Ref: {order.paymentReference}</span>
                  </div>
                )}
              </div>

              {canCancel && (
                <button
                  onClick={handleCancelOrder}
                  disabled={isCancelling}
                  className="w-full mt-8 bg-red-50 text-red-600 border-2 border-red-200 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-red-100 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isCancelling ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Cancelling...</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" />
                      <span>Cancel Order</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Help Card */}
            <div className="bg-[#E0F2FE] rounded-[30px] p-6 border border-[#3B82F6]/20">
              <h3 className="font-bold text-sm uppercase tracking-widest text-[#1D4ED8] mb-3">Need Help?</h3>
              <p className="text-sm text-[#1A1045]/70 font-serif italic mb-4">
                Have questions about your order? Our support team is here to help.
              </p>
              <Link to="/contact" className="text-[#1D4ED8] font-bold text-xs uppercase tracking-widest underline">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
