"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  el?: keyof React.JSX.IntrinsicElements;
  once?: boolean;
}

export function SplitText({ text, className, el: Wrapper = "div", once = true }: SplitTextProps) {
  // Split words by space, keep the spaces
  const words = text.split(" ").map((word) => `${word}\u00A0`);

  return (
    <Wrapper className={className}>
      {words.map((word, index) => {
        return (
          // Mask container (overflow hidden)
          <span key={index} className="inline-block overflow-hidden align-bottom pb-2 -mb-2">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", rotate: 2 }}
              whileInView={{ y: "0%", rotate: 0 }}
              viewport={{ once, margin: "-10%" }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.04,
              }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </Wrapper>
  );
}
