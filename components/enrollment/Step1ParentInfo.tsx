import { Heart } from "lucide-react";
import { StepHeader } from "./StepHeader";
import { FormInput } from "./FormInput";
import { StepProps } from "./types";

export const Step1ParentInfo = ({ formData, errors, updateField }: StepProps) => {
  return (
    <div>
      <StepHeader
        icon={Heart}
        title="Parent Information"
        subtitle="Tell us about yourself"
        bgColor="bg-[#DBEAFE]"
        iconColor="text-[#3B82F6]"
      />

      <div className="grid md:grid-cols-2 gap-6">
        <FormInput
          label="First Name"
          value={formData.parentFirstName}
          onChange={(value) => updateField("parentFirstName", value)}
          error={errors.parentFirstName}
          required
          placeholder="John"
        />
        <FormInput
          label="Last Name"
          value={formData.parentLastName}
          onChange={(value) => updateField("parentLastName", value)}
          error={errors.parentLastName}
          required
          placeholder="Doe"
        />
        <FormInput
          label="Email"
          type="email"
          value={formData.parentEmail}
          onChange={(value) => updateField("parentEmail", value)}
          error={errors.parentEmail}
          required
          placeholder="john@example.com"
        />
        <FormInput
          label="Phone"
          type="tel"
          value={formData.parentPhone}
          onChange={(value) => updateField("parentPhone", value)}
          error={errors.parentPhone}
          required
          placeholder="+234 800 000 0000"
        />
        <FormInput
          label="Address"
          value={formData.parentAddress}
          onChange={(value) => updateField("parentAddress", value)}
          error={errors.parentAddress}
          required
          placeholder="123 Main Street"
          className="md:col-span-2"
        />
        <FormInput
          label="City"
          value={formData.parentCity}
          onChange={(value) => updateField("parentCity", value)}
          error={errors.parentCity}
          required
          placeholder="Lagos"
        />
        <FormInput
          label="State"
          value={formData.parentState}
          onChange={(value) => updateField("parentState", value)}
          error={errors.parentState}
          required
          placeholder="Lagos State"
        />
      </div>
    </div>
  );
};
