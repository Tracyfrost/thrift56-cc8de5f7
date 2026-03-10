import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DropCountdown from "@/components/DropCountdown";
import { getFeaturedPiece, statusConfig } from "@/data/artPieces";

const FeaturedDropSection = () => {
  const piece = getFeaturedPiece();
  if (!piece) return null;

  const config = statusConfig[piece.status];

  return (
    <section className="py-20 md:py-28 texture-paper">
      <div className="container">
        <div className="text-center mb-12">
          <p className="font-distressed text-rust text-sm tracking-widest mb-2">CURRENT DROP</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">Featured Piece</h2>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image side */}
          <div className="relative">
            <img
              src={piece.afterImage}
              alt={piece.title}
              className="w-full rounded-sm shadow-xl border border-border"
            />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-sm overflow-hidden border-2 border-background shadow-lg">
              <img src={piece.beforeImage} alt="Before" className="w-full h-full object-cover" />
              <span className="absolute bottom-0 left-0 right-0 bg-primary/80 text-primary-foreground text-[10px] font-heading text-center py-0.5 uppercase">Before</span>
            </div>
          </div>

          {/* Copy side */}
          <div>
            <span className={`inline-block px-4 py-1.5 text-xs font-heading uppercase tracking-widest rounded-sm mb-4 ${config.badgeClass}`}>
              {config.label}
            </span>
            <h3 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              {piece.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6 font-body">
              {piece.description}
            </p>

            {piece.dropDate && new Date(piece.dropDate).getTime() > Date.now() && (
              <div className="mb-6">
                <DropCountdown targetDate={piece.dropDate} />
              </div>
            )}

            <Link to={`/drops/${piece.slug}`}>
              <Button variant="rust" size="lg" className="px-8 py-6">
                {config.cta}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDropSection;
