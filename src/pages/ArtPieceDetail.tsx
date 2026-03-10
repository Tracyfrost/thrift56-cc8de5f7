import { useParams, Link } from "react-router-dom";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import EntryForm from "@/components/EntryForm";
import DropCountdown from "@/components/DropCountdown";
import ArtPieceCard from "@/components/ArtPieceCard";
import { getArtPieceBySlug, artPieces, statusConfig } from "@/data/artPieces";
import ShareButtons from "@/components/ShareButtons";
import { ArrowLeft } from "lucide-react";

const ArtPieceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const piece = getArtPieceBySlug(slug || "");

  if (!piece) {
    return (
      <div className="min-h-screen">
        <SiteNav />
        <div className="container py-20 text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">Piece Not Found</h1>
          <Link to="/drops">
            <Button variant="hero">Back to Drops</Button>
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const config = statusConfig[piece.status];
  const related = artPieces.filter((p) => p.id !== piece.id && p.status !== "archived").slice(0, 3);

  return (
    <div className="min-h-screen">
      <SiteNav />

      <div className="container py-8">
        <Link to="/drops" className="inline-flex items-center gap-2 text-muted-foreground hover:text-rust transition-colors font-heading text-sm uppercase tracking-wider mb-6">
          <ArrowLeft size={16} /> Back to Drops
        </Link>

        {/* Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative">
              <img src={piece.afterImage} alt={piece.title} className="w-full rounded-sm border border-border shadow-lg" />
              <span className={`absolute top-4 right-4 px-4 py-1.5 text-xs font-heading uppercase tracking-widest rounded-sm ${config.badgeClass}`}>
                {config.label}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1">Before</p>
                <img src={piece.beforeImage} alt="Before" className="w-full aspect-square object-cover rounded-sm border border-border" />
              </div>
              <div>
                <p className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1">After</p>
                <img src={piece.afterImage} alt="After" className="w-full aspect-square object-cover rounded-sm border border-border" />
              </div>
            </div>
          </div>

          {/* Info & Action */}
          <div>
            <p className="font-distressed text-rust text-sm tracking-widest mb-2">ART DROP</p>
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">{piece.title}</h1>
            <p className="text-muted-foreground font-body leading-relaxed mb-6">{piece.description}</p>

            {piece.materials && piece.materials.length > 0 && (
              <div className="mb-6">
                <p className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-2">Materials</p>
                <div className="flex flex-wrap gap-2">
                  {piece.materials.map((m) => (
                    <span key={m} className="px-3 py-1 text-xs font-heading uppercase tracking-wider border border-border rounded-sm bg-card">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Countdown for upcoming drops */}
            {piece.dropDate && new Date(piece.dropDate).getTime() > Date.now() && (
              <div className="mb-6">
                <DropCountdown targetDate={piece.dropDate} label="Drop Countdown" />
              </div>
            )}

            {/* Action area */}
            <div className="space-y-4">
              {piece.status === "available" && (
                <div className="border border-border rounded-sm bg-card p-6">
                  <p className="font-heading text-3xl font-bold mb-2">${piece.price}</p>
                  <Button variant="rust" size="lg" className="w-full h-12">
                    Buy Now
                  </Button>
                </div>
              )}

              {piece.status === "raffle" && (
                <>
                  {piece.giveawayEndDate && (
                    <DropCountdown targetDate={piece.giveawayEndDate} label="Raffle Closes In" />
                  )}
                  <EntryForm pieceId={piece.id} pieceTitle={piece.title} mode="raffle" />
                </>
              )}

              {piece.status === "giveaway" && (
                <>
                  {piece.giveawayEndDate && (
                    <DropCountdown targetDate={piece.giveawayEndDate} label="Giveaway Ends In" />
                  )}
                  <EntryForm pieceTitle={piece.title} mode="giveaway" />
                </>
              )}

              {piece.status === "auction" && (
                <div className="border border-border rounded-sm bg-card p-6 text-center">
                  {piece.auctionEndDate && (
                    <div className="mb-4">
                      <DropCountdown targetDate={piece.auctionEndDate} label="Auction Ends In" />
                    </div>
                  )}
                  <p className="font-heading text-sm uppercase tracking-widest text-muted-foreground mb-1">Current Bid</p>
                  <p className="font-heading text-3xl font-bold mb-4">${piece.price}</p>
                  <Button variant="rust" size="lg" className="w-full h-12">
                    Bid Now
                  </Button>
                </div>
              )}

              {piece.status === "archived" && (
                <div className="border border-border rounded-sm bg-card p-6 text-center">
                  <p className="font-heading text-lg font-bold mb-1">This piece has found its home.</p>
                  <p className="text-muted-foreground text-sm font-body">
                    {piece.price ? `Sold for $${piece.price}` : "Given away to a lucky winner."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Episode embed */}
        {piece.episodeYoutubeId && (
          <section className="mb-16">
            <p className="font-distressed text-rust text-sm tracking-widest mb-2">THE TRANSFORMATION</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Watch It Come to Life</h2>
            <div className="aspect-video rounded-sm overflow-hidden border border-border shadow-lg max-w-4xl">
              <iframe
                src={`https://www.youtube.com/embed/${piece.episodeYoutubeId}`}
                title="Transformation episode"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </section>
        )}

        {/* Share */}
        <section className="mb-16 max-w-md mx-auto">
          <ShareButtons title={piece.title} />
        </section>

        {/* Related drops */}
        {related.length > 0 && (
          <section className="mb-16">
            <p className="font-distressed text-rust text-sm tracking-widest mb-2">MORE DROPS</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
              {related.map((p) => (
                <ArtPieceCard key={p.id} piece={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <SiteFooter />
    </div>
  );
};

export default ArtPieceDetail;
