
import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
import { Link } from "react-router-dom";
import { Clock, Utensils, Coffee, Sun, Moon } from "lucide-react";

const schedule = [
  { time: "07:30 — 08:30", activity: "Soft Landing & Breakfast", detail: "Arrival, quiet play, and a nutritious morning meal to start the day." },
  { time: "08:30 — 09:30", activity: "Morning Circle & Yoga", detail: "Greeting the day with music, intention setting, and gentle movement." },
  { time: "09:30 — 11:30", activity: "Uninterrupted Work Cycle", detail: "Focused learning time using Montessori materials tailored to each child's level." },
  { time: "11:30 — 12:30", activity: "Alfresco Dining & Socializing", detail: "A communal lunch focusing on table manners and social conversation." },
  { time: "12:30 — 14:30", activity: "Rest & Rejuvenation", detail: "Quiet time or naps in our climate-controlled, sensory-soft sleep studio." },
  { time: "14:30 — 16:30", activity: "Creative Workshops", detail: "Art, music, or garden exploration based on the weekly theme." },
  { time: "16:30 — 18:00", activity: "Extension & Collection", detail: "After-school enrichment activities and parent handover." },
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
    <div className="bg-background selection:bg-foreground selection:text-background pb-32">

      {/* Hero */}
      <section className="relative w-full min-h-[60vh] flex items-end pb-24 overflow-hidden pt-40">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-primary text-sm font-bold uppercase tracking-widest mb-12">
              07 — Daily Life
            </span>
          </motion.div>

          <SplitText
            text="A rhythm designed for growth and joy."
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-foreground max-w-5xl tracking-tighter"
          />
        </div>
      </section>

      {/* Schedule Section */}
      <section className="w-full py-24 border-t border-foreground/10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h2 className="font-serif text-4xl md:text-6xl tracking-tighter">The Daily Rhythm.</h2>
            <p className="text-xl max-w-sm font-serif italic text-foreground/60">
              Consistency provides the security children need to take risks and learn.
            </p>
          </div>

          <div className="space-y-4 md:space-y-6">
            {schedule.map((slot, index) => (
              <motion.div
                key={slot.time}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group grid md:grid-cols-12 gap-6 md:gap-12 py-8 border-b border-foreground/5 hover:bg-foreground/1 transition-colors"
              >
                <div className="md:col-span-3 flex items-center gap-4">
                  <Clock className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-sm font-bold uppercase tracking-widest text-foreground/40">{slot.time}</span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-serif text-2xl group-hover:text-primary transition-colors">{slot.activity}</h3>
                </div>
                <div className="md:col-span-5">
                  <p className="text-foreground/60 leading-relaxed font-light">{slot.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nutrition Section */}
      <section className="w-full py-24 bg-foreground/2">
        <div className="container mx-auto px-6 md:px-12">
          <div className="mb-24">
            <div className="flex items-center gap-4 mb-8">
              <Utensils className="w-6 h-6 text-primary" />
              <h2 className="font-serif text-4xl md:text-6xl tracking-tighter">The Organic Kitchen.</h2>
            </div>
            <p className="text-xl md:text-2xl text-foreground/70 font-serif italic max-w-3xl mb-12">
              Body fuel is brain fuel. Our chef prepares fresh, balanced, and organic meals daily, catering to all dietary requirements.
            </p>
          </div>

          <div className="grid gap-px bg-foreground/10 border border-foreground/10 rounded-[40px] overflow-hidden">
            {weeklyMenu.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="grid md:grid-cols-4 bg-background p-8 md:p-12 hover:bg-foreground/1 transition-colors"
              >
                <div className="mb-6 md:mb-0">
                  <span className="text-sm font-bold uppercase tracking-widest text-primary">{day.day}</span>
                </div>
                <div className="space-y-2 mb-6 md:mb-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 flex items-center gap-2">
                    <Sun className="w-3 h-3" /> Breakfast
                  </span>
                  <p className="font-medium pr-8">{day.breakfast}</p>
                </div>
                <div className="space-y-2 mb-6 md:mb-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 flex items-center gap-2">
                    <Coffee className="w-3 h-3" /> Lunch
                  </span>
                  <p className="font-medium pr-8">{day.lunch}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 flex items-center gap-2">
                    <Moon className="w-3 h-3" /> Afternoon Snack
                  </span>
                  <p className="font-medium">{day.snack}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p className="text-foreground/40 mb-8 uppercase tracking-[0.3em] font-bold text-xs">Want to see it in action?</p>
          <Link to="/contact" className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight hover:text-primary transition-colors border-b border-foreground/10 pb-4">
            Book a Morning Tour.
          </Link>
        </div>
      </section>
    </div>
  );
};
