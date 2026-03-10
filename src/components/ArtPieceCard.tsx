import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { type ArtPiece, statusConfig } from "@/data/artPieces";

interface ArtPieceCardProps {
  piece: ArtPiece;
}

const ArtPieceCard = ({ piece }: ArtPieceCardProps) => {
  const config = statusConfig[piece.status];

  return (
    <Link to={`/drops/${piece.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-sm border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
        {/* After image */}
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={piece.afterImage}
            alt={piece.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Before thumbnail */}
        <div className="absolute top-3 left-3 w-14 h-14 rounded-sm overflow-hidden border-2 border-background shadow-lg">
          <img src={piece.beforeImage} alt="Before" className="w-full h-full object-cover" />
          <span className="absolute bottom-0 left-0 right-0 bg-primary/80 text-primary-foreground text-[8px] font-heading text-center py-0.5 uppercase">
            Before
          </span>
        </div>

        {/* Status badge */}
        <span className={`absolute top-3 right-3 px-3 py-1 text-[10px] font-heading uppercase tracking-widest rounded-sm ${config.badgeClass}`}>
          {config.label}
        </span>

        {/* Info */}
        <div className="p-4">
          <h3 className="font-heading text-lg font-bold mb-1 group-hover:text-rust transition-colors">
            {piece.title}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 mb-3 font-body">
            {piece.description}
          </p>
          <Button variant="rust" size="sm" className="w-full" tabIndex={-1}>
            {config.cta}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ArtPieceCard;
