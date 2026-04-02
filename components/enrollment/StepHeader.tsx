import { LucideIcon } from "lucide-react";

interface StepHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  bgColor: string;
  iconColor: string;
}

export const StepHeader = ({ icon: Icon, title, subtitle, bgColor, iconColor }: StepHeaderProps) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className={`w-16 h-16 rounded-full ${bgColor} flex items-center justify-center`}>
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>
      <div>
        <h2 className="font-serif text-3xl text-[#1A1045] tracking-tighter">{title}</h2>
        <p className="text-base text-[#1A1045]/60 font-serif italic">{subtitle}</p>
      </div>
    </div>
  );
};
