"use client";

import { motion } from "framer-motion";

const partners = [
  { name: "Association Montessori Internationale", abbr: "AMI", description: "Internationally certifying our caregiver training programme." },
  { name: "UNICEF Nigeria", abbr: "UNICEF", description: "Early childhood development programme partner." },
  { name: "NERDC", abbr: "NERDC", description: "Curriculum aligned with national early learning standards." },
  { name: "Ministry of Education", abbr: "MOE", description: "Lagos State licensed early years centre." },
  { name: "NAEYC", abbr: "NAEYC", description: "Member of the premier early childhood educators association." },
  { name: "WHO", abbr: "WHO", description: "Adhering to World Health Organization child development guidelines." },
];

export const PartnersSection = () => {
  return (
    <section className="w-full py-16 md:py-24 lg:py-28 bg-foreground text-background border-t border-background/10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-10 md:mb-14"
        >
          <div className="h-px w-16 bg-primary" />
          <span className="text-sm font-bold uppercase tracking-widest text-primary">Trusted & Accredited</span>
        </motion.div>

        {/* Partners grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-px border border-background/10 rounded-2xl overflow-hidden">
          {partners.map((partner, idx) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-background/5 hover:bg-background/12 transition-all duration-300 p-5 md:p-8 flex flex-col items-center justify-center text-center gap-2 md:gap-3 cursor-default"
            >
              {/* Abbr badge */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-background/10 group-hover:bg-primary/20 transition-colors flex items-center justify-center mb-1"
              >
                <span className="font-serif font-bold text-xs md:text-sm text-background/80 group-hover:text-primary transition-colors leading-none">
                  {partner.abbr}
                </span>
              </motion.div>
              <p className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-background/40 group-hover:text-background/60 transition-colors leading-tight hidden sm:block">
                {partner.name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-background/30 text-xs md:text-sm font-sans mt-8 md:mt-10 max-w-lg mx-auto leading-relaxed"
        >
          Tender Cradle holds active accreditation and partnership status with each of the above organisations.
        </motion.p>
      </div>
    </section>
  );
};
