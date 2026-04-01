import { useArtPieces } from "@/hooks/useSupabaseData";

const DropsArchive = () => {
  const { data: pieces } = useArtPieces({ status: "archived" });
  const archived = pieces || [];
  if (archived.length === 0) return null;

  const visible = archived.slice(0, 8);

  return (
    <section className="py-20 bg-[#F9F6F0] border-t border-stone-300">
      <div className="container max-w-5xl">
        <h2 className="font-sans font-black text-3xl md:text-4xl tracking-tighter text-stone-950 mb-2">
          ARCHIVE
        </h2>
        <p className="font-serif italic text-stone-500 text-sm mb-10">
          Every piece ever made. History preserved.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {visible.map((piece, i) => (
            <div key={piece.id} className="relative">
              {/* Desaturated image */}
              <div className="relative aspect-square overflow-hidden bg-stone-200 grayscale">
                {piece.after_image_url ? (
                  <img src={piece.after_image_url} alt={piece.title} className="w-full h-full object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-400 font-serif italic text-sm">No image</div>
                )}
                {/* SOLD stamp — larger, more visible */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-stone-950/10">
                  <span className="font-sans font-black text-5xl md:text-6xl text-orange-800/40 uppercase rotate-[-12deg] select-none tracking-wider">
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

        {archived.length > 8 && (
          <div className="mt-10 text-center">
            <button className="font-sans font-bold text-xs tracking-[0.15em] uppercase text-stone-500 border border-stone-300 px-8 py-3 hover:bg-stone-950 hover:text-stone-50 hover:border-stone-950 transition-all duration-300">
              VIEW ALL ARCHIVE
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default DropsArchive;
