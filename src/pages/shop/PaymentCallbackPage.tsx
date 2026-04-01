import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { verifyPayment } from "@/lib/api/payments";
import { Loader2, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export default function PaymentCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const reference = searchParams.get('reference');
    
    if (!reference) {
      setStatus('failed');
      setError('No payment reference found');
      return;
    }

    const verify = async () => {
      try {
        console.log('Verifying payment with reference:', reference);
        const result = await verifyPayment(reference);
        console.log('Payment verification result:', result);
        
        if (result.status === 'success') {
          setStatus('success');
          setOrder(result.order);
        } else {
          setStatus('failed');
          setError('Payment verification failed');
        }
      } catch (err: any) {
        console.error('Payment verification error:', err);
        setStatus('failed');
        setError(err.message || 'Failed to verify payment');
      }
    };

    verify();
  }, [searchParams]);

  if (status === 'verifying') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-[40px] p-12 text-center shadow-2xl border border-[#1A1045]/5">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Loader2 className="w-12 h-12 text-[#3B82F6] animate-spin" />
          </div>
          
          <h1 className="font-serif text-5xl text-[#1A1045] mb-4 tracking-tighter">
            Verifying Payment...
          </h1>
          <p className="text-xl text-[#1A1045]/60 font-serif italic">
            Please wait while we confirm your payment.
          </p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6 py-32">
        <div className="max-w-2xl mx-auto bg-white rounded-[40px] p-12 text-center shadow-2xl border border-[#1A1045]/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600" />
          
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="font-serif text-5xl text-[#1A1045] mb-4 tracking-tighter">
            Payment Successful!
          </h1>
          <p className="text-xl text-[#1A1045]/60 font-serif italic mb-8">
            Thank you for your purchase! Your order has been confirmed and will be processed shortly.
          </p>
          
          {order && (
            <div className="bg-[#F8FAFC] rounded-2xl p-6 mb-10 border border-[#1A1045]/5">
              <p className="text-sm font-bold uppercase tracking-widest text-[#1A1045]/40 mb-2">
                Order Number
              </p>
              <p className="text-3xl font-serif text-[#1A1045] mb-4">{order.orderNumber}</p>
              
              <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#1A1045]/10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#1A1045]/40 mb-1">
                    Payment Status
                  </p>
                  <p className="text-lg font-bold text-green-600">PAID</p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#1A1045]/40 mb-1">
                    Total Amount
                  </p>
                  <p className="text-lg font-bold text-[#1A1045]">
                    ₦{parseFloat(order.total).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/shop/orders" 
              className="bg-[#1A1045] text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-[#3B82F6] transition-all shadow-xl"
            >
              View My Orders
            </Link>
            <Link 
              to="/shop" 
              className="bg-white text-[#1A1045] border-2 border-[#1A1045]/10 px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:border-[#1A1045] transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Failed state
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6 py-32">
      <div className="max-w-2xl mx-auto bg-white rounded-[40px] p-12 text-center shadow-2xl border border-[#1A1045]/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-400 via-rose-500 to-pink-600" />
        
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <XCircle className="w-12 h-12 text-red-600" />
        </div>
        
        <h1 className="font-serif text-5xl text-[#1A1045] mb-4 tracking-tighter">
          Payment Failed
        </h1>
        <p className="text-xl text-red-600 font-serif italic mb-8">
          {error || 'We could not verify your payment. Please try again.'}
        </p>
        
        <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-10 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-1" />
          <div className="text-left">
            <p className="text-sm text-red-900 font-bold mb-2">What happened?</p>
            <p className="text-sm text-red-700">
              Your payment may have been declined, cancelled, or there was an issue with the payment gateway. 
              Don't worry - if any amount was deducted, it will be refunded within 3-5 business days.
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/shop/orders" 
            className="bg-[#1A1045] text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-[#3B82F6] transition-all shadow-xl"
          >
            View My Orders
          </Link>
          <Link 
            to="/shop" 
            className="bg-white text-[#1A1045] border-2 border-[#1A1045]/10 px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm hover:border-[#1A1045] transition-all"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}
