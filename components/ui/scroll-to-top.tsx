
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState<"up" | "down">("up");

  const springProgress = useSpring(0, { stiffness: 80, damping: 20 });
  const lastScrollY = useRef(0);

  const isLanding = pathname === "/";

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      
      // Update direction
      if (scrolled > lastScrollY.current && scrolled > 0) {
        setDirection("down");
      } else if (scrolled < lastScrollY.current) {
        setDirection("up");
      }
      lastScrollY.current = scrolled;

      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? scrolled / total : 0;
      setScrollProgress(pct);
      springProgress.set(pct);
      setVisible(scrolled > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [springProgress]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG circle progress ring
  const r = 22;
  const circumference = 2 * Math.PI * r;
  const strokeDash = circumference * (1 - scrollProgress);

  return (
    <AnimatePresence>
      {visible && !isLanding && (
        <motion.button
          key="scroll-top"
          initial={{ opacity: 0, scale: 0.5, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 24 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          onClick={scrollToTop}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-6 md:bottom-10 md:right-10 z-50 w-14 h-14 flex items-center justify-center focus:outline-none"
        >
          {/* Glow pulse behind button */}
          <motion.div
            className="absolute inset-0 rounded-full bg-primary opacity-0"
            animate={hovered ? { opacity: 0.25, scale: 1.35 } : { opacity: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* SVG Progress Ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 56 56"
            fill="none"
          >
            {/* Track */}
            <circle
              cx="28" cy="28" r={r}
              strokeWidth="2.5"
              className="stroke-foreground/10"
            />
            {/* Progress fill */}
            <motion.circle
              cx="28" cy="28" r={r}
              strokeWidth="2.5"
              strokeLinecap="round"
              className="stroke-primary"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDash}
              style={{ transition: "stroke-dashoffset 0.25s ease" }}
            />
          </svg>

          {/* Inner button face */}
          <motion.div
            className="relative z-10 w-9 h-9 rounded-full bg-foreground flex items-center justify-center shadow-lg"
            animate={hovered ? { backgroundColor: "var(--color-primary)", scale: 1.08 } : { scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            <motion.div
              animate={{ 
                rotate: direction === "down" ? 180 : 0,
                y: hovered ? (direction === "down" ? 2 : -2) : 0 
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <ArrowUp className="w-4 h-4 text-background" strokeWidth={2.5} />
            </motion.div>
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
