interface EpisodeCategoryFilterProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

const categories = [
  { key: "all", label: "All" },
  { key: "thrift-hunt", label: "Thrift Hunts" },
  { key: "transformation", label: "Transformations" },
  { key: "drop", label: "Drops" },
  { key: "studio", label: "Studio" },
];

const EpisodeCategoryFilter = ({ filter, onFilterChange }: EpisodeCategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center py-8">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onFilterChange(cat.key)}
          className={`px-5 py-2.5 text-xs font-sans font-black uppercase tracking-widest border-2 rounded-none transition-colors min-h-[44px] ${
            filter === cat.key
              ? "bg-orange-800 text-[#F9F6F0] border-orange-800"
              : "bg-transparent text-stone-700 border-stone-400 hover:bg-stone-200 hover:text-stone-950 hover:border-stone-500"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default EpisodeCategoryFilter;
