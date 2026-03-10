import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useFeaturedEpisode } from "@/hooks/useSupabaseData";

const LatestEpisodeSection = () => {
  const { data: episode } = useFeaturedEpisode();

  return (
    <section className="py-20 md:py-28 bg-bone">
      <div className="container">
        <div className="text-center mb-12">
          <p className="font-distressed text-rust text-sm tracking-widest mb-2">ON YOUTUBE</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">Latest Episode</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          {episode?.youtube_id ? (
            <div className="aspect-video rounded-sm overflow-hidden mb-8 shadow-xl border border-border">
              <iframe
                src={`https://www.youtube.com/embed/${episode.youtube_id}?rel=0`}
                title={episode.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="w-full h-full"
              />
            </div>
          ) : (
            <div className="relative aspect-video bg-foreground/10 rounded-sm overflow-hidden mb-8 group cursor-pointer shadow-xl flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center">
                <Play size={32} className="text-primary-foreground ml-1" />
              </div>
            </div>
          )}

          {episode && (
            <>
              <h3 className="font-heading text-2xl md:text-3xl text-center mb-4">{episode.title}</h3>
              {episode.description && (
                <p className="text-muted-foreground text-center max-w-xl mx-auto mb-8 leading-relaxed">{episode.description}</p>
              )}
            </>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {episode?.youtube_id && (
              <a href={`https://www.youtube.com/watch?v=${episode.youtube_id}`} target="_blank" rel="noopener noreferrer">
                <Button variant="hero" size="lg" className="gap-2 px-8 py-6">
                  <Play size={16} /> Watch on YouTube
                </Button>
              </a>
            )}
            <Link to="/episodes">
              <Button variant="hero-outline" size="lg" className="px-8 py-6">Browse Episodes</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestEpisodeSection;
