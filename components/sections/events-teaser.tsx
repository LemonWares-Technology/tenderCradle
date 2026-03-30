
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, ArrowRight, Music, Leaf, Palette } from "lucide-react";
import { Link } from "react-router-dom";

const featuredEvents = [
  {
    date: "12 March",
    title: "Eco-Garden Planting Day",
    category: "Nature",
    icon: Leaf,
    bg: "#BBF7D0",
    color: "#15803D",
    accent: "#DCFCE7",
  },
  {
    date: "28 March",
    title: "Montessori at Home",
    category: "Learning",
    icon: CalendarIcon,
    bg: "#BFDBFE",
    color: "#1D4ED8",
    accent: "#DBEAFE",
  },
  {
    date: "15 April",
    title: "Spring Arts Showcase",
    category: "Arts",
    icon: Palette,
    bg: "#FECDD3",
    color: "#BE123C",
    accent: "#FFE4E6",
  },
];

export const EventsTeaser = () => {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#FFFBEB] text-[#1A1045] overflow-hidden">
      
      {/* Decorative background shape */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-yellow-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16 md:mb-24">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-px w-16 bg-[#F59E0B]" />
              <span className="text-sm font-bold uppercase tracking-widest text-[#F59E0B]">Live The Experience</span>
            </motion.div>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl tracking-tighter text-[#1A1045] mb-4">
              Upcoming{" "}
              <span className="relative inline-block text-[#D97706]">
                Moments
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                  <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#FDE68A" strokeWidth="6" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
              .
            </h2>
            <p className="text-xl text-[#1A1045]/60 font-serif italic">
              Special days designed to spark joy, curiosity, and community.
            </p>
          </div>
          
          <Link to="/events"
            className="group inline-flex items-center gap-4 py-4 px-8 bg-[#F59E0B] text-white rounded-full hover:bg-[#1A1045] transition-all duration-500 shadow-lg shadow-[#F59E0B]/20"
          >
            <span className="font-bold uppercase tracking-widest text-xs">View Full Calendar</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {featuredEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="rounded-[40px] p-10 flex flex-col justify-between group cursor-pointer border-4 border-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              style={{ backgroundColor: event.bg }}
            >
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: event.accent }}
                  >
                    <event.icon className="w-8 h-8" style={{ color: event.color }} />
                  </div>
                  <span 
                    className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/50"
                    style={{ color: event.color }}
                  >
                    {event.category}
                  </span>
                </div>
                
                <h3 className="font-serif text-3xl md:text-4xl tracking-tight mb-4 leading-tight text-[#1A1045]">
                  {event.title}
                </h3>
              </div>
              
              <div className="flex items-center gap-4 mt-8 pt-8 border-t border-black/5">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <CalendarIcon className="w-4 h-4 text-[#F59E0B]" />
                  </div>
                  <span className="font-serif text-xl italic text-[#1A1045]/60">{event.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
