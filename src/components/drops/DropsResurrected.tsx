import { Link } from "react-router-dom";
import { useArtPieces } from "@/hooks/useSupabaseData";
import { Play } from "lucide-react";

const statusBadge = (status: string) => {
  switch (status) {
    case "available": return { text: "AVAILABLE", cls: "bg-orange-800 text-stone-50" };
    case "raffle": return { text: "RAFFLE", cls: "bg-stone-950 text-stone-50" };
    case "giveaway": return { text: "GIVEAWAY", cls: "bg-stone-950 text-stone-50" };
    case "auction": return { text: "AUCTION", cls: "bg-stone-950 text-stone-50" };
    case "archived": return { text: "SOLD", cls: "bg-stone-400 text-stone-50 line-through" };
    default: return { text: status.toUpperCase(), cls: "bg-stone-400 text-stone-50" };
  }
};

const DropsResurrected = () => {
  const { data: pieces, isLoading } = useArtPieces({ category: "resurrected" });

  const active = pieces?.filter((p) => p.status !== "archived") || [];
  if (isLoading || active.length === 0) return null;

  return (
    <section className="bg-[#F9F6F0] py-16 md:py-24">
      <div className="container max-w-5xl">
        <div className="mb-10">
          <h2 className="font-sans font-black text-3xl md:text-5xl tracking-tighter text-stone-950 leading-[0.9] mb-2">
            RESURRECTED
          </h2>
          <p className="font-serif italic text-stone-500 text-sm">
            Transformed. Documented. One of one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {active.map((piece) => {
            const badge = statusBadge(piece.status);
            const isSold = piece.status === "archived";
            const episode = piece.episodes as any;

            return (
              <Link key={piece.id} to={`/drops/${piece.slug}`} className="group block">
                {/* Image with hover before/after */}
                <div className={`relative aspect-square overflow-hidden bg-stone-200 mb-4 ${isSold ? "grayscale" : ""}`}>
                  {piece.before_image_url && (
                    <img src={piece.before_image_url} alt={`${piece.title} before`} className="absolute inset-0 w-full h-full object-cover" />
                  )}
                  {piece.after_image_url && (
                    <img
                      src={piece.after_image_url}
                      alt={piece.title}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:opacity-0 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-stone-950/5 pointer-events-none mix-blend-multiply" />

                  {/* Dark hover overlay */}
                  <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/20 transition-colors pointer-events-none" />

                  {/* Status badge */}
                  <span className={`absolute top-3 right-3 px-3 py-1 text-[10px] font-sans font-bold tracking-wider ${badge.cls}`}>
                    {badge.text}
                  </span>

                  {/* 1 of 1 tag */}
                  <span className="absolute top-3 left-3 px-2 py-1 text-[10px] font-sans font-bold tracking-wider bg-stone-950/70 text-stone-50">
                    1 OF 1
                  </span>

                  {/* Video icon if episode linked */}
                  {episode?.youtube_id && (
                    <div className="absolute bottom-3 right-3 w-8 h-8 bg-stone-950/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-4 h-4 text-stone-50 fill-stone-50" />
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-sans font-black text-lg tracking-tight text-stone-950 leading-tight mb-1">
                  {piece.title}
                </h3>

                {/* Story snippet */}
                {piece.description && (
                  <p className="font-serif italic text-stone-500 text-sm leading-relaxed mb-3 line-clamp-2">
                    {piece.description}
                  </p>
                )}

                {/* Value stack */}
                <div className="mb-4 flex items-center gap-3">
                  {piece.price && (
                    <span className="font-sans font-black text-sm text-orange-800">${Number(piece.price)}</span>
                  )}
                  <span className="font-sans font-bold text-[10px] text-stone-400 tracking-wider uppercase">
                    Episode Piece
                  </span>
                </div>

                {/* CTA */}
                <div className="flex gap-2" onClick={(e) => e.preventDefault()}>
                  {episode?.youtube_id && (
                    <button className="flex-1 border-2 border-stone-950 text-stone-950 font-sans font-bold text-[10px] uppercase tracking-[0.15em] py-2.5 rounded-none hover:bg-stone-950 hover:text-stone-50 transition-colors">
                      WATCH TRANSFORMATION
                    </button>
                  )}
                  <button className="flex-1 bg-orange-800 text-stone-50 font-sans font-bold text-[10px] uppercase tracking-[0.15em] py-2.5 rounded-none hover:bg-orange-900 transition-colors">
                    VIEW PIECE
                  </button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DropsResurrected;
