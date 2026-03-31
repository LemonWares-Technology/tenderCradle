import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/lib/context/AuthContext";
import { Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      navigate("/admin");
    } catch {
      // Error is handled by AuthContext
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', backgroundColor: "#F8F9FA" }}
    >
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#E8F0FE] mb-5">
            <Logo className="w-7 h-7 text-[#1A73E8]" />
          </div>
          <h1 className="text-[22px] font-normal text-[#202124] mb-1">Sign in</h1>
          <p className="text-sm text-[#5F6368]">Tender Cradle Admin Dashboard</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-[#DADCE0] rounded-lg p-8 space-y-5 shadow-sm"
        >
          {error && (
            <div className="flex items-start gap-3 bg-[#FCE8E6] border border-[#F5C6CB] rounded-lg px-4 py-3">
              <div className="w-1.5 h-1.5 bg-[#D93025] rounded-full mt-1.5 shrink-0" />
              <p className="text-sm text-[#D93025] flex-1">{error}</p>
              <button
                type="button"
                onClick={clearError}
                className="text-[#D93025] hover:text-[#B31412] text-lg leading-none shrink-0"
              >
                &times;
              </button>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#202124] mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5F6368]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tendercradle.com"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DADCE0] rounded-lg text-sm text-[#202124] placeholder:text-[#9AA0A6] focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#202124] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5F6368]" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#DADCE0] rounded-lg text-sm text-[#202124] placeholder:text-[#9AA0A6] focus:outline-none focus:ring-2 focus:ring-[#1A73E8] focus:border-[#1A73E8] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5F6368] hover:text-[#202124] transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link
              to="/admin/forgot-password"
              className="text-sm text-[#1A73E8] hover:text-[#185ABC] font-medium transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-[#1A73E8] text-white text-sm font-medium rounded-lg hover:bg-[#185ABC] disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="text-center text-xs text-[#9AA0A6] mt-6">
          &copy; {new Date().getFullYear()} Tender Cradle. All rights reserved.
        </p>
      </div>
    </div>
  );
}
