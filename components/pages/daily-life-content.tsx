
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, Utensils, Coffee, Sun, Moon, Heart, Sparkles, BookOpen, Music, Palette, Users } from "lucide-react";

const schedule = [
  { time: "07:30 — 08:30", activity: "Soft Landing & Breakfast", detail: "Arrival, quiet play, and a nutritious morning meal to start the day.", icon: Sun, color: "#FDE68A" },
  { time: "08:30 — 09:30", activity: "Morning Circle & Yoga", detail: "Greeting the day with music, intention setting, and gentle movement.", icon: Music, color: "#BFDBFE" },
  { time: "09:30 — 11:30", activity: "Uninterrupted Work Cycle", detail: "Focused learning time using Montessori materials tailored to each child's level.", icon: BookOpen, color: "#DCFCE7" },
  { time: "11:30 — 12:30", activity: "Alfresco Dining & Socializing", detail: "A communal lunch focusing on table manners and social conversation.", icon: Utensils, color: "#FBCFE8" },
  { time: "12:30 — 14:30", activity: "Rest & Rejuvenation", detail: "Quiet time or naps in our climate-controlled, sensory-soft sleep studio.", icon: Moon, color: "#E0E7FF" },
  { time: "14:30 — 16:30", activity: "Creative Workshops", detail: "Art, music, or garden exploration based on the weekly theme.", icon: Palette, color: "#FED7AA" },
  { time: "16:30 — 18:00", activity: "Extension & Collection", detail: "After-school enrichment activities and parent handover.", icon: Users, color: "#FCE7F3" },
];

const weeklyMenu = [
  { day: "Monday", breakfast: "Organic Oat Porridge with Berries", lunch: "Grilled Salmon with Quinoa & Steamed Greens", snack: "Fresh Sliced Fruit & Yogurt" },
  { day: "Tuesday", breakfast: "Scrambled Eggs on Wholegrain Toast", lunch: "Lentil & Vegetable Stew with Basmati Rice", snack: "Homemade Hummus & Carrots" },
  { day: "Wednesday", breakfast: "Greek Yogurt with Local Honey & Seeds", lunch: "Roasted Organic Chicken with Sweet Potato", snack: "Rice Cakes with Avocado Mash" },
  { day: "Thursday", breakfast: "Banana & Almond Butter Smoothies", lunch: "Pasta Primavera with Garden Herbs", snack: "Apple Slices & Cheese Cubes" },
  { day: "Friday", breakfast: "Multigrain Pancakes with Maple", lunch: "Baked Catch of the Day with Couscous", snack: "Berry Smoothies & Wholemeal Biscuits" },
];

export const DailyLifePageContent = () => {
  return (
    <div className="bg-white overflow-hidden">

      {/* Hero - Solid Color Banner */}
      <section className="relative w-full min-h-[70vh] flex items-center pb-24 overflow-hidden pt-32 bg-[#FEF9C3]">
        {/* Organic background shapes - no gradient */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FDE68A] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-30 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F59E0B] rounded-[60%_40%_30%_70%/60%_30%_70%_40%] opacity-20 blur-3xl" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
            <div className="h-px w-16 bg-[#F59E0B]" />
            <span className="text-sm font-bold uppercase tracking-widest text-[#B45309]">A Day at Tender Cradle</span>
          </motion.div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] leading-[0.9] text-[#1A1045] max-w-5xl tracking-tighter mb-8">
            Every Day is <br/>
            <span className="text-[#F59E0B] relative inline-block">
              Magical
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#FDE68A" strokeWidth="6" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#1A1045]/70 font-serif italic max-w-2xl">
            A rhythm designed for growth, joy, and endless discovery
          </p>
        </div>
      </section>

      {/* Schedule Section - Vertical Timeline */}
      <section className="w-full py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-[#DBEAFE] px-6 py-3 rounded-full mb-8 border-2 border-[#3B82F6]/20">
              <Clock className="w-5 h-5 text-[#1D4ED8]" />
              <span className="text-sm font-bold uppercase tracking-widest text-[#1D4ED8]">Daily Schedule</span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl tracking-tighter text-[#1A1045] mb-6">
              Our Daily <span className="text-[#3B82F6]">Rhythm</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#1A1045]/70 font-serif italic max-w-2xl mx-auto">
              Consistency provides the security children need to explore and learn
            </p>
          </div>

          {/* Vertical Timeline */}
          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-[#1A1045]/10 transform md:-translate-x-1/2" />

            {schedule.map((slot, index) => (
              <motion.div
                key={slot.time}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative mb-12 last:mb-0"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                  
                  {/* Time (left side on desktop) */}
                  <div className="md:w-1/2 md:text-right md:pr-12 pl-20 md:pl-0">
                    <div className="inline-block bg-white px-4 py-2 rounded-full border-2 border-[#1A1045]/10 shadow-sm">
                      <span className="text-sm font-bold text-[#1A1045]">{slot.time}</span>
                    </div>
                  </div>

                  {/* Timeline dot with icon */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-white"
                      style={{ backgroundColor: slot.color }}
                    >
                      <slot.icon className="w-7 h-7 text-[#1A1045]" />
                    </div>
                  </div>

                  {/* Content (right side on desktop) */}
                  <div className="md:w-1/2 md:pl-12 pl-20 md:pl-12">
                    <div className="bg-white p-6 rounded-[30px] shadow-lg border-2 border-[#1A1045]/5 hover:shadow-xl transition-shadow">
                      <h3 className="font-serif text-2xl font-bold text-[#1A1045] mb-3">
                        {slot.activity}
                      </h3>
                      <p className="text-base md:text-lg text-[#1A1045]/70 leading-relaxed">
                        {slot.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nutrition Section - Table Layout */}
      <section className="w-full py-32 bg-[#F8FAFC]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-[#DCFCE7] px-6 py-3 rounded-full mb-8 border-2 border-[#16A34A]/20">
              <Utensils className="w-5 h-5 text-[#15803D]" />
              <span className="text-sm font-bold uppercase tracking-widest text-[#15803D]">Nutrition</span>
            </div>
            <h2 className="font-serif text-4xl md:text-6xl tracking-tighter text-[#1A1045] mb-6">
              The Organic <span className="text-[#16A34A]">Kitchen</span>
            </h2>
            <p className="text-xl md:text-2xl text-[#1A1045]/70 font-serif italic max-w-3xl mx-auto">
              Fresh, balanced, and organic meals prepared daily by our chef. Body fuel is brain fuel!
            </p>
          </div>

          {/* Table Layout - Desktop / Card Layout - Mobile */}
          <div className="max-w-6xl mx-auto">
            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-[40px] shadow-xl border-2 border-[#1A1045]/5 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-4 bg-[#DCFCE7] p-6 border-b-2 border-[#16A34A]/10">
                <div className="font-bold text-[#15803D] uppercase tracking-widest text-sm">Day</div>
                <div className="font-bold text-[#15803D] uppercase tracking-widest text-sm flex items-center gap-2">
                  <Sun className="w-4 h-4" /> Breakfast
                </div>
                <div className="font-bold text-[#15803D] uppercase tracking-widest text-sm flex items-center gap-2">
                  <Coffee className="w-4 h-4" /> Lunch
                </div>
                <div className="font-bold text-[#15803D] uppercase tracking-widest text-sm flex items-center gap-2">
                  <Moon className="w-4 h-4" /> Snack
                </div>
              </div>

              {/* Table Rows */}
              {weeklyMenu.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`grid grid-cols-4 p-6 hover:bg-[#F8FAFC] transition-colors ${
                    index !== weeklyMenu.length - 1 ? 'border-b border-[#1A1045]/5' : ''
                  }`}
                >
                  <div className="font-bold text-[#1A1045] text-lg">{day.day}</div>
                  <div className="text-[#1A1045]/80 text-base pr-4">{day.breakfast}</div>
                  <div className="text-[#1A1045]/80 text-base pr-4">{day.lunch}</div>
                  <div className="text-[#1A1045]/80 text-base">{day.snack}</div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-6">
              {weeklyMenu.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-[30px] shadow-lg border-2 border-[#1A1045]/5 p-6"
                >
                  <h3 className="font-bold text-[#1A1045] text-2xl mb-6 pb-4 border-b-2 border-[#DCFCE7]">
                    {day.day}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Sun className="w-4 h-4 text-[#F59E0B]" />
                        <span className="font-bold text-[#15803D] uppercase tracking-widest text-xs">Breakfast</span>
                      </div>
                      <p className="text-[#1A1045]/80 text-base pl-6">{day.breakfast}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Coffee className="w-4 h-4 text-[#F59E0B]" />
                        <span className="font-bold text-[#15803D] uppercase tracking-widest text-xs">Lunch</span>
                      </div>
                      <p className="text-[#1A1045]/80 text-base pl-6">{day.lunch}</p>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Moon className="w-4 h-4 text-[#F59E0B]" />
                        <span className="font-bold text-[#15803D] uppercase tracking-widest text-xs">Snack</span>
                      </div>
                      <p className="text-[#1A1045]/80 text-base pl-6">{day.snack}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 bg-[#FEF9C3] px-6 py-3 rounded-full mb-8 border-2 border-[#F59E0B]/20">
              <Heart className="w-5 h-5 text-[#F59E0B]" />
              <span className="text-sm font-bold uppercase tracking-widest text-[#B45309]">See It In Action</span>
            </div>
            
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tighter text-[#1A1045] mb-8">
              Experience a Day <br/>With Us
            </h2>
            
            <p className="text-xl md:text-2xl text-[#1A1045]/70 font-serif italic mb-12">
              Book a morning tour and see our daily rhythm come to life
            </p>
            
            <Link 
              to="/contact"
              className="inline-flex items-center gap-4 bg-[#F59E0B] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#1A1045] transition-all duration-500 shadow-xl hover:scale-105"
            >
              Book Your Tour
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
