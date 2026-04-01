interface FormTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  borderColor?: string;
}

export const FormTextarea = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  borderColor = "#15803D"
}: FormTextareaProps) => {
  return (
    <div>
      <label className="block text-sm font-bold uppercase tracking-widest text-[#1A1045]/60 mb-2">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-6 py-4 rounded-[30px] border-2 border-[#1A1045]/10 focus:border-[${borderColor}] focus:outline-none transition-colors resize-none`}
        rows={rows}
        placeholder={placeholder}
      />
    </div>
  );
};
