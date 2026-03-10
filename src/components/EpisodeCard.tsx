import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import type { Episode } from "@/hooks/useSupabaseData";

const categoryLabels: Record<string, string> = {
  "thrift-hunt": "Thrift Hunt",
  transformation: "Transformation",
  giveaway: "Giveaway",
  livestream: "Livestream Replay",
  studio: "Studio Work",
};

const categoryColors: Record<string, string> = {
  "thrift-hunt": "bg-secondary text-secondary-foreground",
  transformation: "bg-rust text-primary-foreground",
  giveaway: "bg-primary text-primary-foreground",
  livestream: "bg-muted text-muted-foreground",
  studio: "bg-bone text-foreground",
};

function formatViews(views: number | null): string {
  if (!views) return "0";
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(0)}K`;
  return views.toString();
}

interface EpisodeCardProps {
  episode: Episode;
  size?: "default" | "compact";
}

const EpisodeCard = ({ episode, size = "default" }: EpisodeCardProps) => {
  return (
    <Link
      to={`/episodes/${episode.slug}`}
      className="group block overflow-hidden rounded-sm border border-border hover:border-rust/50 hover:shadow-md transition-all duration-300 bg-card"
    >
      <div className="relative aspect-video overflow-hidden">
        {episode.thumbnail_url ? (
          <img
            src={episode.thumbnail_url}
            alt={episode.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <Play size={28} className="text-muted-foreground" />
          </div>
        )}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/15 transition-colors duration-300 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100">
            <Play size={18} className="text-primary-foreground ml-0.5" />
          </div>
        </div>
        <span className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-heading uppercase tracking-wider rounded-sm ${categoryColors[episode.category] || "bg-muted text-muted-foreground"}`}>
          {categoryLabels[episode.category] || episode.category}
        </span>
        {episode.episode_number && (
          <span className="absolute bottom-3 right-3 bg-foreground/70 text-primary-foreground text-[10px] font-heading px-2 py-0.5 rounded-sm">
            EP {episode.episode_number}
          </span>
        )}
      </div>

      <div className={`${size === "compact" ? "p-3" : "p-4"}`}>
        <h3 className={`font-heading font-semibold leading-tight mb-1.5 group-hover:text-rust transition-colors ${size === "compact" ? "text-sm" : "text-base"}`}>
          {episode.title}
        </h3>
        {size === "default" && episode.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2 font-body">{episode.description}</p>
        )}
        <p className="text-[11px] text-muted-foreground font-heading uppercase tracking-wider">
          {formatViews(episode.views)} views
        </p>
      </div>
    </Link>
  );
};

export { categoryLabels, categoryColors, formatViews };
export default EpisodeCard;
