"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(target: number, duration = 1500, decimals = 0) {
  const [count, setCount] = useState(0);
  const ref = useRef(false);

  const start = () => {
    if (ref.current) return;
    ref.current = true;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return { count, start };
}

const stats = [
  { raw: 450, display: "450+", label: "Children Enrolled", suffix: "", decimals: 0 },
  { raw: 12, display: "12", label: "Years Active", suffix: "yrs", decimals: 0 },
  { raw: 4.9, display: "4.9", label: "Avg Parent Rating", suffix: "★", decimals: 1 },
  { raw: 98, display: "98", label: "Satisfaction Rate", suffix: "%", decimals: 0 },
];

function StatCard({ stat, delay }: { stat: (typeof stats)[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { count, start } = useCountUp(stat.raw, 1800, stat.decimals);

  useEffect(() => {
    if (inView) start();
  }, [inView, start]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-start gap-2"
    >
      {/* Number */}
      <div className="flex items-end gap-1">
        <span className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tighter text-background tabular-nums">
          {stat.decimals > 0 ? count.toFixed(stat.decimals) : Math.round(count)}
          {stat.raw === 450 && count >= 450 ? "+" : ""}
        </span>
        <span className="font-serif text-2xl md:text-4xl text-primary mb-1 md:mb-2 leading-none">
          {stat.suffix}
        </span>
      </div>
      {/* Label */}
      <p className="text-background/50 text-xs md:text-sm uppercase tracking-widest font-sans font-bold mt-1">
        {stat.label}
      </p>
      {/* Animated underline */}
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: "2.5rem" } : {}}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
        className="h-px bg-primary"
      />
    </motion.div>
  );
}

export const StatsSection = () => {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-foreground text-background overflow-hidden relative">
      {/* Subtle background texture line */}
      <div className="absolute inset-0 flex items-center pointer-events-none" aria-hidden="true">
        <div className="w-full h-px bg-background/5" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12 md:mb-16"
        >
          <div className="h-px w-12 bg-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary">By the Numbers</span>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 md:gap-12 lg:gap-16">
          {stats.map((stat, idx) => (
            <StatCard key={idx} stat={stat} delay={idx * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
};
