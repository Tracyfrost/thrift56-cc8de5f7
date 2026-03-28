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
          className={`px-5 py-2 text-xs font-sans font-black uppercase tracking-widest border-2 rounded-none transition-colors ${
            filter === cat.key
              ? "bg-orange-800 text-stone-50 border-orange-800"
              : "bg-transparent text-stone-950 border-stone-950 hover:bg-stone-950 hover:text-stone-50"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default EpisodeCategoryFilter;
