import { getActivePieces } from "@/data/artPieces";

const DropsHero = () => {
  const activePieces = getActivePieces();
  const availableCount = activePieces.filter((p) => p.status === "available").length;

  return (
    <section className="relative py-20 md:py-32 bg-[#F9F6F0] text-center overflow-hidden">
      {/* Film grain overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }} />

      <div className="container relative z-10 max-w-4xl">
        <h1 className="font-sans font-black text-5xl md:text-8xl tracking-tighter text-stone-950 leading-[0.85] mb-6">
          ART DROPS
        </h1>
        <p className="font-sans text-base md:text-lg text-stone-600 max-w-2xl mx-auto mb-3 leading-relaxed">
          Every piece started as something no one wanted. Now it exists once. When it's gone, it's gone.
        </p>
        <p className="font-serif italic text-stone-500 text-sm">
          No restocks. No duplicates.
        </p>

        {/* Status strip */}
        <div className="mt-12 flex items-center justify-center divide-x divide-stone-300 border border-stone-300 rounded-none max-w-xl mx-auto">
          <div className="flex-1 py-3 px-4">
            <span className="font-sans font-bold text-xs md:text-sm tracking-wider text-stone-950 uppercase">
              DROP #001 LIVE
            </span>
          </div>
          <div className="flex-1 py-3 px-4">
            <span className="font-sans font-bold text-xs md:text-sm tracking-wider text-stone-950 uppercase">
              {availableCount} {availableCount === 1 ? "piece" : "pieces"} available
            </span>
          </div>
          <div className="flex-1 py-3 px-4">
            <span className="font-sans font-bold text-xs md:text-sm tracking-wider text-orange-800 uppercase">
              Next drop in 3 days
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DropsHero;
