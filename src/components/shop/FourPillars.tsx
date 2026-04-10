import { Search, Paintbrush, BookOpen, Rocket } from "lucide-react";

const pillars = [
  {
    icon: Search,
    label: "Discovery",
    desc: "Found forgotten",
    detail: "Pulled from thrift stores, flea markets, and places most people ignore.",
  },
  {
    icon: Paintbrush,
    label: "Transformation",
    desc: "Made remarkable",
    detail: "Restored, reimagined, and finished by hand in Studio 56.",
  },
  {
    icon: BookOpen,
    label: "Story",
    desc: "Documented on film",
    detail: "Every piece has an episode. The process is the proof.",
  },
  {
    icon: Rocket,
    label: "Release",
    desc: "Yours to own",
    detail: "Limited drops. Once it's gone, it stays gone.",
  },
];

const FourPillars = () => (
  <div className="space-y-3">
    <p className="font-distressed text-[10px] uppercase tracking-[0.25em] text-stone-500 text-center">
      From Forgotten to Featured
    </p>
    <div className="grid grid-cols-4 gap-0 border border-stone-800">
      {pillars.map(({ icon: Icon, label, desc, detail }, i) => (
        <div
          key={label}
          className={`flex flex-col items-center py-5 px-3 text-center ${
            i < 3 ? "border-r border-stone-800" : ""
          }`}
        >
          <Icon size={20} className="text-rust mb-2" />
          <span className="font-heading text-[10px] uppercase tracking-wider text-stone-200 mb-0.5">
            {label}
          </span>
          <span className="text-[9px] text-stone-500 italic leading-tight">
            {detail}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default FourPillars;
