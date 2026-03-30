
import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  children?: ReactNode;
  className?: string;
  imageClassName?: string;
  src: string;
  alt: string;
  speed?: number;
}

export const ParallaxImage = ({
  children,
  className,
  imageClassName,
  src,
  alt,
  speed = 1,
}: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 20}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        style={{ y }}
        src={src}
        alt={alt}
        className={cn("absolute inset-0 h-[120%] w-full object-cover", imageClassName)}
      />
      {children && (
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      )}
    </div>
  );
};
