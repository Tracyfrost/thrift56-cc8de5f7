import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useEpisodes } from "@/hooks/useSupabaseData";

function thumbFor(ep: { thumbnail_url: string | null; youtube_id: string | null }) {
  if (ep.thumbnail_url) return ep.thumbnail_url;
  if (ep.youtube_id) return `https://img.youtube.com/vi/${ep.youtube_id}/hqdefault.jpg`;
  return null;
}

const EpisodeBingeReel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const { data: episodes } = useEpisodes();

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    setProgress(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
  };

  const items = (episodes || []).filter((ep) => !ep.is_featured).slice(0, 10);

  if (items.length === 0) return null;

  return (
    <section className="bg-[#F9F6F0] texture-grain py-16 md:py-24 relative overflow-hidden">
      <div className="container mb-8 relative z-10">
        <p className="font-serif italic text-stone-500 text-sm mb-2">Keep watching</p>
        <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tighter text-stone-950">
          WATCH WHAT HAPPENS NEXT
        </h2>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 md:px-[max(1.5rem,calc((100vw-1200px)/2+1.5rem))] pb-4 relative z-10"
      >
        {items.map((ep) => {
          const thumb = thumbFor(ep);
          return (
            <Link
              to={`/episodes/${ep.slug}`}
              key={ep.id}
              className="min-w-[260px] max-w-[260px] flex-shrink-0 snap-start group cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden border-2 border-stone-300 bg-stone-200 group-hover:border-orange-800 transition-colors">
                {thumb ? (
                  <img
                    src={thumb}
                    alt={ep.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-serif italic text-stone-400 text-xs">Coming soon</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-stone-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 border-2 border-stone-50 flex items-center justify-center">
                    <div
                      className="w-0 h-0 ml-0.5"
                      style={{
                        borderTop: "6px solid transparent",
                        borderBottom: "6px solid transparent",
                        borderLeft: "10px solid #fafaf9",
                      }}
                    />
                  </div>
                </div>
              </div>
              <p className="font-sans font-black text-stone-950 text-sm tracking-tight mt-2 uppercase">
                {ep.title}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="container mt-4 relative z-10">
        <div className="h-1 bg-stone-300 rounded-none max-w-md mx-auto">
          <div
            className="h-full bg-orange-800 rounded-none transition-all duration-150"
            style={{ width: `${Math.max(progress, 5)}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default EpisodeBingeReel;
