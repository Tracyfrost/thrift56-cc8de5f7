import { useParams, Link } from "react-router-dom";
import { useEpisode, useEpisodes } from "@/hooks/useSupabaseData";
import EpisodeCard, { categoryLabels, categoryColors, formatViews } from "@/components/EpisodeCard";
import SubscribePrompt from "@/components/SubscribePrompt";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";

const EpisodeDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: episode, isLoading } = useEpisode(slug || "");
  const { data: allEpisodes } = useEpisodes();

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

  if (!episode) {
    return (
      <div className="min-h-screen">
        <SiteNav />
        <div className="container py-24 text-center">
          <h1 className="text-3xl font-heading font-bold mb-4">Episode Not Found</h1>
          <Link to="/episodes" className="text-rust hover:underline font-heading">← Back to Episodes</Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const related = allEpisodes?.filter((e) => e.id !== episode.id).slice(0, 3) || [];

  return (
    <div className="min-h-screen">
      <SiteNav />

      <section className="py-8 md:py-12 texture-paper">
        <div className="container">
          <Link to="/episodes" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-rust font-heading uppercase tracking-wider mb-8">
            <ArrowLeft size={14} /> Back to Episodes
          </Link>

          {/* Video embed */}
          {episode.youtube_id && (
            <div className="max-w-4xl mx-auto mb-10">
              <div className="relative aspect-video rounded-sm overflow-hidden shadow-2xl border border-border">
                <iframe
                  src={`https://www.youtube.com/embed/${episode.youtube_id}?rel=0`}
                  title={episode.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              {/* YouTube Subscribe CTA */}
              <div className="flex items-center justify-between mt-4 p-4 bg-card border border-border rounded-sm">
                <p className="font-heading text-sm uppercase tracking-wider text-muted-foreground">Like what you see?</p>
                <a href="https://www.youtube.com/@thrift56?sub_confirmation=1" target="_blank" rel="noopener noreferrer">
                  <Button variant="rust" size="sm" className="gap-2">
                    <Play size={12} /> Subscribe on YouTube
                  </Button>
                </a>
              </div>
            </div>
          )}

          {/* Episode info */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className={`px-3 py-1.5 text-xs font-heading uppercase tracking-wider rounded-sm ${categoryColors[episode.category] || "bg-muted text-muted-foreground"}`}>
                {categoryLabels[episode.category] || episode.category}
              </span>
              {episode.episode_number && <span className="text-sm text-muted-foreground font-heading">Episode {episode.episode_number}</span>}
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{formatViews(episode.views)} views</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-5">{episode.title}</h1>
            {episode.description && <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-body">{episode.description}</p>}

            {/* Meta info */}
            {(episode.thrift_store_location || episode.purchase_price) && (
              <div className="flex flex-wrap gap-6 mb-10 p-5 bg-card border border-border rounded-sm">
                {episode.thrift_store_location && (
                  <div>
                    <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Found At</p>
                    <p className="font-body text-sm">{episode.thrift_store_location}</p>
                  </div>
                )}
                {episode.purchase_price && (
                  <div>
                    <p className="font-heading text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Thrift Price</p>
                    <p className="font-body text-sm">{episode.purchase_price}</p>
                  </div>
                )}
              </div>
            )}

            {/* Before / After */}
            {episode.before_image_url && episode.after_image_url && (
              <div className="mb-12">
                <h2 className="font-heading text-xl uppercase tracking-wider mb-5 text-rust">The Transformation</h2>
                <div className="grid grid-cols-2 gap-5 mb-5">
                  <div className="relative aspect-square rounded-sm overflow-hidden border-2 border-border shadow-lg">
                    <img src={episode.before_image_url} alt="Before" className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-xs font-heading px-3 py-1 uppercase tracking-wider">Before</span>
                  </div>
                  <div className="relative aspect-square rounded-sm overflow-hidden border-2 border-rust/30 shadow-lg">
                    <img src={episode.after_image_url} alt="After" className="w-full h-full object-cover" />
                    <span className="absolute top-3 left-3 bg-rust/90 text-primary-foreground text-xs font-heading px-3 py-1 uppercase tracking-wider">After</span>
                  </div>
                </div>
                {episode.transformation_summary && (
                  <p className="text-muted-foreground leading-relaxed font-body">{episode.transformation_summary}</p>
                )}
              </div>
            )}

            {/* Subscribe prompt */}
            <div className="mb-14">
              <SubscribePrompt />
            </div>

            {/* Watch Next */}
            {related.length > 0 && (
              <div>
                <h2 className="font-heading text-2xl font-bold mb-8 uppercase tracking-wider">Watch Next</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {related.map((ep) => (
                    <EpisodeCard key={ep.id} episode={ep} size="compact" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <SubscribePrompt variant="banner" />
      <SiteFooter />
    </div>
  );
};

export default EpisodeDetailPage;
