interface DropsFilterBarProps {
  filter: string;
  onFilterChange: (value: string) => void;
}

const filters = [
  { label: "All Drops", value: "all" },
  { label: "Available", value: "available" },
  { label: "Sold", value: "archived" },
  { label: "Giveaway", value: "giveaway" },
  { label: "Raffle", value: "raffle" },
];

const DropsFilterBar = ({ filter, onFilterChange }: DropsFilterBarProps) => {
  return (
    <div className="container py-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`px-5 py-2.5 text-xs font-sans font-bold uppercase tracking-[0.15em] border-2 rounded-none transition-colors ${
              filter === f.value
                ? "bg-orange-800 text-stone-50 border-orange-800"
                : "bg-transparent text-stone-950 border-stone-950 hover:bg-stone-950 hover:text-stone-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DropsFilterBar;
