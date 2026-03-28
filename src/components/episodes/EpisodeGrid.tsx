import thumbHunt from "@/assets/thumb-hunt.jpg";
import thumbTransform from "@/assets/thumb-transform.jpg";
import thumbReveal from "@/assets/thumb-reveal.jpg";
import thumbGiveaway from "@/assets/thumb-giveaway.jpg";
import beforePiece from "@/assets/before-piece.jpg";
import featuredDrop from "@/assets/featured-drop.jpg";

interface MockEpisode {
  id: string;
  title: string;
  hookText: string;
  thumbnail: string;
  views: string;
  episodeNumber: number;
  category: string;
  categoryLabel: string;
  status: "available" | "sold";
}

const mockEpisodes: MockEpisode[] = [
  {
    id: "1", title: "SHOULD'VE STAYED UGLY", hookText: "$3 → THIS?",
    thumbnail: thumbTransform, views: "124K", episodeNumber: 47,
    category: "transformation", categoryLabel: "Transformation", status: "available",
  },
  {
    id: "2", title: "7 HIDDEN GEMS, ONE STORE", hookText: "THE HAUL",
    thumbnail: thumbHunt, views: "98K", episodeNumber: 46,
    category: "thrift-hunt", categoryLabel: "Thrift Hunt", status: "sold",
  },
  {
    id: "3", title: "5 PIECES, 5 WINNERS", hookText: "FREE ART",
    thumbnail: thumbGiveaway, views: "210K", episodeNumber: 45,
    category: "drop", categoryLabel: "Drop", status: "available",
  },
  {
    id: "4", title: "BROKEN FRAME, GALLERY ART", hookText: "TRASH → ART",
    thumbnail: thumbReveal, views: "87K", episodeNumber: 44,
    category: "transformation", categoryLabel: "Transformation", status: "sold",
  },
  {
    id: "5", title: "THE SECRET COMPARTMENT", hookText: "$2 BOX",
    thumbnail: beforePiece, views: "156K", episodeNumber: 42,
    category: "transformation", categoryLabel: "Transformation", status: "available",
  },
  {
    id: "6", title: "A DAY IN THE STUDIO", hookText: "BTS",
    thumbnail: featuredDrop, views: "61K", episodeNumber: 40,
    category: "studio", categoryLabel: "Studio", status: "sold",
  },
];

interface EpisodeGridProps {
  filter: string;
}

const EpisodeGrid = ({ filter }: EpisodeGridProps) => {
  const filtered = filter === "all" ? mockEpisodes : mockEpisodes.filter((ep) => ep.category === filter);

  if (filtered.length === 0) {
    return (
      <p className="text-center font-serif italic text-stone-500 py-16">
        No episodes in this category yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-16">
      {filtered.map((ep) => (
        <div key={ep.id} className="group cursor-pointer">
          {/* Thumbnail */}
          <div className="relative aspect-video overflow-hidden border-2 border-stone-950 bg-stone-900">
            <img
              src={ep.thumbnail}
              alt={ep.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Hook text overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-stone-950/80 to-transparent p-3">
              <span className="font-sans font-black text-stone-50 text-lg tracking-tight">
                {ep.hookText}
              </span>
            </div>
            {/* Watch Now overlay */}
            <div className="absolute inset-0 bg-stone-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="px-6 py-2 bg-orange-800 text-stone-50 font-sans font-black text-sm uppercase tracking-widest rounded-none">
                Watch Now
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="pt-3 pb-2">
            <h3 className="font-sans font-black text-stone-950 text-base tracking-tight leading-tight mb-1">
              {ep.title}
            </h3>
            <p className="font-serif italic text-stone-500 text-xs">
              {ep.views} views · EP {ep.episodeNumber} · {ep.categoryLabel}
            </p>
          </div>

          {/* Status badge */}
          {ep.status === "available" ? (
            <span className="inline-block px-3 py-1 bg-orange-800 text-stone-50 text-[10px] font-sans font-black uppercase tracking-widest rounded-none">
              Available Now
            </span>
          ) : (
            <span className="inline-block px-3 py-1 bg-stone-400 text-stone-50 text-[10px] font-sans font-black uppercase tracking-widest rounded-none line-through">
              Sold
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default EpisodeGrid;
