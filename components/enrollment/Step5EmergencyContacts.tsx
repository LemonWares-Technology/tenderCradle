import { Shield, AlertCircle } from "lucide-react";
import { StepHeader } from "./StepHeader";
import { StepProps } from "./types";

export const Step5EmergencyContacts = ({ formData, errors, updateField }: StepProps) => {
  return (
    <div>
      <StepHeader
        icon={Shield}
        title="Emergency Contacts"
        subtitle="Who should we call in an emergency?"
        bgColor="bg-[#FEE2E2]"
        iconColor="text-[#DC2626]"
      />

      <div className="space-y-8">
        {/* Contact 1 */}
        <div className="p-6 bg-[#F8FAFC] rounded-[30px]">
          <h3 className="font-bold text-[#1A1045] mb-4 uppercase tracking-widest text-sm">
            Emergency Contact 1
          </h3>
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
                className={`w-full px-4 py-3 rounded-full border-2 ${
                  errors.emergencyName1 ? 'border-red-500' : 'border-[#1A1045]/10'
                } focus:border-[#DC2626] focus:outline-none transition-colors`}
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
                className={`w-full px-4 py-3 rounded-full border-2 ${
                  errors.emergencyPhone1 ? 'border-red-500' : 'border-[#1A1045]/10'
                } focus:border-[#DC2626] focus:outline-none transition-colors`}
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
                className={`w-full px-4 py-3 rounded-full border-2 ${
                  errors.emergencyRelation1 ? 'border-red-500' : 'border-[#1A1045]/10'
                } focus:border-[#DC2626] focus:outline-none transition-colors`}
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
          <h3 className="font-bold text-[#1A1045] mb-4 uppercase tracking-widest text-sm">
            Emergency Contact 2
          </h3>
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
                className={`w-full px-4 py-3 rounded-full border-2 ${
                  errors.emergencyName2 ? 'border-red-500' : 'border-[#1A1045]/10'
                } focus:border-[#DC2626] focus:outline-none transition-colors`}
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
                className={`w-full px-4 py-3 rounded-full border-2 ${
                  errors.emergencyPhone2 ? 'border-red-500' : 'border-[#1A1045]/10'
                } focus:border-[#DC2626] focus:outline-none transition-colors`}
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
                className={`w-full px-4 py-3 rounded-full border-2 ${
                  errors.emergencyRelation2 ? 'border-red-500' : 'border-[#1A1045]/10'
                } focus:border-[#DC2626] focus:outline-none transition-colors`}
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
  );
};
