
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail, Sparkles } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/api/newsletter";
import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address")
});

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);

    // Zod validation (Local)
    const validation = newsletterSchema.safeParse({ email });
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      setIsLoading(false);
      return;
    }

    try {
      await subscribeToNewsletter(email);
      setSubmitted(true);
    } catch (err: any) {
      // Handle structured ApiError
      if (err.errors && err.errors.length > 0) {
        const aggregatedMessage = err.errors
          .map((e: any) => e.message)
          .join(" ");
        setError(aggregatedMessage);
      } else {
        setError(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative w-full py-24 md:py-32 bg-[#DB2777] overflow-hidden">
      
      {/* Decorative floating elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 text-white/10 text-9xl pointer-events-none select-none"
      >
        ☁️
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 text-white/10 text-9xl pointer-events-none select-none"
      >
        🌟
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/4 text-white/10 text-6xl pointer-events-none select-none"
      >
        ✨
      </motion.div>

      {/* Wavy top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180" aria-hidden="true">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-14 fill-[#2563EB]">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Wavy bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-14 fill-[#2D0057]">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center">

          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="w-20 h-20 rounded-[32px] bg-white text-[#DB2777] flex items-center justify-center mx-auto mb-10 shadow-2xl rotate-3"
          >
            <Mail className="w-10 h-10" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-6xl text-white tracking-tighter mb-6"
          >
            Keep in the{" "}
            <span className="relative inline-block text-[#FEF08A]">
              loop
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 100 10" fill="none">
                <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
            !
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-white/80 text-xl font-serif italic mb-12 max-w-xl mx-auto"
          >
            Join our mailing list for parenting tips, curriculum updates, and news from our little stars.
          </motion.p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <div key="form-container">
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubmit}
                  className="relative max-w-md mx-auto mb-4"
                >
                  <div className="relative group">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className={`w-full bg-white text-[#1A1045] px-8 py-6 rounded-full text-lg focus:outline-none focus:ring-4 ${error ? 'border-2 border-red-500 focus:ring-red-500/30' : 'focus:ring-white/30'} transition-all placeholder:text-[#1A1045]/40 shadow-2xl disabled:opacity-70`}
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="absolute right-2 top-2 bottom-2 bg-[#DB2777] text-white px-8 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#1A1045] transition-all flex items-center justify-center gap-2 group-hover:pr-10 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Wait...</span>
                        </div>
                      ) : (
                        <>
                          Subscribe
                          <Sparkles className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-white/80 text-sm font-serif italic"
                  >
                    {error}
                  </motion.p>
                )}
              </div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-md rounded-[40px] p-10 border-2 border-white/20 inline-block text-white"
              >
                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-8 h-8 text-[#DB2777]" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-2">Welcome to the family!</h3>
                <p className="text-white/70">You&apos;ve successfully joined our newsletter.</p>
              </motion.div>
            )}
          </AnimatePresence>


        </div>
      </div>
    </section>
  );
};
