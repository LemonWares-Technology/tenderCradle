import { Baby, AlertCircle } from "lucide-react";
import { StepHeader } from "./StepHeader";
import { FormInput } from "./FormInput";
import { StepProps } from "./types";

export const Step2ChildInfo = ({ formData, errors, updateField }: StepProps) => {
  return (
    <div>
      <StepHeader
        icon={Baby}
        title="Child Information"
        subtitle="Tell us about your little one"
        bgColor="bg-[#FCE7F3]"
        iconColor="text-[#BE185D]"
      />

      <div className="grid md:grid-cols-2 gap-6">
        <FormInput
          label="First Name"
          value={formData.childFirstName}
          onChange={(value) => updateField("childFirstName", value)}
          error={errors.childFirstName}
          required
          placeholder="Emma"
          borderColor="#BE185D"
        />
        <FormInput
          label="Last Name"
          value={formData.childLastName}
          onChange={(value) => updateField("childLastName", value)}
          error={errors.childLastName}
          required
          placeholder="Doe"
          borderColor="#BE185D"
        />
        <FormInput
          label="Date of Birth"
          type="date"
          value={formData.childDOB}
          onChange={(value) => updateField("childDOB", value)}
          error={errors.childDOB}
          required
          borderColor="#BE185D"
        />
        <div>
          <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={formData.childGender}
            onChange={(e) => updateField("childGender", e.target.value)}
            className={`w-full px-6 py-4 rounded-full border-2 ${
              errors.childGender ? 'border-red-500' : 'border-[#1A1045]/10'
            } focus:border-[#BE185D] focus:outline-none transition-colors`}
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
  );
};
