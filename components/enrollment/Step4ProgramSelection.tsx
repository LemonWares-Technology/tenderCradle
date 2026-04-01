import { Calendar, AlertCircle } from "lucide-react";
import { StepHeader } from "./StepHeader";
import { FormInput } from "./FormInput";
import { StepProps } from "./types";

export const Step4ProgramSelection = ({ formData, errors, updateField }: StepProps) => {
  const programs = ["Infants (3-18 Months)", "Toddlers (18M-3Y)", "Preschool (3-5Y)"];
  const enrollmentTypes = ["Full-Time", "Part-Time"];

  return (
    <div>
      <StepHeader
        icon={Calendar}
        title="Program Selection"
        subtitle="Choose the right program"
        bgColor="bg-[#FEF9C3]"
        iconColor="text-[#B45309]"
      />

      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-4">
            Program Type <span className="text-red-500">*</span>
          </label>
          <div className="grid md:grid-cols-3 gap-4">
            {programs.map((program) => (
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
            {enrollmentTypes.map((type) => (
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

        <FormInput
          label="Preferred Start Date"
          type="date"
          value={formData.startDate}
          onChange={(value) => updateField("startDate", value)}
          error={errors.startDate}
          required
          borderColor="#B45309"
        />
      </div>
    </div>
  );
};
