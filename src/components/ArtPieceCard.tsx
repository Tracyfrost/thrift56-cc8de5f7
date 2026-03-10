import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const statusConfig: Record<string, { label: string; cta: string; badgeClass: string }> = {
  available: { label: "Available", cta: "Buy Now", badgeClass: "bg-secondary text-secondary-foreground" },
  raffle: { label: "Raffle Open", cta: "Join Raffle", badgeClass: "bg-rust text-primary-foreground" },
  giveaway: { label: "Giveaway", cta: "Enter Giveaway", badgeClass: "bg-primary text-primary-foreground" },
  auction: { label: "Auction Live", cta: "Bid Now", badgeClass: "bg-secondary text-secondary-foreground" },
  archived: { label: "Sold", cta: "View Story", badgeClass: "bg-muted text-muted-foreground" },
};

interface ArtPieceCardProps {
  piece: {
    slug: string;
    title: string;
    description: string | null;
    before_image_url: string | null;
    after_image_url: string | null;
    status: string;
  };
}

const ArtPieceCard = ({ piece }: ArtPieceCardProps) => {
  const config = statusConfig[piece.status] || statusConfig.available;

  return (
    <Link to={`/drops/${piece.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-sm border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
        <div className="aspect-[4/5] overflow-hidden">
          {piece.after_image_url ? (
            <img src={piece.after_image_url} alt={piece.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground font-heading text-sm">No Image</div>
          )}
        </div>

        {piece.before_image_url && (
          <div className="absolute top-3 left-3 w-14 h-14 rounded-sm overflow-hidden border-2 border-background shadow-lg">
            <img src={piece.before_image_url} alt="Before" className="w-full h-full object-cover" />
            <span className="absolute bottom-0 left-0 right-0 bg-primary/80 text-primary-foreground text-[8px] font-heading text-center py-0.5 uppercase">Before</span>
          </div>
        )}

        <span className={`absolute top-3 right-3 px-3 py-1 text-[10px] font-heading uppercase tracking-widest rounded-sm ${config.badgeClass}`}>
          {config.label}
        </span>

        <div className="p-4">
          <h3 className="font-heading text-lg font-bold mb-1 group-hover:text-rust transition-colors">{piece.title}</h3>
          {piece.description && (
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3 font-body">{piece.description}</p>
          )}
          <Button variant="rust" size="sm" className="w-full" tabIndex={-1}>{config.cta}</Button>
        </div>
      </div>
    </Link>
  );
};

export default ArtPieceCard;
