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
        <div className="container py-20 text-center">
          <p className="text-muted-foreground font-body">Loading...</p>
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (!piece) {
    return (
      <div className="min-h-screen">
        <SiteNav />
        <div className="container py-20 text-center">
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

  return (
    <div className="min-h-screen">
      <SiteNav />

      <div className="container py-8">
        <Link to="/drops" className="inline-flex items-center gap-2 text-muted-foreground hover:text-rust transition-colors font-heading text-sm uppercase tracking-wider mb-6">
          <ArrowLeft size={16} /> Back to Drops
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <div className="space-y-4">
            <div className="relative">
              {piece.after_image_url ? (
                <img src={piece.after_image_url} alt={piece.title} className="w-full rounded-sm border border-border shadow-lg" />
              ) : (
                <div className="w-full aspect-square bg-muted rounded-sm flex items-center justify-center text-muted-foreground">No Image</div>
              )}
              <span className={`absolute top-4 right-4 px-4 py-1.5 text-xs font-heading uppercase tracking-widest rounded-sm ${config.badgeClass}`}>
                {config.label}
              </span>
            </div>
            {(piece.before_image_url || piece.after_image_url) && (
              <div className="grid grid-cols-2 gap-4">
                {piece.before_image_url && (
                  <div>
                    <p className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1">Before</p>
                    <img src={piece.before_image_url} alt="Before" className="w-full aspect-square object-cover rounded-sm border border-border" />
                  </div>
                )}
                {piece.after_image_url && (
                  <div>
                    <p className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-1">After</p>
                    <img src={piece.after_image_url} alt="After" className="w-full aspect-square object-cover rounded-sm border border-border" />
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <p className="font-distressed text-rust text-sm tracking-widest mb-2">ART DROP</p>
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4">{piece.title}</h1>
            {piece.description && <p className="text-muted-foreground font-body leading-relaxed mb-6">{piece.description}</p>}

            {piece.materials && piece.materials.length > 0 && (
              <div className="mb-6">
                <p className="font-heading text-xs uppercase tracking-widest text-muted-foreground mb-2">Materials</p>
                <div className="flex flex-wrap gap-2">
                  {piece.materials.map((m) => (
                    <span key={m} className="px-3 py-1 text-xs font-heading uppercase tracking-wider border border-border rounded-sm bg-card">{m}</span>
                  ))}
                </div>
              </div>
            )}

            {piece.drop_date && new Date(piece.drop_date).getTime() > Date.now() && (
              <div className="mb-6">
                <DropCountdown targetDate={piece.drop_date} label="Drop Countdown" />
              </div>
            )}

            <div className="space-y-4">
              {piece.status === "available" && (
                <div className="border border-border rounded-sm bg-card p-6">
                  <p className="font-heading text-3xl font-bold mb-2">${piece.price}</p>
                  <Button variant="rust" size="lg" className="w-full h-12">Buy Now</Button>
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
                <div className="border border-border rounded-sm bg-card p-6 text-center">
                  {piece.auction_end_date && <div className="mb-4"><DropCountdown targetDate={piece.auction_end_date} label="Auction Ends In" /></div>}
                  <p className="font-heading text-sm uppercase tracking-widest text-muted-foreground mb-1">Current Bid</p>
                  <p className="font-heading text-3xl font-bold mb-4">${piece.price}</p>
                  <Button variant="rust" size="lg" className="w-full h-12">Bid Now</Button>
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

        {episodeYoutubeId && (
          <section className="mb-16">
            <p className="font-distressed text-rust text-sm tracking-widest mb-2">THE TRANSFORMATION</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Watch It Come to Life</h2>
            <div className="aspect-video rounded-sm overflow-hidden border border-border shadow-lg max-w-4xl">
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

        <section className="mb-16 max-w-md mx-auto">
          <ShareButtons title={piece.title} />
        </section>

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
