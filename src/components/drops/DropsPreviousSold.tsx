import { getArchivedPieces } from "@/data/artPieces";

const DropsPreviousSold = () => {
  const archived = getArchivedPieces();
  if (archived.length === 0) return null;

  return (
    <section className="py-16 bg-[#F9F6F0]">
      <div className="container">
        <h2 className="font-sans font-black text-3xl md:text-4xl tracking-tighter text-stone-950 mb-8">
          PREVIOUS DROPS
        </h2>

        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide">
          {archived.map((piece) => (
            <div
              key={piece.id}
              className="relative flex-shrink-0 w-64 snap-start"
            >
              {/* Desaturated image */}
              <div className="relative aspect-square overflow-hidden bg-stone-200 grayscale">
                <img
                  src={piece.afterImage}
                  alt={piece.title}
                  className="w-full h-full object-cover"
                />
                {/* SOLD stamp */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="font-sans font-black text-5xl text-orange-800/25 uppercase rotate-[-12deg] select-none">
                    SOLD
                  </span>
                </div>
              </div>
              <h3 className="font-sans font-bold text-sm text-stone-600 mt-3 tracking-tight">
                {piece.title}
              </h3>
              {piece.price && (
                <p className="font-serif italic text-stone-400 text-xs">
                  Sold for ${piece.price}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DropsPreviousSold;
