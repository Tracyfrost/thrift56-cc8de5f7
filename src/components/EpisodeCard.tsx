import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { Episode, categoryLabels, categoryColors, formatViews } from "@/data/episodes";

interface EpisodeCardProps {
  episode: Episode;
  size?: "default" | "compact";
}

const EpisodeCard = ({ episode, size = "default" }: EpisodeCardProps) => {
  return (
    <Link
      to={`/episodes/${episode.slug}`}
      className="group block overflow-hidden rounded-sm border border-border hover:border-rust/50 transition-all duration-300 bg-card"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={episode.thumbnail}
          alt={episode.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-300 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100">
            <Play size={22} className="text-primary-foreground ml-0.5" />
          </div>
        </div>
        {/* Category badge */}
        <span className={`absolute top-3 left-3 px-2 py-0.5 text-[10px] font-heading uppercase tracking-wider rounded-sm ${categoryColors[episode.category]}`}>
          {categoryLabels[episode.category]}
        </span>
        {/* Episode number */}
        <span className="absolute bottom-3 right-3 bg-foreground/70 text-primary-foreground text-[10px] font-heading px-2 py-0.5 rounded-sm">
          EP {episode.episodeNumber}
        </span>
      </div>

      {/* Content */}
      <div className={`p-4 ${size === "compact" ? "p-3" : "p-4"}`}>
        <h3 className={`font-heading font-semibold leading-tight mb-1 group-hover:text-rust transition-colors ${size === "compact" ? "text-sm" : "text-base"}`}>
          {episode.title}
        </h3>
        {size === "default" && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
            {episode.summary}
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          {formatViews(episode.views)} views
        </p>
      </div>
    </Link>
  );
};

export default EpisodeCard;
