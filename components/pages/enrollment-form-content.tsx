import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles, X, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { submitEnrollment } from "@/lib/api/enrollments";
import { EnrollmentFormData, initialFormData } from "@/components/enrollment/types";
import { Step1ParentInfo } from "@/components/enrollment/Step1ParentInfo";
import { Step2ChildInfo } from "@/components/enrollment/Step2ChildInfo";
import { Step3MedicalInfo } from "@/components/enrollment/Step3MedicalInfo";
import { Step4ProgramSelection } from "@/components/enrollment/Step4ProgramSelection";
import { Step5EmergencyContacts } from "@/components/enrollment/Step5EmergencyContacts";
import { Step6Documents } from "@/components/enrollment/Step6Documents";

export const EnrollmentFormContent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EnrollmentFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const totalSteps = 6;

  const updateField = (field: keyof EnrollmentFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileUpload = (field: "birthCertificate" | "immunizationRecords", file: File | null) => {
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, [field]: "File size must be less than 5MB" }));
        return;
      }
      
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, [field]: "Only PDF, JPG, and PNG files are allowed" }));
        return;
      }
    }
    
    updateField(field, file);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phone.length >= 10 && phoneRegex.test(phone);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.parentFirstName.trim()) newErrors.parentFirstName = "First name is required";
        if (!formData.parentLastName.trim()) newErrors.parentLastName = "Last name is required";
        if (!formData.parentEmail.trim()) {
          newErrors.parentEmail = "Email is required";
        } else if (!validateEmail(formData.parentEmail)) {
          newErrors.parentEmail = "Please enter a valid email address";
        }
        if (!formData.parentPhone.trim()) {
          newErrors.parentPhone = "Phone number is required";
        } else if (!validatePhone(formData.parentPhone)) {
          newErrors.parentPhone = "Please enter a valid phone number";
        }
        if (!formData.parentAddress.trim()) newErrors.parentAddress = "Address is required";
        if (!formData.parentCity.trim()) newErrors.parentCity = "City is required";
        if (!formData.parentState.trim()) newErrors.parentState = "State is required";
        break;

      case 2:
        if (!formData.childFirstName.trim()) newErrors.childFirstName = "First name is required";
        if (!formData.childLastName.trim()) newErrors.childLastName = "Last name is required";
        if (!formData.childDOB) newErrors.childDOB = "Date of birth is required";
        if (!formData.childGender) newErrors.childGender = "Gender is required";
        break;

      case 3:
        if (!formData.doctorName.trim()) newErrors.doctorName = "Doctor's name is required";
        if (!formData.doctorPhone.trim()) {
          newErrors.doctorPhone = "Doctor's phone is required";
        } else if (!validatePhone(formData.doctorPhone)) {
          newErrors.doctorPhone = "Please enter a valid phone number";
        }
        break;

      case 4:
        if (!formData.programType) newErrors.programType = "Please select a program type";
        if (!formData.enrollmentType) newErrors.enrollmentType = "Please select an enrollment type";
        if (!formData.startDate) newErrors.startDate = "Start date is required";
        break;

      case 5:
        if (!formData.emergencyName1.trim()) newErrors.emergencyName1 = "Emergency contact 1 name is required";
        if (!formData.emergencyPhone1.trim()) {
          newErrors.emergencyPhone1 = "Emergency contact 1 phone is required";
        } else if (!validatePhone(formData.emergencyPhone1)) {
          newErrors.emergencyPhone1 = "Please enter a valid phone number";
        }
        if (!formData.emergencyRelation1.trim()) newErrors.emergencyRelation1 = "Relationship is required";
        
        if (!formData.emergencyName2.trim()) newErrors.emergencyName2 = "Emergency contact 2 name is required";
        if (!formData.emergencyPhone2.trim()) {
          newErrors.emergencyPhone2 = "Emergency contact 2 phone is required";
        } else if (!validatePhone(formData.emergencyPhone2)) {
          newErrors.emergencyPhone2 = "Please enter a valid phone number";
        }
        if (!formData.emergencyRelation2.trim()) newErrors.emergencyRelation2 = "Relationship is required";
        break;

      case 6:
        if (!formData.birthCertificate) newErrors.birthCertificate = "Birth certificate is required";
        if (!formData.immunizationRecords) newErrors.immunizationRecords = "Immunization records are required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        const firstError = document.querySelector('.border-red-500');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setErrors({});
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(6)) return;

    setIsSubmitting(true);
    try {
      const { birthCertificate, immunizationRecords, ...enrollmentData } = formData;
      await submitEnrollment(enrollmentData, { birthCertificate, immunizationRecords });
      setIsSuccess(true);
    } catch (error: any) {
      console.error("Enrollment submission failed:", error);
      const errorMessage = error?.message || "Failed to submit enrollment. Please try again.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (currentStep / totalSteps) * 100;

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#E0F2FE] flex items-center justify-center px-6 py-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 md:p-16 rounded-[40px] shadow-2xl max-w-2xl text-center border-4 border-[#3B82F6]"
        >
          <div className="w-24 h-24 rounded-full bg-[#DBEAFE] flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-12 h-12 text-[#3B82F6]" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1045] mb-6 tracking-tighter">
            Application Submitted!
          </h2>
          <p className="text-xl text-[#1A1045]/70 font-serif italic mb-8">
            Thank you for choosing Tender Cradle! We've received your enrollment application and will review it within 2-3 business days.
          </p>
          <p className="text-sm text-[#1A1045]/60 mb-8">
            A confirmation email has been sent to <span className="font-bold">{formData.parentEmail}</span>
          </p>
          <Link to="/" className="inline-flex items-center gap-3 bg-[#3B82F6] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#1D4ED8] transition-all">
            Return Home
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  const stepProps = { formData, errors, updateField };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-32">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6 bg-white shadow-sm border border-[#1A1045]/5">
              <Sparkles className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#3B82F6]">
                Enrollment Application
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-[#1A1045] mb-4 tracking-tighter">
              Join Our <span className="text-[#3B82F6]">Family</span>
            </h1>
            <p className="text-lg text-[#1A1045]/60 font-serif italic">
              Step {currentStep} of {totalSteps}
            </p>
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner border border-[#1A1045]/5">
            <motion.div
              className="h-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Error Summary Banner */}
        <AnimatePresence>
          {Object.keys(errors).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              className="mb-8 bg-red-50 border-2 border-red-200 rounded-[30px] p-6 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-red-900 mb-2 text-lg">Please fix the following errors:</h3>
                  <ul className="space-y-1">
                    {Object.entries(errors).map(([field, error]) => (
                      <li key={field} className="text-sm text-red-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        {error}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => setErrors({})}
                  className="text-red-400 hover:text-red-600 transition-colors"
                  aria-label="Dismiss errors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 md:p-12 rounded-[40px] shadow-xl border border-[#1A1045]/5"
          >
            {currentStep === 1 && <Step1ParentInfo {...stepProps} />}
            {currentStep === 2 && <Step2ChildInfo {...stepProps} />}
            {currentStep === 3 && <Step3MedicalInfo {...stepProps} />}
            {currentStep === 4 && <Step4ProgramSelection {...stepProps} />}
            {currentStep === 5 && <Step5EmergencyContacts {...stepProps} />}
            {currentStep === 6 && <Step6Documents formData={formData} errors={errors} handleFileUpload={handleFileUpload} />}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-[#1A1045]/10">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="flex items-center gap-3 px-6 py-3 rounded-full border-2 border-[#1A1045]/10 hover:border-[#1A1045]/30 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-bold uppercase tracking-widest text-sm">Back</span>
                </button>
              )}
              
              {currentStep < totalSteps ? (
                <button
                  onClick={nextStep}
                  className="ml-auto flex items-center gap-3 bg-[#3B82F6] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#1D4ED8] transition-all"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="ml-auto flex items-center gap-3 bg-[#15803D] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#166534] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <CheckCircle2 className="w-5 h-5" />
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
