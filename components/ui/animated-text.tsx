"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  el?: React.ElementType;
  once?: boolean;
}

const defaultAnimations: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.65, 0.3, 0.9] as const,
    },
  },
};

export const AnimatedText = ({
  text,
  className,
  el: Wrapper = "p",
  once = true,
}: AnimatedTextProps) => {
  const words = text.split(" ");

  return (
    <Wrapper className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: 0.2 }}
        transition={{ staggerChildren: 0.05 }}
        aria-hidden
        className="inline-block"
      >
        {words.map((word, wordIndex) => (
          <span key={`${word}-${wordIndex}`} className="inline-block overflow-hidden pb-1">
            <motion.span
              variants={defaultAnimations}
              className="inline-block"
            >
              {word}
            </motion.span>
            <span className="inline-block">&nbsp;</span>
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
};
