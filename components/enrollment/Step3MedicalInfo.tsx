import { Shield } from "lucide-react";
import { StepHeader } from "./StepHeader";
import { FormInput } from "./FormInput";
import { FormTextarea } from "./FormTextarea";
import { StepProps } from "./types";

export const Step3MedicalInfo = ({ formData, errors, updateField }: StepProps) => {
  return (
    <div>
      <StepHeader
        icon={Shield}
        title="Medical Information"
        subtitle="Help us keep your child safe"
        bgColor="bg-[#DCFCE7]"
        iconColor="text-[#15803D]"
      />

      <div className="grid gap-6">
        <FormTextarea
          label="Allergies"
          value={formData.allergies}
          onChange={(value) => updateField("allergies", value)}
          placeholder="List any known allergies (food, medication, environmental)"
        />
        <FormTextarea
          label="Current Medications"
          value={formData.medications}
          onChange={(value) => updateField("medications", value)}
          placeholder="List any medications your child is currently taking"
        />
        <FormTextarea
          label="Medical Conditions"
          value={formData.medicalConditions}
          onChange={(value) => updateField("medicalConditions", value)}
          placeholder="Any medical conditions we should be aware of?"
        />
        <div className="grid md:grid-cols-2 gap-6">
          <FormInput
            label="Doctor's Name"
            value={formData.doctorName}
            onChange={(value) => updateField("doctorName", value)}
            error={errors.doctorName}
            required
            placeholder="Dr. Smith"
            borderColor="#15803D"
          />
          <FormInput
            label="Doctor's Phone"
            type="tel"
            value={formData.doctorPhone}
            onChange={(value) => updateField("doctorPhone", value)}
            error={errors.doctorPhone}
            required
            placeholder="+234 800 000 0000"
            borderColor="#15803D"
          />
        </div>
      </div>
    </div>
  );
};
