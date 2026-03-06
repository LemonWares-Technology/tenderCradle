"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Adaeze Okonkwo",
    role: "Mother of two · Lagos",
    quote: "Tender Cradle transformed how my children approach learning. Teachers are extraordinarily attentive and the Montessori materials are top-quality. Worth every naira.",
    rating: 5,
    avatar: "A",
  },
  {
    name: "Chukwuemeka Eze",
    role: "Father · Port Harcourt",
    quote: "My daughter went from shy and withdrawn to confident and articulate in just one term. The caregivers here truly understand early childhood development on a deep level.",
    rating: 5,
    avatar: "C",
  },
  {
    name: "Funmilayo Adeyemi",
    role: "Mother · Abuja",
    quote: "The uniforms, learning kits, and books are all thoughtfully designed. As a parent, you can see the intentionality in every single product and activity offered here.",
    rating: 5,
    avatar: "F",
  },
  {
    name: "Babajide Salawu",
    role: "Father of three · Ibadan",
    quote: "I enrolled all three of my children here. The consistency in quality and care is unprecedented. I recommend Tender Cradle to every parent I know without hesitation.",
    rating: 5,
    avatar: "B",
  },
  {
    name: "Ngozi Amaechi",
    role: "Mother · Enugu",
    quote: "The online shop is incredibly convenient. Materials arrive beautifully packaged and the quality speaks for itself. My son treasures his Montessori box.",
    rating: 5,
    avatar: "N",
  },
];

export const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section className="w-full py-24 md:py-32 bg-background text-foreground border-t border-foreground/10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24"
        >
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-16 bg-primary" />
              <span className="text-sm font-bold uppercase tracking-widest text-primary">What Parents Say</span>
            </div>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter">
              Trusted by families.
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              className="w-14 h-14 rounded-full border border-foreground/20 flex items-center justify-center hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-14 h-14 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-primary transition-colors duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Testimonial Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          >
            {/* Quote */}
            <div className="lg:col-span-8">
              {/* Stars */}
              <div className="flex items-center gap-1 mb-8">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-foreground mb-10 max-w-4xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </div>

            {/* Author */}
            <div className="lg:col-span-4 flex items-center gap-5 lg:mt-20">
              <div className="w-16 h-16 rounded-full bg-primary text-background flex items-center justify-center font-serif text-2xl shrink-0">
                {t.avatar}
              </div>
              <div>
                <p className="font-medium text-foreground text-lg">{t.name}</p>
                <p className="text-sm text-foreground/50 mt-1">{t.role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex items-center gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-foreground" : "w-2 bg-foreground/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
