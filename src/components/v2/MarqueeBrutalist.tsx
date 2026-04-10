const items = [
  "$3 → $185",
  "1 of 1 pieces",
  "New drops weekly",
  "Seen on YouTube",
];

const MarqueeBrutalist = () => {
  const row = items.map((item, i) => (
    <span key={i} className="flex items-center gap-6 shrink-0">
      <span className="font-sans font-bold text-sm md:text-base uppercase tracking-[0.15em] whitespace-nowrap">
        {item}
      </span>
      <span className="w-2 h-2 rotate-45 bg-orange-800 shrink-0" />
    </span>
  ));

  return (
    <div className="relative bg-stone-950 text-stone-50 py-4 overflow-hidden select-none">
      {/* Diagonal stripe texture */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(135deg, transparent, transparent 3px, hsl(16 70% 38% / 0.4) 3px, hsl(16 70% 38% / 0.4) 6px)",
        }}
      />
      <div className="flex gap-6 animate-marquee-scroll relative z-10" style={{ width: "max-content" }}>
        {row}
        {row}
        {row}
        {row}
      </div>
    </div>
  );
};

export default MarqueeBrutalist;
