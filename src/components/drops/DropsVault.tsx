import { Link } from "react-router-dom";
import { useArtPieces } from "@/hooks/useSupabaseData";

const DropsVault = () => {
  const { data: pieces, isLoading } = useArtPieces({ category: "vault" });

  const active = pieces?.filter((p) => p.status !== "archived") || [];
  if (isLoading || active.length === 0) return null;

  return (
    <section className="relative bg-stone-950 py-24 md:py-32 overflow-hidden">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-stone-950/95 to-stone-900 pointer-events-none" />

      <div className="container max-w-5xl relative z-10">
        <div className="mb-14">
          <h2 className="font-sans font-black text-3xl md:text-5xl tracking-[0.05em] text-[#F9F6F0] leading-[0.9] mb-2">
            THE VAULT
          </h2>
          <p className="font-serif italic text-stone-500 text-sm">
            Rare acquisitions. Archive grade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {active.map((piece) => (
            <Link key={piece.id} to={`/drops/${piece.slug}`} className="group block">
              <div className="relative aspect-[3/4] overflow-hidden bg-stone-900 mb-5 border-b-2 border-transparent group-hover:border-orange-800 transition-all duration-300">
                {piece.after_image_url ? (
                  <img src={piece.after_image_url} alt={piece.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" loading="lazy" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-600 font-serif italic text-sm">No image</div>
                )}
                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/10 to-transparent pointer-events-none" />

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
              <h3 className="font-sans font-black text-lg tracking-tight text-[#F9F6F0] leading-tight mb-1 group-hover:text-orange-800 transition-colors duration-300">
                {piece.title}
              </h3>
              {piece.description && (
                <p className="font-serif italic text-stone-500 text-xs leading-relaxed mb-2 line-clamp-1">
                  {piece.description}
                </p>
              )}
              {piece.price && (
                <p className="font-sans font-black text-lg text-orange-800">${Number(piece.price)}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DropsVault;
