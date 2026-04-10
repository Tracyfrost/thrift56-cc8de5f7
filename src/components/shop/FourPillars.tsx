import { Search, Eye, Paintbrush, BookOpen, Rocket } from "lucide-react";

const pillars = [
  { icon: Search, label: "Discovery", desc: "Found forgotten" },
  { icon: Paintbrush, label: "Transformation", desc: "Made remarkable" },
  { icon: BookOpen, label: "Story", desc: "Documented on film" },
  { icon: Rocket, label: "Release", desc: "Yours to own" },
];

const FourPillars = () => (
  <div className="grid grid-cols-4 gap-0 border border-stone-800">
    {pillars.map(({ icon: Icon, label, desc }, i) => (
      <div
        key={label}
        className={`flex flex-col items-center py-3 px-2 text-center ${
          i < 3 ? "border-r border-stone-800" : ""
        }`}
      >
        <Icon size={16} className="text-rust mb-1" />
        <span className="font-heading text-[9px] uppercase tracking-wider text-stone-300">
          {label}
        </span>
        <span className="text-[8px] text-stone-600 italic">{desc}</span>
      </div>
    ))}
  </div>
);

export default FourPillars;
