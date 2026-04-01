import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle2, Upload, X, Sparkles, Baby, Heart, Shield, Calendar, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { submitEnrollment } from "@/lib/api/enrollments";

interface EnrollmentFormData {
  // Parent Info
  parentFirstName: string;
  parentLastName: string;
  parentEmail: string;
  parentPhone: string;
  parentAddress: string;
  parentCity: string;
  parentState: string;
  
  // Child Info
  childFirstName: string;
  childLastName: string;
  childDOB: string;
  childGender: string;
  
  // Medical Info
  allergies: string;
  medications: string;
  medicalConditions: string;
  doctorName: string;
  doctorPhone: string;
  
  // Program Selection
  programType: string;
  enrollmentType: string;
  startDate: string;
  
  // Emergency Contacts
  emergencyName1: string;
  emergencyPhone1: string;
  emergencyRelation1: string;
  emergencyName2: string;
  emergencyPhone2: string;
  emergencyRelation2: string;
  
  // Documents
  birthCertificate: File | null;
  immunizationRecords: File | null;
}

const initialFormData: EnrollmentFormData = {
  parentFirstName: "", parentLastName: "", parentEmail: "", parentPhone: "",
  parentAddress: "", parentCity: "", parentState: "",
  childFirstName: "", childLastName: "", childDOB: "", childGender: "",
  allergies: "", medications: "", medicalConditions: "", doctorName: "", doctorPhone: "",
  programType: "", enrollmentType: "", startDate: "",
  emergencyName1: "", emergencyPhone1: "", emergencyRelation1: "",
  emergencyName2: "", emergencyPhone2: "", emergencyRelation2: "",
  birthCertificate: null, immunizationRecords: null,
};

export const EnrollmentFormContent = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<EnrollmentFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const totalSteps = 6;

  const updateField = (field: keyof EnrollmentFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileUpload = (field: "birthCertificate" | "immunizationRecords", file: File | null) => {
    if (file) {
      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, [field]: "File size must be less than 5MB" }));
        return;
      }
      
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, [field]: "Only PDF, JPG, and PNG files are allowed" }));
        return;
      }
    }
    
    updateField(field, file);
  };

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    // Allow various phone formats
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phone.length >= 10 && phoneRegex.test(phone);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Parent Information
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

      case 2: // Child Information
        if (!formData.childFirstName.trim()) newErrors.childFirstName = "First name is required";
        if (!formData.childLastName.trim()) newErrors.childLastName = "Last name is required";
        if (!formData.childDOB) newErrors.childDOB = "Date of birth is required";
        if (!formData.childGender) newErrors.childGender = "Gender is required";
        break;

      case 3: // Medical Information
        if (!formData.doctorName.trim()) newErrors.doctorName = "Doctor's name is required";
        if (!formData.doctorPhone.trim()) {
          newErrors.doctorPhone = "Doctor's phone is required";
        } else if (!validatePhone(formData.doctorPhone)) {
          newErrors.doctorPhone = "Please enter a valid phone number";
        }
        break;

      case 4: // Program Selection
        if (!formData.programType) newErrors.programType = "Please select a program type";
        if (!formData.enrollmentType) newErrors.enrollmentType = "Please select an enrollment type";
        if (!formData.startDate) newErrors.startDate = "Start date is required";
        break;

      case 5: // Emergency Contacts
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

      case 6: // Documents
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
      // Scroll to top to show error banner
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Also scroll to first error field after a short delay
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
      setErrors({}); // Clear errors when going back
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(6)) {
      return;
    }

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
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1045] mb-6 tracking-tighter">Application Submitted!</h2>
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-32">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6 bg-white shadow-sm border border-[#1A1045]/5">
              <Sparkles className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#3B82F6]">Enrollment Application</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-[#1A1045] mb-4 tracking-tighter">
              Join Our <span className="text-[#3B82F6]">Family</span>
            </h1>
            <p className="text-lg text-[#1A1045]/60 font-serif italic">Step {currentStep} of {totalSteps}</p>
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
            
            {/* Step 1: Parent Information */}
            {currentStep === 1 && (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full bg-[#DBEAFE] flex items-center justify-center">
                    <Heart className="w-8 h-8 text-[#3B82F6]" />
                  </div>
                  <div>
                    <h2 className="font-serif text-3xl text-[#1A1045] tracking-tighter">Parent Information</h2>
                    <p className="text-sm text-[#1A1045]/60 font-serif italic">Tell us about yourself</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.parentFirstName}
                      onChange={(e) => updateField("parentFirstName", e.target.value)}
                      className={`w-full px-6 py-4 rounded-full border-2 ${errors.parentFirstName ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#3B82F6] focus:outline-none transition-colors`}
                      placeholder="John"
                    />
                    {errors.parentFirstName && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.parentFirstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.parentLastName}
                      onChange={(e) => updateField("parentLastName", e.target.value)}
                      className={`w-full px-6 py-4 rounded-full border-2 ${errors.parentLastName ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#3B82F6] focus:outline-none transition-colors`}
                      placeholder="Doe"
                    />
                    {errors.parentLastName && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.parentLastName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.parentEmail}
                      onChange={(e) => updateField("parentEmail", e.target.value)}
                      className={`w-full px-6 py-4 rounded-full border-2 ${errors.parentEmail ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#3B82F6] focus:outline-none transition-colors`}
                      placeholder="john@example.com"
                    />
                    {errors.parentEmail && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.parentEmail}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.parentPhone}
                      onChange={(e) => updateField("parentPhone", e.target.value)}
                      className={`w-full px-6 py-4 rounded-full border-2 ${errors.parentPhone ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#3B82F6] focus:outline-none transition-colors`}
                      placeholder="+234 800 000 0000"
                    />
                    {errors.parentPhone && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.parentPhone}
                      </p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                      Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.parentAddress}
                      onChange={(e) => updateField("parentAddress", e.target.value)}
                      className={`w-full px-6 py-4 rounded-full border-2 ${errors.parentAddress ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#3B82F6] focus:outline-none transition-colors`}
                      placeholder="123 Main Street"
                    />
                    {errors.parentAddress && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.parentAddress}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.parentCity}
                      onChange={(e) => updateField("parentCity", e.target.value)}
                      className={`w-full px-6 py-4 rounded-full border-2 ${errors.parentCity ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#3B82F6] focus:outline-none transition-colors`}
                      placeholder="Lagos"
                    />
                    {errors.parentCity && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.parentCity}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.parentState}
                      onChange={(e) => updateField("parentState", e.target.value)}
                      className={`w-full px-6 py-4 rounded-full border-2 ${errors.parentState ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#3B82F6] focus:outline-none transition-colors`}
                      placeholder="Lagos State"
                    />
                    {errors.parentState && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.parentState}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Child Information */}
            {currentStep === 2 && (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full bg-[#FCE7F3] flex items-center justify-center">
                    <Baby className="w-8 h-8 text-[#BE185D]" />
                  </div>
                  <div>
                    <h2 className="font-serif text-3xl text-[#1A1045] tracking-tighter">Child Information</h2>
                    <p className="text-sm text-[#1A1045]/60 font-serif italic">Tell us about your little one</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.childFirstName}
                      onChange={(e) => updateField("childFirstName", e.target.value)}
                      className={`w-full px-6 py-4 rounded-full border-2 ${errors.childFirstName ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#BE185D] focus:outline-none transition-colors`}
                      placeholder="Emma"
                    />
                    {errors.childFirstName && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.childFirstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.childLastName}
                      onChange={(e) => updateField("childLastName", e.target.value)}
                      className={`w-full px-6 py-4 rounded-full border-2 ${errors.childLastName ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#BE185D] focus:outline-none transition-colors`}
                      placeholder="Doe"
                    />
                    {errors.childLastName && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.childLastName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.childDOB}
                      onChange={(e) => updateField("childDOB", e.target.value)}
                      className={`w-full px-6 py-4 rounded-full border-2 ${errors.childDOB ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#BE185D] focus:outline-none transition-colors`}
                    />
                    {errors.childDOB && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.childDOB}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.childGender}
                      onChange={(e) => updateField("childGender", e.target.value)}
                      className={`w-full px-6 py-4 rounded-full border-2 ${errors.childGender ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#BE185D] focus:outline-none transition-colors`}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.childGender && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.childGender}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Medical Information */}
            {currentStep === 3 && (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full bg-[#DCFCE7] flex items-center justify-center">
                    <Shield className="w-8 h-8 text-[#15803D]" />
                  </div>
                  <div>
                    <h2 className="font-serif text-3xl text-[#1A1045] tracking-tighter">Medical Information</h2>
                    <p className="text-sm text-[#1A1045]/60 font-serif italic">Help us keep your child safe</p>
                  </div>
                </div>

                <div className="grid gap-6">
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">Allergies</label>
                    <textarea
                      value={formData.allergies}
                      onChange={(e) => updateField("allergies", e.target.value)}
                      className="w-full px-6 py-4 rounded-[30px] border-2 border-[#1A1045]/10 focus:border-[#15803D] focus:outline-none transition-colors resize-none"
                      rows={3}
                      placeholder="List any known allergies (food, medication, environmental)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">Current Medications</label>
                    <textarea
                      value={formData.medications}
                      onChange={(e) => updateField("medications", e.target.value)}
                      className="w-full px-6 py-4 rounded-[30px] border-2 border-[#1A1045]/10 focus:border-[#15803D] focus:outline-none transition-colors resize-none"
                      rows={3}
                      placeholder="List any medications your child is currently taking"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">Medical Conditions</label>
                    <textarea
                      value={formData.medicalConditions}
                      onChange={(e) => updateField("medicalConditions", e.target.value)}
                      className="w-full px-6 py-4 rounded-[30px] border-2 border-[#1A1045]/10 focus:border-[#15803D] focus:outline-none transition-colors resize-none"
                      rows={3}
                      placeholder="Any medical conditions we should be aware of?"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                        Doctor's Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.doctorName}
                        onChange={(e) => updateField("doctorName", e.target.value)}
                        className={`w-full px-6 py-4 rounded-full border-2 ${errors.doctorName ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#15803D] focus:outline-none transition-colors`}
                        placeholder="Dr. Smith"
                      />
                      {errors.doctorName && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.doctorName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                        Doctor's Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.doctorPhone}
                        onChange={(e) => updateField("doctorPhone", e.target.value)}
                        className={`w-full px-6 py-4 rounded-full border-2 ${errors.doctorPhone ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#15803D] focus:outline-none transition-colors`}
                        placeholder="+234 800 000 0000"
                      />
                      {errors.doctorPhone && (
                        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.doctorPhone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Program Selection */}
            {currentStep === 4 && (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full bg-[#FEF9C3] flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-[#B45309]" />
                  </div>
                  <div>
                    <h2 className="font-serif text-3xl text-[#1A1045] tracking-tighter">Program Selection</h2>
                    <p className="text-sm text-[#1A1045]/60 font-serif italic">Choose the right program</p>
                  </div>
                </div>

                <div className="grid gap-6">
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-4">
                      Program Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {["Infants (3-18 Months)", "Toddlers (18M-3Y)", "Preschool (3-5Y)"].map((program) => (
                        <button
                          key={program}
                          type="button"
                          onClick={() => updateField("programType", program)}
                          className={`p-6 rounded-[30px] border-2 transition-all ${
                            formData.programType === program
                              ? "border-[#B45309] bg-[#FEF9C3]"
                              : errors.programType
                              ? "border-red-500"
                              : "border-[#1A1045]/10 hover:border-[#B45309]/50"
                          }`}
                        >
                          <p className="font-bold text-[#1A1045] text-center">{program}</p>
                        </button>
                      ))}
                    </div>
                    {errors.programType && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.programType}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-4">
                      Enrollment Type <span className="text-red-500">*</span>
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {["Full-Time", "Part-Time"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => updateField("enrollmentType", type)}
                          className={`p-6 rounded-[30px] border-2 transition-all ${
                            formData.enrollmentType === type
                              ? "border-[#B45309] bg-[#FEF9C3]"
                              : errors.enrollmentType
                              ? "border-red-500"
                              : "border-[#1A1045]/10 hover:border-[#B45309]/50"
                          }`}
                        >
                          <p className="font-bold text-[#1A1045] text-center">{type}</p>
                        </button>
                      ))}
                    </div>
                    {errors.enrollmentType && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.enrollmentType}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                      Preferred Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => updateField("startDate", e.target.value)}
                      className={`w-full px-6 py-4 rounded-full border-2 ${errors.startDate ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#B45309] focus:outline-none transition-colors`}
                    />
                    {errors.startDate && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.startDate}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Emergency Contacts */}
            {currentStep === 5 && (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full bg-[#FEE2E2] flex items-center justify-center">
                    <Shield className="w-8 h-8 text-[#DC2626]" />
                  </div>
                  <div>
                    <h2 className="font-serif text-3xl text-[#1A1045] tracking-tighter">Emergency Contacts</h2>
                    <p className="text-sm text-[#1A1045]/60 font-serif italic">Who should we call in an emergency?</p>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Contact 1 */}
                  <div className="p-6 bg-[#F8FAFC] rounded-[30px]">
                    <h3 className="font-bold text-[#1A1045] mb-4 uppercase tracking-widest text-sm">Emergency Contact 1</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.emergencyName1}
                          onChange={(e) => updateField("emergencyName1", e.target.value)}
                          className={`w-full px-4 py-3 rounded-full border-2 ${errors.emergencyName1 ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#DC2626] focus:outline-none transition-colors`}
                          placeholder="Jane Doe"
                        />
                        {errors.emergencyName1 && (
                          <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.emergencyName1}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.emergencyPhone1}
                          onChange={(e) => updateField("emergencyPhone1", e.target.value)}
                          className={`w-full px-4 py-3 rounded-full border-2 ${errors.emergencyPhone1 ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#DC2626] focus:outline-none transition-colors`}
                          placeholder="+234 800 000 0000"
                        />
                        {errors.emergencyPhone1 && (
                          <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.emergencyPhone1}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                          Relationship <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.emergencyRelation1}
                          onChange={(e) => updateField("emergencyRelation1", e.target.value)}
                          className={`w-full px-4 py-3 rounded-full border-2 ${errors.emergencyRelation1 ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#DC2626] focus:outline-none transition-colors`}
                          placeholder="Aunt"
                        />
                        {errors.emergencyRelation1 && (
                          <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.emergencyRelation1}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact 2 */}
                  <div className="p-6 bg-[#F8FAFC] rounded-[30px]">
                    <h3 className="font-bold text-[#1A1045] mb-4 uppercase tracking-widest text-sm">Emergency Contact 2</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.emergencyName2}
                          onChange={(e) => updateField("emergencyName2", e.target.value)}
                          className={`w-full px-4 py-3 rounded-full border-2 ${errors.emergencyName2 ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#DC2626] focus:outline-none transition-colors`}
                          placeholder="Bob Smith"
                        />
                        {errors.emergencyName2 && (
                          <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.emergencyName2}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.emergencyPhone2}
                          onChange={(e) => updateField("emergencyPhone2", e.target.value)}
                          className={`w-full px-4 py-3 rounded-full border-2 ${errors.emergencyPhone2 ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#DC2626] focus:outline-none transition-colors`}
                          placeholder="+234 800 000 0000"
                        />
                        {errors.emergencyPhone2 && (
                          <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.emergencyPhone2}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
                          Relationship <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.emergencyRelation2}
                          onChange={(e) => updateField("emergencyRelation2", e.target.value)}
                          className={`w-full px-4 py-3 rounded-full border-2 ${errors.emergencyRelation2 ? 'border-red-500' : 'border-[#1A1045]/10'} focus:border-[#DC2626] focus:outline-none transition-colors`}
                          placeholder="Uncle"
                        />
                        {errors.emergencyRelation2 && (
                          <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.emergencyRelation2}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Document Upload */}
            {currentStep === 6 && (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full bg-[#E0E7FF] flex items-center justify-center">
                    <Upload className="w-8 h-8 text-[#4F46E5]" />
                  </div>
                  <div>
                    <h2 className="font-serif text-3xl text-[#1A1045] tracking-tighter">Upload Documents</h2>
                    <p className="text-sm text-[#1A1045]/60 font-serif italic">Required documents for enrollment</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Birth Certificate */}
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-3">
                      Birth Certificate <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload("birthCertificate", e.target.files?.[0] || null)}
                        className="hidden"
                        id="birthCert"
                        required
                      />
                      <label
                        htmlFor="birthCert"
                        className={`flex items-center justify-center gap-4 p-8 border-2 border-dashed ${errors.birthCertificate ? 'border-red-500 bg-red-50' : 'border-[#1A1045]/20'} rounded-[30px] cursor-pointer hover:border-[#4F46E5] hover:bg-[#E0E7FF]/20 transition-all`}
                      >
                        {formData.birthCertificate ? (
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-[#15803D]" />
                            <span className="font-serif text-[#1A1045]">{formData.birthCertificate.name}</span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleFileUpload("birthCertificate", null);
                              }}
                              className="p-1 hover:bg-red-100 rounded-full transition-colors"
                            >
                              <X className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-[#1A1045]/40" />
                            <span className="font-serif text-[#1A1045]/60">Click to upload or drag and drop</span>
                          </>
                        )}
                      </label>
                    </div>
                    {errors.birthCertificate && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.birthCertificate}
                      </p>
                    )}
                  </div>

                  {/* Immunization Records */}
                  <div>
                    <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-3">
                      Immunization Records <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => handleFileUpload("immunizationRecords", e.target.files?.[0] || null)}
                        className="hidden"
                        id="immunization"
                        required
                      />
                      <label
                        htmlFor="immunization"
                        className={`flex items-center justify-center gap-4 p-8 border-2 border-dashed ${errors.immunizationRecords ? 'border-red-500 bg-red-50' : 'border-[#1A1045]/20'} rounded-[30px] cursor-pointer hover:border-[#4F46E5] hover:bg-[#E0E7FF]/20 transition-all`}
                      >
                        {formData.immunizationRecords ? (
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-[#15803D]" />
                            <span className="font-serif text-[#1A1045]">{formData.immunizationRecords.name}</span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleFileUpload("immunizationRecords", null);
                              }}
                              className="p-1 hover:bg-red-100 rounded-full transition-colors"
                            >
                              <X className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-[#1A1045]/40" />
                            <span className="font-serif text-[#1A1045]/60">Click to upload or drag and drop</span>
                          </>
                        )}
                      </label>
                    </div>
                    {errors.immunizationRecords && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.immunizationRecords}
                      </p>
                    )}
                  </div>

                  <div className="bg-[#DBEAFE] p-6 rounded-[30px] border border-[#3B82F6]/20">
                    <p className="text-sm text-[#1A1045]/70 font-serif italic">
                      <span className="font-bold text-[#3B82F6]">Note:</span> Accepted formats: PDF, JPG, PNG. Max file size: 5MB
                    </p>
                  </div>
                </div>
              </div>
            )}

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
