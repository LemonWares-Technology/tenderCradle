"use client";

import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import Link from "next/link";
import { ArrowLeft, Calendar as CalendarIcon, MapPin, Clock, ArrowUpRight, Sparkles } from "lucide-react";
import Image from "next/image";

const events = [
  {
    date: "12 March",
    title: "Eco-Garden Planting Day",
    time: "10:00 AM — 12:00 PM",
    location: "Main Campus Garden",
    description: "Parents and children join us for our annual spring planting day. Learn about sustainable gardening and help us grow our organic kitchen supply.",
    category: "Community",
    color: "bg-[#DCFCE7] text-[#15803D] hover:shadow-[#DCFCE7]/50"
  },
  {
    date: "28 March",
    title: "Montessori at Home Workshop",
    time: "06:00 PM — 07:30 PM",
    location: "Online via Zoom",
    description: "A specialized workshop for parents on how to implement Montessori principles in your own home environment.",
    category: "Education",
    color: "bg-[#DBEAFE] text-[#1D4ED8] hover:shadow-[#DBEAFE]/50"
  },
  {
    date: "15 April",
    title: "Spring Term Arts Showcase",
    time: "02:00 PM — 04:00 PM",
    location: "The Great Hall",
    description: "Celebrate the creative achievements of our students. An afternoon of music, art, and movement performances.",
    category: "Showcase",
    color: "bg-[#FCE7F3] text-[#BE185D] hover:shadow-[#FCE7F3]/50"
  },
  {
    date: "22 April",
    title: "Earth Day Celebration",
    time: "All Day",
    location: "Campus Wide",
    description: "A day dedicated to environmental awareness, with special activities focused on recycling, conservation, and the natural world.",
    category: "Awareness",
    color: "bg-[#FEF9C3] text-[#B45309] hover:shadow-[#FEF9C3]/50"
  },
];

export const EventsPageContent = () => {
  return (
    <div className="bg-[#F8FAFC] text-foreground pb-32 overflow-hidden">
      {/* Elegant navigation */}
      <nav className="fixed top-0 left-0 w-full px-6 py-6 md:px-12 md:py-10 z-50 pointer-events-none">
        <Link 
          href="/"
          className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-[#1A1045]/5 pointer-events-auto hover:-translate-y-1 transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-[#FEF9C3] flex items-center justify-center group-hover:bg-[#FDE68A] transition-colors">
            <ArrowLeft className="w-4 h-4 text-[#B45309]" />
          </div>
          <span className="font-bold text-[#1A1045] uppercase tracking-widest text-xs hidden sm:inline-block">Back Home</span>
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative w-full min-h-[50vh] flex items-center pb-16 overflow-hidden pt-40 bg-white">
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-[#FEF9C3] rounded-full opacity-50 blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[0%] left-[5%] w-[300px] h-[300px] bg-[#FCE7F3] rounded-full opacity-40 blur-[80px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center items-center gap-4 mb-8">
            <div className="h-px w-16 bg-[#B45309]" />
            <span className="text-sm font-bold uppercase tracking-widest text-[#B45309]">Our Gatherings</span>
            <div className="h-px w-16 bg-[#B45309]" />
          </motion.div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-[8rem] leading-[0.9] text-[#1A1045] max-w-5xl tracking-tighter mb-4 mx-auto">
            Moments <br className="hidden md:block" />
            of <span className="text-[#D97706] relative inline-block">Magic
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#FDE68A" strokeWidth="6" fill="none" strokeLinecap="round"/>
              </svg>
            </span>.
          </h1>
        </div>
      </section>

      {/* Events List */}
      <section className="w-full py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="space-y-8 md:space-y-12 max-w-5xl mx-auto">
            {events.map((event, index) => {
              // Extract colors from the string for dynamic usage
              const isGreen = event.color.includes('DCFCE7');
              const isBlue = event.color.includes('DBEAFE');
              const isPink = event.color.includes('FCE7F3');
              const isYellow = event.color.includes('FEF9C3');
              
              const accentColor = isGreen ? '#15803D' : isBlue ? '#1D4ED8' : isPink ? '#BE185D' : '#B45309';

              return (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`group bg-white rounded-[40px] shadow-xl border border-[#1A1045]/5 hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2`}
                >
                  <div className="flex flex-col md:flex-row relative">
                    {/* Date Block */}
                    <div className={`${event.color.split(' ')[0]} w-full md:w-64 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-[#1A1045]/5 shrink-0 transition-colors duration-500`}>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-3">{event.category}</span>
                      <span className="font-serif text-5xl tracking-tighter font-bold uppercase leading-tight text-center">
                        {event.date.split(" ")[0]}
                        <br/>
                        <span className="text-2xl">{event.date.split(" ")[1]}</span>
                      </span>
                    </div>

                    {/* Content Block */}
                    <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
                      <h3 className="font-serif text-3xl md:text-4xl text-[#1A1045] font-bold mb-6 tracking-tight group-hover:text-[#3B82F6] transition-colors">{event.title}</h3>
                      
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center gap-2 bg-[#F8FAFC] px-4 py-2 rounded-full border border-[#1A1045]/5">
                          <Clock className="w-4 h-4 text-[#1A1045]/40" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/70">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-[#F8FAFC] px-4 py-2 rounded-full border border-[#1A1045]/5">
                          <MapPin className="w-4 h-4 text-[#1A1045]/40" />
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/70">{event.location}</span>
                        </div>
                      </div>
                      
                      <p className="text-lg md:text-xl text-[#1A1045]/70 font-serif italic mb-8 max-w-2xl leading-relaxed">
                        {event.description}
                      </p>
                      
                      <div className="mt-auto">
                        <button className="flex items-center gap-3 bg-white border border-[#1A1045]/10 hover:border-[#3B82F6] hover:bg-[#F8FAFC] text-[#1A1045] px-6 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] transition-all duration-300 shadow-sm hover:shadow-md group/btn">
                          <span>Add to Calendar</span>
                          <CalendarIcon className="w-4 h-4 text-[#3B82F6] group-hover/btn:scale-110 transition-transform" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Hover Decoration */}
                     <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-[#1A1045]/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 bg-white shadow-sm">
                        <ArrowUpRight className={`w-5 h-5 text-[${accentColor}]`} style={{color: accentColor}} />
                     </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Philosophy Block */}
      <section className="py-32 bg-[#1A1045]">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <Link href="/contact" className="group inline-flex flex-col items-center gap-8 text-white hover:text-[#FDE68A] transition-colors mx-auto relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FDE68A] rounded-full opacity-0 blur-[40px] group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" />
            <span className="font-serif text-5xl md:text-7xl font-bold tracking-tighter">Host an Event</span>
            <div className="w-20 h-20 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-[#F59E0B] group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-[#F59E0B]/50 transition-all duration-500 text-white/50">
              <ArrowUpRight className="w-8 h-8 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};
