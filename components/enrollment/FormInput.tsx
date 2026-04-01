import { AlertCircle } from "lucide-react";

interface FormInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  borderColor?: string;
}

export const FormInput = ({
  label,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  placeholder,
  className = "",
  borderColor = "#3B82F6"
}: FormInputProps) => {
  return (
    <div className={className}>
      <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-6 py-4 rounded-full border-2 ${
          error ? 'border-red-500' : 'border-[#1A1045]/10'
        } focus:border-[${borderColor}] focus:outline-none transition-colors`}
        placeholder={placeholder}
      />
      {error && (
        <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
};
