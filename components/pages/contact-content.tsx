import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, MapPin, Mail, Phone, Sparkles, Loader2 } from "lucide-react";
import { submitContactForm, CreateLeadData } from "@/lib/api/leads";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string(),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export const ContactPageContent = () => {
  const [formData, setFormData] = useState<CreateLeadData>({
    name: "",
    email: "",
    subject: "childcare",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess(false);
    setError(null);
    setFieldErrors({});

    // Zod validation (Local)
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      const newFieldErrors: Record<string, string> = {};
      validation.error.issues.forEach(issue => {
        newFieldErrors[issue.path[0].toString()] = issue.message;
      });
      setFieldErrors(newFieldErrors);
      setIsLoading(false);
      return;
    }

    try {
      await submitContactForm(formData);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "childcare", message: "" });
    } catch (err: any) {
      // Handle structured ApiError
      if (err.errors) {
        const newFieldErrors: Record<string, string> = {};
        err.errors.forEach((e: any) => {
          // Backend paths often look like 'body.email', so we strip 'body.'
          const path = e.path.startsWith('body.') ? e.path.replace('body.', '') : e.path;
          if (newFieldErrors[path]) {
            newFieldErrors[path] = `${newFieldErrors[path]} ${e.message}`;
          } else {
            newFieldErrors[path] = e.message;
          }
        });
        setFieldErrors(newFieldErrors);
        setError(err.message || "Please check the form for errors.");
      } else {
        setError(err.message || "Something went wrong. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] text-foreground min-h-screen flex flex-col overflow-hidden">

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-32 pb-32 relative">
        {/* Soft Background Environments */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FCE7F3] rounded-full opacity-40 blur-[100px] pointer-events-none -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#DBEAFE] rounded-full opacity-40 blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center mt-12">
            {/* Left: Elegant Typography Context */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-4 mb-8">
                  <div className="h-px w-16 bg-[#BE185D]" />
                  <span className="text-sm font-bold uppercase tracking-widest text-[#BE185D]">Connect With Us</span>
                </motion.div>

                <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] leading-[0.9] text-[#1A1045] tracking-tighter mb-8">
                  Say <span className="text-[#BE185D] relative inline-block">Hello
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" fill="none">
                      <path d="M2 7 Q25 1 50 7 Q75 13 98 7" stroke="#FCE7F3" strokeWidth="6" fill="none" strokeLinecap="round"/>
                    </svg>
                  </span>!
                </h1>

                <p className="text-xl md:text-2xl text-[#1A1045]/70 font-serif italic max-w-md leading-relaxed mb-16">
                  Tender Cradle partners with parents to raise confident, well-rounded children. Reach out anytime to schedule a visit or ask a question.
                </p>
              </div>

              {/* Direct Info - Clean Cards */}
              <div className="space-y-4">
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-[#1A1045]/5 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow group">
                  <div className="w-14 h-14 bg-[#FEF9C3] rounded-2xl flex items-center justify-center shadow-inner text-[#B45309] group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/50 mb-1">Our Location</h4>
                    <p className="text-lg font-serif text-[#1A1045]">Lagos, Nigeria</p>
                  </div>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-[#1A1045]/5 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow group">
                  <div className="w-14 h-14 bg-[#DCFCE7] rounded-2xl flex items-center justify-center shadow-inner text-[#15803D] group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/50 mb-1">Send an Email</h4>
                    <a href="mailto:hello@tendercradle.com" className="text-lg font-serif text-[#1A1045] hover:text-[#15803D] transition-colors">hello@tender.com</a>
                  </div>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-[#1A1045]/5 shadow-sm flex items-center gap-6 hover:shadow-md transition-shadow group">
                  <div className="w-14 h-14 bg-[#DBEAFE] rounded-2xl flex items-center justify-center shadow-inner text-[#1D4ED8] group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/50 mb-1">Give Us A Call</h4>
                    <a href="tel:+2348000000000" className="text-lg font-serif text-[#1A1045] hover:text-[#1D4ED8] transition-colors">+234 800 000 0000</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Elegant Form */}
            <div className="lg:col-span-7 mt-12 lg:mt-0">
              <motion.form 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                onSubmit={handleSubmit}
                className="bg-white rounded-[40px] p-8 md:p-14 border border-[#1A1045]/5 shadow-2xl relative"
              >
                <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-[#FCE7F3] flex items-center justify-center shadow-inner">
                  <Sparkles className="text-[#BE185D] w-5 h-5" />
                </div>

                <div className="space-y-8">
                  {/* Status Messages */}
                  {success && (
                    <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-green-700 font-serif italic animate-in fade-in zoom-in-95">
                      <p className="text-lg">Thank you for reaching out! We've received your message and will get back to you shortly. ✨</p>
                    </div>
                  )}
                  {error && (
                    <div className="bg-red-50 border border-red-100 rounded-2xl p-6 text-red-700 font-serif italic animate-in fade-in zoom-in-95">
                      <p className="text-lg">{error}</p>
                    </div>
                  )}
                  
                  {/* Clean Inputs */}
                  <div className="group relative">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2 ml-2">What's your name?</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className={`w-full bg-[#F8FAFC] text-xl font-serif text-[#1A1045] placeholder:text-[#1A1045]/30 focus:outline-none rounded-2xl py-4 px-6 border ${fieldErrors.name ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#3B82F6] focus:bg-white transition-all shadow-sm`}
                    />
                    {fieldErrors.name && <p className="mt-1 ml-2 text-xs text-red-500 font-bold tracking-tight">{fieldErrors.name}</p>}
                  </div>

                  <div className="group relative">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2 ml-2">Your email address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className={`w-full bg-[#F8FAFC] text-xl font-serif text-[#1A1045] placeholder:text-[#1A1045]/30 focus:outline-none rounded-2xl py-4 px-6 border ${fieldErrors.email ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#BE185D] focus:bg-white transition-all shadow-sm`}
                    />
                    {fieldErrors.email && <p className="mt-1 ml-2 text-xs text-red-500 font-bold tracking-tight">{fieldErrors.email}</p>}
                  </div>

                  <div className="group relative">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2 ml-2">What are you looking for?</label>
                    <div className="relative">
                      <select 
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className={`w-full bg-[#F8FAFC] text-lg font-serif text-[#1A1045] focus:outline-none cursor-pointer appearance-none rounded-2xl py-4 px-6 border ${fieldErrors.subject ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#B45309] focus:bg-white transition-all shadow-sm`}
                      >
                        <option value="childcare">Childcare Options</option>
                        <option value="play">Creative Play</option>
                        <option value="development">Emotional Growth</option>
                        <option value="general">Just Saying Hi!</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ArrowLeft className="w-5 h-5 opacity-40 -rotate-90" />
                      </div>
                    </div>
                    {fieldErrors.subject && <p className="mt-1 ml-2 text-xs text-red-500 font-bold tracking-tight">{fieldErrors.subject}</p>}
                  </div>

                  <div className="group relative">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2 ml-2">Tell us the details...</label>
                    <textarea 
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="We love finger painting and..."
                      className={`w-full bg-[#F8FAFC] text-lg font-serif italic text-[#1A1045] placeholder:text-[#1A1045]/30 focus:outline-none resize-none py-4 px-6 rounded-2xl border ${fieldErrors.message ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#15803D] focus:bg-white transition-all shadow-sm`}
                    />
                    {fieldErrors.message && <p className="mt-1 ml-2 text-xs text-red-500 font-bold tracking-tight">{fieldErrors.message}</p>}
                  </div>

                  <div className="pt-6">
                    <button 
                      type="submit"
                      disabled={isLoading}
                      className="group relative w-full flex items-center justify-center gap-4 bg-[#1A1045] hover:bg-[#BE185D] text-white px-8 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm transition-all duration-300 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
