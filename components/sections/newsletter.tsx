"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="w-full py-20 md:py-28 lg:py-32 bg-foreground/3 border-t border-foreground/10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">

          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-8"
          >
            <Mail className="w-7 h-7" />
          </motion.div>

          {/* Pill label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px w-10 bg-primary" />
            <span className="text-sm font-bold uppercase tracking-widest text-primary">Stay Connected</span>
            <div className="h-px w-10 bg-primary" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tighter text-foreground mb-5"
          >
            Parenting tips, delivered monthly.
          </motion.h2>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-foreground/50 text-base md:text-lg font-light leading-relaxed mb-10 md:mb-12 max-w-xl mx-auto"
          >
            Join 2,000+ Nigerian parents who receive our curated newsletter — Montessori activities, development milestones, and exclusive shop discounts.
          </motion.p>

          {/* Form / Success */}
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex flex-col items-center gap-4 text-foreground"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.15 }}
                >
                  <CheckCircle2 className="w-12 h-12 text-primary" />
                </motion.div>
                <p className="font-serif text-xl md:text-2xl">Thank you for subscribing!</p>
                <p className="text-foreground/50 text-sm">Your first edition will land soon. Check your inbox.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-5 py-4 rounded-full border border-foreground/20 bg-background text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground text-sm font-sans transition-all duration-300 focus:ring-2 focus:ring-foreground/10"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto px-7 py-4 rounded-full bg-foreground text-background font-bold uppercase tracking-widest text-sm hover:bg-primary transition-colors duration-500 flex items-center gap-2 justify-center shrink-0 shadow-md"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Fine print */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-foreground/30 text-xs mt-6 font-sans"
          >
            No spam, ever. Unsubscribe at any time.
          </motion.p>
        </div>
      </div>
    </section>
  );
};
