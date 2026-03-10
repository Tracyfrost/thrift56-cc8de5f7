import { useParams, Link } from "react-router-dom";
import { getEpisodeBySlug, getRelatedEpisodes, categoryLabels, categoryColors, formatViews } from "@/data/episodes";
import EpisodeCard from "@/components/EpisodeCard";
import SubscribePrompt from "@/components/SubscribePrompt";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";

const EpisodeDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const episode = getEpisodeBySlug(slug || "");

  if (!episode) {
    return (
      <div className="min-h-screen">
        <SiteNav />
        <div className="container py-20 text-center">
          <h1 className="text-3xl font-heading font-bold mb-4">Episode Not Found</h1>
          <Link to="/episodes" className="text-rust hover:underline font-heading">← Back to Episodes</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const related = getRelatedEpisodes(episode.id, 3);

  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="py-8 md:py-12 texture-paper">
        <div className="container">
          <Link to="/episodes" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-rust font-heading uppercase tracking-wider mb-6">
            <ArrowLeft size={14} /> Back to Episodes
          </Link>

          {/* Video embed */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="relative aspect-video rounded-sm overflow-hidden shadow-xl border border-border">
              <iframe
                src={`https://www.youtube.com/embed/${episode.youtubeId}?rel=0`}
                title={episode.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

          {/* Episode info */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-3 py-1 text-xs font-heading uppercase tracking-wider rounded-sm ${categoryColors[episode.category]}`}>
                {categoryLabels[episode.category]}
              </span>
              <span className="text-sm text-muted-foreground font-heading">Episode {episode.episodeNumber}</span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{formatViews(episode.views)} views</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">{episode.title}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">{episode.summary}</p>

            {/* Before / After */}
            {episode.beforeImage && episode.afterImage && (
              <div className="mb-10">
                <h2 className="font-heading text-xl uppercase tracking-wider mb-4 text-rust">The Transformation</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="relative aspect-square rounded-sm overflow-hidden border border-border">
                    <img src={episode.beforeImage} alt="Before" className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-primary/80 text-primary-foreground text-xs font-heading px-2 py-0.5 uppercase">Before</span>
                  </div>
                  <div className="relative aspect-square rounded-sm overflow-hidden border border-rust/30">
                    <img src={episode.afterImage} alt="After" className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-rust/80 text-primary-foreground text-xs font-heading px-2 py-0.5 uppercase">After</span>
                  </div>
                </div>
                {episode.transformationStory && (
                  <p className="text-muted-foreground leading-relaxed">{episode.transformationStory}</p>
                )}
              </div>
            )}

            {/* Related piece */}
            {episode.relatedPieceTitle && (
              <div className="border border-border rounded-sm p-6 bg-card mb-10">
                <p className="font-heading text-sm uppercase tracking-wider text-rust mb-2">Art Piece from This Episode</p>
                <h3 className="font-heading text-xl font-bold mb-3">{episode.relatedPieceTitle}</h3>
                <a href={episode.relatedPieceLink} className="inline-block">
                  <Button variant="rust" className="gap-2">
                    Shop the Piece <ExternalLink size={14} />
                  </Button>
                </a>
              </div>
            )}

            {/* Subscribe prompt */}
            <div className="mb-12">
              <SubscribePrompt />
            </div>

            {/* Watch Next */}
            <div>
              <h2 className="font-heading text-2xl font-bold mb-6 uppercase tracking-wider">Next Episode to Watch</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map((ep) => (
                  <EpisodeCard key={ep.id} episode={ep} size="compact" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SubscribePrompt variant="banner" />
      <SiteFooter />
    </div>
  );
};

export default EpisodeDetailPage;
