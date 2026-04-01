import { useArtPieces } from "@/hooks/useSupabaseData";

const DropsArchive = () => {
  const { data: pieces } = useArtPieces({ status: "archived" });
  const archived = pieces || [];
  if (archived.length === 0) return null;

  return (
    <section className="py-16 bg-[#F9F6F0] border-t border-stone-300">
      <div className="container">
        <h2 className="font-sans font-black text-3xl md:text-4xl tracking-tighter text-stone-950 mb-2">
          ARCHIVE
        </h2>
        <p className="font-serif italic text-stone-500 text-sm mb-8">
          Every piece ever made. History preserved.
        </p>

        <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide">
          {archived.map((piece, i) => (
            <div key={piece.id} className="relative flex-shrink-0 w-64 snap-start">
              {/* Desaturated image */}
              <div className="relative aspect-square overflow-hidden bg-stone-200 grayscale">
                {piece.after_image_url ? (
                  <img src={piece.after_image_url} alt={piece.title} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-400 font-serif italic text-sm">No image</div>
                )}
                {/* SOLD stamp */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="font-sans font-black text-5xl text-orange-800/25 uppercase rotate-[-12deg] select-none">
                    SOLD
                  </span>
                </div>
              </div>
              <p className="font-sans font-bold text-[10px] text-stone-400 tracking-[0.15em] uppercase mt-3">
                DROP #{String(i).padStart(3, "0")} — SOLD OUT
              </p>
              <h3 className="font-sans font-bold text-sm text-stone-600 tracking-tight">
                {piece.title}
              </h3>
              {piece.price && (
                <p className="font-serif italic text-stone-400 text-xs">
                  Sold for ${Number(piece.price)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DropsArchive;
