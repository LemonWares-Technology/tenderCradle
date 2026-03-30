
import { motion } from "framer-motion";
import { SplitText } from "@/components/ui/split-text";
export const TermsPageContent = () => {
  return (
    <div className="bg-background selection:bg-foreground selection:text-background pb-32">

      {/* Hero */}
      <section className="relative w-full min-h-[50vh] flex items-end pb-16 overflow-hidden pt-40">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block text-primary text-sm font-bold uppercase tracking-widest mb-8">
              Legal
            </span>
          </motion.div>

          <SplitText
            text="Terms of Service."
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] text-foreground max-w-4xl tracking-tighter"
          />
        </div>
      </section>

      {/* Content */}
      <section className="w-full">
        <div className="container mx-auto px-6 md:px-12">
          <div className="border-t border-foreground/10 pt-16 md:pt-24 max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="prose prose-lg md:prose-xl font-serif text-foreground/80"
            >
              <p className="text-xl md:text-2xl font-serif italic text-foreground mb-12 leading-relaxed">
                Welcome to Tender Cradle. By enrolling your child in our programs or using our services, you agree to comply with and be bound by the following terms.
              </p>

              <h3 className="font-serif text-3xl font-bold text-foreground mt-12 mb-6">1. Enrollment & Eligibility</h3>
              <p className="mb-6">
                Enrollment is subject to availability and the completion of all required registration forms, including medical and emergency contact information. We reserve the right to review enrollments to ensure our environment remains safe and beneficial for all children.
              </p>

              <h3 className="font-serif text-3xl font-bold text-foreground mt-12 mb-6">2. Fees and Payments</h3>
              <p className="mb-6">
                All program fees are due as outlined in the invoice provided upon enrollment. Late payments may incur additional charges or result in the suspension of services. We strive to maintain transparent communication regarding all financial obligations.
              </p>

              <h3 className="font-serif text-3xl font-bold text-foreground mt-12 mb-6">3. Facility Rules</h3>
              <p className="mb-6">
                Parents, guardians, and children must adhere to our facility&apos;s guidelines, designed to ensure a safe, structured, and nurturing environment. Continuous disruptive behavior that compromises the safety or well-being of others may lead to dismissal from the program.
              </p>

              <h3 className="font-serif text-3xl font-bold text-foreground mt-12 mb-6">4. Modifications</h3>
              <p>
                We may update these terms occasionally to reflect changes in our services or regulatory requirements. We will notify enrolled families of any significant changes. Continued use of our services constitutes acceptance of the amended terms.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
