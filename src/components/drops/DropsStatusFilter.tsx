type StatusOption = { value: string; label: string };

const options: StatusOption[] = [
  { value: "all", label: "ALL DROPS" },
  { value: "available", label: "AVAILABLE" },
  { value: "archived", label: "SOLD" },
  { value: "giveaway", label: "GIVEAWAY" },
  { value: "raffle", label: "RAFFLE" },
];

interface Props {
  active: string;
  onChange: (value: string) => void;
}

const DropsStatusFilter = ({ active, onChange }: Props) => (
  <div className="bg-[#F9F6F0] border-b border-stone-300">
    <div className="container max-w-5xl py-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {options.map((opt) => {
          const isActive = active === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`font-sans font-black text-[11px] tracking-[0.15em] uppercase px-6 py-3 border-2 rounded-none transition-all duration-300 ${
                isActive
                  ? "bg-orange-800 border-orange-800 text-stone-50"
                  : "border-stone-950 text-stone-950 hover:bg-stone-950 hover:text-stone-50"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

export default DropsStatusFilter;
