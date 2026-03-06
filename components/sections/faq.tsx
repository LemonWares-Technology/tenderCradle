"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What age groups does Tender Cradle cater to?",
    answer: "We welcome children from 6 months to 6 years of age. Our programmes are carefully structured into three stages: Infant (6–18 months), Toddler (18 months–3 years), and Early Years (3–6 years), each with dedicated Montessori-trained caregivers.",
  },
  {
    question: "How do I enroll my child?",
    answer: "Enrollment begins with a complimentary visit to our centre so your child can explore the environment and our team can understand your family's needs. You can schedule a visit via our Contact page or call us directly. Enrollment is confirmed upon completion of our registration form and a first-term deposit.",
  },
  {
    question: "Are the products in the shop exclusive to enrolled families?",
    answer: "No — our shop is open to all parents and guardians. Every product has been personally selected or designed by our curriculum team. Enrolled families enjoy a 15% discount on all shop purchases as a loyalty benefit.",
  },
  {
    question: "What is the teacher-to-child ratio?",
    answer: "We maintain a maximum ratio of 1 teacher to 5 children for infants and toddlers, and 1:8 for our Early Years class. This ensures every child receives meaningful, personalised attention throughout the day.",
  },
  {
    question: "Do you follow the Nigerian national curriculum?",
    answer: "Our programme is grounded in the Montessori Method and internationally recognised Early Childhood Development (ECD) frameworks, while also aligning with NERDC's core competency guidelines for early learning. We go beyond compliance — we exceed it.",
  },
  {
    question: "Can I track my child's progress?",
    answer: "Yes. We provide bi-weekly digital progress reports through our parent portal, along with a formal end-of-term parent-teacher conference. We believe parents are essential partners in every child's development journey.",
  },
];

export const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="w-full py-24 md:py-32 bg-background text-foreground border-t border-foreground/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Left: Sticky Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-16 bg-primary" />
                <span className="text-sm font-bold uppercase tracking-widest text-primary">FAQs</span>
              </div>
              <h2 className="font-serif text-5xl md:text-6xl leading-[0.9] tracking-tighter mb-6">
                Questions answered.
              </h2>
              <p className="text-foreground/50 leading-relaxed text-lg font-light">
                Everything you need to know about Tender Cradle. Can&apos;t find an answer?{" "}
                <a href="/contact" className="text-foreground underline underline-offset-4 hover:text-primary transition-colors">
                  Write to us.
                </a>
              </p>
            </motion.div>
          </div>

          {/* Right: Accordion */}
          <div className="lg:col-span-8 border-t border-foreground/10">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="border-b border-foreground/10"
              >
                <button
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className="w-full flex items-start justify-between gap-8 py-7 text-left group"
                >
                  <span className={`font-serif text-xl md:text-2xl leading-snug transition-colors ${openIdx === idx ? "text-primary" : "group-hover:text-primary"}`}>
                    {faq.question}
                  </span>
                  <span className="shrink-0 mt-1 text-foreground/40 group-hover:text-foreground transition-colors">
                    {openIdx === idx ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openIdx === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 text-foreground/60 leading-relaxed font-sans font-light text-lg max-w-2xl">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
