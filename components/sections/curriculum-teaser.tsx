
import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import { ArrowRight, Brain, HeartPulse, Palette, Microscope } from "lucide-react";
import { Link } from "react-router-dom";

const pillars = [
  {
    icon: Brain,
    title: "Cognitive",
    text: "Critical thinking and problem solving through hands-on materials.",
    bg: "#BFDBFE",        // Soft sky blue
    iconColor: "#1D4ED8", // Deep blue
    textColor: "#1e3a6e",
  },
  {
    icon: HeartPulse,
    title: "Emotional",
    text: "Building self-regulation and empathy in a secure group setting.",
    bg: "#FECDD3",        // Soft rose
    iconColor: "#BE123C", // Deep rose
    textColor: "#6b1a2e",
  },
  {
    icon: Palette,
    title: "Creative",
    text: "Unleashing imagination via music, arts, and movement.",
    bg: "#FEF08A",        // Soft yellow
    iconColor: "#B45309", // Deep amber
    textColor: "#6b3f0a",
  },
  {
    icon: Microscope,
    title: "Scientific",
    text: "Understanding the natural world through observation and play.",
    bg: "#BBF7D0",        // Soft mint
    iconColor: "#15803D", // Deep green
    textColor: "#1a4d2e",
  },
];

export const CurriculumTeaser = () => {
  return (
    <section className="w-full py-24 md:py-32 bg-[#EDE9FE] text-[#1A1045] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">

          {/* Left: heading */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-px w-16 bg-[#7C3AED]" />
              <span className="text-sm font-bold uppercase tracking-widest text-[#7C3AED]">Curriculum</span>
            </motion.div>

            <SplitText
              text="Beyond Supervision."
              className="font-serif text-5xl md:text-6xl tracking-tighter mb-8"
            />

            <p className="text-lg md:text-xl text-[#1A1045]/70 font-serif italic mb-12 leading-relaxed">
              Our Montessori-inspired approach is built on four essential pillars that nurture the whole child.
            </p>

            <Link to="/curriculum"
              className="group inline-flex items-center gap-4 py-4 px-8 bg-[#7C3AED] text-white rounded-full hover:bg-[#F59E0B] hover:text-[#1A1045] transition-all duration-500 font-bold uppercase tracking-widest text-xs shadow-lg shadow-[#7C3AED]/30"
            >
              Explore Curriculum
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          {/* Right: soft pastel pillar cards */}
          <div className="lg:w-2/3 grid sm:grid-cols-2 gap-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 rounded-[32px] group"
                style={{ backgroundColor: pillar.bg }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: "rgba(255,255,255,0.55)" }}
                >
                  <pillar.icon className="w-6 h-6" style={{ color: pillar.iconColor }} />
                </div>

                <h3 className="font-serif text-2xl mb-3 font-bold" style={{ color: pillar.textColor }}>
                  {pillar.title}
                </h3>
                <p className="text-base md:text-lg leading-relaxed" style={{ color: pillar.textColor, opacity: 0.75 }}>
                  {pillar.text}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
