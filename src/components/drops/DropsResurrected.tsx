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

const DropsResurrected = ({ statusFilter = "all" }: { statusFilter?: string }) => {
  const { data: pieces, isLoading } = useArtPieces({ category: "resurrected" });

  const filtered = pieces?.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (statusFilter === "all" && p.status === "archived") return false;
    return true;
  }) || [];
  if (isLoading || filtered.length === 0) return null;

  return (
    <section className="bg-[#F9F6F0] py-20 md:py-28">
      <div className="container max-w-5xl">
        <div className="mb-12">
          <h2 className="font-sans font-black text-4xl md:text-6xl tracking-tighter text-stone-950 leading-[0.85] mb-2">
            RESURRECTED
          </h2>
          <p className="font-serif italic text-stone-500 text-sm">
            Transformed. Documented. One of one.
          </p>
        </div>

        {/* 2-col grid for dominance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {active.map((piece) => {
            const badge = statusBadge(piece.status);
            const isSold = piece.status === "archived";
            const episode = piece.episodes as any;

            return (
              <Link key={piece.id} to={`/drops/${piece.slug}`} className="group block">
                {/* Before/After hover-swap image */}
                <div className={`relative aspect-[4/5] overflow-hidden bg-stone-200 mb-5 ${isSold ? "grayscale" : ""}`}>
                  {/* Before image — revealed on hover */}
                  {piece.before_image_url && (
                    <img
                      src={piece.before_image_url}
                      alt={`${piece.title} before`}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                  {/* After image — default, fades out on hover */}
                  {piece.after_image_url && (
                    <img
                      src={piece.after_image_url}
                      alt={piece.title}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}

                  {/* Dark bottom gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent pointer-events-none" />

                  {/* Dark hover overlay */}
                  <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/10 transition-all duration-300 pointer-events-none" />

                  {/* Status badge */}
                  <span className={`absolute top-4 right-4 px-4 py-1.5 text-[11px] font-sans font-bold tracking-wider ${badge.cls}`}>
                    {badge.text}
                  </span>

                  {/* 1 of 1 tag — prominent with rust border */}
                  <span className="absolute top-4 left-4 px-3 py-1.5 text-[11px] font-sans font-bold tracking-[0.15em] border-2 border-orange-800 bg-stone-950/70 text-stone-50 uppercase">
                    1 OF 1
                  </span>

                  {/* Video icon overlay */}
                  {episode?.youtube_id && (
                    <div className="absolute bottom-4 right-4 w-10 h-10 bg-stone-950/80 border border-stone-50/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Play className="w-5 h-5 text-stone-50 fill-stone-50" />
                    </div>
                  )}

                  {/* Before/After label on hover */}
                  <span className="absolute bottom-4 left-4 font-sans font-bold text-[10px] tracking-[0.2em] text-stone-50/80 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ← BEFORE
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-sans font-black text-xl tracking-tight text-stone-950 leading-tight mb-1 group-hover:text-orange-800 transition-colors duration-300">
                  {piece.title}
                </h3>

                {/* Micro-story */}
                {piece.description && (
                  <p className="font-serif italic text-stone-500 text-sm leading-relaxed mb-3 line-clamp-1">
                    {piece.description}
                  </p>
                )}

                {/* Value stack */}
                <div className="mb-5 flex items-center gap-3">
                  {piece.price && (
                    <span className="font-sans font-black text-base text-orange-800">${Number(piece.price)}</span>
                  )}
                  <span className="font-sans font-bold text-[10px] text-stone-400 tracking-wider uppercase">
                    Episode Piece
                  </span>
                </div>

                {/* CTA buttons */}
                <div className="flex gap-3" onClick={(e) => e.preventDefault()}>
                  {episode?.youtube_id && (
                    <button className="flex-1 flex items-center justify-center gap-2 border-2 border-stone-950 text-stone-950 font-sans font-bold text-[11px] uppercase tracking-[0.12em] py-3 rounded-none hover:bg-stone-950 hover:text-stone-50 transition-all duration-300">
                      <Play className="w-3.5 h-3.5" />
                      WATCH
                    </button>
                  )}
                  <button className="flex-1 bg-orange-800 text-stone-50 font-sans font-bold text-[11px] uppercase tracking-[0.12em] py-3 rounded-none hover:bg-orange-900 transition-all duration-300">
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
