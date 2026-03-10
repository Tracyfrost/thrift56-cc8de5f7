import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DropCountdown from "@/components/DropCountdown";
import { statusConfig } from "@/components/ArtPieceCard";
import { useFeaturedArtPiece } from "@/hooks/useSupabaseData";

const FeaturedDropSection = () => {
  const { data: piece } = useFeaturedArtPiece();
  if (!piece) return null;

  const config = statusConfig[piece.status] || statusConfig.available;

  return (
    <section className="py-24 md:py-32 texture-paper">
      <div className="container">
        <div className="text-center mb-14">
          <p className="font-distressed text-rust text-sm tracking-[0.3em] mb-3">CURRENT DROP</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold">Featured Piece</h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            {piece.after_image_url ? (
              <img src={piece.after_image_url} alt={piece.title} className="w-full rounded-sm shadow-2xl border border-border" />
            ) : (
              <div className="w-full aspect-square bg-muted rounded-sm" />
            )}
            {piece.before_image_url && (
              <div className="absolute -bottom-5 -left-5 w-28 h-28 rounded-sm overflow-hidden border-3 border-background shadow-xl">
                <img src={piece.before_image_url} alt="Before" className="w-full h-full object-cover" />
                <span className="absolute bottom-0 left-0 right-0 bg-primary/90 text-primary-foreground text-[9px] font-heading text-center py-1 uppercase tracking-wider">Before</span>
              </div>
            )}
          </div>

          <div>
            <span className={`inline-block px-5 py-2 text-xs font-heading uppercase tracking-[0.2em] rounded-sm mb-5 ${config.badgeClass}`}>
              {config.label}
            </span>
            <h3 className="font-heading text-3xl md:text-4xl font-bold mb-5">{piece.title}</h3>
            {piece.description && (
              <p className="text-muted-foreground leading-relaxed mb-8 font-body">{piece.description}</p>
            )}

            {piece.price && piece.status === "available" && (
              <p className="font-heading text-3xl font-bold mb-6">${piece.price}</p>
            )}

            {piece.drop_date && new Date(piece.drop_date).getTime() > Date.now() && (
              <div className="mb-8">
                <DropCountdown targetDate={piece.drop_date} />
              </div>
            )}

            <Link to={`/drops/${piece.slug}`}>
              <Button variant="rust" size="lg" className="px-10 py-7 text-base">{config.cta}</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDropSection;
