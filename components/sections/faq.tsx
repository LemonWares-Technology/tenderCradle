
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageCircle, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What age groups does Tender Cradle cater to?",
    answer: "We welcome children from 6 months to 6 years of age. Our programmes are carefully structured into three stages: Infant (6–18 months), Toddler (18 months–3 years), and Early Years (3–6 years), each with dedicated Montessori-trained caregivers.",
  },
  {
    question: "How do I enroll my child?",
    answer: "Enrollment begins with a complimentary visit to our centre so your child can explore the environment. You can schedule a visit via our Contact page. Enrollment is confirmed upon completion of our form and a first-term deposit.",
  },
  {
    question: "Are the products in the shop exclusive to enrolled families?",
    answer: "No — our shop is open to all parents and guardians. Enrolled families enjoy a 15% discount on all purchases as a loyalty benefit.",
  },
  {
    question: "What is the teacher-to-child ratio?",
    answer: "We maintain a maximum ratio of 1 teacher to 5 children for infants and toddlers, and 1:8 for our Early Years class, ensuring personalised attention.",
  },
  {
    question: "Do you follow the Nigerian national curriculum?",
    answer: "Our programme is grounded in the Montessori Method while also aligning with NERDC's core competency guidelines. We go beyond compliance.",
  },
  {
    question: "Can I track my child's progress?",
    answer: "Yes. We provide bi-weekly digital progress reports through our parent portal. We believe parents are essential partners in every child's journey.",
  },
];

export const FAQSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="relative w-full py-24 md:py-40 bg-[#FFFBEB] text-[#1A1045] overflow-hidden">
      
      {/* Decorative Floating Icons */}
      <motion.div 
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[10%] text-yellow-200/50 text-8xl pointer-events-none select-none"
      >
        ❓
      </motion.div>
      <motion.div 
        animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-[5%] text-orange-200/50 text-9xl pointer-events-none select-none"
      >
        💡
      </motion.div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Left: Playful Header */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-white shadow-md flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-yellow-600" />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-yellow-700">Curious Minds</span>
              </div>
              
              <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl leading-[0.9] tracking-tighter text-[#1A1045] mb-8">
                Questions{" "}
                <span className="relative inline-block text-orange-500">
                  Answered
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                    <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#FDE68A" strokeWidth="8" fill="none" strokeLinecap="round"/>
                  </svg>
                </span>
                .
              </h2>
              
              <p className="text-[#1A1045]/60 leading-relaxed text-lg md:text-xl font-serif italic mb-10">
                Everything you need to know about Tender Cradle. Still curious?
              </p>
              
              <a 
                href="/contact" 
                className="inline-flex items-center gap-3 bg-white border-2 border-orange-100 text-[#1A1045] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:border-orange-500 transition-all duration-500 shadow-sm"
              >
                Send us a message <MessageCircle className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Right: Bubbly Accordion */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-[32px] overflow-hidden transition-all duration-500 border-2 ${openIdx === idx ? "bg-white border-orange-200 shadow-xl scale-[1.02]" : "bg-white/50 border-transparent hover:bg-white"}`}
              >
                <button
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className="w-full flex items-center justify-between gap-8 p-6 md:p-8 text-left"
                >
                  <span className={`font-serif text-xl md:text-2xl leading-tight transition-colors ${openIdx === idx ? "text-orange-600" : "text-[#1A1045]"}`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${openIdx === idx ? "bg-orange-500 text-white rotate-180" : "bg-orange-100 text-orange-600"}`}>
                    {openIdx === idx ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
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
                      <div className="px-6 md:px-8 pb-8">
                        <p className="text-[#1A1045]/60 leading-relaxed font-serif italic text-base md:text-lg max-w-2xl border-t border-orange-100 pt-6">
                          {faq.answer}
                        </p>
                      </div>
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
