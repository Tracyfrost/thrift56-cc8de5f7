import { artPieces, type ArtPiece } from "@/data/artPieces";
import { Link } from "react-router-dom";

interface DropsGridProps {
  filter: string;
}

const statusBadge = (status: string) => {
  switch (status) {
    case "available":
      return { text: "AVAILABLE", cls: "bg-orange-800 text-stone-50" };
    case "raffle":
      return { text: "RAFFLE", cls: "bg-stone-950 text-stone-50" };
    case "giveaway":
      return { text: "GIVEAWAY", cls: "bg-stone-950 text-stone-50" };
    case "auction":
      return { text: "AUCTION", cls: "bg-stone-950 text-stone-50" };
    case "archived":
      return { text: "SOLD", cls: "bg-stone-400 text-stone-50 line-through" };
    default:
      return { text: status.toUpperCase(), cls: "bg-stone-400 text-stone-50" };
  }
};

const ctaButton = (piece: ArtPiece) => {
  if (piece.status === "available") {
    return (
      <button className="w-full bg-orange-800 text-stone-50 font-sans font-bold text-xs uppercase tracking-[0.15em] py-3 rounded-none hover:bg-orange-900 transition-colors">
        BUY NOW
      </button>
    );
  }
  if (piece.status === "raffle" || piece.status === "giveaway") {
    return (
      <button className="w-full border-2 border-stone-950 text-stone-950 font-sans font-bold text-xs uppercase tracking-[0.15em] py-3 rounded-none hover:bg-stone-950 hover:text-stone-50 transition-colors">
        {piece.status === "raffle" ? "JOIN RAFFLE" : "ENTER GIVEAWAY"}
      </button>
    );
  }
  if (piece.status === "auction") {
    return (
      <button className="w-full border-2 border-orange-800 text-orange-800 font-sans font-bold text-xs uppercase tracking-[0.15em] py-3 rounded-none hover:bg-orange-800 hover:text-stone-50 transition-colors">
        BID NOW
      </button>
    );
  }
  return (
    <button disabled className="w-full bg-stone-300 text-stone-500 font-sans font-bold text-xs uppercase tracking-[0.15em] py-3 rounded-none cursor-not-allowed">
      SOLD OUT
    </button>
  );
};

const DropsGrid = ({ filter }: DropsGridProps) => {
  const filtered = filter === "all"
    ? artPieces.filter((p) => p.status !== "archived")
    : artPieces.filter((p) => p.status === filter);

  if (filtered.length === 0) {
    return (
      <div className="container pb-16">
        <p className="text-center text-stone-500 font-serif italic py-16">
          No drops in this category right now.
        </p>
      </div>
    );
  }

  return (
    <div className="container pb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {filtered.map((piece) => {
          const badge = statusBadge(piece.status);
          return (
            <Link
              key={piece.id}
              to={`/drops/${piece.slug}`}
              className="group block"
            >
              {/* Image with hover before/after */}
              <div className="relative aspect-square overflow-hidden bg-stone-200 mb-4">
                {/* Before image (revealed on hover) */}
                <img
                  src={piece.beforeImage}
                  alt={`${piece.title} before`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* After image (default, fades out on hover) */}
                <img
                  src={piece.afterImage}
                  alt={piece.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:opacity-0 group-hover:scale-105"
                />
                {/* Texture overlay */}
                <div className="absolute inset-0 bg-stone-950/5 pointer-events-none mix-blend-multiply" />

                {/* Status badge */}
                <span className={`absolute top-3 right-3 px-3 py-1 text-[10px] font-sans font-bold tracking-wider ${badge.cls}`}>
                  {badge.text}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-sans font-black text-lg tracking-tight text-stone-950 leading-tight mb-1">
                {piece.title}
              </h3>

              {/* Story line */}
              <p className="font-serif italic text-stone-500 text-sm leading-relaxed mb-3 line-clamp-2">
                {piece.description}
              </p>

              {/* Value stack */}
              <div className="mb-4 space-y-0.5">
                {piece.price && (
                  <p className="font-sans font-bold text-xs text-stone-600 tracking-wider uppercase">
                    Original: $3
                  </p>
                )}
                <p className="font-sans font-black text-sm text-stone-950 tracking-wider uppercase">
                  Final Piece: 1 of 1
                </p>
              </div>

              {/* CTA */}
              <div onClick={(e) => e.preventDefault()}>
                {ctaButton(piece)}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DropsGrid;
