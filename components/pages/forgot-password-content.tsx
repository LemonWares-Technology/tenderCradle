import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { customerForgotPassword } from "@/lib/api/password-reset";

export const ForgotPasswordContent = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      await customerForgotPassword(email);
      setIsSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Failed to send reset email. Please try again.");
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
            Check Your Email
          </h2>
          <p className="text-xl text-[#1A1045]/70 font-serif italic mb-8 leading-relaxed">
            If an account with that email exists, we've sent a password reset link to{" "}
            <span className="font-bold text-[#1A1045]">{email}</span>
          </p>
          <p className="text-sm text-[#1A1045]/60 mb-8">
            The link will expire in 1 hour. If you don't see the email, check your spam folder.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center gap-3 bg-[#3B82F6] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#1D4ED8] transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Login
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
              Forgot Your <span className="text-[#3B82F6]">Password?</span>
            </h1>
            <p className="text-lg text-[#1A1045]/60 font-serif italic">
              No worries! Enter your email and we'll send you reset instructions.
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
              <Mail className="w-8 h-8 text-[#3B82F6]" />
            </div>
            <div>
              <h2 className="font-serif text-3xl text-[#1A1045] tracking-tighter">Reset Link</h2>
              <p className="text-sm text-[#1A1045]/60 font-serif italic">We'll email you instructions</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-6 py-4 rounded-full border-2 ${
                  error ? "border-red-500" : "border-[#1A1045]/10"
                } focus:border-[#3B82F6] focus:outline-none transition-colors`}
                placeholder="your@email.com"
                disabled={isSubmitting}
              />
              {error && (
                <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#3B82F6] text-white py-4 px-6 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#1D4ED8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  Send Reset Link
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
