import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EpisodeCard from "@/components/EpisodeCard";
import { useEpisodes } from "@/hooks/useSupabaseData";

const BingeWatchStrip = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: episodes } = useEpisodes();

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  if (!episodes || episodes.length === 0) return null;

  return (
    <section className="py-16 md:py-20 texture-paper">
      <div className="container">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-distressed text-rust text-sm tracking-widest mb-1">BINGE WORTHY</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Watch the Transformations</h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button onClick={() => scroll("left")} className="w-10 h-10 rounded-sm border border-border flex items-center justify-center hover:bg-muted transition-colors" aria-label="Scroll left">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll("right")} className="w-10 h-10 rounded-sm border border-border flex items-center justify-center hover:bg-muted transition-colors" aria-label="Scroll right">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide px-6 md:px-[max(1.5rem,calc((100vw-1200px)/2+1.5rem))] pb-4"
        style={{ scrollbarWidth: "none" }}
      >
        {episodes.slice(0, 8).map((ep) => (
          <div key={ep.id} className="min-w-[280px] max-w-[280px] flex-shrink-0">
            <EpisodeCard episode={ep} size="compact" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BingeWatchStrip;
