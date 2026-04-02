import { Upload, CheckCircle2, X, AlertCircle } from "lucide-react";
import { StepHeader } from "./StepHeader";
import { EnrollmentFormData } from "./types";

interface Step6Props {
  formData: EnrollmentFormData;
  errors: Record<string, string>;
  handleFileUpload: (field: "birthCertificate" | "immunizationRecords", file: File | null) => void;
}

export const Step6Documents = ({ formData, errors, handleFileUpload }: Step6Props) => {
  return (
    <div>
      <StepHeader
        icon={Upload}
        title="Upload Documents"
        subtitle="Required documents for enrollment"
        bgColor="bg-[#E0E7FF]"
        iconColor="text-[#4F46E5]"
      />

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
              className={`flex items-center justify-center gap-4 p-8 border-2 border-dashed ${
                errors.birthCertificate ? 'border-red-500 bg-red-50' : 'border-[#1A1045]/20'
              } rounded-[30px] cursor-pointer hover:border-[#4F46E5] hover:bg-[#E0E7FF]/20 transition-all`}
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
              className={`flex items-center justify-center gap-4 p-8 border-2 border-dashed ${
                errors.immunizationRecords ? 'border-red-500 bg-red-50' : 'border-[#1A1045]/20'
              } rounded-[30px] cursor-pointer hover:border-[#4F46E5] hover:bg-[#E0E7FF]/20 transition-all`}
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
          <p className="text-base text-[#1A1045]/70 font-serif italic">
            <span className="font-bold text-[#3B82F6]">Note:</span> Accepted formats: PDF, JPG, PNG. Max file size: 5MB
          </p>
        </div>
      </div>
    </div>
  );
};
