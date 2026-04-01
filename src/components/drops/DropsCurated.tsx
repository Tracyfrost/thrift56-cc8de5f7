import { Link } from "react-router-dom";
import { useArtPieces } from "@/hooks/useSupabaseData";

const DropsCurated = ({ statusFilter = "all" }: { statusFilter?: string }) => {
  const { data: pieces, isLoading } = useArtPieces({ category: "curated" });

  const active = pieces?.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (statusFilter === "all" && p.status === "archived") return false;
    return true;
  }) || [];
  if (isLoading || active.length === 0) return null;

  return (
    <section className="bg-[#F9F6F0] py-20 md:py-28 border-t border-stone-300">
      <div className="container max-w-5xl">
        <div className="mb-12">
          <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tighter text-stone-950 leading-[0.9] mb-2">
            CURATED FINDS
          </h2>
          <p className="font-serif italic text-stone-500 text-sm">
            Handpicked. Proven. Ready to go.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {active.map((piece) => {
            const isSold = piece.status === "archived";
            return (
              <Link key={piece.id} to={`/drops/${piece.slug}`} className="group block">
                <div className={`relative aspect-square overflow-hidden bg-stone-200 mb-3 transition-all duration-300 group-hover:shadow-lg group-hover:scale-[1.02] ${isSold ? "grayscale" : ""}`}>
                  {piece.after_image_url ? (
                    <img src={piece.after_image_url} alt={piece.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-400 font-serif italic text-sm">No image</div>
                  )}
                  <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/10 transition-all duration-300 pointer-events-none" />

                  {/* Field Pick tag — outlined style */}
                  <span className="absolute top-2 left-2 px-2.5 py-1 text-[9px] font-sans font-bold tracking-wider border border-stone-50/60 text-stone-50 uppercase">
                    Field Pick
                  </span>

                  {isSold && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 text-[9px] font-sans font-bold tracking-wider bg-stone-400 text-stone-50 line-through uppercase">
                      SOLD
                    </span>
                  )}
                </div>
                <h3 className="font-sans font-bold text-sm tracking-tight text-stone-950 leading-tight mb-0.5 group-hover:text-orange-800 transition-colors duration-300">
                  {piece.title}
                </h3>
                {piece.price && (
                  <p className="font-sans font-black text-sm text-orange-800">${Number(piece.price)}</p>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DropsCurated;
