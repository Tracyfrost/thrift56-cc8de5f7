import { Link } from "react-router-dom";
import { useEpisodes } from "@/hooks/useSupabaseData";

const categoryLabels: Record<string, string> = {
  "thrift-hunt": "Thrift Hunt",
  transformation: "Transformation",
  giveaway: "Giveaway",
  livestream: "Livestream",
  studio: "Studio",
};

function thumbFor(ep: { thumbnail_url: string | null; youtube_id: string | null }) {
  if (ep.thumbnail_url) return ep.thumbnail_url;
  if (ep.youtube_id) return `https://img.youtube.com/vi/${ep.youtube_id}/hqdefault.jpg`;
  return null;
}

interface EpisodeGridProps {
  filter: string;
}

const EpisodeGrid = ({ filter }: EpisodeGridProps) => {
  const { data: episodes, isLoading } = useEpisodes(filter);

  if (isLoading) {
    return (
      <p className="text-center font-serif italic text-stone-500 py-16">Loading episodes…</p>
    );
  }

  if (!episodes || episodes.length === 0) {
    return (
      <p className="text-center font-serif italic text-stone-500 py-16">
        No episodes in this category yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16">
      {episodes.map((ep) => {
        const thumb = thumbFor(ep);
        const label = categoryLabels[ep.category] || ep.category;
        return (
          <Link to={`/episodes/${ep.slug}`} key={ep.id} className="group cursor-pointer">
            <div className="relative aspect-video overflow-hidden border-2 border-stone-950 bg-stone-900">
              {thumb ? (
                <img
                  src={thumb}
                  alt={ep.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-serif italic text-stone-400 text-sm">Coming soon</span>
                </div>
              )}
              <div className="absolute inset-0 bg-stone-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="px-6 py-2 bg-orange-800 text-stone-50 font-sans font-black text-sm uppercase tracking-widest rounded-none">
                  Watch Now
                </span>
              </div>
            </div>

            <div className="pt-3 pb-2">
              <h3 className="font-sans font-black text-stone-950 text-base tracking-tight leading-tight mb-1 group-hover:text-orange-800 transition-colors">
                {ep.title}
              </h3>
              <p className="font-serif italic text-stone-500 text-xs">
                {ep.episode_number ? `EP ${ep.episode_number} · ` : ""}
                {label}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default EpisodeGrid;
