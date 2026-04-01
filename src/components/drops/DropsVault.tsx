import { Link } from "react-router-dom";
import { useArtPieces } from "@/hooks/useSupabaseData";

const DropsVault = () => {
  const { data: pieces, isLoading } = useArtPieces({ category: "vault" });

  const active = pieces?.filter((p) => p.status !== "archived") || [];
  if (isLoading || active.length === 0) return null;

  return (
    <section className="bg-stone-950 py-20 md:py-28">
      <div className="container max-w-5xl">
        <div className="mb-12">
          <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tighter text-[#F9F6F0] leading-[0.9] mb-2">
            THE VAULT
          </h2>
          <p className="font-serif italic text-stone-500 text-sm">
            Rare acquisitions. Archive grade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {active.map((piece) => (
            <Link key={piece.id} to={`/drops/${piece.slug}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-900 mb-4">
                {piece.after_image_url ? (
                  <img src={piece.after_image_url} alt={piece.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-600 font-serif italic text-sm">No image</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent pointer-events-none" />

                {/* Archive Grade tag */}
                <span className="absolute top-3 left-3 px-3 py-1 text-[10px] font-sans font-bold tracking-[0.15em] border border-stone-400 text-stone-300 uppercase">
                  Archive Grade
                </span>

                {piece.status !== "archived" && (
                  <span className="absolute top-3 right-3 px-3 py-1 text-[10px] font-sans font-bold tracking-wider bg-orange-800 text-stone-50">
                    {piece.status === "available" ? "AVAILABLE" : piece.status.toUpperCase()}
                  </span>
                )}
              </div>
              <h3 className="font-sans font-black text-lg tracking-tight text-[#F9F6F0] leading-tight mb-1 group-hover:text-orange-800 transition-colors">
                {piece.title}
              </h3>
              {piece.price && (
                <p className="font-sans font-black text-sm text-orange-800">${Number(piece.price)}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DropsVault;
