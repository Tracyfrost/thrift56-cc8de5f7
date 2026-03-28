const items = [
  "$3 → $185",
  "1 of 1 pieces",
  "New drops weekly",
  "Seen on YouTube",
];

const MarqueeBrutalist = () => {
  const row = items.map((item, i) => (
    <span key={i} className="flex items-center gap-6 shrink-0">
      <span className="font-sans font-bold text-sm uppercase tracking-[0.15em] whitespace-nowrap">
        {item}
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-stone-500 shrink-0" />
    </span>
  ));

  return (
    <div className="bg-stone-950 text-stone-50 py-4 overflow-hidden select-none">
      <div className="flex gap-6 animate-marquee-scroll" style={{ width: "max-content" }}>
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  );
};

export default MarqueeBrutalist;
