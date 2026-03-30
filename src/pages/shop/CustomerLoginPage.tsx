import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCustomerAuth } from "@/lib/context/CustomerAuthContext";
import { Eye, EyeOff, Lock, Mail, Loader2, ArrowLeft } from "lucide-react";

export default function CustomerLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, fieldErrors, clearError } = useCustomerAuth();
  const navigate = useNavigate();

  const handleInputChange = (setter: (v: string) => void, value: string) => {
    setter(value);
    if (error) clearError();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/shop");
    } catch {
      // Error is handled by CustomerAuthContext
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Playful Background Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#E0F2FE] rounded-full blur-[100px] opacity-60 animate-pulse" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#FFE66D]/10 rounded-full blur-[80px] opacity-50" />

      <div className="w-full max-md relative">
        {/* Back Link */}
        <Link 
          to="/shop" 
          className="inline-flex items-center gap-2 text-[#1A1045]/40 hover:text-[#3B82F6] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-[10px] uppercase tracking-widest">Back to Boutique</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-5xl text-[#1A1045] tracking-tighter mb-3">
            Welcome <span className="text-[#3B82F6] italic">Back</span>.
          </h1>
          <p className="text-[#1A1045]/50 font-serif italic">Sign in to access your little treasures</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-[40px] shadow-2xl shadow-[#1A1045]/5 border border-[#1A1045]/5 p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Alert (Global) */}
            {error && !Object.keys(fieldErrors).length && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-4 text-red-600 text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <div className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                <p className="flex-1">{error}</p>
                <button
                  type="button"
                  onClick={clearError}
                  className="text-red-400 hover:text-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1045]/40 ml-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 ${fieldErrors.email ? 'text-red-400' : 'text-[#1A1045]/20 group-focus-within:text-[#3B82F6]'} transition-colors`} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleInputChange(setEmail, e.target.value)}
                  placeholder="name@example.com"
                  required
                  className={`w-full pl-14 pr-6 py-4 bg-[#F8FAFC] border ${fieldErrors.email ? 'border-red-500' : 'border-[#1A1045]/5'} rounded-2xl text-[#1A1045] placeholder:text-[#1A1045]/20 focus:outline-none focus:ring-4 focus:ring-[#3B82F6]/5 focus:border-[#3B82F6]/20 transition-all font-serif italic`}
                />
              </div>
              {fieldErrors.email && <p className="text-[10px] text-red-500 font-bold ml-2 uppercase tracking-wider">{fieldErrors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1045]/40">
                  Password
                </label>
                <Link to="/forgot-password" title="Forgot Password" className="text-[10px] font-bold uppercase tracking-widest text-[#3B82F6] hover:text-[#1D4ED8] transition-colors">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 ${fieldErrors.password ? 'text-red-400' : 'text-[#1A1045]/20 group-focus-within:text-[#3B82F6]'} transition-colors`} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handleInputChange(setPassword, e.target.value)}
                  placeholder="••••••••"
                  required
                  className={`w-full pl-14 pr-14 py-4 bg-[#F8FAFC] border ${fieldErrors.password ? 'border-red-500' : 'border-[#1A1045]/5'} rounded-2xl text-[#1A1045] placeholder:text-[#1A1045]/20 focus:outline-none focus:ring-4 focus:ring-[#3B82F6]/5 focus:border-[#3B82F6]/20 transition-all font-serif italic`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#1A1045]/20 hover:text-[#1A1045]/40 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.password && <p className="text-[10px] text-red-500 font-bold ml-2 uppercase tracking-wider">{fieldErrors.password}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-[#1A1045] text-white font-bold uppercase tracking-[0.2em] text-[10px] rounded-2xl hover:bg-[#3B82F6] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#1A1045]/10 hover:shadow-[#3B82F6]/20 hover:-translate-y-0.5 active:translate-y-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-8 border-t border-[#1A1045]/5 text-center">
            <p className="text-[#1A1045]/40 font-serif italic text-sm">
              Don't have an account?{" "}
              <Link to="/shop/register" className="text-[#3B82F6] font-bold not-italic hover:underline underline-offset-4 transition-all">
                Create one
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[#1A1045]/20 text-[10px] uppercase tracking-widest mt-10">
          © {new Date().getFullYear()} Tender Cradle Boutique
        </p>
      </div>
    </div>
  );
}
