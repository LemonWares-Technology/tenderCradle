import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowLeft, CheckCircle2, Loader2, Eye, EyeOff, AlertCircle, Sparkles } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { customerResetPassword, validatePassword } from "@/lib/api/password-reset";

export const ResetPasswordContent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  useEffect(() => {
    if (!token) {
      setError("Invalid reset link. Please request a new password reset.");
    }
  }, [token]);

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    const validation = validatePassword(value);
    setPasswordErrors(validation.errors);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Invalid reset link");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    const validation = validatePassword(password);
    if (!validation.isValid) {
      setError("Please fix the password requirements below");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      await customerResetPassword(token, password);
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      setError(err?.message || "Failed to reset password. The link may have expired.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6 py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 md:p-16 rounded-[40px] shadow-2xl max-w-2xl w-full text-center border border-[#1A1045]/5"
        >
          <div className="w-24 h-24 rounded-full bg-[#DCFCE7] flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-[#15803D]" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1045] mb-6 tracking-tighter">
            Password Reset Successful!
          </h2>
          <p className="text-xl text-[#1A1045]/70 font-serif italic mb-8">
            Your password has been reset successfully. Redirecting to login...
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-3 bg-[#3B82F6] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#1D4ED8] transition-all"
          >
            Go to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-32">
      <div className="container mx-auto px-6 md:px-12 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6 bg-white shadow-sm border border-[#1A1045]/5">
              <Sparkles className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#3B82F6]">
                Password Reset
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-[#1A1045] mb-4 tracking-tighter">
              Reset Your <span className="text-[#3B82F6]">Password</span>
            </h1>
            <p className="text-lg text-[#1A1045]/60 font-serif italic">
              Enter your new password below
            </p>
          </motion.div>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-[#1A1045]/5"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-[#DBEAFE] flex items-center justify-center">
              <Lock className="w-8 h-8 text-[#3B82F6]" />
            </div>
            <div>
              <h2 className="font-serif text-3xl text-[#1A1045] tracking-tighter">New Password</h2>
              <p className="text-base text-[#1A1045]/60 font-serif italic">Choose a strong password</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* New Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className={`w-full px-6 py-4 pr-12 rounded-full border-2 ${
                    passwordErrors.length > 0 && password ? "border-red-500" : "border-[#1A1045]/10"
                  } focus:border-[#3B82F6] focus:outline-none transition-colors`}
                  placeholder="Enter new password"
                  disabled={isSubmitting || !token}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1045]/40 hover:text-[#1A1045]/70"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password Requirements */}
              {password && (
                <div className="mt-4 p-4 bg-[#F8FAFC] rounded-[20px] space-y-2">
                  {[
                    { text: "At least 8 characters", check: password.length >= 8 },
                    { text: "One uppercase letter", check: /[A-Z]/.test(password) },
                    { text: "One number", check: /[0-9]/.test(password) },
                    { text: "One special character", check: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
                  ].map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {req.check ? (
                        <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-[#1A1045]/30" />
                      )}
                      <span className={req.check ? "text-[#15803D] font-medium" : "text-[#1A1045]/60"}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-6 py-4 pr-12 rounded-full border-2 ${
                    confirmPassword && password !== confirmPassword ? "border-red-500" : "border-[#1A1045]/10"
                  } focus:border-[#3B82F6] focus:outline-none transition-colors`}
                  placeholder="Confirm new password"
                  disabled={isSubmitting || !token}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1045]/40 hover:text-[#1A1045]/70"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  Passwords do not match
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-[20px] p-4">
                <p className="text-base text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !token || passwordErrors.length > 0 || password !== confirmPassword}
              className="w-full bg-[#3B82F6] text-white py-4 px-6 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Resetting Password...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Reset Password
                </>
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-8 pt-8 border-t border-[#1A1045]/10 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-[#1A1045]/60 hover:text-[#1A1045] text-sm font-bold uppercase tracking-widest transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
