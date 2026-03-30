import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const bubbles = [
  {
    image: "/images/disney_butterfly_1773830927660.png",
    alt: "Magical Butterfly",
    size: 120,
    initialX: 15,
    initialY: 20,
  },
  {
    image: "/images/disney_child_learning_1773830945347.png",
    alt: "Happy Learning",
    size: 140,
    initialX: 75,
    initialY: 15,
  },
  {
    image: "/images/disney_girl_painting_1773833475912.png",
    alt: "Creative Arts",
    size: 160,
    initialX: 25,
    initialY: 55,
  },
  {
    image: "/images/disney_boy_books_1773833455725.png",
    alt: "Story Time",
    size: 150,
    initialX: 70,
    initialY: 60,
  },
  {
    image: "/images/disney_boy_magnifying_1773833657154.png",
    alt: "Little Explorer",
    size: 130,
    initialX: 50,
    initialY: 35,
  },
  {
    image: "/images/disney_group_kids_1773833540626.png",
    alt: "Friends Together",
    size: 170,
    initialX: 85,
    initialY: 45,
  },
  {
    image: "/images/disney_kids_planting_1773833691754.png",
    alt: "Nature Learning",
    size: 140,
    initialX: 10,
    initialY: 75,
  },
  {
    image: "/images/disney_animal_friends_1773833494417.png",
    alt: "Animal Friends",
    size: 135,
    initialX: 60,
    initialY: 80,
  },
  {
    image: "/images/disney_owl_teacher_1773833708195.png",
    alt: "Wise Teacher",
    size: 110,
    initialX: 40,
    initialY: 10,
  },
  {
    image: "/images/disney_magical_castle_1773833507992.png",
    alt: "Dream Castle",
    size: 145,
    initialX: 90,
    initialY: 25,
  },
  {
    image: "/images/disney_magical_bus_1773833671715.png",
    alt: "Adventure Bus",
    size: 155,
    initialX: 20,
    initialY: 40,
  },
  {
    image: "/images/disney_kid_astronaut_1773833524519.png",
    alt: "Little Astronaut",
    size: 125,
    initialX: 80,
    initialY: 70,
  },
  {
    image: "/images/disney_girl_blocks_1773833639079.png",
    alt: "Building Blocks",
    size: 120,
    initialX: 35,
    initialY: 65,
  },
];

const Bubble = ({ bubble, mouseX, mouseY, scrollY }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: bubble.initialX, y: bubble.initialY });

  useEffect(() => {
    const handleMouseMove = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const bubbleCenterX = rect.left + rect.width / 2;
      const bubbleCenterY = rect.top + rect.height / 2;
      
      const deltaX = mouseX.get() - bubbleCenterX;
      const deltaY = mouseY.get() - bubbleCenterY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Repel effect when mouse is close
      if (distance < 200) {
        const force = (200 - distance) / 200;
        const angle = Math.atan2(deltaY, deltaX);
        const pushX = -Math.cos(angle) * force * 3;
        const pushY = -Math.sin(angle) * force * 3;
        
        setPosition(prev => ({
          x: Math.max(5, Math.min(95, prev.x + pushX)),
          y: Math.max(5, Math.min(95, prev.y + pushY))
        }));
      } else {
        // Slowly return to original position
        setPosition(prev => ({
          x: prev.x + (bubble.initialX - prev.x) * 0.02,
          y: prev.y + (bubble.initialY - prev.y) * 0.02
        }));
      }
    };

    const unsubscribe = mouseX.on("change", handleMouseMove);
    return () => unsubscribe();
  }, [mouseX, mouseY, bubble.initialX, bubble.initialY]);

  const scrollOffset = useTransform(scrollY, [0, 1000], [0, -50]);

  return (
    <motion.div
      ref={ref}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: bubble.size,
        height: bubble.size,
        y: scrollOffset,
      }}
      animate={{
        y: [0, -15, 0],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
      whileHover={{ scale: 1.15 }}
    >
      <div className="relative w-full h-full">
        {/* Bubble glow */}
        <div className="absolute inset-0 rounded-full bg-white/40 blur-xl group-hover:bg-white/60 transition-all" />
        
        {/* Bubble */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-white shadow-2xl border-4 border-white group-hover:border-[#60A5FA] transition-all">
          <img 
            src={bubble.image} 
            alt={bubble.alt}
            className="w-full h-full object-cover"
          />
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-60" />
        </div>
      </div>
    </motion.div>
  );
};

export const MagicalPlaygroundSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full py-32 md:py-40 bg-[#DBEAFE] overflow-hidden"
    >
      
      {/* Soft decorative circles */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-[#BAE6FD] rounded-full opacity-40 blur-3xl" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#E0F2FE] rounded-full opacity-40 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full opacity-30 blur-3xl" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full mb-8 bg-white shadow-sm border border-[#1A1045]/5"
          >
            <Sparkles className="w-4 h-4 text-[#3B82F6]" />
            <span className="text-sm font-bold uppercase tracking-widest text-[#1A1045]">A Day at Tender Cradle</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#1A1045] mb-6 tracking-tighter"
          >
            Where Learning Feels Like{" "}
            <span className="relative inline-block text-[#3B82F6]">
              Playing
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                <path d="M2 8 Q50 2 100 8 Q150 14 198 8" stroke="#BAE6FD" strokeWidth="6" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl text-[#1A1045]/70 font-serif italic leading-relaxed"
          >
            Move your mouse around and watch the magic happen! Every bubble tells a story of joy, discovery, and wonder.
          </motion.p>
        </div>

        {/* Floating Bubbles */}
        <div className="relative min-h-[800px] md:min-h-[900px]">
          {bubbles.map((bubble, index) => (
            <Bubble 
              key={index} 
              bubble={bubble} 
              mouseX={mouseX} 
              mouseY={mouseY}
              scrollY={scrollY}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
