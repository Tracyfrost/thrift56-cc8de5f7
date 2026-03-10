import { useParams, Link } from "react-router-dom";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import EntryForm from "@/components/EntryForm";
import DropCountdown from "@/components/DropCountdown";
import ArtPieceCard, { statusConfig } from "@/components/ArtPieceCard";
import ShareButtons from "@/components/ShareButtons";
import { useArtPiece, useArtPieces } from "@/hooks/useSupabaseData";
import { ArrowLeft } from "lucide-react";

const ArtPieceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: piece, isLoading } = useArtPiece(slug || "");
  const { data: allPieces } = useArtPieces();

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <SiteNav />
        <div className="container py-24 text-center">
          <div className="w-10 h-10 border-2 border-rust border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (!piece) {
    return (
      <div className="min-h-screen">
        <SiteNav />
        <div className="container py-24 text-center">
          <h1 className="font-heading text-3xl font-bold mb-4">Piece Not Found</h1>
          <Link to="/drops"><Button variant="hero">Back to Drops</Button></Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const config = statusConfig[piece.status] || statusConfig.available;
  const related = allPieces?.filter((p) => p.id !== piece.id && p.status !== "archived").slice(0, 3) || [];
  const episodeYoutubeId = (piece as any).episodes?.youtube_id;
  const episodeTitle = (piece as any).episodes?.title;

  return (
    <div className="min-h-screen">
      <SiteNav />

      <div className="container py-8 md:py-12">
        <Link to="/drops" className="inline-flex items-center gap-2 text-muted-foreground hover:text-rust transition-colors font-heading text-sm uppercase tracking-wider mb-8">
          <ArrowLeft size={16} /> Back to Drops
        </Link>

        {/* Hero grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <div className="space-y-5">
            <div className="relative">
              {piece.after_image_url ? (
                <img src={piece.after_image_url} alt={piece.title} className="w-full rounded-sm border-2 border-border shadow-2xl" />
              ) : (
                <div className="w-full aspect-square bg-muted rounded-sm flex items-center justify-center text-muted-foreground font-heading">No Image</div>
              )}
              <span className={`absolute top-4 right-4 px-5 py-2 text-xs font-heading uppercase tracking-[0.2em] rounded-sm shadow-lg ${config.badgeClass}`}>
                {config.label}
              </span>
            </div>
            {(piece.before_image_url || piece.after_image_url) && (
              <div className="grid grid-cols-2 gap-4">
                {piece.before_image_url && (
                  <div>
                    <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">Before</p>
                    <img src={piece.before_image_url} alt="Before" className="w-full aspect-square object-cover rounded-sm border-2 border-border shadow-md" />
                  </div>
                )}
                {piece.after_image_url && (
                  <div>
                    <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">After</p>
                    <img src={piece.after_image_url} alt="After" className="w-full aspect-square object-cover rounded-sm border-2 border-rust/30 shadow-md" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Info & Action */}
          <div>
            <p className="font-distressed text-rust text-sm tracking-[0.3em] mb-3">ART DROP</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-5">{piece.title}</h1>
            {piece.description && <p className="text-muted-foreground font-body leading-relaxed mb-8">{piece.description}</p>}

            {/* Materials */}
            {piece.materials && piece.materials.length > 0 && (
              <div className="mb-8">
                <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Materials Used</p>
                <div className="flex flex-wrap gap-2">
                  {piece.materials.map((m) => (
                    <span key={m} className="px-3 py-1.5 text-xs font-heading uppercase tracking-wider border border-border rounded-sm bg-card">{m}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Linked Episode */}
            {episodeTitle && (
              <div className="mb-8 p-4 bg-card border border-border rounded-sm">
                <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">From Episode</p>
                <p className="font-heading text-sm font-bold">{episodeTitle}</p>
              </div>
            )}

            {/* Countdown */}
            {piece.drop_date && new Date(piece.drop_date).getTime() > Date.now() && (
              <div className="mb-8">
                <DropCountdown targetDate={piece.drop_date} label="Drop Countdown" />
              </div>
            )}

            {/* Action area */}
            <div className="space-y-4">
              {piece.status === "available" && (
                <div className="border-2 border-border rounded-sm bg-card p-8">
                  <p className="font-heading text-4xl font-bold mb-4">${piece.price}</p>
                  <Button variant="rust" size="lg" className="w-full h-14 text-base">Buy Now</Button>
                </div>
              )}

              {piece.status === "raffle" && (
                <>
                  {piece.giveaway_end_date && <DropCountdown targetDate={piece.giveaway_end_date} label="Raffle Closes In" />}
                  <EntryForm pieceId={piece.id} pieceTitle={piece.title} mode="raffle" />
                </>
              )}

              {piece.status === "giveaway" && (
                <>
                  {piece.giveaway_end_date && <DropCountdown targetDate={piece.giveaway_end_date} label="Giveaway Ends In" />}
                  <EntryForm pieceId={piece.id} pieceTitle={piece.title} mode="giveaway" />
                </>
              )}

              {piece.status === "auction" && (
                <div className="border-2 border-border rounded-sm bg-card p-8 text-center">
                  {piece.auction_end_date && <div className="mb-5"><DropCountdown targetDate={piece.auction_end_date} label="Auction Ends In" /></div>}
                  <p className="font-heading text-sm uppercase tracking-widest text-muted-foreground mb-2">Current Bid</p>
                  <p className="font-heading text-4xl font-bold mb-5">${piece.price}</p>
                  <Button variant="rust" size="lg" className="w-full h-14 text-base">Bid Now</Button>
                </div>
              )}

              {piece.status === "archived" && (
                <div className="border-2 border-border rounded-sm bg-card p-8 text-center">
                  <p className="font-heading text-xl font-bold mb-2">This piece has found its home.</p>
                  <p className="text-muted-foreground text-sm font-body">
                    {piece.price ? `Sold for $${piece.price}` : "Given away to a lucky winner."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Transformation story (episode embed) */}
        {episodeYoutubeId && (
          <section className="mb-20">
            <p className="font-distressed text-rust text-sm tracking-[0.3em] mb-3">THE TRANSFORMATION</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">Watch It Come to Life</h2>
            <div className="aspect-video rounded-sm overflow-hidden border-2 border-border shadow-2xl max-w-4xl">
              <iframe
                src={`https://www.youtube.com/embed/${episodeYoutubeId}`}
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
        <section className="mb-20 max-w-md mx-auto">
          <ShareButtons title={piece.title} />
        </section>

        {/* Related drops */}
        {related.length > 0 && (
          <section className="mb-16">
            <p className="font-distressed text-rust text-sm tracking-[0.3em] mb-3">MORE DROPS</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-8">You Might Also Like</h2>
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
